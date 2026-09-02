import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

import AdminLayout from "../components/layout/AdminLayout";

import { useStore } from "../hooks/useStore";
import { downloadProductTemplate } from "../utils/excelTemplate";
import { readProductsExcel } from "../utils/importProducts";

function Products() {
  const navigate = useNavigate();

  const { products, categories, addProduct, deleteProduct } = useStore();

  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  const filteredProducts = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return products.filter((product) => {
      const categoriesText = Array.isArray(product.categories)
        ? product.categories.join(" ")
        : product.category || "";

      const productName = product.name?.toLowerCase() || "";

      return (
        productName.includes(searchValue) ||
        categoriesText.toLowerCase().includes(searchValue)
      );
    });
  }, [products, search]);

  const handleExcelUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const importedProducts = await readProductsExcel(file);

      for (const product of importedProducts) {
        await addProduct(product);
      }

      alert(`تم رفع ${importedProducts.length} منتجات بنجاح`);
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء قراءة أو رفع الملف");
    } finally {
      setUploading(false);

      // السماح برفع نفس الملف مرة أخرى
      e.target.value = "";
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا المنتج؟");

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء حذف المنتج");
    }
  };

  return (
    <AdminLayout>
      <div className="mt-8 rounded-2xl bg-white shadow">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b p-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold">إدارة المنتجات</h2>

          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
            {/* البحث */}
            <div className="relative">
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-72 rounded-xl border py-3 pr-11 pl-4 outline-none focus:border-green-500"
              />
            </div>

            {/* إضافة منتج */}
            <button
              type="button"
              onClick={() => navigate("/admin/products/add")}
              className="rounded-xl bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
            >
              + إضافة منتج
            </button>

            {/* تحميل قالب Excel */}
            <button
              type="button"
              onClick={() => downloadProductTemplate(categories)}
              className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            >
              📥 تحميل قالب Excel
            </button>

            {/* رفع Excel */}
            <label
              className={`cursor-pointer rounded-xl px-6 py-3 text-white transition ${
                uploading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {uploading ? "⏳ جاري الرفع..." : "📤 رفع Excel"}

              <input
                type="file"
                accept=".xlsx,.xls"
                hidden
                disabled={uploading}
                onChange={handleExcelUpload}
              />
            </label>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-right">الصورة</th>

                <th className="p-4 text-right">اسم المنتج</th>

                <th className="p-4 text-right">التصنيف</th>

                <th className="p-4 text-right">السعر</th>

                <th className="p-4 text-center">المخزون</th>

                <th className="p-4 text-center">الحالة</th>

                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const productCategories =
                    Array.isArray(product.categories) &&
                    product.categories.length
                      ? product.categories
                      : product.category
                        ? [product.category]
                        : [];

                  return (
                    <tr
                      key={product.id}
                      className="border-t transition hover:bg-gray-50"
                    >
                      {/* الصورة */}
                      <td className="p-4">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name || "صورة المنتج"}
                            className="h-20 w-20 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">
                            بدون صورة
                          </div>
                        )}
                      </td>

                      {/* الاسم */}
                      <td className="p-4 font-semibold">{product.name}</td>

                      {/* التصنيف */}
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          {productCategories.length > 0 ? (
                            productCategories.map((category, index) => (
                              <span
                                key={`${product.id}-${index}`}
                                className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700"
                              >
                                {category}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-400">
                              بدون تصنيف
                            </span>
                          )}
                        </div>
                      </td>

                      {/* السعر */}
                      <td className="p-4 font-semibold text-green-700">
                        {product.price} ر.س
                      </td>

                      {/* المخزون */}
                      <td className="p-4 text-center">
                        <span
                          className={`rounded-full px-4 py-1 text-sm font-medium ${
                            product.stock > 5
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.stock ?? 0}
                        </span>
                      </td>

                      {/* الحالة */}
                      <td className="p-4 text-center">
                        {product.stock > 5 ? (
                          <span className="rounded-full bg-green-100 px-4 py-1 text-sm text-green-700">
                            متوفر
                          </span>
                        ) : product.stock > 0 ? (
                          <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm text-yellow-700">
                            مخزون منخفض
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-100 px-4 py-1 text-sm text-red-700">
                            غير متوفر
                          </span>
                        )}
                      </td>

                      {/* الإجراءات */}
                      <td className="p-4">
                        <div className="flex justify-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/admin/products/edit/${product.id}`)
                            }
                            className="rounded-lg bg-blue-500 p-3 text-white transition hover:bg-blue-600"
                            title="تعديل المنتج"
                          >
                            <FaEdit />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(product.id)}
                            className="rounded-lg bg-red-500 p-3 text-white transition hover:bg-red-600"
                            title="حذف المنتج"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-gray-500">
                    {search
                      ? "لا توجد منتجات مطابقة للبحث."
                      : "لا توجد منتجات حاليًا."}
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

export default Products;
