import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaStar,
  FaShoppingCart,
  FaCheck,
  FaHeart,
  FaArrowLeft,
} from "react-icons/fa";

import { useStore } from "../../hooks/useStore";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

function FeaturedProducts() {
  const { products } = useStore();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [addedId, setAddedId] = useState(null);

  const featured = products.slice(0, 8);

  const handleAddToCart = (e, product) => {
    e.preventDefault();

    addToCart(product, 1);

    setAddedId(product.id);

    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  const handleToggleWishlist = (e, productId) => {
    e.preventDefault();
    toggleWishlist(productId);
  };

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-gradient-to-b from-[#f9f6ee] via-[#fdfbf7] to-white py-14 md:py-20"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-[#d49b35]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#7a8b43]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-9 text-center md:mb-12">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3e3bf] text-[#9a6b1f] shadow-sm">
            <FaStar />
          </div>

          <h2 className="mt-2 text-2xl font-black text-[#4a2e1b] md:text-4xl">
            المنتجات المميزة
          </h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#d49b35] to-[#b77a20]" />

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#81776b] md:text-base">
            منتجات مختارة بعناية لتجربة أفضل
          </p>
        </div>

        {featured.length === 0 ? (
          <p className="text-center text-[#81776b]">لا توجد منتجات بعد.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {featured.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.seoSlug || product.slug}`}
                className="group relative overflow-hidden rounded-[24px] border border-[#eadfca] bg-white shadow-[0_8px_30px_rgba(74,46,27,0.07)] transition-all duration-500 hover:-translate-y-2 hover:border-[#d8bd86] hover:shadow-[0_18px_45px_rgba(74,46,27,0.14)]"
              >
                {/* Wishlist */}
                <button
                  type="button"
                  onClick={(e) => handleToggleWishlist(e, product.id)}
                  className={`absolute left-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/90 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 md:left-4 md:top-4 md:h-10 md:w-10 ${
                    isInWishlist(product.id)
                      ? "text-red-500"
                      : "text-[#a79e91] hover:text-[#8e6b8e]"
                  }`}
                  aria-label="إضافة إلى المفضلة"
                >
                  <FaHeart size={14} />
                </button>

                {/* Discount */}
                {product.oldPrice && (
                  <div className="absolute right-3 top-3 z-20 rounded-full bg-[#8e6b8e] px-2.5 py-1 text-[10px] font-bold text-white shadow-md md:right-4 md:top-4 md:px-3 md:text-xs">
                    خصم
                  </div>
                )}

                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-[#f8f3e8]">
                  <img
                    src={
                      product.images?.[0] || "https://via.placeholder.com/500"
                    }
                    alt={product.name || "منتج شهدان"}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Image Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4a2e1b]/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Product Information */}
                <div className="space-y-2.5 p-3.5 md:space-y-4 md:p-5">
                  {product.category && (
                    <span className="inline-block rounded-full bg-[#f3e3bf] px-2.5 py-1 text-[10px] font-bold text-[#8a642f] md:px-3 md:text-xs">
                      {product.category}
                    </span>
                  )}

                  <h3 className="line-clamp-2 min-h-[40px] text-sm font-black leading-6 text-[#4a2e1b] transition-colors duration-300 group-hover:text-[#b27b22] md:min-h-[55px] md:text-lg md:leading-7">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="flex gap-0.5 text-[10px] text-[#d49b35] md:text-sm">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>

                    <span className="text-[10px] font-medium text-[#9b9287] md:text-sm">
                      ({product.rating || 5})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-black text-[#b27b22] md:text-2xl">
                      {product.price} ر.س
                    </span>

                    {product.oldPrice && (
                      <span className="text-xs text-[#aaa19a] line-through md:text-sm">
                        {product.oldPrice} ر.س
                      </span>
                    )}
                  </div>

                  {/* Stock */}
                  <div>
                    {product.stock > 0 ? (
                      <span className="text-[11px] font-bold text-[#7a8b43] md:text-sm">
                        متوفر بالمخزون
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-red-500 md:text-sm">
                        نفد المخزون
                      </span>
                    )}
                  </div>

                  {/* Add To Cart */}
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={product.stock <= 0}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-white transition-all duration-300 md:rounded-2xl md:py-3 md:text-base ${
                      product.stock <= 0
                        ? "cursor-not-allowed bg-[#aaa19a]"
                        : addedId === product.id
                          ? "bg-[#4a2e1b]"
                          : "bg-[#d49b35] hover:bg-[#b27b22] hover:shadow-lg"
                    }`}
                  >
                    {addedId === product.id ? (
                      <>
                        <FaCheck />
                        تمت الإضافة
                      </>
                    ) : (
                      <>
                        <FaShoppingCart />
                        أضف للسلة
                      </>
                    )}
                  </button>
                </div>

                {/* Bottom Gold Line */}
                <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-t-full bg-gradient-to-r from-[#d49b35] to-[#b27b22] transition-all duration-500 group-hover:w-1/2" />

                {/* Product Hover Arrow */}
                <div className="pointer-events-none absolute bottom-[78px] left-4 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-white/90 text-[#b27b22] opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <FaArrowLeft className="text-[10px]" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
