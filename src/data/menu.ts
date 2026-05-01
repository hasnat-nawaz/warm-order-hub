import img_bff368adde from "@/assets/seed/unsplash-bff368adde.jpg";
import img_7e327d1cb2 from "@/assets/seed/unsplash-7e327d1cb2.jpg";
import img_10e2ab2e51 from "@/assets/seed/unsplash-10e2ab2e51.jpg";
import img_292639edc7 from "@/assets/seed/unsplash-292639edc7.jpg";
import img_3c735c7356 from "@/assets/seed/unsplash-3c735c7356.jpg";
import img_17d02479c6 from "@/assets/seed/unsplash-17d02479c6.jpg";
import img_b9960310f9 from "@/assets/seed/unsplash-b9960310f9.jpg";
import img_c12f6dffb2 from "@/assets/seed/unsplash-c12f6dffb2.jpg";
import img_e99f3cc54e from "@/assets/seed/unsplash-e99f3cc54e.jpg";
import img_4d9f9ef1d8 from "@/assets/seed/unsplash-4d9f9ef1d8.jpg";
import img_09642ca8e1 from "@/assets/seed/unsplash-09642ca8e1.jpg";
import img_3f43f2593c from "@/assets/seed/unsplash-3f43f2593c.jpg";
import img_8c54d0eabe from "@/assets/seed/unsplash-8c54d0eabe.jpg";
import img_515947a516 from "@/assets/seed/unsplash-515947a516.jpg";
import img_57d2d252e8 from "@/assets/seed/unsplash-57d2d252e8.jpg";
import img_474691f13e from "@/assets/seed/unsplash-474691f13e.jpg";
import img_059ee1f113 from "@/assets/seed/unsplash-059ee1f113.jpg";
import img_55b46d4c09 from "@/assets/seed/unsplash-55b46d4c09.jpg";
import img_07ea7833b6 from "@/assets/seed/unsplash-07ea7833b6.jpg";
import img_ba674455a1 from "@/assets/seed/unsplash-ba674455a1.jpg";
import img_76a9c13584 from "@/assets/seed/unsplash-76a9c13584.jpg";
import img_79dc7f6de8 from "@/assets/seed/unsplash-79dc7f6de8.jpg";
import img_b60777ed83 from "@/assets/seed/unsplash-b60777ed83.jpg";
import img_f77e13b7a6 from "@/assets/seed/unsplash-f77e13b7a6.jpg";
import img_6845938b48 from "@/assets/seed/unsplash-6845938b48.jpg";
import img_a729e9ff05 from "@/assets/seed/unsplash-a729e9ff05.jpg";
import img_d675f99f7d from "@/assets/seed/unsplash-d675f99f7d.jpg";
import img_537dcd75a4 from "@/assets/seed/unsplash-537dcd75a4.jpg";
import img_5a9db90c33 from "@/assets/seed/unsplash-5a9db90c33.jpg";
import img_0cdcb6ebae from "@/assets/seed/unsplash-0cdcb6ebae.jpg";
import img_138c7f4a8e from "@/assets/seed/unsplash-138c7f4a8e.jpg";
import img_ef9e0a86a6 from "@/assets/seed/unsplash-ef9e0a86a6.jpg";
import img_26dac0ce17 from "@/assets/seed/unsplash-26dac0ce17.jpg";
import img_c92351172f from "@/assets/seed/unsplash-c92351172f.jpg";
import img_01fc082101 from "@/assets/seed/unsplash-01fc082101.jpg";
import img_f200d1b76c from "@/assets/seed/unsplash-f200d1b76c.jpg";
import img_4d01b8fbd9 from "@/assets/seed/unsplash-4d01b8fbd9.jpg";
import img_d6bc7d2b61 from "@/assets/seed/unsplash-d6bc7d2b61.jpg";
import img_d82d2a1ef9 from "@/assets/seed/unsplash-d82d2a1ef9.jpg";
import img_11d0a6d5a4 from "@/assets/seed/unsplash-11d0a6d5a4.jpg";
import img_b2e3cd02d3 from "@/assets/seed/unsplash-b2e3cd02d3.jpg";
import img_b0d82f68e4 from "@/assets/seed/unsplash-b0d82f68e4.jpg";
import img_ead26fdf30 from "@/assets/seed/unsplash-ead26fdf30.jpg";
import img_54be4d7e9d from "@/assets/seed/unsplash-54be4d7e9d.jpg";
import img_7f46817868 from "@/assets/seed/unsplash-7f46817868.jpg";
import img_76bd290dde from "@/assets/seed/unsplash-76bd290dde.jpg";
import img_78d7dbfac3 from "@/assets/seed/unsplash-78d7dbfac3.jpg";
import img_e6d2322136 from "@/assets/seed/unsplash-e6d2322136.jpg";
import img_6bdce95a0a from "@/assets/seed/unsplash-6bdce95a0a.jpg";
import img_8ef3664b09 from "@/assets/seed/unsplash-8ef3664b09.jpg";
import img_ac417459ca from "@/assets/seed/unsplash-ac417459ca.jpg";
import img_c82fa8a411 from "@/assets/seed/unsplash-c82fa8a411.jpg";
import img_29f8405e43 from "@/assets/seed/unsplash-29f8405e43.jpg";
import img_628e37ae4f from "@/assets/seed/unsplash-628e37ae4f.jpg";
import img_a25047f01f from "@/assets/seed/unsplash-a25047f01f.jpg";
import img_54a36de39f from "@/assets/seed/unsplash-54a36de39f.jpg";
import img_5671167736 from "@/assets/seed/unsplash-5671167736.jpg";
import vAyanGardens from "@/assets/vendors/ayan-gardens.png";
import vSipSpot from "@/assets/vendors/sip-spot.png";
import vJuiceSpot from "@/assets/vendors/juice-spot.png";
import vRajuHotel from "@/assets/vendors/raju-hotel.png";

/**
 * The five static categories used across the customer + vendor surfaces.
 * Order matters — it's the order shown in the management grid.
 */
export const CATEGORIES = [
  // Full food vendors
  "Breakfast",
  "Fastfood",
  "Desi",
  "Chinese",
  "Drinks",
  // Beverage-focused vendors
  "Juices",
  "Tea",
  "Coffee",
  "Snacks",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** A representative image for each category card. */
export const CATEGORY_IMAGES: Record<Category, string> = {
  Breakfast:
    img_b2e3cd02d3,
  Fastfood:
    img_a729e9ff05,
  Desi: img_c92351172f,
  Chinese:
    img_138c7f4a8e,
  Drinks:
    img_ba674455a1,
  Juices:
    img_10e2ab2e51,
  Tea: img_79dc7f6de8,
  Coffee:
    img_3c735c7356,
  Snacks:
    img_55b46d4c09,
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
  image: string;
  accepting: boolean;
};

export const vendors: Vendor[] = [
  {
    id: "ayan",
    name: "Ayan Gardens",
    tagline: "Garden-fresh bites, desi comfort & quick meals",
    location: "Tuc",
    hours: "7:30 AM – 11:30 PM",
    prepTime: "8–14 min",
    image: vAyanGardens,
    accepting: true,
  },
  {
    id: "sip",
    name: "Sip Spot",
    tagline: "Tea, coffee, coolers & quick snacks",
    location: "Tuc",
    hours: "9:00 AM – 10:30 PM",
    prepTime: "3–6 min",
    image: vSipSpot,
    accepting: true,
  },
  {
    id: "raju",
    name: "Raju Hotel",
    tagline: "Breakfast to dinner — desi, fastfood & Chinese",
    location: "Tuc",
    hours: "7:00 AM – 12:00 AM",
    prepTime: "9–16 min",
    image: vRajuHotel,
    accepting: true,
  },
  {
    id: "juice",
    name: "Juice Spot",
    tagline: "Fresh juices, smoothies & chill sips",
    location: "Tuc",
    hours: "10:00 AM – 11:00 PM",
    prepTime: "3–7 min",
    image: vJuiceSpot,
    accepting: true,
  },
];


const itemImage = (id: string) => new URL(`../assets/items/${id}.jpg`, import.meta.url).href;

/** Built-in menu seed. Vendors can extend this in the manage page. */
export const baseMenu: MenuItem[] = [
  // ---------------- Ayan Gardens (ayan) ----------------
  {
    id: "ayan-paratha-platter",
    vendorId: "ayan",
    name: "Paratha Platter",
    price: 160,
    category: "Breakfast",
    image: itemImage("ayan-paratha-platter"),
    description: "Flaky paratha with omelette, raita, and achar — perfect start.",
  },
  {
    id: "ayan-omelette",
    vendorId: "ayan",
    name: "Masala Omelette",
    price: 120,
    category: "Breakfast",
    image: itemImage("ayan-omelette"),
    description: "Onion, green chilli, coriander — served hot with toast.",
  },
  {
    id: "ayan-chana",
    vendorId: "ayan",
    name: "Chana Chaat",
    price: 140,
    category: "Breakfast",
    image: itemImage("ayan-chana"),
    description: "Spiced chickpeas, potatoes, chutneys & a squeeze of lemon.",
  },
  {
    id: "ayan-french-toast",
    vendorId: "ayan",
    name: "Cinnamon French Toast",
    price: 180,
    category: "Breakfast",
    image: itemImage("ayan-french-toast"),
    description: "Golden toast with cinnamon sugar and honey drizzle.",
  },
  {
    id: "ayan-zinger",
    vendorId: "ayan",
    name: "Crispy Zinger Burger",
    price: 320,
    category: "Fastfood",
    image: itemImage("ayan-zinger"),
    description: "Crunchy chicken, mayo sauce, lettuce — extra spicy option.",
  },
  {
    id: "ayan-wrap",
    vendorId: "ayan",
    name: "Grilled Chicken Wrap",
    price: 280,
    category: "Fastfood",
    image: itemImage("ayan-wrap"),
    description: "Grilled chicken strips with garlic sauce and fresh veggies.",
  },
  {
    id: "ayan-fries-masala",
    vendorId: "ayan",
    name: "Masala Fries",
    price: 160,
    category: "Fastfood",
    image: itemImage("ayan-fries-masala"),
    description: "Crispy fries tossed with chaat masala and peri-peri.",
  },
  {
    id: "ayan-sandwich",
    vendorId: "ayan",
    name: "Club Sandwich",
    price: 260,
    category: "Fastfood",
    image: itemImage("ayan-sandwich"),
    description: "Chicken, egg, cheese, lettuce — toasted and stacked.",
  },
  {
    id: "ayan-karahi",
    vendorId: "ayan",
    name: "Chicken Karahi",
    price: 360,
    category: "Desi",
    image: itemImage("ayan-karahi"),
    description: "Tomato-based karahi with fresh ginger & coriander.",
  },
  {
    id: "ayan-daal-fry",
    vendorId: "ayan",
    name: "Daal Fry",
    price: 220,
    category: "Desi",
    image: itemImage("ayan-daal-fry"),
    description: "Comforting lentils with tadka — served with naan/roti.",
  },
  {
    id: "ayan-chicken-tikka",
    vendorId: "ayan",
    name: "Chicken Tikka (2 pcs)",
    price: 300,
    category: "Desi",
    image: itemImage("ayan-chicken-tikka"),
    description: "Char-grilled tikka with mint chutney and onions.",
  },
  {
    id: "ayan-biryani",
    vendorId: "ayan",
    name: "Chicken Biryani",
    price: 260,
    category: "Desi",
    image: itemImage("ayan-biryani"),
    description: "Aromatic rice, tender chicken, raita on the side.",
  },
  {
    id: "ayan-chowmein",
    vendorId: "ayan",
    name: "Chicken Chowmein",
    price: 250,
    category: "Chinese",
    image: itemImage("ayan-chowmein"),
    description: "Wok-tossed noodles with veggies and shredded chicken.",
  },
  {
    id: "ayan-fried-rice",
    vendorId: "ayan",
    name: "Egg Fried Rice",
    price: 220,
    category: "Chinese",
    image: itemImage("ayan-fried-rice"),
    description: "Fluffy rice with egg, spring onions and soy seasoning.",
  },
  {
    id: "ayan-manchurian",
    vendorId: "ayan",
    name: "Chicken Manchurian",
    price: 320,
    category: "Chinese",
    image: itemImage("ayan-manchurian"),
    description: "Tangy Indo-Chinese gravy with crispy chicken bites.",
  },
  {
    id: "ayan-hot-sour",
    vendorId: "ayan",
    name: "Hot & Sour Soup",
    price: 180,
    category: "Chinese",
    image: itemImage("ayan-hot-sour"),
    description: "Warm, peppery soup with chicken and veggies.",
  },
  {
    id: "ayan-mint-lemonade",
    vendorId: "ayan",
    name: "Mint Lemonade",
    price: 110,
    category: "Drinks",
    image: itemImage("ayan-mint-lemonade"),
    description: "Fresh mint, lemon, ice — super refreshing.",
  },
  {
    id: "ayan-lassi",
    vendorId: "ayan",
    name: "Sweet Lassi",
    price: 140,
    category: "Drinks",
    image: itemImage("ayan-lassi"),
    description: "Creamy yogurt lassi, chilled and lightly sweetened.",
  },
  {
    id: "ayan-iced-tea",
    vendorId: "ayan",
    name: "Peach Iced Tea",
    price: 150,
    category: "Drinks",
    image: itemImage("ayan-iced-tea"),
    description: "Light, fruity iced tea with a peach twist.",
  },
  {
    id: "ayan-cold-coffee",
    vendorId: "ayan",
    name: "Cold Coffee",
    price: 190,
    category: "Drinks",
    image: itemImage("ayan-cold-coffee"),
    description: "Chilled coffee blend with a creamy finish.",
  },

  // ---------------- Raju Hotel (raju) ----------------
  {
    id: "raju-halwa-puri",
    vendorId: "raju",
    name: "Halwa Puri",
    price: 180,
    category: "Breakfast",
    image: itemImage("raju-halwa-puri"),
    description: "Puri with chana and sooji halwa — weekend favourite.",
  },
  {
    id: "raju-paratha-anda",
    vendorId: "raju",
    name: "Anda Paratha",
    price: 150,
    category: "Breakfast",
    image: itemImage("raju-paratha-anda"),
    description: "Crispy paratha with fried egg and chutney.",
  },
  {
    id: "raju-nihari",
    vendorId: "raju",
    name: "Beef Nihari",
    price: 420,
    category: "Breakfast",
    image: itemImage("raju-nihari"),
    description: "Slow-cooked nihari with fresh naan (limited early hours).",
  },
  {
    id: "raju-chai",
    vendorId: "raju",
    name: "Karak Chai",
    price: 70,
    category: "Drinks",
    image: itemImage("raju-chai"),
    description: "Strong, milky chai brewed the desi way.",
  },
  {
    id: "raju-broast",
    vendorId: "raju",
    name: "Chicken Broast",
    price: 380,
    category: "Fastfood",
    image: itemImage("raju-broast"),
    description: "Crispy broast with fries and garlic mayo.",
  },
  {
    id: "raju-shawarma",
    vendorId: "raju",
    name: "Chicken Shawarma",
    price: 240,
    category: "Fastfood",
    image: itemImage("raju-shawarma"),
    description: "Juicy shawarma with pickles and garlic sauce.",
  },
  {
    id: "raju-nuggets",
    vendorId: "raju",
    name: "Chicken Nuggets (8 pcs)",
    price: 260,
    category: "Fastfood",
    image: itemImage("raju-nuggets"),
    description: "Crispy nuggets with dip — quick and filling.",
  },
  {
    id: "raju-fries",
    vendorId: "raju",
    name: "Loaded Fries",
    price: 220,
    category: "Fastfood",
    image: itemImage("raju-fries"),
    description: "Cheese + sauces over hot fries.",
  },
  {
    id: "raju-biryani",
    vendorId: "raju",
    name: "Spicy Chicken Biryani",
    price: 280,
    category: "Desi",
    image: itemImage("raju-biryani"),
    description: "Aromatic biryani with raita — medium to spicy.",
  },
  {
    id: "raju-daal-chawal",
    vendorId: "raju",
    name: "Daal Chawal",
    price: 240,
    category: "Desi",
    image: itemImage("raju-daal-chawal"),
    description: "Simple, comforting daal with steamed rice and achar.",
  },
  {
    id: "raju-kebab-roll",
    vendorId: "raju",
    name: "Seekh Kebab Roll",
    price: 220,
    category: "Desi",
    image: itemImage("raju-kebab-roll"),
    description: "Smoky kebab with onions, chutney and naan wrap.",
  },
  {
    id: "raju-chicken-handi",
    vendorId: "raju",
    name: "Chicken Handi",
    price: 380,
    category: "Desi",
    image: itemImage("raju-chicken-handi"),
    description: "Creamy handi-style chicken curry, best with naan.",
  },
  {
    id: "raju-chowmein",
    vendorId: "raju",
    name: "Veg Chowmein",
    price: 230,
    category: "Chinese",
    image: itemImage("raju-chowmein"),
    description: "Stir-fried noodles with crunchy vegetables.",
  },
  {
    id: "raju-chilli-chicken",
    vendorId: "raju",
    name: "Chilli Chicken",
    price: 340,
    category: "Chinese",
    image: itemImage("raju-chilli-chicken"),
    description: "Saucy chilli chicken with peppers and onions.",
  },
  {
    id: "raju-fried-rice",
    vendorId: "raju",
    name: "Chicken Fried Rice",
    price: 300,
    category: "Chinese",
    image: itemImage("raju-fried-rice"),
    description: "Wok-fried rice with chicken and soy seasoning.",
  },
  {
    id: "raju-soup",
    vendorId: "raju",
    name: "Chicken Corn Soup",
    price: 200,
    category: "Chinese",
    image: itemImage("raju-soup"),
    description: "Classic chicken corn soup with a pepper kick.",
  },
  {
    id: "raju-roohafza",
    vendorId: "raju",
    name: "Rooh Afza Milk",
    price: 160,
    category: "Drinks",
    image: itemImage("raju-roohafza"),
    description: "Chilled milk with Rooh Afza syrup.",
  },
  {
    id: "raju-lemon-soda",
    vendorId: "raju",
    name: "Lemon Soda",
    price: 120,
    category: "Drinks",
    image: itemImage("raju-lemon-soda"),
    description: "Sparkling lemon soda — salty or sweet.",
  },
  {
    id: "raju-cold-coffee",
    vendorId: "raju",
    name: "Iced Coffee",
    price: 210,
    category: "Drinks",
    image: itemImage("raju-cold-coffee"),
    description: "Chilled coffee with ice and a smooth finish.",
  },

  // ---------------- Sip Spot (sip) ----------------
  {
    id: "sip-mango-smoothie",
    vendorId: "sip",
    name: "Mango Smoothie",
    price: 220,
    category: "Juices",
    image: itemImage("sip-mango-smoothie"),
    description: "Thick mango smoothie served ice-cold.",
  },
  {
    id: "sip-orange-juice",
    vendorId: "sip",
    name: "Fresh Orange Juice",
    price: 200,
    category: "Juices",
    image: itemImage("sip-orange-juice"),
    description: "Freshly squeezed oranges, no added sugar.",
  },
  {
    id: "sip-mint-lime",
    vendorId: "sip",
    name: "Mint Lime Cooler",
    price: 170,
    category: "Juices",
    image: itemImage("sip-mint-lime"),
    description: "Mint, lime, ice — a classic cooler.",
  },
  {
    id: "sip-strawberry-shake",
    vendorId: "sip",
    name: "Strawberry Milkshake",
    price: 240,
    category: "Juices",
    image: itemImage("sip-strawberry-shake"),
    description: "Creamy strawberry shake topped with foam.",
  },
  {
    id: "sip-kashmiri-chai",
    vendorId: "sip",
    name: "Kashmiri Chai",
    price: 160,
    category: "Tea",
    image: itemImage("sip-kashmiri-chai"),
    description: "Pink tea with nuts — cozy and rich.",
  },
  {
    id: "sip-karak-chai",
    vendorId: "sip",
    name: "Karak Chai",
    price: 90,
    category: "Tea",
    image: itemImage("sip-karak-chai"),
    description: "Strong chai brewed with extra doodh.",
  },
  {
    id: "sip-green-tea",
    vendorId: "sip",
    name: "Green Tea",
    price: 120,
    category: "Tea",
    image: itemImage("sip-green-tea"),
    description: "Light green tea with lemon option.",
  },
  {
    id: "sip-elaichi-chai",
    vendorId: "sip",
    name: "Elaichi Chai",
    price: 95,
    category: "Tea",
    image: itemImage("sip-elaichi-chai"),
    description: "Cardamom chai with a fragrant kick.",
  },
  {
    id: "sip-espresso",
    vendorId: "sip",
    name: "Espresso Shot",
    price: 140,
    category: "Coffee",
    image: itemImage("sip-espresso"),
    description: "Strong espresso — quick energy boost.",
  },
  {
    id: "sip-cappuccino",
    vendorId: "sip",
    name: "Cappuccino",
    price: 220,
    category: "Coffee",
    image: itemImage("sip-cappuccino"),
    description: "Foamy cappuccino with cocoa dusting.",
  },
  {
    id: "sip-iced-latte",
    vendorId: "sip",
    name: "Iced Latte",
    price: 240,
    category: "Coffee",
    image: itemImage("sip-iced-latte"),
    description: "Milk + espresso over ice, lightly sweetened.",
  },
  {
    id: "sip-mocha",
    vendorId: "sip",
    name: "Chocolate Mocha",
    price: 260,
    category: "Coffee",
    image: itemImage("sip-mocha"),
    description: "Coffee with chocolate — best of both worlds.",
  },
  {
    id: "sip-fries",
    vendorId: "sip",
    name: "Crispy Fries",
    price: 160,
    category: "Snacks",
    image: itemImage("sip-fries"),
    description: "Golden fries with ketchup and mayo.",
  },
  {
    id: "sip-samosa",
    vendorId: "sip",
    name: "Samosa (2 pcs)",
    price: 120,
    category: "Snacks",
    image: itemImage("sip-samosa"),
    description: "Crispy samosas with chutney.",
  },
  {
    id: "sip-grilled-sandwich",
    vendorId: "sip",
    name: "Grilled Sandwich",
    price: 220,
    category: "Snacks",
    image: itemImage("sip-grilled-sandwich"),
    description: "Toasted sandwich with cheese and chicken filling.",
  },
  {
    id: "sip-brownie",
    vendorId: "sip",
    name: "Fudge Brownie",
    price: 190,
    category: "Snacks",
    image: itemImage("sip-brownie"),
    description: "Rich brownie — perfect with coffee.",
  },

  // ---------------- Juice Spot (juice) ----------------
  {
    id: "juice-watermelon",
    vendorId: "juice",
    name: "Watermelon Juice",
    price: 180,
    category: "Juices",
    image: itemImage("juice-watermelon"),
    description: "Chilled watermelon juice — super hydrating.",
  },
  {
    id: "juice-pineapple",
    vendorId: "juice",
    name: "Pineapple Juice",
    price: 220,
    category: "Juices",
    image: itemImage("juice-pineapple"),
    description: "Tropical pineapple juice, served cold.",
  },
  {
    id: "juice-banana-shake",
    vendorId: "juice",
    name: "Banana Milkshake",
    price: 210,
    category: "Juices",
    image: itemImage("juice-banana-shake"),
    description: "Creamy banana shake with ice.",
  },
  {
    id: "juice-mixed-fruit",
    vendorId: "juice",
    name: "Mixed Fruit Juice",
    price: 240,
    category: "Juices",
    image: itemImage("juice-mixed-fruit"),
    description: "Seasonal fruits blended fresh (ask for today's mix).",
  },
  {
    id: "juice-lemon-tea",
    vendorId: "juice",
    name: "Lemon Tea",
    price: 140,
    category: "Tea",
    image: itemImage("juice-lemon-tea"),
    description: "Warm lemon tea — light and soothing.",
  },
  {
    id: "juice-ginger-tea",
    vendorId: "juice",
    name: "Ginger Tea",
    price: 150,
    category: "Tea",
    image: itemImage("juice-ginger-tea"),
    description: "Zesty ginger tea for a clean kick.",
  },
  {
    id: "juice-masala-chai",
    vendorId: "juice",
    name: "Masala Chai",
    price: 120,
    category: "Tea",
    image: itemImage("juice-masala-chai"),
    description: "Spiced chai blend — classic comfort.",
  },
  {
    id: "juice-kashmiri-chai",
    vendorId: "juice",
    name: "Kashmiri Chai",
    price: 180,
    category: "Tea",
    image: itemImage("juice-kashmiri-chai"),
    description: "Pink tea with nuts — served warm.",
  },
  {
    id: "juice-americano",
    vendorId: "juice",
    name: "Americano",
    price: 200,
    category: "Coffee",
    image: itemImage("juice-americano"),
    description: "Clean black coffee — smooth and bold.",
  },
  {
    id: "juice-cold-coffee",
    vendorId: "juice",
    name: "Cold Coffee",
    price: 230,
    category: "Coffee",
    image: itemImage("juice-cold-coffee"),
    description: "Chilled coffee blend with ice.",
  },
  {
    id: "juice-vanilla-latte",
    vendorId: "juice",
    name: "Vanilla Latte",
    price: 260,
    category: "Coffee",
    image: itemImage("juice-vanilla-latte"),
    description: "Latte with vanilla syrup — sweet and smooth.",
  },
  {
    id: "juice-mocha",
    vendorId: "juice",
    name: "Mocha",
    price: 270,
    category: "Coffee",
    image: itemImage("juice-mocha"),
    description: "Coffee with chocolate — rich and balanced.",
  },
  {
    id: "juice-fruit-chaat",
    vendorId: "juice",
    name: "Fruit Chaat Cup",
    price: 180,
    category: "Snacks",
    image: itemImage("juice-fruit-chaat"),
    description: "Seasonal fruits with chaat masala and lemon.",
  },
  {
    id: "juice-granola",
    vendorId: "juice",
    name: "Granola Yogurt Cup",
    price: 220,
    category: "Snacks",
    image: itemImage("juice-granola"),
    description: "Yogurt with granola and honey — light snack.",
  },
  {
    id: "juice-fries",
    vendorId: "juice",
    name: "Peri-Peri Fries",
    price: 170,
    category: "Snacks",
    image: itemImage("juice-fries"),
    description: "Crispy fries with peri-peri seasoning.",
  },
  {
    id: "juice-biscuits",
    vendorId: "juice",
    name: "Tea Biscuits Pack",
    price: 80,
    category: "Snacks",
    image: itemImage("juice-biscuits"),
    description: "Light biscuits that pair perfectly with tea.",
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
