/* global React */
// Misc pages: Careers, Contact, App, FAQs, Privacy/Terms/Sitemap

function CareersPage() {
  const { go } = useRoute();
  const t = useT();
  const [filterRole, setFilterRole] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');
  const [openRole, setOpenRole] = useState(null);

  const roles = [
    { id: 'rgm-cairo',  t: t('Restaurant General Manager','مدير عام للمطعم'),       team: 'restaurant', loc: t('Cairo · Egypt','القاهرة · مصر'),              type: t('Full-time','دوام كامل'),                                 region: 'mena', salary: 'EGP 28,000 – 36,000', posted: t('3 days ago','منذ ٣ أيام') },
    { id: 'crew-dubai', t: t('Crew Member','عضو في الطاقم'),                  team: 'restaurant', loc: t('Dubai · UAE · Multiple','دبي · الإمارات · عدّة فروع'),  type: t('Full-time / Part-time','دوام كامل / جزئي'),                  region: 'mena', salary: 'AED 3,500 – 5,000',  posted: t('1 week ago','منذ أسبوع') },
    { id: 'brand-mena', t: t('Senior Brand Manager, MENA','مدير علامة أول، MENA'),    team: 'corporate',  loc: t('Dubai · UAE','دبي · الإمارات'),               type: t('Full-time','دوام كامل'),                                 region: 'mena', salary: 'AED 28,000 – 38,000', posted: t('5 days ago','منذ ٥ أيام') },
    { id: 'rgm-kl',     t: t('Restaurant General Manager','مدير عام للمطعم'),       team: 'restaurant', loc: t('Kuala Lumpur · Malaysia','كوالالمبور · ماليزيا'), type: t('Full-time','دوام كامل'),                                 region: 'apac', salary: 'MYR 7,500 – 10,500', posted: t('2 weeks ago','منذ أسبوعين') },
    { id: 'dir-supply', t: t('Director, Supply Chain','مدير سلسلة الإمداد'),     team: 'corporate',  loc: t('Singapore','سنغافورة'),                              type: t('Full-time','دوام كامل'),                                 region: 'apac', salary: 'SGD 12,000 – 18,000', posted: t('1 week ago','منذ أسبوع') },
    { id: 'mkt-akl',    t: t('Marketing Coordinator','منسّق تسويق'),            team: 'corporate',  loc: t('Auckland · NZ','أوكلاند · نيوزيلندا'),       type: t('Full-time','دوام كامل'),                                 region: 'apac', salary: 'NZD 70,000 – 90,000', posted: t('4 days ago','منذ ٤ أيام') },
    { id: 'crew-riyadh',t: t('Crew Member','عضو في الطاقم'),                  team: 'restaurant', loc: t('Riyadh · KSA · Multiple','الرياض · السعودية · عدّة فروع'), type: t('Full-time','دوام كامل'),                                 region: 'mena', salary: 'SAR 4,000 – 5,500',  posted: t('2 days ago','منذ يومين') },
    { id: 'ops-dubai',  t: t('Operations Excellence Manager','مدير تميّز العمليات'), team: 'corporate', loc: t('Dubai · UAE','دبي · الإمارات'),               type: t('Full-time','دوام كامل'),                                 region: 'mena', salary: 'AED 25,000 – 35,000', posted: t('6 days ago','منذ ٦ أيام') },
    { id: 'shift-jkt',  t: t('Shift Supervisor','مشرف ورديّة'),                  team: 'restaurant', loc: t('Jakarta · Indonesia','جاكرتا · إندونيسيا'),     type: t('Full-time','دوام كامل'),                                 region: 'apac', salary: 'IDR 8M – 12M',        posted: t('1 week ago','منذ أسبوع') },
    { id: 'design-mena',t: t('Senior Designer, Brand Platform','مصمّم أول، منصّة العلامة'), team: 'corporate', loc: t('Remote · MENA','عن بُعد · الشرق الأوسط'), type: t('Full-time','دوام كامل'),                                 region: 'mena', salary: 'USD 60,000 – 85,000', posted: t('3 days ago','منذ ٣ أيام') },
  ];

  const filtered = roles.filter(r =>
    (filterRole === 'all' || r.team === filterRole) &&
    (filterRegion === 'all' || r.region === filterRegion)
  );

  if (openRole) {
    const role = roles.find(r => r.id === openRole);
    return <RoleDetailPage role={role} onBack={() => setOpenRole(null)}/>;
  }

  return (
    <main className="page">
      <section style={{ background: 'var(--tc-yellow)', padding: '80px 0 96px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="eyebrow">★ {t('Careers','الوظائف')}</div>
            <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: '12px 0 16px' }}>
              {t('Work hard.','اعمل بجد.')}<br/>{t('Eat well.','كُل جيدًا.')}<br/>
              <span style={{ color: 'var(--tc-red)' }}>{t('Grow here.','انمُ هنا.')}</span>
            </h1>
            <p style={{ fontSize: 19, color: 'var(--tc-black)', maxWidth: 540, lineHeight: 1.55 }}>
              {t('25,000 team members across 23 countries — 64% of our managers started as crew. Restaurant and corporate roles, in one place.',
                 '٢٥٬٠٠٠ عضو في الفريق عبر ٢٣ دولة — ٦٤٪ من مدرائنا بدأوا كأعضاء طاقم. وظائف المطاعم والوظائف المكتبية في مكان واحد.')}
            </p>
          </div>
          <div style={{ background: 'var(--tc-cream)', borderRadius: 'var(--radius-2xl)', padding: 32, boxShadow: 'var(--shadow-2)' }}>
            <div className="eyebrow">★ {t('Why work here','لماذا تعمل معنا')}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[t('Real career paths','مسارات وظيفية حقيقية'), t('Living wages locally','أجور عادلة محليًا'), t('Training that travels','تدريب عابر للحدود'), t('Free chicken (yes, really)','دجاج مجانًا (حقًا!)')].map(l => (
                <li key={l} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--tc-red)', color: 'var(--tc-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="check" size={14} stroke={3}/>
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--tc-cream)', padding: '64px 0 96px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <h2 className="display-2" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: 0 }}>{t('Open roles','وظائف شاغرة')}</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Pillbar value={filterRole} onChange={setFilterRole} opts={[['all',t('All teams','كل الفرق')],['restaurant',t('Restaurant','مطعم')],['corporate',t('Corporate','شركة')]]}/>
              <Pillbar value={filterRegion} onChange={setFilterRegion} opts={[['all',t('All regions','كل المناطق')],['mena',t('MENA','الشرق الأوسط')],['apac',t('Asia Pacific','آسيا والمحيط الهادئ')]]}/>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map((r,i) => (
              <a key={r.id} onClick={() => setOpenRole(r.id)} style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', alignItems: 'center', gap: 16,
                padding: '24px 28px', background: 'var(--tc-paper)', borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--inset-hair)', cursor: 'pointer', transition: 'all 140ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = 'var(--inset-hair), var(--shadow-2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--inset-hair)'; }}
              >
                <div>
                  <span className="chip" style={{ background: r.team === 'restaurant' ? 'var(--tc-red)' : 'var(--tc-black)', color: 'var(--tc-cream)', marginBottom: 8 }}>
                    {r.team === 'restaurant' ? '★ ' + t('Restaurant','مطعم') : '★ ' + t('Corporate','شركة')}
                  </span>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, textTransform: 'uppercase', letterSpacing: '-0.01em', marginTop: 6 }}>{r.t}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-3)', fontSize: 14 }}>
                  <Icon name="pin" size={16}/> {r.loc}
                </div>
                <div style={{ fontSize: 14, color: 'var(--fg-3)' }}>{r.type}</div>
                <Icon name="arrowR" size={20}/>
              </a>
            ))}
            {filtered.length === 0 && <div style={{ padding: 64, textAlign: 'center', color: 'var(--fg-3)' }}>{t('No roles match your filters.','لا توجد وظائف تطابق الفلاتر.')}</div>}
          </div>
        </div>
      </section>
    </main>
  );
}

function Pillbar({ value, onChange, opts }) {
  return (
    <div style={{ display: 'inline-flex', gap: 4, padding: 4, background: 'var(--tc-paper)', borderRadius: 999, boxShadow: 'var(--inset-hair)' }}>
      {opts.map(([k,l]) => (
        <button key={k} onClick={() => onChange(k)} style={{
          padding: '8px 16px', borderRadius: 999, border: 0,
          background: value === k ? 'var(--tc-black)' : 'transparent',
          color: value === k ? 'var(--tc-cream)' : 'var(--tc-black)',
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
          textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer',
        }}>{l}</button>
      ))}
    </div>
  );
}

// ============================== Role Detail Page ==============================
function RoleDetailPage({ role, onBack }) {
  const { go } = useRoute();
  const t = useT();
  const [step, setStep] = useState('details'); // details | apply | sent
  const [form, setForm] = useState({ name: '', email: '', phone: '', linkedin: '', cover: '' });
  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const isValid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email);
  const isRestaurant = role.team === 'restaurant';

  const responsibilities = isRestaurant ? [
    t('Lead daily restaurant operations across shifts','قيادة العمليات اليومية للمطعم عبر الورديات'),
    t('Hand-batter chicken and uphold the 1952 recipe quality bar','خفق الدجاج يدويًا والحفاظ على مستوى وصفة ١٩٥٢'),
    t('Hire, train, and develop a high-performing crew','توظيف وتدريب وتطوير طاقم عالي الأداء'),
    t('Own P&L, labor costs, inventory, and food cost','إدارة الأرباح والخسائر والعمالة والمخزون وتكلفة الطعام'),
    t('Champion guest experience and resolve issues on the spot','الدفاع عن تجربة الضيف وحل المشكلات فورًا'),
    t('Partner with the franchisee on local marketing & community','الشراكة مع صاحب الامتياز في التسويق المحلي والمجتمع'),
  ] : [
    t('Drive strategy and execution for your function across the region','قيادة الاستراتيجية والتنفيذ لوظيفتك في كامل المنطقة'),
    t('Partner with cross-functional teams (Ops, Marketing, Supply, Tech)','الشراكة مع فرق متعدّدة (التشغيل، التسويق، الإمداد، التقنية)'),
    t('Lead vendor relationships and stakeholder management','قيادة علاقات الموردين وإدارة أصحاب المصلحة'),
    t('Build, mentor, and grow your team','بناء وتطوير ونمو فريقك'),
    t('Own KPIs, reporting, and budget for the function','إدارة المؤشرات والتقارير والميزانية للوظيفة'),
    t('Represent the brand internally and externally','تمثيل العلامة داخليًا وخارجيًا'),
  ];
  const requirements = isRestaurant ? [
    t('3+ years in QSR or restaurant management','٣ سنوات+ في إدارة الوجبات السريعة أو المطاعم'),
    t('Demonstrated experience leading a team of 15+','خبرة موثَّقة في قيادة فريق من ١٥ شخصًا أو أكثر'),
    t('Strong P&L and cost-control ownership','إتقان قوي للأرباح والخسائر وضبط التكاليف'),
    t('Guest-obsessed mindset','عقلية مهووسة بالضيف'),
    t('Ability to work weekends, evenings, and holidays','القدرة على العمل في عطلات الأسبوع والمساء والإجازات'),
  ] : [
    t('7+ years of relevant industry experience','٧ سنوات+ من الخبرة في القطاع'),
    t('Track record of regional / multi-market scope','سجل إنجازات إقليمي / متعدّد الأسواق'),
    t('Strong analytical and storytelling skills','مهارات تحليل وسرد قصصي قوية'),
    t('Comfort with ambiguity and speed','الراحة مع الغموض والسرعة'),
    t('Excellent English; Arabic or local-market language a plus','إنجليزية ممتازة؛ والعربية أو لغة السوق المحلي ميزة إضافية'),
  ];

  return (
    <main className="page" style={{ background: 'var(--tc-cream)' }}>
      <section style={{ background: 'var(--tc-cream)', padding: '40px 0 0' }}>
        <div className="container">
          <a onClick={onBack} style={{ cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon name="chevL" size={14}/> {t('All roles','كل الوظائف')}
          </a>
        </div>
      </section>

      {/* Hero */}
      <section style={{ background: isRestaurant ? 'var(--tc-red)' : 'var(--tc-black)', color: 'var(--tc-cream)', padding: '48px 0 64px', position: 'relative', overflow: 'hidden' }}>
        <span className="star" style={{ position: 'absolute', top: '-10%', right: '-6%', width: 340, height: 340, color: 'rgba(245,181,30,0.1)', pointerEvents: 'none' }}></span>
        <div className="container" style={{ position: 'relative' }}>
          <span className="chip" style={{ background: isRestaurant ? 'var(--tc-yellow)' : 'var(--tc-red)', color: isRestaurant ? 'var(--tc-black)' : 'var(--tc-cream)' }}>
            ★ {isRestaurant ? t('Restaurant','مطعم') : t('Corporate','شركة')}
          </span>
          <h1 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 76px)', margin: '14px 0 20px', color: 'var(--tc-cream)', lineHeight: 0.95 }}>{role.t}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 16 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: 'rgba(250,246,239,0.9)' }}><Icon name="pin" size={16}/> {role.loc}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: 'rgba(250,246,239,0.9)' }}><Icon name="clock" size={16}/> {role.type}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: 'rgba(250,246,239,0.9)' }}><Icon name="rewards" size={16}/> {role.salary}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: 'rgba(250,246,239,0.7)' }}>{t('Posted','نُشرت')} {role.posted}</span>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--tc-cream)', padding: '56px 0 96px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 40, alignItems: 'start' }}>
          {/* Left — content */}
          <div>
            <div className="eyebrow">★ {t('About the role','عن الوظيفة')}</div>
            <p style={{ fontSize: 17, color: 'var(--fg-2)', lineHeight: 1.65, margin: '12px 0 32px' }}>
              {isRestaurant
                ? t("You're at the front of the kitchen — owning the food, the guest, and the team. You'll lead a Texas Chicken restaurant with the same hand-battered, fried-fresh standard we've held since 1952.",
                     'أنت في طليعة المطبخ — مسؤول عن الطعام والضيف والفريق. ستقود مطعم تكساس تشيكن بنفس معيار الخفق اليدوي والقلي الطازج الذي حافظنا عليه منذ ١٩٥٢.')
                : t('You\'ll work at the regional headquarters supporting franchisees and restaurants across the region. You\'ll partner closely with operations, marketing, and supply teams to ship work that lands in the restaurant.',
                     'ستعمل في المقر الإقليمي لدعم أصحاب الامتياز والمطاعم في المنطقة. ستتعاون عن قُرب مع فرق التشغيل والتسويق والإمداد لإنجاز أعمال تصل إلى المطعم.')}
            </p>

            <div className="eyebrow" style={{ marginTop: 16 }}>★ {t('What you\'ll do','ماذا ستفعل')}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {responsibilities.map((r, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.55 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--tc-red)', color: 'var(--tc-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <Icon name="check" size={12} stroke={3}/>
                  </span>
                  {r}
                </li>
              ))}
            </ul>

            <div className="eyebrow">★ {t('What we\'re looking for','من نبحث عنه')}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {requirements.map((r, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.55 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--tc-yellow)', flexShrink: 0, marginTop: 9 }}/>
                  {r}
                </li>
              ))}
            </ul>

            <div style={{ background: 'var(--tc-yellow)', borderRadius: 'var(--radius-xl)', padding: 24, marginTop: 16 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--tc-red)', marginBottom: 8 }}>★ {t('Perks','المزايا')}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 8 }}>{t('What you get','ما ستحصل عليه')}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, fontSize: 14, color: 'var(--tc-black)' }}>
                {[
                  t('Health insurance','تأمين صحي'),
                  t('Annual leave + holidays','إجازة سنوية + رسمية'),
                  t('Training that travels','تدريب عابر للحدود'),
                  t('Free meals on shift','وجبات مجانية أثناء الدوام'),
                  t('Performance bonus','مكافأة الأداء'),
                  t('Career growth path','مسار نمو وظيفي'),
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon name="check" size={14}/> {p}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — sticky apply card */}
          <aside style={{ position: 'sticky', top: 120, background: 'var(--tc-paper)', borderRadius: 'var(--radius-2xl)', padding: 28, boxShadow: 'var(--inset-hair), var(--shadow-2)', overflow: 'hidden' }}>
            <span className="star" style={{ position: 'absolute', top: -28, right: -28, width: 100, height: 100, color: 'rgba(245,181,30,0.2)', pointerEvents: 'none' }}></span>
            {step === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '36px 0' }}>
                <div style={{ width: 64, height: 64, margin: '0 auto 18px', borderRadius: '50%', background: 'var(--tc-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="check" size={32} stroke={3}/>
                </div>
                <h3 className="display-2" style={{ fontSize: 26, margin: '0 0 10px' }}>{t('Application sent.','تم إرسال الطلب.')}</h3>
                <p style={{ color: 'var(--fg-3)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>
                  {t("We'll review and get back to you within 7 business days.",'سنراجع الطلب ونردّ عليك خلال ٧ أيام عمل.')}
                </p>
                <button onClick={onBack} className="btn btn-ghost" style={{ marginTop: 20 }}>
                  {t('Browse more roles','تصفّح المزيد')}
                </button>
              </div>
            ) : step === 'apply' ? (
              <>
                <div className="eyebrow">★ {t('Apply now','تقديم الآن')}</div>
                <h3 className="display-2" style={{ fontSize: 22, margin: '8px 0 16px', lineHeight: 1.1 }}>{role.t}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <CField label={t('Full name','الاسم الكامل')} v={form.name} onChange={v => update('name', v)}/>
                  <CField label={t('Email','البريد الإلكتروني')} v={form.email} onChange={v => update('email', v)} type="email"/>
                  <CField label={t('Phone','الهاتف')} v={form.phone} onChange={v => update('phone', v)}/>
                  <CField label={t('LinkedIn (optional)','لينكدإن (اختياري)')} v={form.linkedin} onChange={v => update('linkedin', v)}/>
                  <div>
                    <label style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{t('Cover note (optional)','رسالة تعريف (اختياري)')}</label>
                    <textarea value={form.cover} onChange={e => update('cover', e.target.value)} rows={3}
                      placeholder={t('Why this role?','لماذا هذه الوظيفة؟')}
                      style={{ marginTop: 6, width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border-2)', background: 'var(--tc-cream-200)', fontFamily: 'var(--font-body)', fontSize: 14, resize: 'vertical', outline: 'none' }}/>
                  </div>
                  <button type="button" style={{ padding: '14px', borderRadius: 10, border: '2px dashed var(--border-2)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-3)' }}>
                    <Icon name="download" size={14}/> &nbsp; {t('Upload CV / PDF','حمّل السيرة الذاتية / PDF')}
                  </button>
                </div>
                <button onClick={() => isValid && setStep('sent')} disabled={!isValid} className="btn btn-yellow"
                  style={{ marginTop: 16, width: '100%', fontSize: 14, padding: '16px 0', opacity: isValid ? 1 : 0.4, cursor: isValid ? 'pointer' : 'not-allowed' }}>
                  {t('Submit application','إرسال الطلب')} <Icon name="arrowR" size={16}/>
                </button>
                <button onClick={() => setStep('details')} style={{ marginTop: 8, width: '100%', background: 'transparent', border: 0, cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: 8 }}>
                  {t('Cancel','إلغاء')}
                </button>
              </>
            ) : (
              <>
                <div className="eyebrow">★ {t('Ready to apply?','جاهز للتقديم؟')}</div>
                <h3 className="display-2" style={{ fontSize: 24, margin: '8px 0 16px', lineHeight: 1.1 }}>{t('Join the Texas Chicken family.','انضم إلى عائلة تكساس تشيكن.')}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  {[
                    [t('Role','الوظيفة'), role.t],
                    [t('Location','الموقع'), role.loc],
                    [t('Type','النوع'), role.type],
                    [t('Salary','الراتب'), role.salary],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, paddingBottom: 8, borderBottom: '1px dashed var(--border-1)' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-4)' }}>{k}</span>
                      <span style={{ fontSize: 13, textAlign: 'right', color: 'var(--fg-2)', fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep('apply')} className="btn btn-yellow" style={{ width: '100%', justifyContent: 'center' }}>
                  {t('Apply now','تقديم الآن')} <Icon name="arrowR" size={16}/>
                </button>
                <button onClick={onBack} style={{ marginTop: 8, width: '100%', background: 'transparent', border: 0, cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: 8 }}>
                  {t('Save for later','احفظ للاحقًا')}
                </button>
              </>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

// ============================== CONTACT ==============================
function ContactPage() {
  const { go } = useRoute();
  const t = useT();
  const [form, setForm] = useState({ name: '', email: '', topic: 'general', country: '', message: '' });
  const [sent, setSent] = useState(false);
  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const isValid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.message.trim().length > 5;
  const reasons = [
    { i: 'mail', t: t('General inquiries','استفسارات عامة'), d: t('Questions about the brand, partnerships, or general business.','أسئلة عن العلامة أو الشراكات أو الأعمال العامة.'), email: 'hello@texaschicken.com' },
    { i: 'star', t: t('Media & press','الإعلام والصحافة'), d: t('Press releases, executive bios, interview requests, photography.','بيانات صحفية، نبذات تنفيذية، طلبات مقابلات، تصوير.'), email: 'press@texaschicken.com', anchor: 'media' },
  ];
  return (
    <main className="page" style={{ background: 'var(--tc-cream)' }}>
      <section style={{ background: 'var(--tc-cream)', padding: '64px 0 32px' }}>
        <div className="container">
          <div className="eyebrow">★ {t('Contact us','تواصل معنا')}</div>
          <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 112px)', margin: '12px 0 20px' }}>
            {t('Get in ','تواصل ')}<span style={{ color: 'var(--tc-red)' }}>{t('touch.','معنا.')}</span>
          </h1>
          <p style={{ fontSize: 19, color: 'var(--fg-2)', maxWidth: 640, lineHeight: 1.55 }}>
            {t('Pick the right team. We\'ll get back to you faster.','اختر الفريق المناسب. سنردّ عليك أسرع.')}
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--tc-cream)', padding: '32px 0 96px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48 }}>
          <div>
            <div className="eyebrow">★ {t('Corporate HQ','المقر الرئيسي')}</div>
            <h2 className="display-2" style={{ fontSize: 32, margin: '8px 0 16px' }}>Cajun Operating Company</h2>
            <p style={{ color: 'var(--fg-2)', lineHeight: 1.6, fontSize: 15 }}>
              5301 Spectrum Drive<br/>
              Atlanta, GA 30339<br/>
              United States
            </p>
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--fg-2)', fontSize: 14 }}><Icon name="phone" size={16}/> +1 (770) 350-3800</a>
              <a style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--fg-2)', fontSize: 14 }}><Icon name="mail" size={16}/> hello@texaschicken.com</a>
            </div>

            <hr className="hr-dashed" style={{ margin: '32px 0' }}/>

            {/* Inquiry cards stacked under HQ info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {reasons.map(r => (
                <div key={r.t} id={r.anchor} style={{ background: 'var(--tc-paper)', borderRadius: 'var(--radius-lg)', padding: 20, boxShadow: 'var(--inset-hair)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--tc-red)', color: 'var(--tc-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {r.i === 'star' ? <span className="star" style={{ width: 18, height: 18 }}></span> : <Icon name={r.i} size={18}/>}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 className="display-2" style={{ fontSize: 17, margin: '0 0 4px', lineHeight: 1.1 }}>{r.t}</h3>
                      <p style={{ color: 'var(--fg-3)', fontSize: 13, lineHeight: 1.5, margin: '0 0 8px' }}>{r.d}</p>
                      {r.email && <a style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', color: 'var(--tc-red)', cursor: 'pointer', letterSpacing: '0.02em' }}>{r.email}</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--tc-paper)', borderRadius: 'var(--radius-2xl)', padding: 40, boxShadow: 'var(--inset-hair), var(--shadow-2)', position: 'relative', overflow: 'hidden' }}>
            <span className="star" style={{ position: 'absolute', top: -24, right: -24, width: 110, height: 110, color: 'rgba(245,181,30,0.2)', pointerEvents: 'none' }}></span>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ width: 72, height: 72, margin: '0 auto 20px', borderRadius: '50%', background: 'var(--tc-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="check" size={36} stroke={3}/>
                </div>
                <h3 className="display-2" style={{ fontSize: 30, margin: '0 0 12px' }}>{t('Message sent.','تم إرسال الرسالة.')}</h3>
                <p style={{ color: 'var(--fg-3)', maxWidth: 380, margin: '0 auto', fontSize: 15, lineHeight: 1.55 }}>
                  {t("Thanks for reaching out. We'll get back to you within 2 business days.","شكرًا لتواصلك معنا. سنردّ عليك خلال يومي عمل.")}
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', topic: 'general', country: '', message: '' }); }} className="btn btn-ghost" style={{ marginTop: 24 }}>
                  {t('Send another','أرسل رسالة أخرى')}
                </button>
              </div>
            ) : (
              <>
                <div style={{ position: 'relative', marginBottom: 24 }}>
                  <div className="eyebrow">★ {t('Send a message','أرسل رسالة')}</div>
                  <h2 className="display-2" style={{ fontSize: 32, margin: '8px 0 4px', lineHeight: 1 }}>{t('Drop us a line.','اكتب لنا.')}</h2>
                  <p style={{ color: 'var(--fg-3)', fontSize: 14, margin: 0 }}>{t("We'll reply within 2 business days.",'سنردّ خلال يومي عمل.')}</p>
                </div>

                {/* Topic chips */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{t('Topic','الموضوع')}</label>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    {[
                      ['general', t('General','عام')],
                      ['media', t('Media','إعلام')],
                      ['franchise', t('Franchising','الامتياز')],
                      ['service', t('Customer service','خدمة العملاء')],
                    ].map(([k,l]) => (
                      <button type="button" key={k} onClick={() => update('topic', k)} style={{
                        padding: '8px 14px', borderRadius: 999, border: 0, cursor: 'pointer',
                        background: form.topic === k ? 'var(--tc-black)' : 'var(--tc-cream-200)',
                        color: form.topic === k ? 'var(--tc-cream)' : 'var(--tc-black)',
                        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
                        textTransform: 'uppercase', letterSpacing: '0.04em',
                        transition: 'all 140ms',
                      }}>{l}</button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <CField label={t('Full name','الاسم الكامل')} v={form.name} onChange={v => update('name', v)}/>
                  <CField label={t('Email','البريد الإلكتروني')} v={form.email} onChange={v => update('email', v)} type="email"/>
                </div>
                <CField label={t('Country (optional)','البلد (اختياري)')} v={form.country} onChange={v => update('country', v)}/>

                <div style={{ marginTop: 14 }}>
                  <label style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{t('Message','الرسالة')}</label>
                  <textarea value={form.message} onChange={e => update('message', e.target.value)} rows={5}
                    placeholder={t('Tell us how we can help…','أخبرنا كيف يمكننا المساعدة…')}
                    style={{ marginTop: 6, width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid var(--border-2)', background: 'var(--tc-cream-200)', fontFamily: 'var(--font-body)', fontSize: 15, resize: 'vertical', outline: 'none', color: 'var(--tc-black)' }}/>
                </div>

                <button onClick={() => isValid && setSent(true)} disabled={!isValid} className="btn btn-yellow"
                  style={{ marginTop: 20, width: '100%', fontSize: 15, padding: '18px 0', opacity: isValid ? 1 : 0.4, cursor: isValid ? 'pointer' : 'not-allowed' }}>
                  {t('Send message','إرسال الرسالة')} <Icon name="arrowR" size={18}/>
                </button>
                <p style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 12, textAlign: 'center', lineHeight: 1.5 }}>
                  {t('For restaurant-specific issues, please ','للقضايا الخاصة بمطعم معيّن، يُرجى ')}
                  <a onClick={() => go('market')} style={{ color: 'var(--tc-red)', textDecoration: 'underline', cursor: 'pointer' }}>{t('contact your local market','التواصل مع سوقك المحلي')}</a>.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

// Compact contact-form field
function CField({ label, v, onChange, type = 'text', placeholder }) {
  return (
    <div>
      <label style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{label}</label>
      <input value={v} onChange={e => onChange(e.target.value)} type={type} placeholder={placeholder}
        style={{ marginTop: 6, width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border-2)', background: 'var(--tc-cream-200)', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none', color: 'var(--tc-black)' }}/>
    </div>
  );
}

// ============================== App feature icons (animated) ==============================
function AppFeatureIcon({ kind }) {
  const stroke = 'var(--tc-black)';
  const fill = 'none';
  const sw = 2;
  if (kind === 'clock') {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <line className="feat-tick" x1="12" y1="12" x2="12" y2="7" stroke={stroke} strokeWidth={sw}/>
        <line x1="12" y1="12" x2="16" y2="14"/>
      </svg>
    );
  }
  if (kind === 'heart') {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill={stroke} stroke="none">
        <path className="feat-heart" d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6 5c2 0 3.5 1.5 4 2 .5-.5 2-2 4-2 3.5 0 5 4 3.5 7-2.5 4.5-5.5 9-5.5 9z"/>
      </svg>
    );
  }
  if (kind === 'pin') {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <g className="feat-bounce">
          <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3" fill={stroke} stroke="none"/>
        </g>
        <circle className="feat-ripple" cx="12" cy="22" r="6" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0"/>
      </svg>
    );
  }
  if (kind === 'star') {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill={stroke} stroke="none">
        <g className="feat-spin">
          <path d="M12 2.5l2.6 6.2 6.7.5-5.1 4.4 1.6 6.5L12 16.6l-5.8 3.5 1.6-6.5L2.7 9.2l6.7-.5z"/>
        </g>
        {/* shimmer dots */}
        <circle className="feat-shimmer" cx="20" cy="5" r="1" fill={stroke}>
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="5" cy="22" r="0.8" fill={stroke}>
          <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite"/>
        </circle>
      </svg>
    );
  }
  if (kind === 'track') {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        {/* dotted path */}
        <path className="feat-progress" d="M3 18 Q 8 8, 14 12 T 21 6"
              strokeDasharray="60" strokeDashoffset="0" opacity="0.4"/>
        {/* checkpoints */}
        <circle cx="3" cy="18" r="2" fill={stroke} stroke="none"/>
        <circle cx="21" cy="6" r="2.5" fill={stroke} stroke="none"/>
        {/* moving dot */}
        <circle cx="12" cy="11" r="2" fill="var(--tc-red)" stroke="var(--tc-paper)" strokeWidth="1.5">
          <animateMotion dur="2s" repeatCount="indefinite"
            path="M -9 7 Q -4 -3, 2 1 T 9 -5"/>
        </circle>
      </svg>
    );
  }
  if (kind === 'gift') {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <g className="feat-shake">
          {/* box */}
          <rect x="3" y="10" width="18" height="11" rx="1.5"/>
          {/* lid */}
          <rect x="2" y="7" width="20" height="4" rx="1" fill={stroke} stroke="none"/>
          {/* ribbon vertical */}
          <line x1="12" y1="7" x2="12" y2="21" stroke="var(--tc-yellow)" strokeWidth="2.5"/>
          {/* bow loops */}
          <path d="M12 7 C 9 4, 5 4, 7 7 M12 7 C 15 4, 19 4, 17 7" stroke={stroke} strokeWidth="1.8" fill="none"/>
        </g>
      </svg>
    );
  }
  return null;
}

// ============================== APP & REWARDS ==============================
function AppPage() {
  const { go } = useRoute();
  const t = useT();
  return (
    <main className="page" style={{ background: 'var(--tc-cream)' }}>
      <section style={{ background: 'var(--tc-yellow)', padding: '80px 0 96px', overflow: 'hidden', position: 'relative' }}>
        <span className="star" style={{ position: 'absolute', top: '-15%', right: '-5%', width: 420, height: 420, color: 'rgba(154,51,36,0.12)' }}></span>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 48, alignItems: 'center', position: 'relative' }}>
          <div>
            <div className="eyebrow">★ {t('Texas Rewards','مكافآت تكساس')}</div>
            <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: '12px 0 16px' }}>
              {t('Loyalty','الولاء')}<br/>
              <span style={{ color: 'var(--tc-red)' }}>{t('tastes better.','بطعم ألذ.')}</span>
            </h1>
            <p style={{ fontSize: 19, color: 'var(--tc-black)', maxWidth: 540, lineHeight: 1.55 }}>
              {t('Earn a star with every order. Unlock free sides, free combos, and members-only drops. Plus order-ahead, saved favourites, and live order tracking.',
                 'اكسب نجمة مع كل طلب. افتح إضافات مجانية، ووجبات مجانية، وعروض حصرية للأعضاء. بالإضافة إلى الطلب المسبق والمفضلة وتتبّع الطلب مباشرة.')}
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {/* App Store badge */}
              <a href="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                background: 'var(--tc-black)', color: 'var(--tc-cream)',
                padding: '10px 22px 10px 18px', borderRadius: 12,
                textDecoration: 'none', cursor: 'pointer', minWidth: 200,
                transition: 'all 140ms var(--ease-out)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(45,42,38,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Apple logo */}
                <svg width="30" height="36" viewBox="0 0 24 28" fill="currentColor">
                  <path d="M17.05 14.97c-.03-3.16 2.58-4.68 2.7-4.76-1.47-2.15-3.77-2.45-4.59-2.48-1.95-.2-3.81 1.15-4.81 1.15-1 0-2.53-1.13-4.16-1.1-2.14.03-4.11 1.24-5.2 3.14C-1.27 14.83.32 19.6 2.5 22.22c1.09 1.28 2.39 2.72 4.09 2.66 1.65-.07 2.27-1.06 4.27-1.06 1.99 0 2.55 1.06 4.3 1.03 1.78-.03 2.9-1.3 3.98-2.59 1.25-1.49 1.77-2.94 1.8-3.02-.04-.02-3.45-1.32-3.49-5.27zM13.94 5.45c.88-1.08 1.48-2.57 1.32-4.06-1.27.05-2.82.85-3.74 1.92-.81.95-1.53 2.47-1.34 3.93 1.42.11 2.87-.72 3.76-1.79z"/>
                </svg>
                <div>
                  <div style={{ fontSize: 10, opacity: 0.72, lineHeight: 1, letterSpacing: '0.02em' }}>{t('Download on the','حمّل من')}</div>
                  <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif', fontWeight: 600, fontSize: 22, lineHeight: 1.1, marginTop: 3, letterSpacing: '-0.01em' }}>App Store</div>
                </div>
              </a>

              {/* Google Play badge */}
              <a href="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                background: 'var(--tc-black)', color: 'var(--tc-cream)',
                padding: '10px 22px 10px 18px', borderRadius: 12,
                textDecoration: 'none', cursor: 'pointer', minWidth: 200,
                transition: 'all 140ms var(--ease-out)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(45,42,38,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Google Play colored triangle */}
                <svg width="28" height="32" viewBox="0 0 512 512">
                  <path d="M325.3 234.3L104.2 13.39c-7.81-7.81-18.3-12.39-29.39-12.39-1.86 0-3.69.16-5.5.46l239.1 239.1L325.3 234.3z" fill="#EA4335"/>
                  <path d="M104.2 498.6L325.3 277.7l-16.69-16.69L69.32 500.93c1.81.31 3.64.46 5.5.46 11.08 0 21.58-4.58 29.38-12.79z" fill="#34A853"/>
                  <path d="M484.5 222.31L385.32 165.4L309.8 240.9L385.32 316.4L484.5 259.39C504.69 247.92 504.69 233.78 484.5 222.31z" fill="#FBBC04"/>
                  <path d="M51.71 14.69C46.04 21.06 42.66 30.59 42.66 42.5v427.01c0 11.9 3.38 21.44 9.05 27.81L294.43 256 51.71 14.69z" fill="#4285F4"/>
                </svg>
                <div>
                  <div style={{ fontSize: 10, opacity: 0.72, lineHeight: 1, letterSpacing: '0.02em' }}>{t('GET IT ON','احصل عليه من')}</div>
                  <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif', fontWeight: 600, fontSize: 22, lineHeight: 1.1, marginTop: 3, letterSpacing: '-0.01em' }}>Google Play</div>
                </div>
              </a>
            </div>
            <p style={{ marginTop: 16, fontSize: 13, color: 'var(--fg-3)' }}>{t('Availability varies by market.','يختلف التوفر حسب السوق.')} <a onClick={() => go('market')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>{t('Check your country','تحقق من بلدك')}</a>.</p>
          </div>
          <div style={{ position: 'relative', aspectRatio: '4/5' }}>
            {/* Decorative big star behind */}
            <span className="star" style={{ position: 'absolute', top: '4%', left: '-4%', width: 140, height: 140, color: 'rgba(154,51,36,0.18)', animation: 'floatC 5s ease-in-out infinite', pointerEvents: 'none', zIndex: 0 }}></span>
            <span className="star" style={{ position: 'absolute', bottom: '8%', right: '6%', width: 70, height: 70, color: 'rgba(45,42,38,0.18)', animation: 'floatC 6s ease-in-out infinite 1s', pointerEvents: 'none', zIndex: 0 }}></span>
            {/* Phone */}
            <div style={{ position: 'absolute', inset: '5% 18%', borderRadius: 38, background: 'var(--tc-black)', padding: 8, boxShadow: '0 32px 80px rgba(45,42,38,0.4)', transform: 'rotate(-4deg)', zIndex: 1 }}>
              <div style={{ background: 'var(--tc-cream)', borderRadius: 30, height: '100%', padding: 14, display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
                {/* Status bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 6px', fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--tc-black)', opacity: 0.6 }}>
                  <span>9:41</span>
                  <span>● ● ● ●</span>
                </div>

                {/* Member card */}
                <div style={{ background: 'linear-gradient(135deg, #9a3324 0%, #5a1e14 100%)', borderRadius: 16, padding: 14, color: 'var(--tc-cream)', position: 'relative', overflow: 'hidden' }}>
                  <span className="star" style={{ position: 'absolute', right: -8, top: -8, width: 60, height: 60, color: 'rgba(245,181,30,0.18)' }}></span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.85 }}>Texas Rewards</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 16, textTransform: 'uppercase', marginTop: 2 }}>Sarah · Gold</div>
                    </div>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--tc-yellow)', color: 'var(--tc-black)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 12 }}>S</div>
                  </div>
                  <div style={{ marginTop: 12, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 13, letterSpacing: '0.1em', color: 'var(--tc-yellow)' }}>★★★★★★★☆☆☆</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 6 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.85 }}>7 / 10 stars</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 10, color: 'var(--tc-yellow)' }}>3 more · free side</span>
                  </div>
                </div>

                {/* Available reward */}
                <div style={{ background: 'var(--tc-yellow)', borderRadius: 12, padding: 10, color: 'var(--tc-black)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--tc-black)', color: 'var(--tc-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>★</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Free Honey-Butter Biscuits</div>
                    <div style={{ fontSize: 9, opacity: 0.75 }}>Available · expires in 14 days</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 9, padding: '4px 8px', background: 'var(--tc-black)', color: 'var(--tc-yellow)', borderRadius: 999 }}>REDEEM</div>
                </div>

                {/* Recent order — reorder */}
                <div style={{ background: 'var(--tc-paper)', borderRadius: 12, padding: 10, boxShadow: 'var(--inset-hair)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #f6c63a, #9a3324)', flexShrink: 0 }}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, textTransform: 'uppercase' }}>Tenders Combo</div>
                    <div style={{ fontSize: 9, color: 'var(--fg-3)' }}>City Stars · 12 min · +1 ★</div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11 }}>EGP 145</span>
                </div>

                {/* Tier progress */}
                <div style={{ background: 'var(--tc-paper)', borderRadius: 12, padding: 10, boxShadow: 'var(--inset-hair)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Next tier: Platinum</span>
                    <span style={{ fontSize: 9, color: 'var(--fg-3)' }}>32 / 50</span>
                  </div>
                  <div style={{ height: 5, background: 'var(--tc-cream-300)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '64%', background: 'var(--tc-red)', borderRadius: 999 }}/>
                  </div>
                </div>

                {/* CTA */}
                <button style={{ background: 'var(--tc-red)', color: 'var(--tc-cream)', border: 0, padding: '11px 0', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, textTransform: 'uppercase', borderRadius: 999, letterSpacing: '0.06em', marginTop: 'auto' }}>
                  Reorder · EGP 145
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--tc-cream)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          @keyframes appTick { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(40deg); } }
          @keyframes appPulse { 0%, 100% { transform: scale(1); } 30% { transform: scale(1.18); } 60% { transform: scale(0.95); } }
          @keyframes appRipple { 0% { r: 6; opacity: 0.6; } 100% { r: 18; opacity: 0; } }
          @keyframes appBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
          @keyframes appSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes appShimmer { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
          @keyframes appProgress { 0% { stroke-dashoffset: 60; } 100% { stroke-dashoffset: 0; } }
          @keyframes appShake { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-6deg); } 75% { transform: rotate(6deg); } }

          .feat-card { transition: all 220ms var(--ease-out); }
          .feat-card:hover { transform: translateY(-4px); box-shadow: var(--inset-hair), var(--shadow-3); }
          .feat-card:hover .feat-tick { animation: appTick 1.2s ease-in-out infinite; transform-origin: 12px 12px; }
          .feat-card:hover .feat-heart { animation: appPulse 0.8s ease-in-out infinite; transform-origin: center; }
          .feat-card:hover .feat-ripple { animation: appRipple 1.4s ease-out infinite; }
          .feat-card:hover .feat-bounce { animation: appBounce 1s ease-in-out infinite; }
          .feat-card:hover .feat-spin { animation: appSpin 2s linear infinite; transform-origin: center; }
          .feat-card:hover .feat-progress { animation: appProgress 1.6s ease-in-out infinite; }
          .feat-card:hover .feat-shake { animation: appShake 0.5s ease-in-out infinite; transform-origin: 12px 16px; }
          .feat-card .feat-icon-bg { transition: all 220ms var(--ease-out); }
          .feat-card:hover .feat-icon-bg { transform: scale(1.08) rotate(-3deg); box-shadow: 0 12px 28px rgba(245,181,30,0.4); }
        `}</style>
        <div className="container">
          <div className="eyebrow">★ {t('What you get','ما ستحصل عليه')}</div>
          <h2 className="display-2" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '12px 0 48px' }}>{t('App features.','مزايا التطبيق.')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { kind: 'clock',    t: t('Order ahead','اطلب مسبقًا'),       d: t('Skip the line. Pick up at the counter or drive-thru.','تجاوز الطابور. استلم من الكاونتر أو السيارة.') },
              { kind: 'heart',    t: t('Save favourites','احفظ المفضلة'),  d: t('One-tap reorder your usual.','أعد طلب وجبتك المعتادة بنقرة واحدة.') },
              { kind: 'pin',      t: t('Find restaurants','اعثر على المطاعم'), d: t('Hours, drive-thru, dine-in, all in your area.','الساعات والخدمة من السيارة والتناول داخل المطعم — في منطقتك.') },
              { kind: 'star',     t: t('Texas Rewards','مكافآت تكساس'),    d: t('Earn a star with every order.','اكسب نجمة مع كل طلب.') },
              { kind: 'track',    t: t('Order tracking','تتبّع الطلب'),     d: t('Real-time updates from kitchen to pickup.','تحديثات حية من المطبخ إلى الاستلام.') },
              { kind: 'gift',     t: t('Member-only deals','عروض حصرية للأعضاء'), d: t('App-only LTOs and surprise drops.','عروض مؤقتة حصرية للتطبيق ومفاجآت متجددة.') },
            ].map(f => (
              <div key={f.kind} className="feat-card" style={{ background: 'var(--tc-paper)', borderRadius: 'var(--radius-xl)', padding: 28, boxShadow: 'var(--inset-hair)', cursor: 'default' }}>
                <div className="feat-icon-bg" style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--tc-yellow)', color: 'var(--tc-black)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <AppFeatureIcon kind={f.kind}/>
                </div>
                <h3 className="display-2" style={{ fontSize: 22, margin: '16px 0 8px' }}>{f.t}</h3>
                <p style={{ color: 'var(--fg-3)', fontSize: 14, lineHeight: 1.5, margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards anchor */}
      <section id="rewards" style={{ background: 'var(--tc-red)', color: 'var(--tc-cream)', padding: '96px 0' }}>
        <div className="container">
          <div className="eyebrow on-dark">★ {t('Texas Rewards','مكافآت تكساس')}</div>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', margin: '12px 0 16px', color: 'var(--tc-cream)' }}>
            {t('How it works.','كيف تعمل.')}
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(250,246,239,0.85)', maxWidth: 640, marginBottom: 56 }}>
            {t('Stars are earned per order. Spend them as rewards. Status unlocks at 50 stars and resets annually.',
               'تُكسب النجوم مع كل طلب. استبدلها بمكافآت. المستوى يُفتح عند ٥٠ نجمة ويُعاد ضبطه سنويًا.')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { n: '01', t: t('Order anywhere','اطلب من أي مكان'), d: t('Earn 1 star per order through the app or in-store.','اكسب نجمة مع كل طلب عبر التطبيق أو داخل المطعم.') },
              { n: '02', t: t('Hit your goal','حقّق هدفك'), d: t('Cash in 10 stars for a free side. 25 stars for a free combo.','استبدل ١٠ نجوم بإضافة مجانية. ٢٥ نجمة بوجبة مجانية.') },
              { n: '03', t: t('Unlock status','افتح المستوى'), d: t('Reach 50 stars: bigger rewards, surprise drops, birthday gift.','وصول لـ ٥٠ نجمة: مكافآت أكبر، عروض مفاجئة، وهدية عيد ميلاد.') },
            ].map(s => (
              <div key={s.n} style={{ background: 'rgba(250,246,239,0.06)', borderRadius: 'var(--radius-xl)', padding: 32, border: '1px solid rgba(250,246,239,0.1)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 64, color: 'var(--tc-yellow)', lineHeight: 0.9, letterSpacing: '-0.02em' }}>{s.n}</div>
                <h3 className="display-2" style={{ fontSize: 24, margin: '16px 0 8px', color: 'var(--tc-cream)' }}>{s.t}</h3>
                <p style={{ color: 'rgba(250,246,239,0.75)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================== FAQS ==============================
function FAQsPage() {
  const { go } = useRoute();
  const t = useT();
  const [openItem, setOpenItem] = useState('brand-0');
  const cats = [
    { id: 'brand', label: t('About the brand','عن العلامة'), faqs: [
      { q: t("What's the difference between Texas Chicken and Church's Texas Chicken?",'ما الفرق بين تكساس تشيكن وتشيرتشز تكساس تشيكن؟'), a: t("They're the same brand, same recipe. We use Church's Texas Chicken across the Americas (US, Mexico) and Texas Chicken across the rest of the world.",'هما نفس العلامة، ونفس الوصفة. نستخدم تشيرتشز تكساس تشيكن في الأمريكتين (أمريكا والمكسيك) وتكساس تشيكن في باقي العالم.') },
      { q: t('Where was Texas Chicken founded?','أين تأسست تكساس تشيكن؟'), a: t('San Antonio, Texas, in 1952. The original location was directly across the street from the Alamo.','في سان أنطونيو، تكساس، عام ١٩٥٢. كان الموقع الأصلي في مواجهة قلعة الألامو مباشرة.') },
    ]},
    { id: 'menu', label: t('Menu & allergens','القائمة والحساسية'), faqs: [
      { q: t('Do you have allergen information for your menu?','هل لديكم معلومات الحساسية للقائمة؟'), a: t("Allergen and nutrition details vary by market and supplier. Please visit your local market's website to see the most accurate information for the items served in your country.",'تختلف معلومات الحساسية والقيمة الغذائية حسب السوق والمورد. يُرجى زيارة موقع سوقك المحلي لأحدث المعلومات عن المنتجات في بلدك.') },
      { q: t('Are your restaurants halal?','هل مطاعمكم حلال؟'), a: t('Yes, all Texas Chicken restaurants across MENA and Southeast Asia are halal certified by local certification authorities.','نعم، جميع مطاعم تكساس تشيكن في الشرق الأوسط وشمال أفريقيا وجنوب شرق آسيا حلال ومعتمدة من جهات الاعتماد المحلية.') },
      { q: t('Is the chicken really hand-battered?','هل الدجاج فعلًا مخفوق يدويًا؟'), a: t('Yes. Every single piece. In every single restaurant. No partially cooked, factory-coated supply.','نعم. كل قطعة. في كل مطعم. لا دجاج نصف مطهي أو مغلَّف في المصنع.') },
    ]},
    { id: 'app', label: t('App & rewards','التطبيق والمكافآت'), faqs: [
      { q: t('Is the app available in my country?','هل التطبيق متاح في بلدي؟'), a: t('App availability and the Texas Rewards programme vary by market. Check your country site or visit Find your market.','تتوفر التطبيق وبرنامج مكافآت تكساس حسب السوق. تحقق من موقع بلدك أو من صفحة اعثر على سوقك.') },
      { q: t('Do my stars expire?','هل تنتهي صلاحية نجومي؟'), a: t("Unused stars expire 12 months after they're earned. Status resets every 12 months on your enrollment date.",'تنتهي صلاحية النجوم غير المستخدمة بعد ١٢ شهرًا من كسبها. يُعاد ضبط المستوى كل ١٢ شهرًا من تاريخ اشتراكك.') },
    ]},
    { id: 'franchise', label: t('Franchising','الامتياز'), faqs: [
      { q: t('How do I apply to be a franchisee?','كيف أتقدّم لأكون صاحب امتياز؟'), a: t('Visit the Franchising page and submit an inquiry form. We respond within 5 business days.','زر صفحة الامتياز وقدّم نموذج استفسار. سنردّ خلال ٥ أيام عمل.') },
      { q: t("What's the minimum investment?",'ما الحد الأدنى للاستثمار؟'), a: t('Initial investment varies by territory and format. Build-out typically ranges from $450k to $1.2M per restaurant. Master franchise agreements have separate requirements.','يختلف الاستثمار الأولي حسب المنطقة والصيغة. تتراوح تكاليف الإنشاء عادةً بين ٤٥٠ ألف و١٫٢ مليون دولار للمطعم. لاتفاقيات الامتياز الرئيسي متطلبات منفصلة.') },
    ]},
    { id: 'careers', label: t('Careers','الوظائف'), faqs: [
      { q: t('Do I apply to a specific restaurant or to corporate?','هل أتقدّم لمطعم معيّن أم للشركة؟'), a: t("Both routes are listed on the Careers page — filter by Restaurant or Corporate. Restaurant roles are managed by your local franchisee or operator.",'كلا المسارين مدرجان في صفحة الوظائف — صنّف حسب مطعم أو شركة. يدير وظائف المطاعم صاحب الامتياز أو المشغّل المحلي.') },
    ]},
  ];

  return (
    <main className="page">
      <section style={{ background: 'var(--tc-cream)', padding: '64px 0 32px' }}>
        <div className="container">
          <div className="eyebrow">★ {t('FAQs','الأسئلة الشائعة')}</div>
          <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 112px)', margin: '12px 0 16px' }}>
            {t('Quick answers.','إجابات سريعة.')}<br/>
            <span style={{ color: 'var(--tc-red)' }}>{t('No fluff.','بلا حشو.')}</span>
          </h1>
        </div>
      </section>

      <section style={{ background: 'var(--tc-cream)', padding: '32px 0 96px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48 }}>
          <aside>
            <div style={{ position: 'sticky', top: 120 }}>
              {cats.map(c => (
                <a key={c.id} href={`#cat-${c.id}`} style={{
                  display: 'block', padding: '10px 14px', borderRadius: 8,
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
                  textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer',
                  color: 'var(--tc-black)', marginBottom: 2,
                  transition: 'background 140ms',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--tc-paper)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >{c.label}</a>
              ))}
            </div>
          </aside>
          <div>
            {cats.map(cat => (
              <div key={cat.id} id={`cat-${cat.id}`} style={{ marginBottom: 48 }}>
                <h2 className="display-2" style={{ fontSize: 36, margin: '0 0 20px' }}>{cat.label}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {cat.faqs.map((f, i) => {
                    const id = `${cat.id}-${i}`;
                    const isOpen = openItem === id;
                    return (
                      <div key={id} style={{ background: 'var(--tc-paper)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--inset-hair)' }}>
                        <button onClick={() => setOpenItem(isOpen ? null : id)} style={{
                          width: '100%', textAlign: 'left', padding: '20px 24px',
                          background: 'transparent', border: 0, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17,
                          textTransform: 'uppercase', letterSpacing: '0.01em',
                        }}>
                          {f.q}
                          <span style={{ transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 220ms var(--ease-out)', flexShrink: 0 }}>
                            <Icon name="plus" size={20}/>
                          </span>
                        </button>
                        {isOpen && (
                          <div style={{ padding: '0 24px 22px', fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.55, animation: 'fadeUp 200ms var(--ease-out)' }}>
                            {f.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================== Privacy / Terms / Sitemap ==============================
function LegalPage({ kind }) {
  const titles = {
    privacy: ['Privacy policy', 'How we handle your data.'],
    terms: ['Terms & conditions', 'The fine print.'],
    sitemap: ['Sitemap', 'Everything we have, in one place.'],
  };
  const [title, sub] = titles[kind];
  const { go } = useRoute();

  if (kind === 'sitemap') {
    const sections = [
      { t: 'Brand & consumer', links: [['Homepage','home'],['Menu','menu'],['Our Story','story'],['Leadership','leadership'],['Community','community'],['News','news'],['App & Rewards','app'],['Find your market','market']] },
      { t: 'Business & corporate', links: [['Franchising','franchising'],['Careers','careers'],['Contact us','contact']] },
      { t: 'Utility', links: [['FAQs','faqs'],['Privacy','privacy'],['Terms','terms'],['Sitemap','sitemap']] },
    ];
    return (
      <main className="page">
        <section style={{ background: 'var(--tc-cream)', padding: '64px 0' }}>
          <div className="container">
            <div className="eyebrow">★ {title}</div>
            <h1 className="display" style={{ fontSize: 'clamp(48px, 6.5vw, 96px)', margin: '12px 0 32px' }}>{sub}</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {sections.map(s => (
                <div key={s.t}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tc-red)', marginBottom: 16 }}>{s.t}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {s.links.map(([l, id]) => (
                      <li key={l}><a onClick={() => go(id)} style={{ cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, textTransform: 'uppercase', color: 'var(--tc-black)' }}>{l}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section style={{ background: 'var(--tc-cream)', padding: '64px 0 96px' }}>
        <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
          <div className="eyebrow">★ {title}</div>
          <h1 className="display-2" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '12px 0 24px' }}>{sub}</h1>
          <div style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.7 }}>
            <p>This is a placeholder for the {title.toLowerCase()} content. The production version is reviewed by legal and reflects current data-handling practices across our markets.</p>
            <p>Customer service issues — including data-deletion requests, complaints about a specific restaurant, or queries about your order — are handled by the local Texas Chicken team in your country. <a onClick={() => go('market')} style={{ color: 'var(--tc-red)', textDecoration: 'underline', cursor: 'pointer' }}>Find your market</a>.</p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, textTransform: 'uppercase', marginTop: 32, marginBottom: 12 }}>Trademark notice</h3>
            <p>Texas Chicken™ and Church's Texas Chicken™ are operated under licence by Cajun Operating Company. Church's Texas Chicken™ refers to the United States and Mexico brand; Texas Chicken™ refers to the international brand outside the Americas.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { CareersPage, ContactPage, AppPage, FAQsPage, LegalPage });
