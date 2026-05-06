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

export const vendorImageById: Record<string, string> = {
  ayan: vAyanGardens,
  sip: vSipSpot,
  raju: vRajuHotel,
  juice: vJuiceSpot,
};

export const itemImage = (id: string) => new URL(`../assets/items/${id}.jpg`, import.meta.url).href;

export const menuItemImage = (itemId: string, fallbackCategory?: Category) => {
  // For the seeded menu, `src/assets/items/<id>.jpg` exists. For vendor-created
  // items (custom-...), keep images static by falling back to the category card.
  if (itemId.startsWith("custom-")) {
    return fallbackCategory ? CATEGORY_IMAGES[fallbackCategory] : CATEGORY_IMAGES.Breakfast;
  }
  return itemImage(itemId);
};

export const vendorWithImage = (v: Omit<Vendor, "image">): Vendor => ({
  ...v,
  image: vendorImageById[v.id] ?? vAyanGardens,
});

export const getVendorById = (list: Vendor[], id: string) => list.find((v) => v.id === id);
