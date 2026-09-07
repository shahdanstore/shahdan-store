import { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

import AdminLayout from "../components/layout/AdminLayout";
import { useStore } from "../hooks/useStore";
import { uploadToCloudinary } from "../services/cloudinary";

const emptyForm = {
  name: "",
  image: "",
};

function Categories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } =
    useStore();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const productCount = (categoryName) =>
    products.filter((product) => product.category === categoryName).length;

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setShowForm(true);
  };

  const openEditForm = (category) => {
    setForm({
      name: category.name,
      image: category.image || "",
    });

    setEditingId(category.id);
    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setUploadingImage(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // التحقق من نوع الملف
    if (!file.type.startsWith("image/")) {
      setError("يرجى اختيار ملف صورة صالح.");
      return;
    }

    // الحد الأقصى 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("حجم الصورة يجب ألا يتجاوز 5 ميجابايت.");
      return;
    }

    try {
      setUploadingImage(true);
      setError("");

      const imageUrl = await uploadToCloudinary(file);

      setForm((current) => ({
        ...current,
        image: imageUrl,
      }));
    } catch (error) {
      console.error("Category image upload error:", error);
      setError("حدث خطأ أثناء رفع صورة التصنيف.");
    } finally {
      setUploadingImage(false);

      // السماح باختيار نفس الصورة مرة أخرى
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("اسم التصنيف مطلوب.");
      return;
    }

    const nameExists = categories.some(
      (category) =>
        category.name === form.name.trim() && category.id !== editingId,
    );

    if (nameExists) {
      setError("يوجد تصنيف بنفس الاسم.");
      return;
    }

    if (uploadingImage) {
      setError("انتظر حتى يكتمل رفع الصورة.");
      return;
    }

    try {
      if (editingId) {
        await updateCategory(editingId, {
          name: form.name.trim(),
          image: form.image,
        });
      } else {
        await addCategory({
          name: form.name.trim(),
          image: form.image,
        });
      }

      closeForm();
    } catch (error) {
      console.error("Category save error:", error);
      setError("حدث خطأ أثناء حفظ التصنيف.");
    }
  };

  const handleDelete = async (category) => {
    const count = productCount(category.name);

    const message =
      count > 0
        ? `يوجد ${count} منتج مرتبط بهذا التصنيف. هل تريد حذفه فعلاً؟`
        : "هل أنت متأكد من حذف هذا التصنيف؟";

    if (!window.confirm(message)) return;

    try {
      await deleteCategory(category.id);
    } catch (error) {
      console.error("Category delete error:", error);
      alert("حدث خطأ أثناء حذف التصنيف.");
    }
  };

  return (
    <AdminLayout>
      <div className="mt-8 rounded-2xl bg-white shadow">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b p-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold">إدارة التصنيفات</h2>

          <button
            type="button"
            onClick={openAddForm}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
          >
            <FaPlus />
            إضافة تصنيف
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="border-b bg-gray-50 p-6">
            {error && (
              <div className="mb-4 rounded-xl bg-red-100 p-3 text-red-700">
                {error}
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {/* Category name */}
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  اسم التصنيف *
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      name: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border bg-white p-3 outline-none transition focus:border-green-600"
                  placeholder="مثال: المكملات الغذائية"
                />
              </div>

              {/* Category image */}
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  صورة التصنيف
                </label>

                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingImage}
                  onChange={handleImageUpload}
                  className="w-full cursor-pointer rounded-xl border bg-white p-3 text-sm outline-none transition focus:border-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <p className="mt-2 text-xs text-gray-500">
                  PNG أو JPG أو WEBP — الحد الأقصى 5 ميجابايت
                </p>

                {/* Upload status */}
                {uploadingImage && (
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-yellow-50 p-3 text-sm text-yellow-700">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-600 border-t-transparent" />
                    جاري رفع الصورة إلى Cloudinary...
                  </div>
                )}

                {/* Image preview */}
                {form.image && !uploadingImage && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-semibold text-gray-700">
                      معاينة الصورة
                    </p>

                    <div className="relative h-28 w-28 overflow-hidden rounded-2xl border bg-white shadow-sm">
                      <img
                        src={form.image}
                        alt="معاينة التصنيف"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={uploadingImage}
                className="rounded-xl bg-green-600 px-6 py-3 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {editingId ? "حفظ التعديلات" : "إضافة"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                className="flex items-center gap-2 rounded-xl bg-gray-200 px-6 py-3 text-gray-700 transition hover:bg-gray-300"
              >
                <FaTimes />
                إلغاء
              </button>
            </div>
          </form>
        )}

        {/* Categories table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-right">الصورة</th>

                <th className="p-4 text-right">اسم التصنيف</th>

                <th className="p-4 text-center">عدد المنتجات</th>

                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-t transition hover:bg-gray-50"
                  >
                    {/* Image */}
                    <td className="p-4">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          loading="lazy"
                          className="h-16 w-16 rounded-xl object-cover shadow-sm"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">
                          بدون صورة
                        </div>
                      )}
                    </td>

                    {/* Name */}
                    <td className="font-semibold">{category.name}</td>

                    {/* Product count */}
                    <td className="text-center">
                      <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                        {productCount(category.name)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => openEditForm(category)}
                          className="rounded-lg bg-blue-500 p-3 text-white transition hover:bg-blue-600"
                          title="تعديل"
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(category)}
                          className="rounded-lg bg-red-500 p-3 text-white transition hover:bg-red-600"
                          title="حذف"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-500">
                    لا توجد تصنيفات بعد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Categories;
