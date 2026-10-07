import Categories from "../components/common/Categories";
import PageSEO from "../components/common/PageSEO";
import { useEffect } from "react";
import { trackTikTok } from "../lib/tiktokPixel";
function CategoriesPage() {
  useEffect(() => {
    trackTikTok("ViewContent", {
      content_type: "category",
      content_name: "تصنيفات منتجات شهدان ستور",
    });
  }, []);
  return (
    <>
      <PageSEO
        title="تصنيفات المنتجات"
        description="تصفح تصنيفات منتجات شهدان ستور واكتشف مجموعتنا المختارة من المكملات الغذائية والمنتجات الطبيعية ومعززات الطاقة."
        keywords="تصنيفات شهدان ستور, مكملات غذائية, منتجات طبيعية, عسل, معززات الطاقة"
        canonical="/categories"
      />

      <div className="min-h-screen py-10">
        <Categories />
      </div>
    </>
  );
}

export default CategoriesPage;
