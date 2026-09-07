import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBolt,
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronLeft,
} from "react-icons/fa";

import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { useStore } from "../../hooks/useStore";
import { useSettings } from "../../hooks/useSettings";

import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { categories } = useStore();
  const { settings } = useSettings();

  const location = useLocation();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [cartAnimating, setCartAnimating] = useState(false);
  const [cartPopup, setCartPopup] = useState(null);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = settings?.announcementBar?.messages ?? [
    "🚚 الشحن مجاني للطلبات فوق 199 ريال",
    "💳 الدفع عند الاستلام متوفر",
    "✨ منتجات مختارة بعناية لجودة أفضل",
  ];

  const interval = settings?.announcementBar?.interval ?? 4000;

  useEffect(() => {
    if (messages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [messages.length, interval]);

  useEffect(() => {
    if (menuOpen) {
      const timer = setTimeout(() => {
        setDrawerVisible(true);
      }, 10);

      return () => clearTimeout(timer);
    }
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e) => {
      setCartAnimating(true);
      setCartPopup(e.detail?.quantity || 1);

      const animationTimer = setTimeout(() => {
        setCartAnimating(false);
      }, 700);

      const popupTimer = setTimeout(() => {
        setCartPopup(null);
      }, 1000);

      return () => {
        clearTimeout(animationTimer);
        clearTimeout(popupTimer);
      };
    };

    window.addEventListener("cart-animation", handler);

    return () => {
      window.removeEventListener("cart-animation", handler);
    };
  }, []);

  const closeMenu = () => {
    setDrawerVisible(false);

    setTimeout(() => {
      setMenuOpen(false);
    }, 300);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const query = searchInput.trim();

    navigate(
      query ? `/products?search=${encodeURIComponent(query)}` : "/products",
    );

    closeMenu();
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);

    closeMenu();
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[99990]">
        {/* =========================================
            Announcement Bar
            ========================================= */}
        {settings?.announcementBar?.enabled && (
          <div
            className="h-10 overflow-hidden"
            style={{
              backgroundColor:
                settings?.announcementBar?.backgroundColor || "#171717",
              color: settings?.announcementBar?.textColor || "#ffffff",
            }}
          >
            <div className="relative flex h-full items-center justify-center overflow-hidden px-4">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentMessage}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{
                    duration: 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 flex items-center justify-center will-change-transform"
                >
                  <span className="whitespace-nowrap text-sm font-medium">
                    {messages[currentMessage]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* =========================================
            Main Header
            ========================================= */}
        <div className="border-b border-[#e8e1d7] bg-[#faf8f3]/95 shadow-sm backdrop-blur-xl transition-all duration-300">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
            {/* Mobile menu */}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(true);
                setDrawerVisible(false);
              }}
              className="text-2xl text-[#242424] transition hover:text-[#b08d57] md:hidden"
              aria-label="فتح القائمة"
            >
              <FaBars />
            </button>

            {/* =========================================
                Logo
                ========================================= */}
            <Link to="/" className="group flex items-center gap-2">
              <FaBolt className="text-3xl text-[#b08d57] transition-transform duration-300 group-hover:scale-110" />

              <div className="flex flex-col leading-none">
                <h1 className="text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl">
                  شهدان
                </h1>

                <span className="mt-1 text-[9px] font-semibold tracking-[0.28em] text-[#b08d57]">
                  SHAHDAN STORE
                </span>
              </div>
            </Link>

            {/* =========================================
                Desktop Navigation
                ========================================= */}
            <nav className="hidden gap-8 font-medium md:flex">
              <Link
                to="/"
                className="relative py-2 text-[#242424] transition hover:text-[#b08d57]"
              >
                الرئيسية
              </Link>

              <Link
                to="/products"
                className="relative py-2 text-[#242424] transition hover:text-[#b08d57]"
              >
                كل المنتجات
              </Link>

              <Link
                to="/categories"
                className="relative py-2 text-[#242424] transition hover:text-[#b08d57]"
              >
                التصنيفات
              </Link>

              <Link
                to="/about"
                className="relative py-2 text-[#242424] transition hover:text-[#b08d57]"
              >
                تواصل معنا
              </Link>
            </nav>

            {/* =========================================
                Desktop Search
                ========================================= */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden items-center overflow-hidden rounded-full border border-[#e8e1d7] bg-white lg:flex"
            >
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ابحث عن منتج..."
                className="w-64 bg-transparent px-4 py-2 text-sm text-[#242424] outline-none placeholder:text-[#9a9a9a]"
              />

              <button
                type="submit"
                className="bg-[#171717] px-4 py-3 text-[#d4b477] transition hover:bg-[#b08d57] hover:text-white"
                aria-label="بحث"
              >
                <FaSearch />
              </button>
            </form>

            {/* =========================================
                Icons
                ========================================= */}
            <div className="flex items-center gap-2 text-xl sm:gap-3">
              {/* Track order */}
              <Link
                to="/track-order"
                title="متابعة الطلب"
                aria-label="متابعة الطلب"
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#242424] transition-all duration-300 hover:bg-[#f3eadc] hover:text-[#b08d57] hover:shadow-md active:scale-90"
              >
                <FaUser />
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                title="المفضلة"
                aria-label="المفضلة"
                className="relative flex h-11 w-11 items-center justify-center rounded-full text-[#242424] transition-all duration-300 hover:bg-[#f3eadc] hover:text-[#b08d57] hover:shadow-md active:scale-90"
              >
                <FaHeart />

                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex min-h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#b08d57] px-1 text-[11px] font-bold text-white shadow-md">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                title="السلة"
                aria-label="السلة"
                className="relative flex h-11 w-11 items-center justify-center rounded-full text-[#242424] transition-all duration-300 hover:bg-[#f3eadc] hover:text-[#b08d57] hover:shadow-md active:scale-90"
              >
                {cartPopup && (
                  <span className="pointer-events-none absolute -top-7 right-0 z-50 animate-[cartFly_1s_ease] rounded-full bg-[#b08d57] px-2 py-1 text-xs font-bold text-white">
                    +{cartPopup}
                  </span>
                )}

                <FaShoppingCart
                  className={`transition-all duration-500 ${
                    cartAnimating
                      ? "animate-[cartShake_800ms_cubic-bezier(.22,1,.36,1)]"
                      : ""
                  }`}
                />

                {cartCount > 0 && (
                  <span
                    className={`absolute -right-1 -top-1 flex min-h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#b08d57] px-1 text-[11px] font-bold text-white shadow-md ${
                      cartAnimating ? "animate-[cartBadge_600ms_ease]" : ""
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================
          Mobile Drawer
          ========================================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-[2147483647] md:hidden">
          {/* Overlay */}
          <div
            onClick={closeMenu}
            className={`absolute inset-0 backdrop-blur-sm transition-all duration-300 ${
              drawerVisible ? "bg-black/50 opacity-100" : "bg-black/0 opacity-0"
            }`}
          />

          {/* Drawer */}
          <div
            className={`absolute right-0 top-0 z-[2147483647] flex h-full w-80 max-w-[85%] flex-col overflow-y-auto rounded-l-3xl bg-[#faf8f3] shadow-2xl transition-all duration-300 ease-out ${
              drawerVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#e8e1d7] p-5">
              <Link
                to="/"
                onClick={closeMenu}
                className="group flex items-center gap-2"
              >
                <FaBolt className="text-2xl text-[#b08d57] transition-transform duration-300 group-hover:scale-110" />

                <div className="flex flex-col leading-none">
                  <span className="text-xl font-bold text-[#171717]">
                    شهدان
                  </span>

                  <span className="mt-1 text-[8px] font-semibold tracking-[0.25em] text-[#b08d57]">
                    SHAHDAN STORE
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                className="text-2xl text-[#737373] transition hover:text-[#b08d57]"
                aria-label="إغلاق القائمة"
              >
                <FaTimes />
              </button>
            </div>

            {/* Mobile Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 border-b border-[#e8e1d7] p-5"
            >
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ابحث عن منتج..."
                className="flex-1 rounded-xl border border-[#e8e1d7] bg-white p-3 text-sm outline-none transition focus:border-[#b08d57]"
              />

              <button
                type="submit"
                className="rounded-xl bg-[#171717] p-3 text-[#d4b477] transition hover:bg-[#b08d57] hover:text-white"
                aria-label="بحث"
              >
                <FaSearch />
              </button>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col border-b border-[#e8e1d7] p-3">
              <Link
                to="/"
                onClick={closeMenu}
                className={`rounded-2xl px-4 py-3 transition-all duration-300 active:scale-95 ${
                  location.pathname === "/"
                    ? "bg-[#f3eadc] font-semibold text-[#b08d57] shadow-sm"
                    : "text-[#242424] hover:bg-[#f3eadc] hover:text-[#b08d57]"
                }`}
              >
                الرئيسية
              </Link>

              <Link
                to="/products"
                onClick={closeMenu}
                className={`rounded-2xl px-4 py-3 transition-all duration-300 active:scale-95 ${
                  location.pathname === "/products"
                    ? "bg-[#f3eadc] font-semibold text-[#b08d57] shadow-sm"
                    : "text-[#242424] hover:bg-[#f3eadc] hover:text-[#b08d57]"
                }`}
              >
                كل المنتجات
              </Link>

              <Link
                to="/categories"
                onClick={closeMenu}
                className={`rounded-2xl px-4 py-3 transition-all duration-300 active:scale-95 ${
                  location.pathname === "/categories"
                    ? "bg-[#f3eadc] font-semibold text-[#b08d57] shadow-sm"
                    : "text-[#242424] hover:bg-[#f3eadc] hover:text-[#b08d57]"
                }`}
              >
                التصنيفات
              </Link>

              <Link
                to="/wishlist"
                onClick={closeMenu}
                className={`rounded-2xl px-4 py-3 transition-all duration-300 active:scale-95 ${
                  location.pathname === "/wishlist"
                    ? "bg-[#f3eadc] font-semibold text-[#b08d57] shadow-sm"
                    : "text-[#242424] hover:bg-[#f3eadc] hover:text-[#b08d57]"
                }`}
              >
                المفضلة
              </Link>

              <Link
                to="/track-order"
                onClick={closeMenu}
                className={`rounded-2xl px-4 py-3 transition-all duration-300 active:scale-95 ${
                  location.pathname === "/track-order"
                    ? "bg-[#f3eadc] font-semibold text-[#b08d57] shadow-sm"
                    : "text-[#242424] hover:bg-[#f3eadc] hover:text-[#b08d57]"
                }`}
              >
                متابعة الطلب
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className={`rounded-2xl px-4 py-3 transition-all duration-300 active:scale-95 ${
                  location.pathname === "/about"
                    ? "bg-[#f3eadc] font-semibold text-[#b08d57] shadow-sm"
                    : "text-[#242424] hover:bg-[#f3eadc] hover:text-[#b08d57]"
                }`}
              >
                تواصل معنا
              </Link>
            </nav>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="p-3">
                <p className="px-3 py-2 text-sm font-semibold text-[#b08d57]">
                  التصنيفات
                </p>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryClick(cat.name)}
                    className="group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-right text-[#242424] transition-all duration-300 hover:bg-[#f3eadc] hover:text-[#b08d57]"
                  >
                    {/* صورة التصنيف */}
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[#e8e1d7] bg-white shadow-sm">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-[#b08d57]">
                          صورة
                        </div>
                      )}
                    </div>

                    {/* اسم التصنيف */}
                    <span className="flex-1 text-sm font-medium">
                      {cat.name}
                    </span>

                    <FaChevronLeft className="text-xs text-[#b08d57] transition-transform duration-300 group-hover:-translate-x-1" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Space for fixed header */}
      <div
        className={
          settings?.announcementBar?.enabled ? "h-[128px]" : "h-[88px]"
        }
      />
    </>
  );
}

export default Header;
