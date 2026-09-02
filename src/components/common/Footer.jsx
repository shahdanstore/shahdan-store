import { FaWhatsapp, FaInstagram, FaTruck, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 bg-green-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Logo */}
          <div>
            <h2 className="mb-4 text-3xl font-bold text-green-400">شهدان</h2>

            <p className="leading-8 text-gray-300">
              متجر شهدان متخصص في المكملات الغذائية ومنتجات تعزيز الحيوية
              والطاقة، مع توفير منتجات مختارة بعناية وخدمة موثوقة.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold">روابط سريعة</h3>

            <div className="flex flex-col gap-3 text-gray-300">
              <Link
                to="/"
                className="transition duration-300 hover:text-green-400"
              >
                الرئيسية
              </Link>

              <Link
                to="/products"
                className="transition duration-300 hover:text-green-400"
              >
                المنتجات
              </Link>

              <Link
                to="/products?category=العروض+والبكجات"
                className="transition duration-300 hover:text-green-400"
              >
                العروض
              </Link>

              <Link
                to="/about"
                className="transition duration-300 hover:text-green-400"
              >
                تواصل معنا
              </Link>

              <Link
                to="/return-policy"
                className="transition duration-300 hover:text-green-400"
              >
                سياسة الاسترجاع والاستبدال
              </Link>
            </div>
          </div>

          {/* السياسات */}
          <div>
            <h3 className="mb-5 text-lg font-bold">السياسات</h3>

            <div className="flex flex-col gap-3 text-gray-300">
              <Link
                className="transition duration-300 hover:text-green-400"
                to="/return-policy"
              >
                سياسة الاسترجاع والاستبدال
              </Link>

              <Link
                className="transition duration-300 hover:text-green-400"
                to="/shipping-policy"
              >
                سياسة الشحن والتوصيل
              </Link>

              <Link
                className="transition duration-300 hover:text-green-400"
                to="/privacy-policy"
              >
                سياسة الخصوصية
              </Link>

              <Link
                className="transition duration-300 hover:text-green-400"
                to="/terms"
              >
                الشروط والأحكام
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-bold">تواصل معنا</h3>

            <div className="space-y-4 text-gray-300">
              <p>التواصل عبر واتساب</p>
              <p>خدمة عملاء شهدان</p>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-5 text-lg font-bold">لماذا شهدان؟</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaTruck className="text-green-400" />
                <span>شحن سريع</span>
              </div>

              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-green-400" />
                <span>دفع آمن</span>
              </div>

              <div className="flex items-center gap-3">
                <FaWhatsapp className="text-green-400" />
                <span>دعم عبر واتساب</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-green-900 pt-6 md:flex-row">
          <p className="text-sm text-gray-400">
            © 2026 شهدان ستور | جميع الحقوق محفوظة
          </p>

          <div className="flex gap-4 text-2xl">
            <a
              href="#"
              aria-label="Instagram"
              className="transition duration-300 hover:text-green-400"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              aria-label="WhatsApp"
              className="transition duration-300 hover:text-green-400"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
