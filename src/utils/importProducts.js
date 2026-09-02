import * as XLSX from "xlsx";

// قراءة ملف Excel وتحويله إلى منتجات
export function readProductsExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);

        const workbook = XLSX.read(data, {
          type: "array",
        });

        const sheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet);

        const products = rows.map((row) => ({
          name: row.name?.toString().trim() || "",

          price: Number(row.price) || 0,

          oldPrice:
            row.oldPrice !== undefined && row.oldPrice !== ""
              ? Number(row.oldPrice)
              : null,

          stock: Number(row.stock) || 0,

          // مثال:
          // مكملات غذائية, تعزيز الحيوية
          categories: row.categories
            ? row.categories
                .toString()
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : [],

          description: row.description?.toString().trim() || "",

          usage: row.usage?.toString().trim() || "",

          ingredients: row.ingredients
            ? row.ingredients
                .toString()
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : [],

          seoTitle: row.seoTitle?.toString().trim() || "",

          seoDescription: row.seoDescription?.toString().trim() || "",

          seoSlug: row.seoSlug?.toString().trim() || "",

          images: row.images
            ? row.images
                .toString()
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : [],
        }));

        resolve(products);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
}

// فحص المنتجات قبل رفعها إلى Firebase
export function validateProducts(products) {
  const errors = [];

  const validProducts = products.filter((product, index) => {
    let valid = true;

    // اسم المنتج
    if (!product.name) {
      errors.push(`الصف ${index + 2}: اسم المنتج مفقود`);

      valid = false;
    }

    // السعر
    if (product.price <= 0 || Number.isNaN(product.price)) {
      errors.push(`الصف ${index + 2}: السعر غير صحيح`);

      valid = false;
    }

    // التصنيف
    if (!product.categories.length) {
      errors.push(`الصف ${index + 2}: التصنيف مفقود`);

      valid = false;
    }

    // الصور
    if (product.images.length) {
      product.images.forEach((image) => {
        if (!image.startsWith("http")) {
          errors.push(`الصف ${index + 2}: رابط الصورة غير صحيح`);

          valid = false;
        }
      });
    }

    return valid;
  });

  return {
    validProducts,
    errors,
  };
}
