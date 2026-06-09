// ── lib/chatApi.ts ────────────────────────────────────────────────────────────
// Typed API client for the FastAPI Portfolio Chatbot backend.
//
// Exports:
//   streamChat()    — POST /api/chat/stream  (SSE, preferred)
//   sendChat()      — POST /api/chat         (full JSON, fallback)
//   checkHealth()   — GET  /health
//
// Error handling:
//   All functions throw a ChatApiError on network failures, HTTP errors,
//   or backend-reported errors.  Components should catch and display them.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatPayload {
  message: string;
  history: HistoryMessage[];
}

/** Structured error thrown by every function in this module. */
export class ChatApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly retryable: boolean = false,
  ) {
    super(message);
    this.name = "ChatApiError";
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Map HTTP status codes to user-friendly messages. */
function friendlyError(status: number, detail?: string): ChatApiError {
  switch (status) {
    case 429:
      return new ChatApiError(
        "You're sending messages too fast. Please wait a moment and try again.",
        429,
        true, // retryable
      );
    case 502:
    case 503:
      return new ChatApiError(
        "The AI service is temporarily unavailable. Please try again in a few seconds.",
        status,
        true,
      );
    case 422:
      return new ChatApiError(
        "Your message could not be processed. Please try rephrasing it.",
        422,
        false,
      );
    default:
      return new ChatApiError(
        detail ?? `Unexpected error from the server (${status}).`,
        status,
        status >= 500,
      );
  }
}

// ── streamChat ────────────────────────────────────────────────────────────────

/**
 * POST /api/chat/stream — streams tokens via Server-Sent Events.
 *
 * @param payload   The chat message + conversation history.
 * @param onChunk   Called for every text chunk received from the server.
 * @param signal    Optional AbortSignal to cancel mid-stream.
 *
 * @throws ChatApiError on network failures or HTTP error responses.
 */
export async function streamChat(
  payload: ChatPayload,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}/api/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      // User cancelled — not an error we need to surface
      return;
    }
    throw new ChatApiError(
      "Unable to reach the chatbot server. Make sure it is running on port 8000.",
      undefined,
      true,
    );
  }

  if (!response.ok) {
    let detail: string | undefined;
    try {
      const json = await response.json();
      detail = json?.detail ?? json?.message;
    } catch {
      // ignore parse errors
    }
    throw friendlyError(response.status, detail);
  }

  if (!response.body) {
    throw new ChatApiError("Server returned an empty response.", undefined, true);
  }

  // ── Read the SSE stream ────────────────────────────────────────────────────
  const reader  = response.body.getReader();
  const decoder = new TextDecoder();
  let   buffer  = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // SSE format: "data: <payload>\n\n"
      // Split on double-newline to get individual events
      const events = buffer.split("\n\n");
      buffer = events.pop() ?? ""; // last (possibly incomplete) chunk stays in buffer

      for (const event of events) {
        if (!event) continue;

        const lines = event.split("\n");
        let rawData = "";
        let isError = false;

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith("event: error")) {
            isError = true;
          }
          if (trimmedLine.startsWith("data:")) {
            let content = trimmedLine.slice(5);
            if (content.startsWith(" ")) {
              content = content.slice(1);
            }
            rawData = content;
          }
        }

        if (rawData === "[DONE]") return; // end-of-stream sentinel

        if (isError) {
          throw new ChatApiError(
            rawData || "An error occurred during streaming.",
            undefined,
            true,
          );
        }

        try {
          // Parse JSON if possible (used for json.dumps() encoded chunks from backend)
          const parsed = JSON.parse(rawData);
          if (typeof parsed === "string") {
            onChunk(parsed);
          } else {
            onChunk(String(parsed));
          }
        } catch {
          // Fallback to raw text if not valid JSON
          onChunk(rawData);
        }
      }
    }
  } finally {
    reader.cancel().catch(() => {});
  }
}

// ── sendChat ──────────────────────────────────────────────────────────────────

/**
 * POST /api/chat — non-streaming, returns the full answer at once.
 * Use as a fallback when SSE is not available.
 *
 * @throws ChatApiError on network or HTTP errors.
 */
export async function sendChat(
  payload: ChatPayload,
  signal?: AbortSignal,
): Promise<string> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return "";
    throw new ChatApiError(
      "Unable to reach the chatbot server. Make sure it is running on port 8000.",
      undefined,
      true,
    );
  }

  let json: Record<string, unknown>;
  try {
    json = await response.json();
  } catch {
    throw new ChatApiError("Server returned an invalid response.", response.status, false);
  }

  if (!response.ok) {
    throw friendlyError(response.status, json?.detail as string | undefined);
  }

  return (json?.answer as string) ?? "";
}

// ── checkHealth ───────────────────────────────────────────────────────────────

/**
 * GET /health — returns true when the backend is reachable and healthy.
 * Never throws; returns false on any failure.
 */
export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/health`, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return false;
    const json = await res.json();
    return json?.status === "ok";
  } catch {
    return false;
  }
}
