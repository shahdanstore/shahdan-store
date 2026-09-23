import { useState } from "react";
import { FaStar, FaPen } from "react-icons/fa";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../../firebase/config";

function ReviewForm({ productId }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const submitReview = async (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanComment = comment.trim();

    if (!cleanName || !cleanComment) {
      toast.error("الرجاء تعبئة جميع الحقول");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "reviews"), {
        productId,
        name: cleanName,
        comment: cleanComment,
        rating,
        approved: false,
        createdAt: serverTimestamp(),
      });

      toast.success("تم إرسال تقييمك وسيظهر بعد المراجعة");

      setName("");
      setComment("");
      setRating(5);
    } catch (error) {
      console.error("Review submission error:", error);

      toast.error("حدث خطأ أثناء إرسال التقييم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="mt-10 overflow-hidden rounded-[28px] border border-[#eadfca] bg-white shadow-[0_8px_30px_rgba(74,46,27,0.05)]"
    >
      {/* Header */}
      <div className="border-b border-[#eadfca] bg-gradient-to-l from-[#f9f6ee] to-white p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4e5c5] text-[#d49b35]">
            <FaPen />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#b08d57]">
              SHAHDAN STORE
            </span>

            <h3 className="mt-1 text-2xl font-black text-[#4a2e1b]">
              اكتب تقييمك
            </h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-7 text-[#8b8175]">
          شارك تجربتك مع المنتج وساعد العملاء الآخرين في اختيار ما يناسبهم.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={submitReview} className="p-6 md:p-8">
        {/* Name */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-bold text-[#4a2e1b]">
            الاسم
          </label>

          <input
            type="text"
            placeholder="اكتب اسمك"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="
              w-full
              rounded-2xl
              border
              border-[#e5dac8]
              bg-[#fffdfa]
              px-4
              py-3.5
              text-[#4a2e1b]
              outline-none
              transition
              placeholder:text-[#aaa095]
              focus:border-[#d49b35]
              focus:ring-4
              focus:ring-[#d49b35]/10
              disabled:cursor-not-allowed
              disabled:bg-[#f5f2ec]
            "
          />
        </div>

        {/* Rating */}
        <div className="mb-5">
          <label className="mb-3 block text-sm font-bold text-[#4a2e1b]">
            تقييمك للمنتج
          </label>

          <div className="flex w-fit items-center gap-1 rounded-2xl border border-[#eadfca] bg-[#fffaf0] px-4 py-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                disabled={loading}
                aria-label={`تقييم ${star} من 5`}
                className="rounded-lg p-1 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaStar
                  className={
                    star <= rating
                      ? "text-2xl text-[#d49b35]"
                      : "text-2xl text-[#e1d8ca]"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-[#4a2e1b]">
            تجربتك
          </label>

          <textarea
            placeholder="اكتب تجربتك مع المنتج"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loading}
            className="
              h-36
              w-full
              resize-none
              rounded-2xl
              border
              border-[#e5dac8]
              bg-[#fffdfa]
              px-4
              py-3.5
              leading-7
              text-[#4a2e1b]
              outline-none
              transition
              placeholder:text-[#aaa095]
              focus:border-[#d49b35]
              focus:ring-4
              focus:ring-[#d49b35]/10
              disabled:cursor-not-allowed
              disabled:bg-[#f5f2ec]
            "
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            inline-flex
            items-center
            justify-center
            rounded-2xl
            bg-[#d49b35]
            px-7
            py-3.5
            font-black
            text-white
            shadow-[0_8px_20px_rgba(212,155,53,0.2)]
            transition
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#bd8428]
            hover:shadow-[0_12px_25px_rgba(212,155,53,0.28)]
            disabled:cursor-not-allowed
            disabled:opacity-60
            disabled:hover:translate-y-0
          "
        >
          {loading ? "جاري الإرسال..." : "إرسال التقييم"}
        </button>

        <p className="mt-4 text-xs leading-6 text-[#9a9185]">
          سيتم مراجعة التقييم قبل ظهوره في صفحة المنتج.
        </p>
      </form>
    </div>
  );
}

export default ReviewForm;
