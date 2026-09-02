const ORDERS_STORAGE_KEY = "shahdan_orders";
const ORDER_COUNTER_KEY = "shahdan_order_counter";

export function getOrders() {
  try {
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);

    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch (error) {
    console.error("Orders loading error:", error);
    return [];
  }
}

export function getNextOrderNumber() {
  try {
    const currentNumber = Number(
      localStorage.getItem(ORDER_COUNTER_KEY) || 1000,
    );

    const nextNumber = currentNumber + 1;

    localStorage.setItem(ORDER_COUNTER_KEY, String(nextNumber));

    return `SHD-${nextNumber}`;
  } catch (error) {
    console.error("Order number error:", error);

    return `SHD-${Date.now()}`;
  }
}

export function saveOrder(order) {
  try {
    const orders = getOrders();

    const updatedOrders = [order, ...orders];

    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));

    return order;
  } catch (error) {
    console.error("Order saving error:", error);

    return null;
  }
}

export function getOrderByNumber(orderNumber) {
  const orders = getOrders();

  return orders.find((order) => order.orderNumber === orderNumber) || null;
}
