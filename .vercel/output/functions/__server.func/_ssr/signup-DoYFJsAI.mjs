import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route$9, u as useApp } from "./router-8hUpC1Lu.mjs";
import { a as addUser } from "./users-D1LT2A7q.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { k as UserPlus, l as ShieldCheck, U as User, m as Lock, E as EyeOff, n as Eye, A as ArrowRight } from "../_libs/lucide-react.mjs";
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
function SignupPage() {
  const search = Route$9.useSearch();
  const navigate = useNavigate();
  const setRole = useApp((s) => s.setRole);
  const [name, setName] = reactExports.useState("");
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPwd, setShowPwd] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const safeRedirect = search.redirect && search.redirect.startsWith("/") ? search.redirect : null;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !username.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      addUser({
        role: "customer",
        username: username.trim(),
        password,
        displayName: name.trim()
      });
      setRole("customer", {
        username: username.trim(),
        customer: name.trim(),
        displayName: name.trim()
      });
      toast.success(`Account created! Welcome, ${name.trim()}!`);
      navigate({
        to: safeRedirect ?? "/"
      });
    }, 350);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.main, { initial: {
    opacity: 0,
    scale: 0.96
  }, animate: {
    opacity: 1,
    scale: 1
  }, transition: {
    duration: 0.3,
    ease: "easeOut"
  }, className: "mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-10 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-foreground text-background shadow-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-6 w-6", strokeWidth: 2.5 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 font-display text-3xl font-bold sm:text-4xl", children: "Create account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Join Campus Dhaba to skip the queue." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-8 rounded-3xl border border-border bg-card p-6 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }),
        " Secure sign-up"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "name", className: "mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Full Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 focus-within:border-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "name", value: name, onChange: (e) => {
          setName(e.target.value);
          if (error) setError(null);
        }, autoComplete: "name", placeholder: "John Doe", className: "w-full bg-transparent text-base outline-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "username", className: "mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Username" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 focus-within:border-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "username", value: username, onChange: (e) => {
          setUsername(e.target.value);
          if (error) setError(null);
        }, autoComplete: "username", placeholder: "your_username", className: "w-full bg-transparent text-base outline-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", className: "mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 focus-within:border-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "password", type: showPwd ? "text" : "password", value: password, onChange: (e) => {
          setPassword(e.target.value);
          if (error) setError(null);
        }, autoComplete: "new-password", placeholder: "At least 6 characters", className: "w-full bg-transparent text-base tracking-wider outline-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": showPwd ? "Hide password" : "Show password", onClick: () => setShowPwd((s) => !s), className: "text-muted-foreground transition-colors hover:text-foreground", children: showPwd ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "alert", className: "mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm font-medium text-destructive", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: submitting, className: "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-warm transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0", children: [
        submitting ? "Creating account…" : "Sign up",
        !submitting && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-center text-sm text-muted-foreground", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", search, className: "font-semibold text-primary hover:underline", children: "Sign in" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-center text-xs text-muted-foreground", children: [
      "Just exploring?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "font-semibold text-primary hover:underline", children: "Keep browsing" })
    ] })
  ] });
}
export {
  SignupPage as component
};
