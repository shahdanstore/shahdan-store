import { Helmet } from "react-helmet-async";

export default function SEO({ product }) {
  if (!product) return null;

  // ضع دومين شهدان النهائي هنا عند اعتماده
  const SITE_URL = "https://shahdan-store.com";

  const title = product.seoTitle || `${product.name} | شهدان ستور`;

  const plainDescription = product.description
    ?.replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const description =
    product.seoDescription ||
    plainDescription?.slice(0, 300) ||
    `اشترِ ${product.name} من شهدان ستور.`;

  const slug = product.seoSlug || product.slug;

  const url = `${SITE_URL}/product/${slug}`;

  const image = product.images?.[0] || `${SITE_URL}/logo.png`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "شهدان ستور",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
        },
      },

      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "المنتجات",
            item: `${SITE_URL}/products`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.category || "منتجات",
            item: `${SITE_URL}/products?category=${encodeURIComponent(
              product.category || "",
            )}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: product.name,
            item: url,
          },
        ],
      },

      {
        "@type": "Product",
        "@id": url,

        name: product.name,

        image: product.images?.length > 0 ? product.images : [image],

        description,

        sku: product.id,

        ...(product.category ? { category: product.category } : {}),

        brand: {
          "@type": "Brand",
          name: "شهدان",
        },

        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "SAR",
          price: Number(product.price || 0).toFixed(2),
          priceValidUntil: "2027-12-31",

          availability:
            Number(product.stock || 0) > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",

          itemCondition: "https://schema.org/NewCondition",

          seller: {
            "@type": "Organization",
            name: "شهدان ستور",
          },
        },
      },
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content="شهدان ستور" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </Helmet>
  );
}
