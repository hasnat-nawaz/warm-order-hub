import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useApp } from "@/store/useApp";
import { vendors } from "@/data/menu";
import { ChefHat, Flame, User, ShieldCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Campus Dhaba" }] }),
  validateSearch: searchSchema,
  component: LoginPage,
});

function LoginPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const setRole = useApp((s) => s.setRole);
  const role = useApp((s) => s.role);
  const vendorLogin = useApp((s) => s.vendorLogin);

  const [tab, setTab] = useState<"customer" | "vendor">("customer");
  const [name, setName] = useState("");
  const [vendorId, setVendorId] = useState(vendors[0].id);

  const goAfterLogin = (destRole: "customer" | "vendor") => {
    const fallback = destRole === "vendor" ? "/vendor" : "/";
    const dest = search.redirect && search.redirect.startsWith("/") ? search.redirect : fallback;
    navigate({ to: dest });
  };

  const handleCustomer = () => {
    setRole("customer", { customer: name || "Guest" });
    toast.success(`Welcome${name ? `, ${name}` : ""}!`);
    goAfterLogin("customer");
  };

  const handleVendor = () => {
    setRole("vendor", { vendorId });
    const v = vendors.find((x) => x.id === vendorId);
    toast.success(`Signed in as ${v?.name ?? "vendor"}`);
    goAfterLogin("vendor");
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-10 sm:px-6">
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-warm shadow-warm">
          <Flame className="h-7 w-7 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <h1 className="mt-5 font-display text-3xl font-bold sm:text-4xl">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose how you want to use Campus Dhaba today.
        </p>
        {role && (
          <p className="mt-3 text-xs text-muted-foreground">
            Currently signed in as{" "}
            <span className="font-semibold text-foreground">
              {role === "vendor"
                ? (vendors.find((v) => v.id === vendorLogin)?.name ?? "vendor")
                : "customer"}
            </span>
            .
          </p>
        )}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-2 rounded-full border border-border bg-card p-1 text-sm font-semibold">
        <button
          onClick={() => setTab("customer")}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 transition-colors ${
            tab === "customer"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="h-4 w-4" /> Customer
        </button>
        <button
          onClick={() => setTab("vendor")}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 transition-colors ${
            tab === "vendor"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ChefHat className="h-4 w-4" /> Vendor
        </button>
      </div>

      {tab === "customer" ? (
        <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <User className="h-3.5 w-3.5" /> Customer sign in
          </div>
          <h2 className="mt-1 font-display text-xl font-bold">Browse, order, eat.</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            No password needed for the demo. Just tell us your name.
          </p>
          <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCustomer()}
            placeholder="e.g. Ahmed Khan"
            className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-base focus:border-primary focus:outline-none"
          />
          <button
            onClick={handleCustomer}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-warm transition-transform hover:-translate-y-0.5"
          >
            Continue as customer <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      ) : (
        <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <ShieldCheck className="h-3.5 w-3.5" /> Vendor sign in
          </div>
          <h2 className="mt-1 font-display text-xl font-bold">Manage your dhaba.</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Open or close, accept orders, and update progress live.
          </p>
          <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Choose your dhaba
          </label>
          <div className="mt-2 grid gap-2">
            {vendors.map((v) => (
              <label
                key={v.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                  vendorId === v.id ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="vendor"
                  checked={vendorId === v.id}
                  onChange={() => setVendorId(v.id)}
                  className="accent-primary"
                />
                <img src={v.image} alt="" className="h-8 w-8 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{v.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{v.tagline}</div>
                </div>
              </label>
            ))}
          </div>
          <button
            onClick={handleVendor}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-bold text-background hover:bg-foreground/90"
          >
            Open vendor dashboard <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Just exploring?{" "}
        <Link to="/" className="font-semibold text-primary hover:underline">
          Keep browsing
        </Link>
      </p>
    </main>
  );
}
