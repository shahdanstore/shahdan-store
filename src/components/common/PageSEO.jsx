import { Helmet } from "react-helmet-async";

const SITE_URL = "https://shahdanstore.com";
const STORE_NAME = "شهدان ستور";

export default function PageSEO({
  title,
  description,
  keywords = "",
  canonical = "/",
  image = `${SITE_URL}/logo.png`,
  type = "website",
  noIndex = false,
}) {
  const fullTitle =
    title === "الرئيسية"
      ? `${STORE_NAME} | منتجات طبيعية ومكملات غذائية`
      : `${title} | ${STORE_NAME}`;

  const url = `${SITE_URL}${canonical}`;

  return (
    <Helmet>
      <html lang="ar" dir="rtl" />

      <title>{fullTitle}</title>

      <meta name="description" content={description} />

      {keywords && <meta name="keywords" content={keywords} />}

      <meta name="author" content={STORE_NAME} />

      <meta
        name="robots"
        content={
          noIndex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large"
        }
      />

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={STORE_NAME} />
      <meta property="og:locale" content="ar_SA" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
