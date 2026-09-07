import { motion } from "framer-motion";
import { FaBolt, FaTruck, FaShieldAlt, FaArrowLeft } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";

function Hero() {
  const features = [
    {
      icon: <FaTruck />,
      title: "شحن سريع",
    },
    {
      icon: <FaShieldAlt />,
      title: "اختيارات موثوقة",
    },
    {
      icon: <MdLocalOffer />,
      title: "عروض مميزة",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#11100e] text-white">
      {/* ================= الخلفية ================= */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* توهج خفيف */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#b08d57]/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#d4b477]/10 blur-3xl" />

        {/* دائرة ديكورية - حركة خفيفة */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute right-[-180px] top-[10%] h-[480px] w-[480px] rounded-full border border-[#b08d57]/10 will-change-transform"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute right-[-120px] top-[18%] h-[360px] w-[360px] rounded-full border border-[#d4b477]/10 will-change-transform"
        />

        {/* نقاط زخرفية ثابتة */}
        <span className="absolute left-[8%] top-[20%] h-2 w-2 rounded-full bg-[#d4b477]/50" />

        <span className="absolute left-[18%] top-[35%] h-1.5 w-1.5 rounded-full bg-[#b08d57]/40" />

        <span className="absolute bottom-[20%] left-[25%] h-2 w-2 rounded-full bg-[#d4b477]/30" />
      </div>

      {/* ================= المحتوى الرئيسي ================= */}

      <div className="mx-auto grid min-h-[calc(100vh-128px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* ================= النص ================= */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 text-center lg:text-right"
        >
          {/* الشارة */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.5,
            }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#b08d57]/30 bg-[#b08d57]/10 px-5 py-2.5 text-sm font-medium text-[#d4b477]"
          >
            <span className="h-2 w-2 rounded-full bg-[#d4b477]" />
            اختيارات تليق بك
          </motion.div>

          {/* العنوان */}

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-5xl font-black leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl"
          >
            لأن التفاصيل
            <span className="mt-2 block bg-gradient-to-l from-[#f1d99b] via-[#d4b477] to-[#a77d3d] bg-clip-text text-transparent">
              تصنع الفرق
            </span>
          </motion.h1>

          {/* الوصف */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.6,
            }}
            className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#aaa6a0] sm:text-lg lg:mx-0"
          >
            اكتشف مجموعة مختارة من المكملات الغذائية ومنتجات الحيوية والطاقة
            بعناية، لتجربة شراء تجمع بين الجودة والثقة والأناقة.
          </motion.p>

          {/* الأزرار */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.6,
            }}
            className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <Link
              to="/products"
              className="group relative overflow-hidden rounded-2xl bg-[#d4b477] px-8 py-4 font-bold text-[#171511] shadow-[0_10px_35px_rgba(212,180,119,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e2c88e]"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                تسوق الآن
                <FaArrowLeft className="text-sm transition-transform duration-300 group-hover:-translate-x-1" />
              </span>

              {/* لمعة الزر */}
              <span className="absolute inset-y-0 -left-20 w-16 rotate-12 bg-white/20 transition-all duration-500 group-hover:left-[120%]" />
            </Link>

            <Link
              to="/categories"
              className="rounded-2xl border border-white/15 bg-white/[0.04] px-8 py-4 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d4b477]/50 hover:bg-[#d4b477]/10"
            >
              استكشف التصنيفات
            </Link>
          </motion.div>

          {/* المميزات */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.65,
              duration: 0.6,
            }}
            className="mx-auto mt-12 grid max-w-xl grid-cols-3 border-y border-white/10 py-5 lg:mx-0"
          >
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`flex flex-col items-center gap-2 px-3 ${
                  index !== 0 ? "border-r border-white/10" : ""
                }`}
              >
                <span className="text-lg text-[#d4b477]">{feature.icon}</span>

                <span className="text-xs font-medium text-[#c9c5bf] sm:text-sm">
                  {feature.title}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ================= الشعار ================= */}

        <div className="relative mx-auto flex h-[430px] w-full max-w-[520px] items-center justify-center lg:h-[540px]">
          {/* هالة خلف الشعار */}

          <div className="absolute h-72 w-72 rounded-full bg-[#b08d57]/10 blur-3xl sm:h-96 sm:w-96" />

          {/* الحلقة الخارجية */}

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[310px] w-[310px] rounded-full border border-dashed border-[#b08d57]/20 will-change-transform sm:h-[420px] sm:w-[420px]"
          >
            {/* نقطة على الحلقة */}

            <span className="absolute right-4 top-1/2 h-2.5 w-2.5 rounded-full bg-[#d4b477] shadow-[0_0_15px_rgba(212,180,119,0.7)]" />
          </motion.div>

          {/* الحلقة الداخلية */}

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 55,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[250px] w-[250px] rounded-full border border-[#d4b477]/15 will-change-transform sm:h-[340px] sm:w-[340px]"
          >
            <span className="absolute bottom-5 left-1/2 h-2 w-2 rounded-full bg-[#b08d57]/70" />
          </motion.div>

          {/* البطاقة الرئيسية */}

          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 flex h-64 w-64 items-center justify-center rounded-full border border-[#d4b477]/30 bg-gradient-to-br from-[#27241e] via-[#181714] to-[#0d0d0c] shadow-[0_20px_70px_rgba(0,0,0,0.45)] will-change-transform sm:h-80 sm:w-80"
          >
            {/* إطار داخلي */}

            <div className="absolute inset-4 rounded-full border border-[#d4b477]/10 sm:inset-6" />

            {/* الشعار الحقيقي */}

            <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_10px_45px_rgba(212,180,119,0.18)] sm:h-52 sm:w-52">
              <img
                src="/logo.png"
                alt="شهدان ستور"
                className="h-full w-full object-cover"
              />
            </div>

            {/* اسم المتجر */}

            <div className="absolute bottom-5 rounded-full border border-white/10 bg-[#11100e]/80 px-4 py-1.5 backdrop-blur-sm">
              <span className="text-[9px] font-semibold tracking-[0.3em] text-[#d4b477]">
                SHAHDAN STORE
              </span>
            </div>
          </motion.div>

          {/* ================= البطاقات العائمة ================= */}

          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-0 top-12 hidden rounded-2xl border border-white/10 bg-[#1c1b18]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4b477]/10 text-[#d4b477]">
                <FaBolt />
              </div>

              <div>
                <p className="text-sm font-bold text-white">حيوية</p>

                <p className="mt-0.5 text-[10px] text-[#96918a]">
                  اختيارات مميزة
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-16 left-0 hidden rounded-2xl border border-white/10 bg-[#1c1b18]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4b477]/10 text-[#d4b477]">
                <FaShieldAlt />
              </div>

              <div>
                <p className="text-sm font-bold text-white">ثقة</p>

                <p className="mt-0.5 text-[10px] text-[#96918a]">جودة مختارة</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 right-10 hidden rounded-2xl border border-white/10 bg-[#1c1b18]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4b477]/10 text-[#d4b477]">
                <MdLocalOffer />
              </div>

              <div>
                <p className="text-sm font-bold text-white">عروض</p>

                <p className="mt-0.5 text-[10px] text-[#96918a]">قيمة أفضل</p>
              </div>
            </div>
          </motion.div>

          {/* نقاط صغيرة متحركة */}

          <motion.span
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[17%] top-[18%] h-2 w-2 rounded-full bg-[#d4b477]"
          />

          <motion.span
            animate={{
              y: [0, 8, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[18%] right-[14%] h-1.5 w-1.5 rounded-full bg-[#b08d57]"
          />
        </div>
      </div>

      {/* تدرج سفلي */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#11100e] to-transparent" />
    </section>
  );
}

export default Hero;
