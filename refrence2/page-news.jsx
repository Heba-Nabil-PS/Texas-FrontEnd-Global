/* global React */
// News — filterable feed (press releases + brand stories)

// ==================== BorderGlow (React Bits, adapted) ====================
function bgParseHSL(hslStr) {
  const m = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!m) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(m[1]), s: parseFloat(m[2]), l: parseFloat(m[3]) };
}
function bgBuildGlowVars(glowColor, intensity) {
  const { h, s, l } = bgParseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const op = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  const vars = {};
  for (let i = 0; i < op.length; i++) vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(op[i] * intensity, 100)}%)`;
  return vars;
}
const BG_POS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const BG_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const BG_MAP = [0, 1, 2, 0, 1, 2, 1];
function bgBuildGradientVars(colors) {
  const vars = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(BG_MAP[i], colors.length - 1)];
    vars[BG_KEYS[i]] = `radial-gradient(at ${BG_POS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function BorderGlow({
  children, className = '', onClick,
  edgeSensitivity = 30, glowColor = '40 80 80', backgroundColor = '#120F17',
  borderRadius = 28, glowRadius = 40, glowIntensity = 1.0, coneSpread = 25,
  colors = ['#c084fc', '#f472b6', '#38bdf8'], fillOpacity = 0.5,
}) {
  const cardRef = React.useRef(null);

  const handlePointerMove = React.useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const dx = x - cx, dy = y - cy;
    let kx = Infinity, ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    let angle = 0;
    if (dx !== 0 || dy !== 0) {
      angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
    }
    card.style.setProperty('--edge-proximity', (edge * 100).toFixed(3));
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
  }, []);

  const glowVars = bgBuildGlowVars(glowColor, glowIntensity);
  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onClick={onClick}
      className={`border-glow-card ${className}`}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...glowVars,
        ...bgBuildGradientVars(colors),
      }}
    >
      <span className="edge-light"></span>
      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  );
}

const NEWS = [
  {
    id: 1, img: 'assets/news/news-1.jpg', type: 'press', tag: 'Award',
    title: "Texas Chicken™ Franchisee for Malaysia, Dato' Jaya Tan, Named IFA Franchisee of the Year",
    kicker: 'Franchisee recognized alongside other industry standouts for accomplishments made throughout the year.',
    date: 'Mar 1, 2023', read: '4 min read',
    cover: 'linear-gradient(145deg, #f6c63a 0%, #c47a00 100%)', dark: false,
  },
  {
    id: 2, img: 'assets/news/news-2.jpg', type: 'press', tag: 'Growth · 2023',
    title: "Church's Texas Chicken® and Texas Chicken™ Reflect on a Successful 2022 as They Look Toward Continued Growth in 2023",
    kicker: 'From extensive international expansion to milestone celebrations, the brands close out a record-breaking year with 75 new international restaurant openings.',
    date: 'Jan 30, 2023', read: '6 min read',
    cover: 'linear-gradient(145deg, #9a3324 0%, #5a1e14 100%)', dark: true,
  },
  {
    id: 3, img: 'assets/news/news-3.jpg', type: 'press', tag: 'Franchise Times Top 500',
    title: "Church's Texas Chicken® Ranks in the Franchise Times Top 500 Among the Largest U.S. Based Franchise Systems",
    kicker: 'Landing in the top 100 of the Franchise Times Top 500 is a tremendous accomplishment for our brand and speaks to the success of our continued growth trajectory.',
    date: 'Nov 14, 2022', read: '4 min read',
    cover: 'linear-gradient(145deg, #2d2a26 0%, #5a544c 100%)', dark: true,
  },
  {
    id: 4, img: 'assets/news/news-4.jpg', type: 'press', tag: 'International expansion',
    title: "Texas Chicken's New Restaurant Design Propels International Expansion",
    kicker: 'Development of 20 new restaurants in New Zealand.',
    date: 'Oct 27, 2022', read: '5 min read',
    cover: 'linear-gradient(145deg, #c4604f 0%, #9a3324 100%)', dark: true,
  },
  {
    id: 5, img: 'assets/news/news-5.jpg', type: 'press', tag: 'New Zealand',
    title: 'Texas Chicken™ Signs Expansion Agreement with New Zealand Franchisee as Part of Continued International Growth',
    kicker: 'Good Taste Co Pty Limited to open 20 additional restaurants starting in 2023.',
    date: 'Aug 22, 2022', read: '4 min read',
    cover: 'linear-gradient(145deg, #1e5fa8 0%, #0f2d52 100%)', dark: true,
  },
  {
    id: 6, img: 'assets/news/news-6.jpg', type: 'brand', tag: 'Brand story',
    title: 'Take Me To Church',
    kicker: "Church's Texas Chicken is the international sister brand of Church's Chicken and is named to convey the global brand's Texas origins.",
    date: 'Aug 7, 2022', read: '5 min read',
    cover: 'linear-gradient(145deg, #f5b51e 0%, #e0a30c 100%)', dark: false,
  },
  {
    id: 7, img: 'assets/news/news-7.jpg', type: 'press', tag: 'Canada',
    title: "Church's Texas Chicken™ Has Bold Plans For Canada",
    kicker: "The often-used term \"everything is bigger in Texas\" is a perfect way to frame the brand Church's Texas Chicken™ is looking to build in Canada.",
    date: 'Jun 22, 2022', read: '4 min read',
    cover: 'linear-gradient(145deg, #d52b1e 0%, #7a1612 100%)', dark: true,
  },
  {
    id: 8, img: 'assets/news/news-8.jpg', type: 'press', tag: 'Award',
    title: 'Texas Chicken™ Malaysia Earns Silver Putra Brand Award for Second Consecutive Year',
    kicker: 'Fast-growing brand proudly recognized by consumers for unending, high-quality service.',
    date: 'Mar 30, 2022', read: '3 min read',
    cover: 'linear-gradient(145deg, #c0c0c0 0%, #4a4a4a 100%)', dark: true,
  },
  {
    id: 9, img: 'assets/news/news-9.jpg', type: 'brand', tag: 'Brand story',
    title: "Take Me To Church — Church's Chicken™ Is Taking Canada By Storm",
    kicker: 'In 1952, George Church opened his first takeout restaurant across from the Alamo, in San Antonio, Texas. Since then, the brand has expanded domestically throughout the U.S. before coming to Canada.',
    date: 'Mar 28, 2022', read: '6 min read',
    cover: 'linear-gradient(145deg, #e15f02 0%, #9a3324 100%)', dark: true,
  },
  {
    id: 10, img: 'assets/news/news-10.jpg', type: 'press', tag: 'Malaysia',
    title: 'Envictus International Holdings Ltd Renews Its Franchise Rights to Develop and Operate Texas Chicken™ Malaysia',
    kicker: 'The Envictus group was first awarded the franchise rights for the well-known QSR chain in July 2012, and launched the first Texas Chicken™ restaurant in Malaysia in January 2013.',
    date: 'Mar 5, 2022', read: '4 min read',
    cover: 'linear-gradient(145deg, #2d2a26 0%, #1a1815 100%)', dark: true,
  },
  {
    id: 11, img: 'assets/news/news-11.jpg', type: 'press', tag: 'Global expansion · 2022',
    title: "Texas Chicken™ and Church's Texas Chicken™ Step Up Global Expansion in 2022 with an Estimated 100 New Restaurants",
    kicker: 'Throughout the Americas, the Middle East and Asia. Company taps QSR sector veteran Ignacio Barbadillo who joins as Director of International New Business Development.',
    date: 'Feb 28, 2022', read: '5 min read',
    cover: 'linear-gradient(145deg, #f5b51e 0%, #9a3324 100%)', dark: true,
  },
  {
    id: 12, img: 'assets/news/news-12.jpg', type: 'press', tag: 'Cambodia',
    title: 'Texas Chicken™ Welcomes Fifth New Restaurant in Cambodia',
    kicker: 'Phnom Penh, Cambodia — Texas Chicken™, one of the largest quick-service restaurant chicken chains globally, celebrates its fifth restaurant opening in the country.',
    date: 'Nov 9, 2021', read: '3 min read',
    cover: 'linear-gradient(145deg, #002b7f 0%, #ce1126 100%)', dark: true,
  },
  {
    id: 13, img: 'assets/news/news-13.jpg', type: 'press', tag: 'Canada',
    title: "Church's Texas Chicken™ Continuing Long-Standing Commitment in Canada, Plans to Open 40 More Restaurants in 2022",
    kicker: "Atlanta, GA — Church's Texas Chicken™, one of the largest quick-service restaurant chicken chains in the world, announces 40 more Canadian locations.",
    date: 'Nov 3, 2021', read: '4 min read',
    cover: 'linear-gradient(145deg, #d52b1e 0%, #5a1e14 100%)', dark: true,
  },
  {
    id: 14, img: 'assets/news/news-14.jpg', type: 'press', tag: 'Mexico · Milestone',
    title: "Church's Texas Chicken™ Opens Its 100th Restaurant in Mexico",
    kicker: "Campeche, Mexico — Church's Texas Chicken™ and franchise partner Grupo GES recently opened their latest restaurant in Ciudad del Carmen Campeche, marking the 100th location in Mexico.",
    date: 'Jul 21, 2021', read: '3 min read',
    cover: 'linear-gradient(145deg, #006847 0%, #ce1126 100%)', dark: true,
  },
];

function NewsPage() {
  const { go } = useRoute();
  const t = useT();
  const [filter, setFilter] = useState('all');
  const [openArticle, setOpenArticle] = useState(null);

  // Tag translations
  const TAG_AR = {
    'Award': 'جائزة',
    'Growth · 2023': 'نمو · ٢٠٢٣',
    'Franchise Times Top 500': 'أفضل ٥٠٠ في Franchise Times',
    'International expansion': 'توسّع دولي',
    'New Zealand': 'نيوزيلندا',
    'Brand story': 'قصّة العلامة',
    'Canada': 'كندا',
    'Malaysia': 'ماليزيا',
    'Global expansion · 2022': 'توسّع عالمي · ٢٠٢٢',
    'Cambodia': 'كمبوديا',
    'Mexico · Milestone': 'المكسيك · إنجاز',
  };
  const tagLabel = (tag) => t(tag, TAG_AR[tag] || tag);

  const filtered = useMemo(() => {
    if (filter === 'all') return NEWS;
    return NEWS.filter(n => n.type === filter);
  }, [filter]);

  if (openArticle) {
    const idx = NEWS.findIndex(n => n.id === openArticle);
    const a = NEWS[idx];
    const prev = idx > 0 ? NEWS[idx - 1] : null;
    const next = idx < NEWS.length - 1 ? NEWS[idx + 1] : null;
    return <ArticleDetail article={a} prev={prev} next={next} onNav={setOpenArticle} onBack={() => setOpenArticle(null)}/>;
  }

  return (
    <main className="page" style={{ background: 'var(--tc-cream)' }}>
      <section style={{ background: 'var(--tc-cream)', padding: '64px 0 32px' }}>
        <div className="container">
          <div className="eyebrow">★ {t('News & stories','الأخبار والقصص')}</div>
          <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: '12px 0 0' }}>
            {t('Fresh from','طازج من')}<br/>{t('the kitchen.','المطبخ.')}
          </h1>
        </div>
      </section>

      <section style={{ background: 'var(--tc-cream)', padding: '24px 0 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, padding: 4, background: 'var(--tc-paper)', borderRadius: 999, boxShadow: 'var(--inset-hair)', display: 'inline-flex' }}>
            {[['all',t('All','الكل')],['brand',t('Brand stories','قصص العلامة')],['press',t('Press releases','بيانات صحفية')]].map(([k,l]) => (
              <button key={k} onClick={() => setFilter(k)} style={{
                padding: '10px 20px', borderRadius: 999, border: 0,
                background: filter === k ? 'var(--tc-black)' : 'transparent',
                color: filter === k ? 'var(--tc-cream)' : 'var(--tc-black)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
                textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer',
                transition: 'all 140ms',
              }}>{l}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '40px 0 96px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {filtered.map(n => (
              <BorderGlow
                key={n.id}
                onClick={() => setOpenArticle(n.id)}
                backgroundColor="var(--tc-paper)"
                glowColor="42 96 55"
                borderRadius={16}
                glowRadius={26}
                glowIntensity={1.15}
                coneSpread={22}
                edgeSensitivity={26}
                colors={['#f5b51e', '#d52b1e', '#f6c63a']}
              >
                <article style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                <div style={{ aspectRatio: '16/10', background: n.cover, position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={n.img}
                    alt={n.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute', top: 16, left: 16, zIndex: 1,
                    background: n.dark ? 'var(--tc-cream)' : 'var(--tc-black)',
                    color: n.dark ? 'var(--tc-black)' : 'var(--tc-cream)',
                    padding: '6px 12px', borderRadius: 999,
                    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11,
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>★ {tagLabel(n.tag)}</span>
                </div>
                <div style={{ padding: '22px 24px 26px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, textTransform: 'uppercase', lineHeight: 1.05, margin: '0 0 10px', letterSpacing: '-0.01em' }}>{n.title}</h3>
                  <p style={{ color: 'var(--fg-3)', fontSize: 14, lineHeight: 1.5, margin: '0 0 16px' }}>{n.kicker}</p>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: 'var(--fg-4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{n.date} · {n.read}</div>
                </div>
                </article>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--tc-yellow)', padding: '56px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--tc-red)' }}>★ {t('Media inquiries','استفسارات إعلامية')}</div>
            <h3 className="display-2" style={{ fontSize: 32, margin: '6px 0 0' }}>{t('Working on a story?','تعمل على قصّة؟')}</h3>
          </div>
          <button onClick={() => go('contact')} className="btn btn-black">{t('Contact press team','تواصل مع فريق الصحافة')} <Icon name="arrowR" size={16}/></button>
        </div>
      </section>
    </main>
  );
}

function ArticleDetail({ article, prev, next, onNav, onBack }) {
  const t = useT();
  const TAG_AR = {
    'Award': 'جائزة', 'Growth · 2023': 'نمو · ٢٠٢٣', 'Franchise Times Top 500': 'أفضل ٥٠٠ في Franchise Times',
    'International expansion': 'توسّع دولي', 'New Zealand': 'نيوزيلندا', 'Brand story': 'قصّة العلامة',
    'Canada': 'كندا', 'Malaysia': 'ماليزيا', 'Global expansion · 2022': 'توسّع عالمي · ٢٠٢٢',
    'Cambodia': 'كمبوديا', 'Mexico · Milestone': 'المكسيك · إنجاز',
  };
  const tagLabel = (tag) => t(tag, TAG_AR[tag] || tag);
  // Scroll to top on article change
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [article.id]);
  return (
    <main className="page" style={{ background: 'var(--tc-cream)' }}>
      <section style={{ background: article.cover, color: article.dark ? 'var(--tc-cream)' : 'var(--tc-black)', padding: '64px 0 96px', position: 'relative', overflow: 'hidden' }}>
        <img src={article.img} alt={article.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.32 }}/>
        <div style={{ position: 'absolute', inset: 0, background: article.dark ? 'linear-gradient(180deg, rgba(20,14,12,0.4), rgba(20,14,12,0.82))' : 'linear-gradient(180deg, rgba(255,253,247,0.5), rgba(255,253,247,0.86))', pointerEvents: 'none' }}/>
        <span className="star" style={{ position: 'absolute', top: '5%', right: '-5%', width: 320, height: 320, color: 'rgba(255,255,255,0.12)' }}></span>
        <div className="container" style={{ position: 'relative', maxWidth: 880, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          <a onClick={onBack} style={{ cursor: 'pointer', display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 6, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 40 }}>
            <Icon name="chevL" size={14}/> {t('All news','كل الأخبار')}
          </a>
          <div style={{ height: 0 }}/>
          <span className="chip" style={{ background: article.dark ? 'var(--tc-cream)' : 'var(--tc-black)', color: article.dark ? 'var(--tc-black)' : 'var(--tc-cream)', alignSelf: 'flex-start' }}>★ {tagLabel(article.tag)}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(40px, 6vw, 80px)', textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: '-0.015em', margin: '16px 0 24px' }}>{article.title}</h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, opacity: 0.9, maxWidth: 720 }}>{article.kicker}</p>
          <div style={{ marginTop: 28, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.75 }}>{article.date} · {article.read}</div>
        </div>
      </section>

      <section style={{ background: 'var(--tc-cream)', padding: '64px 0 96px' }}>
        <div className="container" style={{ maxWidth: 720, margin: '0 auto', fontSize: 17, lineHeight: 1.7, color: 'var(--fg-2)' }}>
          <p>{t('This is a preview of the news article template. In production, this is where the full article body lives — with headers, pull quotes, images, and embedded video.',
                'هذه معاينة لقالب المقال. في الإصدار النهائي، يظهر هنا متن المقال الكامل — مع عناوين، اقتباسات بارزة، صور، وفيديو مضمَّن.')}</p>
          <p>{t('Each article supports both press-release formatting (boilerplate, contact info, quote blocks) and consumer-facing brand story formatting (long-form, image-rich, scrollable).',
                'يدعم كل مقال تنسيق البيانات الصحفية (نص قياسي، معلومات الاتصال، اقتباسات) وتنسيق قصص العلامة الموجَّهة للمستهلك (مقالات طويلة، غنية بالصور، قابلة للتمرير).')}</p>
          <blockquote style={{ margin: '32px 0', padding: '24px 32px', borderLeft: '4px solid var(--tc-red)', background: 'var(--tc-paper)', borderRadius: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--tc-black)' }}>
            {t("\"We don't pretend QSR is a low-impact business. We do believe in publishing measurable goals, and the honest progress against them.\"",
               '«لا نَدَّعي أن قطاع الوجبات السريعة منخفض الأثر. لكننا نؤمن بنشر أهداف قابلة للقياس، والتقدّم الصادق نحوها.»')}
          </blockquote>
          <p>{t('The brand-stories track surfaces inside the consumer-facing feed; the press-releases track also appears on the dedicated press page, with downloadable assets and a media-contact CTA.',
                'مسار قصص العلامة يظهر داخل الخلاصة الموجَّهة للمستهلك؛ كما يظهر مسار البيانات الصحفية في صفحة الصحافة المخصَّصة مع ملفات قابلة للتنزيل ودعوة للتواصل الإعلامي.')}</p>
        </div>
      </section>

      {/* Prev / Next nav */}
      <section style={{ background: 'var(--tc-cream-200)', padding: '64px 0 32px', borderTop: '1px solid var(--border-1)' }}>
        <div className="container" style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {prev ? (
              <button onClick={() => onNav(prev.id)} style={{
                background: prev.cover, color: prev.dark ? 'var(--tc-cream)' : 'var(--tc-black)',
                borderRadius: 'var(--radius-xl)', padding: 24, textAlign: 'left',
                border: 0, cursor: 'pointer', transition: 'all 220ms var(--ease-out)',
                boxShadow: 'var(--shadow-1)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16,
                minHeight: 140, position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-1)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.85 }}>
                  <Icon name="chevL" size={14}/> {t('Previous','السابق')}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18, textTransform: 'uppercase', lineHeight: 1.15, letterSpacing: '-0.01em' }}>{prev.title}</div>
              </button>
            ) : <div/>}

            {next ? (
              <button onClick={() => onNav(next.id)} style={{
                background: next.cover, color: next.dark ? 'var(--tc-cream)' : 'var(--tc-black)',
                borderRadius: 'var(--radius-xl)', padding: 24, textAlign: 'right',
                border: 0, cursor: 'pointer', transition: 'all 220ms var(--ease-out)',
                boxShadow: 'var(--shadow-1)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16,
                minHeight: 140, position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-1)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.85 }}>
                  {t('Next','التالي')} <Icon name="chevR" size={14}/>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18, textTransform: 'uppercase', lineHeight: 1.15, letterSpacing: '-0.01em' }}>{next.title}</div>
              </button>
            ) : <div/>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
            <button onClick={onBack} className="btn btn-ghost">
              <Icon name="chevL" size={16}/> {t('Back to all news','عُد إلى كل الأخبار')}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { NewsPage });
