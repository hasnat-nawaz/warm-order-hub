/**
 * Static "backend" users for the demo. The login form looks up credentials
 * against this list and dispatches the correct role/vendor without showing
 * any role selector.
 *
 * NOTE: passwords are intentionally plain in this demo project; in a real
 * deployment they would be hashed and verified server-side.
 */

export type AppUser =
  | {
      role: "customer";
      username: string;
      password: string;
      displayName: string;
    }
  | {
      role: "vendor";
      username: string;
      password: string;
      displayName: string;
      vendorId: string;
    };

export const users: AppUser[] = [
  // Customers
  {
    role: "customer",
    username: "ahmed",
    password: "ahmed123",
    displayName: "Ahmed Khan",
  },
  {
    role: "customer",
    username: "ali",
    password: "ali123",
    displayName: "Ali Raza",
  },
  {
    role: "customer",
    username: "demo",
    password: "demo123",
    displayName: "Demo Student",
  },

  // Vendors — username = vendor id, easy to remember.
  {
    role: "vendor",
    username: "raju",
    password: "raju123",
    displayName: "Raju Dhaba",
    vendorId: "raju",
  },
  {
    role: "vendor",
    username: "ayan",
    password: "ayan123",
    displayName: "Ayan Gardens",
    vendorId: "ayan",
  },
  {
    role: "vendor",
    username: "sip",
    password: "sip123",
    displayName: "Sip Spot",
    vendorId: "sip",
  },
  {
    role: "vendor",
    username: "juice",
    password: "juice123",
    displayName: "Juice Spot",
    vendorId: "juice",
  },
];

/**
 * Looks up a user by their case-insensitive username + password match.
 * Returns null when no match — the caller should show a generic error
 * (don't disclose which field was wrong, that's the secure pattern).
 */
export const findUser = (username: string, password: string): AppUser | null => {
  const u = username.trim().toLowerCase();
  const match = users.find((x) => x.username.toLowerCase() === u && x.password === password);
  return match ?? null;
};

/** Adds a new user to the in-memory array for this session. */
export const addUser = (user: AppUser) => {
  users.push(user);
};
