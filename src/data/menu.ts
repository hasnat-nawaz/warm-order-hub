import aloo from "@/assets/aloo-paratha.jpg";
import chai from "@/assets/karak-chai.jpg";
import burger from "@/assets/spicy-burger.jpg";
import roll from "@/assets/chicken-roll.jpg";
import juice from "@/assets/strawberry-juice.jpg";
import biryani from "@/assets/biryani.jpg";
import fries from "@/assets/fries.jpg";
import sandwich from "@/assets/club-sandwich.jpg";

import vRaju from "@/assets/vendor-raju.jpg";
import vHot from "@/assets/vendor-hotspicy.jpg";
import vSip from "@/assets/vendor-sipspot.jpg";

/**
 * The five static categories used across the customer + vendor surfaces.
 * Order matters — it's the order shown in the management grid.
 */
export const CATEGORIES = ["Breakfast", "Desi", "Fastfood", "Chinese", "Drinks"] as const;

export type Category = (typeof CATEGORIES)[number];

/** A representative image for each category card. */
export const CATEGORY_IMAGES: Record<Category, string> = {
  Breakfast: aloo,
  Desi: biryani,
  Fastfood: burger,
  Chinese: fries, // re-used: warm fried side fits the look
  Drinks: juice,
};

export type MenuItem = {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
};

export type Vendor = {
  id: string;
  name: string;
  tagline: string;
  location: string;
  hours: string;
  prepTime: string;
  rating: number;
  image: string;
  accepting: boolean;
};

export const vendors: Vendor[] = [
  {
    id: "raju",
    name: "Raju Dhaba",
    tagline: "Desi classics & morning parathas",
    location: "Near Faculty Block",
    hours: "7:00 AM – 11:00 PM",
    prepTime: "8–12 min",
    rating: 4.7,
    image: vRaju,
    accepting: true,
  },
  {
    id: "hot",
    name: "Hot & Spicy",
    tagline: "Burgers, rolls, fries — fired up",
    location: "Cafeteria Wing",
    hours: "11:00 AM – 1:00 AM",
    prepTime: "10–15 min",
    rating: 4.5,
    image: vHot,
    accepting: true,
  },
  {
    id: "sip",
    name: "Sip Spot",
    tagline: "Fresh juices & cold beverages",
    location: "Library Side",
    hours: "9:00 AM – 10:00 PM",
    prepTime: "3–5 min",
    rating: 4.8,
    image: vSip,
    accepting: false,
  },
];

/** Built-in menu seed. Vendors can extend this in the manage page. */
export const baseMenu: MenuItem[] = [
  {
    id: "raju-paratha",
    vendorId: "raju",
    name: "Aloo Paratha",
    price: 80,
    category: "Breakfast",
    image: aloo,
    description: "Stuffed paratha with butter, served with yogurt & pickle.",
  },
  {
    id: "raju-chai",
    vendorId: "raju",
    name: "Karak Chai",
    price: 50,
    category: "Drinks",
    image: chai,
    description: "Strong, milky chai brewed the desi way.",
  },
  {
    id: "raju-biryani",
    vendorId: "raju",
    name: "Chicken Biryani",
    price: 220,
    category: "Desi",
    image: biryani,
    description: "Aromatic basmati rice with tender chicken & raita.",
  },
  {
    id: "raju-roll",
    vendorId: "raju",
    name: "Anwar Roll",
    price: 150,
    category: "Desi",
    image: roll,
    description: "Spicy chicken wrap with chutneys, freshly made.",
  },

  {
    id: "hot-burger",
    vendorId: "hot",
    name: "Hot Fillet Burger",
    price: 280,
    category: "Fastfood",
    image: burger,
    description: "Crispy chicken fillet, melted cheese, fiery sauce.",
  },
  {
    id: "hot-fries",
    vendorId: "hot",
    name: "Crispy Fries",
    price: 120,
    category: "Fastfood",
    image: fries,
    description: "Golden fries with house ketchup.",
  },
  {
    id: "hot-sandwich",
    vendorId: "hot",
    name: "Club Sandwich",
    price: 250,
    category: "Fastfood",
    image: sandwich,
    description: "Triple-decker chicken, egg, lettuce & tomato.",
  },
  {
    id: "hot-chowmein",
    vendorId: "hot",
    name: "Chicken Chowmein",
    price: 230,
    category: "Chinese",
    image: fries,
    description: "Stir-fried noodles tossed with veggies & shredded chicken.",
  },

  {
    id: "sip-strawberry",
    vendorId: "sip",
    name: "Strawberry Juice",
    price: 100,
    category: "Drinks",
    image: juice,
    description: "Fresh strawberries, blended cold.",
  },
  {
    id: "sip-chai",
    vendorId: "sip",
    name: "Cardamom Chai",
    price: 60,
    category: "Drinks",
    image: chai,
    description: "Aromatic chai with crushed cardamom.",
  },
];

// Back-compat: many existing imports use the `menu` symbol. Keep it as a
// reference to the seed list — code that needs the *live* (vendor-edited)
// menu should pull it from the store via `useApp`.
export const menu = baseMenu;

export const getVendor = (id: string) => vendors.find((v) => v.id === id);
export const getItem = (id: string, list: MenuItem[] = baseMenu) => list.find((m) => m.id === id);
export const itemsByVendor = (id: string, list: MenuItem[] = baseMenu) =>
  list.filter((m) => m.vendorId === id);
