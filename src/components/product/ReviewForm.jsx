import { useState } from "react";
import { FaStar } from "react-icons/fa";
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
    <div className="mt-10 rounded-3xl bg-white p-6 shadow-lg">
      <h3 className="mb-6 text-2xl font-bold">اكتب تقييمك</h3>

      <form onSubmit={submitReview}>
        <input
          type="text"
          placeholder="اسمك"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          className="
            mb-4
            w-full
            rounded-xl
            border
            p-3
            outline-none
            transition
            focus:border-green-600
            disabled:bg-gray-100
          "
        />

        {/* Rating */}
        <div className="mb-4 flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              disabled={loading}
              aria-label={`تقييم ${star} من 5`}
              className="transition hover:scale-110 disabled:opacity-50"
            >
              <FaStar
                className={
                  star <= rating
                    ? "text-2xl text-yellow-400"
                    : "text-2xl text-gray-300"
                }
              />
            </button>
          ))}
        </div>

        <textarea
          placeholder="اكتب تجربتك مع المنتج"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={loading}
          className="
            mb-4
            h-32
            w-full
            resize-none
            rounded-xl
            border
            p-3
            outline-none
            transition
            focus:border-green-600
            disabled:bg-gray-100
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-xl
            bg-green-600
            px-6
            py-3
            font-bold
            text-white
            transition
            hover:bg-green-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? "جاري الإرسال..." : "إرسال التقييم"}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
