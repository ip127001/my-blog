import { useEffect } from "react";
import { useRouter } from "next/router";

import "../styles/global.css";
import "highlight.js/styles/monokai-sublime.css";
import {
  RESTORE_HOME_FLAG,
  scrollKey,
} from "../lib/scroll";

function normalizePath(path) {
  return path.split("?")[0].split("#")[0] || "/";
}

function instantScrollTo(top) {
  try {
    window.scrollTo({ top, left: 0, behavior: "instant" });
  } catch {
    window.scrollTo(0, top);
  }
}

function restoreScroll(path) {
  const saved = sessionStorage.getItem(scrollKey(path));
  if (saved === null) return false;

  const top = Number(saved);
  if (top === 0) return true;

  [0, 50, 100, 200, 400].forEach((delay) => {
    setTimeout(() => instantScrollTo(top), delay);
  });
  return true;
}

function scrollToHash(url) {
  const hash = url.split("#")[1];
  if (!hash) return false;

  let attempts = 0;
  const tryScroll = () => {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (attempts++ < 20) requestAnimationFrame(tryScroll);
  };
  tryScroll();
  return true;
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    let activePath = normalizePath(router.asPath);
    let isPopState = false;
    let scrollTicking = false;

    const persistScroll = () => {
      sessionStorage.setItem(scrollKey(activePath), String(window.scrollY));
    };

    const onScroll = () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
          persistScroll();
          scrollTicking = false;
        });
      }
    };

    const onPopState = () => {
      isPopState = true;
    };

    const handleRouteChange = (url) => {
      window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
      });
    };

    const handleRouteChangeComplete = (url) => {
      handleRouteChange(url);
      const path = normalizePath(url);
      activePath = path;

      if (isPopState) {
        isPopState = false;
        restoreScroll(path);
        return;
      }

      if (
        sessionStorage.getItem(RESTORE_HOME_FLAG) === "1" &&
        path === "/"
      ) {
        sessionStorage.removeItem(RESTORE_HOME_FLAG);
        if (!url.includes("#")) {
          restoreScroll("/");
          return;
        }
      }

      if (url.includes("#")) {
        scrollToHash(url);
        return;
      }

      // Forward nav: land at top of the new page (after it has rendered)
      instantScrollTo(0);
    };

    router.beforePopState(({ as }) => {
      restoreScroll(normalizePath(as));
      return true;
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    persistScroll();

    if (router.asPath.includes("#")) {
      requestAnimationFrame(() => scrollToHash(router.asPath));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.beforePopState(() => true);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
