import { FaEnvelope, FaBolt, FaHeadset, FaHeart } from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
          {/* Header */}
          <div className="bg-green-600 p-8 text-center text-white">
            <FaBolt className="mx-auto mb-4 text-5xl" />

            <h1 className="mb-3 text-4xl font-bold">
              مرحبًا بكم في شهدان ستور
            </h1>

            <p className="text-lg text-green-100">
              وجهتكم الموثوقة للمكملات الغذائية ومنتجات الحيوية والطاقة
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 p-8">
            <div>
              <h2 className="mb-3 flex items-center gap-3 text-2xl font-bold text-gray-800">
                <FaHeart className="text-green-600" />
                من نحن
              </h2>

              <p className="leading-8 text-gray-600">
                في شهدان ستور نسعى إلى توفير مجموعة مختارة من المكملات الغذائية
                ومنتجات تعزيز الحيوية والطاقة، مع الاهتمام بجودة المنتجات وتجربة
                التسوق السهلة والمريحة لعملائنا.
              </p>
            </div>

            <div>
              <h2 className="mb-3 flex items-center gap-3 text-2xl font-bold text-gray-800">
                <FaHeadset className="text-green-600" />
                خدمة العملاء
              </h2>

              <p className="leading-8 text-gray-600">
                رضاكم هو أولويتنا، لذلك نحرص على تقديم الدعم والإجابة عن
                استفساراتكم ومساعدتكم قبل وأثناء وبعد إتمام الطلب.
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-6 text-center">
              <h3 className="mb-4 text-xl font-bold text-green-700">
                يسعدنا تواصلكم معنا
              </h3>

              <a
                href="mailto:shahdan.store@gmail.com"
                className="inline-flex items-center gap-3 rounded-2xl bg-green-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
              >
                <FaEnvelope />
                shahdan.store@gmail.com
              </a>
            </div>

            <div className="text-center text-gray-500">
              شكرًا لاختياركم شهدان ستور ⚡
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
