import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaCheck,
  FaMinus,
  FaPlus,
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { trackEvent } from "../../lib/metaPixel";

function ProductActions({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const stock = Number(product?.stock || 0);
  const price = Number(product?.price || 0);

  const outOfStock = stock <= 0;
  const inWishlist = isInWishlist(product.id);

  const decrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increase = () => {
    if (!outOfStock) {
      setQuantity((current) => Math.min(stock, current + 1));
    }
  };

  const trackAddToCart = () => {
    trackEvent("AddToCart", {
      content_name: product.name,
      content_ids: [product.id],
      content_type: "product",
      value: price * quantity,
      currency: "SAR",
    });
  };

  const handleAddToCart = () => {
    if (outOfStock) return;

    addToCart(product, quantity);
    trackAddToCart();

    window.dispatchEvent(
      new CustomEvent("cart-animation", {
        detail: { quantity },
      }),
    );

    setAdded(true);

    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (outOfStock) return;

    addToCart(product, quantity);
    trackAddToCart();

    navigate("/checkout");
  };

  return (
    <div dir="rtl" className="mt-8">
      <div className="rounded-[28px] border border-[#eadfca] bg-white p-5 shadow-[0_10px_35px_rgba(74,46,27,0.06)] sm:p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#b08d57]">
              SHAHDAN STORE
            </p>

            <h3 className="mt-1 font-black text-[#4a2e1b]">اختر الكمية</h3>
          </div>

          {stock > 0 && stock <= 5 && (
            <span className="rounded-full bg-[#fff8e8] px-3 py-1.5 text-xs font-bold text-[#8a642f]">
              كمية محدودة
            </span>
          )}
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between rounded-2xl bg-[#f9f6ee] p-3">
          <span className="text-sm font-bold text-[#4a2e1b]">الكمية</span>

          <div className="flex h-11 items-center rounded-xl border border-[#e3d7c4] bg-white">
            <button
              type="button"
              onClick={decrease}
              disabled={outOfStock || quantity <= 1}
              className="flex h-11 w-10 items-center justify-center text-[#8a642f] transition hover:bg-[#f9f6ee] disabled:opacity-30"
              aria-label="تقليل الكمية"
            >
              <FaMinus className="text-xs" />
            </button>

            <span className="flex h-11 min-w-[42px] items-center justify-center border-x border-[#e8dfd0] font-black text-[#4a2e1b]">
              {quantity}
            </span>

            <button
              type="button"
              onClick={increase}
              disabled={outOfStock || quantity >= stock}
              className="flex h-11 w-10 items-center justify-center text-[#8a642f] transition hover:bg-[#f9f6ee] disabled:opacity-30"
              aria-label="زيادة الكمية"
            >
              <FaPlus className="text-xs" />
            </button>
          </div>
        </div>

        {/* Buy Now */}
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={outOfStock}
          className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#4a2e1b] font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#5b3922] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d49b35]">
            🚀
          </span>
          اشترِ الآن
        </button>

        {/* Cart + Wishlist */}
        <div className="mt-3 flex gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={`flex h-13 flex-1 items-center justify-center gap-2 rounded-2xl border font-bold transition disabled:opacity-50 ${
              added
                ? "border-[#7a8b43] bg-[#7a8b43] text-white"
                : "border-[#d8c7aa] bg-[#fffdfa] text-[#8a642f] hover:bg-[#f9f6ee]"
            }`}
          >
            {added ? <FaCheck /> : <FaShoppingCart />}
            {added ? "تمت الإضافة" : "أضف للسلة"}
          </button>

          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className={`flex h-13 w-13 items-center justify-center rounded-2xl border transition ${
              inWishlist
                ? "border-[#8e6b8e] bg-[#8e6b8e] text-white"
                : "border-[#e5dccd] bg-white text-[#8a8175] hover:border-[#d49b35] hover:text-[#d49b35]"
            }`}
            aria-label={inWishlist ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <FaHeart />
          </button>
        </div>

        {/* Benefits */}
        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[#eee5d5] pt-5">
          <div className="text-center">
            <FaTruck className="mx-auto mb-2 text-[#d49b35]" />
            <p className="text-[11px] font-bold text-[#4a2e1b]">شحن سريع</p>
          </div>

          <div className="border-x border-[#eee5d5] text-center">
            <FaMoneyBillWave className="mx-auto mb-2 text-[#d49b35]" />
            <p className="text-[11px] font-bold text-[#4a2e1b]">
              الدفع عند الاستلام
            </p>
          </div>

          <div className="text-center">
            <FaShieldAlt className="mx-auto mb-2 text-[#d49b35]" />
            <p className="text-[11px] font-bold text-[#4a2e1b]">شراء آمن</p>
          </div>
        </div>

        {/* Stock */}
        {stock > 0 && stock <= 5 && (
          <div className="mt-5 rounded-xl bg-[#fff8e8] px-4 py-3 text-center text-xs font-bold text-[#8a642f]">
            🔥 متبقي فقط {stock} {stock === 1 ? "قطعة" : "قطع"}
          </div>
        )}

        {outOfStock && (
          <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-bold text-red-600">
            المنتج غير متوفر حالياً
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductActions;
