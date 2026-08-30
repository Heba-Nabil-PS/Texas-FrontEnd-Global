/* global React */
// Bilingual helper. Usage:
//   const t = useT();
//   t('Menu', 'القائمة')
// Or simply:
//   <T en="Menu" ar="القائمة"/>

const I18nCtx = React.createContext('ltr');

function useT() {
  const dir = React.useContext(I18nCtx);
  return (en, ar) => (dir === 'rtl' && ar ? ar : en);
}

function T({ en, ar }) {
  const t = useT();
  return <>{t(en, ar)}</>;
}

// Convenience: returns the right value for the current dir
function tx(dir, en, ar) {
  return dir === 'rtl' && ar ? ar : en;
}

Object.assign(window, { I18nCtx, useT, T, tx });
