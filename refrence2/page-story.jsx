/* global React */
// Our Story + Leadership

function StoryPage() {
  const { go } = useRoute();
  const t = useT();

  const values = [
    {
      key: 'pushing',
      title: t('Pushing boundaries', 'تجاوز الحدود'),
      tagline: t('We rule the roost.', 'نحن أسياد المطبخ.'),
      body: t(
        'The only boundaries we have are those we create ourselves. Our people fearlessly and energetically raise the bar — in everything we do. We creatively seek uniqueness in a demanding, competitive space. We challenge each other into a new frontier of innovation.',
        'الحدود الوحيدة هي تلك التي نضعها لأنفسنا. فريقنا يرفع المستوى بلا خوف وبكل حماس في كل ما نقوم به. نسعى بإبداع إلى التميّز في سوق تنافسي صعب، ونتحدّى بعضنا البعض نحو آفاق جديدة من الابتكار.'
      ),
      icon: '🚀',
      color: 'var(--tc-red)',
    },
    {
      key: 'simplicity',
      title: t('The power of simplicity', 'قوة البساطة'),
      tagline: t("Straightforward. Done right.", 'بساطة. وإتقان.'),
      body: t(
        'We know our guests\' lives can be busy — and we can help. We provide honest, hand-made chicken meals from a straightforward menu to satisfy every appetite. We don\'t overcomplicate what\'s simply perfect.',
        'نعلم أن حياة ضيوفنا مزدحمة — ونحن هنا للمساعدة. نقدّم وجبات دجاج صادقة، مخفوقة يدويًا، من قائمة بسيطة ترضي كل ذوق. لا نُعقّد ما هو مثالي ببساطته.'
      ),
      icon: '⚡',
      color: 'var(--tc-yellow)',
    },
    {
      key: 'refusing',
      title: t('Refusing to compromise', 'لا نتنازل'),
      tagline: t('Real food. Real conviction.', 'طعام حقيقي. قناعة حقيقية.'),
      body: t(
        'Relentless pursuit of perfection takes hard work. It means never taking the easy route, never cutting corners. We double down on consistency, on quality, on flavor — real food that tastes real good, made with real conviction. Each of us — frontline to franchisee — hold each other accountable every day.',
        'السعي الدؤوب نحو الكمال يتطلّب عملاً جادًا. لا طرق سهلة ولا اختصارات. نضاعف تركيزنا على الثبات والجودة والنكهة — طعام حقيقي بمذاق رائع وقناعة صادقة. كل فرد منا، من الخط الأمامي إلى صاحب الامتياز، يحاسب الآخر كل يوم.'
      ),
      icon: '🔥',
      color: 'var(--tc-orange)',
    },
    {
      key: 'heritage',
      title: t('Honoring our heritage', 'نُكرّم تراثنا'),
      tagline: t('We don\'t mess with perfection.', 'لا نعبث بما هو كامل.'),
      body: t(
        'We celebrate where we come from by not messing with perfection. We connect the taste of Texas with the globe. Our people encourage sharing of moments, experiences, and really good food. We bring crafted, wholesome, perfect-flavored chicken family meals for any type of family — and the communities we serve.',
        'نحتفي بأصولنا بعدم العبث بما هو كامل. نربط مذاق تكساس بالعالم. يشجّع فريقنا على مشاركة اللحظات والتجارب والطعام الجيد حقًا. نقدّم وجبات دجاج عائلية مصنوعة بإتقان لكل عائلة — ولكل مجتمع نخدمه.'
      ),
      icon: '⭐',
      color: 'var(--tc-red)',
    },
  ];

  return (
    <main className="page" style={{ background: 'var(--tc-cream)' }}>
      {/* Hero */}
      <section style={{ background: 'var(--tc-red)', color: 'var(--tc-cream)', padding: '80px 0 96px', position: 'relative', overflow: 'hidden' }}>
        <span className="star" style={{ position: 'absolute', top: '-10%', right: '-8%', width: 480, height: 480, color: 'rgba(245,181,30,0.12)' }}></span>
        <div className="container" style={{ position: 'relative' }}>
          <div className="eyebrow on-dark">★ {t('Our Story','قصتنا')}</div>
          <h1 className="display" style={{ fontSize: 'clamp(48px, 7vw, 112px)', margin: '12px 0 24px', color: 'var(--tc-cream)', lineHeight: 0.92 }}>
            {t('Serving really good chicken','نقدّم دجاجًا رائعًا حقًا')}<br/>
            {t('to those who','لمن')}<br/>
            <span style={{ color: 'var(--tc-yellow)' }}>{t('enjoy really good chicken.','يستمتعون بدجاج رائع حقًا.')}</span>
          </h1>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--tc-yellow)', marginTop: 8 }}>
            ★ {t('The Texas way.','بطريقة تكساس.')}
          </div>
          <p style={{ fontSize: 19, lineHeight: 1.55, maxWidth: 680, opacity: 0.92, marginTop: 32 }}>
            {t(
              'We deliver authentic traditions, bold tastes and straightforward, consistent food you can trust. We\'re more than fresh-fried chicken. We\'re the rugged territory forged by sun and terrain. The crisp, satisfying bite of a meal earned through hard work. The feeling of community that comes through shared moments and simple pleasures.',
              'نقدّم تقاليد أصيلة، ونكهات جريئة، وطعامًا بسيطًا وثابتًا يمكن الوثوق به. نحن أكثر من مجرد دجاج طازج مقلي. نحن الأرض الوعرة التي صاغتها الشمس والتضاريس. القضمة المُرضية لوجبة كُسبت بعرق الجبين. شعور المجتمع الذي يأتي من اللحظات المشتركة والمتع البسيطة.'
            )}
          </p>
        </div>
      </section>

      {/* Taste of Texas band */}
      <section style={{ background: 'var(--tc-yellow)', color: 'var(--tc-black)', overflow: 'hidden', padding: '20px 0' }}>
        <div className="marquee" style={{ whiteSpace: 'nowrap', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 44, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
          {Array.from({length: 5}).map((_, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
              {t('Real but not boring','حقيقي وليس مُمل')} <span className="star" style={{ width: 30, height: 30, color: 'var(--tc-red)' }}></span>
              {t('Simple but not basic','بسيط وليس عاديًا')} <span className="star" style={{ width: 30, height: 30, color: 'var(--tc-red)' }}></span>
              {t('Familiar but always surprising','مألوف لكنه دائمًا مُفاجئ')} <span className="star" style={{ width: 30, height: 30, color: 'var(--tc-red)' }}></span>
            </span>
          ))}
        </div>
      </section>

      {/* The taste of Texas */}
      <section style={{ background: 'var(--tc-cream)', padding: '96px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 'var(--radius-2xl)', overflow: 'hidden',
            background: 'linear-gradient(160deg, #c4604f 0%, #9a3324 60%, #5a1e14 100%)',
            boxShadow: 'var(--shadow-pop)',
          }}>
            <image-slot id="story-taste-texas" shape="rounded" data-on-dark="" placeholder="Drop a Texas landscape or chicken image"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}></image-slot>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)',
            }}/>
            <div style={{ position: 'absolute', bottom: 28, left: 28, right: 28, color: 'var(--tc-cream)', pointerEvents: 'none' }}>
              <div className="eyebrow on-dark" style={{ marginBottom: 6 }}>★ {t('Wide-open spaces','مساحات مفتوحة')}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 28, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.01em' }}>{t('Real, fresh, full of flavor.','حقيقي، طازج، ومليء بالنكهة.')}</div>
            </div>
          </div>
          <div>
            <div className="eyebrow">★ {t('The taste of Texas','مذاق تكساس')}</div>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 76px)', margin: '12px 0 24px', lineHeight: 0.95 }}>
              {t('We\'re the taste of Texas — and we','نحن مذاق تكساس — ولا')} <span style={{ color: 'var(--tc-red)' }}>{t('can\'t be mimicked.','يمكن تقليدنا.')}</span>
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--fg-2)', maxWidth: 560, margin: '0 0 16px' }}>
              {t(
                'Real but not boring. Simple but not basic. Familiar but always surprising. That\'s why — no matter the day, no matter who you\'re with — you\'re eager to c\'mon over, give your chicken a spicy jalapeño squeeze, and share some hearty sides.',
                'حقيقي وليس مُملاً. بسيط وليس عاديًا. مألوف لكنه دائمًا مُفاجئ. لهذا، أيًّا كان اليوم وأيًّا كان من معك، أنت متحمّس لتأتي، تعصر القليل من الجالابينو على دجاجك، وتشارك الإضافات الشهية.'
              )}
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--fg-2)', maxWidth: 560, margin: 0 }}>
              {t(
                'Our food means more than hand-crafted chicken meals that harken back to simpler times. It means wide-open spaces, brought to you by people who value tradition — and what\'s real, fresh and full of flavor.',
                'طعامنا أكثر من مجرد وجبات دجاج مصنوعة يدويًا تذكّرنا بأزمنة أبسط. يعني مساحات مفتوحة، يقدّمها أناس يقدّرون التقاليد — وما هو حقيقي، طازج، ومليء بالنكهة.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* History — Texas Chicken since 1952 */}
      <section style={{ background: 'var(--tc-black)', color: 'var(--tc-cream)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <span className="star" style={{ position: 'absolute', top: '8%', left: '4%', width: 56, height: 56, color: 'rgba(245,181,30,0.25)', animation: 'floatC 5s ease-in-out infinite' }}></span>
        <span className="star" style={{ position: 'absolute', top: '40%', right: '6%', width: 36, height: 36, color: 'rgba(245,181,30,0.18)', animation: 'floatC 6s ease-in-out infinite 1s' }}></span>
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto 48px' }}>
            <div className="eyebrow on-dark" style={{ justifyContent: 'center', display: 'inline-flex' }}>★ {t('Texas Chicken™ History','تاريخ تكساس تشيكن™')}</div>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 76px)', margin: '12px 0 24px', color: 'var(--tc-cream)', lineHeight: 0.95 }}>
              {t('Our heritage, spirit and origins are','تراثنا وروحنا وأصولنا')}<br/>
              <span style={{ color: 'var(--tc-yellow)' }}>{t('authentically Texan.','تكساسية أصيلة.')}</span>
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'rgba(250,246,239,0.85)', margin: 0 }}>
              {t(
                'Our brand was first brought to life in San Antonio, Texas — across from the Alamo — in 1952. From humble beginnings, our guests have savored our delicious food across the United States and 25+ international countries spanning Asia, Europe, the Middle East, Africa, Latin America and Oceania — and more on the way.',
                'وُلدت علامتنا في سان أنطونيو، تكساس — قُبالة قلعة الألامو — عام ١٩٥٢. من بدايات متواضعة، استمتع ضيوفنا بطعامنا اللذيذ في الولايات المتحدة وأكثر من ٢٥ دولة حول العالم في آسيا وأوروبا والشرق الأوسط وإفريقيا وأمريكا اللاتينية وأوقيانوسيا — والمزيد في الطريق.'
              )}
            </p>
          </div>

          {/* History stats */}
          <HistoryStats t={t}/>
        </div>
      </section>

      {/* Brand values */}
      <section style={{ background: 'var(--tc-cream)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(220px, 28vw, 420px)', color: 'rgba(154,51,36,0.04)', letterSpacing: '-0.04em', lineHeight: 1, pointerEvents: 'none', whiteSpace: 'nowrap' }}>VALUES</div>
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
            <div className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>★ {t('Brand values','قيم العلامة')}</div>
            <h2 className="display-2" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '12px 0 16px' }}>
              {t('Four things we','أربعة أمور لا')} <span style={{ color: 'var(--tc-red)' }}>{t('never compromise on.','نتنازل عنها أبدًا.')}</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {values.map(v => {
              const onYellow = v.color === 'var(--tc-yellow)';
              return (
                <article key={v.key} style={{
                  background: 'var(--tc-paper)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden',
                  boxShadow: 'var(--inset-hair), var(--shadow-1)',
                  transition: 'all 220ms var(--ease-out)',
                  display: 'flex', flexDirection: 'column',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--inset-hair), var(--shadow-3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--inset-hair), var(--shadow-1)'; }}
                >
                  {/* Top colored band */}
                  <div style={{
                    background: v.color, color: onYellow ? 'var(--tc-black)' : 'var(--tc-cream)',
                    padding: '24px 28px', position: 'relative', overflow: 'hidden',
                  }}>
                    <span className="star" style={{ position: 'absolute', right: -28, top: -28, width: 110, height: 110, color: 'rgba(255,255,255,0.12)' }}></span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
                      <div style={{ width: 52, height: 52, borderRadius: 14, background: onYellow ? 'var(--tc-black)' : 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                        {v.icon}
                      </div>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 24, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: 0, lineHeight: 1 }}>{v.title}</h3>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.85, marginTop: 6 }}>{v.tagline}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '24px 28px 28px' }}>
                    <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.6, margin: 0 }}>{v.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dual-brand identity */}
      <section style={{ background: 'var(--tc-black)', color: 'var(--tc-cream)', padding: '96px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="eyebrow on-dark">★ {t('Dual-brand identity','هويتان لعلامة واحدة')}</div>
              <h2 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', margin: '12px 0 24px', color: 'var(--tc-cream)' }}>
                {t('Two names.','اسمان.')}<br/>
                <span style={{ color: 'var(--tc-yellow)' }}>{t('One chicken.','دجاج واحد.')}</span>
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(250,246,239,0.85)', maxWidth: 520, margin: 0 }}>
                {t(
                  "In the Americas we're Church's Texas Chicken. Everywhere else we're Texas Chicken. Same hand-battered recipe, same Texan spice blend, same family-run restaurants — just a different name on the door.",
                  'في الأمريكتين، نحن تشيرتشز تكساس تشيكن. في باقي العالم، نحن تكساس تشيكن. نفس الوصفة المخفوقة يدويًا، ونفس خلطة توابل تكساس، ونفس المطاعم العائلية — فقط اسم مختلف على الباب.'
                )}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { region: t('Americas','الأمريكتان'), name: "Church's Texas Chicken", logo: 'assets/logo-churchs-white.png' },
                { region: t('Rest of world','بقية العالم'), name: 'Texas Chicken', logo: 'assets/logo-texas-white.png' },
              ].map(b => (
                <div key={b.region} style={{
                  background: 'rgba(250,246,239,0.06)',
                  border: '1px solid rgba(250,246,239,0.1)',
                  borderRadius: 'var(--radius-xl)', padding: 28, textAlign: 'center',
                  aspectRatio: '4/5', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                  <div style={{ fontSize: 14, color: 'var(--tc-yellow)', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{b.region}</div>
                  <img src={b.logo} alt={b.name} style={{ width: '60%', maxWidth: 180, margin: '0 auto', display: 'block', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))' }}/>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, textTransform: 'uppercase', lineHeight: 0.95 }}>{b.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Find nearest CTA — yellow */}
      <section style={{ background: 'var(--tc-yellow)', padding: '64px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow">★ {t('Crispy. Juicy. Yours.','مقرمش. طري. من أجلك.')}</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '8px 0 0', lineHeight: 0.95 }}>
              {t('Craving some bold,','تتوق إلى دجاج جريء')}<br/>{t('crispy chicken?','ومقرمش؟')}
            </h2>
            <p style={{ marginTop: 12, fontSize: 16, color: 'var(--tc-black)', opacity: 0.78, maxWidth: 520 }}>
              {t(
                'Search your location now and find your nearest Texas Chicken.',
                'ابحث عن موقعك الآن واعثر على أقرب فرع تكساس تشيكن.'
              )}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => go('market')} className="btn btn-black">
              <Icon name="pin" size={16}/> {t('Find a restaurant','اعثر على مطعم')}
            </button>
            <button onClick={() => go('leadership')} className="btn btn-ghost">
              {t('Meet the team','تعرّف على الفريق')} <Icon name="arrowR" size={16}/>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function TimelineCard({ e, side }) {
  return (
    <div style={{
      background: 'var(--tc-paper)', borderRadius: 'var(--radius-xl)', padding: 28,
      boxShadow: 'var(--inset-hair), var(--shadow-1)',
      maxWidth: 440, position: 'relative',
      transition: 'all 220ms var(--ease-out)',
    }}
    onMouseEnter={ev => { ev.currentTarget.style.transform = 'translateY(-3px)'; ev.currentTarget.style.boxShadow = 'var(--inset-hair), var(--shadow-3)'; }}
    onMouseLeave={ev => { ev.currentTarget.style.transform = ''; ev.currentTarget.style.boxShadow = 'var(--inset-hair), var(--shadow-1)'; }}
    >
      <div style={{
        position: 'absolute', top: 32,
        ...(side === 'left' ? { right: -10 } : { left: -10 }),
        width: 20, height: 20, transform: 'rotate(45deg)',
        background: 'var(--tc-paper)',
      }}/>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12, gap: 16 }}>
        <h3 className="display-2" style={{ fontSize: 24, margin: 0, lineHeight: 1.1, textAlign: 'left' }}>{e.t}</h3>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 36, color: e.color, letterSpacing: '-0.02em', lineHeight: 1, flexShrink: 0 }}>{e.y}</span>
      </div>
      <p style={{ color: 'var(--fg-2)', fontSize: 15, lineHeight: 1.6, margin: 0, textAlign: 'left' }}>{e.d}</p>
    </div>
  );
}

// Leadership page
function LeadershipPage() {
  const { go } = useRoute();
  const t = useT();
  const team = [
    { n: t('Joe Christina','جو كريستينا'),     r: t('Chief Executive Officer','الرئيس التنفيذي'),                  b: t('Joined 2018 after leading global QSR brands across two decades. Champions hand-battered as a non-negotiable.','انضم عام ٢٠١٨ بعد قيادة علامات وجبات سريعة عالمية على مدى عقدين. يدافع عن الخفق اليدوي كقاعدة لا تتغيّر.'),                       i: 'JC', c: 'var(--tc-red)' },
    { n: t('Roland González','رولاند غونزاليس'), r: t('Chief Operating Officer','مدير العمليات'),                    b: t('Oversees restaurant operations across 23 markets. Restaurant operator at heart.','يشرف على عمليات المطاعم في ٢٣ سوقًا. مشغّل مطاعم في الجوهر.'),                                                              i: 'RG', c: 'var(--tc-yellow)' },
    { n: t('Hala Mansour','هالة منصور'),        r: t('Chief Marketing Officer','مدير التسويق'),                      b: t('Leads the global brand & marketing platform. Believes the chicken does the talking.','تقود منصة العلامة والتسويق عالميًا. تؤمن بأن الدجاج يتحدّث عن نفسه.'),                                                    i: 'HM', c: 'var(--tc-orange)' },
    { n: t('Ahmed El-Shamy','أحمد الشامي'),     r: t('President, MENA','رئيس الشرق الأوسط وشمال أفريقيا'),          b: t("Drives growth across the Middle East and North Africa region — Texas Chicken's fastest-growing.",'يقود النمو في منطقة الشرق الأوسط وشمال أفريقيا — أسرع مناطق تكساس تشيكن نموًّا.'),                                  i: 'AE', c: 'var(--tc-black)' },
    { n: t('Wei Lin Tan','واي لين تان'),          r: t('President, Asia Pacific','رئيس آسيا والمحيط الهادئ'),         b: t('Leads operations across Malaysia, Indonesia, Singapore, NZ, and the Philippines.','يقود العمليات في ماليزيا وإندونيسيا وسنغافورة ونيوزيلندا والفلبين.'),                                                             i: 'WT', c: 'var(--tc-red)' },
    { n: t('Sarah Whitman','سارة ويتمان'),       r: t('Chief People Officer','مدير الموارد البشرية'),                  b: t('Responsible for 25,000+ team members across the global brand.','مسؤولة عن أكثر من ٢٥٬٠٠٠ عضو في الفريق حول العالم.'),                                                                                                                  i: 'SW', c: 'var(--tc-yellow)' },
    { n: t('Marco Vásquez','ماركو فاسكيز'),      r: t('Chief Financial Officer','المدير المالي'),                     b: t("Stewards the business across both Church's Texas Chicken and Texas Chicken.",'يدير شؤون الأعمال عبر كل من تشيرتشز تكساس تشيكن وتكساس تشيكن.'),                                                                                  i: 'MV', c: 'var(--tc-orange)' },
    { n: t('Priya Sharma','بريا شارما'),         r: t('Chief Technology Officer','مدير التكنولوجيا'),                  b: t('Leads digital, ordering, and the Texas Rewards platform globally.','تقود الرقمنة والطلبات ومنصة مكافآت تكساس عالميًا.'),                                                                                                              i: 'PS', c: 'var(--tc-black)' },
  ];

  return (
    <main className="page" style={{ background: 'var(--tc-cream)' }}>
      <section style={{ background: 'var(--tc-yellow)', padding: '64px 0 32px', position: 'relative', overflow: 'hidden' }}>
        <span className="star" style={{ position: 'absolute', top: '-15%', right: '-5%', width: 380, height: 380, color: 'rgba(154,51,36,0.08)', pointerEvents: 'none' }}></span>
        <div className="container" style={{ position: 'relative' }}>
          <a onClick={() => go('story')} style={{ cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--tc-black)', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24, opacity: 0.7 }}>
            <Icon name="chevL" size={14}/> {t('Our Story','قصتنا')}
          </a>
          <div className="eyebrow">★ {t('Leadership team','فريق القيادة')}</div>
          <h1 className="display" style={{ fontSize: 'clamp(48px, 6.5vw, 96px)', margin: '12px 0 16px' }}>
            {t('People who care','أشخاص يهتمون')}<br/>
            <span style={{ color: 'var(--tc-red)' }}>{t('about your chicken.','بدجاجك.')}</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--tc-black)', maxWidth: 640, lineHeight: 1.55, opacity: 0.78 }}>
            {t('The team responsible for the brand, the operation, and the people in 1,650+ restaurants.','الفريق المسؤول عن العلامة والعمليات والناس في أكثر من ١٬٦٥٠ مطعمًا.')}
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--tc-cream)', padding: '32px 0 96px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {team.map((p, i) => (
              <div key={p.n} style={{
                background: 'var(--tc-paper)', borderRadius: 'var(--radius-xl)', overflow: 'hidden',
                boxShadow: 'var(--inset-hair), var(--shadow-1)',
                transition: 'all 220ms var(--ease-out)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--inset-hair), var(--shadow-2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--inset-hair), var(--shadow-1)'; }}
              >
                <div style={{ aspectRatio: '1/1', background: p.c, color: p.c === 'var(--tc-yellow)' || p.c === 'var(--tc-orange)' ? 'var(--tc-black)' : 'var(--tc-cream)', position: 'relative', overflow: 'hidden' }}>
                  <image-slot
                    id={`leader-${i}`}
                    shape="rounded"
                    radius="0"
                    data-on-dark=""
                    placeholder={`Drop ${p.n}'s photo`}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                  ></image-slot>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 92, letterSpacing: '-0.02em', pointerEvents: 'none', mixBlendMode: 'multiply', opacity: 0.15 }}>
                    {p.i}
                  </div>
                  <span className="star" style={{ position: 'absolute', bottom: -16, right: -16, width: 96, height: 96, color: 'rgba(255,255,255,0.15)', pointerEvents: 'none' }}></span>
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{p.n}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: 'var(--tc-red)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2, marginBottom: 12 }}>{p.r}</div>
                  <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.5, margin: 0 }}>{p.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--tc-yellow)', color: 'var(--tc-black)', padding: '64px 0 56px' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow">★ {t('Press','صحافة')}</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '8px 0 0', color: 'var(--tc-black)' }}>{t('Working on a story?','تعمل على قصّة؟')}</h2>
            <p style={{ marginTop: 12, color: 'var(--tc-black)', opacity: 0.75, maxWidth: 480 }}>{t('For interviews, hi-res photos, or executive bios, get in touch with our press team.','للمقابلات والصور عالية الدقة وسير التنفيذيين، تواصل مع فريق الصحافة.')}</p>
          </div>
          <button onClick={() => go('contact')} className="btn btn-black">{t('Contact press','تواصل مع الصحافة')} <Icon name="arrowR" size={16}/></button>
        </div>
      </section>
    </main>
  );
}

function HistoryStats({ t }) {
  const [ref, visible] = useInView(0.3);
  const stats = [
    { n: 1952, suffix: '',  raw: true,  l: t('Founded','تأسسنا'),     s: t('San Antonio · across from the Alamo','سان أنطونيو · قُبالة الألامو') },
    { n: 25,   suffix: '+', l: t('Countries','دولة'),                  s: t('Asia · Europe · MENA · Americas','آسيا · أوروبا · الشرق الأوسط · الأمريكتان') },
    { n: 1650, suffix: '+', l: t('Restaurants','مطعم'),                s: t('And more on the way','والمزيد في الطريق') },
    { n: 72,   suffix: '',  l: t('Years','سنة'),                       s: t('Of legendary, hand-crafted meals','من وجبات أسطورية تُصنع يدويًا') },
  ];
  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 56 }}>
      {stats.map((s, i) => (
        <div key={s.l} style={{
          background: 'rgba(250,246,239,0.05)', border: '1px solid rgba(250,246,239,0.1)',
          borderRadius: 'var(--radius-xl)', padding: 24,
          transition: 'all 220ms var(--ease-out)',
          animation: visible ? `fadeUp 600ms ${i * 120}ms var(--ease-out) both` : 'none',
          opacity: visible ? 1 : 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(245,181,30,0.1)'; e.currentTarget.style.borderColor = 'rgba(245,181,30,0.4)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.background = 'rgba(250,246,239,0.05)'; e.currentTarget.style.borderColor = 'rgba(250,246,239,0.1)'; }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 56, color: 'var(--tc-yellow)', letterSpacing: '-0.02em', lineHeight: 0.95 }}>
            <CountUp end={s.n} visible={visible} raw={s.raw}/>
            {s.suffix && <span>{s.suffix}</span>}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--tc-cream)', marginTop: 8 }}>{s.l}</div>
          <div style={{ fontSize: 12, color: 'rgba(250,246,239,0.6)', marginTop: 4, lineHeight: 1.4 }}>{s.s}</div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { StoryPage, LeadershipPage });
