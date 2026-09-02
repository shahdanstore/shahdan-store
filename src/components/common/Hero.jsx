import { FaBolt, FaTruck, FaShieldAlt } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* خلفية زخرفية */}
      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-green-300/20 blur-3xl" />

      <div className="mx-auto flex min-h-[650px] max-w-7xl flex-col-reverse items-center justify-between gap-12 px-6 py-16 md:flex-row">
        {/* النص */}
        <div className="max-w-2xl text-center md:text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
            ⚡ منتجات مختارة بعناية لجودة أفضل
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl">
            اكتشف اختياراتك مع
            <span className="block text-green-600">شهدان ستور</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            متجر متخصص في المكملات الغذائية ومنتجات تعزيز الحيوية والطاقة، مع
            مجموعة مختارة بعناية لتجربة شراء موثوقة ومميزة.
          </p>

          {/* الأزرار */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              to="/products"
              className="rounded-2xl bg-green-600 px-8 py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-green-700"
            >
              تسوق الآن
            </Link>

            <Link
              to="/products"
              className="rounded-2xl border-2 border-green-600 bg-white px-8 py-4 font-bold text-green-700 transition duration-300 hover:bg-green-50"
            >
              استكشف المنتجات
            </Link>
          </div>

          {/* المميزات */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 shadow-md">
              <FaTruck className="mb-3 text-2xl text-green-600" />

              <p className="font-semibold text-gray-700">توصيل سريع</p>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-md">
              <FaShieldAlt className="mb-3 text-2xl text-green-600" />

              <p className="font-semibold text-gray-700">منتجات موثوقة</p>
            </div>

            <div className="col-span-2 rounded-2xl bg-white p-4 shadow-md md:col-span-1">
              <MdLocalOffer className="mb-3 text-2xl text-green-600" />

              <p className="font-semibold text-gray-700">عروض مستمرة</p>
            </div>
          </div>
        </div>

        {/* الصورة / الهوية البصرية */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-96 w-96 rounded-full bg-green-200/50 blur-2xl" />

          <div className="relative flex h-80 w-80 items-center justify-center rounded-full bg-white shadow-2xl md:h-[420px] md:w-[420px]">
            <FaBolt className="text-[180px] text-green-600 md:text-[220px]" />

            <div className="absolute right-0 top-10 rounded-2xl bg-white px-5 py-3 shadow-lg">
              <p className="text-sm text-gray-500">منتجات مختارة</p>

              <p className="font-bold text-green-600">جودة أفضل</p>
            </div>

            <div className="absolute bottom-10 left-0 rounded-2xl bg-white px-5 py-3 shadow-lg">
              <p className="text-sm text-gray-500">تجربة مميزة</p>

              <p className="font-bold text-yellow-500">⭐ شهدان</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
