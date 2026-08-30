/* global React */
// Community page — pillar topics with anchored sections

function CommunityPage() {
  const { go } = useRoute();
  const t = useT();
  const [activeSection, setActiveSection] = useState('communities');

  const sections = [
    { id: 'communities', label: t('Communities we serve','مجتمعاتنا') },
    { id: 'sourcing', label: t('Sourcing & suppliers','المصادر والموردون') },
    { id: 'people', label: t('People & inclusion','الناس والشمول') },
    { id: 'sustainability', label: t('Sustainability','الاستدامة') },
  ];

  // Smooth scroll on click
  const scrollTo = (id) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <main className="page" style={{ background: 'var(--tc-cream)' }}>
      {/* Hero */}
      <section style={{ background: 'var(--tc-cream)', padding: '64px 0 0', position: 'relative' }}>
        <div className="container">
          <div className="eyebrow">★ {t('Community','المجتمع')}</div>
          <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 128px)', margin: '12px 0 24px' }}>
            {t('More than','أكثر من')}<br/>
            <span style={{ color: 'var(--tc-red)' }}>{t('just chicken.','مجرد دجاج.')}</span>
          </h1>
          <p style={{ fontSize: 19, color: 'var(--fg-2)', maxWidth: 720, lineHeight: 1.55 }}>
            {t('How we show up for the cities we serve, the people we employ, the suppliers we partner with, and the planet that feeds us.',
               'كيف نقدّم العون للمدن التي نخدمها، والأشخاص الذين نوظفهم، والموردين الذين نشترك معهم، والكوكب الذي يغذّينا.')}
          </p>
        </div>
      </section>

      {/* Section nav (sticky) */}
      <section style={{ background: 'var(--tc-cream)', padding: '40px 0 24px', position: 'sticky', top: 80, zIndex: 20, backdropFilter: 'blur(20px)', backgroundColor: 'rgba(250,246,239,0.94)' }}>
        <div className="container" style={{ display: 'flex', gap: 8, overflowX: 'auto', borderBottom: '1px solid var(--border-1)', paddingBottom: 16 }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)} style={{
              padding: '10px 18px', borderRadius: 999, border: 0,
              background: activeSection === s.id ? 'var(--tc-black)' : 'transparent',
              color: activeSection === s.id ? 'var(--tc-cream)' : 'var(--tc-black)',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
              textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer',
              whiteSpace: 'nowrap', transition: 'all 140ms',
            }}>{s.label}</button>
          ))}
        </div>
      </section>

      {/* 01 — Communities we serve */}
      <section id="section-communities" style={{ background: 'var(--tc-cream)', padding: '96px 0' }}>
        <div className="container">
          <SectionLabel num="01" label={t('Communities we serve','مجتمعاتنا')}/>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginTop: 32 }}>
            <div>
              <h2 className="display-2" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '0 0 20px' }}>
                {t('Local restaurants.','مطاعم محلية.')} <span style={{ color: 'var(--tc-red)' }}>{t('Local impact.','أثر محلي.')}</span>
              </h2>
              <p style={{ fontSize: 17, color: 'var(--fg-2)', lineHeight: 1.6, margin: '0 0 16px' }}>
                {t("Every Texas Chicken restaurant is operated by a local franchisee — someone who lives in the city, hires from the city, and gives back to the city. That's been true since 1952.",
                   'كل فرع من تكساس تشيكن يديره صاحب امتياز محلي — شخص يعيش في المدينة، ويوظّف من المدينة، ويردّ للمدينة. هذا ثابت منذ عام ١٩٥٢.')}
              </p>
              <p style={{ fontSize: 17, color: 'var(--fg-2)', lineHeight: 1.6, margin: 0 }}>
                {t('Across our markets, restaurants partner with food banks, sponsor local schools, and run hot-meal programmes during Ramadan and the holiday season.',
                   'في جميع أسواقنا، تتعاون المطاعم مع بنوك الطعام، وترعى المدارس المحلية، وتدير برامج وجبات ساخنة خلال رمضان وموسم الأعياد.')}
              </p>
            </div>
            <CommunityStats t={t}/>
          </div>
        </div>
      </section>

      {/* 02 — Sourcing & suppliers */}
      <section id="section-sourcing" style={{ background: 'var(--tc-black)', color: 'var(--tc-cream)', padding: '96px 0' }}>
        <div className="container">
          <SectionLabel num="02" label={t('Sourcing & suppliers','المصادر والموردون')} onDark/>
          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }}>
            <div>
              <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '0 0 20px', color: 'var(--tc-cream)' }}>
                {t('Sourced close.','مورّد محليًا.')}<br/>
                <span style={{ color: 'var(--tc-yellow)' }}>{t('Battered fresh.','مخفوق طازجًا.')}</span>
              </h2>
              <p style={{ fontSize: 17, color: 'rgba(250,246,239,0.85)', lineHeight: 1.6, margin: 0 }}>
                {t('Our chicken is sourced as locally as our supply chain allows — region by region, country by country — and every piece is battered by hand inside the restaurant where you eat it. No factory-coated supply. No partially cooked chicken finished in the fryer. Just chicken, our spice blend, and a hand.',
                   'دجاجنا مصدره محلي قدر الإمكان — منطقة بعد منطقة، ودولة بعد دولة — وكل قطعة تُخفق يدويًا داخل المطعم الذي تأكل فيه. لا دجاج مغلّف في المصنع. لا دجاج نصف مطهي. فقط دجاج، وخلطتنا، ويد.')}
              </p>
            </div>
            <div style={{ background: 'rgba(250,246,239,0.04)', borderRadius: 'var(--radius-xl)', padding: 32, border: '1px solid rgba(250,246,239,0.1)' }}>
              <div className="eyebrow on-dark" style={{ marginBottom: 16 }}>{t('Our sourcing standards','معايير التوريد')}</div>
              {[
                t('Antibiotic-free poultry in 14 markets','دواجن خالية من المضادات الحيوية في ١٤ سوقًا'),
                t('No partially cooked / pre-fried supply','لا دجاج نصف مطهي / مقلي مسبقًا'),
                t('Local & regional supplier networks','شبكات موردين محليون وإقليميون'),
                t('Halal certified across MENA & SEA','حلال معتمد في الشرق الأوسط وجنوب شرق آسيا'),
              ].map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(250,246,239,0.08)' }}>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--tc-yellow)', color: 'var(--tc-black)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="check" size={16} stroke={2.5}/>
                  </span>
                  <span style={{ fontSize: 15, color: 'var(--tc-cream)' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — People & inclusion */}
      <section id="section-people" style={{ background: 'var(--tc-cream)', padding: '96px 0' }}>
        <div className="container">
          <SectionLabel num="03" label={t('People & inclusion','الناس والشمول')}/>
          <h2 className="display-2" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '32px 0 16px', maxWidth: 720 }}>
            {t('25,000 people, 23 countries,','٢٥،٠٠٠ شخص، في ٢٣ دولة،')} <span style={{ color: 'var(--tc-red)' }}>{t('one family.','عائلة واحدة.')}</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--fg-2)', maxWidth: 720, lineHeight: 1.55, marginBottom: 48 }}>
            {t("From the team member battering chicken at 6am to the regional president, we're building a workplace where Texas Chicken is somewhere people grow careers — not just collect paychecks.",
               'من عضو الفريق الذي يخفق الدجاج في السادسة صباحًا إلى رئيس المنطقة، نبني بيئة عمل تكون فيها تكساس تشيكن مكانًا ينمو فيه الناس وظيفيًا — لا مجرد مصدر رواتب.')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { t: t('Career path','مسار وظيفي'), d: t('Over 64% of our restaurant managers started as team members. 28 of our 80 corporate leaders started in restaurants.','أكثر من ٤٤٪ من مدراء مطاعمنا بدأوا كأعضاء في الفريق. و٢٨ من أصل ٨٠ قائدًا في الشركة بدأوا في المطاعم.'), tag: t('Growth','نمو') },
              { t: t('Women in leadership','المرأة في القيادة'), d: t("42% of our regional leadership team are women. We're committed to parity at every level by 2028.",'٤٢٪ من فريق القيادة الإقليمي من النساء. ونحن ملتزمون بالمساواة في كل مستوى بحلول عام ٢٠٢٨.'), tag: t('Inclusion','شمول') },
              { t: t('Living wages','أجور عادلة'), d: t('Every Texas Chicken restaurant — corporate or franchised — commits to local living-wage standards as part of our brand licence.','كل فرع من تكساس تشيكن — سواء تابع للشركة أو امتياز — يلتزم بمعايير الأجر العادل المحلية كجزء من ترخيص العلامة.'), tag: t('Fair pay','أجر عادل') },
            ].map(c => (
              <article key={c.t} style={{
                background: 'var(--tc-paper)', borderRadius: 'var(--radius-xl)', padding: 32,
                boxShadow: 'var(--inset-hair), var(--shadow-1)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                minHeight: 280,
              }}>
                <span className="chip" style={{ background: 'var(--tc-red)', color: 'var(--tc-cream)', alignSelf: 'flex-start' }}>★ {c.tag}</span>
                <div>
                  <h3 className="display-2" style={{ fontSize: 26, margin: '0 0 12px' }}>{c.t}</h3>
                  <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.55, margin: 0 }}>{c.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Sustainability */}
      <section id="section-sustainability" style={{ background: 'var(--tc-yellow)', padding: '96px 0' }}>
        <div className="container">
          <SectionLabel num="04" label={t('Sustainability','الاستدامة')}/>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', marginTop: 32 }}>
            <div>
              <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', margin: '0 0 20px' }}>
                {t('Texas-sized goals.','أهداف بحجم تكساس.')}<br/>
                <span style={{ color: 'var(--tc-red)' }}>{t('Honest progress.','تقدّم صادق.')}</span>
              </h2>
              <p style={{ fontSize: 17, color: 'var(--tc-black)', lineHeight: 1.6, margin: 0 }}>
                {t("We don't pretend QSR is a low-impact business. We do believe in publishing measurable goals, and the honest progress against them. Our 2030 commitments cover packaging, energy, food waste, and supply chain emissions.",
                   'لا ندّعي أن الوجبات السريعة عمل منخفض الأثر. لكننا نؤمن بنشر أهداف قابلة للقياس، والتقدّم الصادق نحوها. التزامات 2030 تغطّي التغليف، والطاقة، وهدر الطعام، وانبعاثات سلسلة الإمداد.')}
              </p>
              <button onClick={() => go('news')} className="btn btn-black" style={{ marginTop: 32 }}>
                {t('Read 2030 commitments','اقرأ التزامات ٢٠٣٠')} <Icon name="arrowR" size={16}/>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { t: t('100% recyclable packaging','تغليف قابل للتدوير ١٠٠٪'), d: t('Across MENA & SEA by 2028','في الشرق الأوسط وجنوب شرق آسيا بحلول ٢٠٢٨'), pct: 78 },
                { t: t('Net-zero restaurant operations','عمليات مطاعم خالية من الانبعاثات'), d: t('2,400 restaurants on renewable energy by 2030','٢،٤٠٠ مطعم يعمل بالطاقة المتجدّدة بحلول ٢٠٣٠'), pct: 41 },
                { t: t('Food waste reduction','تقليل هدر الطعام'), d: t('Cut food waste 50% from 2022 baseline','تقليل هدر الطعام ٥٠٪ من خط أساس ٢٠٢٢'), pct: 33 },
              ].map(g => (
                <div key={g.t} style={{ background: 'var(--tc-paper)', borderRadius: 'var(--radius-lg)', padding: 24, boxShadow: 'var(--inset-hair)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, textTransform: 'uppercase' }}>{g.t}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, color: 'var(--tc-red)' }}>{g.pct}%</div>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 12 }}>{g.d}</div>
                  <div style={{ height: 8, background: 'var(--tc-cream-300)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${g.pct}%`, background: 'var(--tc-red)', borderRadius: 999, transition: 'width 600ms var(--ease-out)' }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CommunityStats({ t }) {
  const [ref, visible] = useInView(0.25);
  const stats = [
    { n: 380, suffix: 'k+',  l: t('Hot meals donated\nduring Ramadan 2025','وجبة ساخنة تبرّعنا بها\nخلال رمضان ٢٠٢٥') },
    { n: 180, suffix: '+',   l: t('School partnerships\nacross 23 markets','شراكة مدرسية\nفي ٢٣ سوقًا') },
    { n: 2.4, prefix: '$', suffix: 'M', l: t('Raised for local food\nbanks last year','تم جمعها لبنوك الطعام\nالمحلية العام الماضي') },
    { n: 25,  suffix: 'k+',  l: t('Team members\nemployed globally','عضو في الفريق\nحول العالم') },
  ];
  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      {stats.map((s, i) => (
        <div key={s.l} style={{
          background: 'var(--tc-paper)', borderRadius: 'var(--radius-lg)', padding: 24,
          boxShadow: 'var(--inset-hair)',
          transition: 'all 220ms var(--ease-out)',
          animation: visible ? `fadeUp 600ms ${i * 100}ms var(--ease-out) both` : 'none',
          opacity: visible ? 1 : 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--inset-hair), var(--shadow-2)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--inset-hair)'; }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 1, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 48, color: 'var(--tc-red)', lineHeight: 1, letterSpacing: '-0.02em' }}>
            {s.prefix && <span>{s.prefix}</span>}
            <CountUp end={s.n} visible={visible}/>
            {s.suffix && <span>{s.suffix}</span>}
          </div>
          <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 8, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

function SectionLabel({ num, label, onDark }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 14,
        letterSpacing: '0.08em', color: onDark ? 'var(--tc-yellow)' : 'var(--tc-red)',
      }}>{num} · {label.toUpperCase()}</div>
      <div style={{ flex: 1, height: 1, background: onDark ? 'rgba(250,246,239,0.2)' : 'var(--border-2)' }}/>
    </div>
  );
}

Object.assign(window, { CommunityPage });
