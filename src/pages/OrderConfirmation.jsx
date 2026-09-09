
import { useEffect, useState } from "react";
import { Link, useParams, useLocation, Navigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaShoppingBag,
  FaTruck,
} from "react-icons/fa";
import { useOrders } from "../hooks/useOrders";

export default function OrderConfirmation() {
  const { orderNumber } = useParams();
  const location = useLocation();
  const myOrders = JSON.parse(localStorage.getItem("myOrders") || "[]");

  const hasAccess =
    location.state?.order || myOrders.includes(orderNumber);

  const { fetchOrderByNumber } = useOrders();

  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!location.state?.order);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (order) return;

    let cancelled = false;

    fetchOrderByNumber(orderNumber).then((result) => {
      if (cancelled) return;

      if (result) {
        setOrder(result);
      } else {
        setNotFound(true);
      }

      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderNumber]);

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <section
        dir="rtl"
        className="flex min-h-[60vh] items-center justify-center bg-[#f8f3e8] px-4"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-[#eadfca] bg-white px-6 py-5 text-sm text-[#8a8175] shadow-sm">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#eadfca] border-t-[#b88a44]" />
          جارٍ تحميل بيانات الطلب...
        </div>
      </section>
    );
  }

  if (notFound || !order) {
    return <Navigate to="/" replace />;
  }

  return (
    <section
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#f8f3e8] via-white to-[#f8f3e8] py-8 md:py-14"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        {/* Progress */}
        <div className="mb-8 overflow-x-auto">
          <div className="mx-auto flex min-w-[430px] items-center justify-center gap-2 text-xs font-bold md:mb-12 md:text-sm">
            <div className="flex items-center gap-2 rounded-full bg-[#30291f] px-4 py-2.5 text-white shadow-sm">
              <FaCheckCircle className="text-[#c7a15a]" />
              السلة
            </div>

            <div className="h-px w-7 bg-[#c7a15a] md:w-12" />

            <div className="flex items-center gap-2 rounded-full bg-[#30291f] px-4 py-2.5 text-white shadow-sm">
              <FaCheckCircle className="text-[#c7a15a]" />
              إتمام الطلب
            </div>

            <div className="h-px w-7 bg-[#c7a15a] md:w-12" />

            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b88a44] to-[#8a642f] px-4 py-2.5 text-white shadow-md">
              <FaCheckCircle />
              تم الطلب
            </div>
          </div>
        </div>

        {/* Main card */}
        <div className="overflow-hidden rounded-[32px] border border-[#eadfca] bg-white shadow-[0_20px_60px_rgba(92,67,35,0.10)]">
          {/* Success header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#30291f] via-[#5b4630] to-[#8a642f] px-6 py-12 text-center text-white md:px-10 md:py-16">
            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10 bg-white/5" />
            <div className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full border border-[#c7a15a]/20 bg-[#c7a15a]/10" />

            <div className="relative">
              <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-5xl text-[#b88a44] shadow-lg">
                  <FaCheckCircle />
                </div>
              </div>

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#e7cf9d]">
                شهدان ستور
              </p>

              <h1 className="text-3xl font-black md:text-4xl">
                تم استلام طلبك بنجاح 🎉
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/75 md:text-base">
                شكرًا لثقتك في شهدان. تم تسجيل طلبك بنجاح وسيتم التواصل معك
                قريبًا لتأكيده.
              </p>

              <div className="mx-auto mt-7 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 backdrop-blur-md">
                <span className="text-xs text-white/70">
                  رقم الطلب
                </span>

                <span className="text-lg font-black tracking-wide text-[#f8e6b8]">
                  #{order.orderNumber}
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-10">
            {/* Delivery information */}
            <div className="mb-8 overflow-hidden rounded-[26px] border border-[#eadfca] bg-[#fdfbf7]">
              <div className="border-b border-[#eee5d5] bg-gradient-to-r from-[#f8f3e8] to-[#fdfbf7] px-5 py-5 md:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8e6b8] text-[#8a642f]">
                    <FaTruck />
                  </div>

                  <div>
                    <h2 className="font-black text-[#30291f]">
                      بيانات التوصيل
                    </h2>

                    <p className="mt-1 text-xs text-[#8a8175]">
                      المعلومات التي سيتم الاعتماد عليها لتوصيل طلبك
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-5 md:grid-cols-2 md:p-6">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#b88a44] shadow-sm">
                    <FaUser className="text-sm" />
                  </div>

                  <div>
                    <p className="text-xs text-[#8a8175]">الاسم</p>

                    <p className="mt-1 font-bold text-[#30291f]">
                      {order.customer.name}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#b88a44] shadow-sm">
                    <FaPhone className="text-sm" />
                  </div>

                  <div>
                    <p className="text-xs text-[#8a8175]">
                      رقم الجوال
                    </p>

                    <p
                      dir="ltr"
                      className="mt-1 text-right font-bold text-[#30291f]"
                    >
                      {order.customer.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#b88a44] shadow-sm">
                    <FaMapMarkerAlt className="text-sm" />
                  </div>

                  <div>
                    <p className="text-xs text-[#8a8175]">المدينة</p>

                    <p className="mt-1 font-bold text-[#30291f]">
                      {order.customer.city}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#b88a44] shadow-sm">
                    <FaMapMarkerAlt className="text-sm" />
                  </div>

                  <div>
                    <p className="text-xs text-[#8a8175]">العنوان</p>

                    <p className="mt-1 font-bold leading-6 text-[#30291f]">
                      {order.customer.address}
                    </p>
                  </div>
                </div>

                {order.customer.notes && (
                  <div className="border-t border-[#eee5d5] pt-5 md:col-span-2">
                    <p className="text-xs text-[#8a8175]">
                      الملاحظات
                    </p>

                    <p className="mt-1 leading-7 text-[#5f574c]">
                      {order.customer.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order details */}
            <div className="overflow-hidden rounded-[26px] border border-[#eadfca] bg-[#fdfbf7]">
              <div className="border-b border-[#eee5d5] bg-gradient-to-r from-[#f8f3e8] to-[#fdfbf7] px-5 py-5 md:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8e6b8] text-[#8a642f]">
                    <FaShoppingBag />
                  </div>

                  <div>
                    <h2 className="font-black text-[#30291f]">
                      تفاصيل الطلب
                    </h2>

                    <p className="mt-1 text-xs text-[#8a8175]">
                      المنتجات التي تمت إضافتها إلى طلبك
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-2xl border border-[#eadfca] bg-white p-3.5 transition hover:border-[#d8c39b] md:gap-4 md:p-4"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#eadfca] bg-[#f8f3e8] md:h-20 md:w-20">
                        <img
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-bold leading-6 text-[#30291f] md:text-base">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-[#8a8175]">
                          الكمية: {item.quantity}
                        </p>
                      </div>

                      <div className="shrink-0 text-left">
                        <p className="text-sm font-black text-[#b88a44] md:text-base">
                          {(
                            Number(item.price || 0) *
                            Number(item.quantity || 0)
                          ).toFixed(2)}{" "}
                          ر.س
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-6 space-y-3 border-t border-[#eadfca] pt-5">
                  <div className="flex justify-between text-sm text-[#8a8175]">
                    <span>إجمالي المنتجات</span>

                    <span className="font-semibold text-[#30291f]">
                      {Number(
                        order.subtotal ?? order.total ?? 0,
                      ).toFixed(2)}{" "}
                      ر.س
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-[#8a8175]">
                    <span>الشحن</span>

                    <span
                      className={
                        Number(order.shipping ?? 0) === 0
                          ? "font-bold text-[#8a642f]"
                          : "font-semibold text-[#30291f]"
                      }
                    >
                      {Number(order.shipping ?? 0) > 0
                        ? `${Number(order.shipping).toFixed(2)} ر.س`
                        : "مجاني 🎉"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#eadfca] pt-5">
                    <span className="text-base font-black text-[#30291f]">
                      الإجمالي
                    </span>

                    <span className="text-2xl font-black text-[#b88a44]">
                      {Number(order.total || 0).toFixed(2)}{" "}
                      <span className="text-sm">ر.س</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next step */}
            <div className="mt-8 rounded-[24px] border border-[#eadfca] bg-gradient-to-br from-[#f8f3e8] to-[#fdfbf7] p-5 text-center md:p-6">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f8e6b8] text-[#8a642f]">
                <FaPhone />
              </div>

              <h3 className="font-black text-[#30291f]">
                ماذا بعد؟
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-[#8a8175]">
                سيتم التواصل معك قريبًا لتأكيد الطلب وتنسيق عملية
                التوصيل. احتفظ برقم الطلب لمتابعة حالته بسهولة.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/products"
                className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#b88a44] to-[#8a642f] px-8 py-4 text-center font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <FaShoppingBag className="transition-transform group-hover:scale-110" />
                متابعة التسوق
              </Link>

              <Link
                to="/track-order"
                className="flex items-center justify-center gap-2 rounded-2xl border border-[#b88a44] bg-white px-8 py-4 text-center font-bold text-[#8a642f] transition-all duration-300 hover:bg-[#f8f3e8] hover:shadow-md"
              >
                <FaTruck />
                متابعة حالة الطلب
              </Link>
            </div>

            {/* Brand footer */}
            <div className="mt-10 border-t border-[#eee5d5] pt-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#b88a44]">
                SHAHDAN
              </p>

              <p className="mt-2 text-xs text-[#a79e91]">
                شكرًا لاختيارك شهدان ستور
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

