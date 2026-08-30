"use client";

/**
 * FranchiseTabs — the four franchise.texaschicken.com pages (Why Us,
 * Opportunities, Investment, Resources) folded into one tabbed dossier so the
 * whole story fits on /franchising without repeating itself.
 *
 * Behaviour worth knowing about:
 *  - the tab bar is sticky under the site nav, with a shared-layout indicator
 *  - panels crossfade direction-aware (left/right depending on travel)
 *  - the active tab is mirrored into the URL hash, so #investment is linkable
 *    from anywhere on the site
 *  - full ARIA tablist semantics + ←/→/Home/End keyboard support
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";
import OpportunityMap from "@/components/sections/OpportunityMap";
import { franchisePage } from "@/lib/content";
import { staggerContainer, fadeUp, ease } from "@/lib/motion";

const TABS = franchisePage.tabs;
const IDS = TABS.map((t) => t.id);

/** Index-aligned with TABS. */
const PANELS = [WhyUs, Opportunities, Investment, Support];

/* ------------------------------------------------------------------ shell */
export default function FranchiseTabs() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const barRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Deep-link in: honour #investment etc. on load and on back/forward.
  useEffect(() => {
    const sync = () => {
      const i = IDS.indexOf(window.location.hash.replace("#", ""));
      if (i >= 0) {
        setDir(i > active ? 1 : -1);
        setActive(i);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = useCallback(
    (next: number, focus = false) => {
      setDir(next > active ? 1 : -1);
      setActive(next);
      // replaceState, not a hash jump — we never want the page to scroll here.
      window.history.replaceState(null, "", `#${IDS[next]}`);
      if (focus) btnRefs.current[next]?.focus();
    },
    [active],
  );

  const onKey = (e: React.KeyboardEvent) => {
    const last = TABS.length - 1;
    if (e.key === "ArrowRight") { e.preventDefault(); go(active === last ? 0 : active + 1, true); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(active === 0 ? last : active - 1, true); }
    if (e.key === "Home") { e.preventDefault(); go(0, true); }
    if (e.key === "End") { e.preventDefault(); go(last, true); }
  };

  return (
    <section className="bg-cream-200 pb-24 md:pb-32">
      {/* ---- sticky tab bar ------------------------------------------- */}
      {/* The band echoes the nav rather than bleeding edge to edge: same
          1150px / px-8 box the desktop header uses, floating on the section. */}
      <div ref={barRef} className="sticky top-[72px] z-30 py-3 lg:top-[132px]">
        <div className="mx-auto flex w-full max-w-[1150px] justify-center px-5 lg:px-8">
          <div
            role="tablist"
            aria-label="Franchise information"
            onKeyDown={onKey}
            className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-ink/10 bg-paper/90 p-2 shadow-soft3 backdrop-blur-md [scrollbar-width:none] md:gap-2 [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => { btnRefs.current[i] = el; }}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={on}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => go(i)}
                  data-cursor="link"
                  className="relative shrink-0 rounded-full px-5 py-3 text-left transition-colors duration-300 md:px-7"
                >
                  {on && (
                    <motion.span
                      layoutId="fr-tab"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-tex-red"
                    />
                  )}
                  <span className="relative block">
                    <span
                      className={`block text-sm font-extrabold uppercase tracking-caps ${
                        on ? "text-cream" : "text-ink"
                      }`}
                    >
                      {t.label}
                    </span>
                    <span
                      className={`hidden text-[0.68rem] font-semibold ${
                        on ? "text-cream/70" : "text-ink-400"
                      } md:block`}
                    >
                      {t.blurb}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---- panels -----------------------------------------------------
          All four stay MOUNTED and are hidden with the `hidden` attribute
          rather than being conditionally rendered. That is the canonical ARIA
          tabpanel pattern, and it keeps every figure (investment costs above
          all) in the server-rendered HTML, so the content stays indexable and
          findable with Ctrl+F instead of existing only after a click.
          The inner wrapper is re-keyed on activation so the panel still plays
          its direction-aware entry animation. */}
      <div className="container-tx pt-16 md:pt-20">
        {PANELS.map((Panel, i) => (
          <div
            key={TABS[i].id}
            role="tabpanel"
            id={`panel-${TABS[i].id}`}
            aria-labelledby={`tab-${TABS[i].id}`}
            hidden={i !== active}
          >
            {i === active ? (
              <motion.div
                key={`${TABS[i].id}-${dir}`}
                initial={{ opacity: 0, x: dir * 36 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.42, ease: ease.out }}
              >
                <Panel />
              </motion.div>
            ) : (
              <Panel />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- panel 1 */
function WhyUs() {
  const { whyUs, credentials } = franchisePage;
  return (
    <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <PanelHeading eyebrow="Why us" heading={whyUs.heading} />
        {whyUs.body.map((p) => (
          <motion.p
            key={p}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: "some" }}
            className="mt-5 max-w-xl text-base leading-relaxed text-ink-600 md:text-lg"
          >
            {p}
          </motion.p>
        ))}

        <motion.ul
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: "some" }}
          className="mt-9 flex flex-col gap-3"
        >
          {credentials.map((c) => (
            <motion.li key={c} variants={fadeUp} className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-tex-red text-sm text-cream">
                ★
              </span>
              <span className="text-sm font-bold uppercase tracking-caps text-ink">{c}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* recent openings — real locations named on the Why Us page */}
      <motion.div
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: "some" }}
        className="rounded-[1.75rem] border border-ink/10 bg-paper p-8 shadow-soft3"
      >
        <span className="eyebrow text-tex-red">★ Opening around the world</span>
        <ul className="mt-6 flex flex-col divide-y divide-ink/10">
          {whyUs.openings.map((o, i) => (
            <motion.li
              key={o}
              variants={fadeUp}
              className="flex items-baseline gap-4 py-4 first:pt-0 last:pb-0"
            >
              <span className="display text-xl text-tex-yellow">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display text-lg uppercase leading-tight text-ink">{o}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------- panel 2 */
function Opportunities() {
  const { opportunities } = franchisePage;
  return (
    <div>
      <PanelHeading eyebrow="Global opportunities" heading={opportunities.heading} />
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-600 md:text-lg">
        {opportunities.body}
      </p>

      {/* The one CTA that has to be unmissable: it halos until you hover it,
          and drops you straight onto the application form further down. */}
      <div className="mt-7">
        <Button href="#apply-form" variant="red" pulse>
          Start your application
        </Button>
      </div>

      {/* Every country we do NOT trade in yet, on one interactive map. */}
      <OpportunityMap />

      <div className="mt-12 flex flex-col items-start gap-5 rounded-[1.75rem] border border-tex-red700 bg-tex-red p-8 text-cream md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl text-sm leading-relaxed text-cream/85">
          {opportunities.usNote}
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button
            href={opportunities.usUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="yellow"
          >
            {opportunities.usCta}
          </Button>
          <Button href="/find-your-market" variant="ghostDark">
            Explore the market map
          </Button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- panel 3 */
const money = (n: number) => `US$${n.toLocaleString("en-US")}`;
/** cost lines visible before "show all" — keeps the card roughly one screen */
const LINES_SHOWN = 6;

function Investment() {
  const { investment } = franchisePage;
  const [model, setModel] = useState<"low" | "avg" | "high">("avg");
  const [showAllLines, setShowAllLines] = useState(false);
  const current = investment.models.find((m) => m.id === model)!;
  const peak = Math.max(...investment.lines.map((l) => l[model] ?? 0));

  return (
    <div>
      <PanelHeading eyebrow="Investment" heading={investment.profileHeading} />

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: "some" }}
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {investment.profile.map((p) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            className="rounded-[1.5rem] border border-ink/10 bg-paper p-6 shadow-soft3"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-tex-red text-sm text-cream">★</span>
            <h3 className="display mt-4 text-lg uppercase leading-tight text-ink">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* commercial terms */}
      <h3 className="display mt-16 text-2xl uppercase text-ink md:text-3xl">
        {investment.termsHeading}
      </h3>
      <motion.dl
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: "some" }}
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {investment.terms.map((t) => (
          <motion.div
            key={t.label}
            variants={fadeUp}
            className="rounded-2xl border border-ink/10 bg-paper px-6 py-5"
          >
            <dt className="text-xs font-bold uppercase tracking-caps text-ink-400">{t.label}</dt>
            <dd className="display mt-1 text-2xl text-tex-red">
              {t.value}
              {t.note && (
                <span className="ml-2 align-middle text-xs font-bold uppercase tracking-caps text-ink-400">
                  {t.note}
                </span>
              )}
            </dd>
          </motion.div>
        ))}
      </motion.dl>

      {/* build-model switcher + chart */}
      <div className="mt-16 overflow-hidden rounded-[1.75rem] border border-ink/10 bg-paper shadow-soft3">
        <div className="flex flex-col gap-6 border-b border-ink/10 p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow text-tex-red">★ Estimated investment</span>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Build model">
              {investment.models.map((m) => {
                const on = m.id === model;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setModel(m.id)}
                    aria-pressed={on}
                    data-cursor="link"
                    className="relative rounded-full px-5 py-2.5 text-xs font-extrabold uppercase tracking-caps transition-colors duration-300"
                  >
                    {on && (
                      <motion.span
                        layoutId="fr-model"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-ink"
                      />
                    )}
                    <span
                      className={`absolute inset-0 rounded-full border ${
                        on ? "border-transparent" : "border-ink/15"
                      }`}
                    />
                    <span className={`relative ${on ? "text-cream" : "text-ink-600"}`}>{m.tier}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-ink-600">{current.name}</p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs font-bold uppercase tracking-caps text-ink-400">
              Total investment
            </span>
            <div className="display text-4xl text-tex-red md:text-5xl">
              {/* re-keyed so the counter re-runs when the model changes */}
              <span key={model}>
                US$<Counter value={current.total} />
              </span>
            </div>
          </div>
        </div>

        {/* Line items. Seventeen of these stacked label-over-bar ran well over a
            screen, so the bar now sits inline between label and figure and the
            list is clamped to a few rows until asked.
            Clamped with max-height, NOT by slicing the array: every figure has
            to stay in the server-rendered HTML for the same reason the panels
            all stay mounted. */}
        <div
          className={`relative ${showAllLines ? "" : "max-h-[15.5rem] overflow-hidden"}`}
        >
        <ul className="divide-y divide-ink/10">
          {investment.lines.map((l) => {
            const v = l[model];
            return (
              <li
                key={l.label}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-2.5 md:grid-cols-[minmax(0,1.5fr)_minmax(80px,1fr)_auto] md:gap-6 md:px-8"
              >
                <span className="truncate text-sm text-ink">{l.label}</span>
                {/* the bar is a nicety — on a phone the figure is what matters */}
                <div className="hidden h-1 w-full overflow-hidden rounded-full bg-ink/[0.07] md:block">
                  <motion.span
                    className="block h-full rounded-full bg-tex-yellow"
                    initial={false}
                    animate={{ width: v ? `${(v / peak) * 100}%` : "0%" }}
                    transition={{ duration: 0.5, ease: ease.out }}
                  />
                </div>
                <span
                  className={`shrink-0 text-sm font-bold tabular-nums ${
                    v ? "text-ink" : "text-ink-400"
                  }`}
                >
                  {v ? money(v) : "—"}
                </span>
              </li>
            );
          })}
        </ul>
          {!showAllLines && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 block h-14 bg-gradient-to-t from-paper to-transparent"
            />
          )}
        </div>

        {investment.lines.length > LINES_SHOWN && (
          <button
            type="button"
            onClick={() => setShowAllLines((s) => !s)}
            aria-expanded={showAllLines}
            data-cursor="link"
            className="flex w-full items-center justify-center gap-2 border-t border-ink/10 px-8 py-3.5 text-xs font-extrabold uppercase tracking-caps text-tex-red transition-colors hover:bg-cream"
          >
            {showAllLines
              ? "Show fewer"
              : `Show all ${investment.lines.length} line items`}
            <span aria-hidden className={showAllLines ? "rotate-180" : ""}>
              ▾
            </span>
          </button>
        )}

        <p className="border-t border-ink/10 bg-cream px-8 py-4 text-xs leading-relaxed text-ink-600">
          {investment.disclaimer}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- panel 4 */
function Support() {
  const { resources } = franchisePage;
  const [open, setOpen] = useState(resources.pillars[0].id);

  return (
    <div>
      <PanelHeading eyebrow="Support" heading={resources.heading} />
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-600 md:text-lg">
        {resources.body}
      </p>

      <div className="mt-12 flex flex-col gap-4">
        {resources.pillars.map((p, i) => {
          const on = p.id === open;
          return (
            <div
              key={p.id}
              className={`overflow-hidden rounded-[1.75rem] border bg-paper transition-colors duration-300 ${
                on ? "border-tex-red" : "border-ink/10"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(on ? "" : p.id)}
                aria-expanded={on}
                aria-controls={`pillar-${p.id}`}
                data-cursor="link"
                className="flex w-full items-start gap-5 p-7 text-left md:p-8"
              >
                <span className="display shrink-0 text-2xl text-tex-yellow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="display block text-xl uppercase text-ink md:text-2xl">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-600">
                    {p.summary}
                  </span>
                </span>
                <motion.span
                  aria-hidden
                  animate={{ rotate: on ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: ease.out }}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 text-lg text-ink"
                >
                  +
                </motion.span>
              </button>

              {/* Body stays mounted and collapses to height 0 rather than
                  unmounting, so every support detail is in the HTML even while
                  the pillar is shut. */}
              <motion.div
                id={`pillar-${p.id}`}
                initial={false}
                animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                transition={{ duration: 0.4, ease: ease.out }}
                className="overflow-hidden"
              >
                    <div className="grid gap-8 border-t border-ink/10 p-7 md:grid-cols-3 md:p-8">
                      {p.groups.map((g) => (
                        <div key={g.title}>
                          <h4 className="text-xs font-bold uppercase tracking-caps text-tex-red">
                            {g.title}
                          </h4>
                          <ul className="mt-4 flex flex-col gap-2.5">
                            {g.items.map((it) => (
                              <li key={it} className="flex gap-3 text-sm leading-relaxed text-ink-600">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tex-yellow" />
                                {it}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- shared */
function PanelHeading({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return (
    <div>
      <motion.span
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: "some" }}
        className="eyebrow text-tex-red"
      >
        <span aria-hidden>★</span> {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: "some" }}
        className="display mt-4 max-w-2xl text-4xl uppercase leading-[0.95] text-ink sm:text-5xl"
      >
        {heading}
      </motion.h2>
    </div>
  );
}
