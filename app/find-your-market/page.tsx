"use client";

import { useCallback, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import CTABand from "@/components/sections/CTABand";
import MarketExplorer from "@/components/sections/MarketExplorer";
import MarketFinder from "@/components/sections/MarketFinder";
import { marketPage, type BrandId, type MarketRegionId } from "@/lib/content";

export default function MarketPage() {
  const [brand, setBrand] = useState<BrandId | "all">("all");
  const [region, setRegion] = useState<MarketRegionId | "all">("all");
  const [focus, setFocus] = useState<string | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const scrollTo = useCallback(
    (el: HTMLElement | null) => {
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: -90, duration: 1.1 });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [lenis]
  );

  /** picking a country in the list → zoom the map to it */
  const focusFromList = useCallback(
    (code: string) => {
      const market = marketPage.markets.find((m) => m.code === code);
      if (market) {
        setRegion(market.region);
        setBrand((b) => (b === "all" || b === market.brand ? b : "all"));
      }
      setFocus(code);
      scrollTo(mapRef.current);
    },
    [scrollTo]
  );

  return (
    <>
      <PageHero
        eyebrow={marketPage.hero.eyebrow}
        title={marketPage.hero.title}
        subtitle={marketPage.hero.subtitle}
      >
        <Button href="/menu" variant="yellow">
          Explore the menu
        </Button>
        <Button href="/franchising" variant="ghostDark">
          Franchise with us
        </Button>
      </PageHero>

      {/* Interactive region map */}
      <div ref={mapRef} className="scroll-mt-24">
        <MarketExplorer
          brand={brand}
          onBrandChange={setBrand}
          region={region}
          onRegionChange={setRegion}
          focus={focus}
          onFocus={setFocus}
          onSeeAll={() => scrollTo(listRef.current)}
        />
      </div>

      {/* Every country, with flags */}
      <div ref={listRef} className="scroll-mt-24">
        <MarketFinder
          brand={brand}
          onBrandChange={(b) => {
            setBrand(b);
            setFocus(null);
          }}
          region={region}
          onRegionChange={(r) => {
            setRegion(r);
            setFocus(null);
          }}
          focus={focus}
          onFocus={focusFromList}
        />
      </div>

      <CTABand
        eyebrow="Can't find your country?"
        heading="We're just"
        accent="getting started."
        body="New markets open every year. Partner with us to bring the Texas crunch to your city."
        primary={{ label: "Franchise with us", href: "/franchising" }}
        secondary={{ label: "Get in touch", href: "/contact-us" }}
        tone="ink"
      />
    </>
  );
}
