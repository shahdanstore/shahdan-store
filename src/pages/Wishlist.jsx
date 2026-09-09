
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaCheck,
  FaArrowLeft,
} from "react-icons/fa";
import { useState } from "react";

import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const { addToCart } = useCart();

  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product, 1);

    setAddedId(product.id);

    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
  };

  if (wishlistItems.length === 0) {
    return (
      <section
        dir="rtl"
        className="min-h-[70vh] bg-gradient-to-b from-[#f8f3e8] via-white to-[#f8f3e8] px-4 py-20 md:py-28"
      >
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-[#eadfca] bg-white shadow-[0_12px_35px_rgba(92,67,35,0.10)]">
            <FaHeart className="text-4xl text-[#c7a15a]" />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#b88a44]">
            SHAHDAN
          </p>

          <h1 className="text-3xl font-black text-[#30291f] md:text-4xl">
            قائمة المفضلة فارغة
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#8a8175] md:text-base">
            لم تضف أي منتجات إلى المفضلة بعد. اضغط على أيقونة القلب بجانب
            المنتجات التي ترغب بالاحتفاظ بها.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#b88a44] to-[#8a642f] px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            تصفح المنتجات
            <FaArrowLeft className="text-sm" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#f8f3e8] via-white to-[#f8f3e8] py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8e6b8] text-[#8a642f] shadow-sm">
            <FaHeart className="text-xl" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b88a44]">
            SHAHDAN
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#30291f] md:text-4xl">
            المفضلة
          </h1>

          <p className="mt-3 text-sm text-[#8a8175]">
            المنتجات التي اخترتها بعناية
          </p>
        </div>

        {/* Products */}
        <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {wishlistItems.map((product) => {
            const productUrl = `/product/${product.seoSlug || product.slug}`;

            const isOutOfStock = Number(product.stock || 0) <= 0;
            const isAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-[26px] border border-[#eadfca] bg-white shadow-[0_10px_35px_rgba(92,67,35,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-[#d8c39b] hover:shadow-[0_20px_50px_rgba(92,67,35,0.14)]"
              >
                {/* Product Image */}
                <Link
                  to={productUrl}
                  className="relative block overflow-hidden bg-[#f8f3e8]"
                >
                  <div className="flex h-64 items-center justify-center p-5 md:h-72">
                    <img
                      src={
                        product.images?.[0] ||
                        "https://via.placeholder.com/500"
                      }
                      alt={product.name || "منتج شهدان"}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Image Overlay */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#30291f]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemove(product.id)}
                  className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#eadfca] bg-white/95 text-[#9d5d55] shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-[#fff7f5] hover:text-[#8f4038]"
                  aria-label="إزالة من المفضلة"
                  title="إزالة من المفضلة"
                >
                  <FaTrash className="text-sm" />
                </button>

                {/* Content */}
                <div className="p-5 md:p-6">
                  {product.category && (
                    <p className="mb-1.5 text-xs font-semibold text-[#a79e91]">
                      {product.category}
                    </p>
                  )}

                  <Link to={productUrl}>
                    <h3 className="line-clamp-2 min-h-[52px] text-lg font-black leading-7 text-[#30291f] transition-colors duration-300 hover:text-[#b88a44]">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Price */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-xl font-black text-[#b88a44]">
                      {Number(product.price || 0).toFixed(2)}{" "}
                      <span className="text-xs font-bold text-[#8a8175]">
                        ر.س
                      </span>
                    </p>

                    {isOutOfStock && (
                      <span className="rounded-full bg-[#f1eee8] px-2.5 py-1 text-[10px] font-bold text-[#8a8175]">
                        غير متوفر
                      </span>
                    )}
                  </div>

                  {/* Add To Cart */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    disabled={isOutOfStock}
                    className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 disabled:cursor-not-allowed disabled:bg-[#b8b1a7] ${
                      isAdded
                        ? "bg-[#30291f] shadow-md"
                        : "bg-gradient-to-r from-[#b88a44] to-[#8a642f] hover:-translate-y-0.5 hover:shadow-lg"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <FaCheck />
                        أُضيف للسلة
                      </>
                    ) : isOutOfStock ? (
                      "غير متوفر"
                    ) : (
                      <>
                        <FaShoppingCart />
                        أضف للسلة
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#eadfca] bg-white/70 px-5 py-4 text-center">
          <p className="text-xs leading-6 text-[#8a8175]">
            احتفظ بمنتجاتك المفضلة هنا لتعود إليها بسهولة في أي وقت.
          </p>
        </div>
      </div>
    </section>
  );
}

