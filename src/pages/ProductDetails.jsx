import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

import { useStore } from "../hooks/useStore";
import { useCart } from "../hooks/useCart";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductActions from "../components/product/ProductActions";
import ReviewForm from "../components/product/ReviewForm";
import ProductReviews from "../components/product/ProductReviews";

import { trackEvent } from "../lib/metaPixel";
import { trackTikTok } from "../lib/tiktokPixel";
import SEO from "../components/SEO/SEO";

function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [showFloatingProduct, setShowFloatingProduct] = useState(false);

  const { products, getProductBySlug, loading } = useStore();
  const { addToCart } = useCart();

  const product = getProductBySlug(slug);

  // =========================
  // Floating product on scroll
  // =========================
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingProduct(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================
  // Meta Pixel + TikTok Pixel
  // =========================
  useEffect(() => {
    if (!product) return;

    const price = Number(product.price || 0);

    trackEvent("ViewContent", {
      content_name: product.name,
      content_ids: [product.id],
      content_type: "product",
      value: price,
      currency: "SAR",
    });

    trackTikTok("ViewContent", {
      content_id: product.id,
      content_name: product.name,
      content_type: "product",
      value: price,
      currency: "SAR",
    });
  }, [product]);

  // =========================
  // SEO slug redirect
  // =========================
  useEffect(() => {
    if (!product) return;

    if (
      product.seoSlug &&
      slug === product.slug &&
      product.slug !== product.seoSlug
    ) {
      navigate(`/product/${product.seoSlug}`, {
        replace: true,
      });
    }
  }, [product, slug, navigate]);

  // =========================
  // Loading
  // =========================
  const isStoreLoading = loading || (products.length === 0 && !product);

  if (isStoreLoading) {
    return (
      <section className="bg-gradient-to-b from-[#f8f3e8] via-white to-[#f8f3e8] py-16">
        <div className="mx-auto max-w-7xl animate-pulse px-5">
          <div className="mb-8 h-4 w-48 rounded bg-[#e8dfce]" />

          <div className="overflow-hidden rounded-[35px] bg-white shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="bg-gradient-to-br from-[#f8f3e8] to-white p-6 lg:p-10">
                <div className="aspect-square w-full rounded-3xl bg-[#e8dfce]" />
              </div>

              <div className="p-6 lg:p-10">
                <div className="mb-4 h-8 w-3/4 rounded bg-[#e8dfce]" />

                <div className="mb-8 h-6 w-1/3 rounded bg-[#e8dfce]" />

                <div className="my-8 h-px bg-[#eee5d5]" />

                <div className="mb-8 grid grid-cols-2 gap-4">
                  <div className="h-28 rounded-2xl bg-[#e8dfce]" />
                  <div className="h-28 rounded-2xl bg-[#e8dfce]" />
                </div>

                <div className="h-14 w-full rounded-2xl bg-[#e8dfce]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================
  // Product not found
  // =========================
  if (!product) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-[#f8f3e8] px-5">
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          <h2 className="mb-4 text-3xl font-bold text-[#9a6b2f]">
            المنتج غير موجود
          </h2>

          <Link
            to="/"
            className="
              inline-block rounded-2xl
              bg-[#b88a44] px-6 py-3
              font-bold text-white
              transition hover:bg-[#9d7337]
            "
          >
            العودة للمتجر
          </Link>
        </div>
      </div>
    );
  }

  // =========================
  // Related products
  // =========================
  const relatedProducts = products
    .filter(
      (item) => item.id !== product.id && item.category === product.category,
    )
    .slice(0, 4);

  return (
    <section className="bg-gradient-to-b from-[#f8f3e8] via-white to-[#f8f3e8] py-16">
      {/* SEO */}
      <SEO product={product} />

      <div className="mx-auto max-w-7xl px-5">
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#756b5d]">
          <Link to="/" className="font-medium transition hover:text-[#b88a44]">
            الرئيسية
          </Link>

          <FaChevronLeft className="text-xs text-[#b88a44]" />

          <Link
            to="/products"
            className="font-medium transition hover:text-[#b88a44]"
          >
            المتجر
          </Link>

          <FaChevronLeft className="text-xs text-[#b88a44]" />

          <span className="font-bold text-[#8a642f]">{product.name}</span>
        </div>

        {/* Main Product */}
        <div className="overflow-hidden rounded-[35px] border border-[#eadfca] bg-white shadow-[0_20px_60px_rgba(92,67,35,0.10)]">
          <div className="grid lg:grid-cols-2">
            {/* Images */}
            <div className="bg-gradient-to-br from-[#f8f3e8] via-[#fcfaf6] to-white p-6 lg:p-10">
              <ProductGallery key={product.id} product={product} />
            </div>

            {/* Product Info */}
            <div className="p-6 lg:p-10">
              <ProductInfo product={product} />

              <div className="my-8 h-px bg-[#eee5d5]" />

              {/* Features */}
              <div className="mb-8 grid grid-cols-2 gap-4">
                <div
                  className="
                    rounded-2xl border border-[#eadfca]
                    bg-[#fdfbf7] p-5 text-center
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[#d5b477]
                    hover:shadow-lg
                  "
                >
                  <div className="text-4xl">🚚</div>

                  <p className="mt-3 font-bold text-[#30291f]">شحن سريع</p>

                  <span className="text-sm text-[#81776a]">خلال 1-3 أيام</span>
                </div>

                <div
                  className="
                    rounded-2xl border border-[#eadfca]
                    bg-[#fdfbf7] p-5 text-center
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[#d5b477]
                    hover:shadow-lg
                  "
                >
                  <div className="text-4xl">✨</div>

                  <p className="mt-3 font-bold text-[#30291f]">جودة موثوقة</p>

                  <span className="text-sm text-[#81776a]">اختيار بعناية</span>
                </div>
              </div>

              <ProductActions product={product} />
            </div>
          </div>
        </div>

        {/* Reviews */}
        <ProductReviews productId={product.id} />

        <ReviewForm productId={product.id} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="mb-10 text-center">
              <span className="mb-3 inline-block text-sm font-bold tracking-wide text-[#b88a44]">
                اكتشف المزيد
              </span>

              <h2 className="text-4xl font-bold text-[#30291f]">
                منتجات مشابهة
              </h2>

              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#c7a15a]" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.seoSlug || item.slug}`}
                  className="
                    group overflow-hidden rounded-[30px]
                    border border-[#eadfca]
                    bg-white
                    shadow-lg
                    transition-all duration-500
                    hover:-translate-y-3
                    hover:border-[#d5b477]
                    hover:shadow-[0_20px_45px_rgba(92,67,35,0.15)]
                  "
                >
                  <div className="overflow-hidden bg-[#f8f3e8]">
                    <img
                      src={item.images?.[0] || "/logo.png"}
                      alt={item.name || "منتج شهدان"}
                      loading="lazy"
                      className="
                        h-64 w-full object-cover
                        transition duration-700
                        group-hover:scale-110
                      "
                    />
                  </div>

                  <div className="p-5">
                    {item.category && (
                      <span
                        className="
                          rounded-full
                          bg-[#f5ead5]
                          px-3 py-1
                          text-xs font-bold
                          text-[#8a642f]
                        "
                      >
                        {item.category}
                      </span>
                    )}

                    <h3
                      className="
                        mt-4 line-clamp-2
                        text-lg font-bold
                        text-[#30291f]
                        transition-colors
                        group-hover:text-[#9a6b2f]
                      "
                    >
                      {item.name}
                    </h3>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {Number(item.oldPrice || 0) > Number(item.price || 0) && (
                        <span className="text-gray-400 line-through">
                          {item.oldPrice} ر.س
                        </span>
                      )}

                      <span className="text-2xl font-bold text-[#b88a44]">
                        {item.price} ر.س
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Product */}
      {showFloatingProduct && (
        <div
          className="
            fixed bottom-4 left-1/2 z-50
            w-[95%] max-w-md
            -translate-x-1/2
            rounded-2xl
            border border-[#eadfca]
            bg-white p-3
            shadow-[0_15px_45px_rgba(65,45,20,0.20)]
            animate-[fadeIn_.3s]
          "
        >
          <div className="flex items-center gap-3">
            <img
              src={product.images?.[0] || "/logo.png"}
              alt={product.name || "منتج شهدان"}
              loading="lazy"
              className="h-16 w-16 rounded-xl object-cover"
            />

            <div className="flex-1 overflow-hidden">
              <h3 className="truncate font-bold text-[#30291f]">
                {product.name}
              </h3>

              <p className="font-bold text-[#b88a44]">{product.price} ر.س</p>
            </div>

            <button
              type="button"
              onClick={() => {
                addToCart(product);

                const price = Number(product.price || 0);

                trackEvent("AddToCart", {
                  content_name: product.name,
                  content_ids: [product.id],
                  content_type: "product",
                  value: price,
                  currency: "SAR",
                });

                trackTikTok("AddToCart", {
                  content_id: product.id,
                  content_name: product.name,
                  content_type: "product",
                  value: price,
                  currency: "SAR",
                });
              }}
              className="
                rounded-xl
                bg-[#b88a44]
                px-4 py-2
                font-bold text-white
                transition-all duration-300
                hover:bg-[#9d7337]
                hover:shadow-lg
                active:scale-95
              "
            >
              أضف للسلة
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetails;
