import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>سياسة الخصوصية | شهدان ستور</title>

        <meta
          name="description"
          content="تعرف على سياسة الخصوصية وكيفية حماية بيانات العملاء في متجر شهدان ستور."
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
              سياسة الخصوصية
            </h1>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#c7a15a]" />
          </div>

          <div className="space-y-8 leading-8 text-[#5f574c]">
            <p>
              يلتزم متجر شهدان ستور بحماية خصوصية العملاء وعدم مشاركة بياناتهم
              مع أي جهة إلا عند الحاجة لإتمام الطلب أو وفقًا للأنظمة المعمول
              بها.
            </p>

            {/* البيانات التي نجمعها */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                البيانات التي نجمعها
              </h2>

              <ul className="list-disc space-y-2 pr-6 marker:text-[#b88a44]">
                <li>الاسم.</li>
                <li>رقم الجوال.</li>
                <li>البريد الإلكتروني.</li>
                <li>عنوان الشحن.</li>
              </ul>
            </div>

            {/* استخدام البيانات */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                استخدام البيانات
              </h2>

              <ul className="list-disc space-y-2 pr-6 marker:text-[#b88a44]">
                <li>تنفيذ الطلبات.</li>
                <li>التواصل مع العملاء.</li>
                <li>تحسين تجربة المستخدم.</li>
              </ul>
            </div>

            {/* حماية المعلومات */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-[#8a642f]">
                حماية المعلومات
              </h2>

              <p>
                نتخذ الإجراءات الأمنية المناسبة لحماية معلومات العملاء ومنع
                الوصول غير المصرح به إليها.
              </p>
            </div>
          </div>

          {/* Decorative Footer */}
          <div className="mt-12 border-t border-[#eee5d5] pt-6 text-center">
            <p className="text-sm text-[#8a8175]">
              خصوصيتك وثقتك محل اهتمامنا في شهدان ستور
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
