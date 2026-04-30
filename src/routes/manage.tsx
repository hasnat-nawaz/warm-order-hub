import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useApp, useLiveMenu } from "@/store/useApp";
import { CATEGORIES, CATEGORY_IMAGES, getVendor, type Category, type MenuItem } from "@/data/menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ImagePlus, Pencil, Plus, Trash2, X, ChefHat, ListChecks, AlertTriangle } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Route = createFileRoute("/manage")({
  head: () => ({ meta: [{ title: "Manage menu — Campus Dhaba" }] }),
  beforeLoad: ({ location }) => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role !== "vendor") {
      throw redirect({
        to: "/login",
        search: { redirect: location.pathname },
      });
    }
  },
  component: ManagePage,
});

function ManagePage() {
  const role = useApp((s) => s.role);
  const vendorLogin = useApp((s) => s.vendorLogin);
  const liveMenu = useLiveMenu();

  const [editCat, setEditCat] = useState<Category | null>(null);
  const [addCat, setAddCat] = useState<Category | null>(null);

  // Always-on hook so React's hook ordering invariant holds even when we
  // bail early below.
  const grouped = useMemo(() => {
    const map: Record<Category, MenuItem[]> = {
      Breakfast: [],
      Desi: [],
      Fastfood: [],
      Chinese: [],
      Drinks: [],
    };
    if (!vendorLogin) return map;
    for (const it of liveMenu) {
      if (it.vendorId === vendorLogin) map[it.category].push(it);
    }
    return map;
  }, [liveMenu, vendorLogin]);

  if (role !== "vendor" || !vendorLogin) {
    return (
      <main className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-sm text-muted-foreground">
          You need to sign in as a vendor to manage your menu.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
        >
          Go to sign in
        </Link>
      </main>
    );
  }

  const vendor = getVendor(vendorLogin)!;
  const myItems = liveMenu.filter((m) => m.vendorId === vendorLogin);

  const containerVariants = {
    hidden: { opacity: 0 },
    showSections: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const blockVariants = {
    hidden: { opacity: 0, y: 40 },
    showSections: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.main variants={containerVariants} initial="hidden" animate="showSections" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <motion.div variants={blockVariants} style={{ willChange: "transform, opacity" }} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <ChefHat className="h-4 w-4" /> {vendor.name}
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">Manage menu</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap a category to add or edit items shown to your customers.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{myItems.length}</span> items live
        </div>
      </motion.div>

      <motion.div variants={blockVariants} style={{ willChange: "transform, opacity" }} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat, i) => {
          const items = grouped[cat];
          return (
            <motion.article
              key={cat}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card"
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <img
                  src={CATEGORY_IMAGES[cat]}
                  alt={cat}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-cream">
                  <h2 className="font-display text-2xl font-black">{cat}</h2>
                  <p className="mt-0.5 text-xs opacity-90">
                    {items.length} item{items.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4">
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nothing here yet. Add your first item.
                  </p>
                ) : (
                  <ul className="space-y-1.5">
                    {items.slice(0, 4).map((it) => (
                      <li key={it.id} className="flex items-center justify-between gap-2 text-sm">
                        <span className="truncate font-medium">{it.name}</span>
                        <span className="font-semibold text-muted-foreground">Rs. {it.price}</span>
                      </li>
                    ))}
                    {items.length > 4 && (
                      <li className="text-[11px] text-muted-foreground">
                        + {items.length - 4} more
                      </li>
                    )}
                  </ul>
                )}

                {/* Actions */}
                <div className="mt-auto flex flex-col gap-2 pt-3">
                  <button
                    onClick={() => setAddCat(cat)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:border-primary"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add item
                  </button>
                  <button
                    onClick={() => setEditCat(cat)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-warm transition-transform hover:-translate-y-0.5"
                  >
                    <Pencil className="h-4 w-4" /> Edit category
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <EditCategoryDialog
        open={editCat !== null}
        category={editCat}
        vendorId={vendorLogin}
        onClose={() => setEditCat(null)}
        onAddNew={(c) => {
          setEditCat(null);
          setAddCat(c);
        }}
      />
      <AddItemDialog
        open={addCat !== null}
        category={addCat}
        vendorId={vendorLogin}
        onClose={() => setAddCat(null)}
      />
    </motion.main>
  );
}

// ---------------- Edit category dialog ----------------

function EditCategoryDialog({
  open,
  category,
  vendorId,
  onClose,
  onAddNew,
}: {
  open: boolean;
  category: Category | null;
  vendorId: string;
  onClose: () => void;
  onAddNew: (c: Category) => void;
}) {
  const liveMenu = useLiveMenu();
  const updateMenuItem = useApp((s) => s.updateMenuItem);
  const deleteMenuItem = useApp((s) => s.deleteMenuItem);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const items = category
    ? liveMenu.filter((m) => m.vendorId === vendorId && m.category === category)
    : [];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{category}</DialogTitle>
          <DialogDescription>
            Edit prices, names, or descriptions. Remove items you don't sell anymore.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          {items.length === 0 && (
            <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              No items in this category yet.
            </p>
          )}
          {items.map((it) =>
            editingId === it.id ? (
              <ItemEditor
                key={it.id}
                item={it}
                onSave={(patch) => {
                  updateMenuItem(it.id, patch);
                  toast.success("Item updated");
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div
                key={it.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-background p-3"
              >
                <img
                  src={it.image}
                  alt={it.name}
                  className="h-14 w-14 flex-shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{it.name}</div>
                  <div className="text-xs text-muted-foreground">Rs. {it.price}</div>
                </div>
                <button
                  onClick={() => setEditingId(it.id)}
                  className="rounded-full border border-border px-4 py-2 text-sm font-bold hover:border-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeletingId(it.id)}
                  aria-label="Remove item"
                  className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ),
          )}
        </div>

        <DialogFooter className="mt-4 gap-3 sm:gap-3">
          <button
            onClick={() => category && onAddNew(category)}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold hover:border-primary"
          >
            <Plus className="h-4 w-4" /> Add item to {category}
          </button>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background hover:bg-foreground/90"
          >
            Done
          </button>
        </DialogFooter>

        <AlertDialog open={deletingId !== null} onOpenChange={(v) => !v && setDeletingId(null)}>
          <AlertDialogContent className="max-w-sm">
            <AlertDialogTitle className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete item?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this menu item? This action cannot be undone.
            </AlertDialogDescription>
            <div className="flex gap-3 justify-end pt-4">
              <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (deletingId) {
                    deleteMenuItem(deletingId);
                    toast.info("Item removed");
                  }
                  setDeletingId(null);
                }}
                className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}

function ItemEditor({
  item,
  onSave,
  onCancel,
}: {
  item: MenuItem;
  onSave: (patch: Partial<MenuItem>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(String(item.price));
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(item.image);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const p = parseInt(price, 10);
        if (!name.trim() || !p) {
          toast.error("Name and price are required.");
          return;
        }
        onSave({ name: name.trim(), price: p, description: description.trim(), image });
      }}
      className="rounded-2xl border border-primary/40 bg-primary/5 p-3"
    >
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="group relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-dashed border-border"
          aria-label="Change picture"
        >
          <img src={image} alt="" className="h-full w-full object-cover" />
          <span className="absolute inset-0 grid place-items-center bg-black/50 text-cream opacity-0 transition-opacity group-hover:opacity-100">
            <ImagePlus className="h-4 w-4" />
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        <div className="flex flex-1 flex-col gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <div className="flex gap-2">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ""))}
              inputMode="numeric"
              placeholder="Price"
              className="w-24 rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-border px-5 py-2 text-sm font-bold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground"
        >
          Save
        </button>
      </div>
    </form>
  );
}

// ---------------- Add item dialog ----------------

function AddItemDialog({
  open,
  category,
  vendorId,
  onClose,
}: {
  open: boolean;
  category: Category | null;
  vendorId: string;
  onClose: () => void;
}) {
  const addMenuItem = useApp((s) => s.addMenuItem);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const submit = () => {
    if (!category) return;
    const p = parseInt(price, 10);
    if (!name.trim() || !p) {
      toast.error("Name and price are required.");
      return;
    }
    addMenuItem({
      vendorId,
      name: name.trim(),
      price: p,
      category,
      description: description.trim() || `${name.trim()} — freshly made.`,
      image: image ?? CATEGORY_IMAGES[category],
    });
    toast.success(`${name.trim()} added to ${category}`);
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          reset();
          onClose();
        }
      }}
    >
      <DialogContent className="rounded-3xl border border-border bg-card p-6 sm:max-w-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Add item {category && <span className="text-primary">to {category}</span>}
          </DialogTitle>
          <DialogDescription>
            Upload a picture and fill in the details. It'll show up to customers immediately.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="group relative h-32 w-full overflow-hidden rounded-2xl border-2 border-dashed border-border bg-background"
            >
              {image ? (
                <img src={image} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full place-items-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-1.5">
                    <ImagePlus className="h-6 w-6" />
                    <span className="text-xs font-semibold">Tap to upload picture</span>
                  </div>
                </div>
              )}
              <span className="absolute inset-0 grid place-items-center bg-black/40 text-cream opacity-0 transition-opacity group-hover:opacity-100">
                <ImagePlus className="h-5 w-5" />
              </span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ""))}
            inputMode="numeric"
            placeholder="Price (Rs.)"
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 160))}
            rows={2}
            placeholder="Short description (optional)"
            className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
          />
        </div>

        <DialogFooter className="mt-4 gap-3 sm:gap-3">
          <button
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold"
          >
            <X className="h-4 w-4" /> Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-warm"
          >
            <ListChecks className="h-4 w-4" /> Add item
          </button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
