const users = [
  // Customers
  {
    role: "customer",
    username: "ahmed",
    password: "ahmed123",
    displayName: "Ahmed Khan"
  },
  {
    role: "customer",
    username: "ali",
    password: "ali123",
    displayName: "Ali Raza"
  },
  {
    role: "customer",
    username: "demo",
    password: "demo123",
    displayName: "Demo Student"
  },
  // Vendors — username = vendor id, easy to remember.
  {
    role: "vendor",
    username: "raju",
    password: "raju123",
    displayName: "Raju Dhaba",
    vendorId: "raju"
  },
  {
    role: "vendor",
    username: "ayan",
    password: "ayan123",
    displayName: "Ayan Gardens",
    vendorId: "ayan"
  },
  {
    role: "vendor",
    username: "sip",
    password: "sip123",
    displayName: "Sip Spot",
    vendorId: "sip"
  },
  {
    role: "vendor",
    username: "juice",
    password: "juice123",
    displayName: "Juice Spot",
    vendorId: "juice"
  }
];
const findUser = (username, password) => {
  const u = username.trim().toLowerCase();
  const match = users.find((x) => x.username.toLowerCase() === u && x.password === password);
  return match ?? null;
};
const addUser = (user) => {
  users.push(user);
};
export {
  addUser as a,
  findUser as f
};
