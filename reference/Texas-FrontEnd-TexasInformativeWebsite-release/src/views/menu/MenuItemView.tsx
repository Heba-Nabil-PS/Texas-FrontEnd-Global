"use client";
import { motion as m } from "motion/react";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import type { CategoryProps } from "@/modules/menu/types/category.type";
import type { CategoryItemProps } from "@/modules/menu/types/category-item";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type MenuItemViewProps = {
  locale?: string;
  categoryId: string;
  itemId: string;
  categories: CategoryProps[];
  currentCategory: CategoryProps;
  menuItem: CategoryItemProps;
  categoryItems: CategoryItemProps[];
};

const enrichMenuItem = (item: CategoryItemProps) => {
  const nutrition = [
    { label: "Calories", value: item.calories || "750 kcal" },
    { label: "Protein", value: "32 g" },
    { label: "Carbohydrates", value: "65 g" },
    { label: "Total Fat", value: "38 g" },
    { label: "Sodium", value: "980 mg" },
  ];

  const ingredients = [
    "Halal chicken patty",
    "Toasted bun",
    "Cheddar cheese",
    "Crispy lettuce",
    "Fresh tomato",
    "Signature Texas sauce",
  ];

  return { ...item, nutrition, ingredients };
};

const AccordionItem = ({
  title,
  children,
  isOpen,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-amber-100">
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#FAF7F2]"
    >
      <h2 className="font-texas text-xl font-extrabold uppercase text-third">
        {title}
      </h2>
      <ChevronDown
        className={`h-5 w-5 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <div
      className={`transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
    >
      <div className="p-4 pt-0">{children}</div>
    </div>
  </div>
);

const MenuItemView = ({
  locale = "en",
  categoryId,
  itemId,
  categories,
  currentCategory,
  menuItem,
  categoryItems,
}: MenuItemViewProps) => {
  const [nutritionOpen, setNutritionOpen] = useState(true);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  if (!menuItem || !currentCategory) {
    return (
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-3 font-texas text-3xl font-black uppercase text-primary">
            Item not found
          </h1>
          <p className="text-sm text-gray-700">
            We couldn&apos;t find the menu item you were looking for.
          </p>
        </div>
      </div>
    );
  }

  const enriched = enrichMenuItem(menuItem);
  const relatedItems = categoryItems
    .filter((i) => i.uniqueCode !== menuItem.uniqueCode)
    .slice(0, 3);

  return (
    <div className="pt-16 md:pt-24">
      <div className="relative z-20 mt-6 flex justify-center md:mt-10">
        <CustomBreadCrumb
          data={[
            { name: "Home", href: "/" },
            { name: "Menu", href: `/${locale}/menu` },
            {
              name: currentCategory.name,
              href: `/${locale}/menu/${currentCategory.uniqueCode}`,
            },
            { name: enriched.name, href: "#" },
          ]}
        />
      </div>

      {/* Main Title - Matching your other pages */}
      <div className="relative z-10 flex flex-col items-center pt-8 text-center">
        <m.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm ltr:font-texas"
          style={{ fontSize: "clamp(32px, 8vw, 80px)" }}
        >
          {enriched.name}
        </m.h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Section */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-secondary/10 via-primary/5 to-amber-100 blur-2xl" />
            <div className="relative flex items-center justify-center bg-white p-1">
              {enriched?.imageActual && (
                <img
                  // src={enriched?.imageActual}
                  src={"/images/sidess.png"}
                  alt={enriched.name}
                  className="max-h-96 w-full object-contain"
                />
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Price and Category */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center rounded-full border border-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                {currentCategory.name}
              </span>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#FAF7F2] p-4 text-center">
                <p className="text-2xl font-bold text-primary">
                  {enriched.calories || "750"}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  Calories
                </p>
              </div>
              <div className="rounded-2xl bg-[#FAF7F2] p-4 text-center">
                <p className="text-2xl font-bold text-primary">32g</p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  Protein
                </p>
              </div>
            </div>

            <div>
              <p className="text-lg text-gray-600">
                3 pcs chicken served with a choice of regular sides (mashed
                potatoes / coleslaw / Flavored Rice), a hand-made Honey-Butter
                Biscuit ™ and a regular drink.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accordions Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-4">
          <AccordionItem
            title="Nutritional Information"
            isOpen={nutritionOpen}
            onToggle={() => setNutritionOpen(!nutritionOpen)}
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                The following nutrition facts are approximate and based on a
                standard serving.
              </p>
              <div className="divide-y divide-gray-100">
                {enriched.nutrition.map((n) => (
                  <div
                    key={n.label}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-gray-700">{n.label}</span>
                    <span className="font-semibold text-primary">
                      {n.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-500">
                * Values are estimates and intended for general information
                only.
              </p>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Ingredients"
            isOpen={ingredientsOpen}
            onToggle={() => setIngredientsOpen(!ingredientsOpen)}
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Crafted with a selection of quality ingredients to deliver bold
                Texas flavour in every bite.
              </p>
              <ul className="space-y-2">
                {enriched.ingredients.map((ing) => (
                  <li key={ing} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
                    <span className="text-sm text-gray-800">{ing}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl bg-[#FFF8EC] p-4 text-xs text-gray-700">
                <p className="mb-2 font-semibold text-secondary">
                  Important note about allergens
                </p>
                <p>
                  While we take care to prepare items separately, our kitchens
                  may handle common allergens such as gluten, dairy, eggs and
                  soy.
                </p>
              </div>
            </div>
          </AccordionItem>
        </div>
      </div>

      {/* Related items */}
      {relatedItems.length > 0 && (
        <section className="bg-[#FAF7F2] py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-texas text-2xl font-extrabold uppercase text-third md:text-3xl">
                  Related items
                </h2>
                <p className="mt-1 text-sm text-gray-700 md:text-base">
                  Discover more from the {currentCategory.name.toLowerCase()}{" "}
                  range.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedItems.map((rel) => (
                <div
                  key={rel.id}
                  className="group flex flex-col rounded-3xl bg-white p-4 shadow-sm ring-1 ring-amber-100 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-[#FFF8EC]">
                    {rel.imageActual && (
                      <img
                        src={rel.imageActual}
                        alt={rel.name}
                        className="max-h-32 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="font-texas text-lg font-extrabold uppercase text-third">
                    {rel.name}
                  </h3>
                  {rel.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-gray-700">
                      {rel.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MenuItemView;
