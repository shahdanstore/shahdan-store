
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaPlusSquare,
  FaShoppingCart,
  FaTags,
  FaCog,
  FaSignOutAlt,
  FaStar,
  
} from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";

function Sidebar({ newOrdersCount = 0, isOpen = false, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    navigate("/admin/login", {
      replace: true,
    });
  };

  const menu = [
    {
      name: "لوحة التحكم",
      icon: <FaTachometerAlt />,
      path: "/admin/dashboard",
    },
    {
      name: "المنتجات",
      icon: <FaBoxOpen />,
      path: "/admin/products",
    },
    {
      name: "إضافة منتج",
      icon: <FaPlusSquare />,
      path: "/admin/products/add",
    },
    {
      name: "الطلبات",
      icon: <FaShoppingCart />,
      path: "/admin/orders",
      badge: newOrdersCount,
    },
    {
      name: "التصنيفات",
      icon: <FaTags />,
      path: "/admin/categories",
    },
    {
      name: "التقييمات",
      icon: <FaStar />,
      path: "/admin/reviews",
    },
    {
      name: "الإعدادات",
      icon: <FaCog />,
      path: "/admin/settings",
    },
  ];

  return (
    <aside
      dir="rtl"
      className={`
        fixed top-0 right-0 z-50
        flex h-screen w-72 flex-col
        overflow-y-auto
        bg-[#30291f] text-white
        shadow-[-10px_0_40px_rgba(48,41,31,0.18)]
        transition-transform duration-300
        lg:translate-x-0
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
     
{/* Brand Header */}
<div className="relative overflow-hidden border-b border-white/10 px-6 py-7 text-center">
  {/* Decorative circles */}
  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#b88a44]/10" />
  <div className="pointer-events-none absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-[#c7a15a]/5" />

  <div className="relative">
    <div className="mx-auto flex h-20 items-center justify-center">
      <img
        src="/logo.png"
        alt="شهدان ستور"
        className="max-h-20 max-w-[190px] object-contain"
      />
    </div>

    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c7a15a]">
      SHAHDAN
    </p>

    <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-[#b88a44] to-transparent" />

    <p className="mt-3 text-xs text-white/50">
      لوحة التحكم
    </p>
  </div>
</div>



      {/* Navigation */}
      <nav className="flex-1 px-4 py-5">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
          الإدارة
        </p>

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `group relative mb-2 flex items-center justify-between overflow-hidden rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-l from-[#b88a44] to-[#8a642f] text-white shadow-lg shadow-black/10"
                  : "text-white/65 hover:bg-white/[0.07] hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute right-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-l-full bg-[#f8e6b8]" />
                )}

                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-base transition-all duration-300 ${
                      isActive
                        ? "bg-white/15 text-[#f8e6b8]"
                        : "bg-white/[0.05] text-[#c7a15a] group-hover:bg-[#b88a44]/10"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </div>

                {item.badge > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#a94b43] px-2 text-[11px] font-black text-white shadow-sm">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Brand Note */}
      <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b88a44]">
          SHAHDAN STORE
        </p>

        <p className="mt-1 text-[10px] text-white/35">
          إدارة المتجر
        </p>
      </div>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-white/60 transition-all duration-300 hover:bg-[#a94b43]/15 hover:text-[#e7a09a]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] transition-colors group-hover:bg-[#a94b43]/15">
            <FaSignOutAlt />
          </span>

          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

