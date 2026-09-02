import { FaBolt, FaTruck, FaShieldAlt, FaHeadset } from "react-icons/fa";

function WhyUs() {
  const features = [
    {
      icon: <FaBolt />,
      title: "اختيارات مميزة",
      desc: "منتجات مختارة بعناية لتناسب احتياجاتك وجودة تجربة الشراء.",
    },
    {
      icon: <FaTruck />,
      title: "شحن سريع",
      desc: "توصيل سريع وموثوق إلى مختلف مناطق المملكة.",
    },
    {
      icon: <FaShieldAlt />,
      title: "جودة موثوقة",
      desc: "نهتم بتوفير منتجات من مصادر موثوقة وتجربة شراء آمنة.",
    },
    {
      icon: <FaHeadset />,
      title: "دعم متواصل",
      desc: "فريق خدمة عملاء جاهز لمساعدتك والإجابة عن استفساراتك.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-14 text-center text-4xl font-bold text-gray-800">
          لماذا تختار شهدان ستور؟ ⚡
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="
                rounded-3xl
                border
                p-8
                text-center
                shadow-sm
                transition
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              <div className="mb-6 flex justify-center text-5xl text-green-600">
                {item.icon}
              </div>

              <h3 className="mb-3 text-xl font-bold">{item.title}</h3>

              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
