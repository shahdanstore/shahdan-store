import Hero from "../components/common/Hero";
import Categories from "../components/common/Categories";
import OffersSection from "../components/common/OffersSection";
import FeaturedProducts from "../components/common/FeaturedProducts";
import NewProducts from "../components/common/NewProducts";
import WhyUs from "../components/common/WhyUs";
import Newsletter from "../components/common/Newsletter";

import { useSettings } from "../hooks/useSettings";
import { useEffect } from "react";

export default function Home() {
  const { settings } = useSettings();

  useEffect(() => {
    document.title = settings.seo?.title || settings.storeName;

    const meta = document.querySelector('meta[name="description"]');

    if (meta) {
      meta.setAttribute("content", settings.seo?.description || "");
    }
  }, [settings]);

  return (
    <main
      className={`min-h-screen ${
        settings.theme?.darkMode
          ? "bg-[#211d18] text-white"
          : "bg-[#f8f3e8] text-[#30291f]"
      }`}
      style={{
        "--primary": settings.theme?.primaryColor || "#b88a44",
        "--shahdan-gold": "#b88a44",
        "--shahdan-dark-gold": "#8a642f",
        "--shahdan-beige": "#f8f3e8",
        "--shahdan-dark": "#30291f",
        "--shahdan-text": "#5f574c",
        "--shahdan-border": "#eadfca",
      }}
    >
      {/* =========================================================
          HERO
      ========================================================== */}
      {settings.home?.showHero && (
        <section id="hero" className="relative">
          <Hero />
        </section>
      )}

      {/* =========================================================
          HOME SECTIONS
      ========================================================== */}
      <div
        className={`relative overflow-hidden ${
          settings.theme?.darkMode
            ? "bg-[#211d18]"
            : "bg-gradient-to-b from-[#f8f3e8] via-white to-[#f8f3e8]"
        }`}
      >
        {/* Decorative background elements */}
        {!settings.theme?.darkMode && (
          <>
            <div className="pointer-events-none absolute right-[-120px] top-[180px] h-72 w-72 rounded-full bg-[#b88a44]/5 blur-3xl" />

            <div className="pointer-events-none absolute left-[-140px] top-[700px] h-80 w-80 rounded-full bg-[#c7a15a]/5 blur-3xl" />

            <div className="pointer-events-none absolute right-[-100px] top-[1500px] h-72 w-72 rounded-full bg-[#b88a44]/5 blur-3xl" />
          </>
        )}

        <div className="relative space-y-16 py-10 md:space-y-24 md:py-16">
          {/* =====================================================
              CATEGORIES
          ====================================================== */}
          {settings.home?.showCategories && (
            <section id="categories" className="scroll-mt-28">
              <Categories />
            </section>
          )}

          {/* =====================================================
              FLASH SALE
          ====================================================== */}
          {settings.discounts?.flashSaleEnabled && (
            <section id="offers">
              <OffersSection />
            </section>
          )}

          {/* =====================================================
              BEST SELLERS
          ====================================================== */}
          {settings.home?.showBestSellers && (
            <section id="featured-products">
              <FeaturedProducts />
            </section>
          )}

          {/* =====================================================
              WHY SHAHDAN
          ====================================================== */}
          <section id="why-shahdan">
            <WhyUs />
          </section>

          {/* =====================================================
              NEW PRODUCTS
          ====================================================== */}
          {settings.home?.showLatestProducts && (
            <section id="new-products">
              <NewProducts />
            </section>
          )}

          {/* =====================================================
              NEWSLETTER
          ====================================================== */}
          {settings.popups?.newsletterEnabled && (
            <section id="newsletter">
              <Newsletter />
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
