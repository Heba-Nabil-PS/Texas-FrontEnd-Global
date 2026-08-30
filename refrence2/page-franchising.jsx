/* global React */
// Franchising — single consolidated page with sticky inquiry CTA

function FranchisingPage() {
  const { go } = useRoute();
  const t = useT();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', country: '', net: '', timeline: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setFormData(prev => ({ ...prev, [k]: v }));

  return (
    <main className="page" style={{ background: 'var(--tc-cream)' }}>
      {/* Hero */}
      <section style={{ background: 'var(--tc-black)', color: 'var(--tc-cream)', padding: '80px 0 96px', position: 'relative', overflow: 'hidden' }}>
        <span className="star" style={{ position: 'absolute', top: '-10%', left: '-5%', width: 420, height: 420, color: 'rgba(245,181,30,0.1)' }}></span>
        <span className="star" style={{ position: 'absolute', bottom: '-15%', right: '-8%', width: 380, height: 380, color: 'rgba(154,51,36,0.2)' }}></span>
        <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="eyebrow on-dark">★ {t('Franchising','الامتياز')}</div>
            <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: '12px 0 24px', color: 'var(--tc-cream)' }}>
              {t('Own a piece','امتلك جزءًا')}<br/>{t('of ','من ')}<span style={{ color: 'var(--tc-yellow)' }}>{t('72 years.','٧٢ عامًا.')}</span>
            </h1>
            <p style={{ fontSize: 19, color: 'rgba(250,246,239,0.8)', lineHeight: 1.55, maxWidth: 540, marginTop: 0 }}>
              {t('Texas Chicken is opening master & single-unit franchise opportunities across MENA, Asia Pacific, and emerging markets. Built on a 72-year recipe and a brand that travels.',
                 'تكساس تشيكن تفتح فرص امتياز رئيسية وفردية في الشرق الأوسط وشمال أفريقيا وآسيا والمحيط الهادئ والأسواق الناشئة. مبنية على وصفة عمرها ٧٢ عامًا وعلامة تنتقل عبر الحدود.')}
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
              <a href="#inquiry" className="btn btn-yellow" style={{ fontSize: 16, padding: '18px 32px' }}>
                {t('Start your inquiry','ابدأ استفسارك')} <Icon name="arrowR" size={16}/>
              </a>
              <a href="#opportunities" className="btn btn-ghost-light">
                {t('Explore territories','استكشف المناطق')}
              </a>
            </div>
          </div>
          <div>
            <AtGlance t={t}/>
          </div>
        </div>
      </section>

      {/* Why our brand */}
      <section style={{ background: 'var(--tc-cream)', padding: '96px 0' }}>
        <div className="container">
          <div className="eyebrow">★ {t('Why our brand','لماذا علامتنا')}</div>
          <h2 className="display-2" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '12px 0 48px', maxWidth: 880 }}>
            {t('A 72-year recipe. A globally-tested model.','وصفة عمرها ٧٢ عامًا. ونموذج مجرّب عالميًا.')} <span style={{ color: 'var(--tc-red)' }}>{t('Local-first execution.','وتنفيذ محلي أولاً.')}</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { i: 'fire', t: t('Hand-battered, fried fresh','مخفوق يدويًا، مقلي طازج'), d: t('A signature operation that competitors physically cannot replicate at scale.','عملية مميّزة لا يستطيع المنافسون تكرارها فيزيائيًا على نطاق واسع.') },
              { i: 'globe', t: t('Globally proven','مجرّب عالميًا'), d: t('23 markets prove the model travels — MENA, SEA, Pacific, the Americas.','٢٣ سوقًا تثبت أن النموذج ينتقل — الشرق الأوسط، جنوب شرق آسيا، المحيط الهادئ، والأمريكتان.') },
              { i: 'rewards', t: t('Texas Rewards platform','منصّة مكافآت تكساس'), d: t('Customer-loyalty platform delivered as standard infrastructure.','منصّة ولاء عملاء جاهزة كبنية تحتية قياسية.') },
              { i: 'pin', t: t('Real estate-flexible','مرونة في العقار'), d: t('In-line, free-standing, drive-thru, kiosk — proven across formats.','داخل المول، مستقل، طلب من السيارة، كشك — مجرّب في كل الصيغ.') },
              { i: 'heart', t: t('Brand support that scales','دعم للعلامة يتوسّع معك'), d: t('Marketing, training, operations, and supply support from day zero.','تسويق وتدريب وتشغيل ودعم لسلسلة الإمداد من اليوم صفر.') },
              { i: 'star', t: t('Heritage that means something','تراث له معنى'), d: t('San Antonio, 1952 — a story guests recognise and trust.','سان أنطونيو، ١٩٥٢ — قصة يعرفها الضيوف ويثقون بها.') },
            ].map(b => (
              <div key={b.t} style={{ background: 'var(--tc-paper)', borderRadius: 'var(--radius-xl)', padding: 28, boxShadow: 'var(--inset-hair)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--tc-red)', color: 'var(--tc-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {b.i === 'star' ? <span className="star" style={{ width: 22, height: 22 }}></span> : <Icon name={b.i} size={22}/>}
                </div>
                <div>
                  <h3 className="display-2" style={{ fontSize: 22, margin: '0 0 6px' }}>{b.t}</h3>
                  <p style={{ color: 'var(--fg-3)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment highlights */}
      <section style={{ background: 'var(--tc-yellow)', padding: '96px 0' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--tc-red)' }}>★ {t('Investment','الاستثمار')}</div>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', margin: '12px 0 16px' }}>
            {t('What it takes.','ماذا يتطلّب.')}<br/>
            <span style={{ color: 'var(--tc-red)' }}>{t('What it returns.','ماذا يعود.')}</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--tc-black)', maxWidth: 720, marginBottom: 48 }}>
            {t('Indicative ranges. Final terms vary by territory, format, and master franchise structure.',
               'نطاقات إرشادية. تختلف الشروط النهائية حسب المنطقة والصيغة وخطة الامتياز الرئيسي.')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { k: t('Initial fee','رسوم البدء'),    v: 'USD 35k',     s: t('Per restaurant','لكل مطعم') },
              { k: t('Build-out','الإنشاء'),       v: '$450k–$1.2M', s: t('Format-dependent','حسب الصيغة') },
              { k: t('Royalty','الإتاوة'),           v: '5%',           s: t('Of gross sales','من إجمالي المبيعات') },
              { k: t('Marketing','التسويق'),         v: '4%',           s: t('Brand fund contribution','مساهمة في صندوق العلامة') },
            ].map(s => (
              <div key={s.k} style={{ background: 'var(--tc-paper)', borderRadius: 'var(--radius-lg)', padding: 28, boxShadow: 'var(--inset-hair), var(--shadow-1)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{s.k}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 36, color: 'var(--tc-black)', margin: '8px 0 4px', letterSpacing: '-0.02em' }}>{s.v}</div>
                <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities — interactive territory map */}
      <section id="opportunities" style={{ background: 'var(--tc-black)', color: 'var(--tc-cream)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <span className="star" style={{ position: 'absolute', top: '-12%', right: '-6%', width: 380, height: 380, color: 'rgba(245,181,30,0.06)', pointerEvents: 'none' }}></span>
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
            <div>
              <div className="eyebrow on-dark">★ {t('Global opportunities','الفرص العالمية')}</div>
              <h2 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', margin: '12px 0 16px', color: 'var(--tc-cream)' }}>
                {t('Open territories.','مناطق مفتوحة.')}
              </h2>
              <p style={{ fontSize: 17, color: 'rgba(250,246,239,0.8)', maxWidth: 560, margin: 0 }}>
                {t('We\'re actively expanding into these markets. Master franchise & multi-unit operators welcomed.',
                   'نتوسّع بنشاط في هذه الأسواق. مرحبًا بأصحاب الامتياز الرئيسي ومشغّلي الوحدات المتعددة.')}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '14px 22px', background: 'rgba(250,246,239,0.06)', borderRadius: 999, border: '1px solid rgba(250,246,239,0.1)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--tc-yellow)', boxShadow: '0 0 12px var(--tc-yellow)' }}/>
                {t('Hot','ساخن')}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--tc-red)' }}/>
                {t('Open','مفتوح')}
              </span>
            </div>
          </div>

          <OpportunityMap t={t}/>
        </div>
      </section>

      {/* Process */}
      <section style={{ background: 'var(--tc-cream)', padding: '96px 0' }}>
        <div className="container">
          <div className="eyebrow">★ {t('Process','العملية')}</div>
          <h2 className="display-2" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '12px 0 48px' }}>{t('From inquiry to open doors.','من الاستفسار إلى افتتاح الأبواب.')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, position: 'relative' }}>
            {[
              { n: '01', t: t('Inquiry','الاستفسار'),       d: t('Submit the form. We respond within 5 business days.','قدّم النموذج. سنردّ خلال ٥ أيام عمل.') },
              { n: '02', t: t('Discovery','الاستكشاف'),     d: t('Initial calls to understand your market, capital, and experience.','مكالمات أولية لفهم سوقك ورأس مالك وخبرتك.') },
              { n: '03', t: t('Due diligence','التدقيق'),   d: t('Financial review. Operator interview. Territory mapping.','مراجعة مالية. مقابلة المشغّل. تحديد المنطقة.') },
              { n: '04', t: t('Agreement','الاتفاقية'),     d: t('Franchise agreement signed. Training begins.','توقيع اتفاقية الامتياز. يبدأ التدريب.') },
              { n: '05', t: t('Open','الافتتاح'),          d: t('Restaurant build, hiring, training. Grand opening support.','إنشاء المطعم والتوظيف والتدريب. دعم حفل الافتتاح.') },
            ].map((s, i) => (
              <div key={s.n} style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--tc-red)', color: 'var(--tc-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 14 }}>{s.n}</div>
                  {i < 4 && <div style={{ flex: 1, height: 2, background: 'var(--border-2)', backgroundImage: 'repeating-linear-gradient(90deg, var(--tc-red) 0 4px, transparent 4px 8px)' }}/>}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, textTransform: 'uppercase', margin: '0 0 6px' }}>{s.t}</div>
                <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.5, margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Support */}
      <section style={{ background: 'var(--tc-yellow)', color: 'var(--tc-black)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <span className="star" style={{ position: 'absolute', top: '-12%', right: '-6%', width: 380, height: 380, color: 'rgba(154,51,36,0.08)', pointerEvents: 'none' }}></span>
        <div className="container" style={{ position: 'relative' }}>
          <div className="eyebrow" style={{ color: 'var(--tc-red)' }}>★ {t('Resources & support','الموارد والدعم')}</div>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', margin: '12px 0 16px', lineHeight: 0.95 }}>
            {t('How we','كيف نقف')}<br/>
            <span style={{ color: 'var(--tc-red)' }}>{t('support you.','إلى جانبك.')}</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--tc-black)', opacity: 0.78, maxWidth: 640, marginBottom: 48 }}>
            {t(
              "From restaurant design to launch day and beyond, we're with you. Here's what comes with the brand.",
              'من تصميم المطعم إلى يوم الافتتاح وما بعده، نحن معك. إليك ما يأتي مع العلامة.'
            )}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              {
                icon: '🏗️',
                color: 'var(--tc-red)',
                title: t('Restaurant design','تصميم المطعم'),
                desc: t('Full architectural & interior design support — free-standing, drive-thru, mall in-line, or food court formats. Texan heritage built into every space.',
                       'دعم كامل للتصميم المعماري والداخلي — مطاعم مستقلة، طلب من السيارة، داخل المول، أو في صالات الطعام. تراث تكساس في كل مساحة.'),
                items: [t('Free-standing & drive-thru','مستقل وطلب من السيارة'), t('Mall in-line & food court','داخل المول وصالة الطعام'), t('Interior fit-out spec','مواصفات التجهيز الداخلي')],
              },
              {
                icon: '📦',
                color: 'var(--tc-red)',
                title: t('Operational support','الدعم التشغيلي'),
                desc: t('Approved supplier networks, food safety standards, kitchen equipment specs, and an inventory system built for 1,650+ restaurants.',
                       'شبكات موردين معتمدة، ومعايير سلامة غذائية، ومواصفات أجهزة المطبخ، ونظام مخزون مصمم لأكثر من ١٬٦٥٠ مطعمًا.'),
                items: [t('Approved supply chain','سلسلة إمداد معتمدة'), t('Food-safety standards','معايير سلامة الغذاء'), t('Kitchen equipment spec','مواصفات أجهزة المطبخ')],
              },
              {
                icon: '🎓',
                color: 'var(--tc-black)',
                title: t('Training programs','برامج التدريب'),
                desc: t('Multi-week pre-opening training for your team — operations, management, and the 1952 hand-batter recipe. Ongoing support after launch.',
                       'تدريب لعدة أسابيع قبل الافتتاح لفريقك — التشغيل، الإدارة، ووصفة الخفق اليدوي منذ ١٩٥٢. دعم مستمر بعد الافتتاح.'),
                items: [t('Pre-opening crew training','تدريب الطاقم قبل الافتتاح'), t('Management certification','اعتماد الإدارة'), t('Ongoing field support','دعم ميداني مستمر')],
              },
              {
                icon: '📣',
                color: 'var(--tc-red)',
                title: t('Marketing & promotions','التسويق والعروض'),
                desc: t('Global brand campaigns, local market kits, social-media templates, and grand-opening marketing investment to land your launch.',
                       'حملات عالمية للعلامة، وحقائب تسويق محلية، وقوالب لوسائل التواصل، واستثمار تسويقي في حفلة الافتتاح.'),
                items: [t('Global brand campaigns','حملات عالمية'), t('Local marketing toolkits','أدوات تسويق محلية'), t('Grand-opening investment','استثمار حفل الافتتاح')],
              },
              {
                icon: '📍',
                color: 'var(--tc-black)',
                title: t('Site selection','اختيار الموقع'),
                desc: t('Real-estate criteria, traffic & demographic analysis, lease negotiation support, and territory development planning.',
                       'معايير العقار، وتحليل حركة المرور والديموغرافيا، ودعم التفاوض على الإيجار، وتخطيط تطوير المنطقة.'),
                items: [t('Real-estate criteria','معايير العقار'), t('Demographic analysis','تحليل ديموغرافي'), t('Lease negotiation','التفاوض على الإيجار')],
              },
              {
                icon: '📜',
                color: 'var(--tc-red)',
                title: t('Brand standards','معايير العلامة'),
                desc: t('Comprehensive brand manual covering identity, packaging, signage, uniforms, and the operating standards that keep every Texas Chicken a Texas Chicken.',
                       'دليل شامل للعلامة يغطي الهوية والتغليف واللافتات والزي والمعايير التشغيلية التي تُحافظ على تكساس تشيكن كما هي.'),
                items: [t('Brand identity manual','دليل الهوية'), t('Packaging & signage spec','مواصفات التغليف واللافتات'), t('Uniform & service standards','الزي ومعايير الخدمة')],
              },
            ].map((r, i) => {
              const onYellow = r.color === 'var(--tc-yellow)';
              return (
                <article key={i} style={{
                  background: 'var(--tc-paper)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden',
                  boxShadow: 'var(--inset-hair), var(--shadow-1)',
                  display: 'flex', flexDirection: 'column',
                  transition: 'all 220ms var(--ease-out)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--inset-hair), var(--shadow-3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--inset-hair), var(--shadow-1)'; }}
                >
                  <div style={{ background: r.color, color: onYellow ? 'var(--tc-black)' : 'var(--tc-cream)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 12, position: 'relative', overflow: 'hidden' }}>
                    <span className="star" style={{ position: 'absolute', right: -20, top: -20, width: 84, height: 84, color: 'rgba(255,255,255,0.1)' }}></span>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                      {r.icon}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 20, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: 0, lineHeight: 1, position: 'relative' }}>{r.title}</h3>
                  </div>
                  <div style={{ padding: '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.55, margin: 0 }}>{r.desc}</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {r.items.map((it, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--fg-2)', fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                          <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--tc-yellow)', color: 'var(--tc-black)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon name="check" size={10} stroke={3}/>
                          </span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awards & affiliations strip */}
      <section style={{ background: 'var(--tc-black)', color: 'var(--tc-cream)', padding: '64px 0', borderTop: '1px solid rgba(250,246,239,0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="eyebrow on-dark" style={{ justifyContent: 'center', display: 'inline-flex' }}>★ {t('Recognition','تكريم')}</div>
            <h2 className="display-2" style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', margin: '8px 0 0', color: 'var(--tc-cream)' }}>
              {t('Industry-recognized. Globally trusted.','معترف بنا في القطاع. موثوقون عالميًا.')}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '20px 24px', background: 'rgba(250,246,239,0.04)', border: '1px solid rgba(250,246,239,0.08)', borderRadius: 'var(--radius-xl)' }}>
              <img src="assets/badge-ifa-member.svg" alt="IFA Member" style={{ height: 70, flexShrink: 0 }}/>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--tc-yellow)', marginBottom: 4 }}>{t('IFA Member','عضو IFA')}</div>
                <div style={{ fontSize: 13, color: 'rgba(250,246,239,0.78)', lineHeight: 1.45 }}>
                  {t('A proud member of the International Franchise Association.','عضو فخور في الاتحاد الدولي للامتيازات.')}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '20px 24px', background: 'rgba(250,246,239,0.04)', border: '1px solid rgba(250,246,239,0.08)', borderRadius: 'var(--radius-xl)' }}>
              <img src="assets/badge-ifa-foty.svg" alt="IFA Franchisee of the Year 2022" style={{ height: 78, flexShrink: 0 }}/>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--tc-yellow)', marginBottom: 4 }}>{t('IFA Franchisee of the Year','صاحب امتياز العام لـ IFA')}</div>
                <div style={{ fontSize: 13, color: 'rgba(250,246,239,0.78)', lineHeight: 1.45 }}>
                  {t('Awarded 2022 by the IFA for excellence in franchise operations.','مُنح عام ٢٠٢٢ من IFA تقديرًا للتميّز في إدارة الامتياز.')}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '20px 24px', background: 'rgba(250,246,239,0.04)', border: '1px solid rgba(250,246,239,0.08)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ background: '#fff', padding: '8px 12px', borderRadius: 10, flexShrink: 0 }}>
                <img src="assets/badge-franchise-times.svg" alt="Franchise Times Top 400" style={{ height: 56, display: 'block' }}/>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--tc-yellow)', marginBottom: 4 }}>{t('Franchise Times Top 400','أفضل ٤٠٠ من Franchise Times')}</div>
                <div style={{ fontSize: 13, color: 'rgba(250,246,239,0.78)', lineHeight: 1.45 }}>
                  {t('Ranked No. 64 in the 2023 Franchise Times Top 400.','المرتبة ٦٤ في قائمة Franchise Times Top 400 لعام ٢٠٢٣.')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section id="inquiry" style={{ background: 'var(--tc-red)', color: 'var(--tc-cream)', padding: '96px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 56 }}>
          <div>
            <div className="eyebrow on-dark">★ {t('Get in touch','تواصل معنا')}</div>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', margin: '12px 0 24px', color: 'var(--tc-cream)' }}>
              {t("Let's talk.",'لنتحدّث.')}
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(250,246,239,0.85)', lineHeight: 1.55, maxWidth: 440 }}>
              {t("Tell us about your market, your operator experience, and your capital. We'll get back to you within 5 business days.",
                 'أخبرنا عن سوقك، وخبرتك كمشغّل، ورأس مالك. سنردّ عليك خلال ٥ أيام عمل.')}
            </p>
            <div style={{ marginTop: 32, padding: 24, background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-lg)' }}>
              <div className="eyebrow on-dark" style={{ marginBottom: 8 }}>★ {t('Or email us','أو راسلنا')}</div>
              <a style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, textTransform: 'uppercase', color: 'var(--tc-yellow)' }}>franchising@texaschicken.com</a>
            </div>
          </div>
          <div style={{ background: 'var(--tc-cream)', color: 'var(--tc-black)', borderRadius: 'var(--radius-2xl)', padding: 40, boxShadow: 'var(--shadow-3)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '64px 0' }}>
                <div style={{ width: 80, height: 80, margin: '0 auto 24px', borderRadius: '50%', background: 'var(--tc-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="check" size={40} stroke={3}/>
                </div>
                <h3 className="display-2" style={{ fontSize: 32, margin: '0 0 12px' }}>{t('Inquiry received.','تم استلام استفسارك.')}</h3>
                <p style={{ color: 'var(--fg-3)', maxWidth: 360, margin: '0 auto' }}>{t("We'll review your inquiry and respond within 5 business days. Check your email.",'سنراجع استفسارك ونردّ خلال ٥ أيام عمل. تحقّق من بريدك الإلكتروني.')}</p>
              </div>
            ) : (
              <>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, textTransform: 'uppercase', marginBottom: 24 }}>{t('Inquiry form','نموذج الاستفسار')}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label={t('Full name','الاسم الكامل')} v={formData.name} onChange={v => update('name', v)}/>
                  <Field label={t('Email','البريد الإلكتروني')} v={formData.email} onChange={v => update('email', v)} type="email"/>
                  <Field label={t('Phone','الهاتف')} v={formData.phone} onChange={v => update('phone', v)}/>
                  <Field label={t('Country of interest','الدولة المستهدفة')} v={formData.country} onChange={v => update('country', v)}/>
                  <Field label={t('Liquid capital available','رأس المال السائل المتوفر')} v={formData.net} onChange={v => update('net', v)}/>
                  <Field label={t('Target opening','موعد الافتتاح المستهدف')} v={formData.timeline} onChange={v => update('timeline', v)} placeholder={t('e.g. Q2 2027','مثلاً الربع الثاني ٢٠٢٧')}/>
                </div>
                <div style={{ marginTop: 16 }}>
                  <label style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{t('Tell us more','أخبرنا المزيد')}</label>
                  <textarea value={formData.message} onChange={e => update('message', e.target.value)} rows={4}
                    placeholder={t('Restaurant operator experience, multi-unit history, master franchise interest…','خبرتك في تشغيل المطاعم، تاريخ الوحدات المتعدّدة، الاهتمام بالامتياز الرئيسي…')}
                    style={{ marginTop: 6, width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid var(--border-2)', background: 'var(--tc-paper)', fontFamily: 'var(--font-body)', fontSize: 15, resize: 'vertical', outline: 'none' }}/>
                </div>
                <button onClick={() => setSubmitted(true)} disabled={!formData.name || !formData.email} className="btn btn-yellow"
                  style={{ marginTop: 24, width: '100%', fontSize: 16, padding: '18px 0', opacity: (!formData.name || !formData.email) ? 0.4 : 1, cursor: (!formData.name || !formData.email) ? 'not-allowed' : 'pointer' }}>
                  {t('Submit inquiry','إرسال الاستفسار')} <Icon name="arrowR" size={18}/>
                </button>
                <p style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 12, textAlign: 'center' }}>{t('By submitting, you agree to our privacy policy.','بإرسالك، فأنت توافق على سياسة الخصوصية.')}</p>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================== At a glance — animated stat list ==============================
function AtGlance({ t }) {
  const [ref, visible] = useInView(0.3);
  const stats = [
    { n: 1650, suffix: '+',  raw: false, l: t('restaurants worldwide','مطعم حول العالم') },
    { n: 23,                 raw: false, l: t('countries operated','دولة نعمل بها') },
    { n: 72,   suffix: ' yrs', raw: false, suffixAr: ' سنة', l: t('of brand equity','من رصيد العلامة') },
    { n: 4.7,  suffix: '★',  raw: false, l: t('average app rating','متوسط تقييم التطبيق') },
  ];
  return (
    <div ref={ref} style={{ background: 'rgba(250,246,239,0.06)', border: '1px solid rgba(250,246,239,0.12)', borderRadius: 'var(--radius-2xl)', padding: 32, position: 'relative' }}>
      <div className="eyebrow on-dark">★ {t('At a glance','نظرة سريعة')}</div>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {stats.map((s, i) => (
          <div key={s.l} style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16,
            paddingBottom: 14, borderBottom: '1px solid rgba(250,246,239,0.08)',
            animation: visible ? `fadeUp 500ms ${i * 80}ms var(--ease-out) both` : 'none',
            opacity: visible ? 1 : 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 1, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 36, color: 'var(--tc-yellow)', letterSpacing: '-0.02em' }}>
              <CountUp end={s.n} visible={visible} raw={s.raw}/>
              {s.suffix && <span style={{ fontSize: '0.7em' }}>{s.suffix}</span>}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(250,246,239,0.7)', textAlign: 'right', textTransform: 'uppercase', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.06em' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================== Field ==============================
function Field({ label, v, onChange, type = 'text', placeholder }) {
  return (
    <div>
      <label style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{label}</label>
      <input value={v} onChange={e => onChange(e.target.value)} type={type} placeholder={placeholder}
        style={{ marginTop: 6, width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid var(--border-2)', background: 'var(--tc-paper)', fontFamily: 'var(--font-body)', fontSize: 15, outline: 'none' }}/>
    </div>
  );
}

// ============================== Opportunity Map ==============================
// Interactive world map for franchise territories. Click a pin → opens detail panel.
const TERRITORIES = [
  { code: 'jo', n: 'Jordan',       s: '25 units · 4 years', hot: true,  c: [555, 230], region: 'MENA' },
  { code: 'iq', n: 'Iraq',         s: 'Master FA',          hot: false, c: [600, 215], region: 'MENA' },
  { code: 'ma', n: 'Morocco',      s: '20 units · 4 years', hot: false, c: [475, 245], region: 'MENA' },
  { code: 'th', n: 'Thailand',     s: '40 units · 5 years', hot: true,  c: [765, 270], region: 'APAC' },
  { code: 'vn', n: 'Vietnam',      s: 'Master FA',          hot: true,  c: [790, 265], region: 'APAC' },
  { code: 'in', n: 'India',        s: 'Regional master',    hot: true,  c: [690, 250], region: 'APAC' },
  { code: 'ca', n: 'Canada',       s: 'Multi-unit',         hot: false, c: [210, 145], region: 'Americas' },
  { code: 'za', n: 'South Africa', s: 'Master FA',          hot: false, c: [555, 380], region: 'Africa' },
];

function OpportunityMap({ t }) {
  const [active, setActive] = React.useState(TERRITORIES[0].code);
  const cur = TERRITORIES.find(x => x.code === active) || TERRITORIES[0];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: 24, alignItems: 'stretch' }}>
      {/* Map panel */}
      <div style={{
        position: 'relative', borderRadius: 'var(--radius-2xl)',
        background: 'linear-gradient(160deg, #1a1815 0%, #2d2a26 60%, #3d3934 100%)',
        border: '1px solid rgba(250,246,239,0.08)',
        boxShadow: 'inset 0 0 80px rgba(0,0,0,0.4)',
        overflow: 'hidden', aspectRatio: '2/1',
      }}>
        {/* Glow rings under hot pins */}
        <svg viewBox="0 0 1000 500" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}>
          {/* Dotted continents */}
          <DarkWorldDots/>
          {/* Connecting arcs from each pin to active */}
          {TERRITORIES.map((p, i) => {
            if (p.code === active) return null;
            const [x1, y1] = p.c;
            const [x2, y2] = cur.c;
            const mx = (x1 + x2) / 2;
            const my = Math.min(y1, y2) - 40 - Math.abs(x1 - x2) * 0.05;
            return (
              <path key={p.code}
                    d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                    stroke="rgba(245,181,30,0.18)" strokeWidth="1" fill="none" strokeDasharray="3 4"/>
            );
          })}
          {/* Pins */}
          {TERRITORIES.map(p => {
            const isActive = p.code === active;
            const isHot = p.hot;
            const fill = isHot ? '#f5b51e' : '#9a3324';
            const flagW = isActive ? 26 : 22;
            const flagH = flagW * 0.66;
            return (
              <g key={p.code} onClick={() => setActive(p.code)} style={{ cursor: 'pointer' }}>
                {/* Pulse ring on hot pins */}
                {isHot && (
                  <circle cx={p.c[0]} cy={p.c[1]} r="20" fill={fill} opacity="0.25">
                    <animate attributeName="r" values="20;34;20" dur="2.4s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite"/>
                  </circle>
                )}
                {/* Active outer ring */}
                {isActive && (
                  <circle cx={p.c[0]} cy={p.c[1]} r="28" fill="none" stroke={fill} strokeWidth="2.5" strokeDasharray="3 3"/>
                )}
                {/* Background disc */}
                <circle cx={p.c[0]} cy={p.c[1]} r={isActive ? 19 : 16}
                        fill="#1a1815"
                        stroke={fill} strokeWidth={isActive ? 3 : 2.5}
                        style={{ transition: 'r 180ms var(--ease-out)' }}/>
                {/* Flag image — circle-flags SVG */}
                <image
                  href={`https://hatscripts.github.io/circle-flags/flags/${p.code}.svg`}
                  x={p.c[0] - (isActive ? 17 : 14)}
                  y={p.c[1] - (isActive ? 17 : 14)}
                  width={isActive ? 34 : 28}
                  height={isActive ? 34 : 28}
                  style={{ pointerEvents: 'none' }}
                />
                {/* Hot star badge top-right */}
                {isHot && (
                  <g style={{ pointerEvents: 'none' }}>
                    <circle cx={p.c[0] + 14} cy={p.c[1] - 14} r="8" fill="var(--tc-yellow)" stroke="#1a1815" strokeWidth="2"/>
                    <text x={p.c[0] + 14} y={p.c[1] - 10} textAnchor="middle"
                          fontSize="11" fill="#2d2a26" fontWeight="900">★</text>
                  </g>
                )}
                {/* Country label */}
                <text x={p.c[0]} y={p.c[1] + (isActive ? 40 : 34)} textAnchor="middle"
                      fill={isActive ? '#f5b51e' : 'rgba(250,246,239,0.65)'}
                      fontFamily="var(--font-display)" fontWeight="700"
                      fontSize={isActive ? 13 : 11} letterSpacing="0.06em"
                      style={{ textTransform: 'uppercase', pointerEvents: 'none', transition: 'all 180ms' }}>
                  {p.n}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating count chip top-left */}
        <div style={{
          position: 'absolute', top: 20, left: 20,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
          padding: '10px 16px', borderRadius: 999,
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12,
          textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--tc-cream)',
          border: '1px solid rgba(245,181,30,0.3)',
        }}>
          <span style={{ color: 'var(--tc-yellow)' }}>★</span>
          {TERRITORIES.length} {t('open territories','مناطق مفتوحة')}
        </div>

        {/* Region chips bottom — click to focus */}
        <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['MENA','APAC','Americas','Africa'].map(r => {
            const first = TERRITORIES.find(x => x.region === r);
            const count = TERRITORIES.filter(x => x.region === r).length;
            return (
              <button key={r} onClick={() => first && setActive(first.code)} style={{
                padding: '8px 14px', borderRadius: 999, border: 0, cursor: 'pointer',
                background: cur.region === r ? 'var(--tc-yellow)' : 'rgba(250,246,239,0.08)',
                color: cur.region === r ? 'var(--tc-black)' : 'var(--tc-cream)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
                textTransform: 'uppercase', letterSpacing: '0.06em',
                transition: 'all 140ms',
              }}>{r} · {count}</button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div style={{
        background: 'var(--tc-paper)', color: 'var(--tc-black)',
        borderRadius: 'var(--radius-2xl)', padding: 32,
        display: 'flex', flexDirection: 'column', gap: 20,
        boxShadow: 'var(--shadow-3)', position: 'relative', overflow: 'hidden',
      }}>
        <span className="star" style={{ position: 'absolute', top: -24, right: -24, width: 120, height: 120, color: 'var(--tc-yellow)', opacity: 0.18, pointerEvents: 'none' }}></span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'var(--tc-cream-200)',
            border: '2px solid var(--tc-red)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, overflow: 'hidden',
          }}>
            <Flag code={cur.code} size={26}/>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--tc-red)' }}>
              {cur.region}{cur.hot && ' · ★ Hot opportunity'}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 32, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1 }}>{cur.n}</div>
          </div>
        </div>
        <div style={{ padding: '16px 20px', background: cur.hot ? 'var(--tc-yellow)' : 'var(--tc-black)', color: cur.hot ? 'var(--tc-black)' : 'var(--tc-cream)', borderRadius: 12 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, marginBottom: 4 }}>{t('Plan','الخطة')}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, textTransform: 'uppercase' }}>{cur.s}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            [t('Format','الصيغة'), t('Free-standing · Drive-thru · Mall in-line','مستقل · طلب من السيارة · داخل المول')],
            [t('Term','المدة'), t('15 years renewable','١٥ سنة قابلة للتجديد')],
            [t('Liquid capital','رأس مال سائل'), '$2M – $5M'],
          ].map(([k,v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, paddingBottom: 8, borderBottom: '1px dashed var(--border-1)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-4)' }}>{k}</span>
              <span style={{ fontSize: 13, textAlign: 'right', color: 'var(--fg-2)', fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
        <a href="#inquiry" onClick={(e) => { e.preventDefault(); const el = document.getElementById('inquiry'); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo({ top: y, behavior: 'smooth' }); } }}
          className="btn btn-red" style={{ marginTop: 'auto', justifyContent: 'center' }}>
          {t('Inquire about','استفسر عن')} {cur.n} <Icon name="arrowR" size={16}/>
        </a>
      </div>
    </div>
  );
}

function DarkWorldDots() {
  const continents = [
    { cx: 200, cy: 180, rx: 90, ry: 60 },   // North America
    { cx: 270, cy: 350, rx: 50, ry: 80 },   // South America
    { cx: 510, cy: 175, rx: 60, ry: 35 },   // Europe
    { cx: 540, cy: 290, rx: 75, ry: 85 },   // Africa
    { cx: 605, cy: 230, rx: 35, ry: 40 },   // Arabia
    { cx: 730, cy: 215, rx: 130, ry: 70 },  // Asia
    { cx: 790, cy: 300, rx: 50, ry: 35 },   // SE Asia
    { cx: 870, cy: 380, rx: 65, ry: 35 },   // Australia
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
      if (inside) dots.push(<circle key={i++} cx={x} cy={y} r="1.6" fill="rgba(250,246,239,0.12)"/>);
    }
  }
  return <>{dots}</>;
}

Object.assign(window, { FranchisingPage, FormField: Field });
