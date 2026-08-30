/* global React, Icon, useRoute, useT, I18nCtx, MARKETS */
// Homepage — reference layout: 1952 hero · Built on Texas Standards · CEO message · New at Texas Chicken · World map

// ==================== GradualBlur (React Bits, adapted) ====================
const GB_CURVES = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
};
const GB_DIR = { top: 'to top', bottom: 'to bottom', left: 'to left', right: 'to right' };

function GradualBlur({
  position = 'bottom', strength = 2, height = '6rem', width,
  divCount = 5, exponential = false, curve = 'linear', opacity = 1,
  zIndex = 5, target = 'parent', className = '', style = {},
}) {
  const blurDivs = React.useMemo(() => {
    const divs = [];
    const increment = 100 / divCount;
    const curveFunc = GB_CURVES[curve] || GB_CURVES.linear;
    const direction = GB_DIR[position] || 'to bottom';
    for (let i = 1; i <= divCount; i++) {
      let progress = curveFunc(i / divCount);
      let blurValue = exponential
        ? Math.pow(2, progress * 4) * 0.0625 * strength
        : 0.0625 * (progress * divCount + 1) * strength;
      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;
      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;
      divs.push(<div key={i} style={{
        position: 'absolute', inset: 0,
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity,
      }}></div>);
    }
    return divs;
  }, [position, strength, height, divCount, exponential, curve, opacity]);

  const isVertical = position === 'top' || position === 'bottom';
  const base = {
    position: target === 'page' ? 'fixed' : 'absolute',
    pointerEvents: 'none', zIndex, ...style,
  };
  if (isVertical) {
    base.height = height; base.width = width || '100%';
    base[position] = 0; base.left = 0; base.right = 0;
  } else {
    base.width = width || height; base.height = '100%';
    base[position] = 0; base.top = 0; base.bottom = 0;
  }
  return (
    <div className={`gradual-blur gradual-blur-${target === 'page' ? 'page' : 'parent'} ${className}`} style={base}>
      <div className="gradual-blur-inner">{blurDivs}</div>
    </div>
  );
}

function HomeHero() {
  return (
    <section
      className="home-hero-slider"
      style={{ position: 'relative', overflow: 'hidden', background: '#2b2722', lineHeight: 0 }}
    >
      <video src="assets/hero-banner.mp4" autoPlay loop muted playsInline
        style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}></video>
    </section>
  );
}

function BuiltOnStandards() {
  const { go } = useRoute();
  const t = useT();
  return (
    <section className="grunge-over" style={{ background: 'var(--tc-paper)', padding: '64px 0 90px', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <h2 className="mc-head" style={{ fontSize: 'clamp(40px, 5.5vw, 78px)', color: 'var(--tc-yellow)' }}>
            {t('Built On','مبني على')}<br/>{t('Texas Standards','معايير تكساس')}
          </h2>
          <div style={{ marginTop: 24, fontSize: 17, lineHeight: 1.7, color: 'var(--fg-2)', maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ margin: 0 }}>{t('Our standards are what make the difference.','معاييرنا هي ما يصنع الفرق.')}</p>
            <p style={{ margin: 0 }}>{t('Every piece of chicken is prepared in small batches to deliver the texture and crunch people know us for. It is not rushed, and it is never treated as routine.',
              'كل قطعة دجاج تُحضّر بكميات صغيرة لتقديم القوام والقرمشة التي يعرفنا بها الناس. لا تُستعجل، ولا تُعامل أبدًا كروتين.')}</p>
            <p style={{ margin: 0 }}>{t('From the first bite to the last, the experience is built on care, attention, and doing things properly. That is how we protect the flavor, and why people keep coming back.',
              'من القضمة الأولى إلى الأخيرة، التجربة مبنية على العناية والاهتمام وإتقان العمل. هكذا نحمي النكهة، ولهذا يعود الناس دائمًا.')}</p>
          </div>
          <button className="btn btn-yellow" onClick={() => go('story')} style={{ marginTop: 28, fontSize: 16, padding: '18px 34px' }}>
            {t('Read our story','اقرأ قصتنا')} <Icon name="arrowR" size={16}/>
          </button>
        </div>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 8 }}>
          <video src="assets/built-standards.webm" autoPlay loop muted playsInline
            style={{ width: '100%', aspectRatio: '124/100', objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 26px 44px rgba(45,42,38,0.22))' }}></video>
          <GradualBlur position="bottom" height="7rem" strength={2.4} divCount={6} curve="bezier" exponential={true}/>
        </div>
        </div>
      </div>
    </section>
  );
}

function HomeCEOMessage() {
  const t = useT();
  return (
    <section className="grunge-over" style={{ background: 'var(--tc-paper)', padding: '40px 0 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'end' }}>
        <div style={{ paddingBottom: 72 }}>
          <h2 className="mc-head" style={{ fontSize: 'clamp(38px, 5vw, 72px)' }}>
            <span style={{ color: 'var(--tc-black)' }}>{t('Message','رسالة')}</span><br/>
            <span style={{ color: 'var(--tc-red)' }}>{t('From Our CEO','من رئيسنا التنفيذي')}</span>
          </h2>
          <div style={{ marginTop: 22, fontSize: 17, lineHeight: 1.75, color: 'var(--fg-2)', maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ margin: 0 }}>{t('Our international footprint is growing because our franchisees are bringing the flavorful, legendary taste of Texas to guests around the world. The vision for our brands is to become the global franchisor of choice.',
              'تتوسّع بصمتنا العالمية لأن أصحاب الامتياز لدينا ينقلون مذاق تكساس الأسطوري المليء بالنكهة إلى الضيوف حول العالم. رؤيتنا لعلاماتنا أن نصبح المانح العالمي المفضّل للامتياز.')}</p>
            <p style={{ margin: 0 }}>{t("Every year we strive to make that a reality by supporting our franchisees to build a successful and profitable business while living our company's values within a culture that delivers results. Just like our bold brands, that is a big deal.",
              'نسعى كل عام لتحقيق ذلك من خلال دعم أصحاب الامتياز لبناء أعمال ناجحة ومربحة مع تجسيد قيم شركتنا ضمن ثقافة تحقّق النتائج. ومثل علاماتنا الجريئة، هذا أمر عظيم.')}</p>
          </div>
          <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 16, height: 16, background: 'var(--tc-red)', flexShrink: 0 }}></span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--tc-red)' }}>
              {t('Roland Gonzalez','رولاند جونزاليس')}
            </span>
          </div>
        </div>
        <div style={{ position: 'relative', alignSelf: 'end' }}>
          <img src="assets/home-ceo.png" alt="Roland Gonzalez" className="ceo-portrait"
            style={{ width: '118%', maxWidth: 'none', marginLeft: '-9%', display: 'block', verticalAlign: 'bottom' }}/>
        </div>
      </div>
    </section>
  );
}

function NewAtTexas() {
  const { go } = useRoute();
  const t = useT();
  const trackRef = React.useRef(null);
  const cards = [
    { id: 'new-1', tag: t('New','جديد'),     title: t('Spicy Crunch Burger','برجر القرمشة الحار') },
    { id: 'new-2', tag: t('Limited','محدود'), title: t('BBQ Crunch Sub','سَب الباربكيو المقرمش') },
    { id: 'new-3', tag: t('Spicy','حار'),     title: t('Mexicana Loaded Fries','بطاطس مكسيكانا المحمّلة') },
    { id: 'new-4', tag: t('New','جديد'),     title: t('Honey-Butter Biscuits','بسكويت العسل والزبدة') },
  ];
  const scroll = (dir) => {
    const el = trackRef.current; if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.72), behavior: 'smooth' });
  };
  return (
    <section style={{ background: 'var(--tc-black)', color: 'var(--tc-cream)', padding: '80px 0 88px', overflow: 'hidden' }}>
      <div className="container">
        <h2 className="mc-head" style={{ fontSize: 'clamp(40px, 5.5vw, 80px)' }}>
          <span style={{ color: 'var(--tc-cream)' }}>{t('New At','الجديد في')}</span><br/>
          <span style={{ color: 'var(--tc-yellow)' }}>{t('Texas Chicken','تكساس تشيكن')}</span>
        </h2>
        <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.55, color: 'rgba(250,246,239,0.78)', maxWidth: 640 }}>
          {t("We're always bringing new bold flavors. Discover our latest limited-time offers and meals, that bring the crunch like only Texas Chicken™ can.",
             'نقدّم دائمًا نكهات جريئة جديدة. اكتشف أحدث عروضنا ووجباتنا لفترة محدودة، التي تأتي بالقرمشة كما تستطيع تكساس تشيكن™ وحدها.')}
        </p>
      </div>

      <div ref={trackRef} style={{ display: 'flex', gap: 22, overflowX: 'auto', scrollSnapType: 'x mandatory', padding: '34px max(24px, calc((100vw - 1200px)/2 + 24px)) 8px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
        {cards.map(c => (
          <article key={c.id} style={{ position: 'relative', flex: '0 0 min(440px, 78vw)', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', scrollSnapAlign: 'start', boxShadow: 'var(--shadow-2)', background: 'linear-gradient(160deg,#3a3531,#211e1b)' }}>
            <image-slot id={c.id} shape="rect" radius="0" data-on-dark="" fit="cover"
              placeholder={`Drop ${c.title} photo`}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}></image-slot>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.75) 100%)', pointerEvents: 'none' }}></div>
            <span className="chip" style={{ position: 'absolute', top: 16, left: 16, background: 'var(--tc-yellow)', color: 'var(--tc-black)' }}>★ {c.tag}</span>
            <h3 style={{ position: 'absolute', left: 20, right: 20, bottom: 18, margin: 0, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 26, textTransform: 'uppercase', lineHeight: 1, color: 'var(--tc-cream)' }}>{c.title}</h3>
          </article>
        ))}
      </div>

      <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 18 }}>
        {[['chevL', -1], ['chevR', 1]].map(([ic, d]) => (
          <button key={ic} onClick={() => scroll(d)} aria-label={ic} style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid rgba(250,246,239,0.45)', background: 'transparent', color: 'var(--tc-cream)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 140ms var(--ease-out)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--tc-yellow)'; e.currentTarget.style.color = 'var(--tc-black)'; e.currentTarget.style.borderColor = 'var(--tc-yellow)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--tc-cream)'; e.currentTarget.style.borderColor = 'rgba(250,246,239,0.45)'; }}>
            <Icon name={ic} size={20}/>
          </button>
        ))}
      </div>
    </section>
  );
}

// ---- World map with Egypt HQ + connected active regions ----
function WorldContinents() {
  // Stylized world silhouette on a 1200×500 equirectangular grid (preserveAspectRatio="none").
  const paths = [
    "M150 130 L220 95 L310 90 L380 110 L400 150 L395 195 L412 215 L382 232 L362 286 L346 300 L336 286 L348 256 L320 250 L300 216 L250 216 L200 196 L160 166 Z", // N. America
    "M432 72 L472 66 L488 96 L466 130 L436 120 Z",   // Greenland
    "M362 306 L402 300 L426 320 L436 356 L426 402 L406 446 L388 472 L378 456 L386 410 L366 370 L353 336 Z", // S. America
    "M566 176 L558 150 L576 120 L600 100 L616 116 L640 100 L660 118 L648 150 L662 166 L636 186 L606 178 L588 190 Z", // Europe
    "M600 196 L640 186 L700 168 L722 200 L746 232 L740 276 L720 332 L700 382 L682 426 L660 412 L660 360 L640 320 L616 276 L600 236 Z", // Africa
    "M748 196 L792 190 L808 220 L792 252 L766 248 L752 222 Z", // Arabia
    "M662 166 L702 120 L772 96 L862 90 L952 100 L1032 120 L1052 156 L1032 186 L1052 216 L1012 232 L982 216 L952 236 L916 226 L882 246 L852 232 L822 252 L802 236 L792 200 L762 196 L722 200 L702 186 Z", // Asia
    "M792 236 L818 236 L828 272 L810 302 L794 272 Z", // India
    "M902 250 L948 244 L978 270 L952 292 L916 286 Z", // SE Asia
    "M986 360 L1036 350 L1076 372 L1066 406 L1020 422 L990 406 L982 384 Z", // Australia
  ];
  return <g fill="#d9dce5">{paths.map((d, i) => <path key={i} d={d}/>)}</g>;
}

function HomeWorldMap() {
  const t = useT();
  const [active, setActive] = React.useState(null);
  // HQ + regions in 1200×500 coords. Order = draw sequence (Americas first).
  const hq = { x: 700, y: 178 };
  const regions = [
    { id: 'sa', x: 392, y: 360, route: 'M700 178 Q540 300 392 360', label: t('Americas','الأمريكتان') },
    { id: 'eu', x: 606, y: 128, route: 'M700 178 Q628 110 606 128', label: t('Europe','أوروبا') },
    { id: 'za', x: 672, y: 392, route: 'M700 178 Q706 300 672 392', label: t('Southern Africa','الجنوب الأفريقي') },
    { id: 'in', x: 775, y: 212, route: 'M700 178 Q748 178 775 212', label: t('Arabian Gulf','الخليج العربي') },
    { id: 'my', x: 940, y: 268, route: 'M700 178 Q830 150 940 268', label: t('Southeast Asia','جنوب شرق آسيا') },
  ];
  const pct = (x, y) => ({ left: `${(x / 1200) * 100}%`, top: `${(y / 500) * 100}%` });
  return (
    <section className="hp-map">
      <div style={{ position: 'relative', width: '100%', aspectRatio: '12 / 5' }}>
        {/* world silhouette + routes — one coordinate space */}
        <svg className="world" viewBox="0 0 1200 500" preserveAspectRatio="none">
          <WorldContinents/>
          {regions.map((r, i) => {
            const on = active === r.id;
            return (
              <g key={r.id}>
                <path className="hp-route" d={r.route} pathLength="1" fill="none" strokeLinecap="round"
                  stroke={on ? 'var(--tc-red)' : 'rgba(225,95,2,0.45)'} strokeWidth={on ? 2.2 : 1.5}
                  style={{ animationDelay: `${i * 0.22}s`, transition: 'stroke 200ms, stroke-width 200ms' }}/>
                <path className="hp-comet" d={r.route} pathLength="1" fill="none" strokeLinecap="round"
                  stroke={on ? 'var(--tc-red)' : 'var(--tc-orange, #e15f02)'} strokeWidth="2.6"
                  style={{ animationDelay: `${i * 0.5}s` }}/>
              </g>
            );
          })}
        </svg>

        {/* region pins */}
        {regions.map(r => {
          const on = active === r.id;
          return (
            <button key={r.id} onMouseEnter={() => setActive(r.id)} onMouseLeave={() => setActive(null)} onClick={() => setActive(r.id)}
              title={r.label}
              style={{ position: 'absolute', ...pct(r.x, r.y), transform: 'translate(-50%,-50%)', width: 22, height: 22, padding: 0, border: 0, background: 'transparent', cursor: 'pointer', zIndex: 3 }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--tc-orange, #e15f02)', animation: 'pinPulse 2.4s ease-out infinite' }}></span>
              <span style={{ position: 'absolute', inset: '27%', borderRadius: '50%', background: on ? 'var(--tc-red)' : 'var(--tc-orange, #e15f02)', border: '3px solid #fff', boxShadow: '0 3px 9px rgba(0,0,0,0.28)', transform: on ? 'scale(1.25)' : 'scale(1)', transition: 'transform 160ms var(--ease-pop), background 160ms' }}></span>
              {on && (
                <span style={{ position: 'absolute', bottom: '150%', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', background: 'var(--tc-black)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '5px 10px', borderRadius: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.25)' }}>{r.label}</span>
              )}
            </button>
          );
        })}

        {/* HQ pin */}
        <div style={{ position: 'absolute', ...pct(hq.x, hq.y), zIndex: 4, animation: 'pinBob 4s ease-in-out infinite', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ background: 'var(--tc-black)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '7px 16px', borderRadius: 999, boxShadow: '0 8px 18px rgba(0,0,0,0.28)' }}>{t('Egypt · HQ','مصر · المقر')}</span>
          <span style={{ position: 'relative', width: 24, height: 24 }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(45,42,38,0.35)', animation: 'pinPulse 2.6s ease-out infinite' }}></span>
            <span style={{ position: 'absolute', inset: '20%', borderRadius: '50%', background: 'var(--tc-black)', border: '3px solid #fff', boxShadow: '0 4px 11px rgba(0,0,0,0.32)' }}></span>
          </span>
        </div>

        {/* legend */}
        <div style={{ position: 'absolute', left: 24, bottom: 18, display: 'flex', gap: 22, alignItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-2)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--tc-orange, #e15f02)' }}></span>{t('Active Region','منطقة نشطة')}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--tc-black)' }}></span>{t('Egypt HQ','مقر مصر')}</span>
        </div>
        <div style={{ position: 'absolute', right: 24, bottom: 18, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-3)' }}>
          {t('Hover or click a pin','مرّر أو انقر على دبوس')}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main className="page">
      <HomeHero/>
      <BuiltOnStandards/>
      <HomeCEOMessage/>
      <NewAtTexas/>
    </main>
  );
}

Object.assign(window, { HomePage });
