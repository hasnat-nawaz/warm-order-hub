import "dotenv/config";
import bcrypt from "bcrypt";
import { pool } from "../src/db.js";

type VendorSeed = {
  id: string;
  name: string;
  tagline: string;
  location: string;
  hours: string;
  prepTime: string;
  accepting: boolean;
};

const vendors: VendorSeed[] = [
  {
    id: "ayan",
    name: "Ayan Gardens",
    tagline: "Garden-fresh bites, desi comfort & quick meals",
    location: "Tuc",
    hours: "7:30 AM – 11:30 PM",
    prepTime: "8–14 min",
    accepting: true,
  },
  {
    id: "sip",
    name: "Sip Spot",
    tagline: "Tea, coffee, coolers & quick snacks",
    location: "Tuc",
    hours: "9:00 AM – 10:30 PM",
    prepTime: "3–6 min",
    accepting: true,
  },
  {
    id: "raju",
    name: "Raju Hotel",
    tagline: "Breakfast to dinner — desi, fastfood & Chinese",
    location: "Tuc",
    hours: "7:00 AM – 12:00 AM",
    prepTime: "9–16 min",
    accepting: true,
  },
  {
    id: "juice",
    name: "Juice Spot",
    tagline: "Fresh juices, smoothies & chill sips",
    location: "Tuc",
    hours: "10:00 AM – 11:00 PM",
    prepTime: "3–7 min",
    accepting: true,
  },
];

type MenuSeed = {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  category: string;
  description: string;
};

// Keep ids aligned with frontend assets (src/assets/items/<id>.jpg)
const menu: MenuSeed[] = [
  { id: "ayan-paratha-platter", vendorId: "ayan", name: "Paratha Platter", price: 160, category: "Breakfast", description: "Flaky paratha with omelette, raita, and achar — perfect start." },
  { id: "ayan-omelette", vendorId: "ayan", name: "Masala Omelette", price: 120, category: "Breakfast", description: "Onion, green chilli, coriander — served hot with toast." },
  { id: "ayan-chana", vendorId: "ayan", name: "Chana Chaat", price: 140, category: "Breakfast", description: "Spiced chickpeas, potatoes, chutneys & a squeeze of lemon." },
  { id: "ayan-french-toast", vendorId: "ayan", name: "Cinnamon French Toast", price: 180, category: "Breakfast", description: "Golden toast with cinnamon sugar and honey drizzle." },
  { id: "ayan-zinger", vendorId: "ayan", name: "Crispy Zinger Burger", price: 320, category: "Fastfood", description: "Crunchy chicken, mayo sauce, lettuce — extra spicy option." },
  { id: "ayan-wrap", vendorId: "ayan", name: "Grilled Chicken Wrap", price: 280, category: "Fastfood", description: "Grilled chicken strips with garlic sauce and fresh veggies." },
  { id: "ayan-fries-masala", vendorId: "ayan", name: "Masala Fries", price: 160, category: "Fastfood", description: "Crispy fries tossed with chaat masala and peri-peri." },
  { id: "ayan-sandwich", vendorId: "ayan", name: "Club Sandwich", price: 260, category: "Fastfood", description: "Chicken, egg, cheese, lettuce — toasted and stacked." },
  { id: "ayan-karahi", vendorId: "ayan", name: "Chicken Karahi", price: 360, category: "Desi", description: "Tomato-based karahi with fresh ginger & coriander." },
  { id: "ayan-daal-fry", vendorId: "ayan", name: "Daal Fry", price: 220, category: "Desi", description: "Comforting lentils with tadka — served with naan/roti." },
  { id: "ayan-chicken-tikka", vendorId: "ayan", name: "Chicken Tikka (2 pcs)", price: 300, category: "Desi", description: "Char-grilled tikka with mint chutney and onions." },
  { id: "ayan-biryani", vendorId: "ayan", name: "Chicken Biryani", price: 260, category: "Desi", description: "Aromatic rice, tender chicken, raita on the side." },
  { id: "ayan-chowmein", vendorId: "ayan", name: "Chicken Chowmein", price: 250, category: "Chinese", description: "Wok-tossed noodles with veggies and shredded chicken." },
  { id: "ayan-fried-rice", vendorId: "ayan", name: "Egg Fried Rice", price: 220, category: "Chinese", description: "Fluffy rice with egg, spring onions and soy seasoning." },
  { id: "ayan-manchurian", vendorId: "ayan", name: "Chicken Manchurian", price: 320, category: "Chinese", description: "Tangy Indo-Chinese gravy with crispy chicken bites." },
  { id: "ayan-hot-sour", vendorId: "ayan", name: "Hot & Sour Soup", price: 180, category: "Chinese", description: "Warm, peppery soup with chicken and veggies." },
  { id: "ayan-mint-lemonade", vendorId: "ayan", name: "Mint Lemonade", price: 110, category: "Drinks", description: "Fresh mint, lemon, ice — super refreshing." },
  { id: "ayan-lassi", vendorId: "ayan", name: "Sweet Lassi", price: 140, category: "Drinks", description: "Creamy yogurt lassi, chilled and lightly sweetened." },
  { id: "ayan-iced-tea", vendorId: "ayan", name: "Peach Iced Tea", price: 150, category: "Drinks", description: "Light, fruity iced tea with a peach twist." },
  { id: "ayan-cold-coffee", vendorId: "ayan", name: "Cold Coffee", price: 190, category: "Drinks", description: "Chilled coffee blend with a creamy finish." },

  { id: "raju-halwa-puri", vendorId: "raju", name: "Halwa Puri", price: 180, category: "Breakfast", description: "Puri with chana and sooji halwa — weekend favourite." },
  { id: "raju-paratha-anda", vendorId: "raju", name: "Anda Paratha", price: 150, category: "Breakfast", description: "Crispy paratha with fried egg and chutney." },
  { id: "raju-nihari", vendorId: "raju", name: "Beef Nihari", price: 420, category: "Breakfast", description: "Slow-cooked nihari with fresh naan (limited early hours)." },
  { id: "raju-chai", vendorId: "raju", name: "Karak Chai", price: 70, category: "Drinks", description: "Strong, milky chai brewed the desi way." },
  { id: "raju-broast", vendorId: "raju", name: "Chicken Broast", price: 380, category: "Fastfood", description: "Crispy broast with fries and garlic mayo." },
  { id: "raju-shawarma", vendorId: "raju", name: "Chicken Shawarma", price: 240, category: "Fastfood", description: "Juicy shawarma with pickles and garlic sauce." },
  { id: "raju-nuggets", vendorId: "raju", name: "Chicken Nuggets (8 pcs)", price: 260, category: "Fastfood", description: "Crispy nuggets with dip — quick and filling." },
  { id: "raju-fries", vendorId: "raju", name: "Loaded Fries", price: 220, category: "Fastfood", description: "Cheese + sauces over hot fries." },
  { id: "raju-biryani", vendorId: "raju", name: "Spicy Chicken Biryani", price: 280, category: "Desi", description: "Aromatic biryani with raita — medium to spicy." },
  { id: "raju-daal-chawal", vendorId: "raju", name: "Daal Chawal", price: 240, category: "Desi", description: "Simple, comforting daal with steamed rice and achar." },
  { id: "raju-kebab-roll", vendorId: "raju", name: "Seekh Kebab Roll", price: 220, category: "Desi", description: "Smoky kebab with onions, chutney and naan wrap." },
  { id: "raju-chicken-handi", vendorId: "raju", name: "Chicken Handi", price: 380, category: "Desi", description: "Creamy handi-style chicken curry, best with naan." },
  { id: "raju-chowmein", vendorId: "raju", name: "Veg Chowmein", price: 230, category: "Chinese", description: "Stir-fried noodles with crunchy vegetables." },
  { id: "raju-chilli-chicken", vendorId: "raju", name: "Chilli Chicken", price: 340, category: "Chinese", description: "Saucy chilli chicken with peppers and onions." },
  { id: "raju-fried-rice", vendorId: "raju", name: "Chicken Fried Rice", price: 300, category: "Chinese", description: "Wok-fried rice with chicken and soy seasoning." },
  { id: "raju-soup", vendorId: "raju", name: "Chicken Corn Soup", price: 200, category: "Chinese", description: "Classic chicken corn soup with a pepper kick." },
  { id: "raju-roohafza", vendorId: "raju", name: "Rooh Afza Milk", price: 160, category: "Drinks", description: "Chilled milk with Rooh Afza syrup." },
  { id: "raju-lemon-soda", vendorId: "raju", name: "Lemon Soda", price: 120, category: "Drinks", description: "Sparkling lemon soda — salty or sweet." },
  { id: "raju-cold-coffee", vendorId: "raju", name: "Iced Coffee", price: 210, category: "Drinks", description: "Chilled coffee with ice and a smooth finish." },

  { id: "sip-mango-smoothie", vendorId: "sip", name: "Mango Smoothie", price: 220, category: "Juices", description: "Thick mango smoothie served ice-cold." },
  { id: "sip-orange-juice", vendorId: "sip", name: "Fresh Orange Juice", price: 200, category: "Juices", description: "Freshly squeezed oranges, no added sugar." },
  { id: "sip-mint-lime", vendorId: "sip", name: "Mint Lime Cooler", price: 170, category: "Juices", description: "Mint, lime, ice — a classic cooler." },
  { id: "sip-strawberry-shake", vendorId: "sip", name: "Strawberry Milkshake", price: 240, category: "Juices", description: "Creamy strawberry shake topped with foam." },
  { id: "sip-kashmiri-chai", vendorId: "sip", name: "Kashmiri Chai", price: 160, category: "Tea", description: "Pink tea with nuts — cozy and rich." },
  { id: "sip-karak-chai", vendorId: "sip", name: "Karak Chai", price: 90, category: "Tea", description: "Strong chai brewed with extra doodh." },
  { id: "sip-green-tea", vendorId: "sip", name: "Green Tea", price: 120, category: "Tea", description: "Light green tea with lemon option." },
  { id: "sip-elaichi-chai", vendorId: "sip", name: "Elaichi Chai", price: 95, category: "Tea", description: "Cardamom chai with a fragrant kick." },
  { id: "sip-espresso", vendorId: "sip", name: "Espresso Shot", price: 140, category: "Coffee", description: "Strong espresso — quick energy boost." },
  { id: "sip-cappuccino", vendorId: "sip", name: "Cappuccino", price: 220, category: "Coffee", description: "Foamy cappuccino with cocoa dusting." },
  { id: "sip-iced-latte", vendorId: "sip", name: "Iced Latte", price: 240, category: "Coffee", description: "Milk + espresso over ice, lightly sweetened." },
  { id: "sip-mocha", vendorId: "sip", name: "Chocolate Mocha", price: 260, category: "Coffee", description: "Coffee with chocolate — best of both worlds." },
  { id: "sip-fries", vendorId: "sip", name: "Crispy Fries", price: 160, category: "Snacks", description: "Golden fries with ketchup and mayo." },
  { id: "sip-samosa", vendorId: "sip", name: "Samosa (2 pcs)", price: 120, category: "Snacks", description: "Crispy samosas with chutney." },
  { id: "sip-grilled-sandwich", vendorId: "sip", name: "Grilled Sandwich", price: 220, category: "Snacks", description: "Toasted sandwich with cheese and chicken filling." },
  { id: "sip-brownie", vendorId: "sip", name: "Fudge Brownie", price: 190, category: "Snacks", description: "Rich brownie — perfect with coffee." },

  { id: "juice-watermelon", vendorId: "juice", name: "Watermelon Juice", price: 180, category: "Juices", description: "Chilled watermelon juice — super hydrating." },
  { id: "juice-pineapple", vendorId: "juice", name: "Pineapple Juice", price: 220, category: "Juices", description: "Tropical pineapple juice, served cold." },
  { id: "juice-banana-shake", vendorId: "juice", name: "Banana Milkshake", price: 210, category: "Juices", description: "Creamy banana shake with ice." },
  { id: "juice-mixed-fruit", vendorId: "juice", name: "Mixed Fruit Juice", price: 240, category: "Juices", description: "Seasonal fruits blended fresh (ask for today's mix)." },
  { id: "juice-lemon-tea", vendorId: "juice", name: "Lemon Tea", price: 140, category: "Tea", description: "Warm lemon tea — light and soothing." },
  { id: "juice-ginger-tea", vendorId: "juice", name: "Ginger Tea", price: 150, category: "Tea", description: "Zesty ginger tea for a clean kick." },
  { id: "juice-masala-chai", vendorId: "juice", name: "Masala Chai", price: 120, category: "Tea", description: "Spiced chai blend — classic comfort." },
  { id: "juice-kashmiri-chai", vendorId: "juice", name: "Kashmiri Chai", price: 180, category: "Tea", description: "Pink tea with nuts — served warm." },
  { id: "juice-americano", vendorId: "juice", name: "Americano", price: 200, category: "Coffee", description: "Clean black coffee — smooth and bold." },
  { id: "juice-cold-coffee", vendorId: "juice", name: "Cold Coffee", price: 230, category: "Coffee", description: "Chilled coffee blend with ice." },
  { id: "juice-vanilla-latte", vendorId: "juice", name: "Vanilla Latte", price: 260, category: "Coffee", description: "Latte with vanilla syrup — sweet and smooth." },
  { id: "juice-mocha", vendorId: "juice", name: "Mocha", price: 270, category: "Coffee", description: "Coffee with chocolate — rich and balanced." },
  { id: "juice-fruit-chaat", vendorId: "juice", name: "Fruit Chaat Cup", price: 180, category: "Snacks", description: "Seasonal fruits with chaat masala and lemon." },
  { id: "juice-granola", vendorId: "juice", name: "Granola Yogurt Cup", price: 220, category: "Snacks", description: "Yogurt with granola and honey — light snack." },
  { id: "juice-fries", vendorId: "juice", name: "Peri-Peri Fries", price: 170, category: "Snacks", description: "Crispy fries with peri-peri seasoning." },
  { id: "juice-biscuits", vendorId: "juice", name: "Tea Biscuits Pack", price: 80, category: "Snacks", description: "Light biscuits that pair perfectly with tea." }
];

const demoUsers = [
  { role: "customer" as const, username: "ahmed", password: "ahmed123", displayName: "Ahmed Khan" },
  { role: "customer" as const, username: "ali", password: "ali123", displayName: "Ali Raza" },
  { role: "customer" as const, username: "demo", password: "demo123", displayName: "Demo Student" },
  { role: "vendor" as const, username: "ayan", password: "ayan123", displayName: "Ayan Gardens", vendorId: "ayan" },
  { role: "vendor" as const, username: "sip", password: "sip123", displayName: "Sip Spot", vendorId: "sip" },
  { role: "vendor" as const, username: "raju", password: "raju123", displayName: "Raju Dhaba", vendorId: "raju" },
  { role: "vendor" as const, username: "juice", password: "juice123", displayName: "Juice Spot", vendorId: "juice" }
];

async function main() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const v of vendors) {
      await client.query(
        `INSERT INTO vendors (id, name, tagline, location, hours, prep_time, accepting)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           tagline = EXCLUDED.tagline,
           location = EXCLUDED.location,
           hours = EXCLUDED.hours,
           prep_time = EXCLUDED.prep_time,
           accepting = EXCLUDED.accepting`,
        [v.id, v.name, v.tagline, v.location, v.hours, v.prepTime, v.accepting],
      );
    }

    for (const it of menu) {
      await client.query(
        `INSERT INTO menu_items (id, vendor_id, name, price, category, description, image_key, active)
         VALUES ($1,$2,$3,$4,$5,$6,$7,TRUE)
         ON CONFLICT (id) DO UPDATE SET
           vendor_id = EXCLUDED.vendor_id,
           name = EXCLUDED.name,
           price = EXCLUDED.price,
           category = EXCLUDED.category,
           description = EXCLUDED.description,
           image_key = EXCLUDED.image_key,
           active = TRUE`,
        [it.id, it.vendorId, it.name, it.price, it.category, it.description, it.id],
      );
    }

    for (const u of demoUsers) {
      const hash = await bcrypt.hash(u.password, 12);
      await client.query(
        `INSERT INTO users (username, password_hash, role, display_name, vendor_id)
         VALUES ($1,$2,$3,$4,$5)
         ON CONFLICT (username) DO UPDATE SET
           password_hash = EXCLUDED.password_hash,
           role = EXCLUDED.role,
           display_name = EXCLUDED.display_name,
           vendor_id = EXCLUDED.vendor_id`,
        [u.username.toLowerCase(), hash, u.role, u.displayName, (u as any).vendorId ?? null],
      );
    }

    await client.query("COMMIT");
    // eslint-disable-next-line no-console
    console.log("Seed complete: vendors, menu_items, demo users");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

