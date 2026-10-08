import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { initTikTokPixel, trackPageView } from "../../lib/tiktokPixel";

export default function TikTokPixelTracker() {
  const location = useLocation();

  useEffect(() => {
    initTikTokPixel();
  }, []);

  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  return null;
}
