import { useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaStar,
  FaShoppingCart,
  FaSearch,
  FaCheck,
  FaHeart,
  FaTimes,
  FaChevronDown,
  FaFire,
  FaArrowLeft,
  FaBoxOpen,
  FaSlidersH,
} from "react-icons/fa";

import { useStore } from "../hooks/useStore";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

export default function Products() {
  const { products, categories } = useStore();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [addedId, setAddedId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "default";
  const productsSectionRef = useRef(null);

  const handleSearchChange = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value.trim()) {
        next.set("search", value);
      } else {
        next.delete("search");
      }

      return next;
    });
  };

  const handleSortChange = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value === "default") {
        next.delete("sort");
      } else {
        next.set("sort", value);
      }

      return next;
    });
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, 1);
    setAddedId(product.id);

    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  const handleToggleWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist(productId);
  };

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const productCategories = Array.isArray(product.categories)
        ? product.categories
        : product.category
          ? [product.category]
          : [];

      const matchesCategory = activeCategory
        ? productCategories.includes(activeCategory)
        : true;

      if (!query) {
        return matchesCategory;
      }

      const haystack = [
        product.name,
        ...productCategories,
        product.description,
        ...(product.ingredients || []),
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && haystack.includes(query);
    });

    return [...filtered].sort((a, b) => {
      const priceA = Number(a.price || 0);
      const priceB = Number(b.price || 0);

      const oldPriceA = Number(a.oldPrice || 0);
      const oldPriceB = Number(b.oldPrice || 0);

      const discountA =
        oldPriceA > priceA ? ((oldPriceA - priceA) / oldPriceA) * 100 : 0;

      const discountB =
        oldPriceB > priceB ? ((oldPriceB - priceB) / oldPriceB) * 100 : 0;

      switch (sort) {
        case "price-low":
          return priceA - priceB;

        case "price-high":
          return priceB - priceA;

        case "discount":
          return discountB - discountA;

        case "name":
          return (a.name || "").localeCompare(b.name || "", "ar");

        case "newest":
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );

        default:
          return 0;
      }
    });
  }, [products, activeCategory, search, sort]);

  const handleCategoryClick = (category) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      return params;
    });

    setTimeout(() => {
      const element = productsSectionRef.current;

      if (!element) return;

      const offset = 200;
      const position = element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: position - offset,
        behavior: "smooth",
      });
    }, 100);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasFilters = search || activeCategory || sort !== "default";

  return (
    <section dir="rtl" className="min-h-screen bg-[#f9f6ee] py-8 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* =========================================================
            PAGE HEADER
        ========================================================== */}

        {/* =========================================================
    CATEGORIES - COMPACT IMAGE CARDS
========================================================== */}
        {categories.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black tracking-[0.18em] text-[#d49b35]">
                  CATEGORIES
                </p>
                <h2 className="mt-1 text-lg font-black text-[#4a2e1b] sm:text-xl">
                  تصفح التصنيفات
                </h2>
              </div>

              {activeCategory && (
                <button
                  type="button"
                  onClick={() => handleCategoryClick("")}
                  className="rounded-full border border-[#eadfca] bg-white px-3 py-1.5 text-[10px] font-bold text-[#8a642f] transition hover:border-[#d49b35] hover:bg-[#f9f6ee]"
                >
                  الكل
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
              {/* ALL PRODUCTS */}
              <button
                type="button"
                onClick={() => handleCategoryClick("")}
                className={`group relative aspect-[0.9] overflow-hidden rounded-2xl transition-all duration-300 ${
                  !activeCategory
                    ? "ring-2 ring-[#d49b35] ring-offset-2"
                    : "hover:-translate-y-1"
                }`}
              >
                <div className="absolute inset-0 bg-[#4a2e1b]" />

                <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full border-[12px] border-[#d49b35]/30" />
                <div className="absolute -bottom-6 -left-5 h-24 w-24 rounded-full border-[14px] border-[#8e6b8e]/30" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-3 text-right">
                  <FaBoxOpen className="mb-2 text-sm text-[#d49b35]" />

                  <h3 className="text-xs font-black text-white sm:text-sm">
                    كل المنتجات
                  </h3>
                </div>
              </button>

              {/* CATEGORY CARDS */}
              {categories.map((cat) => {
                const categoryImage =
                  cat.image || cat.imageUrl || cat.icon || "";
                const isActive = activeCategory === cat.name;

                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`group relative aspect-[0.9] overflow-hidden rounded-2xl text-right transition-all duration-300 ${
                      isActive
                        ? "ring-2 ring-[#d49b35] ring-offset-2"
                        : "hover:-translate-y-1"
                    }`}
                  >
                    {categoryImage ? (
                      <img
                        src={categoryImage}
                        alt={cat.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#eadfca]" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#2b1a10]/85 via-transparent to-transparent" />

                    {isActive && (
                      <div className="absolute right-2 top-2 rounded-full bg-[#d49b35] px-2 py-1 text-[8px] font-black text-[#4a2e1b]">
                        محدد
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <div className="mb-1 h-0.5 w-5 rounded-full bg-[#d49b35] transition-all duration-300 group-hover:w-9" />

                      <h3 className="line-clamp-2 text-xs font-black text-white drop-shadow-md sm:text-sm">
                        {cat.name}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* =========================================================
            SEARCH + SORT
        ========================================================== */}
        <div className="mb-7 grid gap-3 md:grid-cols-[1fr_220px]">
          {/* SEARCH */}
          <div className="relative rounded-[22px] border border-[#eadfca] bg-white p-2 shadow-[0_8px_30px_rgba(74,46,27,0.05)]">
            <div className="relative">
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d49b35]" />

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="ابحث باسم المنتج أو المكونات..."
                className="h-12 w-full rounded-2xl bg-[#f9f6ee] pr-11 pl-11 text-sm text-[#4a2e1b] outline-none transition focus:bg-white focus:ring-2 focus:ring-[#d49b35]/20"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute left-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#8a8175] shadow-sm transition hover:text-[#4a2e1b]"
                  aria-label="مسح البحث"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>
          </div>

          {/* SORT */}
          <div className="relative rounded-[22px] border border-[#eadfca] bg-white p-2 shadow-[0_8px_30px_rgba(74,46,27,0.05)]">
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="h-12 w-full appearance-none rounded-2xl bg-[#f9f6ee] px-4 pl-10 text-sm font-bold text-[#5f574c] outline-none transition focus:bg-white focus:ring-2 focus:ring-[#d49b35]/20"
            >
              <option value="default">ترتيب المنتجات</option>
              <option value="newest">الأحدث أولًا</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
              <option value="discount">الأكثر خصمًا</option>
              <option value="name">الاسم: أبجديًا</option>
            </select>

            <FaChevronDown className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-xs text-[#aaa093]" />
          </div>
        </div>

        {/* =========================================================
            FILTER STATUS
        ========================================================== */}
        {hasFilters && (
          <div className="mb-7 flex flex-wrap items-center gap-2 rounded-[20px] border border-[#eadfca] bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8a8175]">
              <FaSlidersH className="text-[#d49b35]" />

              <span>النتائج</span>

              <strong className="text-[#8a642f]">
                {filteredProducts.length}
              </strong>
            </div>

            {activeCategory && (
              <span className="rounded-full bg-[#f3eadc] px-3 py-1.5 text-[11px] font-bold text-[#8a642f]">
                {activeCategory}
              </span>
            )}

            {search && (
              <span className="max-w-[180px] truncate rounded-full bg-[#f9f6ee] px-3 py-1.5 text-[11px] font-bold text-[#8a642f]">
                "{search}"
              </span>
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="mr-auto rounded-full px-3 py-1.5 text-[11px] font-bold text-[#8a8175] transition hover:bg-[#f9f6ee] hover:text-[#4a2e1b]"
            >
              إعادة ضبط
            </button>
          </div>
        )}

        {/* =========================================================
            PRODUCTS TITLE
        ========================================================== */}
        {filteredProducts.length > 0 && (
          <div
            ref={productsSectionRef}
            className="mb-5 flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-black tracking-[0.22em] text-[#d49b35]">
                SHAH DAN STORE
              </p>

              <h2 className="mt-1 text-xl font-black text-[#4a2e1b] sm:text-2xl">
                المنتجات
              </h2>
            </div>

            <span className="rounded-full bg-white px-4 py-2 text-[11px] font-bold text-[#8a8175] shadow-sm">
              {filteredProducts.length} منتج
            </span>
          </div>
        )}

        {/* =========================================================
            EMPTY
        ========================================================== */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-[30px] border border-[#eadfca] bg-white px-6 py-20 text-center shadow-[0_10px_40px_rgba(74,46,27,0.05)]">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#f9f6ee] text-[#d49b35]">
              <FaSearch className="text-2xl" />
            </div>

            <h2 className="text-xl font-black text-[#4a2e1b]">لا توجد نتائج</h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#8a8175]">
              لم نتمكن من العثور على منتجات تطابق خيارات البحث الحالية.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#4a2e1b] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#5b3922]"
            >
              <FaBoxOpen />
              عرض جميع المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {filteredProducts.map((product) => {
              const productCategories = Array.isArray(product.categories)
                ? product.categories
                : product.category
                  ? [product.category]
                  : [];

              const oldPrice = Number(product.oldPrice || 0);
              const price = Number(product.price || 0);

              const discount =
                oldPrice > price
                  ? Math.round(((oldPrice - price) / oldPrice) * 100)
                  : 0;

              const productUrl = product.seoSlug || product.slug || product.id;

              const wished = isInWishlist(product.id);
              const isAdded = addedId === product.id;

              return (
                <article
                  key={product.id}
                  className="group relative overflow-hidden rounded-[26px] border border-[#eadfca] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#d49b35] hover:shadow-[0_20px_45px_rgba(74,46,27,0.12)]"
                >
                  {/* IMAGE */}
                  <div className="relative">
                    <Link
                      to={`/product/${productUrl}`}
                      className="block overflow-hidden bg-[#f9f6ee]"
                    >
                      <div className="relative aspect-[0.92]">
                        <img
                          src={
                            product.images?.[0] ||
                            "https://via.placeholder.com/500"
                          }
                          alt={product.name || "منتج شهدان"}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          loading="lazy"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#4a2e1b]/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                      </div>
                    </Link>

                    {discount > 0 && (
                      <div className="absolute right-3 top-3 rounded-xl bg-[#8e6b8e] px-2.5 py-1.5 text-[10px] font-black text-white shadow-lg">
                        -{discount}%
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={(e) => handleToggleWishlist(e, product.id)}
                      className={`absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl border shadow-md backdrop-blur transition-all duration-300 hover:scale-110 ${
                        wished
                          ? "border-[#8e6b8e] bg-[#8e6b8e] text-white"
                          : "border-white/70 bg-white/90 text-[#8a8175] hover:text-[#8e6b8e]"
                      }`}
                      aria-label={
                        wished ? "إزالة من المفضلة" : "إضافة إلى المفضلة"
                      }
                    >
                      <FaHeart
                        size={13}
                        className={wished ? "fill-current" : ""}
                      />
                    </button>

                    {discount > 0 && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-black text-[#8a642f] shadow-sm backdrop-blur">
                        <FaFire className="text-[#d49b35]" />
                        عرض خاص
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-3.5 md:p-5">
                    {productCategories.length > 0 && (
                      <div className="mb-2 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#d49b35]" />

                        <p className="line-clamp-1 text-[10px] font-bold text-[#8a8175] md:text-xs">
                          {productCategories.join(" • ")}
                        </p>
                      </div>
                    )}

                    <Link to={`/product/${productUrl}`}>
                      <h3 className="line-clamp-2 min-h-[40px] text-sm font-black leading-5 text-[#4a2e1b] transition-colors group-hover:text-[#8a642f] md:min-h-[48px] md:text-base md:leading-6">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="flex gap-0.5 text-[9px] text-[#d49b35]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>

                        <span className="text-[9px] text-[#aaa093]">تقييم</span>
                      </div>

                      <span className="text-[9px] font-bold text-[#7a8b43]">
                        متوفر
                      </span>
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-2">
                      <div>
                        <p className="text-xl font-black text-[#4a2e1b] md:text-2xl">
                          {product.price}

                          <span className="mr-1 text-[9px] font-bold text-[#8a8175] md:text-xs">
                            ر.س
                          </span>
                        </p>

                        {discount > 0 && (
                          <p className="mt-0.5 text-[10px] text-[#aaa093] line-through md:text-xs">
                            {product.oldPrice} ر.س
                          </p>
                        )}
                      </div>

                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f9f6ee] text-[#d49b35]">
                        <FaShoppingCart className="text-xs" />
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(e, product)}
                      className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-xs font-black transition-all duration-300 md:py-3.5 md:text-sm ${
                        isAdded
                          ? "bg-[#7a8b43] text-white"
                          : "bg-[#4a2e1b] text-white hover:-translate-y-0.5 hover:bg-[#5b3922] hover:shadow-lg"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <FaCheck />
                          تمت الإضافة
                        </>
                      ) : (
                        <>
                          أضف إلى السلة
                          <FaArrowLeft className="text-[10px]" />
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
