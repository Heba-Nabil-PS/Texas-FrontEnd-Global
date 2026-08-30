import { MenuCategory } from "@/types";

export const menuData: MenuCategory[] = [
  {
    id: "sandandwraps",
    name: "Sandwiches & Wraps",
    bgImage: "/images/sand-bg.png",
    image: "/images/sand-item.png",
    elementImage: "/images/sand-el.png",

    items: [
      {
        id: "classic-burger",
        name: "Mexicana Burger Combo",
        description:
          "Mexicana Burger Combo comes with a crispy chicken burger, spicy toppings, fries, and a drink. A bold and tasty meal with a little heat.",
        image: "/images/s1.png",
        category: "burgers",
        price: 4.99,
        currency: "USD",
      },
      {
        id: "cheeseburger",
        name: "Spicy Tex Supreme Combo",
        description: "Classic burger with American cheese",
        image: "/images/s2.png",
        category: "burgers",
        price: 5.49,
        currency: "USD",
      },
    ],
  },
  {
    id: "chickenmeals",
    name: "Chicken Meals",
    bgImage: "/images/chicken-bg.png",
    image: "/images/chicken.png",
    elementImage: "/images/chicken-el.png",
    items: [
      {
        id: "3pc-chicken-combo",
        name: "3 pc Chicken Combo (Original or Spicier Spicy)",
        description:
          "3pcs chicken served with a choice of regular sides (mashed potatoes / coleslaw / Flavored Rice), a hand-made Honey-Butter Biscuit and a regular drink.",
        image: "/images/p1.webp",
        category: "chickenmeals",
        price: 8.99,
        currency: "USD",
      },
      {
        id: "2pc-chicken-combo",
        name: "2 pc Chicken Combo (Original or Spicier Spicy)",
        description:
          "2pcs chicken served with a choice of regular sides (mashed potatoes / coleslaw / Flavored Rice), a hand-made Honey-Butter Biscuit and a regular drink.",
        image: "/images/p2.webp",
        category: "chickenmeals",
        price: 7.49,
        currency: "USD",
      },

      {
        id: "chicken-sandwich-combo",
        name: "Chicken Sandwich Combo",
        description: "Chicken sandwich with fries and a drink",
        image: "/images/p4.webp",
        category: "chickenmeals",
        price: 6.99,
        currency: "USD",
      },
    ],
  },
  {
    id: "sides",
    name: "Sides",
    bgImage: "/images/sides-bg.png",
    image: "/images/sidess.png",
    elementImage: "/images/sides-el.png",
    items: [
      {
        id: "mashed-potatoes",
        name: "Mashed Potatoes",
        description: "Creamy mashed potatoes with gravy",
        image: "/images/si1.png",
        category: "sides",
        price: 2.99,
        currency: "USD",
      },
    ],
  },

  // Add more categories as needed
];
