import { Helmet } from "react-helmet-async";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>الشروط والأحكام | شهدان ستور</title>

        <meta
          name="description"
          content="تعرف على الشروط والأحكام الخاصة باستخدام متجر شهدان وإتمام عمليات الشراء."
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
              الشروط والأحكام
            </h1>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#c7a15a]" />
          </div>

          <div className="space-y-8 leading-8 text-[#5f574c]">
            {/* مقدمة */}
            <p>
              باستخدامك لموقع شهدان ستور فإنك توافق على الالتزام بالشروط
              والأحكام التالية.
            </p>

            {/* الطلبات */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                الطلبات
              </h2>

              <p>
                يحق للمتجر قبول أو رفض أي طلب في حال وجود خطأ في الأسعار أو نفاد
                الكمية أو لأي سبب مشروع.
              </p>
            </div>

            {/* الأسعار */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                الأسعار
              </h2>

              <p>
                جميع الأسعار قابلة للتغيير دون إشعار مسبق، ويتم اعتماد السعر
                الظاهر عند إتمام الطلب.
              </p>
            </div>

            {/* مسؤولية الاستخدام */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                مسؤولية الاستخدام
              </h2>

              <p>
                يتحمل العميل مسؤولية استخدام المنتجات وفق التعليمات والمعلومات
                المرفقة بها، ولا يتحمل المتجر مسؤولية الاستخدام المخالف
                للتعليمات.
              </p>
            </div>

            {/* حقوق الملكية */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                حقوق الملكية
              </h2>

              <p>
                جميع المحتويات والصور والشعارات الخاصة بمتجر شهدان ستور محفوظة
                الحقوق، ولا يجوز استخدامها دون إذن مسبق.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 border-t border-[#eee5d5] pt-6 text-center">
            <p className="text-sm text-[#8a8175]">
              نحرص في شهدان ستور على الوضوح والشفافية في جميع تعاملاتنا
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
