import { Link } from "react-router-dom";
import { FaLayerGroup, FaArrowLeft } from "react-icons/fa";

import { useStore } from "../../hooks/useStore";

function Categories() {
  const { categories } = useStore();

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#fdfbf7] to-[#f8f3e8] py-16 md:py-20"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-[#c7a15a]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#b88a44]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-10 text-center md:mb-12">
          <h2 className="mt-2 text-3xl font-black text-[#30291f] md:text-4xl">
            التصنيفات
          </h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#b88a44] to-[#c7a15a]" />

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#8a8175] md:text-base">
            اكتشف منتجات شهدان بسهولة من خلال تصنيفاتنا المختارة بعناية.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-3xl border border-[#eadfca] bg-white px-6 py-12 text-center shadow-sm">
            <FaLayerGroup className="mx-auto mb-4 text-3xl text-[#c7a15a]" />

            <p className="font-semibold text-[#30291f]">لا توجد تصنيفات بعد.</p>

            <p className="mt-2 text-sm text-[#8a8175]">
              ستظهر التصنيفات هنا عند إضافتها من لوحة التحكم.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {categories.map((item) => {
              const categoryImage = item.image || item.imageUrl;

              return (
                <Link
                  to={`/products?category=${encodeURIComponent(item.name)}`}
                  key={item.id}
                  className="group relative aspect-[0.82] overflow-hidden rounded-[28px] border border-[#eadfca] bg-[#f8f3e8] shadow-[0_10px_35px_rgba(92,67,35,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#d8c39b] hover:shadow-[0_20px_50px_rgba(92,67,35,0.16)]"
                >
                  {/* Category Image */}
                  <div className="absolute inset-0">
                    {categoryImage ? (
                      <img
                        src={categoryImage}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement.innerHTML =
                            '<div class="flex h-full w-full items-center justify-center"><span class="text-5xl text-[#b88a44]">✦</span></div>';
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <FaLayerGroup className="text-5xl text-[#b88a44]" />
                      </div>
                    )}
                  </div>

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/85 via-[#171717]/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Top Badge */}
                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#b88a44]">
                    <FaArrowLeft className="text-xs" />
                  </div>

                  {/* Category Content */}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-right md:p-5">
                    <div className="mb-2 h-1 w-8 rounded-full bg-[#d4b477] transition-all duration-500 group-hover:w-14" />

                    <h3 className="text-lg font-black text-white md:text-xl">
                      {item.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-xs font-medium text-white/70 transition-colors duration-300 group-hover:text-[#f8e6b8]">
                      <span>استكشف التصنيف</span>
                      <FaArrowLeft className="text-[10px] transition-transform duration-300 group-hover:-translate-x-1" />
                    </div>
                  </div>

                  {/* Gold Border Glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-transparent transition-colors duration-500 group-hover:border-[#d4b477]/60" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Categories;
