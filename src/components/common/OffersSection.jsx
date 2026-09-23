import { Link } from "react-router-dom";
import { FaArrowLeft, FaFire, FaTag, FaBolt } from "react-icons/fa";

import { useStore } from "../../hooks/useStore";

function OffersSection() {
  const { products } = useStore();

  const offers = products
    .filter((product) => Number(product.oldPrice) > Number(product.price))
    .slice(0, 4);

  if (offers.length === 0) return null;

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-[#f9f6ee] py-14 sm:py-20"
    >
      {/* Decorative Elements */}
      <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-[#d49b35]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#8e6b8e]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#d49b35] text-[#4a2e1b]">
                <FaFire className="text-sm" />
              </span>

              <span className="text-[10px] font-black tracking-[0.2em] text-[#b08d57]">
                SPECIAL OFFERS
              </span>
            </div>

            <h2 className="text-2xl font-black text-[#4a2e1b] sm:text-3xl">
              عروض تستحق الفرصة
            </h2>

            <p className="mt-2 text-xs text-[#8a8175] sm:text-sm">
              منتجات مختارة بأسعار مميزة لفترة محدودة
            </p>
          </div>

          <Link
            to="/products"
            className="hidden items-center gap-2 rounded-full border border-[#eadfca] bg-white px-4 py-2.5 text-xs font-bold text-[#4a2e1b] shadow-sm transition hover:border-[#d49b35] hover:text-[#b08d57] sm:flex"
          >
            جميع المنتجات
            <FaArrowLeft className="text-[10px]" />
          </Link>
        </div>

        {/* Offers */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((product, index) => {
            const oldPrice = Number(product.oldPrice);
            const price = Number(product.price);

            const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

            return (
              <Link
                key={product.id}
                to={`/product/${product.seoSlug || product.slug}`}
                className={`group relative overflow-hidden rounded-[26px] border border-[#eadfca] bg-white shadow-[0_8px_30px_rgba(74,46,27,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(74,46,27,0.12)] ${
                  index === 0 ? "lg:scale-[1.02]" : ""
                }`}
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-[#f9f6ee]">
                  <img
                    src={
                      product.images?.[0] || "https://via.placeholder.com/500"
                    }
                    alt={product.name || "منتج شهدان"}
                    className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-60"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4a2e1b]/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Discount */}
                  <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-[#8e6b8e] px-3 py-1.5 text-[10px] font-black text-white shadow-lg">
                    <FaTag className="text-[9px]" />
                    خصم {discount}%
                  </div>

                  {/* Offer Icon */}
                  <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/85 text-[#d49b35] shadow-sm backdrop-blur-sm">
                    <FaBolt className="text-xs" />
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 sm:p-5">
                  <div className="mb-2 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d49b35]" />
                    <span className="text-[9px] font-bold text-[#b08d57]">
                      عرض خاص
                    </span>
                  </div>

                  <h3 className="line-clamp-2 min-h-[42px] text-sm font-black leading-6 text-[#4a2e1b] transition-colors group-hover:text-[#b08d57]">
                    {product.name}
                  </h3>

                  <div className="mt-4 flex items-end justify-between gap-2">
                    <div>
                      <span className="block text-xl font-black text-[#d49b35]">
                        {price}{" "}
                        <span className="text-[10px] font-bold">ر.س</span>
                      </span>

                      <span className="text-[11px] font-medium text-[#a39a8e] line-through">
                        {oldPrice} ر.س
                      </span>
                    </div>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4a2e1b] text-white transition-all duration-300 group-hover:bg-[#d49b35] group-hover:text-[#4a2e1b]">
                      <FaArrowLeft className="text-[10px]" />
                    </span>
                  </div>

                  {/* Bottom Line */}
                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#f3eadc]">
                    <div className="h-full w-1/3 rounded-full bg-[#d49b35] transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Link */}
        <Link
          to="/products"
          className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-[#4a2e1b] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#d49b35] hover:text-[#4a2e1b] sm:hidden"
        >
          <FaFire className="text-[#d49b35]" />
          مشاهدة جميع المنتجات
          <FaArrowLeft className="text-[10px]" />
        </Link>
      </div>
    </section>
  );
}

export default OffersSection;
