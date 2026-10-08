import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { TIKTOK_PIXEL_ID } from "../../lib/tiktokPixel";

function TikTokPixelTracker() {
  const location = useLocation();
  const isFirstPage = useRef(true);

  // =========================
  // Initialize TikTok Pixel
  // =========================
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!TIKTOK_PIXEL_ID) {
      console.warn("TikTok Pixel ID is not configured.");
      return;
    }

    // إذا كان TikTok محملاً مسبقًا
    if (window.ttq) {
      return;
    }

    !(function (w, d, t) {
      w.TiktokAnalyticsObject = t;

      const ttq = (w[t] = w[t] || []);

      ttq.methods = [
        "page",
        "track",
        "identify",
        "instances",
        "debug",
        "on",
        "off",
        "once",
        "ready",
        "alias",
        "group",
        "enableCookie",
        "disableCookie",
      ];

      ttq.setAndDefer = function (t, e) {
        t[e] = function () {
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
        };
      };

      for (let i = 0; i < ttq.methods.length; i++) {
        ttq.setAndDefer(ttq, ttq.methods[i]);
      }

      ttq.instance = function (t) {
        const e = ttq._i[t] || [];

        for (let i = 0; i < ttq.methods.length; i++) {
          ttq.setAndDefer(e, ttq.methods[i]);
        }

        return e;
      };

      ttq.load = function (e, n) {
        const r = "https://analytics.tiktok.com/i18n/pixel/events.js";

        ttq._i = ttq._i || {};
        ttq._i[e] = [];
        ttq._i[e]._u = r;

        ttq._t = ttq._t || {};
        ttq._t[e] = +new Date();

        ttq._o = ttq._o || {};
        ttq._o[e] = n || {};

        const script = d.createElement("script");

        script.type = "text/javascript";
        script.async = true;
        script.src = r + "?sdkid=" + e + "&lib=" + t;

        const firstScript = d.getElementsByTagName("script")[0];

        firstScript.parentNode.insertBefore(script, firstScript);
      };

      // تحميل Pixel
      ttq.load(TIKTOK_PIXEL_ID);

      // PageView لأول زيارة
      ttq.page();
    })(window, document, "ttq");
  }, []);

  // =========================
  // PageView عند التنقل داخل React
  // =========================
  useEffect(() => {
    if (isFirstPage.current) {
      isFirstPage.current = false;
      return;
    }

    if (typeof window === "undefined") return;
    if (!window.ttq) return;

    window.ttq.page();
  }, [location.pathname, location.search]);

  return null;
}

export default TikTokPixelTracker;
