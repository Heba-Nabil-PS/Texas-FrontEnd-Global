/* global React */
// Shared shell: top utility bar, primary nav, footer, market switcher

const { useState, useEffect, useRef, useMemo, createContext, useContext } = React;

// ============================== ROUTER CONTEXT ==============================
const RouteCtx = createContext({ page: 'home', go: () => {}, market: 'Egypt' });
const useRoute = () => useContext(RouteCtx);

// Flag component — uses hatscripts circle-flags (CORS-friendly SVG flags).
function Flag({ code, size = 24, style = {} }) {
  if (!code) return null;
  const c = code.toLowerCase();
  if (c === 'world' || c === '🌍') {
    return <span style={{ fontSize: size, lineHeight: 1, ...style }}>🌍</span>;
  }
  return (
    <img
      src={`https://hatscripts.github.io/circle-flags/flags/${c}.svg`}
      alt=""
      width={size}
      height={size}
      style={{ display: 'inline-block', objectFit: 'cover', borderRadius: '50%', verticalAlign: 'middle', ...style }}
    />
  );
}

// ============================== ICONS ==============================
function Icon({ name, size = 20, stroke = 1.75 }) {
  const paths = {
    pin: <><path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></>,
    chev: <><path d="m6 9 6 6 6-6"/></>,
    chevR: <><path d="m9 6 6 6-6 6"/></>,
    chevL: <><path d="m15 18-6-6 6-6"/></>,
    arrowR: <><path d="M5 12h14M13 5l7 7-7 7"/></>,
    arrowUR: <><path d="M7 17 17 7M7 7h10v10"/></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18"/></>,
    close: <><path d="M18 6 6 18M6 6l12 12"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    minus: <><path d="M5 12h14"/></>,
    play: <><path d="M5 4v16l14-8z" fill="currentColor"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z"/></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    fire: <><path d="M12 22c4.4 0 8-3.6 8-8 0-3-2-5-3-8-1 3-4 3-4 6-1-1-2-2-2-4-3 2-5 4-5 7 0 4 3 7 6 7z"/></>,
    leaf: <><path d="M3 21c0-9 7-16 18-18-2 11-9 18-18 18zM3 21l9-9"/></>,
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></>,
    bag: <><path d="M6 7h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7zM9 7V5a3 3 0 0 1 6 0v2"/></>,
    fb: <><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></>,
    ig: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></>,
    tt: <><path d="M16 3v8a4 4 0 1 1-4-4"/><path d="M16 3a4 4 0 0 0 4 4"/></>,
    yt: <><rect x="3" y="6" width="18" height="12" rx="3"/><path d="m10 9 5 3-5 3z" fill="currentColor"/></>,
    check: <><path d="M5 12l5 5L20 6"/></>,
    filter: <><path d="M4 5h16M7 12h10M10 19h4"/></>,
    download: <><path d="M12 3v12M6 11l6 6 6-6M5 21h14"/></>,
    rewards: <><circle cx="12" cy="12" r="9"/><path d="M12 7l1.6 3.4 3.7.5-2.7 2.6.6 3.7L12 15.5l-3.3 1.7.6-3.7L6.6 10.9l3.7-.5z" fill="currentColor"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  );
}

// ============================== MARKETS (data) ==============================
const MARKETS = [
  { region: 'Middle East', regionAr: 'الشرق الأوسط', items: [
    { name: 'Egypt', nameAr: 'مصر', code: 'EG', flag: '🇪🇬', url: 'eg.texaschicken.com', stores: 38, status: 'live', brand: 'texas' },
    { name: 'Saudi Arabia', nameAr: 'السعودية', code: 'SA', flag: '🇸🇦', url: 'sa.texaschicken.com', stores: 142, status: 'live', brand: 'texas' },
    { name: 'United Arab Emirates', nameAr: 'الإمارات', code: 'AE', flag: '🇦🇪', url: 'uae.texaschicken.com', stores: 64, status: 'live', brand: 'texas' },
    { name: 'Kuwait', nameAr: 'الكويت', code: 'KW', flag: '🇰🇼', url: 'kw.texaschicken.com', stores: 22, status: 'live', brand: 'texas' },
    { name: 'Bahrain', nameAr: 'البحرين', code: 'BH', flag: '🇧🇭', url: 'bh.texaschicken.com', stores: 9, status: 'live', brand: 'texas' },
    { name: 'Qatar', nameAr: 'قطر', code: 'QA', flag: '🇶🇦', url: 'qa.texaschicken.com', stores: 14, status: 'live', brand: 'texas' },
    { name: 'Jordan', nameAr: 'الأردن', code: 'JO', flag: '🇯🇴', url: 'jo.texaschicken.com', stores: 11, status: 'soon', brand: 'texas' },
  ]},
  { region: 'Asia Pacific', regionAr: 'آسيا والمحيط الهادئ', items: [
    { name: 'Malaysia', nameAr: 'ماليزيا', code: 'MY', flag: '🇲🇾', url: 'malaysia.texaschicken.com', stores: 96, status: 'live', brand: 'texas' },
    { name: 'Indonesia', nameAr: 'إندونيسيا', code: 'ID', flag: '🇮🇩', url: 'id.texaschicken.com', stores: 54, status: 'live', brand: 'texas' },
    { name: 'Singapore', nameAr: 'سنغافورة', code: 'SG', flag: '🇸🇬', url: 'sg.texaschicken.com', stores: 18, status: 'live', brand: 'texas' },
    { name: 'New Zealand', nameAr: 'نيوزيلندا', code: 'NZ', flag: '🇳🇿', url: 'nz.texaschicken.com', stores: 12, status: 'live', brand: 'texas' },
    { name: 'Philippines', nameAr: 'الفلبين', code: 'PH', flag: '🇵🇭', url: 'ph.texaschicken.com', stores: 28, status: 'live', brand: 'texas' },
    { name: 'Thailand', nameAr: 'تايلاند', code: 'TH', flag: '🇹🇭', url: 'th.texaschicken.com', stores: 0, status: 'soon', brand: 'texas' },
  ]},
  { region: 'Americas', regionAr: 'الأمريكتان', items: [
    { name: 'United States', nameAr: 'الولايات المتحدة', code: 'US', flag: '🇺🇸', url: 'churchstexaschicken.com', stores: 1050, status: 'live', brand: 'churchs' },
    { name: 'Mexico', nameAr: 'المكسيك', code: 'MX', flag: '🇲🇽', url: 'mx.churchstexaschicken.com', stores: 78, status: 'live', brand: 'churchs' },
  ]},
];

const FLAT_MARKETS = MARKETS.flatMap(r => r.items.map(m => ({ ...m, region: r.region, regionAr: r.regionAr })));

// ============================== HEADER ==============================
function PromoStrip({ market }) {
  const t = useT();
  return (
    <div style={{
      background: 'var(--tc-red)', color: 'var(--tc-cream)',
      fontFamily: 'var(--font-display)', fontWeight: 700,
      fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
      padding: '8px 16px', textAlign: 'center', overflow: 'hidden',
    }}>
      <span className="star" style={{ marginRight: 10, color: 'var(--tc-yellow)' }}></span>
      {t(`New in ${market}: Honey-Butter Biscuits are back · Order now`, `جديد في ${market}: عاد بسكويت العسل والزبدة · اطلب الآن`)}
    </div>
  );
}

function MarketSwitcher({ open, onClose, current, onPick }) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    if (!q) return MARKETS;
    return MARKETS.map(r => ({ ...r, items: r.items.filter(m => m.name.toLowerCase().includes(q.toLowerCase())) }))
      .filter(r => r.items.length);
  }, [q]);

  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(45,42,38,0.55)',
      backdropFilter: 'blur(4px)', zIndex: 100, animation: 'fadeUp 200ms var(--ease-out)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--tc-cream)', width: 'min(880px, 92vw)', maxHeight: '80vh', overflow: 'auto',
        borderRadius: 'var(--radius-2xl)', padding: 40, boxShadow: 'var(--shadow-3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div className="eyebrow">★ Choose your market</div>
            <h2 className="display" style={{ fontSize: 48, margin: '8px 0 4px' }}>Find your Texas Chicken.</h2>
            <p style={{ color: 'var(--fg-3)', margin: 0, fontSize: 15 }}>You'll be taken to your local market site for menu, prices, and ordering.</p>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: 'transparent', border: 0, cursor: 'pointer', padding: 8 }}>
            <Icon name="close" size={28}/>
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--tc-paper)', borderRadius: 999, boxShadow: 'var(--inset-hair)', marginBottom: 24 }}>
          <Icon name="search" size={18}/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by country" style={{ flex: 1, border: 0, background: 'transparent', outline: 'none', fontSize: 15, fontFamily: 'var(--font-body)' }}/>
        </div>
        {filtered.map(region => (
          <div key={region.region} style={{ marginBottom: 28 }}>
            <div className="eyebrow" style={{ color: 'var(--fg-4)', marginBottom: 14 }}>{region.region}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
              {region.items.map(m => {
                const isCurrent = m.name === current;
                const isSoon = m.status === 'soon';
                return (
                  <button key={m.code} onClick={() => !isSoon && onPick(m)} disabled={isSoon} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                    background: isCurrent ? 'var(--tc-black)' : 'var(--tc-paper)',
                    color: isCurrent ? 'var(--tc-cream)' : 'var(--tc-black)',
                    boxShadow: isCurrent ? 'none' : 'var(--inset-hair)',
                    border: 0, borderRadius: 12, cursor: isSoon ? 'not-allowed' : 'pointer',
                    opacity: isSoon ? 0.45 : 1,
                    textAlign: 'left', transition: 'transform 140ms var(--ease-out)',
                  }}
                  onMouseEnter={e => !isSoon && (e.currentTarget.style.transform = 'translateY(-1px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = '')}
                  >
                    <Flag code={m.code} size={22}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{m.name}</div>
                      <div style={{ fontSize: 12, opacity: 0.7 }}>
                        {isSoon ? 'Coming soon' : `${m.stores} restaurants`}
                      </div>
                    </div>
                    {isCurrent && <Icon name="check" size={18}/>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Header({ tweaks, setTweak }) {
  const { page, go } = useRoute();
  const t = useT();
  const [marketOpen, setMarketOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const market = FLAT_MARKETS.find(m => m.name === tweaks.market) || FLAT_MARKETS[0];

  const navItems = [
    { id: 'story', label: t('Our Story', 'قصتنا') },
    { id: 'menu', label: t('Menu', 'القائمة') },
    { id: 'app', label: t('App & Rewards', 'التطبيق والمكافآت') },
    { id: 'news', label: t('News', 'الأخبار') },
    { id: 'franchising', label: t('Franchising', 'الامتياز') },
    { id: 'contact', label: t('Contact Us', 'تواصل معنا') },
  ];

  return (
    <>
      {tweaks.showPromoStrip && <PromoStrip market={market.name}/>}
      <header style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--tc-yellow)', boxShadow: scrolled ? '0 6px 18px rgba(45,42,38,0.18)' : 'none', transition: 'box-shadow 200ms var(--ease-out)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 18, padding: '8px 32px', minHeight: 78 }}>
          <a onClick={() => go('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img src="assets/logo-dual-badge.svg" style={{ height: 56 }} alt="Texas Chicken"/>
          </a>
          <nav style={{ display: 'flex', gap: 2, flex: 1, justifyContent: 'center' }} className="primary-nav">
            {navItems.map(n => {
              const active = page === n.id || (n.id === 'story' && page === 'leadership');
              return (
                <a key={n.id} onClick={() => go(n.id)} style={{
                  cursor: 'pointer', position: 'relative',
                  padding: '10px 12px', borderRadius: 8,
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15,
                  textTransform: 'uppercase', letterSpacing: '0.02em',
                  color: active ? 'var(--tc-red)' : 'var(--tc-black)',
                  transition: 'all 140ms var(--ease-out)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--tc-red)'}
                onMouseLeave={e => e.currentTarget.style.color = active ? 'var(--tc-red)' : 'var(--tc-black)'}
                >
                  {n.label}
                  {active && <span style={{ position: 'absolute', left: 12, right: 12, bottom: 3, height: 3, background: 'var(--tc-red)', borderRadius: 2 }}></span>}
                </a>
              );
            })}
          </nav>
          <button onClick={() => setTweak('dir', tweaks.dir === 'rtl' ? 'ltr' : 'rtl')} style={{
            display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
            background: 'rgba(45,42,38,0.08)', border: '1.5px solid rgba(45,42,38,0.28)', cursor: 'pointer',
            padding: '9px 14px', borderRadius: 999,
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13,
            textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--tc-black)',
            transition: 'all 140ms var(--ease-out)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--tc-black)'; e.currentTarget.style.color = 'var(--tc-yellow)'; e.currentTarget.style.borderColor = 'var(--tc-black)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(45,42,38,0.08)'; e.currentTarget.style.color = 'var(--tc-black)'; e.currentTarget.style.borderColor = 'rgba(45,42,38,0.28)'; }}
          aria-label="Switch language"
          >
            <Icon name="globe" size={14} stroke={2}/>
            <span>{tweaks.dir === 'rtl' ? 'EN' : 'عربي'}</span>
          </button>
          <button className="nav-burger" onClick={() => setMobileOpen(true)} aria-label="Open menu" style={{
            display: 'none', alignItems: 'center', justifyContent: 'center',
            width: 46, height: 46, borderRadius: 12, flexShrink: 0,
            background: 'rgba(45,42,38,0.10)', border: '1.5px solid rgba(45,42,38,0.28)', cursor: 'pointer', color: 'var(--tc-black)',
          }}>
            <Icon name="menu" size={24}/>
          </button>
          <button onClick={() => go('market')} className="nav-order" aria-label={t('Find a location','اعثر على فرع')} style={{
            display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
            background: 'var(--tc-red)', border: '1.5px solid var(--tc-red)', cursor: 'pointer',
            padding: '9px 18px', borderRadius: 999,
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13,
            textTransform: 'uppercase', letterSpacing: '0.06em', color: '#fff',
            transition: 'all 140ms var(--ease-out)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--tc-black)'; e.currentTarget.style.borderColor = 'var(--tc-black)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--tc-red)'; e.currentTarget.style.borderColor = 'var(--tc-red)'; }}
          >
            <Icon name="pin" size={14} stroke={2}/>
            <span>{t('Find a location','اعثر على فرع')}</span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(45,42,38,0.5)', backdropFilter: 'blur(2px)' }}>
          <div onClick={e => e.stopPropagation()} style={{
            position: 'absolute', top: 0, insetInlineEnd: 0, height: '100%', width: 'min(86vw, 360px)',
            background: 'var(--tc-cream)', boxShadow: '-12px 0 40px rgba(0,0,0,0.25)',
            display: 'flex', flexDirection: 'column', padding: '20px 22px', overflowY: 'auto',
            animation: 'fadeUp 220ms var(--ease-out)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <img src="assets/logo-dual-badge.svg" style={{ height: 44 }} alt="Texas Chicken"/>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" style={{ width: 42, height: 42, borderRadius: 10, border: '1.5px solid var(--border-2)', background: 'transparent', cursor: 'pointer', color: 'var(--tc-black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="x" size={22}/>
              </button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {navItems.map(n => {
                const active = page === n.id || (n.id === 'story' && page === 'leadership');
                return (
                  <a key={n.id} onClick={() => { go(n.id); setMobileOpen(false); }} style={{
                    cursor: 'pointer', padding: '14px 12px', borderRadius: 10,
                    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20,
                    textTransform: 'uppercase', letterSpacing: '0.01em',
                    color: active ? 'var(--tc-red)' : 'var(--tc-black)',
                    borderBottom: '1px solid var(--border-1)',
                  }}>{n.label}</a>
                );
              })}
            </nav>
            <button onClick={() => { go('market'); setMobileOpen(false); }} className="btn btn-red" style={{ marginTop: 22, justifyContent: 'center', fontSize: 15, padding: '16px 24px' }}>
              <Icon name="pin" size={16}/> {t('Find a location','اعثر على فرع')}
            </button>
          </div>
        </div>
      )}

      <MarketSwitcher
        open={marketOpen}
        onClose={() => setMarketOpen(false)}
        current={market.name}
        onPick={(m) => { setTweak('market', m.name); setMarketOpen(false); }}
      />
    </>
  );
}

// ============================== FOOTER ==============================
function Footer() {
  const { go, page } = useRoute();
  const t = useT();
  const cols = [
    { title: t('Discover','اكتشف'), links: [
      { l: t('Our story','قصتنا'), id: 'story' }, { l: t('Leadership team','فريق القيادة'), id: 'leadership' },
      { l: t('Community','المجتمع'), id: 'community' }, { l: t('News','الأخبار'), id: 'news' },
    ]},
    { title: t('Our Food','طعامنا'), links: [
      { l: t('Menu','القائمة'), id: 'menu' }, { l: t("What's new",'الجديد'), id: 'news' },
    ]},
    { title: t('Join the Family','انضم للعائلة'), links: [
      { l: t('Franchising','الامتياز'), id: 'franchising' }, { l: t('Careers','الوظائف'), id: 'careers' },
    ]},
    { title: t('Get the Most','استفد أكثر'), links: [
      { l: t('App','التطبيق'), id: 'app' }, { l: t('Rewards','المكافآت'), id: 'app' },
      { l: t('FAQs','الأسئلة الشائعة'), id: 'faqs' },
    ]},
    { title: t('Find Us','جدنا'), links: [
      { l: t('Find your market','اعثر على سوقك'), id: 'market' }, { l: t('Contact us','تواصل معنا'), id: 'contact' },
    ]},
  ];
  return (
    <footer style={{ background: 'var(--tc-black)', color: 'var(--tc-cream-300)', marginTop: 0 }}>
      {/* Right Around The Corner — red street-map band, above footer */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#c8362a' }}>
        <img src="assets/street-map-red.webp" alt="" aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, pointerEvents: 'none' }}/>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(150,30,22,0.55) 0%, rgba(150,30,22,0.15) 45%, transparent 70%)', pointerEvents: 'none' }}></div>

        {/* Pins */}
        <img src="assets/pin-star.png" alt="" aria-hidden="true" className="rac-pin" style={{ top: '20%', right: '24%', animationDelay: '0s' }}/>
        <img src="assets/pin-chili.png" alt="" aria-hidden="true" className="rac-pin" style={{ top: '46%', right: '40%', animationDelay: '0.8s' }}/>
        <img src="assets/pin-chicken.png" alt="" aria-hidden="true" className="rac-pin" style={{ top: '40%', right: '9%', animationDelay: '1.4s' }}/>

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '80px 32px' }}>
          <div style={{ maxWidth: 620 }}>
            <h2 className="mc-head" style={{ fontSize: 'clamp(44px, 6vw, 92px)' }}>
              <span style={{ color: 'var(--tc-cream)', display: 'block' }}>{t('Right Around','قاب قوسين')}</span>
              <span style={{ display: 'inline-block', background: 'var(--tc-yellow)', color: 'var(--tc-black)', padding: '2px 18px', marginTop: 10, transform: 'skewX(-3deg)' }}>
                <span style={{ display: 'inline-block', transform: 'skewX(3deg)' }}>{t('The Corner','من هنا')}</span>
              </span>
            </h2>
            <p style={{ marginTop: 26, fontSize: 17, lineHeight: 1.6, color: 'var(--tc-cream)', maxWidth: 480 }}>
              {t("Whether you're craving bold flavor at home or on the go, Texas Chicken™ is always within reach. Visit your nearest store or get your favorite meals delivered hot and fresh, just the way you like it.",
                 'سواء كنت تشتهي النكهة الجريئة في المنزل أو في الطريق، تكساس تشيكن™ دائمًا في متناول يدك. زُر أقرب فرع أو احصل على وجباتك المفضّلة موصّلة ساخنة وطازجة، تمامًا كما تحب.')}
            </p>
            <button onClick={() => go('market')} className="btn" style={{ marginTop: 28, fontSize: 14, padding: '16px 30px', background: 'var(--tc-cream)', color: 'var(--tc-black)', letterSpacing: '0.08em' }}>
              {t('FIND US','اعثر علينا')}
            </button>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 32px 32px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr repeat(5, 1fr)', gap: 40 }}>
          <div>
            <img src="assets/logo-dual-badge.svg" style={{ height: 80, marginBottom: 20, display: 'block' }} alt="Texas Chicken"/>
            <p style={{ fontSize: 14, lineHeight: 1.55, maxWidth: 320, color: 'var(--tc-cream-300)', margin: '0 0 20px' }}>
              {t('Hand-battered. Made fresh. Since 1952. Operated by independent franchisees across the Middle East, Asia Pacific, and beyond.',
                 'مخفوق يدويًا. طازج. منذ ١٩٥٢. تديره شركات امتياز مستقلة في الشرق الأوسط وآسيا والمحيط الهادئ وما بعدهما.')}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['fb','ig','tt','yt'].map(s => (
                <a key={s} style={{
                  width: 40, height: 40, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(250,246,239,0.08)', cursor: 'pointer',
                  color: 'var(--tc-cream)', transition: 'all 140ms var(--ease-out)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--tc-yellow)'; e.currentTarget.style.color = 'var(--tc-black)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(250,246,239,0.08)'; e.currentTarget.style.color = 'var(--tc-cream)'; }}
                >
                  <Icon name={s} size={18}/>
                </a>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: 'var(--tc-yellow)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(l => (
                  <li key={l.l}>
                    <a onClick={() => go(l.id)} style={{ cursor: 'pointer', fontSize: 14, color: 'var(--tc-cream-300)', transition: 'color 140ms' }}
                       onMouseEnter={e => e.currentTarget.style.color = 'var(--tc-yellow)'}
                       onMouseLeave={e => e.currentTarget.style.color = 'var(--tc-cream-300)'}
                    >{l.l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(250,246,239,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 12, opacity: 0.6 }}>
            {t(`© ${new Date().getFullYear()} Cajun Operating Company. Texas Chicken™ is operated internationally under license. Church's Texas Chicken™ is the US brand.`,
               `© ${new Date().getFullYear()} شركة كاجون للعمليات. تكساس تشيكن™ تُدار دوليًا بموجب ترخيص. تشيرتشز تكساس تشيكن™ هي العلامة الأمريكية.`)}
          </div>
          <div style={{ display: 'flex', gap: 22, fontSize: 12 }}>
            {[[t('Privacy','الخصوصية'),'privacy'],[t('Terms','الشروط'),'terms'],[t('Cookies','الكوكيز'),'privacy']].map(([l,id]) => (
              <a key={l} onClick={() => go(id)} style={{ cursor: 'pointer', opacity: 0.7 }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================== SCROLL / COUNT HELPERS ==============================
// useInView: returns [ref, visible] — visible flips true once the element scrolls into view.
function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } });
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// CountUp: animates a number from 0 to `end` when `visible`. `raw` renders without thousands separators (e.g. years).
function CountUp({ end, visible, raw = false, duration = 1400 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let raf, start;
    const step = (ts) => {
      if (start == null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, end, duration]);
  return <span>{raw ? val : val.toLocaleString()}</span>;
}

// ============================== EXPORTS ==============================
Object.assign(window, {
  RouteCtx, useRoute, Icon, Flag, MARKETS, FLAT_MARKETS,
  Header, Footer, MarketSwitcher,
  useInView, CountUp,
});
