$css = (Invoke-WebRequest -Uri 'http://localhost:3000/_next/static/chunks/%5Broot-of-the-server%5D__13ps.gl._.css' -UseBasicParsing).Content

# Find padding: 0 with surrounding context
$lines = $css -split "`n"
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match 'padding:\s*0[^.]') {
        $start = [Math]::Max(0, $i - 5)
        $end = [Math]::Min($lines.Length - 1, $i + 3)
        Write-Host "--- Context around line $i ---"
        for ($j = $start; $j -le $end; $j++) {
            $marker = if ($j -eq $i) { ">>>" } else { "   " }
            Write-Host "$marker $($lines[$j].Trim())"
        }
        Write-Host ""
    }
}

# Also check which @layer the p-4 class is in
Write-Host "=== @layer structure ==="
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match '@layer') {
        Write-Host "Line $i : $($lines[$i].Trim())"
    }
}
