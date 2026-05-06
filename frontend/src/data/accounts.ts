/**
 * Static "backend" of valid user accounts. The login form just calls
 * findAccount(username, password); the response decides whether we drop the
 * user into the customer or vendor experience.
 *
 * In a real app these would live in a database with hashed passwords. For
 * this HCI demo we keep the credentials in plain text so the marker can sign
 * in quickly — the demo accounts panel on the login page surfaces them.
 */

export type AccountRole = "customer" | "vendor";

export type Account = {
  username: string;
  password: string;
  role: AccountRole;
  displayName: string;
  /** Only set for vendor accounts: which dhaba this account manages. */
  vendorId?: string;
};

export const accounts: Account[] = [
  // Customers
  {
    username: "ahmed",
    password: "ahmed123",
    role: "customer",
    displayName: "Ahmed Khan",
  },
  {
    username: "sara",
    password: "sara123",
    role: "customer",
    displayName: "Sara Ali",
  },

  // Vendors
  {
    username: "raju",
    password: "raju123",
    role: "vendor",
    displayName: "Raju Dhaba",
    vendorId: "raju",
  },
  {
    username: "hotspicy",
    password: "hot123",
    role: "vendor",
    displayName: "Hot & Spicy",
    vendorId: "hot",
  },
  {
    username: "sipspot",
    password: "sip123",
    role: "vendor",
    displayName: "Sip Spot",
    vendorId: "sip",
  },
];

export const findAccount = (username: string, password: string): Account | null => {
  const u = username.trim().toLowerCase();
  return accounts.find((a) => a.username.toLowerCase() === u && a.password === password) ?? null;
};

/** Demo accounts shown on the login page hint panel. */
export const demoAccounts: Array<{ label: string; username: string; password: string }> = [
  { label: "Customer", username: "ahmed", password: "ahmed123" },
  { label: "Vendor (Raju Dhaba)", username: "raju", password: "raju123" },
  { label: "Vendor (Hot & Spicy)", username: "hotspicy", password: "hot123" },
];
