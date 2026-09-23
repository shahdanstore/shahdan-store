
import { useReviews } from "../../hooks/useReviews";
import { FaStar, FaUserCircle, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

function ProductReviews({ productId }) {
  const { reviews, loading } = useReviews(productId);

  if (loading) {
    return (
      <div
        dir="rtl"
        className="mt-12 rounded-[28px] border border-[#eadfca] bg-white p-8 shadow-[0_8px_30px_rgba(74,46,27,0.05)]"
      >
        <div className="flex items-center gap-3 text-[#8b8175]">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#eadfca] border-t-[#d49b35]" />
          جاري تحميل التقييمات...
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="mt-12 overflow-hidden rounded-[28px] border border-[#eadfca] bg-white shadow-[0_8px_30px_rgba(74,46,27,0.05)]"
    >
      {/* Header */}
      <div className="border-b border-[#eadfca] bg-gradient-to-l from-[#f9f6ee] to-white p-6 md:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4e5c5] text-[#d49b35]">
                <FaStar />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b08d57]">
                SHAHDAN STORE
              </span>
            </div>

            <h2 className="text-2xl font-black text-[#4a2e1b] md:text-3xl">
              تقييمات العملاء
            </h2>
          </div>

          <div className="inline-flex w-fit items-center rounded-full bg-[#f9f6ee] px-4 py-2 text-sm font-bold text-[#8a642f]">
            {reviews.length} تقييم
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="p-6 md:p-8">
        {reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#dfd2bb] bg-[#fcfaf5] px-6 py-12 text-center">
            <FaStar className="mx-auto mb-4 text-3xl text-[#d8c8a7]" />

            <p className="font-bold text-[#4a2e1b]">
              لا توجد تقييمات لهذا المنتج بعد.
            </p>

            <p className="mt-2 text-sm text-[#9a9185]">
              كن أول من يشارك تجربته مع هذا المنتج.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl border border-[#eee5d7] bg-[#fffdfa] p-5 transition-all duration-300 hover:border-[#dfc99f] hover:shadow-[0_8px_25px_rgba(74,46,27,0.05)] md:p-6"
              >
                {/* Reviewer Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f4e5c5] text-[#b08d57]">
                      <FaUserCircle className="text-3xl" />
                    </div>

                    <div>
                      <h3 className="font-black text-[#4a2e1b]">
                        {review.name || "عميل"}
                      </h3>

                      {review.verified && (
                        <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#6f7f3c]">
                          <FaCheckCircle />
                          <span>عميل موثق</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 rounded-xl bg-[#fff8e8] px-3 py-2">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={
                          index < Number(review.rating || 0)
                            ? "text-[#d49b35]"
                            : "text-[#e5dccd]"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="mt-5 leading-8 text-[#6f6559]">
                  {review.comment || "لا يوجد تعليق"}
                </p>

                {/* Date */}
                {review.createdAt?.toDate && (
                  <div className="mt-5 flex items-center gap-2 border-t border-[#eee5d7] pt-4 text-sm text-[#9a9185]">
                    <FaCalendarAlt className="text-[#b08d57]" />

                    <span>
                      {review.createdAt
                        .toDate()
                        .toLocaleDateString("ar-SA")}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductReviews;

