
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
      <div
        dir="rtl"
        className="flex min-h-[60vh] items-center justify-center bg-[#f8f3e8]"
      >
        <div className="flex items-center gap-3 text-[#8a8175]">
          <Loader2 className="h-5 w-5 animate-spin text-[#b88a44]" />
          <span>جارٍ تحميل بيانات المتجر...</span>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderCompleted) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#f8f3e8] via-white to-[#f8f3e8] py-8 md:py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#8a8175]">
          <Link
            to="/"
            className="transition-colors hover:text-[#8a642f]"
          >
            الرئيسية
          </Link>

          <ChevronLeft className="h-4 w-4 text-[#c7a15a]" />

          <Link
            to="/cart"
            className="transition-colors hover:text-[#8a642f]"
          >
            السلة
          </Link>

          <ChevronLeft className="h-4 w-4 text-[#c7a15a]" />

          <span className="font-bold text-[#30291f]">
            إتمام الطلب
          </span>
        </div>

        {/* Page title */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#eadfca] bg-white text-[#b88a44] shadow-[0_10px_30px_rgba(92,67,35,0.08)]">
              <ShoppingBag className="h-6 w-6" />
            </div>

            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#b88a44]">
                شهدان ستور
              </p>

              <h1 className="text-2xl font-black text-[#30291f] md:text-3xl">
                إتمام الطلب
              </h1>

              <p className="mt-1 text-sm text-[#8a8175]">
                أدخل بياناتك لإتمام طلبك بسهولة وأمان
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {/* Customer information */}
          <div className="space-y-6 lg:col-span-2">
            <div className="overflow-hidden rounded-[28px] border border-[#eadfca] bg-white shadow-[0_12px_40px_rgba(92,67,35,0.07)]">
              <div className="border-b border-[#eee5d5] bg-gradient-to-br from-[#fdfbf7] to-[#f8f3e8] p-5 md:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8e6b8] text-[#8a642f]">
                    <User className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-black text-[#30291f]">
                      بيانات العميل
                    </h2>

                    <p className="mt-1 text-sm text-[#8a8175]">
                      أدخل بياناتك بشكل صحيح لاستلام الطلب
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-7">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-bold text-[#5f574c]"
                    >
                      الاسم الكامل
                    </label>

                    <div className="relative">
                      <User className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a79e91]" />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={customer.name}
                        onChange={handleChange}
                        placeholder="أدخل اسمك الكامل"
                        className={`w-full rounded-xl border bg-[#fdfbf7] py-3 pr-10 pl-4 text-sm text-[#30291f] placeholder:text-[#b1a99e] outline-none transition-all ${
                          errors.name
                            ? "border-red-400 bg-red-50/30 focus:border-red-500"
                            : "border-[#eadfca] focus:border-[#b88a44] focus:bg-white focus:ring-4 focus:ring-[#b88a44]/10"
                        }`}
                      />
                    </div>

                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-bold text-[#5f574c]"
                    >
                      رقم الجوال
                    </label>

                    <div className="relative">
                      <Phone className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a79e91]" />

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        value={customer.phone}
                        onChange={handleChange}
                        placeholder="05xxxxxxxx"
                        className={`w-full rounded-xl border bg-[#fdfbf7] py-3 pr-10 pl-4 text-left text-sm text-[#30291f] placeholder:text-[#b1a99e] outline-none transition-all ${
                          errors.phone
                            ? "border-red-400 bg-red-50/30 focus:border-red-500"
                            : "border-[#eadfca] focus:border-[#b88a44] focus:bg-white focus:ring-4 focus:ring-[#b88a44]/10"
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
                    <label className="mb-2 block text-sm font-bold text-[#5f574c]">
                      المدينة
                    </label>

                    <Select
                      value={
                        cities.find(
                          (city) => city.value === customer.city,
                        ) || null
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
                          backgroundColor: "#fdfbf7",
                          borderColor: errors.city
                            ? "#f87171"
                            : state.isFocused
                              ? "#b88a44"
                              : "#eadfca",
                          boxShadow: state.isFocused
                            ? "0 0 0 4px rgba(184,138,68,0.10)"
                            : "none",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            borderColor: errors.city
                              ? "#f87171"
                              : "#b88a44",
                          },
                        }),

                        singleValue: (base) => ({
                          ...base,
                          color: "#30291f",
                          fontSize: "14px",
                        }),

                        input: (base) => ({
                          ...base,
                          color: "#30291f",
                          fontSize: "14px",
                        }),

                        placeholder: (base) => ({
                          ...base,
                          color: "#b1a99e",
                          fontSize: "14px",
                        }),

                        menu: (base) => ({
                          ...base,
                          zIndex: 50,
                          borderRadius: "14px",
                          overflow: "hidden",
                          border: "1px solid #eadfca",
                          boxShadow:
                            "0 15px 35px rgba(92,67,35,0.12)",
                        }),

                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "#b88a44"
                            : state.isFocused
                              ? "#f8f3e8"
                              : "#ffffff",
                          color: state.isSelected
                            ? "#ffffff"
                            : "#30291f",
                          cursor: "pointer",
                        }),
                      }}
                    />

                    {errors.city && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-bold text-[#5f574c]"
                    >
                      العنوان
                    </label>

                    <div className="relative">
                      <MapPin className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-[#a79e91]" />

                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        value={customer.address}
                        onChange={handleChange}
                        placeholder="الحي، الشارع، رقم المنزل..."
                        className={`w-full resize-none rounded-xl border bg-[#fdfbf7] py-3 pr-10 pl-4 text-sm text-[#30291f] placeholder:text-[#b1a99e] outline-none transition-all ${
                          errors.address
                            ? "border-red-400 bg-red-50/30 focus:border-red-500"
                            : "border-[#eadfca] focus:border-[#b88a44] focus:bg-white focus:ring-4 focus:ring-[#b88a44]/10"
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
                      className="mb-2 block text-sm font-bold text-[#5f574c]"
                    >
                      ملاحظات إضافية{" "}
                      <span className="font-normal text-[#a79e91]">
                        (اختياري)
                      </span>
                    </label>

                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={customer.notes}
                      onChange={handleChange}
                      placeholder="أي ملاحظات ترغب بإضافتها للطلب..."
                      className="w-full resize-none rounded-xl border border-[#eadfca] bg-[#fdfbf7] px-4 py-3 text-sm text-[#30291f] placeholder:text-[#b1a99e] outline-none transition-all focus:border-[#b88a44] focus:bg-white focus:ring-4 focus:ring-[#b88a44]/10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="overflow-hidden rounded-[28px] border border-[#eadfca] bg-white shadow-[0_12px_40px_rgba(92,67,35,0.07)]">
              <div className="p-5 md:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8e6b8] text-[#8a642f]">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-black text-[#30291f]">
                      طريقة الدفع
                    </h2>

                    <p className="mt-1 text-sm text-[#8a8175]">
                      اختر طريقة الدفع المناسبة لك
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-[#b88a44] bg-gradient-to-br from-[#fdfbf7] to-[#f8f3e8] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#b88a44]">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#b88a44]" />
                    </div>

                    <div>
                      <p className="font-bold text-[#30291f]">
                        الدفع عند الاستلام
                      </p>

                      <p className="mt-1 text-xs text-[#8a8175]">
                        ادفع قيمة الطلب عند استلامه
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 overflow-hidden rounded-[28px] border border-[#eadfca] bg-white shadow-[0_15px_45px_rgba(92,67,35,0.10)]">
              <div className="border-b border-[#eee5d5] bg-gradient-to-br from-[#fdfbf7] to-[#f8f3e8] p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#b88a44] to-[#8a642f] text-white shadow-md">
                    <ShoppingBag className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-black text-[#30291f]">
                      ملخص الطلب
                    </h2>

                    <p className="mt-1 text-xs text-[#8a8175]">
                      راجع تفاصيل طلبك قبل التأكيد
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <div className="mb-5 max-h-80 space-y-4 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 border-b border-[#eee5d5] pb-4 last:border-0 last:pb-0"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#eadfca] bg-[#f8f3e8]">
                        {item.images?.[0] ? (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#c7bdaE]">
                            <ShoppingBag className="h-6 w-6" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-bold leading-5 text-[#30291f]">
                          {item.name}
                        </h3>

                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <span className="text-xs text-[#8a8175]">
                            الكمية: {item.quantity}
                          </span>

                          <span className="text-sm font-black text-[#b88a44]">
                            {(
                              Number(item.price || 0) *
                              Number(item.quantity || 0)
                            ).toFixed(2)}{" "}
                            ر.س
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-[#eee5d5] pt-5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8a8175]">
                      المجموع الفرعي
                    </span>

                    <span className="font-bold text-[#30291f]">
                      {Number(cartTotal || 0).toFixed(2)} ر.س
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#8a8175]">الشحن</span>

                    {shippingCost === 0 ? (
                      <span className="font-bold text-[#8a642f]">
                        مجاني 🎉
                      </span>
                    ) : (
                      <span className="font-bold text-[#30291f]">
                        {Number(shippingCost).toFixed(2)} ر.س
                      </span>
                    )}
                  </div>

                  {freeShippingThreshold > 0 &&
                    Number(cartTotal) < freeShippingThreshold && (
                      <div className="rounded-2xl border border-[#eadfca] bg-[#f8f3e8] p-3 text-xs leading-5 text-[#6f6557]">
                        أضف{" "}
                        <strong className="text-[#8a642f]">
                          {Math.max(
                            0,
                            freeShippingThreshold - Number(cartTotal),
                          ).toFixed(2)}{" "}
                          ر.س
                        </strong>{" "}
                        للحصول على شحن مجاني.
                      </div>
                    )}

                  <div className="flex items-center justify-between border-t border-[#eadfca] pt-4">
                    <span className="text-base font-black text-[#30291f]">
                      الإجمالي
                    </span>

                    <span className="text-2xl font-black text-[#b88a44]">
                      {Number(finalTotal).toFixed(2)}{" "}
                      <span className="text-sm">ر.س</span>
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || cartItems.length === 0}
                  className="group relative mt-6 flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#b88a44] via-[#a87938] to-[#8a642f] px-5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <span className="absolute -left-20 top-0 h-full w-10 -skew-x-12 bg-white/30 blur-sm animate-[shine_3s_linear_infinite]" />

                  {submitting ? (
                    <>
                      <Loader2 className="relative h-5 w-5 animate-spin" />
                      <span className="relative">
                        جارٍ تأكيد الطلب...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="relative">تأكيد الطلب</span>
                      <ChevronLeft className="relative h-5 w-5" />
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#fdfbf7] px-3 py-3 text-center text-xs text-[#8a8175]">
                  <CheckCircle2 className="h-4 w-4 text-[#b88a44]" />
                  <span>بياناتك محفوظة وآمنة</span>
                </div>

                <Link
                  to="/cart"
                  className="mt-4 block text-center text-sm font-semibold text-[#8a8175] transition-colors hover:text-[#8a642f]"
                >
                  العودة إلى السلة
                </Link>
              </div>
            </div>
          </div>
        </form>

        {/* Trust indicators */}
        <div className="mt-10 grid gap-3 border-t border-[#eee5d5] pt-6 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-2 text-xs text-[#8a8175]">
            <CheckCircle2 className="text-[#b88a44]" />
            بياناتك آمنة
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#8a8175]">
            <ShoppingBag className="text-[#b88a44]" />
            طلب سريع وسهل
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#8a8175]">
            <MapPin className="text-[#b88a44]" />
            توصيل لجميع المناطق
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

