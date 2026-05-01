import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useApp } from "@/store/useApp";
import { addUser } from "@/data/users";
import { ArrowRight, Eye, EyeOff, Lock, ShieldCheck, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Campus Dhaba" }] }),
  validateSearch: searchSchema,
  component: SignupPage,
});

function SignupPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const setRole = useApp((s) => s.setRole);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const safeRedirect = search.redirect && search.redirect.startsWith("/") ? search.redirect : null;

  const handleSubmit = (e: React.FormEvent) => {
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
    // Fake a brief registration delay for better UX
    setTimeout(() => {
      // Save to our in-memory static users list so they can log in later
      addUser({
        role: "customer",
        username: username.trim(),
        password: password,
        displayName: name.trim(),
      });

      // Statically save by logging the user in automatically for this session
      setRole("customer", {
        username: username.trim(),
        customer: name.trim(),
        displayName: name.trim(),
      });

      toast.success(`Account created! Welcome, ${name.trim()}!`);
      navigate({ to: safeRedirect ?? "/" });
    }, 350);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-10 sm:px-6"
    >
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-foreground text-background shadow-warm">
          <UserPlus className="h-6 w-6" strokeWidth={2.5} />
        </div>
        <h1 className="mt-5 font-display text-3xl font-bold sm:text-4xl">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Join Campus Dhaba to skip the queue.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-card"
      >
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Secure sign-up
        </div>

        {/* Name */}
        <label
          htmlFor="name"
          className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Full Name
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 focus-within:border-primary">
          <User className="h-4 w-4 text-muted-foreground" />
          <input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError(null);
            }}
            autoComplete="name"
            placeholder="John Doe"
            className="w-full bg-transparent text-base outline-none"
          />
        </div>

        {/* Username */}
        <label
          htmlFor="username"
          className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Username
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 focus-within:border-primary">
          <User className="h-4 w-4 text-muted-foreground" />
          <input
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (error) setError(null);
            }}
            autoComplete="username"
            placeholder="your_username"
            className="w-full bg-transparent text-base outline-none"
          />
        </div>

        {/* Password */}
        <label
          htmlFor="password"
          className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Password
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 focus-within:border-primary">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <input
            id="password"
            type={showPwd ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(null);
            }}
            autoComplete="new-password"
            placeholder="At least 6 characters"
            className="w-full bg-transparent text-base tracking-wider outline-none"
          />
          <button
            type="button"
            aria-label={showPwd ? "Hide password" : "Show password"}
            onClick={() => setShowPwd((s) => !s)}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm font-medium text-destructive"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-warm transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {submitting ? "Creating account…" : "Sign up"}
          {!submitting && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" search={search} className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Just exploring?{" "}
        <Link to="/" className="font-semibold text-primary hover:underline">
          Keep browsing
        </Link>
      </p>
    </motion.main>
  );
}