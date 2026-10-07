import { Outlet } from "react-router-dom";

import Header from "../common/Header";
import Footer from "../common/Footer";
import ScrollToTop from "../common/ScrollToTop";
import ScrollToHash from "../common/ScrollToHash";
import WhatsAppFloat from "../common/WhatsAppFloat";
import MetaPixelTracker from "../common/MetaPixelTracker";
import TikTokPixelTracker from "../common/TikTokPixelTracker";

function Layout() {
  return (
    <>
      {/* Meta Pixel */}
      <MetaPixelTracker />

      {/* TikTok Pixel */}
      <TikTokPixelTracker />

      <ScrollToTop />
      <ScrollToHash />

      <Header />

      <Outlet />

      <Footer />

      <WhatsAppFloat />
    </>
  );
}

export default Layout;
