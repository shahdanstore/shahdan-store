import { FaStar, FaCheckCircle } from "react-icons/fa";

import { useReviews } from "../../hooks/useReviews";

function ProductInfo({ product }) {
  const { averageRating, reviews } = useReviews(product.id);

  const price = Number(product?.price || 0);
  const oldPrice = Number(product?.oldPrice || 0);
  const stock = Number(product?.stock || 0);

  const discount =
    oldPrice > price && oldPrice > 0
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const savings = oldPrice > price ? oldPrice - price : 0;

  return (
    <div dir="rtl">
      {/* Discount Banner */}
      {discount > 0 && (
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-[#e7c7d8] bg-gradient-to-r from-[#8e6b8e] to-[#a77fa0] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_25px_rgba(142,107,142,0.18)]">
            <span className="text-base">🔥</span>
            <span>عرض لفترة محدودة</span>
            <span className="h-4 w-px bg-white/30" />
            <span>وفر {savings} ر.س</span>
          </div>
        </div>
      )}

      {/* Category & Discount */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        {product.category && (
          <span className="rounded-full border border-[#eadfca] bg-[#f9f6ee] px-4 py-2 text-sm font-bold text-[#8a642f]">
            ⚡ {product.category}
          </span>
        )}

        {discount > 0 && (
          <span className="rounded-full bg-[#f4e5ef] px-4 py-2 text-sm font-black text-[#8e6b8e]">
            خصم {discount}%
          </span>
        )}
      </div>

      {/* Product Name */}
      <h1 className="text-3xl font-black leading-relaxed text-[#4a2e1b] lg:text-5xl">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-2xl border border-[#eadfca] bg-[#fffaf0] px-4 py-2">
          <FaStar className="text-[#d49b35]" />

          <span className="font-black text-[#4a2e1b]">
            {reviews.length > 0 ? averageRating : "منتج جديد"}
          </span>
        </div>

        <span className="text-sm text-[#8b8175]">({reviews.length} تقييم)</span>
      </div>

      {/* Price */}
      <div className="mt-8 rounded-[28px] border border-[#eadfca] bg-gradient-to-br from-[#f9f6ee] to-white p-6 shadow-[0_8px_30px_rgba(74,46,27,0.05)]">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-4xl font-black text-[#d49b35]">
            {price} ر.س
          </span>

          {oldPrice > price && (
            <span className="text-2xl font-medium text-[#a79e91] line-through">
              {oldPrice} ر.س
            </span>
          )}
        </div>

        {discount > 0 && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f4e5ef] px-4 py-2 text-sm font-bold text-[#8e6b8e]">
            <span>🔥</span>
            <span>وفر {savings} ر.س عند الشراء الآن</span>
          </div>
        )}
      </div>

      {/* Stock */}
      <div className="mt-7">
        {stock > 0 ? (
          <div className="inline-flex flex-wrap items-center gap-3 rounded-2xl border border-[#d9e2c5] bg-[#f1f5e8] px-5 py-3 text-[#657536]">
            <FaCheckCircle />

            <span className="font-black">متوفر بالمخزون</span>

            <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold shadow-sm">
              {stock} قطعة
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center rounded-2xl bg-[#fcebea] px-5 py-3 font-bold text-[#c74b45]">
            غير متوفر حالياً
          </div>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <div className="mt-10 border-t border-[#eadfca] pt-8">
          <h3 className="mb-4 text-xl font-black text-[#4a2e1b]">وصف المنتج</h3>

          <div
            className="product-description leading-9 text-[#6f6559]"
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
