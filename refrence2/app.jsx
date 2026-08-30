/* global React, ReactDOM */

const { useState: useStateApp, useEffect: useEffectApp, useCallback: useCallbackApp } = React;

function App() {
  const [tweaks, setTweaksRaw] = useStateApp({ ...(window.TC_DEFAULTS || {}) });
  const [page, setPage] = useStateApp(() => {
    try { return localStorage.getItem('tc_page') || 'home'; } catch (e) { return 'home'; }
  });

  const setTweak = useCallbackApp((a, b) => {
    setTweaksRaw(prev => {
      const next = typeof a === 'string' ? { ...prev, [a]: b } : { ...prev, ...a };
      try {
        window.parent.postMessage({
          type: '__edit_mode_set_keys',
          edits: typeof a === 'string' ? { [a]: b } : a,
        }, '*');
      } catch (e) {}
      return next;
    });
  }, []);

  const go = useCallbackApp((id) => {
    const known = ['home','menu','market','story','leadership','community','news','franchising','app','careers','contact','faqs','privacy','terms','sitemap'];
    const next = known.includes(id) ? id : 'home';
    try { localStorage.setItem('tc_page', next); } catch (e) {}
    setPage(next);
  }, []);

  // Expose `go` globally so the Tweaks quick-jump can navigate
  useEffectApp(() => { window.__tcGo = go; }, [go]);

  // Scroll to top on page change
  useEffectApp(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [page]);

  // Apply RTL direction
  useEffectApp(() => {
    document.documentElement.dir = tweaks.dir || 'ltr';
    document.documentElement.lang = tweaks.dir === 'rtl' ? 'ar' : 'en';
  }, [tweaks.dir]);

  const route = { page, go, market: tweaks.market };

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage tweaks={tweaks}/>;
      case 'market': return <MarketPage tweaks={tweaks} setTweak={setTweak}/>;
      case 'menu': return <MenuPage/>;
      case 'story': return <StoryPage/>;
      case 'leadership': return <LeadershipPage/>;
      case 'community': return <CommunityPage/>;
      case 'news': return <NewsPage/>;
      case 'franchising': return <FranchisingPage/>;
      case 'careers': return <CareersPage/>;
      case 'contact': return <ContactPage/>;
      case 'app': return <AppPage/>;
      case 'faqs': return <FAQsPage/>;
      case 'privacy': return <LegalPage kind="privacy"/>;
      case 'terms': return <LegalPage kind="terms"/>;
      case 'sitemap': return <LegalPage kind="sitemap"/>;
      default: return <HomePage tweaks={tweaks}/>;
    }
  };

  return (
    <RouteCtx.Provider value={route}>
      <I18nCtx.Provider value={tweaks.dir || 'ltr'}>
        <Header tweaks={tweaks} setTweak={setTweak}/>
        {renderPage()}
        <Footer/>
        <TweaksWrapper tweaks={tweaks} setTweak={setTweak}/>
      </I18nCtx.Provider>
    </RouteCtx.Provider>
  );
}

function TweaksWrapper({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Market">
        <TweakSelect
          value={tweaks.market}
          onChange={v => setTweak('market', v)}
          options={FLAT_MARKETS.filter(m => m.status === 'live').map(m => ({ value: m.name, label: `${m.flag}  ${m.name}` }))}
        />
        <TweakToggle
          label="Promo strip"
          value={tweaks.showPromoStrip}
          onChange={v => setTweak('showPromoStrip', v)}
        />
      </TweakSection>

      <TweakSection label="Quick jump">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[
            ['home', 'Home'], ['market', 'Markets'], ['menu', 'Menu'], ['story', 'Story'],
            ['community', 'Community'], ['news', 'News'], ['franchising', 'Franchise'],
            ['careers', 'Careers'], ['app', 'App'], ['contact', 'Contact'], ['faqs', 'FAQs'], ['sitemap', 'Sitemap'],
          ].map(([id, l]) => (
            <button key={id} onClick={() => window.__tcGo && window.__tcGo(id)} style={{
              padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border-2)',
              background: 'var(--tc-paper)', color: 'var(--tc-black)', cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11,
              textTransform: 'uppercase', letterSpacing: '0.04em',
            }}>{l}</button>
          ))}
        </div>
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
