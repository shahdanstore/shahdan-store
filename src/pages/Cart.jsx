
import { Link, useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaTruck,
  FaShieldAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

import { useCart } from "../hooks/useCart";
import { useSettings } from "../hooks/useSettings";

export default function Cart() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

  const { settings } = useSettings();

  const shippingFee = settings?.shipping?.shippingFee || 0;

  const freeShippingThreshold =
    settings?.shipping?.freeShippingThreshold || 0;

  const shippingCost =
    freeShippingThreshold > 0 && cartTotal >= freeShippingThreshold
      ? 0
      : shippingFee;

  const finalTotal = cartTotal + shippingCost;

  const shippingProgress =
    freeShippingThreshold > 0
      ? Math.min(100, (cartTotal / freeShippingThreshold) * 100)
      : 100;

  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - cartTotal
  );

  const navigate = useNavigate();

  /* ============================================================
     EMPTY CART
  ============================================================ */
  if (cartItems.length === 0) {
    return (
      <section className="min-h-[70vh] bg-gradient-to-b from-[#f8f3e8] via-white to-[#f8f3e8] py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-[#eadfca] bg-white text-[#b88a44] shadow-[0_15px_40px_rgba(92,67,35,0.10)]">
            <FaShoppingBag className="text-4xl" />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b88a44]">
            شهدان ستور
          </p>

          <h1 className="text-3xl font-black text-[#30291f] md:text-4xl">
            سلتك فارغة
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#8a8175] md:text-base">
            لم تقم بإضافة أي منتجات إلى السلة بعد. اكتشف تشكيلتنا واختر ما
            يناسبك.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#b88a44] to-[#9d7337] px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-[#9d7337] hover:to-[#8a642f] hover:shadow-xl"
          >
            تصفح المنتجات
            <FaArrowLeft className="text-xs" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f8f3e8] via-white to-[#f8f3e8] py-8 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* ========================================================
            HEADER
        ========================================================= */}
        <div className="mb-8 text-center md:mb-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#eadfca] bg-white text-[#b88a44] shadow-sm">
            <FaShoppingBag className="text-xl" />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b88a44]">
            شهدان ستور
          </p>

          <h1 className="text-3xl font-black text-[#30291f] md:text-5xl">
            سلة المشتريات
            <span className="mr-2 text-[#b88a44]">🛒</span>
          </h1>

          <p className="mt-3 text-sm text-[#8a8175]">
            راجع منتجاتك قبل إتمام الطلب
          </p>
        </div>

        {/* ========================================================
            FREE SHIPPING MESSAGE
        ========================================================= */}
        {freeShippingThreshold > 0 && (
          <div className="mb-6 overflow-hidden rounded-[24px] border border-[#eadfca] bg-white shadow-[0_8px_30px_rgba(92,67,35,0.06)]">
            <div className="p-4 md:p-5">
              {shippingCost === 0 ? (
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#f8e6b8] text-[#8a642f]">
                    <FaCheckCircle />
                  </div>

                  <div>
                    <p className="font-bold text-[#30291f]">
                      🎉 مبروك! حصلت على الشحن المجاني
                    </p>

                    <p className="mt-1 text-xs text-[#8a8175]">
                      طلبك تجاوز الحد المطلوب للشحن المجاني.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <FaTruck className="text-[#b88a44]" />

                      <span className="text-xs font-bold text-[#30291f] md:text-sm">
                        اقتربت من الشحن المجاني
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[#8a642f]">
                      {shippingProgress.toFixed(0)}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#eee5d5]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#c7a15a] to-[#8a642f] transition-all duration-700"
                      style={{
                        width: `${shippingProgress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-xs text-[#8a8175]">
                    أضف{" "}
                    <span className="font-bold text-[#8a642f]">
                      {remainingForFreeShipping.toFixed(2)} ر.س
                    </span>{" "}
                    لتحصل على شحن مجاني 🎁
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            MAIN GRID
        ========================================================= */}
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">

          {/* ======================================================
              CART ITEMS
          ======================================================= */}
          <div className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#30291f] md:text-xl">
                  المنتجات في السلة
                </h2>

                <p className="mt-1 text-xs text-[#8a8175]">
                  {cartItems.length} منتج في طلبك
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-[#eadfca] bg-white shadow-[0_12px_40px_rgba(92,67,35,0.07)]">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-[#eee5d5] p-4 transition-colors duration-300 last:border-b-0 hover:bg-[#fdfbf7] md:p-5"
                >
                  <div className="flex gap-3 md:gap-5">

                    {/* PRODUCT IMAGE */}
                    <Link
                      to={`/product/${item.seoSlug || item.slug || item.id}`}
                      className="group flex-shrink-0"
                    >
                      <div className="h-24 w-24 overflow-hidden rounded-2xl border border-[#eadfca] bg-[#f8f3e8] md:h-32 md:w-32">
                        <img
                          src={
                            item.images?.[0] ||
                            "https://via.placeholder.com/200"
                          }
                          alt={item.name || "منتج شهدان"}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>

                    {/* PRODUCT INFO */}
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/product/${item.seoSlug || item.slug || item.id}`}
                      >
                        <h3 className="line-clamp-2 text-sm font-bold leading-6 text-[#30291f] transition-colors hover:text-[#8a642f] md:text-lg">
                          {item.name}
                        </h3>
                      </Link>

                      {item.category && (
                        <p className="mt-1 text-xs text-[#8a8175]">
                          {item.category}
                        </p>
                      )}

                      <p className="mt-2 text-sm font-black text-[#b88a44] md:text-base">
                        {Number(item.price || 0).toFixed(2)} ر.س
                      </p>

                      {/* QUANTITY + REMOVE */}
                      <div className="mt-4 flex flex-wrap items-center gap-3">

                        <div className="flex items-center overflow-hidden rounded-xl border border-[#eadfca] bg-[#fdfbf7]">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="flex h-9 w-9 items-center justify-center text-[#5f574c] transition hover:bg-[#f8f3e8] hover:text-[#8a642f] disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="تقليل الكمية"
                          >
                            <FaMinus className="text-[10px]" />
                          </button>

                          <span className="flex h-9 w-9 items-center justify-center border-x border-[#eadfca] text-sm font-bold text-[#30291f]">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-9 w-9 items-center justify-center text-[#5f574c] transition hover:bg-[#f8f3e8] hover:text-[#8a642f]"
                            aria-label="زيادة الكمية"
                          >
                            <FaPlus className="text-[10px]" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-[#a34f46] transition hover:bg-[#fdf1ef]"
                          aria-label="حذف المنتج"
                        >
                          <FaTrash className="text-[10px]" />
                          حذف
                        </button>
                      </div>
                    </div>

                    {/* ITEM TOTAL */}
                    <div className="hidden flex-shrink-0 text-left sm:block">
                      <p className="text-base font-black text-[#30291f] md:text-lg">
                        {(
                          Number(item.price || 0) *
                          Number(item.quantity || 0)
                        ).toFixed(2)}{" "}
                        ر.س
                      </p>
                    </div>
                  </div>

                  {/* MOBILE ITEM TOTAL */}
                  <div className="mt-3 flex items-center justify-between border-t border-[#eee5d5] pt-3 sm:hidden">
                    <span className="text-xs text-[#8a8175]">
                      إجمالي المنتج
                    </span>

                    <span className="text-sm font-black text-[#30291f]">
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 0)
                      ).toFixed(2)}{" "}
                      ر.س
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CONTINUE SHOPPING */}
            <Link
              to="/products"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8a642f] transition hover:text-[#b88a44]"
            >
              <FaArrowLeft className="text-xs" />
              متابعة التسوق
            </Link>
          </div>

          {/* ======================================================
              ORDER SUMMARY
          ======================================================= */}
          <div className="h-fit lg:sticky lg:top-24">

            <div className="overflow-hidden rounded-[28px] border border-[#eadfca] bg-white shadow-[0_15px_45px_rgba(92,67,35,0.10)]">

              {/* SUMMARY HEADER */}
              <div className="border-b border-[#eee5d5] bg-gradient-to-br from-[#fdfbf7] to-[#f8f3e8] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#b88a44] to-[#8a642f] text-white shadow-md">
                    <FaShoppingBag />
                  </div>

                  <div>
                    <h2 className="font-black text-[#30291f]">
                      ملخص الطلب
                    </h2>

                    <p className="mt-1 text-xs text-[#8a8175]">
                      طلبك جاهز للتأكيد
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">

                {/* PAYMENT */}
                <div className="mb-5 rounded-2xl border border-[#eadfca] bg-[#f8f3e8] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#b88a44] shadow-sm">
                      <FaMoneyBillWave />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#30291f]">
                        الدفع عند الاستلام
                      </p>

                      <p className="mt-1 text-xs text-[#8a8175]">
                        ادفع عند استلام طلبك بكل أمان.
                      </p>
                    </div>
                  </div>
                </div>

                {/* TOTALS */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-[#5f574c]">
                    <span>الإجمالي الفرعي</span>

                    <span className="font-semibold text-[#30291f]">
                      {Number(cartTotal || 0).toFixed(2)} ر.س
                    </span>
                  </div>

                  <div className="flex justify-between text-[#5f574c]">
                    <span>الشحن</span>

                    <span
                      className={
                        shippingCost === 0
                          ? "font-bold text-[#8a642f]"
                          : "font-semibold text-[#30291f]"
                      }
                    >
                      {shippingCost === 0
                        ? "مجاني 🎉"
                        : `${Number(shippingCost).toFixed(2)} ر.س`}
                    </span>
                  </div>
                </div>

                {/* FINAL TOTAL */}
                <div className="mt-5 flex items-center justify-between border-t border-[#eadfca] pt-5">
                  <span className="font-bold text-[#30291f]">
                    الإجمالي
                  </span>

                  <span className="text-2xl font-black text-[#b88a44]">
                    {Number(finalTotal || 0).toFixed(2)}{" "}
                    <span className="text-sm">ر.س</span>
                  </span>
                </div>

                {/* CHECKOUT */}
                <button
                  type="button"
                  onClick={() => navigate("/checkout")}
                  className="group relative mt-6 flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#b88a44] via-[#a87938] to-[#8a642f] font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="absolute -left-20 top-0 h-full w-10 -skew-x-12 bg-white/30 blur-sm animate-[shine_3s_linear_infinite]" />

                  <span className="relative">
                    ⚡ متابعة إتمام الطلب
                  </span>
                </button>

                {/* TRUST FEATURES */}
                <div className="mt-5 space-y-2 rounded-2xl border border-[#eadfca] bg-[#fdfbf7] p-4">
                  <div className="flex items-center gap-3 text-xs text-[#5f574c]">
                    <FaTruck className="text-[#b88a44]" />
                    <span>شحن سريع لجميع مناطق المملكة</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#5f574c]">
                    <FaMoneyBillWave className="text-[#b88a44]" />
                    <span>الدفع عند الاستلام</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#5f574c]">
                    <FaShieldAlt className="text-[#b88a44]" />
                    <span>معلوماتك آمنة ومحمية</span>
                  </div>
                </div>

                <Link
                  to="/products"
                  className="mt-4 block text-center text-xs font-semibold text-[#8a8175] transition hover:text-[#8a642f]"
                >
                  العودة للتسوق
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            BOTTOM TRUST BAR
        ========================================================= */}
        <div className="mt-10 grid gap-3 border-t border-[#eee5d5] pt-6 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-2 text-xs text-[#8a8175]">
            <FaShieldAlt className="text-[#b88a44]" />
            تسوق آمن
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#8a8175]">
            <FaTruck className="text-[#b88a44]" />
            توصيل موثوق
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#8a8175]">
            <FaCheckCircle className="text-[#b88a44]" />
            خدمة موثوقة
          </div>
        </div>
      </div>
    </section>
  );
}

