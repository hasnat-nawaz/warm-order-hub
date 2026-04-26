import { User } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Default user picture — a dark charcoal circle with a generic person icon.
 * Sits next to the username in the header to indicate the active session.
 */
export function UserAvatar({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid flex-shrink-0 place-items-center rounded-full bg-charcoal text-cream",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <User
        className="opacity-90"
        style={{ width: size * 0.55, height: size * 0.55 }}
        strokeWidth={2}
      />
    </span>
  );
}
