import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaBoxOpen,
  FaChevronDown,
  FaMapMarkerAlt,
  FaTruck,
  FaReceipt,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";

import { useOrders } from "../hooks/useOrders";
import { ORDER_STATUSES } from "../context/order-statuses";

const STATUS_COLORS = {
  pending: "bg-[#f8e6b8] text-[#8a642f]",
  processing: "bg-[#eee5d5] text-[#8a642f]",
  shipped: "bg-[#e7dfd1] text-[#6f572e]",
  completed: "bg-[#e7eadf] text-[#5f6b43]",
  cancelled: "bg-[#f6e2df] text-[#a34f46]",
};

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  const total = Number(order?.total || 0);
  const subtotal = Number(order?.subtotal ?? order?.total ?? 0);
  const shipping = Number(order?.shipping || 0);

  const statusClass =
    STATUS_COLORS[order.status] || "bg-[#f8f3e8] text-[#5f574c]";

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#eadfca] bg-white shadow-[0_10px_35px_rgba(92,67,35,0.07)] transition-all hover:shadow-[0_16px_45px_rgba(92,67,35,0.11)]">
      {/* ORDER HEADER */}
      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        className="flex w-full items-center justify-between gap-3 p-4 text-right transition hover:bg-[#fdfbf7] md:p-5"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#f8f3e8] text-[#b88a44] sm:flex">
            <FaReceipt />
          </div>

          <div className="min-w-0">
            <p className="truncate font-bold text-[#30291f]">
              {order.orderNumber}
            </p>

            <p className="mt-1 text-xs text-[#8a8175] md:text-sm">
              {new Date(order.date).toLocaleDateString("ar-SA")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold md:px-3 md:py-1.5 md:text-xs ${statusClass}`}
          >
            {ORDER_STATUSES[order.status] || "غير محدد"}
          </span>

          <div className="text-left">
            <p className="text-sm font-black text-[#30291f] md:text-base">
              {total.toFixed(2)} ر.س
            </p>

            {shipping > 0 && (
              <p className="hidden text-[10px] text-[#8a8175] sm:block">
                شامل الشحن
              </p>
            )}
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f3e8] text-[#8a8175]">
            <FaChevronDown
              className={`text-xs transition-transform duration-300 ${
                expanded ? "rotate-180 text-[#b88a44]" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {/* ORDER DETAILS */}
      {expanded && (
        <div className="border-t border-[#eee5d5] bg-[#fdfbf7] p-4 md:p-5">
          {/* ITEMS */}
          <div className="flex flex-col gap-3">
            {(order.items || []).map((item) => {
              const itemPrice = Number(item.price || 0);
              const quantity = Number(item.quantity || 0);

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-2xl border border-[#eadfca] bg-white p-3"
                >
                  <img
                    src={
                      item.image ||
                      item.images?.[0] ||
                      "https://via.placeholder.com/100"
                    }
                    alt={item.name || "منتج شهدان"}
                    className="h-14 w-14 rounded-xl border border-[#eadfca] object-cover md:h-16 md:w-16"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold text-[#30291f]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-[#8a8175]">
                      {quantity} × {itemPrice} ر.س
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-sm font-bold text-[#8a642f]">
                    {(itemPrice * quantity).toFixed(2)} ر.س
                  </p>
                </div>
              );
            })}
          </div>

          {/* SHIPPING INFORMATION */}
          <div className="mt-4 rounded-2xl border border-[#eadfca] bg-white p-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#f8f3e8] text-[#b88a44]">
                <FaMapMarkerAlt />
              </div>

              <div>
                <p className="font-bold text-[#30291f]">عنوان التوصيل</p>

                <p className="mt-1 leading-6 text-[#8a8175]">
                  {order.customer?.city || "—"}
                  {" — "}
                  {order.customer?.address || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* TOTALS */}
          <div className="mt-4 rounded-2xl border border-[#eadfca] bg-[#f8f3e8] p-4 text-sm text-[#5f574c]">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>إجمالي المنتجات</span>
                <span className="font-semibold text-[#30291f]">
                  {subtotal.toFixed(2)} ر.س
                </span>
              </div>

              <div className="flex justify-between">
                <span>الشحن</span>

                <span
                  className={
                    shipping === 0
                      ? "font-bold text-[#8a642f]"
                      : "font-semibold text-[#30291f]"
                  }
                >
                  {shipping > 0 ? `${shipping.toFixed(2)} ر.س` : "مجاني 🎉"}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-[#ddcfb7] pt-3 text-base font-black text-[#30291f]">
                <span>الإجمالي</span>

                <span className="text-[#b88a44]">{total.toFixed(2)} ر.س</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrder() {
  const { myOrders, myOrdersLoading, findOrder } = useOrders();

  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [searchResult, setSearchResult] = useState(undefined);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!orderNumber.trim() || !phone.trim()) {
      setSearchResult(null);
      return;
    }

    setSearching(true);

    try {
      const result = await findOrder(orderNumber.trim(), phone.trim());

      setSearchResult(result);
    } catch (error) {
      console.error("Find order error:", error);
      setSearchResult(null);
    } finally {
      setSearching(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f8f3e8] via-white to-[#f8f3e8] py-10 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* =====================================================
            PAGE HEADER
        ====================================================== */}
        <div className="mb-8 text-center md:mb-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#eadfca] bg-white text-[#b88a44] shadow-[0_8px_25px_rgba(184,138,68,0.15)]">
            <FaTruck className="text-2xl" />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b88a44]">
            شهدان ستور
          </p>

          <h1 className="text-3xl font-black text-[#30291f] md:text-5xl">
            متابعة الطلب
            <span className="mr-2 text-[#b88a44]">📦</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#8a8175] md:text-base">
            تابع حالة طلبك بسهولة باستخدام رقم الطلب ورقم الجوال، بدون الحاجة
            إلى تسجيل الدخول.
          </p>
        </div>

        {/* =====================================================
            SEARCH CARD
        ====================================================== */}
        <form
          onSubmit={handleSearch}
          className="mb-10 overflow-hidden rounded-[28px] border border-[#eadfca] bg-white shadow-[0_15px_45px_rgba(92,67,35,0.09)]"
        >
          <div className="border-b border-[#eee5d5] bg-[#fdfbf7] p-5 md:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8f3e8] text-[#b88a44]">
                <FaSearch />
              </div>

              <div>
                <h2 className="font-bold text-[#30291f]">البحث عن طلب</h2>

                <p className="mt-1 text-xs text-[#8a8175]">
                  أدخل بيانات الطلب لمعرفة حالته
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* ORDER NUMBER */}
              <div>
                <label className="mb-2 block text-xs font-bold text-[#5f574c]">
                  رقم الطلب
                </label>

                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="مثال: ORD-1001"
                  className="w-full rounded-xl border border-[#eadfca] bg-[#fdfbf7] p-3.5 text-sm text-[#30291f] outline-none transition placeholder:text-[#aaa093] focus:border-[#b88a44] focus:bg-white focus:ring-4 focus:ring-[#b88a44]/10"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-2 block text-xs font-bold text-[#5f574c]">
                  رقم الجوال
                </label>

                <div className="relative">
                  <FaPhoneAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#b88a44]" />

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="رقم الجوال المستخدم بالطلب"
                    className="w-full rounded-xl border border-[#eadfca] bg-[#fdfbf7] py-3.5 pl-3 pr-10 text-sm text-[#30291f] outline-none transition placeholder:text-[#aaa093] focus:border-[#b88a44] focus:bg-white focus:ring-4 focus:ring-[#b88a44]/10"
                  />
                </div>
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <button
              type="submit"
              disabled={searching}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b88a44] to-[#9d7337] py-3.5 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:from-[#9d7337] hover:to-[#8a642f] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaSearch />

              {searching ? "جارِ البحث..." : "بحث عن الطلب"}
            </button>

            {/* NOT FOUND */}
            {searchResult === null && (
              <div className="mt-5 rounded-xl border border-[#efd7d2] bg-[#fdf4f2] p-4 text-center text-sm text-[#a34f46]">
                ما لقينا طلب مطابق لرقم الطلب والجوال المدخلين.
              </div>
            )}

            {/* RESULT */}
            {searchResult && (
              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#8a642f]">
                  <FaCheckCircle />
                  تم العثور على الطلب
                </div>

                <OrderCard order={searchResult} />
              </div>
            )}
          </div>
        </form>

        {/* =====================================================
            SAVED ORDERS
        ====================================================== */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[#30291f] md:text-xl">
                طلباتك من هذا الجهاز
              </h2>

              <p className="mt-1 text-xs text-[#8a8175]">
                الطلبات التي تم حفظها على هذا الجهاز والمتصفح
              </p>
            </div>

            <FaReceipt className="text-xl text-[#b88a44]" />
          </div>

          {/* LOADING */}
          {myOrdersLoading ? (
            <div className="rounded-[24px] border border-[#eadfca] bg-white p-12 text-center text-sm text-[#8a8175] shadow-sm">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#eadfca] border-t-[#b88a44]" />
              جارٍ تحميل طلباتك...
            </div>
          ) : myOrders.length === 0 ? (
            /* EMPTY */
            <div className="rounded-[24px] border border-[#eadfca] bg-white p-10 text-center shadow-[0_10px_35px_rgba(92,67,35,0.06)]">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f8f3e8] text-[#b88a44]">
                <FaBoxOpen className="text-3xl" />
              </div>

              <h3 className="font-bold text-[#30291f]">لا توجد طلبات سابقة</h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#8a8175]">
                ما فيه طلبات سابقة من هذا الجهاز والمتصفح.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#b88a44] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#9d7337] hover:shadow-lg"
              >
                تصفح المنتجات
              </Link>
            </div>
          ) : (
            /* ORDERS */
            <div className="flex flex-col gap-4">
              {myOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-10 flex items-center justify-center gap-2 border-t border-[#eee5d5] pt-6 text-xs text-[#8a8175]">
          <FaCheckCircle className="text-[#b88a44]" />
          نحرص في شهدان ستور على تقديم تجربة طلب موثوقة ومريحة
        </div>
      </div>
    </section>
  );
}
