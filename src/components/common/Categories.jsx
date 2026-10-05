import { Link } from "react-router-dom";
import { FaLayerGroup, FaArrowLeft } from "react-icons/fa";

import { useStore } from "../../hooks/useStore";

function Categories() {
  const { categories } = useStore();

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-[#f8f5ed] py-14 md:py-20"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-[#cea253]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#71804a]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-10 text-center md:mb-14">
          <h2 className="text-3xl font-black tracking-tight text-[#442410] md:text-4xl lg:text-5xl">
            تصفح التصنيفات
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#c8a15b] md:w-16" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#c8a15b]" />
            <span className="h-px w-12 bg-[#c8a15b] md:w-16" />
          </div>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#897542] md:text-base">
            اكتشف مجموعتنا المختارة بعناية من المنتجات الطبيعية.
          </p>
        </div>

        {/* Empty State */}
        {categories.length === 0 ? (
          <div className="rounded-[28px] border border-[#e3d8c5] bg-[#fffdf8] px-6 py-14 text-center shadow-[0_10px_35px_rgba(68,36,16,0.06)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f1ede4]">
              <FaLayerGroup className="text-2xl text-[#c28f3d]" />
            </div>

            <p className="font-bold text-[#442410]">لا توجد تصنيفات بعد.</p>

            <p className="mt-2 text-sm text-[#897542]">
              ستظهر التصنيفات هنا عند إضافتها من لوحة التحكم.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:grid-cols-4">
            {categories.map((item) => {
              const categoryImage = item.image || item.imageUrl;

              return (
                <Link
                  to={`/products?category=${encodeURIComponent(item.name)}`}
                  key={item.id}
                  className="
                    group
                    relative
                    aspect-[0.82]
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-[#dfd2bd]
                    bg-[#eee7d8]
                    shadow-[0_8px_28px_rgba(68,36,16,0.08)]
                    transition-all
                    duration-500
                    hover:-translate-y-1.5
                    hover:border-[#c28f3d]
                    hover:shadow-[0_18px_45px_rgba(68,36,16,0.15)]
                    md:rounded-[28px]
                  "
                >
                  {/* Category Image */}
                  <div className="absolute inset-0">
                    {categoryImage ? (
                      <img
                        src={categoryImage}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";

                          e.currentTarget.parentElement.innerHTML =
                            '<div class="flex h-full w-full items-center justify-center bg-[#eee7d8]"><span class="text-5xl text-[#c28f3d]">✦</span></div>';
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#eee7d8]">
                        <FaLayerGroup className="text-5xl text-[#c28f3d]" />
                      </div>
                    )}
                  </div>

                  {/* Natural Dark Overlay */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-[#442410]/90
                      via-[#442410]/25
                      to-transparent
                      opacity-90
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* Top Badge */}
                  <div
                    className="
                      absolute
                      right-3
                      top-3
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/30
                      bg-[#442410]/35
                      text-[#f1d18d]
                      backdrop-blur-md
                      transition-all
                      duration-300
                      group-hover:scale-105
                      group-hover:border-[#d6b16b]
                      group-hover:bg-[#c28f3d]
                      group-hover:text-white
                      md:right-4
                      md:top-4
                    "
                  >
                    <FaArrowLeft className="text-[10px]" />
                  </div>

                  {/* Category Content */}
                  <div className="absolute inset-x-0 bottom-0 p-3.5 text-right md:p-5">
                    <div className="mb-2 h-0.5 w-8 rounded-full bg-[#d6b16b] transition-all duration-500 group-hover:w-14" />

                    <h3 className="line-clamp-2 text-base font-black text-white md:text-xl">
                      {item.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-white/70 transition-colors duration-300 group-hover:text-[#f1d18d] md:text-xs">
                      <span>استكشف التصنيف</span>

                      <FaArrowLeft className="text-[8px] transition-transform duration-300 group-hover:-translate-x-1 md:text-[10px]" />
                    </div>
                  </div>

                  {/* Gold Border */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-[24px]
                      border
                      border-transparent
                      transition-all
                      duration-500
                      group-hover:border-[#d6b16b]/80
                      md:rounded-[28px]
                    "
                  />
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
