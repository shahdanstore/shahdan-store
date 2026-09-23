import {
  FaWhatsapp,
  FaInstagram,
  FaTruck,
  FaShieldAlt,
  FaArrowLeft,
  FaBoxOpen,
  FaHeadset,
  FaChevronLeft,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer dir="rtl" className="mt-20 overflow-hidden bg-[#2f1d13] text-white">
      {/* =========================================================
          TOP BRAND AREA
      ========================================================== */}
      <div className="relative border-b border-white/10">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#d49b35]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#8e6b8e]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Brand */}
            <div className="max-w-xl">
              <div className="mb-6 flex items-center gap-4">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#d49b35] text-2xl font-black text-[#3a2416] shadow-[0_12px_35px_rgba(212,155,53,0.2)]">
                  ش
                  <span className="absolute -bottom-1 -left-1 h-4 w-4 rounded-full border-4 border-[#2f1d13] bg-[#8e6b8e]" />
                </div>

                <div>
                  <h2 className="text-3xl font-black">شهدان ستور</h2>

                  <p className="mt-1 text-[10px] font-bold tracking-[0.35em] text-[#d4b477]">
                    SHAHDAN STORE
                  </p>
                </div>
              </div>

              <p className="max-w-lg text-sm leading-8 text-[#cbbcb0] md:text-base">
                منتجات مختارة بعناية لتجربة تسوق أبسط، أوضح، وأكثر موثوقية. نهتم
                بالتفاصيل من اختيار المنتج وحتى وصول طلبك.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="group flex items-center gap-3 rounded-2xl bg-[#d49b35] px-5 py-3 text-sm font-black text-[#3a2416] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e1aa4a] hover:shadow-lg"
                >
                  تصفح المنتجات
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3a2416]/10 transition-transform group-hover:-translate-x-1">
                    <FaArrowLeft className="text-[10px]" />
                  </span>
                </Link>

                <Link
                  to="/about"
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-[#e4d8ce] transition-all duration-300 hover:border-[#d49b35]/40 hover:bg-white/10"
                >
                  تعرف علينا
                </Link>
              </div>
            </div>

            {/* Contact Card */}
            <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8e6b8e]/20 text-[#d4b477]">
                    <FaHeadset />
                  </div>

                  <h3 className="font-black text-white">تحتاج إلى مساعدة؟</h3>

                  <p className="mt-2 text-xs leading-6 text-[#bfaea0]">
                    فريق شهدان جاهز لمساعدتك والإجابة عن استفساراتك.
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d49b35]/20 bg-[#d49b35]/10 text-[#d49b35]">
                  <FaWhatsapp />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-black/10 px-4 py-3">
                <span className="text-xs font-bold text-[#d6c9bd]">
                  خدمة العملاء
                </span>

                <span className="flex items-center gap-2 text-xs font-bold text-[#d4b477]">
                  متاحون للمساعدة
                  <span className="h-2 w-2 rounded-full bg-[#7a8b43] shadow-[0_0_10px_rgba(122,139,67,0.8)]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          BENEFITS STRIP
      ========================================================== */}
      <div className="border-b border-white/10 bg-[#382318]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3">
          <div className="flex items-center gap-4 border-b border-white/10 px-5 py-5 sm:border-b-0 sm:border-l">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#d49b35]/10 text-[#d4b477]">
              <FaTruck />
            </div>

            <div>
              <p className="text-sm font-black">شحن سريع</p>
              <p className="mt-1 text-[11px] text-[#a99788]">
                توصيل موثوق لطلبك
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-b border-white/10 px-5 py-5 sm:border-b-0 sm:border-l">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#8e6b8e]/15 text-[#d4b477]">
              <FaShieldAlt />
            </div>

            <div>
              <p className="text-sm font-black">تسوق آمن</p>
              <p className="mt-1 text-[11px] text-[#a99788]">
                تجربة شراء موثوقة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-5 py-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#d49b35]/10 text-[#d4b477]">
              <FaBoxOpen />
            </div>

            <div>
              <p className="text-sm font-black">منتجات مختارة</p>
              <p className="mt-1 text-[11px] text-[#a99788]">اختيارات بعناية</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          LINKS AREA
      ========================================================== */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-14">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* SHOP */}
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-black">المتجر</h3>

                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#d49b35]/10 text-[#d4b477]">
                  <FaBoxOpen className="text-xs" />
                </span>
              </div>

              <div className="space-y-1">
                <Link
                  to="/"
                  className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#cbbcb0] transition hover:bg-white/5 hover:text-white"
                >
                  الرئيسية
                  <FaChevronLeft className="text-[9px] text-[#6e5b4e] transition group-hover:-translate-x-1 group-hover:text-[#d49b35]" />
                </Link>

                <Link
                  to="/products"
                  className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#cbbcb0] transition hover:bg-white/5 hover:text-white"
                >
                  جميع المنتجات
                  <FaChevronLeft className="text-[9px] text-[#6e5b4e] transition group-hover:-translate-x-1 group-hover:text-[#d49b35]" />
                </Link>

                <Link
                  to="/about"
                  className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#cbbcb0] transition hover:bg-white/5 hover:text-white"
                >
                  عن شهدان
                  <FaChevronLeft className="text-[9px] text-[#6e5b4e] transition group-hover:-translate-x-1 group-hover:text-[#d49b35]" />
                </Link>
              </div>
            </div>

            {/* POLICIES */}
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-black">المعلومات</h3>

                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#8e6b8e]/15 text-[#d4b477]">
                  <FaShieldAlt className="text-xs" />
                </span>
              </div>

              <div className="space-y-1">
                <Link
                  to="/return-policy"
                  className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#cbbcb0] transition hover:bg-white/5 hover:text-white"
                >
                  الاسترجاع والاستبدال
                  <FaChevronLeft className="text-[9px] text-[#6e5b4e] transition group-hover:-translate-x-1 group-hover:text-[#d49b35]" />
                </Link>

                <Link
                  to="/shipping-policy"
                  className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#cbbcb0] transition hover:bg-white/5 hover:text-white"
                >
                  الشحن والتوصيل
                  <FaChevronLeft className="text-[9px] text-[#6e5b4e] transition group-hover:-translate-x-1 group-hover:text-[#d49b35]" />
                </Link>

                <Link
                  to="/privacy-policy"
                  className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#cbbcb0] transition hover:bg-white/5 hover:text-white"
                >
                  سياسة الخصوصية
                  <FaChevronLeft className="text-[9px] text-[#6e5b4e] transition group-hover:-translate-x-1 group-hover:text-[#d49b35]" />
                </Link>

                <Link
                  to="/terms"
                  className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#cbbcb0] transition hover:bg-white/5 hover:text-white"
                >
                  الشروط والأحكام
                  <FaChevronLeft className="text-[9px] text-[#6e5b4e] transition group-hover:-translate-x-1 group-hover:text-[#d49b35]" />
                </Link>
              </div>
            </div>

            {/* CONTACT */}
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-black">تواصل معنا</h3>

                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#d49b35]/10 text-[#d4b477]">
                  <FaWhatsapp className="text-xs" />
                </span>
              </div>

              <div className="rounded-2xl bg-[#d49b35]/[0.06] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d49b35] text-[#3a2416]">
                    <FaWhatsapp />
                  </div>

                  <div>
                    <p className="text-sm font-black">واتساب</p>
                    <p className="mt-1 text-[10px] text-[#a99788]">
                      تواصل معنا مباشرة
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-[#bfaea0]">
                  للاستفسارات حول المنتجات والطلبات، فريقنا جاهز لمساعدتك.
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#cbbcb0] transition hover:border-[#d49b35]/30 hover:bg-[#d49b35] hover:text-[#3a2416]"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  aria-label="WhatsApp"
                  className="flex h-10 flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#cbbcb0] transition hover:border-[#d49b35]/30 hover:bg-[#d49b35] hover:text-[#3a2416]"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            {/* TRUST */}
            <div className="rounded-[24px] border border-[#d49b35]/15 bg-[#d49b35]/[0.04] p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-black">شهدان باختصار</h3>

                <FaStar className="text-[#d49b35]" />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-black text-[#d49b35]">01</p>
                  <p className="mt-1 text-xs text-[#cbbcb0]">
                    منتجات مختارة بعناية
                  </p>
                </div>

                <div className="h-px bg-white/10" />

                <div>
                  <p className="text-2xl font-black text-[#d49b35]">02</p>
                  <p className="mt-1 text-xs text-[#cbbcb0]">
                    تجربة شراء بسيطة
                  </p>
                </div>

                <div className="h-px bg-white/10" />

                <div>
                  <p className="text-2xl font-black text-[#d49b35]">03</p>
                  <p className="mt-1 text-xs text-[#cbbcb0]">
                    دعم ومتابعة للطلبات
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM BAR
      ========================================================== */}
      <div className="border-t border-white/10 bg-[#24160f]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-right">
          <div>
            <p className="text-xs text-[#9d8b7c] md:text-sm">
              © 2026 شهدان ستور — جميع الحقوق محفوظة
            </p>

            <p className="mt-1 text-[10px] text-[#66564b]">SHAHDAN STORE</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#9d8b7c]">
            <span>تجربة تسوق موثوقة</span>
            <span className="h-1 w-1 rounded-full bg-[#d49b35]" />
            <span>بكل بساطة</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
