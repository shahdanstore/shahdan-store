import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaHome,
  FaBoxOpen,
  FaThLarge,
  FaClipboardList,
  FaPhoneAlt,
  FaArrowLeft,
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
    setMenuOpen(false);
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

  const mobileLinks = [
    {
      to: "/",
      label: "الرئيسية",
      icon: FaHome,
    },
    {
      to: "/products",
      label: "كل المنتجات",
      icon: FaBoxOpen,
    },
    {
      to: "/categories",
      label: "التصنيفات",
      icon: FaThLarge,
    },
    {
      to: "/track-order",
      label: "متابعة الطلب",
      icon: FaClipboardList,
    },
    {
      to: "/about",
      label: "تواصل معنا",
      icon: FaPhoneAlt,
    },
  ];

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
              }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#e8e1d7] bg-white text-xl text-[#242424] shadow-sm transition-all duration-300 hover:border-[#b08d57] hover:text-[#b08d57] active:scale-90 md:hidden"
              aria-label="فتح القائمة"
            >
              <FaBars />
            </button>

            {/* =========================================
                Logo
                ========================================= */}
            <Link to="/" className="group flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full border border-[#d4b477]/40 bg-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md sm:h-14 sm:w-14">
                <img
                  src="/logo.png"
                  alt="شهدان ستور"
                  className="h-full w-full object-cover"
                />
              </div>

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
              <Link
                to="/track-order"
                title="متابعة الطلب"
                aria-label="متابعة الطلب"
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#242424] transition-all duration-300 hover:bg-[#f3eadc] hover:text-[#b08d57] hover:shadow-md active:scale-90"
              >
                <FaUser />
              </Link>

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
          New Mobile Menu
          ========================================= */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[2147483647] md:hidden">
            {/* Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
              className="absolute inset-0 bg-[#171717]/70 backdrop-blur-md"
            />

            {/* Main Menu */}
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-x-0 bottom-0 flex max-h-[94vh] flex-col overflow-hidden rounded-t-[32px] bg-[#faf8f3] shadow-2xl"
            >
              {/* Top Handle */}
              <div className="flex justify-center pt-3">
                <span className="h-1 w-12 rounded-full bg-[#d8d0c4]" />
              </div>

              {/* Menu Header */}
              <div className="flex items-center justify-between px-5 pb-4 pt-3">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="flex items-center gap-3"
                >
                  <div className="h-12 w-12 overflow-hidden rounded-2xl border border-[#d4b477]/40 bg-white shadow-sm">
                    <img
                      src="/logo.png"
                      alt="شهدان ستور"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-lg font-bold text-[#171717]">شهدان</p>

                    <p className="text-[8px] font-semibold tracking-[0.24em] text-[#b08d57]">
                      SHAHDAN STORE
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg text-[#242424] shadow-sm transition-all duration-300 hover:text-[#b08d57] active:scale-90"
                  aria-label="إغلاق القائمة"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto px-5 pb-8">
                {/* Welcome */}
                <div className="mb-5 rounded-[24px] bg-[#171717] p-5 text-white shadow-lg">
                  <p className="mb-1 text-xs font-medium text-[#d4b477]">
                    أهلاً بك في
                  </p>

                  <h2 className="text-xl font-bold">عالم شهدان</h2>

                  <p className="mt-2 text-xs leading-6 text-white/65">
                    اكتشف منتجاتنا واختر ما يناسبك بسهولة.
                  </p>
                </div>

                {/* Search */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="mb-6 flex items-center gap-2 rounded-[20px] border border-[#e8e1d7] bg-white p-2 shadow-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f3eadc] text-[#b08d57]">
                    <FaSearch />
                  </div>

                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="ابحث عن منتج..."
                    className="min-w-0 flex-1 bg-transparent px-1 text-sm text-[#242424] outline-none placeholder:text-[#9a9a9a]"
                  />

                  <button
                    type="submit"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#171717] text-[#d4b477] transition hover:bg-[#b08d57] hover:text-white active:scale-90"
                    aria-label="بحث"
                  >
                    <FaArrowLeft />
                  </button>
                </form>

                {/* Main Links */}
                <section className="mb-6">
                  <div className="mb-3 flex items-center justify-between px-1">
                    <h3 className="text-sm font-bold text-[#171717]">
                      استكشف المتجر
                    </h3>

                    <span className="text-[10px] font-medium text-[#a39a8e]">
                      القائمة الرئيسية
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {mobileLinks.map((item, index) => {
                      const Icon = item.icon;

                      const active =
                        item.to === "/"
                          ? location.pathname === "/"
                          : location.pathname.startsWith(item.to);

                      return (
                        <motion.div
                          key={item.to}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.05 + index * 0.05,
                            duration: 0.3,
                          }}
                        >
                          <Link
                            to={item.to}
                            onClick={closeMenu}
                            className={`group flex min-h-[86px] flex-col justify-between rounded-[22px] border p-4 transition-all duration-300 active:scale-[0.97] ${
                              active
                                ? "border-[#b08d57] bg-[#171717] text-white shadow-lg"
                                : "border-[#e8e1d7] bg-white text-[#242424] hover:border-[#d4b477] hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <span
                                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                                  active
                                    ? "bg-[#b08d57] text-white"
                                    : "bg-[#f3eadc] text-[#b08d57]"
                                }`}
                              >
                                <Icon className="text-sm" />
                              </span>

                              <FaChevronLeft
                                className={`mt-1 text-[10px] transition-transform duration-300 group-hover:-translate-x-1 ${
                                  active ? "text-[#d4b477]" : "text-[#b08d57]"
                                }`}
                              />
                            </div>

                            <span className="text-sm font-bold">
                              {item.label}
                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}

                    {/* Wishlist */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      <Link
                        to="/wishlist"
                        onClick={closeMenu}
                        className={`group relative flex min-h-[86px] flex-col justify-between rounded-[22px] border p-4 transition-all duration-300 active:scale-[0.97] ${
                          location.pathname.startsWith("/wishlist")
                            ? "border-[#b08d57] bg-[#171717] text-white shadow-lg"
                            : "border-[#e8e1d7] bg-white text-[#242424] hover:border-[#d4b477] hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3eadc] text-[#b08d57]">
                            <FaHeart className="text-sm" />
                          </span>

                          {wishlistCount > 0 && (
                            <span className="flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#b08d57] px-1 text-[10px] font-bold text-white">
                              {wishlistCount}
                            </span>
                          )}
                        </div>

                        <span className="text-sm font-bold">المفضلة</span>
                      </Link>
                    </motion.div>
                  </div>
                </section>

                {/* Cart Shortcut */}
                <Link
                  to="/cart"
                  onClick={closeMenu}
                  className="mb-6 flex items-center justify-between rounded-[24px] bg-[#b08d57] p-4 text-white shadow-md transition-all duration-300 hover:bg-[#171717] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                      <FaShoppingCart />
                    </div>

                    <div>
                      <p className="text-sm font-bold">سلة التسوق</p>

                      <p className="mt-1 text-[11px] text-white/70">
                        {cartCount > 0
                          ? `${cartCount} منتج في السلة`
                          : "السلة فارغة حاليًا"}
                      </p>
                    </div>
                  </div>

                  <FaChevronLeft className="text-xs" />
                </Link>

                {/* Categories */}
                {categories.length > 0 && (
                  <section>
                    <div className="mb-3 flex items-center justify-between px-1">
                      <h3 className="text-sm font-bold text-[#171717]">
                        تصفح حسب التصنيف
                      </h3>

                      <Link
                        to="/categories"
                        onClick={closeMenu}
                        className="text-[11px] font-semibold text-[#b08d57]"
                      >
                        عرض الكل
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {categories.map((cat, index) => (
                        <motion.button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategoryClick(cat.name)}
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.05 + index * 0.04,
                            duration: 0.3,
                          }}
                          className="group relative min-h-[130px] overflow-hidden rounded-[22px] border border-[#e8e1d7] bg-white text-right shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.97]"
                        >
                          {cat.image ? (
                            <img
                              src={cat.image}
                              alt={cat.name}
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-[#f3eadc]" />
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-white">
                            <span className="text-sm font-bold drop-shadow-sm">
                              {cat.name}
                            </span>

                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                              <FaChevronLeft className="text-[9px]" />
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
