import { useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";
import { useOrders } from "../hooks/useOrders";
import { ORDER_STATUSES } from "../context/order-statuses";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

function Orders() {
  const { orders, updateOrderStatus } = useOrders();

  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchStatus = !statusFilter || order.status === statusFilter;

      const text = `
        ${order.orderNumber || ""}
        ${order.customer?.name || ""}
        ${order.customer?.phone || ""}
      `.toLowerCase();

      const matchSearch = text.includes(search.toLowerCase());

      return matchStatus && matchSearch;
    });
  }, [orders, statusFilter, search]);

  const totalSales = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "processing",
  ).length;

  return (
    <AdminLayout>
      <h1 className="mt-8 text-3xl font-bold text-gray-800">إدارة الطلبات</h1>

      {/* الإحصائيات */}

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-yellow-50 p-5">
          <p className="text-gray-600">طلبات جديدة</p>

          <h3 className="text-3xl font-bold">{pendingOrders}</h3>
        </div>

        <div className="rounded-xl bg-blue-50 p-5">
          <p className="text-gray-600">قيد التنفيذ</p>

          <h3 className="text-3xl font-bold">{processingOrders}</h3>
        </div>

        <div className="rounded-xl bg-green-50 p-5">
          <p className="text-gray-600">المبيعات</p>

          <h3 className="text-2xl font-bold">{totalSales.toFixed(2)} ر.س</h3>
        </div>

        <div className="rounded-xl bg-gray-200 p-5">
          <p className="text-gray-600">جميع الطلبات</p>

          <h3 className="text-3xl font-bold">{orders.length}</h3>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow">
        {/* Header */}

        <div className="flex flex-col gap-4 border-b p-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-2xl font-bold">الطلبات</h2>

          <input
            type="text"
            placeholder="بحث برقم الطلب أو اسم العميل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border p-3 outline-none focus:border-green-600"
          />
        </div>

        {/* Filters */}

        <div className="flex flex-wrap gap-2 p-6">
          <button
            type="button"
            onClick={() => setStatusFilter("")}
            className={`rounded-full px-4 py-2 text-sm ${
              !statusFilter ? "bg-green-600 text-white" : "bg-gray-100"
            }`}
          >
            الكل ({orders.length})
          </button>

          {Object.entries(ORDER_STATUSES).map(([key, label]) => (
            <button
              type="button"
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`rounded-full px-4 py-2 text-sm ${
                statusFilter === key ? "bg-green-600 text-white" : "bg-gray-100"
              }`}
            >
              {label} ({orders.filter((order) => order.status === key).length})
            </button>
          ))}
        </div>

        {/* Orders Table */}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-right">رقم الطلب</th>

                <th className="p-4 text-right">العميل</th>

                <th className="p-4 text-center">المنتجات</th>

                <th className="p-4 text-right">التاريخ</th>

                <th className="p-4 text-center">الإجمالي</th>

                <th className="p-4 text-center">الحالة</th>

                <th className="p-4 text-center">عرض</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t transition hover:bg-gray-50"
                  >
                    <td className="p-4 font-bold">{order.orderNumber}</td>

                    <td className="p-4">
                      <p className="font-semibold">
                        {order.customer?.name || "-"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {order.customer?.phone || "-"}
                      </p>
                    </td>

                    <td className="text-center">{order.items?.length || 0}</td>

                    <td className="p-4 text-sm text-gray-500">
                      {order.createdAt?.toDate
                        ? order.createdAt.toDate().toLocaleDateString("ar-SA")
                        : "-"}
                    </td>

                    <td className="text-center font-bold">
                      {Number(order.total || 0).toFixed(2)} ر.س
                    </td>

                    <td className="text-center">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                        className={`rounded-full border-0 px-3 py-1 ${
                          STATUS_COLORS[order.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {Object.entries(ORDER_STATUSES).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="text-center">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                        className="rounded-lg bg-blue-600 p-3 text-white transition hover:bg-blue-700"
                        title="عرض الطلب"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-10 text-center text-gray-500">
                    لا توجد طلبات
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

export default Orders;
