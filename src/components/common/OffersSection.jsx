import { Link } from "react-router-dom";
import { useStore } from "../../hooks/useStore";

function OffersSection() {
  const { products } = useStore();

  const offers = products
    .filter((product) => Number(product.oldPrice) > Number(product.price))
    .slice(0, 4);

  if (offers.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-800">
          🔥 عروض شهدان الخاصة
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {offers.map((product) => {
            const oldPrice = Number(product.oldPrice);
            const price = Number(product.price);

            const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

            return (
              <Link
                key={product.id}
                to={`/product/${product.seoSlug || product.slug}`}
                className="overflow-hidden rounded-3xl bg-green-50 shadow-md transition hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* صورة المنتج */}
                <div className="relative">
                  <img
                    src={
                      product.images?.[0] || "https://via.placeholder.com/500"
                    }
                    alt={product.name || "منتج شهدان"}
                    className="h-64 w-full object-cover"
                    loading="lazy"
                  />

                  <span className="absolute right-4 top-4 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
                    خصم {discount}%
                  </span>
                </div>

                {/* معلومات المنتج */}
                <div className="p-5">
                  <h3 className="line-clamp-2 text-lg font-bold text-gray-800">
                    {product.name}
                  </h3>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-2xl font-bold text-green-600">
                      {price} ر.س
                    </span>

                    <span className="text-gray-400 line-through">
                      {oldPrice} ر.س
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OffersSection;
