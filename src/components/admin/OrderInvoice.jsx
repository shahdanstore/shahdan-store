import QRCode from "qrcode";

export default function OrderInvoice({ order }) {
  const printInvoice = async () => {
    const qrText = `
متجر شهدان ستور
رقم الطلب: ${order.orderNumber}
العميل: ${order.customer?.name}
الجوال: ${order.customer?.phone}
إجمالي المنتجات:
${(order.subtotal ?? order.total).toFixed(2)} ريال

الشحن:
${(order.shipping ?? 0) > 0 ? `${order.shipping.toFixed(2)} ريال` : "مجاني"}

الإجمالي:
${order.total.toFixed(2)} ريال
`;

    const qrImage = await QRCode.toDataURL(qrText);

    const width = 900;
    const height = 750;

    const left = window.screen.width / 2 - width / 2;

    const top = window.screen.height / 2 - height / 2;

    const invoiceWindow = window.open(
      "",
      "_blank",
      `
      width=${width},
      height=${height},
      top=${top},
      left=${left},
      resizable=yes,
      scrollbars=yes
      `,
    );

    if (!invoiceWindow) {
      alert("تعذر فتح نافذة الفاتورة. يرجى السماح بالنوافذ المنبثقة.");
      return;
    }

    invoiceWindow.document.write(`

    <html dir="rtl">

    <head>

    <title>
      فاتورة ${order.orderNumber}
    </title>

    <style>

    body {
      font-family: Arial, sans-serif;
      color: #222;
      direction: rtl;
      width: 80mm;
      padding: 8px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      color: #15803d;
      font-size: 22px;
      margin-bottom: 15px;
    }

    .card {
      border: 1px dashed #999;
      border-radius: 8px;
      padding: 8px;
      margin-bottom: 10px;
    }

    .card h3 {
      font-size: 16px;
      margin: 5px 0 10px;
    }

    p {
      margin: 5px 0;
      font-size: 13px;
    }

    .product {
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px dashed #ccc;
      padding: 8px 0;
    }

    .product img {
      width: 45px;
      height: 45px;
      object-fit: cover;
      border-radius: 5px;
    }

    .total {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: #15803d;
      margin-top: 15px;
    }

    .qr {
      text-align: center;
      margin-top: 15px;
    }

    .qr img {
      width: 100px;
      height: 100px;
    }

    @media print {

      @page {
        size: 100mm 150mm;
        margin: 5mm;
      }

      body {
        width: 80mm;
        padding: 0;
      }

      button {
        display: none;
      }

    }

    </style>

    </head>

    <body>

    <h1>
      شهدان ستور ⚡
    </h1>

    <div class="card">

      <h3>
        بيانات الطلب
      </h3>

      <p>
        رقم الطلب:
        ${order.orderNumber}
      </p>

      <p>
        التاريخ:
        ${
          order.createdAt?.toDate
            ? order.createdAt.toDate().toLocaleString("ar-SA")
            : order.date
              ? new Date(order.date).toLocaleString("ar-SA")
              : "-"
        }
      </p>

      <p>
        طريقة الدفع:
        الدفع عند الاستلام
      </p>

    </div>

    <div class="card">

      <h3>
        بيانات العميل
      </h3>

      <p>
        الاسم:
        ${order.customer?.name || "-"}
      </p>

      <p>
        الجوال:
        ${order.customer?.phone || "-"}
      </p>

      <p>
        المدينة:
        ${order.customer?.city || "-"}
      </p>

      <p>
        العنوان:
        ${order.customer?.address || "-"}
      </p>

    </div>

    <div class="card">

      <h3>
        المنتجات
      </h3>

      ${
        order.items
          ?.map(
            (item) => `

        <div class="product">

          ${
            item.image
              ? `<img src="${item.image}" alt="${item.name || "المنتج"}" />`
              : ""
          }

          <div>

            <strong>
              ${item.name || "منتج"}
            </strong>

            <p>
              الكمية:
              ${item.quantity ?? 0}
            </p>

            <p>
              السعر:
              ${Number(item.price ?? 0).toFixed(2)}
              ريال
            </p>

          </div>

        </div>

        `,
          )
          .join("") || "<p>لا توجد منتجات</p>"
      }

    </div>

    <div class="card">

      <h3>
        ملخص المبلغ
      </h3>

      <p style="
        display:flex;
        justify-content:space-between;
      ">

        <span>
          إجمالي المنتجات
        </span>

        <span>
          ${(order.subtotal ?? order.total).toFixed(2)}
          ريال
        </span>

      </p>

      <p style="
        display:flex;
        justify-content:space-between;
      ">

        <span>
          الشحن
        </span>

        <span>
          ${
            (order.shipping ?? 0) > 0
              ? `${Number(order.shipping).toFixed(2)} ريال`
              : "مجاني 🎉"
          }
        </span>

      </p>

      <hr style="
        border:none;
        border-top:1px dashed #ccc;
        margin:10px 0;
      ">

      <div class="total">

        الإجمالي النهائي

        <br><br>

        ${Number(order.total ?? 0).toFixed(2)}
        ريال

      </div>

    </div>

    <div class="qr">

      <img
        src="${qrImage}"
        alt="QR"
      />

      <p>
        امسح لعرض معلومات الطلب
      </p>

    </div>

    <script>

      window.onload = function () {

        setTimeout(() => {
          window.print();
        }, 500);

      };

    </script>

    </body>

    </html>

    `);

    invoiceWindow.document.close();
  };

  return (
    <button
      type="button"
      onClick={printInvoice}
      className="
        rounded-lg
        bg-green-600
        px-4
        py-2
        text-white
        hover:bg-green-700
      "
    >
      🧾 طباعة فاتورة
    </button>
  );
}
