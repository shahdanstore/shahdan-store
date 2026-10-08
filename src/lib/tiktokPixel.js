export const TIKTOK_PIXEL_ID = import.meta.env.VITE_TIKTOK_PIXEL_ID || "";

export const trackPageView = () => {
  if (!window.ttq) return;

  window.ttq.page();
};

export const trackTikTok = (event, data = {}) => {
  if (!window.ttq) return;

  window.ttq.track(event, data);
};
