import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useApp, useLiveMenu } from "@/store/useApp";
import { getVendor } from "@/data/menu";
import { ArrowLeft, Minus, Plus, Trash2, AlertTriangle } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/orders/edit/$orderId")({
  beforeLoad: ({ location }) => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role === "vendor") {
      throw redirect({ to: "/vendor" });
    }
    if (!state.role) {
      throw redirect({ to: "/login", search: { redirect: location.pathname } });
    }
  },
  component: EditOrderPage,
});

function EditOrderPage() {
  const { orderId } = Route.useParams();
  const order = useApp((s) => s.orders.find((o) => o.id === orderId));
  const updateOrderLines = useApp((s) => s.updateOrderLines);
  const cancelOrder = useApp((s) => s.cancelOrder);
  const liveMenu = useLiveMenu();
  const navigate = useNavigate();

  const [editedLines, setEditedLines] = useState(order?.lines ?? []);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const newTotal = useMemo(() => {
    return editedLines.reduce((s, l) => {
      const it = liveMenu.find((m) => m.id === l.itemId);
      return s + (it?.price ?? 0) * l.qty;
    }, 0);
  }, [editedLines, liveMenu]);

  if (!order) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-muted-foreground">Order not found.</p>
        <Link to="/orders" className="mt-4 inline-block text-primary underline">
          Back to orders
        </Link>
      </main>
    );
  }

  if (order.status !== "Pending") {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-muted-foreground">
          This order cannot be edited because it has already been accepted by the vendor.
        </p>
        <Link
          to="/orders/$orderId"
          params={{ orderId }}
          className="mt-4 inline-block text-primary underline"
        >
          Back to order
        </Link>
      </main>
    );
  }

  const vendor = getVendor(order.vendorId);
  const hasChanges = JSON.stringify(editedLines) !== JSON.stringify(order.lines);

  const handleQtyChange = (itemId: string, delta: number) => {
    setEditedLines((prev) =>
      prev
        .map((l) => (l.itemId === itemId ? { ...l, qty: Math.max(0, l.qty + delta) } : l))
        .filter((l) => l.qty > 0),
    );
  };

  const handleRemove = (itemId: string) => {
    setEditedLines((prev) => prev.filter((l) => l.itemId !== itemId));
  };

  const handleSave = () => {
    if (editedLines.length === 0) {
      toast.error("Order must have at least one item.");
      return;
    }
    updateOrderLines(orderId, editedLines);
    toast.success("Order updated successfully!");
    navigate({ to: "/orders/$orderId", params: { orderId } });
  };

  const handleCancel = () => {
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    cancelOrder(orderId, "user");
    toast.success("Order cancelled successfully.");
    navigate({ to: "/orders" });
  };

  return (
    <>
      <Link
        to="/orders/$orderId"
        params={{ orderId }}
        aria-label="Back"
        className="fixed left-4 top-20 z-40 inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-background shadow-warm ring-1 ring-background/40 backdrop-blur transition-transform hover:-translate-y-0.5 sm:left-6 sm:top-24"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </Link>

      <motion.main
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10"
      >
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Edit order</h1>
        {vendor && (
          <p className="mt-1 text-sm text-muted-foreground">
            Order #{order.id} from{" "}
            <span className="font-semibold text-foreground">{vendor.name}</span>
          </p>
        )}

        <div className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <h2 className="font-display text-lg font-bold">Items</h2>
          <ul className="mt-3 space-y-3">
            {editedLines.map((l) => {
              const it = liveMenu.find((m) => m.id === l.itemId);
              if (!it) return null;
              return (
                <li
                  key={l.itemId}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary/30 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">{it.name}</div>
                    <div className="text-sm text-muted-foreground">Rs. {it.price} each</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQtyChange(l.itemId, -1)}
                      className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center font-semibold">{l.qty}</span>
                    <button
                      onClick={() => handleQtyChange(l.itemId, 1)}
                      className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(l.itemId)}
                    className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              );
            })}
          </ul>
          {editedLines.length === 0 && (
            <div className="mt-3 text-center text-sm text-muted-foreground">No items in order</div>
          )}
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 font-display text-lg font-bold sm:text-xl">
            <span>New total</span>
            <span>Rs. {newTotal}</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleSave}
            disabled={!hasChanges || editedLines.length === 0}
            className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save changes
          </button>
          <button
            onClick={() => setShowCancelDialog(true)}
            className="w-full rounded-full border border-destructive/40 bg-destructive/10 py-3 text-sm font-bold text-destructive transition-colors hover:bg-destructive/20"
          >
            Cancel order
          </button>
          <Link
            to="/orders/$orderId"
            params={{ orderId }}
            className="block w-full rounded-full border border-border bg-card py-3 text-center text-sm font-bold text-foreground transition-colors hover:bg-secondary"
          >
            Discard changes
          </Link>
        </div>

        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogContent className="max-w-sm">
            <AlertDialogTitle className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Cancel order?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order? This action cannot be undone.
            </AlertDialogDescription>
            <div className="flex gap-3 justify-end pt-4">
              <AlertDialogCancel className="rounded-full">Keep order</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmCancel}
                className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Cancel order
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </motion.main>
    </>
  );
}
