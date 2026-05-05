import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp, a as useLiveMenu, C as CATEGORIES, g as getVendor, b as CATEGORY_IMAGES, c as cn } from "./router-8hUpC1Lu.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogTitle, c as AlertDialogDescription, d as AlertDialogCancel, e as AlertDialogAction } from "./alert-dialog-C_kIqYfx.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { c as ChefHat, r as Plus, s as Pencil, t as Trash2, T as TriangleAlert, I as ImagePlus, X, u as ListChecks } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zustand.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/zod.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/class-variance-authority.mjs";
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/55 backdrop-blur-sm transition-all duration-300 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 rounded-3xl border border-white/20 bg-background/70 p-7 shadow-warm backdrop-blur-xl duration-300 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
function ManagePage() {
  const role = useApp((s) => s.role);
  const vendorLogin = useApp((s) => s.vendorLogin);
  const liveMenu = useLiveMenu();
  const [editCat, setEditCat] = reactExports.useState(null);
  const [addCat, setAddCat] = reactExports.useState(null);
  const grouped = reactExports.useMemo(() => {
    const map = Object.fromEntries(CATEGORIES.map((c) => [c, []]));
    if (!vendorLogin) return map;
    for (const it of liveMenu) {
      if (it.vendorId === vendorLogin) map[it.category].push(it);
    }
    return map;
  }, [liveMenu, vendorLogin]);
  if (role !== "vendor" || !vendorLogin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-md px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You need to sign in as a vendor to manage your menu." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground", children: "Go to sign in" })
    ] });
  }
  const vendor = getVendor(vendorLogin);
  const myItems = liveMenu.filter((m) => m.vendorId === vendorLogin);
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    showSections: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  const blockVariants = {
    hidden: {
      opacity: 0,
      y: 40
    },
    showSections: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.main, { variants: containerVariants, initial: "hidden", animate: "showSections", className: "mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: blockVariants, style: {
      willChange: "transform, opacity"
    }, className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "h-4 w-4" }),
          " ",
          vendor.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-3xl font-bold sm:text-4xl", children: "Manage menu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Tap a category to add or edit items shown to your customers." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: myItems.length }),
        " items live"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: blockVariants, style: {
      willChange: "transform, opacity"
    }, className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: CATEGORIES.map((cat, i) => {
      const items = grouped[cat];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.article, { className: "group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[5/3] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: CATEGORY_IMAGES[cat], alt: cat, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105", loading: "lazy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-4 text-cream", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-black", children: cat }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs opacity-90", children: [
              items.length,
              " item",
              items.length === 1 ? "" : "s"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-3 p-4", children: [
          items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Nothing here yet. Add your first item." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5", children: [
            items.slice(0, 4).map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium", children: it.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-muted-foreground", children: [
                "Rs. ",
                it.price
              ] })
            ] }, it.id)),
            items.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-[11px] text-muted-foreground", children: [
              "+ ",
              items.length - 4,
              " more"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-col gap-2 pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setAddCat(cat), className: "inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:border-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              " Add item"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditCat(cat), className: "inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-warm transition-transform hover:-translate-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }),
              " Edit category"
            ] })
          ] })
        ] })
      ] }, cat);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditCategoryDialog, { open: editCat !== null, category: editCat, vendorId: vendorLogin, onClose: () => setEditCat(null), onAddNew: (c) => {
      setEditCat(null);
      setAddCat(c);
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddItemDialog, { open: addCat !== null, category: addCat, vendorId: vendorLogin, onClose: () => setAddCat(null) })
  ] });
}
function EditCategoryDialog({
  open,
  category,
  vendorId,
  onClose,
  onAddNew
}) {
  const liveMenu = useLiveMenu();
  const updateMenuItem = useApp((s) => s.updateMenuItem);
  const deleteMenuItem = useApp((s) => s.deleteMenuItem);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const items = category ? liveMenu.filter((m) => m.vendorId === vendorId && m.category === category) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl", children: category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Edit prices, names, or descriptions. Remove items you don't sell anymore." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-3", children: [
      items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: "No items in this category yet." }),
      items.map((it) => editingId === it.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ItemEditor, { item: it, onSave: (patch) => {
        updateMenuItem(it.id, patch);
        toast.success("Item updated");
        setEditingId(null);
      }, onCancel: () => setEditingId(null) }, it.id) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-border bg-background p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.image, alt: it.name, className: "h-14 w-14 flex-shrink-0 rounded-xl object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-semibold", children: it.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "Rs. ",
            it.price
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditingId(it.id), className: "rounded-full border border-border px-4 py-2 text-sm font-bold hover:border-primary", children: "Edit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDeletingId(it.id), "aria-label": "Remove item", className: "rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-destructive hover:bg-destructive/10 hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] }, it.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-4 gap-3 sm:gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => category && onAddNew(category), className: "inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold hover:border-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Add item to ",
        category
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background hover:bg-foreground/90", children: "Done" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: deletingId !== null, onOpenChange: (v) => !v && setDeletingId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-destructive" }),
        "Delete item?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Are you sure you want to delete this menu item? This action cannot be undone." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-full", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => {
          if (deletingId) {
            deleteMenuItem(deletingId);
            toast.info("Item removed");
          }
          setDeletingId(null);
        }, className: "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Delete" })
      ] })
    ] }) })
  ] }) });
}
function ItemEditor({
  item,
  onSave,
  onCancel
}) {
  const [name, setName] = reactExports.useState(item.name);
  const [price, setPrice] = reactExports.useState(String(item.price));
  const [description, setDescription] = reactExports.useState(item.description);
  const [image, setImage] = reactExports.useState(item.image);
  const fileRef = reactExports.useRef(null);
  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    const p = parseInt(price, 10);
    if (!name.trim() || !p) {
      toast.error("Name and price are required.");
      return;
    }
    onSave({
      name: name.trim(),
      price: p,
      description: description.trim(),
      image
    });
  }, className: "rounded-2xl border border-primary/40 bg-primary/5 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => fileRef.current?.click(), className: "group relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-dashed border-border", "aria-label": "Change picture", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: "", className: "h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 grid place-items-center bg-black/50 text-cream opacity-0 transition-opacity group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && handleFile(e.target.files[0]) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Name", className: "rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: price, onChange: (e) => setPrice(e.target.value.replace(/[^0-9]/g, "")), inputMode: "numeric", placeholder: "Price", className: "w-24 rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Description", className: "flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-end gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onCancel, className: "rounded-full border border-border px-5 py-2 text-sm font-bold", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground", children: "Save" })
    ] })
  ] });
}
function AddItemDialog({
  open,
  category,
  vendorId,
  onClose
}) {
  const addMenuItem = useApp((s) => s.addMenuItem);
  const [name, setName] = reactExports.useState("");
  const [price, setPrice] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [image, setImage] = reactExports.useState(null);
  const fileRef = reactExports.useRef(null);
  const reset = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
  };
  const handleFile = (file) => {
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
      image: image ?? CATEGORY_IMAGES[category]
    });
    toast.success(`${name.trim()} added to ${category}`);
    reset();
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => {
    if (!v) {
      reset();
      onClose();
    }
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "rounded-3xl border border-border bg-card p-6 sm:max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    submit();
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-2xl", children: [
        "Add item ",
        category && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
          "to ",
          category
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Upload a picture and fill in the details. It'll show up to customers immediately." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => fileRef.current?.click(), className: "group relative h-32 w-full overflow-hidden rounded-2xl border-2 border-dashed border-border bg-background", children: [
          image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-6 w-6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Tap to upload picture" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 grid place-items-center bg-black/40 text-cream opacity-0 transition-opacity group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-5 w-5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && handleFile(e.target.files[0]) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Item name", className: "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: price, onChange: (e) => setPrice(e.target.value.replace(/[^0-9]/g, "")), inputMode: "numeric", placeholder: "Price (Rs.)", className: "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value.slice(0, 160)), rows: 2, placeholder: "Short description (optional)", className: "w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-4 gap-3 sm:gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
        reset();
        onClose();
      }, className: "inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
        " Cancel"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-warm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-4 w-4" }),
        " Add item"
      ] })
    ] })
  ] }) }) });
}
export {
  ManagePage as component
};
