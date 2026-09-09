import { Helmet } from "react-helmet-async";

export default function ReturnPolicy() {
  return (
    <>
      <Helmet>
        <meta property="og:type" content="website" />

        <meta
          property="og:title"
          content="سياسة الاسترجاع والاستبدال | شهدان ستور"
        />

        <meta
          property="og:description"
          content="تعرف على سياسة الاسترجاع والاستبدال في متجر شهدان ستور."
        />

        <title>سياسة الاسترجاع والاستبدال | شهدان ستور</title>

        <meta
          name="description"
          content="تعرف على سياسة الاسترجاع والاستبدال في متجر شهدان ستور، وشروط إعادة أو استبدال المنتجات."
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
              سياسة الاسترجاع والاستبدال
            </h1>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#c7a15a]" />
          </div>

          <p className="mb-10 text-center text-sm text-[#8a8175]">
            آخر تحديث: 2 سبتمبر 2026
          </p>

          <div className="space-y-10 leading-8 text-[#5f574c]">
            {/* الاسترجاع */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                أولًا: الاسترجاع
              </h2>

              <p>
                في <strong className="text-[#30291f]">شهدان ستور</strong> نسعى
                لتقديم منتجات موثوقة وضمان رضا عملائنا، لذلك يمكن طلب استرجاع
                المنتج خلال
                <strong className="text-[#8a642f]"> 7 أيام </strong>
                من تاريخ الاستلام وفق الشروط التالية:
              </p>

              <ul className="mt-4 list-disc space-y-2 pr-6 marker:text-[#b88a44]">
                <li>أن يكون المنتج بحالته الأصلية.</li>
                <li>ألا يكون قد تم استخدامه أو فتحه.</li>
                <li>أن يكون داخل التغليف الأصلي.</li>
                <li>إرفاق رقم الطلب عند طلب الاسترجاع.</li>
              </ul>
            </div>

            {/* الاستبدال */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                ثانيًا: الاستبدال
              </h2>

              <p>
                يحق للعميل طلب استبدال المنتج خلال
                <strong className="text-[#8a642f]"> 7 أيام </strong>
                في الحالات التالية:
              </p>

              <ul className="mt-4 list-disc space-y-2 pr-6 marker:text-[#b88a44]">
                <li>وجود عيب مصنعي.</li>
                <li>وصول منتج غير مطابق للطلب.</li>
                <li>تلف المنتج أثناء الشحن.</li>
              </ul>

              <p className="mt-4">
                في هذه الحالات يتحمل المتجر تكاليف الشحن المتعلقة بالاستبدال أو
                الاسترجاع وفق الحالة.
              </p>
            </div>

            {/* المنتجات غير القابلة للاسترجاع */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                المنتجات غير القابلة للاسترجاع
              </h2>

              <ul className="list-disc space-y-2 pr-6 marker:text-[#b88a44]">
                <li>المنتجات الغذائية أو المكملات بعد فتحها.</li>

                <li>
                  المنتجات التي تمت إزالة تغليفها بطريقة تمنع إعادة بيعها.
                </li>

                <li>المنتجات المستخدمة أو التالفة بسبب سوء الاستخدام.</li>

                <li>المنتجات المخصصة حسب طلب العميل.</li>
              </ul>
            </div>

            {/* المنتجات التالفة أو الخاطئة */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                المنتجات التالفة أو الخاطئة
              </h2>

              <p>
                إذا وصلك منتج تالف أو غير مطابق لطلبك، يرجى التواصل معنا خلال
                <strong className="text-[#8a642f]"> 48 ساعة </strong>
                من الاستلام مع إرسال:
              </p>

              <ul className="mt-4 list-disc space-y-2 pr-6 marker:text-[#b88a44]">
                <li>رقم الطلب.</li>
                <li>صور واضحة للمنتج.</li>
                <li>وصف للمشكلة.</li>
              </ul>
            </div>

            {/* رسوم الشحن */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                رسوم الشحن
              </h2>

              <ul className="list-disc space-y-2 pr-6 marker:text-[#b88a44]">
                <li>
                  إذا كان سبب الاسترجاع رغبة العميل، فقد تخصم رسوم الشحن من قيمة
                  الطلب وفق سياسة المتجر.
                </li>

                <li>
                  إذا كان الخطأ من المتجر أو وصل المنتج تالفًا، يتحمل المتجر
                  تكاليف الشحن المتعلقة بالمعالجة.
                </li>
              </ul>
            </div>

            {/* إلغاء الطلب */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                إلغاء الطلب
              </h2>

              <p>
                يمكن إلغاء الطلب قبل شحنه، أما بعد الشحن فتطبق سياسة الاسترجاع
                والاستبدال حسب حالة الطلب.
              </p>
            </div>

            {/* التواصل معنا */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                التواصل معنا
              </h2>

              <p>
                لأي استفسار بخصوص الاسترجاع أو الاستبدال يمكن التواصل معنا عبر:
              </p>

              <ul className="mt-4 list-disc space-y-2 pr-6 marker:text-[#b88a44]">
                <li>واتساب خدمة العملاء.</li>
                <li>البريد الإلكتروني الخاص بالمتجر.</li>
                <li>صفحة التواصل داخل الموقع.</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 border-t border-[#eee5d5] pt-6 text-center">
            <p className="text-sm text-[#8a8175]">
              ثقتكم محل اهتمامنا، ونسعى دائمًا لتقديم تجربة موثوقة في شهدان ستور
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
