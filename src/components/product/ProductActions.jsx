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
  FaHeadset,
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
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  };

  const increase = () => {
    if (outOfStock) return;

    setQuantity((currentQuantity) => Math.min(stock, currentQuantity + 1));
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
        detail: {
          quantity,
        },
      }),
    );

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    if (outOfStock) return;

    addToCart(product, quantity);
    trackAddToCart();

    navigate("/checkout");
  };

  return (
    <div className="mt-10">
      {/* Purchase Panel */}
      <div className="overflow-hidden rounded-[30px] border border-[#e8dfd0] bg-white shadow-[0_16px_50px_rgba(48,41,31,0.08)]">
        {/* Header */}
        <div className="border-b border-[#eee5d5] px-5 py-5 sm:px-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.25em] text-[#b88a44]">
                SHAHDAN STORE
              </p>

              <h3 className="mt-1 text-lg font-extrabold text-[#30291f]">
                أضف المنتج إلى طلبك
              </h3>
            </div>

            {stock > 0 && stock <= 5 && (
              <span className="rounded-full bg-[#fff8e9] px-3 py-1.5 text-[11px] font-bold text-[#9d7337]">
                كمية محدودة
              </span>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-7">
          {/* Quantity */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[#30291f]">الكمية</p>

              <p className="mt-1 text-xs text-[#8a8175]">
                اختر الكمية المطلوبة
              </p>
            </div>

            <div className="flex h-12 items-center rounded-xl border border-[#ded3c2] bg-[#fcfaf6]">
              <button
                type="button"
                onClick={decrease}
                disabled={outOfStock || quantity <= 1}
                className="
                  flex h-12 w-11 items-center justify-center
                  text-[#5f574c]
                  transition
                  hover:bg-[#f5ead5]
                  hover:text-[#8a642f]
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
                aria-label="تقليل الكمية"
              >
                <FaMinus className="text-xs" />
              </button>

              <span className="flex h-12 min-w-[48px] items-center justify-center border-x border-[#e8dfd0] text-base font-extrabold text-[#30291f]">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increase}
                disabled={outOfStock || quantity >= stock}
                className="
                  flex h-12 w-11 items-center justify-center
                  text-[#5f574c]
                  transition
                  hover:bg-[#f5ead5]
                  hover:text-[#8a642f]
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
                aria-label="زيادة الكمية"
              >
                <FaPlus className="text-xs" />
              </button>
            </div>
          </div>

          {/* Main Button */}
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={outOfStock}
            className="
              group
              relative
              mt-6
              flex
              h-[62px]
              w-full
              items-center
              justify-center
              gap-3
              overflow-hidden
              rounded-2xl
              bg-[#30291f]
              text-base
              font-extrabold
              text-white
              shadow-[0_10px_25px_rgba(48,41,31,0.18)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#3d3428]
              hover:shadow-[0_15px_30px_rgba(48,41,31,0.22)]
              active:scale-[0.985]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <span
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-20
                w-12
                rotate-[20deg]
                bg-white/10
                blur-sm
                transition-all
                duration-700
                group-hover:left-[110%]
              "
            />

            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#b88a44] text-lg">
              🚀
            </span>

            <span className="relative">اشترِ الآن</span>
          </button>

          {/* Secondary Actions */}
          <div className="mt-3 flex gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={outOfStock}
              className={`
                group
                flex
                h-14
                flex-1
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                text-sm
                font-bold
                transition-all
                duration-300
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50

                ${
                  added
                    ? "border-[#8a642f] bg-[#8a642f] text-white shadow-md"
                    : "border-[#d8c7aa] bg-[#fffdf9] text-[#8a642f] hover:border-[#b88a44] hover:bg-[#fdf8ee]"
                }
              `}
            >
              {added ? (
                <>
                  <FaCheck className="text-base" />
                  تمت الإضافة
                </>
              ) : (
                <>
                  <FaShoppingCart className="text-base transition-transform group-hover:-translate-x-1" />
                  أضف للسلة
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                transition-all
                duration-300
                active:scale-95

                ${
                  inWishlist
                    ? "border-[#b88a44] bg-[#b88a44] text-white shadow-md"
                    : "border-[#e5dccd] bg-white text-[#8a8175] hover:border-[#b88a44] hover:bg-[#fdf8ee] hover:text-[#b88a44]"
                }
              `}
              aria-label={inWishlist ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            >
              <FaHeart
                className={`transition-transform ${
                  inWishlist ? "scale-110" : ""
                }`}
              />
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-7 grid grid-cols-2 border-y border-[#eee5d5] py-5">
            <div className="flex items-center gap-3 border-l border-[#eee5d5] pl-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8f3e8] text-[#b88a44]">
                <FaTruck className="text-sm" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#30291f]">شحن سريع</p>
                <p className="mt-1 text-[10px] text-[#8a8175]">داخل المملكة</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pr-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8f3e8] text-[#b88a44]">
                <FaMoneyBillWave className="text-sm" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#30291f]">
                  الدفع عند الاستلام
                </p>
                <p className="mt-1 text-[10px] text-[#8a8175]">
                  عند وصول الطلب
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 border-l border-[#eee5d5] pl-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8f3e8] text-[#b88a44]">
                <FaShieldAlt className="text-sm" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#30291f]">شراء آمن</p>
                <p className="mt-1 text-[10px] text-[#8a8175]">
                  حماية معلوماتك
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 pr-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8f3e8] text-[#b88a44]">
                <FaHeadset className="text-sm" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#30291f]">خدمة العملاء</p>
                <p className="mt-1 text-[10px] text-[#8a8175]">
                  دعم عند الحاجة
                </p>
              </div>
            </div>
          </div>

          {/* Order Journey */}
          <div className="mt-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[#30291f]">
                رحلة طلبك
              </h3>

              <span className="text-[10px] font-bold text-[#b88a44]">
                4 خطوات بسيطة
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1">
              <div className="text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#30291f] text-xs font-bold text-white">
                  01
                </div>

                <p className="mt-2 text-[10px] font-bold text-[#5f574c]">
                  الطلب
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#30291f] text-xs font-bold text-white">
                  02
                </div>

                <p className="mt-2 text-[10px] font-bold text-[#5f574c]">
                  التجهيز
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#30291f] text-xs font-bold text-white">
                  03
                </div>

                <p className="mt-2 text-[10px] font-bold text-[#5f574c]">
                  الشحن
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#b88a44] text-xs font-bold text-white">
                  04
                </div>

                <p className="mt-2 text-[10px] font-bold text-[#5f574c]">
                  الاستلام
                </p>
              </div>
            </div>
          </div>

          {/* Stock */}
          {stock > 0 && stock <= 5 && (
            <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-[#ead7b5] bg-[#fffaf0] px-4 py-3 text-xs font-bold text-[#8a642f]">
              <span className="text-base">🔥</span>
              <span>
                متبقي فقط {stock} {stock === 1 ? "قطعة" : "قطع"}
              </span>
            </div>
          )}

          {outOfStock && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-bold text-red-600">
              المنتج غير متوفر حالياً
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductActions;
