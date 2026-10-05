import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#171717]">
      <div className="relative mx-auto w-full max-w-[1920px]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden"
        >
          <Link
            to="/products"
            aria-label="تسوق منتجات شهدان ستور"
            className="group block"
          >
            <img
              src="/banner.png"
              alt="شهدان ستور - منتجات طبيعية مختارة بعناية"
              className="
                block
                h-auto
                w-full
                object-cover
                transition-transform
                duration-700
                ease-out
                md:group-hover:scale-[1.01]
              "
            />

            {/* طبقة فخمة خفيفة */}
            <span
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-r
                from-[#171717]/10
                via-transparent
                to-[#b08d57]/10
                opacity-60
              "
            />

            {/* لمعة عند المرور بالماوس */}
            <span
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-r
                from-transparent
                via-white/[0.06]
                to-transparent
                opacity-0
                transition-opacity
                duration-500
                md:group-hover:opacity-100
              "
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
