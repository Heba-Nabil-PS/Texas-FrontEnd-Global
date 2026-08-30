/* global React */
// Find Your Market — cornerstone page with map + list + filters

function MarketPage({ tweaks, setTweak }) {
  const { go } = useRoute();
  const t = useT();
  const [brand, setBrand] = useState('all'); // all | texas | churchs
  const [region, setRegion] = useState('all');
  const [q, setQ] = useState('');
  const [view, setView] = useState('map'); // map | list

  const filtered = useMemo(() => {
    let items = FLAT_MARKETS;
    if (brand !== 'all') items = items.filter(m => m.brand === brand);
    if (region !== 'all') items = items.filter(m => m.region === region);
    if (q) items = items.filter(m => m.name.toLowerCase().includes(q.toLowerCase()));
    return items;
  }, [brand, region, q]);

  const totalStores = FLAT_MARKETS.reduce((s, m) => s + m.stores, 0);
  const liveMarkets = FLAT_MARKETS.filter(m => m.status === 'live').length;

  return (
    <main className="page" style={{ background: 'var(--tc-cream)' }}>
      {/* Hero */}
      <section style={{ background: 'var(--tc-black)', color: 'var(--tc-cream)', padding: '72px 0 56px', position: 'relative', overflow: 'hidden' }}>
        <span className="star" style={{
          position: 'absolute', top: '-15%', right: '-5%',
          width: 380, height: 380, color: 'rgba(245,181,30,0.08)',
        }}></span>
        <div className="container" style={{ position: 'relative' }}>
          <div className="eyebrow on-dark">★ {t('Find your market','اعثر على سوقك')}</div>
          <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 112px)', margin: '12px 0 16px', color: 'var(--tc-cream)' }}>
            {t('Texas Chicken,','تكساس تشيكن،')}<br/>
            <span style={{ color: 'var(--tc-yellow)' }}>{t('wherever you are.','أينما كنت.')}</span>
          </h1>
          <p style={{ fontSize: 19, color: 'rgba(250,246,239,0.8)', maxWidth: 640, lineHeight: 1.5, margin: 0 }}>
            {t(`${liveMarkets} markets. ${totalStores.toLocaleString()} restaurants. Pick your country and we'll take you to your local site for menus, prices, hours, and ordering.`,
               `${liveMarkets} سوقًا. ${totalStores.toLocaleString()} مطعم. اختر بلدك وسننقلك إلى موقعك المحلي للقوائم والأسعار والساعات والطلب.`)}
          </p>
        </div>
      </section>

      {/* Brand picker — Texas Chicken vs Church's */}
      <section style={{ background: 'var(--tc-cream)', padding: '40px 0 8px' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 14 }}>★ {t('Choose your brand','اختر علامتك')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { key: 'all', name: t('All markets','كل الأسواق'), sub: t(`${FLAT_MARKETS.filter(m=>m.status==='live').length} live markets · 23 countries`, `${FLAT_MARKETS.filter(m=>m.status==='live').length} سوق نشط · ٢٣ دولة`), flags: ['🌍'], color: 'var(--tc-black)' },
              { key: 'texas', name: 'Texas Chicken', sub: t(`International · ${FLAT_MARKETS.filter(m=>m.brand==='texas'&&m.status==='live').length} markets · MENA · APAC`, `دولي · ${FLAT_MARKETS.filter(m=>m.brand==='texas'&&m.status==='live').length} سوق · MENA · APAC`), logo: 'assets/logo-texas-white.png', color: 'var(--tc-red)' },
              { key: 'churchs', name: "Church's Texas Chicken", sub: t(`Americas · ${FLAT_MARKETS.filter(m=>m.brand==='churchs').length} markets · US & Mexico`, `الأمريكتان · ${FLAT_MARKETS.filter(m=>m.brand==='churchs').length} سوق · أمريكا والمكسيك`), logo: 'assets/logo-churchs-white.png', color: 'var(--tc-yellow)' },
            ].map(b => {
              const active = brand === b.key;
              const onYellow = b.color === 'var(--tc-yellow)';
              return (
                <button key={b.key} onClick={() => setBrand(b.key)} style={{
                  display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left',
                  padding: '20px 22px', borderRadius: 'var(--radius-xl)', cursor: 'pointer',
                  background: active ? b.color : 'var(--tc-paper)',
                  color: active ? (onYellow ? 'var(--tc-black)' : 'var(--tc-cream)') : 'var(--tc-black)',
                  border: active ? '2px solid ' + b.color : '2px solid transparent',
                  boxShadow: active ? 'var(--shadow-2)' : 'var(--inset-hair)',
                  transition: 'all 200ms var(--ease-out)',
                }}
                onMouseEnter={e => !active && (e.currentTarget.style.transform = 'translateY(-2px)', e.currentTarget.style.boxShadow = 'var(--inset-hair), var(--shadow-2)')}
                onMouseLeave={e => !active && (e.currentTarget.style.transform = '', e.currentTarget.style.boxShadow = 'var(--inset-hair)')}
                >
                  <div style={{
                    width: 64, height: 64, flexShrink: 0, position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {b.logo ? (
                      <div style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: 'var(--tc-black)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <img
                          src={b.logo}
                          style={{ width: '78%', height: '78%', objectFit: 'contain' }}
                          alt={b.name}
                        />
                      </div>
                    ) : b.flags.length === 1 ? (
                      <div style={{
                        width: 56, height: 56, borderRadius: '50%',
                        background: active ? (onYellow ? 'var(--tc-black)' : 'rgba(0,0,0,0.2)') : 'var(--tc-cream-200)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 30,
                      }}>{b.flags[0]}</div>
                    ) : (
                      <div style={{ display: 'flex' }}>
                        {b.flags.map((f, i) => (
                          <div key={i} style={{
                            width: 38, height: 38, borderRadius: '50%',
                            background: active ? (onYellow ? 'var(--tc-cream)' : 'var(--tc-paper)') : 'var(--tc-paper)',
                            border: active ? '2px solid ' + (onYellow ? 'var(--tc-black)' : 'var(--tc-cream)') : '2px solid var(--tc-paper)',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 22, marginLeft: i === 0 ? 0 : -14, zIndex: b.flags.length - i,
                          }}>{f}</div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.05 }}>{b.name}</div>
                    <div style={{ fontSize: 12, opacity: active ? 0.85 : 0.6, marginTop: 4 }}>{b.sub}</div>
                  </div>
                  {active && <Icon name="check" size={20} stroke={2.5}/>}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Controls */}
      <section style={{ background: 'var(--tc-cream)', padding: '32px 0', borderBottom: '1px solid var(--border-1)', position: 'sticky', top: 80, zIndex: 20, backdropFilter: 'blur(20px)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', background: 'var(--tc-paper)', borderRadius: 999, boxShadow: 'var(--inset-hair)', flex: '1 1 280px', minWidth: 240 }}>
            <Icon name="search" size={18}/>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder={t('Search by country','ابحث حسب البلد')}
              style={{ border: 0, background: 'transparent', flex: 1, outline: 'none', fontSize: 15, fontFamily: 'var(--font-body)' }}/>
          </div>
          {/* Region filter */}
          <div style={{ display: 'flex', gap: 6, padding: 4, background: 'var(--tc-paper)', borderRadius: 999, boxShadow: 'var(--inset-hair)' }}>
            {[['all',t('All','الكل')], ['Middle East',t('Middle East','الشرق الأوسط')], ['Asia Pacific',t('Asia Pacific','آسيا والمحيط الهادئ')], ['Americas',t('Americas','الأمريكتان')]].map(([k,l]) => (
              <button key={k} onClick={() => setRegion(k)} style={{
                padding: '10px 18px', borderRadius: 999, border: 0,
                background: region === k ? 'var(--tc-black)' : 'transparent',
                color: region === k ? 'var(--tc-cream)' : 'var(--tc-black)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
                textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer',
                transition: 'all 140ms var(--ease-out)',
              }}>{l}</button>
            ))}
          </div>
          {/* View toggle */}
          <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--tc-paper)', borderRadius: 12, boxShadow: 'var(--inset-hair)', marginLeft: 'auto' }}>
            {[['map',t('Map','خريطة')],['list',t('List','قائمة')]].map(([k,l]) => (
              <button key={k} onClick={() => setView(k)} style={{
                padding: '10px 18px', borderRadius: 8, border: 0,
                background: view === k ? 'var(--tc-yellow)' : 'transparent',
                color: 'var(--tc-black)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
                textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer',
              }}>{l}</button>
            ))}
          </div>
        </div>
      </section>

      {view === 'map' ? <WorldMapView markets={filtered}/> : <ListView markets={filtered}/>}

      {/* Coming soon strip */}
      <section style={{ background: 'var(--tc-cream-200)', padding: '64px 0' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--fg-3)' }}>★ Coming soon</div>
          <h2 className="display-2" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '8px 0 28px' }}>Markets in motion.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {FLAT_MARKETS.filter(m => m.status === 'soon').map(m => (
              <div key={m.code} style={{
                background: 'var(--tc-paper)', borderRadius: 12, padding: '16px 18px',
                boxShadow: 'var(--inset-hair)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <Flag code={m.code} size={28}/>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{m.region} · Opening 2026</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, padding: 24, background: 'var(--tc-paper)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--inset-hair)', display: 'none' }}>
            {/* removed — merged into yellow band below */}
          </div>
        </div>
      </section>

      {/* Yellow band — Bring Texas Chicken to your country */}
      <section style={{ background: 'var(--tc-yellow)', color: 'var(--tc-black)', padding: '40px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--tc-black)' }}>★ {t('Bring us to your country','استقطبنا إلى بلدك')}</div>
            <h3 className="display" style={{ fontSize: 44, margin: '4px 0 0' }}>{t('Bring Texas Chicken to your country.','جلب تكساس تشيكن إلى بلدك.')}</h3>
            <p style={{ marginTop: 8, fontSize: 15, color: 'var(--tc-black)', opacity: 0.78, maxWidth: 560 }}>
              {t('Master franchise opportunities are open across MENA, Asia, and beyond.','فرص الامتياز الرئيسي مفتوحة في الشرق الأوسط وآسيا وما بعدهما.')}
            </p>
          </div>
          <button onClick={() => { go('franchising'); setTimeout(() => { const el = document.getElementById('inquiry'); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo({ top: y, behavior: 'smooth' }); } }, 120); }} className="btn btn-black">
            {t('Franchise enquiry','استفسار الامتياز')} <Icon name="arrowR" size={18}/>
          </button>
        </div>
      </section>
    </main>
  );
}

// World map — stylized SVG dot map with pulsing pins per market
function WorldMapView({ markets }) {
  const [hover, setHover] = useState(null);
  const t = useT();
  // Approx lat/lng → SVG coords for our 1000×500 canvas
  const COORDS = {
    EG: [555, 235], SA: [590, 250], AE: [625, 250], KW: [605, 235],
    BH: [615, 245], QA: [620, 250], JO: [560, 225],
    MY: [770, 295], ID: [800, 320], SG: [780, 305], NZ: [925, 380],
    PH: [820, 270], TH: [770, 270], US: [220, 220], MX: [195, 260],
  };

  return (
    <section style={{ background: 'var(--tc-cream)', padding: '40px 0 80px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'stretch' }}>
          {/* Map */}
          <div style={{ background: 'var(--tc-paper)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', boxShadow: 'var(--inset-hair), var(--shadow-2)', position: 'relative', aspectRatio: '2/1' }}>}}>
            <svg viewBox="0 0 1000 500" style={{ width: '100%', height: '100%', display: 'block', background: 'linear-gradient(180deg, #fffdf7 0%, #f3ede1 100%)' }}>
              {/* World dot map approximation */}
              <WorldDots/>
              {/* Pins */}
              {markets.map(m => {
                const c = COORDS[m.code];
                if (!c) return null;
                const isHover = hover === m.code;
                const isSoon = m.status === 'soon';
                return (
                  <g key={m.code}
                     onMouseEnter={() => setHover(m.code)} onMouseLeave={() => setHover(null)}
                     style={{ cursor: isSoon ? 'default' : 'pointer' }}>
                    {!isSoon && (
                      <circle cx={c[0]} cy={c[1]} r={isHover ? 26 : 20} fill="rgba(154,51,36,0.18)">
                        <animate attributeName="r" values="18;26;18" dur="2.2s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.2s" repeatCount="indefinite"/>
                      </circle>
                    )}
                    {/* Flag pin */}
                    <circle cx={c[0]} cy={c[1]} r={isHover ? 16 : 13}
                            fill={isSoon ? '#cdc7bb' : 'var(--tc-paper)'}
                            stroke={isSoon ? 'rgba(45,42,38,0.4)' : 'var(--tc-red)'}
                            strokeWidth={isSoon ? 1.5 : 2.5}
                            style={{ transition: 'r 140ms var(--ease-out)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}/>
                    <foreignObject x={c[0] - (isHover ? 14 : 12)} y={c[1] - (isHover ? 9 : 8)} width={isHover ? 28 : 24} height={isHover ? 18 : 16} style={{ pointerEvents: 'none', filter: isSoon ? 'grayscale(1) opacity(0.5)' : 'none' }}>
                      <Flag code={m.code} size={isHover ? 16 : 14}/>
                    </foreignObject>
                    {isHover && (
                      <g>
                        <rect x={c[0] - 80} y={c[1] - 60} width="160" height="40" rx="8" fill="var(--tc-black)"/>
                        <polygon points={`${c[0]},${c[1]-20} ${c[0]-6},${c[1]-28} ${c[0]+6},${c[1]-28}`} fill="var(--tc-black)"/>
                        <text x={c[0]} y={c[1] - 44} textAnchor="middle" fill="var(--tc-cream)" fontFamily="var(--font-display)" fontWeight="800" fontSize="13" letterSpacing="0.04em">
                          {m.name.toUpperCase()}
                        </text>
                        <text x={c[0]} y={c[1] - 30} textAnchor="middle" fill="var(--tc-yellow)" fontFamily="var(--font-display)" fontWeight="700" fontSize="11">
                          {isSoon ? 'Coming soon' : `${m.stores} restaurants`}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
            {/* Legend */}
            <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(45,42,38,0.85)', backdropFilter: 'blur(8px)', color: 'var(--tc-cream)', padding: '10px 16px', borderRadius: 999, display: 'flex', gap: 16, alignItems: 'center', fontSize: 12, fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 24, height: 16, display: 'inline-flex', alignItems: 'center', borderRadius: 2 }}>
                  <Flag code="sa" size={14}/>
                </span>
                {t('Live','نشط')}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 24, height: 16, display: 'inline-flex', alignItems: 'center', filter: 'grayscale(1) opacity(0.7)' }}>
                  <Flag code="jo" size={14}/>
                </span>
                {t('Coming soon','قريبًا')}
              </span>
            </div>
          </div>

          {/* Market list sidebar — matches map height */}
          <div style={{ position: 'relative', minHeight: 0 }}>
            <div style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: 4, display: 'flex', flexDirection: 'column' }}>
              <div className="eyebrow" style={{ marginBottom: 12, padding: '0 4px' }}>
                {markets.length} {markets.length === 1 ? 'market' : 'markets'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {markets.map(m => <MarketCard key={m.code} m={m} compact/>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorldDots() {
  // Generate dotted world silhouette via simple ellipses for continents.
  // Approximation — not geographically precise. Aimed at brand feel.
  const continents = [
    // North America
    { cx: 200, cy: 200, rx: 90, ry: 60 },
    // South America
    { cx: 270, cy: 360, rx: 50, ry: 80 },
    // Europe
    { cx: 510, cy: 175, rx: 60, ry: 35 },
    // Africa
    { cx: 540, cy: 290, rx: 75, ry: 85 },
    // Middle East / Arabia
    { cx: 605, cy: 240, rx: 35, ry: 40 },
    // Asia
    { cx: 730, cy: 220, rx: 130, ry: 70 },
    // SE Asia
    { cx: 790, cy: 310, rx: 50, ry: 35 },
    // Australia
    { cx: 870, cy: 380, rx: 65, ry: 35 },
  ];
  const dots = [];
  let i = 0;
  for (let x = 20; x < 980; x += 11) {
    for (let y = 60; y < 460; y += 11) {
      const inside = continents.some(c => {
        const dx = (x - c.cx) / c.rx;
        const dy = (y - c.cy) / c.ry;
        return dx*dx + dy*dy < 1;
      });
      if (inside) {
        dots.push(<circle key={i++} cx={x} cy={y} r="1.8" fill="rgba(45,42,38,0.18)"/>);
      }
    }
  }
  return <>{dots}</>;
}

function MarketCard({ m, compact }) {
  const isSoon = m.status === 'soon';
  return (
    <a target="_blank" rel="noopener" href={isSoon ? undefined : `https://${m.url}`} style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: compact ? '12px 14px' : '20px 22px',
      background: 'var(--tc-paper)', borderRadius: 12,
      boxShadow: 'var(--inset-hair)',
      cursor: isSoon ? 'not-allowed' : 'pointer',
      opacity: isSoon ? 0.55 : 1,
      transition: 'all 140ms var(--ease-out)',
      textDecoration: 'none', color: 'inherit',
    }}
    onMouseEnter={e => !isSoon && (e.currentTarget.style.transform = 'translateY(-1px)', e.currentTarget.style.boxShadow = 'var(--shadow-2), var(--inset-hair)')}
    onMouseLeave={e => (e.currentTarget.style.transform = '', e.currentTarget.style.boxShadow = 'var(--inset-hair)')}
    >
      <span style={{
        width: compact ? 36 : 48, height: compact ? 36 : 48,
        borderRadius: '50%',
        background: 'var(--tc-cream-200)',
        border: isSoon ? '2px solid rgba(45,42,38,0.18)' : '2px solid var(--tc-red)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        filter: isSoon ? 'grayscale(0.6)' : 'none', overflow: 'hidden',
      }}>
        <Flag code={m.code} size={compact ? 18 : 24}/>
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: compact ? 15 : 18, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.1 }}>{m.name}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>
          {isSoon ? 'Coming soon' : `${m.stores} restaurants · ${m.url}`}
        </div>
      </div>
      {!isSoon && <Icon name="arrowUR" size={18}/>}
    </a>
  );
}

function ListView({ markets }) {
  // Group by region
  const grouped = useMemo(() => {
    const m = {};
    markets.forEach(item => { (m[item.region] = m[item.region] || []).push(item); });
    return m;
  }, [markets]);
  return (
    <section style={{ background: 'var(--tc-cream)', padding: '48px 0 80px' }}>
      <div className="container">
        {Object.keys(grouped).map(region => (
          <div key={region} style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 className="display-2" style={{ fontSize: 40, margin: 0 }}>{region}</h2>
              <span style={{ color: 'var(--fg-3)', fontSize: 14 }}>
                {grouped[region].length} {grouped[region].length === 1 ? 'market' : 'markets'} · {grouped[region].reduce((s,m) => s+m.stores, 0)} restaurants
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
              {grouped[region].map(m => <MarketCard key={m.code} m={m}/>)}
            </div>
          </div>
        ))}
        {markets.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, textTransform: 'uppercase' }}>No markets match.</div>
            <p style={{ color: 'var(--fg-3)' }}>Try a different search or clear your filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { MarketPage });
