import { Link } from "react-router-dom";
import { FaLayerGroup } from "react-icons/fa";

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
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8e6b8] text-[#8a642f] shadow-sm">
            <FaLayerGroup />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b88a44]">
            SHAHDAN STORE
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#30291f] md:text-4xl">
            تصنيفات شهدان ستور ⚡
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
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {categories.map((item) => {
              const categoryImage = item.image || item.imageUrl;

              return (
                <Link
                  to={`/products?category=${encodeURIComponent(item.name)}`}
                  key={item.id}
                  className="group relative overflow-hidden rounded-[26px] border border-[#eadfca] bg-white p-4 text-center shadow-[0_8px_30px_rgba(92,67,35,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#d8c39b] hover:shadow-[0_18px_45px_rgba(92,67,35,0.13)] md:p-6 lg:p-7"
                >
                  {/* Gold corner accent */}
                  <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-[30px] bg-gradient-to-br from-[#f8e6b8]/70 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Category Image */}
                  <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-[#eadfca] bg-[#f8f3e8] p-1.5 shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:border-[#c7a15a] group-hover:shadow-md md:h-28 md:w-28 lg:h-32 lg:w-32">
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
                      {categoryImage ? (
                        <img
                          src={categoryImage}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement.innerHTML =
                              '<span class="text-3xl text-[#b88a44]">✦</span>';
                          }}
                        />
                      ) : (
                        <FaLayerGroup className="text-3xl text-[#b88a44] md:text-4xl" />
                      )}
                    </div>
                  </div>

                  {/* Category Name */}
                  <h3 className="relative min-h-[28px] text-sm font-black text-[#30291f] transition-colors duration-300 group-hover:text-[#b88a44] md:text-base lg:text-lg">
                    {item.name}
                  </h3>

                  {/* Bottom Arrow */}
                  <div className="mt-3 flex items-center justify-center gap-1 text-[11px] font-semibold text-[#a79e91] transition-all duration-300 group-hover:gap-2 group-hover:text-[#8a642f]">
                    <span>استكشف التصنيف</span>
                    <span className="transition-transform duration-300 group-hover:-translate-x-1">
                      ←
                    </span>
                  </div>

                  {/* Bottom gold line */}
                  <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-t-full bg-gradient-to-r from-[#b88a44] to-[#c7a15a] transition-all duration-300 group-hover:w-1/2" />
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
