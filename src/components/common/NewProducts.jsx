import { Link } from "react-router-dom";
import { FaArrowLeft, FaBoxOpen, FaStar } from "react-icons/fa";
import { useStore } from "../../hooks/useStore";

function NewProducts() {
  const { products } = useStore();

  const latestProducts = [...products]
    .sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;

      const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;

      return dateB - dateA;
    })
    .slice(0, 4);

  if (latestProducts.length === 0) {
    return null;
  }

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-white py-14 sm:py-20"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#d49b35]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#7a8b43]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f9f6ee] text-[#d49b35]">
                <FaStar className="text-sm" />
              </span>

              <span className="text-[10px] font-black tracking-[0.2em] text-[#b08d57]">
                NEW ARRIVALS
              </span>
            </div>

            <h2 className="text-2xl font-black text-[#4a2e1b] sm:text-3xl">
              وصل حديثًا
            </h2>

            <p className="mt-2 text-xs text-[#8a8175] sm:text-sm">
              اكتشف أحدث المنتجات المضافة إلى متجر شهدان
            </p>
          </div>

          <Link
            to="/products"
            className="hidden items-center gap-2 rounded-full border border-[#eadfca] bg-[#f9f6ee] px-4 py-2.5 text-xs font-bold text-[#4a2e1b] transition hover:border-[#d49b35] hover:text-[#b08d57] sm:flex"
          >
            كل المنتجات
            <FaArrowLeft className="text-[10px]" />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {latestProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.seoSlug || product.slug}`}
              className="group relative overflow-hidden rounded-[24px] border border-[#eadfca] bg-white shadow-[0_6px_25px_rgba(74,46,27,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(74,46,27,0.11)]"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-[#f9f6ee]">
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/500"}
                  alt={product.name || "منتج شهدان"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* New Badge */}
                <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-[#4a2e1b] px-2.5 py-1.5 text-[9px] font-black text-white shadow-lg">
                  <FaStar className="text-[#d49b35]" />
                  جديد
                </div>

                {/* Number */}
                <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-white/85 text-[10px] font-black text-[#4a2e1b] shadow-sm backdrop-blur-sm">
                  0{index + 1}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-[#4a2e1b]/80 to-transparent px-4 pb-4 pt-10 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="flex items-center justify-center gap-2 text-[10px] font-bold text-white">
                    عرض المنتج
                    <FaArrowLeft className="text-[#d49b35]" />
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3.5 sm:p-5">
                {product.category && (
                  <div className="mb-2 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d49b35]" />

                    <p className="line-clamp-1 text-[9px] font-bold text-[#b08d57] sm:text-[10px]">
                      {product.category}
                    </p>
                  </div>
                )}

                <h3 className="line-clamp-2 min-h-[40px] text-sm font-black leading-5 text-[#4a2e1b] transition-colors group-hover:text-[#b08d57] sm:text-base">
                  {product.name}
                </h3>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <p className="text-base font-black text-[#d49b35] sm:text-xl">
                    {product.price}{" "}
                    <span className="text-[9px] font-bold text-[#8a8175]">
                      ر.س
                    </span>
                  </p>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f9f6ee] text-[#4a2e1b] transition-all duration-300 group-hover:bg-[#d49b35]">
                    <FaArrowLeft className="text-[9px]" />
                  </span>
                </div>

                {/* Bottom Accent */}
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#f3eadc]">
                  <div className="h-full w-1/4 rounded-full bg-[#d49b35] transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Link */}
        <Link
          to="/products"
          className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-[#4a2e1b] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#d49b35] hover:text-[#4a2e1b] sm:hidden"
        >
          <FaBoxOpen className="text-[#d49b35]" />
          مشاهدة جميع المنتجات
          <FaArrowLeft className="text-[10px]" />
        </Link>
      </div>
    </section>
  );
}

export default NewProducts;
