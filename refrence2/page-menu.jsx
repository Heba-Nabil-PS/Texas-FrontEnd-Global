/* global React */
// Menu — brand-showcase, not a transactional product list

function MenuPage() {
  const { go } = useRoute();
  const t = useT();
  const [activeCat, setActiveCat] = useState('signatures');

  const cats = [
    { id: 'signatures', label: t('The Originals','الأصلي'), tagline: t('Hand-battered. Made fresh.','مخفوق يدويًا. طازج.') },
    { id: 'tendersized', label: t('Texas-Sized','حجم تكساس'), tagline: t('Buckets, boxes, & family combos.','دلاء، علب، ووجبات عائلية.') },
    { id: 'sandwiches', label: t('Sandwiches','ساندويتشات'), tagline: t('Crispy chicken between two buns.','دجاج مقرمش بين خبزتين.') },
    { id: 'sides', label: t('Sides That Steal The Show','إضافات تخطف الأنظار'), tagline: t('Mash, slaw, biscuits, & more.','بطاطس مهروسة، سَلَطة، بسكويت، والمزيد.') },
    { id: 'sauces', label: t('Sauce It Up','صلصات'), tagline: t('Six sauces. One mission.','ست صلصات. مهمة واحدة.') },
  ];

  const items = {
    signatures: [
      { name: 'Original Crispy Chicken', desc: 'Hand-battered in our 1952 spice blend. Fried fresh, every time.', bg: 'linear-gradient(135deg, #f5b51e, #c4860c, #9a3324)' },
      { name: 'Spicy Crispy Chicken', desc: 'Same crunch. Texan heat. Cayenne, paprika, smoke.', bg: 'linear-gradient(135deg, #e15f02, #9a3324, #5a1e14)' },
      { name: 'Honey-Butter Biscuits', desc: 'Buttery, flaky, with a honey glaze. The reason people come back.', bg: 'linear-gradient(135deg, #f6c63a, #e0a30c, #b87a08)' },
    ],
    tendersized: [
      { name: '12-Piece Family Bucket', desc: 'Original or Spicy · Feeds 4–5 · Add biscuits.', bg: 'linear-gradient(135deg, #9a3324, #5a1e14)' },
      { name: 'Mega Tenders Box', desc: '8 hand-breaded tenders, 2 sides, 4 dips.', bg: 'linear-gradient(135deg, #f5b51e, #9a3324)' },
      { name: 'Texan Feast', desc: '16 pieces, 4 biscuits, 3 sides, 6 sauces. The full Texan.', bg: 'linear-gradient(135deg, #2d2a26, #9a3324)' },
    ],
    sandwiches: [
      { name: 'Original Chicken Sandwich', desc: 'Crispy fillet, pickles, brioche.', bg: 'linear-gradient(135deg, #f5b51e, #e0a30c)' },
      { name: 'Spicy Habanero Sandwich', desc: 'Habanero glaze, jalapeño slaw, pepper jack.', bg: 'linear-gradient(135deg, #e15f02, #9a3324)' },
      { name: 'Texas BBQ Burger', desc: 'BBQ sauce, crispy onions, smoked cheddar.', bg: 'linear-gradient(135deg, #5a1e14, #2d2a26)' },
    ],
    sides: [
      { name: 'Cajun Fries', desc: 'Seasoned, crisp, golden.', bg: 'linear-gradient(135deg, #f6c63a, #b87a08)' },
      { name: 'Creamy Coleslaw', desc: 'Fresh-shredded daily.', bg: 'linear-gradient(135deg, #e8dfcc, #c4860c)' },
      { name: 'Mac & Cheese', desc: 'Three cheese. Texas-creamy.', bg: 'linear-gradient(135deg, #f5b51e, #e15f02)' },
    ],
    sauces: [
      { name: 'Original Ranch', desc: 'House recipe. Cool, creamy.', bg: 'linear-gradient(135deg, #fffdf7, #e8dfcc)' },
      { name: 'Honey-Mustard', desc: 'Sweet and tangy.', bg: 'linear-gradient(135deg, #f6c63a, #e0a30c)' },
      { name: 'Texan Hot', desc: 'Cayenne kick. Not for the timid.', bg: 'linear-gradient(135deg, #e15f02, #9a3324)' },
    ],
  };

  return (
    <main className="page" style={{ background: 'var(--tc-cream)' }}>
      {/* Hero — signature item */}
      <section style={{ background: 'var(--tc-black)', color: 'var(--tc-cream)', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center', padding: '80px 32px 96px' }}>
          <div>
            <div className="eyebrow on-dark">★ {t('Signature','المميز')}</div>
            <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 112px)', margin: '12px 0 0', color: 'var(--tc-cream)' }}>
              {t('Original.','الأصلي.')}<br/>{t('Spicy.','الحار.')}<br/>
              <span style={{ color: 'var(--tc-yellow)' }}>{t('Plus biscuits.','مع البسكويت.')}</span>
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(250,246,239,0.8)', lineHeight: 1.5, maxWidth: 520, marginTop: 24 }}>
              {t('Every piece of chicken is hand-battered in our 1952 spice blend and fried fresh inside the restaurant. Pair it with our Honey-Butter Biscuits — the way it\'s been done in Texas for 72 years.',
                 'كل قطعة دجاج مخفوقة يدويًا بخلطة توابلنا منذ ١٩٥٢ ومقلية طازجة داخل المطعم. تناولها مع بسكويت العسل والزبدة — كما هو الحال في تكساس منذ ٧٢ عامًا.')}
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
              <button onClick={() => go('market')} className="btn btn-yellow">
                <Icon name="pin" size={18}/> {t('Find it near you','اعثر عليها بالقرب منك')}
              </button>
            </div>
          </div>
          <div style={{ position: 'relative', aspectRatio: '1/1' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden',
              background: 'radial-gradient(circle at 35% 35%, #f6c63a 0%, #e0a30c 35%, #9a3324 75%, #5a1e14 100%)',
              boxShadow: '0 40px 100px rgba(154,51,36,0.4)', }}>
              <image-slot
                id="menu-hero-signature"
                shape="circle"
                data-on-dark=""
                placeholder="Drop a signature chicken shot"
                style={{ width: '100%', height: '100%', display: 'block' }}
              ></image-slot>
            </div>
            <span className="star" style={{ position: 'absolute', top: '6%', left: '6%', width: 72, height: 72, color: 'var(--tc-yellow)', pointerEvents: 'none' }}></span>
          </div>
        </div>
      </section>

      {/* Texas story strip */}
      <section style={{ background: 'var(--tc-yellow)', color: 'var(--tc-black)', overflow: 'hidden', padding: '24px 0' }}>
        <div className="marquee" style={{ whiteSpace: 'nowrap', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 56, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
          {Array.from({length: 6}).map((_,i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
              {t('Hand-battered','مخفوق يدويًا')} <span className="star" style={{ width: 36, height: 36, color: 'var(--tc-red)' }}></span>
              {t('Made fresh','طازج')} <span className="star" style={{ width: 36, height: 36, color: 'var(--tc-red)' }}></span>
              {t('Since 1952','منذ ١٩٥٢')} <span className="star" style={{ width: 36, height: 36, color: 'var(--tc-red)' }}></span>
            </span>
          ))}
        </div>
      </section>

      {/* Category tabs */}
      <section style={{ background: 'var(--tc-cream)', padding: '64px 0 32px', position: 'sticky', top: 80, zIndex: 20, backdropFilter: 'blur(20px)', backgroundColor: 'rgba(250,246,239,0.94)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
            {cats.map(c => (
              <button key={c.id} onClick={() => setActiveCat(c.id)} style={{
                padding: '12px 22px', borderRadius: 999, border: 0,
                background: activeCat === c.id ? 'var(--tc-black)' : 'var(--tc-paper)',
                color: activeCat === c.id ? 'var(--tc-cream)' : 'var(--tc-black)',
                boxShadow: activeCat === c.id ? 'none' : 'var(--inset-hair)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
                textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer',
                whiteSpace: 'nowrap', transition: 'all 140ms var(--ease-out)',
              }}>{c.label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Items grid */}
      <section style={{ background: 'var(--tc-cream)', padding: '32px 0 96px' }}>
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <h2 className="display-2" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '0 0 6px' }}>{cats.find(c=>c.id===activeCat).label}</h2>
            <p style={{ color: 'var(--fg-3)', fontSize: 17, margin: 0 }}>{cats.find(c=>c.id===activeCat).tagline}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {items[activeCat].map((it, i) => (
              <article key={it.name} style={{
                background: 'var(--tc-paper)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden',
                boxShadow: 'var(--inset-hair), var(--shadow-1)',
                transition: 'all 220ms var(--ease-out)', cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--inset-hair), var(--shadow-3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--inset-hair), var(--shadow-1)'; }}
              >
                <div style={{ aspectRatio: '5/4', background: it.bg, position: 'relative', overflow: 'hidden' }}>
                  <image-slot
                    id={`menu-${activeCat}-${i}`}
                    shape="rounded"
                    radius="0"
                    data-on-dark=""
                    placeholder={`Drop ${it.name.toLowerCase()} photo`}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                  ></image-slot>
                  {i === 0 && (
                    <span style={{ position: 'absolute', top: 16, left: 16, zIndex: 1,
                      background: 'var(--tc-black)', color: 'var(--tc-yellow)',
                      padding: '6px 12px', borderRadius: 999,
                      fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11,
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>★ {t('Most loved','الأكثر طلبًا')}</span>
                  )}
                </div>
                <div style={{ padding: '24px 24px 28px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, textTransform: 'uppercase', margin: 0, letterSpacing: '-0.01em' }}>{it.name}</h3>
                  <p style={{ marginTop: 8, color: 'var(--fg-3)', fontSize: 14, lineHeight: 1.5 }}>{it.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Find it CTA band */}
      <section style={{ background: 'var(--tc-red)', color: 'var(--tc-cream)', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <span className="star" style={{ position: 'absolute', top: '-15%', left: '-5%', width: 320, height: 320, color: 'rgba(245,181,30,0.1)' }}></span>
        <span className="star" style={{ position: 'absolute', bottom: '-25%', right: '-5%', width: 360, height: 360, color: 'rgba(245,181,30,0.1)' }}></span>
        <div className="container" style={{ position: 'relative' }}>
          <div className="eyebrow on-dark">★ {t('Hungry yet?','جائع؟')}</div>
          <h2 className="display" style={{ fontSize: 'clamp(48px, 7vw, 96px)', margin: '12px auto 24px', color: 'var(--tc-cream)' }}>
            {t('Menus, prices & hours','القوائم والأسعار والساعات')}<br/>{t('vary by market.','تختلف حسب السوق.')}
          </h2>
          <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.5 }}>
            {t('Pick your country to see the full menu, allergens, and nutrition for your local restaurant.',
               'اختر بلدك لعرض القائمة الكاملة ومعلومات الحساسية والقيمة الغذائية لمطعمك المحلي.')}
          </p>
          <button onClick={() => go('market')} className="btn btn-yellow" style={{ fontSize: 16, padding: '20px 36px' }}>
            <Icon name="pin" size={18}/> {t('Find your market','اعثر على سوقك')}
          </button>
        </div>
      </section>

      {/* Allergens note */}
      <section style={{ background: 'var(--tc-cream)', padding: '40px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.6 }}>
            Allergen and nutrition details vary by market and supplier. Visit your <a onClick={() => go('market')} style={{ color: 'var(--tc-red)', textDecoration: 'underline', cursor: 'pointer' }}>local market site</a> for the most accurate information for items served in your country, or read our <a onClick={() => go('faqs')} style={{ color: 'var(--tc-red)', textDecoration: 'underline', cursor: 'pointer' }}>FAQs</a>.
          </p>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { MenuPage });
