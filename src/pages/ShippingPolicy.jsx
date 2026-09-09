import { Helmet } from "react-helmet-async";

export default function ShippingPolicy() {
  return (
    <>
      <Helmet>
        <title>سياسة الشحن والتوصيل | شهدان ستور</title>

        <meta
          name="description"
          content="تعرف على سياسة الشحن والتوصيل ومدة التسليم ورسوم الشحن في متجر شهدان ستور."
        />
      </Helmet>

      <section className="bg-gradient-to-b from-[#f8f3e8] via-white to-[#f8f3e8] py-16">
        <div
          className="
            mx-auto max-w-4xl
            rounded-[30px]
            border border-[#eadfca]
            bg-white
            p-8
            shadow-[0_20px_60px_rgba(92,67,35,0.10)]
            md:p-12
          "
        >
          {/* Page Title */}
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-sm font-bold tracking-wide text-[#b88a44]">
              شهدان ستور
            </span>

            <h1 className="text-4xl font-bold text-[#30291f]">
              سياسة الشحن والتوصيل
            </h1>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#c7a15a]" />
          </div>

          <div className="space-y-8 leading-8 text-[#5f574c]">
            {/* مناطق الشحن */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                مناطق الشحن
              </h2>

              <p>
                يوفر متجر شهدان ستور خدمة الشحن إلى جميع مدن المملكة العربية
                السعودية عبر شركات شحن معتمدة.
              </p>
            </div>

            {/* مدة التوصيل */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                مدة التوصيل
              </h2>

              <ul className="list-disc space-y-2 pr-6 marker:text-[#b88a44]">
                <li>داخل المدن الرئيسية: من 1 إلى 3 أيام عمل.</li>
                <li>باقي المدن: من 3 إلى 7 أيام عمل.</li>
              </ul>
            </div>

            {/* رسوم الشحن */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                رسوم الشحن
              </h2>

              <p>
                يتم احتساب رسوم الشحن عند إتمام الطلب وفق إعدادات المتجر، وقد
                تتوفر عروض شحن مجاني لبعض الطلبات.
              </p>
            </div>

            {/* تتبع الطلب */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                تتبع الطلب
              </h2>

              <p>
                بعد شحن الطلب سيتم إرسال رقم التتبع للعميل لمتابعة حالة الشحنة.
              </p>
            </div>
          </div>

          {/* Decorative Footer */}
          <div className="mt-12 border-t border-[#eee5d5] pt-6 text-center">
            <p className="text-sm text-[#8a8175]">
              نسعى لتقديم تجربة شحن موثوقة وسريعة لعملائنا في شهدان ستور
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
