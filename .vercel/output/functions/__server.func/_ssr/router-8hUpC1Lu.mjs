import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as createRouter, u as useRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, d as useRouterState, O as Outlet, L as Link, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { H as redirect } from "../_libs/tanstack__router-core.mjs";
import { c as create, p as persist } from "../_libs/zustand.mjs";
import { S as SubTrigger2, a as SubContent2, P as Portal2, C as Content2, I as Item2, b as CheckboxItem2, c as ItemIndicator2, R as RadioItem2, L as Label2, d as Separator2, e as Root2, T as Trigger } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as toast, T as Toaster$1 } from "../_libs/sonner.mjs";
import { C as ChevronRight, a as Check, b as Circle, c as ChefHat, U as User, F as Flame, S as ShoppingBag, X, M as Menu, L as LogOut } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const img_10e2ab2e51 = "/assets/unsplash-10e2ab2e51-DMzyj5Wf.jpg";
const img_3c735c7356 = "/assets/unsplash-3c735c7356-_HLFi23g.jpg";
const img_55b46d4c09 = "/assets/unsplash-55b46d4c09-BAwMYih7.jpg";
const img_ba674455a1 = "/assets/unsplash-ba674455a1-B9OX0Iet.jpg";
const img_79dc7f6de8 = "/assets/unsplash-79dc7f6de8-CSPRZuW9.jpg";
const img_a729e9ff05 = "/assets/unsplash-a729e9ff05-xZQO0cCt.jpg";
const img_138c7f4a8e = "/assets/unsplash-138c7f4a8e-Cy3ypyz7.jpg";
const img_c92351172f = "/assets/unsplash-c92351172f-CDHLos3t.jpg";
const img_b2e3cd02d3 = "/assets/unsplash-b2e3cd02d3-VCT80YVw.jpg";
const vAyanGardens = "/assets/ayan-gardens-BjLdx4vN.png";
const vSipSpot = "/assets/sip-spot-D3SjoAWJ.png";
const vJuiceSpot = "/assets/juice-spot-IU1IcX0m.png";
const vRajuHotel = "/assets/raju-hotel-CmavadbE.png";
const CATEGORIES = [
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
  "Snacks"
];
const CATEGORY_IMAGES = {
  Breakfast: img_b2e3cd02d3,
  Fastfood: img_a729e9ff05,
  Desi: img_c92351172f,
  Chinese: img_138c7f4a8e,
  Drinks: img_ba674455a1,
  Juices: img_10e2ab2e51,
  Tea: img_79dc7f6de8,
  Coffee: img_3c735c7356,
  Snacks: img_55b46d4c09
};
const vendors = [
  {
    id: "ayan",
    name: "Ayan Gardens",
    tagline: "Garden-fresh bites, desi comfort & quick meals",
    location: "Tuc",
    hours: "7:30 AM – 11:30 PM",
    prepTime: "8–14 min",
    image: vAyanGardens,
    accepting: true
  },
  {
    id: "sip",
    name: "Sip Spot",
    tagline: "Tea, coffee, coolers & quick snacks",
    location: "Tuc",
    hours: "9:00 AM – 10:30 PM",
    prepTime: "3–6 min",
    image: vSipSpot,
    accepting: true
  },
  {
    id: "raju",
    name: "Raju Hotel",
    tagline: "Breakfast to dinner — desi, fastfood & Chinese",
    location: "Tuc",
    hours: "7:00 AM – 12:00 AM",
    prepTime: "9–16 min",
    image: vRajuHotel,
    accepting: true
  },
  {
    id: "juice",
    name: "Juice Spot",
    tagline: "Fresh juices, smoothies & chill sips",
    location: "Tuc",
    hours: "10:00 AM – 11:00 PM",
    prepTime: "3–7 min",
    image: vJuiceSpot,
    accepting: true
  }
];
const itemImage = (id) => new URL(`../assets/items/${id}.jpg`, import.meta.url).href;
const baseMenu = [
  // ---------------- Ayan Gardens (ayan) ----------------
  {
    id: "ayan-paratha-platter",
    vendorId: "ayan",
    name: "Paratha Platter",
    price: 160,
    category: "Breakfast",
    image: itemImage("ayan-paratha-platter"),
    description: "Flaky paratha with omelette, raita, and achar — perfect start."
  },
  {
    id: "ayan-omelette",
    vendorId: "ayan",
    name: "Masala Omelette",
    price: 120,
    category: "Breakfast",
    image: itemImage("ayan-omelette"),
    description: "Onion, green chilli, coriander — served hot with toast."
  },
  {
    id: "ayan-chana",
    vendorId: "ayan",
    name: "Chana Chaat",
    price: 140,
    category: "Breakfast",
    image: itemImage("ayan-chana"),
    description: "Spiced chickpeas, potatoes, chutneys & a squeeze of lemon."
  },
  {
    id: "ayan-french-toast",
    vendorId: "ayan",
    name: "Cinnamon French Toast",
    price: 180,
    category: "Breakfast",
    image: itemImage("ayan-french-toast"),
    description: "Golden toast with cinnamon sugar and honey drizzle."
  },
  {
    id: "ayan-zinger",
    vendorId: "ayan",
    name: "Crispy Zinger Burger",
    price: 320,
    category: "Fastfood",
    image: itemImage("ayan-zinger"),
    description: "Crunchy chicken, mayo sauce, lettuce — extra spicy option."
  },
  {
    id: "ayan-wrap",
    vendorId: "ayan",
    name: "Grilled Chicken Wrap",
    price: 280,
    category: "Fastfood",
    image: itemImage("ayan-wrap"),
    description: "Grilled chicken strips with garlic sauce and fresh veggies."
  },
  {
    id: "ayan-fries-masala",
    vendorId: "ayan",
    name: "Masala Fries",
    price: 160,
    category: "Fastfood",
    image: itemImage("ayan-fries-masala"),
    description: "Crispy fries tossed with chaat masala and peri-peri."
  },
  {
    id: "ayan-sandwich",
    vendorId: "ayan",
    name: "Club Sandwich",
    price: 260,
    category: "Fastfood",
    image: itemImage("ayan-sandwich"),
    description: "Chicken, egg, cheese, lettuce — toasted and stacked."
  },
  {
    id: "ayan-karahi",
    vendorId: "ayan",
    name: "Chicken Karahi",
    price: 360,
    category: "Desi",
    image: itemImage("ayan-karahi"),
    description: "Tomato-based karahi with fresh ginger & coriander."
  },
  {
    id: "ayan-daal-fry",
    vendorId: "ayan",
    name: "Daal Fry",
    price: 220,
    category: "Desi",
    image: itemImage("ayan-daal-fry"),
    description: "Comforting lentils with tadka — served with naan/roti."
  },
  {
    id: "ayan-chicken-tikka",
    vendorId: "ayan",
    name: "Chicken Tikka (2 pcs)",
    price: 300,
    category: "Desi",
    image: itemImage("ayan-chicken-tikka"),
    description: "Char-grilled tikka with mint chutney and onions."
  },
  {
    id: "ayan-biryani",
    vendorId: "ayan",
    name: "Chicken Biryani",
    price: 260,
    category: "Desi",
    image: itemImage("ayan-biryani"),
    description: "Aromatic rice, tender chicken, raita on the side."
  },
  {
    id: "ayan-chowmein",
    vendorId: "ayan",
    name: "Chicken Chowmein",
    price: 250,
    category: "Chinese",
    image: itemImage("ayan-chowmein"),
    description: "Wok-tossed noodles with veggies and shredded chicken."
  },
  {
    id: "ayan-fried-rice",
    vendorId: "ayan",
    name: "Egg Fried Rice",
    price: 220,
    category: "Chinese",
    image: itemImage("ayan-fried-rice"),
    description: "Fluffy rice with egg, spring onions and soy seasoning."
  },
  {
    id: "ayan-manchurian",
    vendorId: "ayan",
    name: "Chicken Manchurian",
    price: 320,
    category: "Chinese",
    image: itemImage("ayan-manchurian"),
    description: "Tangy Indo-Chinese gravy with crispy chicken bites."
  },
  {
    id: "ayan-hot-sour",
    vendorId: "ayan",
    name: "Hot & Sour Soup",
    price: 180,
    category: "Chinese",
    image: itemImage("ayan-hot-sour"),
    description: "Warm, peppery soup with chicken and veggies."
  },
  {
    id: "ayan-mint-lemonade",
    vendorId: "ayan",
    name: "Mint Lemonade",
    price: 110,
    category: "Drinks",
    image: itemImage("ayan-mint-lemonade"),
    description: "Fresh mint, lemon, ice — super refreshing."
  },
  {
    id: "ayan-lassi",
    vendorId: "ayan",
    name: "Sweet Lassi",
    price: 140,
    category: "Drinks",
    image: itemImage("ayan-lassi"),
    description: "Creamy yogurt lassi, chilled and lightly sweetened."
  },
  {
    id: "ayan-iced-tea",
    vendorId: "ayan",
    name: "Peach Iced Tea",
    price: 150,
    category: "Drinks",
    image: itemImage("ayan-iced-tea"),
    description: "Light, fruity iced tea with a peach twist."
  },
  {
    id: "ayan-cold-coffee",
    vendorId: "ayan",
    name: "Cold Coffee",
    price: 190,
    category: "Drinks",
    image: itemImage("ayan-cold-coffee"),
    description: "Chilled coffee blend with a creamy finish."
  },
  // ---------------- Raju Hotel (raju) ----------------
  {
    id: "raju-halwa-puri",
    vendorId: "raju",
    name: "Halwa Puri",
    price: 180,
    category: "Breakfast",
    image: itemImage("raju-halwa-puri"),
    description: "Puri with chana and sooji halwa — weekend favourite."
  },
  {
    id: "raju-paratha-anda",
    vendorId: "raju",
    name: "Anda Paratha",
    price: 150,
    category: "Breakfast",
    image: itemImage("raju-paratha-anda"),
    description: "Crispy paratha with fried egg and chutney."
  },
  {
    id: "raju-nihari",
    vendorId: "raju",
    name: "Beef Nihari",
    price: 420,
    category: "Breakfast",
    image: itemImage("raju-nihari"),
    description: "Slow-cooked nihari with fresh naan (limited early hours)."
  },
  {
    id: "raju-chai",
    vendorId: "raju",
    name: "Karak Chai",
    price: 70,
    category: "Drinks",
    image: itemImage("raju-chai"),
    description: "Strong, milky chai brewed the desi way."
  },
  {
    id: "raju-broast",
    vendorId: "raju",
    name: "Chicken Broast",
    price: 380,
    category: "Fastfood",
    image: itemImage("raju-broast"),
    description: "Crispy broast with fries and garlic mayo."
  },
  {
    id: "raju-shawarma",
    vendorId: "raju",
    name: "Chicken Shawarma",
    price: 240,
    category: "Fastfood",
    image: itemImage("raju-shawarma"),
    description: "Juicy shawarma with pickles and garlic sauce."
  },
  {
    id: "raju-nuggets",
    vendorId: "raju",
    name: "Chicken Nuggets (8 pcs)",
    price: 260,
    category: "Fastfood",
    image: itemImage("raju-nuggets"),
    description: "Crispy nuggets with dip — quick and filling."
  },
  {
    id: "raju-fries",
    vendorId: "raju",
    name: "Loaded Fries",
    price: 220,
    category: "Fastfood",
    image: itemImage("raju-fries"),
    description: "Cheese + sauces over hot fries."
  },
  {
    id: "raju-biryani",
    vendorId: "raju",
    name: "Spicy Chicken Biryani",
    price: 280,
    category: "Desi",
    image: itemImage("raju-biryani"),
    description: "Aromatic biryani with raita — medium to spicy."
  },
  {
    id: "raju-daal-chawal",
    vendorId: "raju",
    name: "Daal Chawal",
    price: 240,
    category: "Desi",
    image: itemImage("raju-daal-chawal"),
    description: "Simple, comforting daal with steamed rice and achar."
  },
  {
    id: "raju-kebab-roll",
    vendorId: "raju",
    name: "Seekh Kebab Roll",
    price: 220,
    category: "Desi",
    image: itemImage("raju-kebab-roll"),
    description: "Smoky kebab with onions, chutney and naan wrap."
  },
  {
    id: "raju-chicken-handi",
    vendorId: "raju",
    name: "Chicken Handi",
    price: 380,
    category: "Desi",
    image: itemImage("raju-chicken-handi"),
    description: "Creamy handi-style chicken curry, best with naan."
  },
  {
    id: "raju-chowmein",
    vendorId: "raju",
    name: "Veg Chowmein",
    price: 230,
    category: "Chinese",
    image: itemImage("raju-chowmein"),
    description: "Stir-fried noodles with crunchy vegetables."
  },
  {
    id: "raju-chilli-chicken",
    vendorId: "raju",
    name: "Chilli Chicken",
    price: 340,
    category: "Chinese",
    image: itemImage("raju-chilli-chicken"),
    description: "Saucy chilli chicken with peppers and onions."
  },
  {
    id: "raju-fried-rice",
    vendorId: "raju",
    name: "Chicken Fried Rice",
    price: 300,
    category: "Chinese",
    image: itemImage("raju-fried-rice"),
    description: "Wok-fried rice with chicken and soy seasoning."
  },
  {
    id: "raju-soup",
    vendorId: "raju",
    name: "Chicken Corn Soup",
    price: 200,
    category: "Chinese",
    image: itemImage("raju-soup"),
    description: "Classic chicken corn soup with a pepper kick."
  },
  {
    id: "raju-roohafza",
    vendorId: "raju",
    name: "Rooh Afza Milk",
    price: 160,
    category: "Drinks",
    image: itemImage("raju-roohafza"),
    description: "Chilled milk with Rooh Afza syrup."
  },
  {
    id: "raju-lemon-soda",
    vendorId: "raju",
    name: "Lemon Soda",
    price: 120,
    category: "Drinks",
    image: itemImage("raju-lemon-soda"),
    description: "Sparkling lemon soda — salty or sweet."
  },
  {
    id: "raju-cold-coffee",
    vendorId: "raju",
    name: "Iced Coffee",
    price: 210,
    category: "Drinks",
    image: itemImage("raju-cold-coffee"),
    description: "Chilled coffee with ice and a smooth finish."
  },
  // ---------------- Sip Spot (sip) ----------------
  {
    id: "sip-mango-smoothie",
    vendorId: "sip",
    name: "Mango Smoothie",
    price: 220,
    category: "Juices",
    image: itemImage("sip-mango-smoothie"),
    description: "Thick mango smoothie served ice-cold."
  },
  {
    id: "sip-orange-juice",
    vendorId: "sip",
    name: "Fresh Orange Juice",
    price: 200,
    category: "Juices",
    image: itemImage("sip-orange-juice"),
    description: "Freshly squeezed oranges, no added sugar."
  },
  {
    id: "sip-mint-lime",
    vendorId: "sip",
    name: "Mint Lime Cooler",
    price: 170,
    category: "Juices",
    image: itemImage("sip-mint-lime"),
    description: "Mint, lime, ice — a classic cooler."
  },
  {
    id: "sip-strawberry-shake",
    vendorId: "sip",
    name: "Strawberry Milkshake",
    price: 240,
    category: "Juices",
    image: itemImage("sip-strawberry-shake"),
    description: "Creamy strawberry shake topped with foam."
  },
  {
    id: "sip-kashmiri-chai",
    vendorId: "sip",
    name: "Kashmiri Chai",
    price: 160,
    category: "Tea",
    image: itemImage("sip-kashmiri-chai"),
    description: "Pink tea with nuts — cozy and rich."
  },
  {
    id: "sip-karak-chai",
    vendorId: "sip",
    name: "Karak Chai",
    price: 90,
    category: "Tea",
    image: itemImage("sip-karak-chai"),
    description: "Strong chai brewed with extra doodh."
  },
  {
    id: "sip-green-tea",
    vendorId: "sip",
    name: "Green Tea",
    price: 120,
    category: "Tea",
    image: itemImage("sip-green-tea"),
    description: "Light green tea with lemon option."
  },
  {
    id: "sip-elaichi-chai",
    vendorId: "sip",
    name: "Elaichi Chai",
    price: 95,
    category: "Tea",
    image: itemImage("sip-elaichi-chai"),
    description: "Cardamom chai with a fragrant kick."
  },
  {
    id: "sip-espresso",
    vendorId: "sip",
    name: "Espresso Shot",
    price: 140,
    category: "Coffee",
    image: itemImage("sip-espresso"),
    description: "Strong espresso — quick energy boost."
  },
  {
    id: "sip-cappuccino",
    vendorId: "sip",
    name: "Cappuccino",
    price: 220,
    category: "Coffee",
    image: itemImage("sip-cappuccino"),
    description: "Foamy cappuccino with cocoa dusting."
  },
  {
    id: "sip-iced-latte",
    vendorId: "sip",
    name: "Iced Latte",
    price: 240,
    category: "Coffee",
    image: itemImage("sip-iced-latte"),
    description: "Milk + espresso over ice, lightly sweetened."
  },
  {
    id: "sip-mocha",
    vendorId: "sip",
    name: "Chocolate Mocha",
    price: 260,
    category: "Coffee",
    image: itemImage("sip-mocha"),
    description: "Coffee with chocolate — best of both worlds."
  },
  {
    id: "sip-fries",
    vendorId: "sip",
    name: "Crispy Fries",
    price: 160,
    category: "Snacks",
    image: itemImage("sip-fries"),
    description: "Golden fries with ketchup and mayo."
  },
  {
    id: "sip-samosa",
    vendorId: "sip",
    name: "Samosa (2 pcs)",
    price: 120,
    category: "Snacks",
    image: itemImage("sip-samosa"),
    description: "Crispy samosas with chutney."
  },
  {
    id: "sip-grilled-sandwich",
    vendorId: "sip",
    name: "Grilled Sandwich",
    price: 220,
    category: "Snacks",
    image: itemImage("sip-grilled-sandwich"),
    description: "Toasted sandwich with cheese and chicken filling."
  },
  {
    id: "sip-brownie",
    vendorId: "sip",
    name: "Fudge Brownie",
    price: 190,
    category: "Snacks",
    image: itemImage("sip-brownie"),
    description: "Rich brownie — perfect with coffee."
  },
  // ---------------- Juice Spot (juice) ----------------
  {
    id: "juice-watermelon",
    vendorId: "juice",
    name: "Watermelon Juice",
    price: 180,
    category: "Juices",
    image: itemImage("juice-watermelon"),
    description: "Chilled watermelon juice — super hydrating."
  },
  {
    id: "juice-pineapple",
    vendorId: "juice",
    name: "Pineapple Juice",
    price: 220,
    category: "Juices",
    image: itemImage("juice-pineapple"),
    description: "Tropical pineapple juice, served cold."
  },
  {
    id: "juice-banana-shake",
    vendorId: "juice",
    name: "Banana Milkshake",
    price: 210,
    category: "Juices",
    image: itemImage("juice-banana-shake"),
    description: "Creamy banana shake with ice."
  },
  {
    id: "juice-mixed-fruit",
    vendorId: "juice",
    name: "Mixed Fruit Juice",
    price: 240,
    category: "Juices",
    image: itemImage("juice-mixed-fruit"),
    description: "Seasonal fruits blended fresh (ask for today's mix)."
  },
  {
    id: "juice-lemon-tea",
    vendorId: "juice",
    name: "Lemon Tea",
    price: 140,
    category: "Tea",
    image: itemImage("juice-lemon-tea"),
    description: "Warm lemon tea — light and soothing."
  },
  {
    id: "juice-ginger-tea",
    vendorId: "juice",
    name: "Ginger Tea",
    price: 150,
    category: "Tea",
    image: itemImage("juice-ginger-tea"),
    description: "Zesty ginger tea for a clean kick."
  },
  {
    id: "juice-masala-chai",
    vendorId: "juice",
    name: "Masala Chai",
    price: 120,
    category: "Tea",
    image: itemImage("juice-masala-chai"),
    description: "Spiced chai blend — classic comfort."
  },
  {
    id: "juice-kashmiri-chai",
    vendorId: "juice",
    name: "Kashmiri Chai",
    price: 180,
    category: "Tea",
    image: itemImage("juice-kashmiri-chai"),
    description: "Pink tea with nuts — served warm."
  },
  {
    id: "juice-americano",
    vendorId: "juice",
    name: "Americano",
    price: 200,
    category: "Coffee",
    image: itemImage("juice-americano"),
    description: "Clean black coffee — smooth and bold."
  },
  {
    id: "juice-cold-coffee",
    vendorId: "juice",
    name: "Cold Coffee",
    price: 230,
    category: "Coffee",
    image: itemImage("juice-cold-coffee"),
    description: "Chilled coffee blend with ice."
  },
  {
    id: "juice-vanilla-latte",
    vendorId: "juice",
    name: "Vanilla Latte",
    price: 260,
    category: "Coffee",
    image: itemImage("juice-vanilla-latte"),
    description: "Latte with vanilla syrup — sweet and smooth."
  },
  {
    id: "juice-mocha",
    vendorId: "juice",
    name: "Mocha",
    price: 270,
    category: "Coffee",
    image: itemImage("juice-mocha"),
    description: "Coffee with chocolate — rich and balanced."
  },
  {
    id: "juice-fruit-chaat",
    vendorId: "juice",
    name: "Fruit Chaat Cup",
    price: 180,
    category: "Snacks",
    image: itemImage("juice-fruit-chaat"),
    description: "Seasonal fruits with chaat masala and lemon."
  },
  {
    id: "juice-granola",
    vendorId: "juice",
    name: "Granola Yogurt Cup",
    price: 220,
    category: "Snacks",
    image: itemImage("juice-granola"),
    description: "Yogurt with granola and honey — light snack."
  },
  {
    id: "juice-fries",
    vendorId: "juice",
    name: "Peri-Peri Fries",
    price: 170,
    category: "Snacks",
    image: itemImage("juice-fries"),
    description: "Crispy fries with peri-peri seasoning."
  },
  {
    id: "juice-biscuits",
    vendorId: "juice",
    name: "Tea Biscuits Pack",
    price: 80,
    category: "Snacks",
    image: itemImage("juice-biscuits"),
    description: "Light biscuits that pair perfectly with tea."
  }
];
const getVendor = (id) => vendors.find((v) => v.id === id);
const defaultAccepting = vendors.reduce((acc, v) => {
  acc[v.id] = v.accepting;
  return acc;
}, {});
const useApp = create()(
  persist(
    (set, get) => ({
      cart: [],
      cartVendorId: null,
      favorites: ["hot-burger", "raju-roll", "sip-strawberry"],
      orders: [],
      customer: "Ahmed Khan",
      role: null,
      vendorLogin: null,
      username: null,
      displayName: null,
      vendorAccepting: defaultAccepting,
      customItems: [],
      itemOverrides: {},
      removedItemIds: [],
      orderCounter: 1001,
      itemCounter: 1,
      setRole: (role, opts) => {
        if (role === "vendor") {
          set({
            role: "vendor",
            vendorLogin: opts?.vendorId ?? vendors[0].id,
            username: opts?.username ?? null,
            displayName: opts?.displayName ?? null,
            cart: [],
            cartVendorId: null
          });
        } else if (role === "customer") {
          const display = opts?.displayName?.trim() || opts?.customer?.trim() || "Guest";
          set({
            role: "customer",
            vendorLogin: null,
            username: opts?.username ?? null,
            displayName: display,
            customer: display
          });
        } else {
          set({
            role: null,
            vendorLogin: null,
            username: null,
            displayName: null
          });
        }
      },
      logout: () => set({
        role: null,
        vendorLogin: null,
        username: null,
        displayName: null,
        cart: [],
        cartVendorId: null
      }),
      toggleVendorAccepting: (vendorId) => {
        const map = { ...get().vendorAccepting };
        map[vendorId] = !(map[vendorId] ?? true);
        set({ vendorAccepting: map });
      },
      addToCart: (item, qty = 1) => {
        const { cartVendorId, cart, vendorAccepting } = get();
        if (vendorAccepting[item.vendorId] === false) {
          return { ok: false, reason: "This dhaba is closed right now." };
        }
        if (cartVendorId && cartVendorId !== item.vendorId) {
          return {
            ok: false,
            reason: "Your cart has items from another vendor. Clear it first."
          };
        }
        const existing = cart.find((l) => l.itemId === item.id);
        const next = existing ? cart.map((l) => l.itemId === item.id ? { ...l, qty: l.qty + qty } : l) : [...cart, { itemId: item.id, qty }];
        set({ cart: next, cartVendorId: item.vendorId });
        return { ok: true };
      },
      removeFromCart: (itemId) => {
        const next = get().cart.filter((l) => l.itemId !== itemId);
        set({
          cart: next,
          cartVendorId: next.length ? get().cartVendorId : null
        });
      },
      setQty: (itemId, qty) => {
        if (qty <= 0) return get().removeFromCart(itemId);
        set({
          cart: get().cart.map((l) => l.itemId === itemId ? { ...l, qty } : l)
        });
      },
      clearCart: () => set({ cart: [], cartVendorId: null }),
      toggleFavorite: (itemId) => {
        const f = get().favorites;
        set({
          favorites: f.includes(itemId) ? f.filter((x) => x !== itemId) : [...f, itemId]
        });
      },
      addMenuItem: (input) => {
        const { itemCounter } = get();
        const item = {
          ...input,
          id: `custom-${itemCounter}`,
          custom: true
        };
        set({
          customItems: [...get().customItems, item],
          itemCounter: itemCounter + 1
        });
        return item;
      },
      updateMenuItem: (id, patch) => {
        const { customItems, itemOverrides } = get();
        const isCustom = customItems.some((c) => c.id === id);
        if (isCustom) {
          set({
            customItems: customItems.map((c) => c.id === id ? { ...c, ...patch, id: c.id } : c)
          });
        } else {
          set({
            itemOverrides: { ...itemOverrides, [id]: { ...itemOverrides[id], ...patch } }
          });
        }
      },
      deleteMenuItem: (id) => {
        const { customItems, removedItemIds } = get();
        const isCustom = customItems.some((c) => c.id === id);
        if (isCustom) {
          set({ customItems: customItems.filter((c) => c.id !== id) });
        } else if (!removedItemIds.includes(id)) {
          set({ removedItemIds: [...removedItemIds, id] });
        }
      },
      placeOrder: ({ pickupTime, payment, notes }) => {
        const { cart, cartVendorId, customer, orderCounter } = get();
        if (!cart.length || !cartVendorId) return null;
        const total = cart.reduce((s, l) => {
          const it = liveMenuFromState(get())().find((m) => m.id === l.itemId);
          return s + (it?.price ?? 0) * l.qty;
        }, 0);
        const order = {
          id: String(orderCounter),
          vendorId: cartVendorId,
          lines: cart,
          total,
          pickupTime,
          placedAt: Date.now(),
          status: "Pending",
          customer,
          payment,
          notes: notes?.trim() || void 0
        };
        set({
          orders: [order, ...get().orders],
          cart: [],
          cartVendorId: null,
          orderCounter: orderCounter + 1
        });
        return order;
      },
      quickOrder: (itemId, pickupTime) => {
        const item = liveMenuFromState(get())().find((m) => m.id === itemId);
        const { orderCounter } = get();
        const order = {
          id: String(orderCounter),
          vendorId: item.vendorId,
          lines: [{ itemId, qty: 1 }],
          total: item.price,
          pickupTime,
          placedAt: Date.now(),
          status: "Pending",
          customer: get().customer,
          payment: "EasyPaisa"
        };
        set({
          orders: [order, ...get().orders],
          orderCounter: orderCounter + 1
        });
        return order;
      },
      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map((o) => o.id === orderId ? { ...o, status } : o)
        });
      },
      updateOrderLines: (orderId, lines) => {
        set({
          orders: get().orders.map((o) => {
            if (o.id === orderId) {
              const liveMenu = liveMenuFromState(get())();
              const total = lines.reduce((s, l) => {
                const it = liveMenu.find((m) => m.id === l.itemId);
                return s + (it?.price ?? 0) * l.qty;
              }, 0);
              return { ...o, lines, total };
            }
            return o;
          })
        });
      },
      cancelOrder: (orderId, reason = "vendor") => {
        set({
          orders: get().orders.map(
            (o) => o.id === orderId ? { ...o, status: "Cancelled", cancellationReason: reason } : o
          )
        });
      }
    }),
    {
      name: "campus-dhaba",
      version: 3,
      migrate: (persisted) => {
        const state = persisted ?? {};
        return {
          ...state,
          role: state.role ?? null,
          vendorLogin: state.vendorLogin ?? null,
          username: state.username ?? null,
          displayName: state.displayName ?? null,
          vendorAccepting: { ...defaultAccepting, ...state.vendorAccepting ?? {} },
          customItems: state.customItems ?? [],
          itemOverrides: state.itemOverrides ?? {},
          removedItemIds: state.removedItemIds ?? [],
          itemCounter: state.itemCounter ?? 1,
          orderCounter: state.orderCounter && state.orderCounter >= 1001 ? state.orderCounter : 1001 + (state.orders?.length ?? 0)
        };
      }
    }
  )
);
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "campus-dhaba") {
      useApp.persist.rehydrate();
    }
  });
}
let _lm_customItems = null;
let _lm_itemOverrides = null;
let _lm_removedIds = null;
let _lm_cached = null;
const computeLiveMenu = (state) => {
  if (_lm_cached && _lm_customItems === state.customItems && _lm_itemOverrides === state.itemOverrides && _lm_removedIds === state.removedItemIds) {
    return _lm_cached;
  }
  const removed = new Set(state.removedItemIds);
  const overrides = state.itemOverrides;
  const basePart = baseMenu.filter((m) => !removed.has(m.id)).map((m) => overrides[m.id] ? { ...m, ...overrides[m.id] } : m);
  const customPart = state.customItems.filter((c) => !removed.has(c.id));
  _lm_customItems = state.customItems;
  _lm_itemOverrides = state.itemOverrides;
  _lm_removedIds = state.removedItemIds;
  _lm_cached = [...basePart, ...customPart];
  return _lm_cached;
};
const liveMenuFromState = (state) => () => computeLiveMenu(state);
const selectLiveMenu = (s) => computeLiveMenu(s);
const useLiveMenu = () => useApp(selectLiveMenu);
const cartTotal = (cart, list) => cart.reduce((s, l) => {
  const it = list.find((m) => m.id === l.itemId);
  return s + (it?.price ?? 0) * l.qty;
}, 0);
const pad = (n) => String(n).padStart(2, "0");
const nowTime24 = () => {
  const d = /* @__PURE__ */ new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const time24ToDate = (t, base = /* @__PURE__ */ new Date()) => {
  const [h, m] = t.split(":").map((n) => parseInt(n, 10));
  const d = new Date(base);
  d.setHours(h, m, 0, 0);
  return d;
};
const format12 = (t) => {
  if (!t || !t.includes(":")) return t;
  const [hStr, mStr] = t.split(":");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (Number.isNaN(h) || Number.isNaN(m)) return t;
  const suffix = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${pad(m)} ${suffix}`;
};
const formatDate12 = (d) => d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
const addMinutes24 = (t, mins) => {
  const d = time24ToDate(t);
  d.setMinutes(d.getMinutes() + mins);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const compareTime24 = (a, b) => {
  const [ah, am] = a.split(":").map(Number);
  const [bh, bm] = b.split(":").map(Number);
  return ah * 60 + am - (bh * 60 + bm);
};
const vendorPrepUpperMinutes = (vendorId) => {
  const v = getVendor(vendorId);
  if (!v) return 10;
  const match = v.prepTime.match(/(\d+)\s*[–\-to]+\s*(\d+)/);
  if (match) return parseInt(match[2], 10);
  const single = v.prepTime.match(/(\d+)/);
  return single ? parseInt(single[1], 10) : 10;
};
const suggestedPickupForVendor = (vendorId, orders) => {
  if (!vendorId) return addMinutes24(nowTime24(), 10);
  const queue = orders.filter(
    (o) => o.vendorId === vendorId && (o.status === "Pending" || o.status === "Preparing")
  ).length;
  const prep = vendorPrepUpperMinutes(vendorId);
  const wait = prep + Math.max(0, queue) * Math.max(3, Math.floor(prep / 2));
  return addMinutes24(nowTime24(), wait);
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[12rem] overflow-y-auto overflow-x-hidden rounded-2xl border border-white/20 bg-background/70 p-2 text-popover-foreground shadow-warm backdrop-blur-xl",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium outline-none transition-colors focus:bg-accent/40 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
const customerLinks = [
  { to: "/", label: "Home" },
  { to: "/quick-order", label: "Quick Order" },
  { to: "/orders", label: "My Orders" }
];
const vendorLinks = [
  { to: "/vendor", label: "Dashboard" },
  { to: "/manage", label: "Manage" }
];
const guestLinks = [
  { to: "/", label: "Home" },
  { to: "/quick-order", label: "Quick Order" }
];
const ProfileChipTrigger = reactExports.forwardRef(function ProfileChipTrigger2({ name, isVendor, compact = false, className, ...props }, ref) {
  const base = cn(
    "inline-flex items-center justify-center rounded-full md:border md:border-border md:bg-card md:text-foreground md:transition-colors md:hover:bg-secondary md:gap-2",
    compact ? "md:px-3 md:text-xs" : "md:px-4 md:text-sm",
    "h-10 w-10 bg-foreground text-background shadow-warm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 active:translate-y-0 md:h-10 md:w-auto md:shadow-none md:ring-0 md:hover:translate-y-0 md:active:translate-y-0",
    className
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      ref,
      type: "button",
      className: base,
      "aria-label": `Account menu for ${name}`,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "grid place-items-center rounded-full flex-shrink-0",
              "md:bg-foreground md:text-background",
              compact ? "md:h-6 md:w-6" : "md:h-7 md:w-7"
            ),
            children: isVendor ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "h-5 w-5 md:h-3 md:w-3", strokeWidth: 2.5 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5 md:h-3 md:w-3", strokeWidth: 2.5 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:block max-w-[8rem] truncate font-semibold sm:max-w-[12rem]", children: name })
      ]
    }
  );
});
function Header() {
  const cartCount = useApp((s) => s.cart.reduce((n, l) => n + l.qty, 0));
  const role = useApp((s) => s.role);
  const vendorLogin = useApp((s) => s.vendorLogin);
  const displayName = useApp((s) => s.displayName);
  const customer = useApp((s) => s.customer);
  const logout = useApp((s) => s.logout);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [open, setOpen] = reactExports.useState(false);
  const headerRef = reactExports.useRef(null);
  reactExports.useEffect(() => setOpen(false), [path]);
  reactExports.useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && headerRef.current && !headerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);
  const links = role === "vendor" ? vendorLinks : role === "customer" ? customerLinks : guestLinks;
  const isVendor = role === "vendor";
  const profileName = displayName ?? (isVendor ? vendors.find((v) => v.id === vendorLogin)?.name ?? "Vendor" : role === "customer" ? customer : "Guest");
  const handleSignOut = () => {
    logout();
    navigate({ to: "/" });
  };
  const renderLink = (l, mobile = false) => {
    const active = path === l.to || l.to !== "/" && path.startsWith(l.to);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: l.to,
        className: mobile ? `block rounded-xl px-3 py-2.5 text-base font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}` : `relative px-1 py-2 text-sm font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
        children: [
          l.label,
          !mobile && active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-px left-0 right-0 h-[2px] rounded-full bg-primary" })
        ]
      },
      l.to
    );
  };
  const AccountDropdown = ({ compact = false }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileChipTrigger, { name: profileName, isVendor, compact }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuLabel, { className: "px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Signed in as" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 truncate text-sm font-bold text-foreground", children: profileName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DropdownMenuItem,
        {
          onSelect: (e) => {
            e.preventDefault();
            handleSignOut();
          },
          className: "font-bold text-destructive focus:bg-destructive/10 focus:text-destructive",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            "Sign out"
          ]
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "header",
      {
        ref: headerRef,
        className: "fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-16 w-full items-center justify-between gap-2 px-1 sm:px-2 md:px-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 md:flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden", children: role ? /* @__PURE__ */ jsxRuntimeExports.jsx(AccountDropdown, { compact: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/login",
                  className: "inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 h-10 text-sm font-semibold text-primary transition-colors hover:bg-primary/20",
                  children: "Sign in"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: isVendor ? "/vendor" : "/", className: "hidden min-w-0 items-center gap-2 md:flex", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-gradient-warm shadow-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-5 w-5 text-primary-foreground", strokeWidth: 2.5 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 leading-tight", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-display text-lg font-bold", children: "Campus Dhaba" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: isVendor ? "Vendor Console" : "GIKI · Eat fast" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-6 md:flex", children: links.map((l) => renderLink(l)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: isVendor ? "/vendor" : "/", className: "flex flex-col items-center justify-center md:hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-bold leading-tight text-foreground", children: "Campus Dhaba" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5", children: isVendor ? "Vendor Console" : "GIKI · Eat fast" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1.5 md:flex-1", children: [
              !isVendor && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/cart",
                  "aria-label": cartCount > 0 ? `Cart, ${cartCount} items` : "Cart",
                  className: "relative grid h-10 w-10 place-items-center rounded-full bg-foreground text-background shadow-warm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 active:translate-y-0",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5", strokeWidth: 2.25 }),
                    cartCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground ring-2 ring-background", children: cartCount })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block", children: role ? /* @__PURE__ */ jsxRuntimeExports.jsx(AccountDropdown, { compact: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/login",
                  className: "inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 h-10 text-sm font-semibold text-primary transition-colors hover:bg-primary/20",
                  children: "Sign in"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  "aria-label": open ? "Close menu" : "Open menu",
                  "aria-expanded": open,
                  onClick: () => setOpen((o) => !o),
                  className: "grid h-10 w-10 place-items-center rounded-full bg-foreground text-background shadow-warm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 active:translate-y-0 md:hidden",
                  children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
                }
              )
            ] })
          ] }),
          open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 px-4 py-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-1", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setOpen(false), children: renderLink(l, true) }, l.to)) }) }) })
        ]
      }
    )
  ] });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:rounded-2xl group-[.toaster]:border group-[.toaster]:border-primary/30 group-[.toaster]:bg-primary/15 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-foreground group-[.toaster]:shadow-warm group-[.toaster]:font-medium group-[.toaster]:px-5 group-[.toaster]:py-4 group-[.toaster]:min-w-[320px] group-[.toaster]:text-[15px]",
          title: "group-[.toast]:font-semibold group-[.toast]:text-[16px]",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-full group-[.toast]:font-bold",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-full",
          closeButton: "group-[.toast]:rounded-full",
          success: "group-[.toaster]:!bg-primary/15 group-[.toaster]:!text-emerald-800 dark:group-[.toaster]:!text-emerald-300 group-[.toaster]:!border-emerald-500/40",
          error: "group-[.toaster]:!bg-destructive/15 group-[.toaster]:!text-destructive group-[.toaster]:!border-destructive/40",
          info: "group-[.toaster]:!bg-card group-[.toaster]:!text-foreground group-[.toaster]:!border-border",
          warning: "group-[.toaster]:!bg-warning/30 group-[.toaster]:!text-warning-foreground group-[.toaster]:!border-warning/40"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-_j_XECnT.css";
function LoadingOverlay({ show }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: show && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.18, ease: "easeOut" },
      className: "fixed inset-0 z-[60] grid place-items-center bg-background/70 backdrop-blur-md",
      "aria-label": "Loading",
      role: "status",
      "aria-live": "polite",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { y: 6, scale: 0.98 },
          animate: { y: 0, scale: 1 },
          exit: { y: 6, scale: 0.98 },
          transition: { duration: 0.18, ease: "easeOut" },
          className: "flex flex-col items-center gap-4 rounded-3xl border border-border bg-card px-6 py-5 shadow-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-16 w-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  animate: { y: [0, -6, 0] },
                  transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
                  className: "absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-1 h-3 w-12 -translate-x-1/2 rounded-full bg-accent shadow-sm" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-[18px] h-2 w-11 -translate-x-1/2 rounded-full bg-success/70" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-[28px] h-2.5 w-12 -translate-x-1/2 rounded-full bg-warning/80" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-[38px] h-3 w-12 -translate-x-1/2 rounded-full bg-primary/90 shadow-sm" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-[52px] h-3 w-12 -translate-x-1/2 rounded-full bg-accent shadow-sm" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute -bottom-2 left-1/2 h-2.5 w-14 -translate-x-1/2 rounded-full bg-foreground/10",
                  animate: { scaleX: [0.9, 1.05, 0.9], opacity: [0.35, 0.18, 0.35] },
                  transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "Loading…" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Cooking up your next page" })
            ] })
          ]
        }
      )
    },
    "route-loading"
  ) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl font-bold", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for has wandered off the menu." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Back to dhabas"
      }
    ) })
  ] }) });
}
const Route$b = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Campus Dhaba — Skip the queue, eat on time" },
      {
        name: "description",
        content: "Pre-order food from GIKI campus dhabas. Pick a vendor, choose a pickup time, and skip the rush."
      },
      { property: "og:title", content: "Campus Dhaba" },
      { property: "og:description", content: "Pre-order food from GIKI campus dhabas." },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&display=swap"
      },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const cart = useApp((s) => s.cart);
  const router2 = useRouter();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const routerStatus = useRouterState({ select: (s) => s.status });
  const [showBoot, setShowBoot] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const t = window.setTimeout(() => setShowBoot(false), 550);
    return () => window.clearTimeout(t);
  }, []);
  const isRoutePending = reactExports.useMemo(() => routerStatus === "pending", [routerStatus]);
  const showLoading = showBoot || isRoutePending;
  reactExports.useEffect(() => {
    const onPointerDown = (e) => {
      const target = e.target;
      if (target && target.closest(".toaster")) return;
      toast.dismiss();
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);
  reactExports.useEffect(() => {
    if (path !== "/") {
      router2.navigate({ to: "/", replace: true });
    }
  }, []);
  reactExports.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [path]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { show: showLoading }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-center", expand: true }),
    cart.length > 0 && path !== "/cart" && path !== "/login" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/cart",
        className: "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-warm transition-transform hover:-translate-y-0.5",
        children: "Go to cart"
      }
    )
  ] });
}
const $$splitComponentImporter$a = () => import("./vendor-BW7MMF-B.mjs");
const Route$a = createFileRoute("/vendor")({
  head: () => ({
    meta: [{
      title: "Vendor Console — Campus Dhaba"
    }]
  }),
  beforeLoad: ({
    location
  }) => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role !== "vendor") {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname
        }
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./signup-DoYFJsAI.mjs");
const searchSchema$1 = objectType({
  redirect: stringType().optional()
});
const Route$9 = createFileRoute("/signup")({
  head: () => ({
    meta: [{
      title: "Sign up — Campus Dhaba"
    }]
  }),
  validateSearch: searchSchema$1,
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./quick-order-D5uf28Z_.mjs");
const Route$8 = createFileRoute("/quick-order")({
  head: () => ({
    meta: [{
      title: "Quick Order — Campus Dhaba"
    }, {
      name: "description",
      content: "Repeat your last order or tap a favourite to send it to checkout."
    }]
  }),
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role === "vendor") {
      throw redirect({
        to: "/vendor"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./manage-CtfEHt6h.mjs");
const Route$7 = createFileRoute("/manage")({
  head: () => ({
    meta: [{
      title: "Manage menu — Campus Dhaba"
    }]
  }),
  beforeLoad: ({
    location
  }) => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role !== "vendor") {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname
        }
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./login-BMDi10Rw.mjs");
const searchSchema = objectType({
  redirect: stringType().optional()
});
const Route$6 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign in — Campus Dhaba"
    }]
  }),
  validateSearch: searchSchema,
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./cart-Bs8mJ_i_.mjs");
const Route$5 = createFileRoute("/cart")({
  head: () => ({
    meta: [{
      title: "Your cart — Campus Dhaba"
    }]
  }),
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role === "vendor") {
      throw redirect({
        to: "/vendor"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-DmIpxhga.mjs");
const Route$4 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Campus Dhaba — Skip the queue at GIKI"
    }, {
      name: "description",
      content: "Browse campus dhabas, place pre-orders, and pick up your food without waiting."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./orders.index-5FbrOjWl.mjs");
const Route$3 = createFileRoute("/orders/")({
  head: () => ({
    meta: [{
      title: "My orders — Campus Dhaba"
    }]
  }),
  beforeLoad: ({
    location
  }) => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role === "vendor") {
      throw redirect({
        to: "/vendor"
      });
    }
    if (!state.role) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname
        }
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitNotFoundComponentImporter = () => import("./vendors._vendorId-BQPXcMt3.mjs");
const $$splitComponentImporter$2 = () => import("./vendors._vendorId-C67NbOk2.mjs");
const Route$2 = createFileRoute("/vendors/$vendorId")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role === "vendor") {
      throw redirect({
        to: "/vendor"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const $$splitComponentImporter$1 = () => import("./orders._orderId-P30z1xGK.mjs");
const Route$1 = createFileRoute("/orders/$orderId")({
  beforeLoad: ({
    location
  }) => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role === "vendor") {
      throw redirect({
        to: "/vendor"
      });
    }
    if (!state.role) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname
        }
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./orders.edit._orderId-CQ_MPB-W.mjs");
const Route = createFileRoute("/orders/edit/$orderId")({
  beforeLoad: ({
    location
  }) => {
    if (typeof window === "undefined") return;
    const state = useApp.getState();
    if (state.role === "vendor") {
      throw redirect({
        to: "/vendor"
      });
    }
    if (!state.role) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname
        }
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const VendorRoute = Route$a.update({
  id: "/vendor",
  path: "/vendor",
  getParentRoute: () => Route$b
});
const SignupRoute = Route$9.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$b
});
const QuickOrderRoute = Route$8.update({
  id: "/quick-order",
  path: "/quick-order",
  getParentRoute: () => Route$b
});
const ManageRoute = Route$7.update({
  id: "/manage",
  path: "/manage",
  getParentRoute: () => Route$b
});
const LoginRoute = Route$6.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$b
});
const CartRoute = Route$5.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const OrdersIndexRoute = Route$3.update({
  id: "/orders/",
  path: "/orders/",
  getParentRoute: () => Route$b
});
const VendorsVendorIdRoute = Route$2.update({
  id: "/vendors/$vendorId",
  path: "/vendors/$vendorId",
  getParentRoute: () => Route$b
});
const OrdersOrderIdRoute = Route$1.update({
  id: "/orders/$orderId",
  path: "/orders/$orderId",
  getParentRoute: () => Route$b
});
const OrdersEditOrderIdRoute = Route.update({
  id: "/orders/edit/$orderId",
  path: "/orders/edit/$orderId",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  CartRoute,
  LoginRoute,
  ManageRoute,
  QuickOrderRoute,
  SignupRoute,
  VendorRoute,
  OrdersOrderIdRoute,
  VendorsVendorIdRoute,
  OrdersIndexRoute,
  OrdersEditOrderIdRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    // We always want new pages to start at the top (no saved scroll positions).
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  CATEGORIES as C,
  Route$9 as R,
  useLiveMenu as a,
  CATEGORY_IMAGES as b,
  cn as c,
  Route$6 as d,
  cartTotal as e,
  format12 as f,
  getVendor as g,
  compareTime24 as h,
  Route$2 as i,
  Route$1 as j,
  formatDate12 as k,
  Route as l,
  router as r,
  suggestedPickupForVendor as s,
  useApp as u,
  vendors as v
};
