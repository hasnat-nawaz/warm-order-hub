import type { OrderStatus } from "@/store/useApp";

/**
 * Single source of truth for how each order status looks.
 *
 * - Pending   : neutral / "blank" (subtle muted bg)
 * - Preparing : warm yellow (warning token)
 * - Ready     : sage green (success token)
 * - Picked up : terracotta orange (primary token)
 * - Cancelled : red (destructive token)
 *
 * The strings below are full Tailwind class lists so every consumer renders
 * an identical chip without restating the design choices.
 */

type StatusKind = OrderStatus;

const PILL: Record<StatusKind, string> = {
  Pending: "bg-muted text-muted-foreground border border-border",
  Preparing: "bg-warning text-warning-foreground border border-warning/40",
  Ready: "bg-success text-success-foreground border border-success/40",
  "Picked up": "bg-primary text-primary-foreground border border-primary/40",
  Cancelled: "bg-destructive text-destructive-foreground border border-destructive/40",
};

const DOT: Record<StatusKind, string> = {
  Pending: "bg-muted-foreground/40",
  Preparing: "bg-warning",
  Ready: "bg-success",
  "Picked up": "bg-primary",
  Cancelled: "bg-destructive",
};

const RING: Record<StatusKind, string> = {
  Pending: "ring-border",
  Preparing: "ring-warning/40",
  Ready: "ring-success/40",
  "Picked up": "ring-primary/40",
  Cancelled: "ring-destructive/40",
};

/**
 * Base label map (used for non-cancelled states).
 */
const LABEL: Record<Exclude<StatusKind, "Cancelled">, string> = {
  Pending: "Pending",
  Preparing: "Preparing",
  Ready: "Ready",
  "Picked up": "Picked up",
};

export const statusPillClasses = (s: OrderStatus) => PILL[s];
export const statusDotClasses = (s: OrderStatus) => DOT[s];
export const statusRingClasses = (s: OrderStatus) => RING[s];
export const statusLabel = (
  s: OrderStatus,
  opts?: {
    /** "user" = customer cancelled, "vendor" = vendor rejected */
    cancellationReason?: "user" | "vendor";
  },
) => {
  if (s !== "Cancelled") return LABEL[s];
  return opts?.cancellationReason === "user" ? "Cancelled" : "Not accepted";
};

/**
 * Stages shown in the customer order tracker. Cancelled is rendered
 * separately as a banner — so the linear stage list excludes it.
 */
export const STAGE_FLOW: OrderStatus[] = ["Pending", "Preparing", "Ready", "Picked up"];
