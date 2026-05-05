const PILL = {
  Pending: "bg-muted text-muted-foreground border border-border",
  Preparing: "bg-warning text-warning-foreground border border-warning/40",
  Ready: "bg-success text-success-foreground border border-success/40",
  "Picked up": "bg-primary text-primary-foreground border border-primary/40",
  Cancelled: "bg-destructive text-destructive-foreground border border-destructive/40"
};
const DOT = {
  Pending: "bg-muted-foreground/40",
  Preparing: "bg-warning",
  Ready: "bg-success",
  "Picked up": "bg-primary",
  Cancelled: "bg-destructive"
};
const LABEL = {
  Pending: "Pending",
  Preparing: "Preparing",
  Ready: "Ready",
  "Picked up": "Picked up"
};
const statusPillClasses = (s) => PILL[s];
const statusDotClasses = (s) => DOT[s];
const statusLabel = (s, opts) => {
  if (s !== "Cancelled") return LABEL[s];
  return opts?.cancellationReason === "user" ? "Cancelled" : "Not accepted";
};
const STAGE_FLOW = ["Pending", "Preparing", "Ready", "Picked up"];
export {
  STAGE_FLOW as S,
  statusLabel as a,
  statusPillClasses as b,
  statusDotClasses as s
};
