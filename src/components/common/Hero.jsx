import { FaBolt, FaTruck, FaShieldAlt } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#faf8f3] via-white to-[#f3eadc]">
      {/* خلفية زخرفية */}
      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#d4b477]/20 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#b08d57]/15 blur-3xl" />

      <div className="mx-auto flex min-h-[650px] max-w-7xl flex-col-reverse items-center justify-between gap-12 px-6 py-16 md:flex-row">
        {/* النص */}
        <div className="max-w-2xl text-center md:text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f3eadc] px-5 py-2 text-sm font-semibold text-[#b08d57]">
            <FaBolt className="text-[#b08d57]" />
            منتجات مختارة بعناية لجودة أفضل
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-[#171717] md:text-6xl">
            اكتشف اختياراتك مع
            <span className="block text-[#b08d57]">شهدان ستور</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#737373]">
            متجر متخصص في المكملات الغذائية ومنتجات تعزيز الحيوية والطاقة، مع
            مجموعة مختارة بعناية لتجربة شراء موثوقة ومميزة.
          </p>

          {/* الأزرار */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              to="/products"
              className="rounded-2xl bg-[#171717] px-8 py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#b08d57]"
            >
              تسوق الآن
            </Link>

            <Link
              to="/products"
              className="rounded-2xl border-2 border-[#b08d57] bg-white px-8 py-4 font-bold text-[#b08d57] transition duration-300 hover:bg-[#f3eadc]"
            >
              استكشف المنتجات
            </Link>
          </div>

          {/* المميزات */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#e8e1d7] bg-white p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <FaTruck className="mb-3 text-2xl text-[#b08d57]" />

              <p className="font-semibold text-[#242424]">توصيل سريع</p>
            </div>

            <div className="rounded-2xl border border-[#e8e1d7] bg-white p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <FaShieldAlt className="mb-3 text-2xl text-[#b08d57]" />

              <p className="font-semibold text-[#242424]">منتجات موثوقة</p>
            </div>

            <div className="col-span-2 rounded-2xl border border-[#e8e1d7] bg-white p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-1">
              <MdLocalOffer className="mb-3 text-2xl text-[#b08d57]" />

              <p className="font-semibold text-[#242424]">عروض مستمرة</p>
            </div>
          </div>
        </div>

        {/* الصورة / الهوية البصرية */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-96 w-96 rounded-full bg-[#d4b477]/30 blur-2xl" />

          <div className="relative flex h-80 w-80 items-center justify-center rounded-full border border-[#e8e1d7] bg-white shadow-2xl md:h-[420px] md:w-[420px]">
            <div className="absolute inset-6 rounded-full border border-[#d4b477]/40" />

            <FaBolt className="relative z-10 text-[180px] text-[#b08d57] drop-shadow-md md:text-[220px]" />

            <div className="absolute right-0 top-10 rounded-2xl border border-[#e8e1d7] bg-white px-5 py-3 shadow-lg">
              <p className="text-sm text-[#737373]">منتجات مختارة</p>

              <p className="font-bold text-[#b08d57]">جودة أفضل</p>
            </div>

            <div className="absolute bottom-10 left-0 rounded-2xl border border-[#e8e1d7] bg-white px-5 py-3 shadow-lg">
              <p className="text-sm text-[#737373]">تجربة مميزة</p>

              <p className="font-bold text-[#b08d57]">⭐ شهدان</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
