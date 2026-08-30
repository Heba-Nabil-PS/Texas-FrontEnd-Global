"use client";

import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import "./acctoolbar.css";

// Stable no-op subscribe: the value never changes after the initial
// server (false) -> client (true) transition.
const emptySubscribe = () => () => {};

const DEFAULT_APP_STATE = {
  bodyClassList: {},
  fontSize: 1,
  imagesTitle: false,
  keyboardRoot: false,
  initFontSize: false,
};

// Lazy `useState` initializers: read browser-only storage once, on the client.
// They run during SSR too (returning defaults), but the component renders
// `null` until mounted, so there is no hydration mismatch.
const readStoredAccess = () => {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("PSDIGITALACCESS");
  return stored ? Boolean(JSON.parse(stored)?.enabled) : false;
};

const readStoredAppState = () => {
  if (typeof window === "undefined") return DEFAULT_APP_STATE;
  const stored = localStorage.getItem("MICTOOLBOXAPPSTATE");
  return stored ? JSON.parse(stored) : DEFAULT_APP_STATE;
};

const AccessibilityToolbar = ({
  link = "",
  contact = "",
  buttonPosition = "left",
  forceLang = "",
  resources = {},
}) => {
  const [isAccessEnabled, setIsAccessEnabled] = useState(readStoredAccess);
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);
  // false during SSR and the first hydration render, true on the client
  // afterwards — avoids an SSR hydration mismatch without setState-in-effect.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [appState, setAppState] = useState(readStoredAppState);

  // Locale texts — derived purely from `resources`, so memoize on it.
  const locale = useMemo(
    () => ({
      en: {
      btn_open: resources["enable-accessibility"] || "Enable Accessibility",
      btn_close:
        resources["exit-accessibility-mode"] || "Exit Accessibility Mode",
      keyboard_root: resources["keyboard-navigation"] || "keyboard navigation",
      disable_animations: resources["block-animations"] || "block animations",
      access_declaration:
        resources["accessibility-statement"] || "accessibility statement",
      debug_contacts:
        resources["report-an-accessibility-problem"] ||
        "report an accessibility problem",
      reset_all_settings: resources["reset-settings"] || "reset settings",
      image_without_alt:
        resources["image-without-text"] || "image without text",
      contrast_block: {
        header: resources["color-contrast"] || "color contrast",
        btn_monochrome:
          resources["uncolored-display"] || "uncolored<br>display",
        btn_bright: resources["bright-contrast"] || "bright<br>contrast",
        btn_invert: resources["dark-mode"] || "Dark<br>Mode",
      },
      text_block: {
        header: resources["text-size"] || "text size",
        btn_font_up: resources["increase-text"] || "increase<br>text",
        btn_font_down: resources["decrease-text"] || "decrease<br>text",
        btn_font_readable: resources["readable-text"] || "readable<br>text",
        btn_text_spacing: resources["text-spacing"] || "text<br>spacing",
        btn_line_height: resources["line-height"] || "line<br>height",
        btn_text_align: resources["text-align"] || "text<br>align",
      },
      content_block: {
        header: resources["highlighting-content"] || "highlighting content",
        btn_underline_links:
          resources["underline-links"] || "underline<br>links",
        btn_underline_headers:
          resources["underline-headers"] || "underline<br>headers",
        btn_images_titles: resources["images-titles"] || "images<br>titles",
      },
      zoom_block: {
        header: resources["zoom-in"] || "zoom in",
        btn_cursor_white:
          resources["big-white-cursor"] || "big white<br>cursor",
        btn_cursor_black:
          resources["big-black-cursor"] || "big black<br>cursor",
        btn_zoom_in: resources["zoom-screen"] || "zoom<br>screen",
      },
      },
    }),
    [resources],
  );

  // Language is pure derived state — compute it during render instead of
  // storing it via an effect. `mounted` gates the client-only document read.
  const currentLanguage = useMemo(() => {
    const lang =
      forceLang ||
      (mounted ? document.documentElement.lang || "en" : "en");
    return locale[lang] || locale.en;
  }, [forceLang, mounted, locale]);

  const updateState = useCallback((newState) => {
    setAppState((prev) => {
      const updated = { ...prev, ...newState };
      localStorage.setItem("MICTOOLBOXAPPSTATE", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleTriggerAcc = useCallback(() => {
    const newEnabledState = !isAccessEnabled;
    setIsAccessEnabled(newEnabledState);

    const storedAccess = localStorage.getItem("PSDIGITALACCESS");
    localStorage.setItem(
      "PSDIGITALACCESS",
      JSON.stringify(
        storedAccess
          ? { ...JSON.parse(storedAccess), enabled: newEnabledState }
          : { enabled: newEnabledState },
      ),
    );
  }, [isAccessEnabled]);

  const openBox = useCallback(() => {
    setIsToolboxOpen(true);
    handleTriggerAcc();
  }, [handleTriggerAcc]);

  const closeBox = useCallback(() => {
    setIsToolboxOpen(false);
  }, []);

  const handleBoxClick = (e) => {
    if (e.target.id === "mic-access-tool-box-wrapper") {
      closeBox();
    }
  };

  const handleKeyUp = useCallback(
    (e) => {
      if (e.keyCode === 27) closeBox(); // ESC key
      if (e.ctrlKey && e.keyCode === 113) openBox(); // CTRL+F2
    },
    [openBox, closeBox],
  );

  // Accessibility functions
  const contrastChange = (e) => {
    e.preventDefault();
    const buttonId = e.currentTarget.id;

    if (document.body.classList.contains(buttonId)) {
      e.currentTarget.classList.remove("vi-enabled");
      document.body.classList.remove(buttonId);
      updateState({
        bodyClassList: { ...appState.bodyClassList, [buttonId]: undefined },
      });
    } else {
      // Remove other contrast classes
      const contrastButtons = [
        "mic-toolbox-contrast-monochrome",
        "mic-toolbox-contrast-soft",
        "dark-mode-on",
      ];
      contrastButtons.forEach((id) => {
        document.querySelector(`#${id}`)?.classList.remove("vi-enabled");
        document.body.classList.remove(id);
      });

      e.currentTarget.classList.add("vi-enabled");
      document.body.classList.add(buttonId);
      updateState({
        bodyClassList: { ...appState.bodyClassList, [buttonId]: buttonId },
      });
    }
  };

  const cursorChange = (e) => {
    e.preventDefault();
    const buttonId = e.currentTarget.id;

    if (document.body.classList.contains(buttonId)) {
      e.currentTarget.classList.remove("vi-enabled");
      document.body.classList.remove(buttonId);
      updateState({
        bodyClassList: { ...appState.bodyClassList, [buttonId]: undefined },
      });
    } else {
      // Remove other cursor classes
      const cursorButtons = [
        "mic-toolbox-cursor-big-white",
        "mic-toolbox-cursor-big-black",
      ];
      cursorButtons.forEach((id) => {
        document.querySelector(`#${id}`)?.classList.remove("vi-enabled");
        document.body.classList.remove(id);
      });

      e.currentTarget.classList.add("vi-enabled");
      document.body.classList.add(buttonId);
      updateState({
        bodyClassList: { ...appState.bodyClassList, [buttonId]: buttonId },
      });
    }
  };

  const onceButtonChange = (e) => {
    e.preventDefault();
    const buttonId = e.currentTarget.id;

    if (buttonId === "mic-toolbox-disable-buttons-keyboard") {
      const keyboardRoot = !appState.keyboardRoot;
      updateState({ keyboardRoot });
      keyboardRootEnable(keyboardRoot);
    }

    if (buttonId === "mic-toolbox-content-images") {
      imagesChange();
    }

    if (document.body.classList.contains(buttonId)) {
      e.currentTarget.classList.remove("vi-enabled");
      document.body.classList.remove(buttonId);
      updateState({
        bodyClassList: { ...appState.bodyClassList, [buttonId]: undefined },
      });
    } else {
      e.currentTarget.classList.add("vi-enabled");
      document.body.classList.add(buttonId);
      updateState({
        bodyClassList: { ...appState.bodyClassList, [buttonId]: buttonId },
      });
    }
  };

  const keyboardRootEnable = (enabled = appState.keyboardRoot) => {
    if (enabled) {
      const focusableElements = document.querySelectorAll(
        "h1,h2,h3,h4,h5,h6,p,a,button,input,select,textarea",
      );
      focusableElements.forEach((el, index) => {
        el.tabIndex = index + 1;
      });
    } else {
      window.location.reload();
    }
  };

  const imagesChange = () => {
    if (document.body.classList.contains("mic-toolbox-content-images")) {
      const titles = document.querySelectorAll(".mic-toolbox-images-titles");
      titles.forEach((title) => title.parentElement?.removeChild(title));
      updateState({ imagesTitle: false });
    } else {
      imagesAddTitles();
      updateState({ imagesTitle: true });
    }
  };

  const imagesAddTitles = () => {
    const images = document.images;
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const span = document.createElement("span");
      span.className = "mic-toolbox-images-titles";
      span.textContent = img.alt || "image without text";
      img.parentNode.insertBefore(span, img);
    }
  };
  const fontsChange = (e) => {
    e.preventDefault();
    let newFontSize = appState.fontSize;

    if (e.currentTarget.id === "mic-toolbox-fonts-up") {
      if (newFontSize >= 1.6) return;
      newFontSize = Number((newFontSize * 1.1).toFixed(2));
    } else if (e.currentTarget.id === "mic-toolbox-fonts-down") {
      if (newFontSize <= 1.01) {
        // Force reset to EXACT default
        newFontSize = 1;
      } else {
        newFontSize = Number((newFontSize / 1.1).toFixed(2));
      }
    }

    updateState({ fontSize: newFontSize });
    initFontsChange(newFontSize);
    getFontsChanges(newFontSize);
  };

  const initFontsChange = (fontSize) => {
    const elements = document.querySelectorAll(
      "body,h1,h2,h3,h4,h5,h6,p,a,button,input,textarea,li,td,th,strong,span,blockquote,div:not(img)",
    );

    elements.forEach((el) => {
      // ❗ Skip images completely
      if (el.tagName === "IMG") return;

      const computedSize = window
        .getComputedStyle(el)
        .getPropertyValue("font-size");
      const currentSize = parseFloat(computedSize);

      const baseSizeAttr = el.getAttribute("data-mic-base-font-size");
      const baseSize = baseSizeAttr ? parseFloat(baseSizeAttr) : currentSize;

      if (!baseSizeAttr) {
        el.setAttribute("data-mic-base-font-size", String(baseSize));
      }

      if (fontSize === 1) {
        // Reset to original default size by removing the inline style
        el.style.removeProperty("font-size");
      } else {
        el.style.fontSize = `${(baseSize * fontSize).toFixed()}px`;
      }
    });
  };

  const getFontsChanges = (fontSize) => {
    const fontsUpButton = document.getElementById("mic-toolbox-fonts-up");
    const enabledSpan = document.getElementById("mic-toolbox-fonts-up-enabled");

    if (fontSize > 1) {
      fontsUpButton?.classList.add("vi-font-enabled");
      if (enabledSpan) {
        enabledSpan.textContent = `+${(100 * fontSize - 100).toFixed()}%`;
      }
    } else {
      fontsUpButton?.classList.remove("vi-font-enabled");
      if (enabledSpan) {
        enabledSpan.textContent = "";
      }
    }
  };

  const resetApp = (e) => {
    e.preventDefault();
    localStorage.removeItem("MICTOOLBOXAPPSTATE");
    const storedAccess = localStorage.getItem("PSDIGITALACCESS");
    localStorage.setItem(
      "PSDIGITALACCESS",
      JSON.stringify(
        storedAccess
          ? { ...JSON.parse(storedAccess), enabled: false }
          : { enabled: false },
      ),
    );
    window.location.reload();
  };

  // Synchronize the DOM with the persisted accessibility settings once, on
  // mount. Subsequent toggles update the DOM directly from their handlers.
  useEffect(() => {
    if (appState.bodyClassList) {
      Object.keys(appState.bodyClassList).forEach((className) => {
        if (appState.bodyClassList[className]) {
          document.body.classList.add(className);
        }
      });
    }
    if (appState.fontSize > 1) initFontsChange(appState.fontSize);
    if (appState.imagesTitle) imagesAddTitles();
    if (appState.keyboardRoot) keyboardRootEnable();
    // Mount-only: applies the initially loaded state. Reading `appState` and
    // the helpers once here is intentional, so they are not dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  // Don't render until mounted on the client (avoids SSR hydration mismatch)
  if (!mounted) {
    return null;
  }

  const lang = currentLanguage;

  return (
    <div id="mic-init-access-tool">
      {/* Main Access Button */}
      <button
        aria-label={isAccessEnabled ? lang.btn_close : lang.btn_open}
        tabIndex={1}
        id="mic-access-tool-general-button"
        className="mic-access-tool-general-button"
        onClick={openBox}
        style={{
          left: buttonPosition === "right" ? "auto" : "1rem",
          right: buttonPosition === "right" ? "1rem" : "auto",
        }}
      >
        <div className="mic-access-tool-general-button-icon">
          {isAccessEnabled ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34.136 32"
              style={{ enableBackground: "new 0 0 34.136 32" }}
            >
              <style>{".st0{fill:#242426;}.st1{fill:#248A3D;}"}</style>
              <g>
                <path
                  className="st0"
                  d="M15.624,6.4c1.0985,0,1.989,0.8905,1.989,1.989s-0.8905,1.989-1.989,1.989s-1.989-0.8905-1.989-1.989l0,0c-0.0044-1.0941,0.8789-1.9846,1.973-1.989C15.6133,6.4,15.6187,6.4,15.624,6.4z M22.585,12.035c-1.463,0.2204-2.9405,0.3314-4.42,0.332c-0.221,0-0.442,0.331-0.442,0.552v4.53l2.432,7.851c0.149,0.3964-0.0478,0.8391-0.442,0.994c-0.0884,0.0849-0.2104,0.1253-0.332,0.11c-0.2926,0.009-0.5587-0.1685-0.663-0.442l-2.652-6.192c-0.11-0.442-0.663-0.442-0.884,0l-2.652,6.188c-0.1172,0.2629-0.3752,0.4349-0.663,0.442c-0.11,0-0.221-0.11-0.331-0.11c-0.442-0.11-0.552-0.552-0.442-0.994l2.431-7.846v-4.531c0.0276-0.2737-0.1689-0.5191-0.442-0.552c-1.437-0.111-2.983-0.111-4.42-0.332C8.252,11.9476,7.9688,11.57,8,11.151c0.0874-0.411,0.465-0.6942,0.884-0.663c2.2396,0.2244,4.4892,0.3348,6.74,0.331c2.2508,0.0038,4.5004-0.1066,6.74-0.331c0.442,0,0.884,0.221,0.884,0.663s-0.22,0.884-0.662,0.884H22.585z M27.2303,25.919c-0.2048,0.2314-0.4033,0.4672-0.6237,0.6876C23.7735,29.4398,20.0067,31,16,31s-7.7735-1.5602-10.6066-4.3934S1,20.0067,1,16S2.5602,8.2265,5.3934,5.3934S11.9933,1,16,1s7.7735,1.5602,10.6066,4.3934c2.7596,2.7596,4.2996,6.4074,4.3783,10.2976c0.3473,0.0876,0.6843,0.2099,1.0122,0.366C31.9972,16.0378,32,16.0192,32,16c0-8.8365-7.1635-16-16-16S0,7.1635,0,16s7.1635,16,16,16c4.9136,0,9.305-2.2195,12.24-5.7054C27.8932,26.2038,27.5573,26.0784,27.2303,25.919z"
                />
                <path
                  className="st1"
                  d="M32.818,17.8178c-1.7574-1.7574-4.6066-1.7574-6.364,0c-1.7574,1.7573-1.7574,4.6066,0,6.364c1.7573,1.7573,4.6066,1.7573,6.364,0C34.5754,22.4243,34.5754,19.5751,32.818,17.8178z M32.2031,19.7568l-2.876,3.1592c-0.0928,0.1006-0.2217,0.1602-0.3584,0.1631c-0.0039,0-0.0078,0-0.0117,0c-0.1328,0-0.2598-0.0527-0.3535-0.1465l-1.5098-1.5098c-0.1953-0.1953-0.1953-0.5117,0-0.707s0.5117-0.1953,0.707,0l1.1396,1.1396l2.5225-2.7725c0.1865-0.2031,0.5029-0.2178,0.707-0.0332C32.374,19.2363,32.3887,19.5527,32.2031,19.7568z"
                />
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34.136 32"
              style={{ enableBackground: "new 0 0 34.136 32" }}
            >
              <style>{".st0{fill:#6C6C70;}"}</style>
              <path
                className="st0"
                d="M15.624,6.4c1.0985,0,1.989,0.8905,1.989,1.989s-0.8905,1.989-1.989,1.989s-1.989-0.8905-1.989-1.989l0,0c-0.0044-1.0941,0.8789-1.9846,1.973-1.989C15.6133,6.4,15.6187,6.4,15.624,6.4z M22.585,12.035c-1.463,0.2204-2.9405,0.3314-4.42,0.332c-0.221,0-0.442,0.331-0.442,0.552v4.53l2.432,7.851c0.149,0.3964-0.0478,0.8391-0.442,0.994c-0.0884,0.0849-0.2104,0.1253-0.332,0.11c-0.2926,0.009-0.5587-0.1685-0.663-0.442l-2.652-6.192c-0.11-0.442-0.663-0.442-0.884,0l-2.652,6.188c-0.1172,0.2629-0.3752,0.4349-0.663,0.442c-0.11,0-0.221-0.11-0.331-0.11c-0.442-0.11-0.552-0.552-0.442-0.994l2.431-7.846v-4.531c0.0276-0.2737-0.1689-0.5191-0.442-0.552c-1.437-0.111-2.983-0.111-4.42-0.332C8.252,11.9476,7.9688,11.57,8,11.151c0.0874-0.411,0.465-0.6942,0.884-0.663c2.2396,0.2244,4.4892,0.3348,6.74,0.331c2.2508,0.0038,4.5004-0.1066,6.74-0.331c0.442,0,0.884,0.221,0.884,0.663c0,0.442-0.22,0.884-0.662,0.884H22.585z M27.2286,25.9193c-0.2043,0.231-0.4006,0.4667-0.6216,0.6877c-5.8581,5.8581-15.3559,5.8581-21.214,0c-2.8135-2.8133-4.394-6.6291-4.3938-10.6078C0.9996,7.7149,7.7158,0.9996,16,1c3.9805-0.0113,7.8,1.5706,10.607,4.393c2.8505,2.8505,4.3024,6.563,4.3788,10.2984c0.3469,0.0877,0.6835,0.21,1.0112,0.3662C31.9971,16.0381,32,16.0195,32,16c0-8.8365-7.1635-16-16-16S0,7.1635,0,16s7.1635,16,16,16c4.9128,0,9.3035-2.2188,12.2385-5.7038C27.8917,26.2051,27.5557,26.0792,27.2286,25.9193z M32.818,17.8177c-1.7574-1.7574-4.6066-1.7574-6.364,0c-1.7574,1.7573-1.7574,4.6066,0,6.364c1.7573,1.7573,4.6066,1.7573,6.364,0C34.5754,22.4243,34.5754,19.5751,32.818,17.8177z M31.3026,21.9597c0.1953,0.1953,0.1953,0.5118,0,0.7072c-0.1953,0.1953-0.5118,0.1953-0.7071,0l-0.9595-0.9595l-0.9595,0.9595c-0.1953,0.1953-0.5118,0.1953-0.7071,0s-0.1953-0.5118,0-0.7071l0.9595-0.9595l-0.9596-0.9595c-0.1953-0.1953-0.1953-0.5118,0-0.7071s0.5118-0.1953,0.7072,0l0.9595,0.9595l0.9596-0.9596c0.1953-0.1953,0.5118-0.1953,0.7071,0s0.1953,0.5118,0,0.7072l-0.9596,0.9595L31.3026,21.9597z"
              />
            </svg>
          )}
        </div>
        <div className="mic-access-tool-general-button-label">
          {isAccessEnabled ? lang.btn_close : lang.btn_open}
        </div>
      </button>

      {/* Toolbox Modal */}
      {isToolboxOpen && (
        <div
          id="mic-access-tool-box-wrapper"
          className={`mic-access-tool-box-wrapper ${
            isToolboxOpen ? "opened-mic-access-tool" : ""
          }`}
          onClick={handleBoxClick}
        >
          <div
            id="mic-access-tool-box"
            className={`mic-access-tool-box ${
              buttonPosition === "right" ? "mic-access-tool-box-right" : ""
            }`}
            aria-modal="true"
            role="dialog"
          >
            <div className="mic-access-tool-box-header">
              Accessibility Menu (CTRL+F2)
              <button
                title={lang.btn_close}
                id="mic-access-tool-box-close-button"
                aria-label={lang.btn_close}
                onClick={closeBox}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 14"
                  width="100%"
                  height="100%"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="m2.30436241 2.30436238 9.39127515 9.39127515m-9.39127518 6e-8 9.39127515-9.39127515"
                  />
                </svg>
              </button>
            </div>

            <div className="mic-access-tool-box-body">
              {/* Basic Controls */}
              <div className="mic-disable-buttons">
                <button
                  title={lang.keyboard_root}
                  id="mic-toolbox-disable-buttons-keyboard"
                  onClick={onceButtonChange}
                  className={appState.keyboardRoot ? "vi-enabled" : ""}
                >
                  <span>{lang.keyboard_root}</span>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAP1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACzJYIvAAAAFHRSTlMAAQIEBQYLhomeoLW31dna3Oj5+90/ykwAAABVSURBVBgZncFJEoJQEAXBeg3i+FHbuv9ZjWAFS83kD2cPrjhnT6wQEkIIYnXuvAbv9LwiVopACMsTsdqpk2ZdHIgVUpsQxOo83HymgXiqPbl4cON3X+q6BbAaNKDxAAAAAElFTkSuQmCC"
                    alt={lang.keyboard_root}
                  />
                </button>
                <button
                  title={lang.disable_animations}
                  id="mic-toolbox-disable-buttons-animations"
                  onClick={onceButtonChange}
                  className={
                    document.body.classList.contains(
                      "mic-toolbox-disable-buttons-animations",
                    )
                      ? "vi-enabled"
                      : ""
                  }
                >
                  <span>{lang.disable_animations}</span>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQLyYwAAAAE3RSTlMABwoNDxAcIS84PkBBVGR7guj3cqQiVwAAAFxJREFUGNNlz9sOgCAMA9AiIioKav//Xx2XIGAfluwkSzpAoY963CCOo1xRjETn/SRFnEyuwAJ4VtkQfIEse2CFJDcbKFcNZGkhSQdRfO7xySTNZlOiD/7/soNYvHcOCRT6qv0LAAAAAElFTkSuQmCC"
                    alt={lang.disable_animations}
                  />
                </button>
              </div>

              {/* Contrast Block */}
              <div className="mic-buttons-block mic-contrast-block">
                <span className="mic-subtitle-span">
                  {lang.contrast_block.header}
                </span>
                <div className="mic-contrast-block-wrapper">
                  <button
                    id="mic-toolbox-contrast-monochrome"
                    onClick={contrastChange}
                    className={
                      document.body.classList.contains(
                        "mic-toolbox-contrast-monochrome",
                      )
                        ? "vi-enabled"
                        : ""
                    }
                  >
                    <span>
                      <img
                        alt="Monochrome"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAOVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8dlA9AAAAEnRSTlMAAQkLT1BRkpSVl5iam8zP7/E3Z1DDAAAAc0lEQVQokZWSSRaAIAxDG3FAEJXc/7BuVAbrlCX/vTRpEXkXrIX67kinEASSnErCSt8BTB9VICLNkgHkFk0kkec5LfojG3w51HDvY6s0IMnhDtgnq3p4lxZzF7csOKvNTbv+W+IFpGxBO6HXTyuCUf8MlTaTLhCpbG3L9gAAAABJRU5ErkJggg=="
                      />
                    </span>
                    <span>{lang.contrast_block.btn_monochrome}</span>
                  </button>
                  <button
                    id="mic-toolbox-contrast-soft"
                    onClick={contrastChange}
                    className={
                      document.body.classList.contains(
                        "mic-toolbox-contrast-soft",
                      )
                        ? "vi-enabled"
                        : ""
                    }
                  >
                    <span>
                      <img
                        alt="Bright"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc6ur3AAAAFnRSTlMAAQgJCgtOT1BRkpSVl5iam8jMz+/x9WwUowAAAI1JREFUKJGNktsSwiAMRLNSehGrtdLz/5/qg2WwTBy7T4EzE5ZNzP5LKcm9n2F2iBaAx5HQ6BzYxijFaWvBGj5leH0BQQ7lEDZQ9TNUJ1PxpjsQK4js/0mH58wEcP0FUmnVOa1MC/QVjDUYQb44ds2A507C2kaS+84sDvl8iC4o3mDxRnj3R2umm78Mjd4oPA952m8bgAAAAABJRU5ErkJggg=="
                      />
                    </span>
                    <span>{lang.contrast_block.btn_bright}</span>
                  </button>
                </div>
              </div>

              {/* Fonts Block */}
              <div className="mic-fonts-block mic-buttons-block">
                <span className="mic-subtitle-span">
                  {lang.text_block.header}
                </span>
                <div className="mic-contrast-block-wrapper">
                  <button
                    id="mic-toolbox-fonts-up"
                    onClick={fontsChange}
                    className={appState.fontSize > 1 ? "vi-font-enabled" : ""}
                  >
                    <span>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAUVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcqRVCAAAAGnRSTlMAAQIEBwkKCxQgIyU2RlthYmN3mqbD3N75/ffAjZwAAABwSURBVBhXbc1XEoAgDATQxYJdsSLc/6AWigTJB7P7hgDgpuzxGy61SJiO9bEz0sdEJYlyU3movgSaii5MB/elsCa0llZH1MqZ1xVoBntvMVrOzHxgdu0LCA1Ev5xK6R3XWmKv7mAbsVtVd58Z6OS4AOceDZR02LMoAAAAAElFTkSuQmCC"
                        alt="Increase Text"
                      />
                    </span>

                    <span>{lang.text_block.btn_font_up}</span>
                    <span id="mic-toolbox-fonts-up-enabled"></span>
                  </button>
                  <button id="mic-toolbox-fonts-down" onClick={fontsChange}>
                    <span>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAUVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcqRVCAAAAGnRSTlMAAQIEBwkKCxQgIyU3RlthYmN3mqbD3N75/WrPbOoAAABvSURBVBhXbcvZFoMgDEXRo610UpuO1Pz/h/oQoEThJefutQB6/DtA947BmSw3rqpORfUD4jSvWv/dqvafvCq7TEmfZsOj47yomJqFqC+OUbMm09mOAPdvMoEq2llZGc7SPHkz/W3MdGsQ4t5gGEuuW74NlKW6ljMAAAAASUVORK5CYII="
                        alt="Decrease Text"
                      />
                    </span>
                    <span>{lang.text_block.btn_font_down}</span>
                  </button>
                  <button
                    id="mic-toolbox-text-spacing"
                    onClick={onceButtonChange}
                    className={
                      document.body.classList.contains(
                        "mic-toolbox-text-spacing",
                      )
                        ? "vi-enabled"
                        : ""
                    }
                  >
                    <span>
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMiIgdmlld0JveD0iMCAwIDU1IDE0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggc3Ryb2tlLWRhc2hhcnJheT0iNCw3IiBkPSJNMy41IDdoNDgiLz48cGF0aCBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNNyAxMyAxIDdsNi02bTQxIDEyIDYtNi02LTYiLz48L2c+PC9zdmc+"
                        alt="Text Spacing"
                      />
                    </span>
                    <span>{lang.text_block.btn_text_spacing}</span>
                  </button>
                  <button
                    id="mic-toolbox-line-height"
                    onClick={onceButtonChange}
                    className={
                      document.body.classList.contains(
                        "mic-toolbox-line-height",
                      )
                        ? "vi-enabled"
                        : ""
                    }
                  >
                    <span>
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMiIgdmlld0JveD0iMCAwIDQ3IDI1Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTMuOTk5OTk5NjIgMi43MTA0MjIyNlYyMi43MTA0MjIzIi8+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJtLjE2ODE0MjM1IDIwLjUyNzA0MTIgMy40NDQ4Nzg2MiA0LjIxMDQwNzJjLjE3NDg2Mzc5LjIxMzcyMjQuNDg5ODc1MTQuMjQ1MjIzNS43MDM1OTc1NC4wNzAzNTk3YS40OTk5OTg4LjQ5OTk5ODggMCAwIDAgLjA3MDM1OTc2LS4wNzAzNTk3bDMuNDQ0ODc4NjItNC4yMTA0MDcyYy4xNzQ4NjM3OC0uMjEzNzIyNS4xNDMzNjI2NS0uNTI4NzMzOC0uMDcwMzU5NzYtLjcwMzU5NzYtLjA4OTMzMTA2LS4wNzMwODktLjIwMTE5NzcxLS4xMTMwMjEzLS4zMTY2MTg4OS0uMTEzMDIxM0guNTU1MTIxYy0uMjc2MTQyMzggMC0uNS4yMjM4NTc2LS41LjUgMCAuMTE1NDIxMS4wMzk5MzIzLjIyNzI4NzguMTEzMDIxMzUuMzE2NjE4OVptMC0xNi4xMzMyMzgxTDMuNjEzMDIwOTcuMTgzMzk1OTJjLjE3NDg2Mzc5LS4yMTM3MjI0MS40ODk4NzUxNC0uMjQ1MjIzNTUuNzAzNTk3NTQtLjA3MDM1OTc2YS40OTk5OTk3NS40OTk5OTk3NSAwIDAgMSAuMDcwMzU5NzYuMDcwMzU5NzZsMy40NDQ4Nzg2MiA0LjIxMDQwNzJjLjE3NDg2Mzc4LjIxMzcyMjQuMTQzMzYyNjUuNTI4NzMzNzUtLjA3MDM1OTc2LjcwMzU5NzU0LS4wODkzMzEwNi4wNzMwODkwNS0uMjAxMTk3NzEuMTEzMDIxMzUtLjMxNjYxODg5LjExMzAyMTM1SC41NTUxMjFjLS4yNzYxNDIzNyAwLS41LS4yMjM4NTc2Mi0uNS0uNSAwLS4xMTU0MjExOC4wMzk5MzIzLS4yMjcyODc4My4xMTMwMjEzNS0uMzE2NjE4OVoiLz48cGF0aCBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0xNS40OTk5OTk2IDEuNzEwNDIyMjZoMzBtLTMwIDdoMzBtLTMwIDcuMDAwMDAwMDRoMzBtLTMwIDdoMjQiLz48L2c+PC9zdmc+"
                        alt="Line Height"
                      />
                    </span>
                    <span>{lang.text_block.btn_line_height}</span>
                  </button>
                  <button
                    id="mic-toolbox-text-align"
                    onClick={onceButtonChange}
                    className={
                      document.body.classList.contains("mic-toolbox-text-align")
                        ? "vi-enabled"
                        : ""
                    }
                  >
                    <span>
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMiIgdmlld0JveD0iMCAwIDMyIDIzIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0xIDFoMzBNMSA4aDI1TTEgMTVoMzBNMSAyMmgyNCIvPjwvc3ZnPg=="
                        alt="Text Align"
                      />
                    </span>
                    <span>{lang.text_block.btn_text_align}</span>
                  </button>
                </div>
              </div>

              {/* Content Block */}
              <div className="mic-content-block mic-buttons-block">
                <span className="mic-subtitle-span">
                  {lang.content_block.header}
                </span>
                <div className="mic-contrast-block-wrapper">
                  <button
                    id="mic-toolbox-content-links"
                    onClick={onceButtonChange}
                    className={
                      document.body.classList.contains(
                        "mic-toolbox-content-links",
                      )
                        ? "vi-enabled"
                        : ""
                    }
                  >
                    <span>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA81BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYh4bhAAAAUHRSTlMAAQIDBAUHCAoLDA0ODxATFRgcJCUnKCorLDc4OjxBQ0ZLTE9XW2FjZ3V5foKIjJKVmJqbnZ6jq62yub7AxcjKzM/V2tze4ujp7e/z9fn7/dE+l70AAADFSURBVBgZ1cHpQgFhGIbhZ/SpsbQorUqJUhHttEiZKCT3+R9Nw1/v/Oe6NP+8s05QVBTvidCVItzSy+z9cSFTgf6qtAunsrTJKpRn7MvQZV0TNxzIcMlHXKqcP3AkgwtoOQWAL4vf4zVdhrrczv6yZqR+mKoOYJTXjJV6/2XrBGg+QkmmTaCkApRladDmSzqEYxm+SW6vScrRleGOqibSjGRI/VLzpHiLa1kyQ+6XEp+8O5k2BoTenCIknxlXYooW87QI/gGkVyJRaE/etAAAAABJRU5ErkJggg=="
                        alt="Underline Links"
                      />
                    </span>

                    <span>{lang.content_block.btn_underline_links}</span>
                  </button>
                  <button
                    id="mic-toolbox-content-headers"
                    onClick={onceButtonChange}
                    className={
                      document.body.classList.contains(
                        "mic-toolbox-content-headers",
                      )
                        ? "vi-enabled"
                        : ""
                    }
                  >
                    <span>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAIVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt0UjBAAAACnRSTlMAARAeQEFSkZvvep8Y0AAAAElJREFUGJVjYKAmYHFxcVEAE2Au16pVqxzABDYug8QqAygBBqyrYATErFUwgiguGODkAp3kTp7JbKsEoARYMnNVqwKYIMaDVAIAmsgu7kDEZosAAAAASUVORK5CYII="
                        alt="Underline Headers"
                      />
                    </span>
                    <span>{lang.content_block.btn_underline_headers}</span>
                  </button>
                  <button
                    id="mic-toolbox-content-images"
                    onClick={onceButtonChange}
                    className={
                      document.body.classList.contains(
                        "mic-toolbox-content-images",
                      )
                        ? "vi-enabled"
                        : ""
                    }
                  >
                    <span>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAgVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABtFS1lAAAAKnRSTlMAAQMEBQgQHyIkJi9DRElbXmtscHN3e4WIiYuSl52go7C1usDo6evx9flG5RBaAAAAfUlEQVQoz93SSRKCQAxA0UTBWVFQnGVQUf79D+jKotvuXrjlr1J5VVlFpNdt3+1PlRrMKrYbMzJ52s16eKQyDPICmIV5GeLBOhIRPT0z7/Eb5Xfh4QTYBHkCwFz3V/Vw3ADACy4ua03X0eEdZnlkc4Hd2Wa3Pzh39K79fuEPdQoeE+qkypwAAAAASUVORK5CYII="
                        alt="Images Titles"
                      />
                    </span>

                    <span>{lang.content_block.btn_images_titles}</span>
                  </button>
                </div>
              </div>

              {/* Cursors / Zoom Block */}
              <div className="mic-cursors-block mic-buttons-block">
                <span className="mic-subtitle-span">
                  {lang.zoom_block.header}
                </span>
                <div className="mic-contrast-block-wrapper">
                  <button
                    id="mic-toolbox-cursor-big-white"
                    onClick={cursorChange}
                    className={
                      document.body.classList.contains(
                        "mic-toolbox-cursor-big-white",
                      )
                        ? "vi-enabled"
                        : ""
                    }
                  >
                    <span>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAS1BMVEW9w8e+xMi/xMi/xcnCx8vCyMvIzdHL0NPS1tnT19nd4OLe4ePf4uTg4+Xq7O3s7u/x8vPx8/P19vf4+fn6+/v8/f3+/v7+//////+Nje9qAAAAXklEQVQoz83SNwKAMBADwTPJ5GDS/v+lFFByomXbaVTI7P/lmvdOMnSapaMd7Wi/mV6z52hHO9of2lJKS3B5EMtHODOXYzig8TiatbC+8xzNrAAq85sgCi7rj1P9pwslQQsBoORDzQAAAABJRU5ErkJggg=="
                        alt="Big White Cursor"
                      />
                    </span>

                    <span>{lang.zoom_block.btn_cursor_white}</span>
                  </button>
                  <button
                    id="mic-toolbox-cursor-big-black"
                    onClick={cursorChange}
                    className={
                      document.body.classList.contains(
                        "mic-toolbox-cursor-big-black",
                      )
                        ? "vi-enabled"
                        : ""
                    }
                  >
                    <span>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAWlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACLSV5RAAAAHXRSTlMAAQMEBgcTFCw3OFBUe3+AgoOIrbfHytrk7fX7/WJfHrcAAABoSURBVChTzdK7FoIwFAXRy1MSEXxHhfn/37SIK43JoWXa3Y7Z/us0fybJIB3tALNm4WiPzFlzydGemIvmrP/oHUJ41kW+/kviG6xtkX2zwFhib3aCV5XlhzOzHhiyHLuDE3w4bky1n75vow1/sgwkQQAAAABJRU5ErkJggg=="
                        alt="Big Black Cursor"
                      />
                    </span>

                    <span>{lang.zoom_block.btn_cursor_black}</span>
                  </button>
                  <button
                    id="mic-toolbox-zoom-up"
                    onClick={onceButtonChange}
                    className={
                      document.body.classList.contains("mic-toolbox-zoom-up")
                        ? "vi-enabled"
                        : ""
                    }
                  >
                    <span>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA51BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACWqgEeAAAATHRSTlMAAQIEBwgJCgwQGBkaISkqKywwMTM0Nzg/QEFCRUdNTlZdXnFzdHV3eXuRlJeYmp6goqOoqq2vsLLFx8jKzNrc3uDi6Onr7fHz9ff5oUSo3wAAAOJJREFUGBnVwelCAVEAhuF35mSZooW2U2lPiTYlTgtCDfXd//U0+HWUC/A8LIJw964dv13l+VdhoKlWir+Opfh8a22/LvUjZhWkqmEs11PH4AsHqgLZyEDmS2V8VrEBnCywIxk89zoj4WSB4FvreDraJOvcj3quBs86xDPUKpEmHNzqBM+79jDW9nRti/CiAzwV1Uk4WWBJWsaTl1aAmisCZbWZ0dJHhqmS1Ajwpfv63A6AVEWJhwBf1JVGjZtXTT2G+MylJjoNjV0wy2wcnZZyBHUlhswTPElqMldYGTXTLLhf0gcqXp6DTJoAAAAASUVORK5CYII="
                        alt="Zoom In"
                      />
                    </span>

                    <span>{lang.zoom_block.btn_zoom_in}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="link-access-page">
              {link && (
                <a
                  className="atb-hide-if-empty"
                  title={lang.access_declaration}
                  id="mic-toolbox-link-nagishut"
                  href={link}
                  target="_blank"
                  aria-label="external"
                >
                  {lang.access_declaration}
                </a>
              )}
              {contact && (
                <a
                  className="atb-hide-if-empty"
                  title={lang.debug_contacts}
                  id="mic-toolbox-link-contact"
                  href={contact}
                >
                  {lang.debug_contacts}
                </a>
              )}
              <button
                title={lang.reset_all_settings}
                id="mic-toolbox-disable-buttons-reset-all"
                onClick={resetApp}
              >
                <span>{lang.reset_all_settings}</span>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDtuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIGQ9Ik0xNiAyYTE0IDE0IDAgMCAwLTMuMjMuMzggMSAxIDAgMCAwIC40NiAxLjk0QTEyLjIgMTIuMiAwIDAgMSAxNiA0YTEyIDEyIDAgMSAxLTkgNC4wN1YxMWExIDEgMCAwIDAgMiAwVjZhMSAxIDAgMCAwLTEtMUgzYTEgMSAwIDAgMCAwIDJoMi4yOEExNCAxNCAwIDEgMCAxNiAyem0wIDAiIGZpbGw9IiNkMDVmMGYiIG9wYWNpdHk9IjEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9zdmc+"
                  alt={lang.reset_all_settings}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityToolbar;
