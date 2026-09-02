import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  CheckCircle2,
  ChevronLeft,
  Loader2,
  MapPin,
  Phone,
  ShoppingBag,
  User,
} from "lucide-react";

import { useCart } from "../hooks/useCart";
import { useOrders } from "../hooks/useOrders";
import { useSettings } from "../hooks/useSettings";

import { trackEvent } from "../lib/metaPixel";
import { trackTikTok } from "../lib/tiktokPixel";

const cities = [
  { value: "الرياض", label: "الرياض" },
  { value: "جدة", label: "جدة" },
  { value: "مكة المكرمة", label: "مكة المكرمة" },
  { value: "المدينة المنورة", label: "المدينة المنورة" },
  { value: "الدمام", label: "الدمام" },
  { value: "الخبر", label: "الخبر" },
  { value: "الظهران", label: "الظهران" },
  { value: "الطائف", label: "الطائف" },
  { value: "تبوك", label: "تبوك" },
  { value: "بريدة", label: "بريدة" },
  { value: "خميس مشيط", label: "خميس مشيط" },
  { value: "أبها", label: "أبها" },
  { value: "حائل", label: "حائل" },
  { value: "نجران", label: "نجران" },
  { value: "جازان", label: "جازان" },
  { value: "ينبع", label: "ينبع" },
  { value: "الجبيل", label: "الجبيل" },
  { value: "الأحساء", label: "الأحساء" },
  { value: "القطيف", label: "القطيف" },
  { value: "حفر الباطن", label: "حفر الباطن" },
  { value: "عرعر", label: "عرعر" },
  { value: "سكاكا", label: "سكاكا" },
  { value: "القريات", label: "القريات" },
  { value: "رابغ", label: "رابغ" },
  { value: "الخرج", label: "الخرج" },
  { value: "الرس", label: "الرس" },
  { value: "عنيزة", label: "عنيزة" },
  { value: "المجمعة", label: "المجمعة" },
  { value: "وادي الدواسر", label: "وادي الدواسر" },
  { value: "بيشة", label: "بيشة" },
  { value: "محايل عسير", label: "محايل عسير" },
];

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartTotal, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { settings, loading: settingsLoading } = useSettings();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const shippingFee = Number(settings?.shipping?.shippingFee || 0);
  const freeShippingThreshold = Number(
    settings?.shipping?.freeShippingThreshold || 0,
  );

  const shippingCost = useMemo(() => {
    if (
      freeShippingThreshold > 0 &&
      Number(cartTotal) >= freeShippingThreshold
    ) {
      return 0;
    }

    return shippingFee;
  }, [cartTotal, freeShippingThreshold, shippingFee]);

  const finalTotal = Number(cartTotal || 0) + Number(shippingCost || 0);

  useEffect(() => {
    if (cartItems.length === 0 || orderCompleted) return;

    trackEvent("InitiateCheckout", {
      content_ids: cartItems.map((item) => item.id),
      content_type: "product",
      num_items: cartItems.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0,
      ),
      value: Number(finalTotal),
      currency: "SAR",
    });
  }, [cartItems, finalTotal, orderCompleted]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleCityChange = (selectedOption) => {
    setCustomer((prev) => ({
      ...prev,
      city: selectedOption?.value || "",
    }));

    setErrors((prev) => ({
      ...prev,
      city: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!customer.name.trim()) {
      newErrors.name = "يرجى إدخال الاسم";
    }

    if (!customer.phone.trim()) {
      newErrors.phone = "يرجى إدخال رقم الجوال";
    } else {
      const cleanPhone = customer.phone.replace(/\s/g, "");

      if (!/^05\d{8}$/.test(cleanPhone)) {
        newErrors.phone = "يرجى إدخال رقم جوال سعودي صحيح";
      }
    }

    if (!customer.city) {
      newErrors.city = "يرجى اختيار المدينة";
    }

    if (!customer.address.trim()) {
      newErrors.address = "يرجى إدخال العنوان";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    setSubmitting(true);

    try {
      const order = await createOrder({
        customer: {
          ...customer,
          phone: customer.phone.replace(/\s/g, ""),
        },

        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.images?.[0] || "",
        })),

        subtotal: cartTotal,
        shipping: shippingCost,
        total: finalTotal,
      });

      console.log("ORDER:", order);

      /*
       * إرسال البريد الإلكتروني للمتجر.
       *
       * مهم:
       * إنشاء الطلب في Firebase هو العملية الأساسية.
       * إذا فشل البريد، لا نعتبر الطلب فاشلاً ولا نطلب من العميل
       * إعادة الطلب حتى لا يتم إنشاء طلب مكرر.
       */
      try {
        const response = await fetch("/api/send-order-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order,
          }),
        });

        let data = null;

        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (response.ok && data?.success) {
          console.log("EMAIL SENT:", data);
        } else {
          console.error("EMAIL FAILED:", {
            status: response.status,
            data,
          });
        }
      } catch (emailError) {
        console.error("EMAIL REQUEST ERROR:", emailError);
      }

      trackEvent("Purchase", {
        content_ids: order.items.map((item) => item.id),
        content_type: "product",
        num_items: order.items.reduce(
          (total, item) => total + Number(item.quantity || 0),
          0,
        ),
        value: Number(order.total),
        currency: "SAR",
      });

      trackTikTok("CompletePayment", {
        contents: order.items.map((item) => ({
          content_id: item.id,
          content_name: item.name,
          quantity: Number(item.quantity || 0),
          price: Number(item.price || 0),
        })),
        value: Number(order.total),
        currency: "SAR",
      });

      setOrderCompleted(true);

      clearCart();

      navigate(`/order-confirmation/${order.orderNumber}`, {
        replace: true,
        state: {
          order,
        },
      });
    } catch (error) {
      console.error("Create Order Error:", error);

      alert("حدث خطأ أثناء تأكيد الطلب، حاول مرة أخرى");
    } finally {
      setSubmitting(false);
    }
  };

  if (settingsLoading) {
    return (
      <div dir="rtl" className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>جارٍ تحميل بيانات المتجر...</span>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderCompleted) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="transition hover:text-green-600">
            الرئيسية
          </Link>

          <ChevronLeft className="h-4 w-4" />

          <Link to="/cart" className="transition hover:text-green-600">
            السلة
          </Link>

          <ChevronLeft className="h-4 w-4" />

          <span className="font-medium text-gray-900">إتمام الطلب</span>
        </div>

        {/* Page title */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">
              <ShoppingBag className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                إتمام الطلب
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                أدخل بياناتك لإتمام طلبك بسهولة
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {/* Customer information */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <User className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">بيانات العميل</h2>

                  <p className="text-sm text-gray-500">
                    أدخل بياناتك بشكل صحيح لاستلام الطلب
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    الاسم الكامل
                  </label>

                  <div className="relative">
                    <User className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={customer.name}
                      onChange={handleChange}
                      placeholder="أدخل اسمك الكامل"
                      className={`w-full rounded-xl border bg-white py-3 pr-10 pl-4 text-sm outline-none transition ${
                        errors.name
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-200 focus:border-green-500"
                      }`}
                    />
                  </div>

                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    رقم الجوال
                  </label>

                  <div className="relative">
                    <Phone className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      value={customer.phone}
                      onChange={handleChange}
                      placeholder="05xxxxxxxx"
                      className={`w-full rounded-xl border bg-white py-3 pr-10 pl-4 text-left text-sm outline-none transition ${
                        errors.phone
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-200 focus:border-green-500"
                      }`}
                      dir="ltr"
                    />
                  </div>

                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    المدينة
                  </label>

                  <Select
                    value={
                      cities.find((city) => city.value === customer.city) ||
                      null
                    }
                    onChange={handleCityChange}
                    options={cities}
                    placeholder="اختر المدينة"
                    isSearchable
                    noOptionsMessage={() => "لا توجد نتائج"}
                    loadingMessage={() => "جارٍ التحميل..."}
                    classNamePrefix="shahdan-select"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        minHeight: "48px",
                        borderRadius: "12px",
                        borderColor: errors.city
                          ? "#f87171"
                          : state.isFocused
                            ? "#22c55e"
                            : "#e5e7eb",
                        boxShadow: "none",
                        "&:hover": {
                          borderColor: errors.city ? "#f87171" : "#22c55e",
                        },
                      }),
                      menu: (base) => ({
                        ...base,
                        zIndex: 50,
                      }),
                    }}
                  />

                  {errors.city && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.city}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    العنوان
                  </label>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-gray-400" />

                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={customer.address}
                      onChange={handleChange}
                      placeholder="الحي، الشارع، رقم المنزل..."
                      className={`w-full resize-none rounded-xl border bg-white py-3 pr-10 pl-4 text-sm outline-none transition ${
                        errors.address
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-200 focus:border-green-500"
                      }`}
                    />
                  </div>

                  {errors.address && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="notes"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    ملاحظات إضافية{" "}
                    <span className="font-normal text-gray-400">(اختياري)</span>
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={customer.notes}
                    onChange={handleChange}
                    placeholder="أي ملاحظات ترغب بإضافتها للطلب..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">طريقة الدفع</h2>

                  <p className="text-sm text-gray-500">
                    اختر طريقة الدفع المناسبة لك
                  </p>
                </div>
              </div>

              <div className="rounded-xl border-2 border-green-500 bg-green-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-green-600">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      الدفع عند الاستلام
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      ادفع قيمة الطلب عند استلامه
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
              <h2 className="mb-5 text-lg font-bold text-gray-900">
                ملخص الطلب
              </h2>

              <div className="mb-5 max-h-80 space-y-4 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                      {item.images?.[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-300">
                          <ShoppingBag className="h-6 w-6" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>

                      <div className="mt-1 flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-500">
                          الكمية: {item.quantity}
                        </span>

                        <span className="text-sm font-bold text-gray-900">
                          {Number(item.price || 0) * Number(item.quantity || 0)}{" "}
                          ر.س
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">المجموع الفرعي</span>

                  <span className="font-medium text-gray-900">
                    {Number(cartTotal || 0)} ر.س
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">الشحن</span>

                  {shippingCost === 0 ? (
                    <span className="font-semibold text-green-600">مجاني</span>
                  ) : (
                    <span className="font-medium text-gray-900">
                      {shippingCost} ر.س
                    </span>
                  )}
                </div>

                {freeShippingThreshold > 0 &&
                  Number(cartTotal) < freeShippingThreshold && (
                    <div className="rounded-xl bg-green-50 p-3 text-xs leading-5 text-green-700">
                      أضف{" "}
                      <strong>
                        {Math.max(0, freeShippingThreshold - Number(cartTotal))}{" "}
                        ر.س
                      </strong>{" "}
                      للحصول على شحن مجاني.
                    </div>
                  )}

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-base font-bold text-gray-900">
                    الإجمالي
                  </span>

                  <span className="text-xl font-bold text-green-600">
                    {finalTotal} ر.س
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || cartItems.length === 0}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    جارٍ تأكيد الطلب...
                  </>
                ) : (
                  <>
                    تأكيد الطلب
                    <ChevronLeft className="h-5 w-5" />
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-gray-500">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>بياناتك محفوظة وآمنة</span>
              </div>

              <Link
                to="/cart"
                className="mt-4 block text-center text-sm font-medium text-gray-500 transition hover:text-green-600"
              >
                العودة إلى السلة
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
