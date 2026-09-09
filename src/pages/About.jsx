import { FaEnvelope, FaBolt, FaHeadset, FaHeart } from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f3e8] via-white to-[#f8f3e8] py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div
          className="
            overflow-hidden rounded-[30px]
            border border-[#eadfca]
            bg-white
            shadow-[0_20px_60px_rgba(92,67,35,0.10)]
          "
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-[#b88a44] via-[#a87938] to-[#8a642f] p-8 text-center text-white md:p-12">
            <FaBolt className="mx-auto mb-4 text-5xl text-[#f8e6b8]" />

            <h1 className="mb-3 text-4xl font-bold">
              مرحبًا بكم في شهدان ستور
            </h1>

            <p className="text-lg text-[#f8ead0]">
              وجهتكم الموثوقة للمكملات الغذائية ومنتجات الحيوية والطاقة
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 p-8 md:p-12">
            {/* من نحن */}
            <div>
              <h2 className="mb-3 flex items-center gap-3 text-2xl font-bold text-[#30291f]">
                <FaHeart className="text-[#b88a44]" />
                من نحن
              </h2>

              <p className="leading-8 text-[#5f574c]">
                في شهدان ستور نسعى إلى توفير مجموعة مختارة من المكملات الغذائية
                ومنتجات تعزيز الحيوية والطاقة، مع الاهتمام بجودة المنتجات وتجربة
                التسوق السهلة والمريحة لعملائنا.
              </p>
            </div>

            {/* خدمة العملاء */}
            <div>
              <h2 className="mb-3 flex items-center gap-3 text-2xl font-bold text-[#30291f]">
                <FaHeadset className="text-[#b88a44]" />
                خدمة العملاء
              </h2>

              <p className="leading-8 text-[#5f574c]">
                رضاكم هو أولويتنا، لذلك نحرص على تقديم الدعم والإجابة عن
                استفساراتكم ومساعدتكم قبل وأثناء وبعد إتمام الطلب.
              </p>
            </div>

            {/* التواصل */}
            <div className="rounded-2xl border border-[#eadfca] bg-[#f8f3e8] p-6 text-center">
              <h3 className="mb-4 text-xl font-bold text-[#8a642f]">
                يسعدنا تواصلكم معنا
              </h3>

              <a
                href="mailto:shahdan.store@gmail.com"
                className="
                  inline-flex items-center gap-3
                  rounded-2xl
                  bg-[#b88a44]
                  px-6 py-4
                  text-lg font-semibold text-white
                  shadow-md
                  transition-all duration-300
                  hover:bg-[#9d7337]
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <FaEnvelope />
                shahdan.store@gmail.com
              </a>
            </div>

            {/* Footer */}
            <div className="border-t border-[#eee5d5] pt-6 text-center text-[#8a8175]">
              شكرًا لاختياركم شهدان ستور ⚡
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
