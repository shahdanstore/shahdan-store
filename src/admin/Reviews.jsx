import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/config";

import AdminLayout from "../components/layout/AdminLayout";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const reviewsQuery = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setReviews(data);
        setLoading(false);
      },
      (snapshotError) => {
        console.error("Reviews error:", snapshotError);

        setError("حدث خطأ أثناء تحميل التقييمات");

        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const approveReview = async (id) => {
    try {
      await updateDoc(doc(db, "reviews", id), {
        approved: true,
      });
    } catch (error) {
      console.error("Approve review error:", error);

      alert("حدث خطأ أثناء اعتماد التقييم");
    }
  };

  const removeReview = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا التقييم؟")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "reviews", id));
    } catch (error) {
      console.error("Delete review error:", error);

      alert("حدث خطأ أثناء حذف التقييم");
    }
  };

  return (
    <AdminLayout>
      <div className="mt-8 rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-6 text-3xl font-bold">إدارة التقييمات</h1>

        {loading ? (
          <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
            جاري تحميل التقييمات...
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-red-50 p-10 text-center text-red-600">
            {error}
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
            لا توجد تقييمات حالياً
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl border bg-white p-5 transition hover:shadow-lg"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold">
                      {review.name || "عميل"}
                    </h3>

                    <p className="text-sm text-gray-500">
                      ⭐ {review.rating || 0}/5
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      review.approved
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {review.approved ? "معتمد" : "بانتظار المراجعة"}
                  </span>
                </div>

                <p className="mb-5 leading-8 text-gray-700">
                  {review.comment || "لا يوجد تعليق"}
                </p>

                <div className="flex gap-3">
                  {!review.approved && (
                    <button
                      type="button"
                      onClick={() => approveReview(review.id)}
                      className="rounded-xl bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
                    >
                      اعتماد
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => removeReview(review.id)}
                    className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Reviews;
