import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

export default function ScrollBasedVelocityDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <VelocityScroll>FullStack Developer</VelocityScroll>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
