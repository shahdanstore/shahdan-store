import { FaArrowLeft, FaEnvelope, FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageSEO from "../components/common/PageSEO";

function About() {
  return (
    <>
      <PageSEO
        title="من نحن"
        description="تعرف على شهدان ستور، متجر متخصص في المكملات الغذائية والمنتجات الطبيعية ومنتجات الحيوية والطاقة، ونحرص على تقديم منتجات مختارة بعناية وتجربة تسوق موثوقة."
        keywords="من نحن, شهدان ستور, عن شهدان ستور, متجر مكملات غذائية, منتجات طبيعية, معززات الطاقة"
        canonical="/about"
      />

      <main dir="rtl" className="min-h-screen bg-[#f8f5ed]">
        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden border-b border-[#e5dccb] bg-[#fffdf8]">
          {/* Decorative shapes */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#c69a52]/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#71804a]/10 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-black tracking-[0.28em] text-[#b1843d]">
                SHAH DAN STORE
              </p>

              <h1 className="text-4xl font-black leading-tight text-[#442410] md:text-6xl md:leading-[1.15]">
                نختار لك الأفضل،
                <br />
                <span className="text-[#71804a]">لتختار بثقة.</span>
              </h1>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-14 bg-[#c69a52]" />
                <span className="h-1.5 w-1.5 rotate-45 bg-[#c69a52]" />
                <span className="h-px w-14 bg-[#c69a52]" />
              </div>

              <p className="mt-7 max-w-2xl text-sm leading-8 text-[#766b5c] md:text-base">
                في شهدان ستور نؤمن أن تجربة التسوق تبدأ من اختيار المنتج
                المناسب، لذلك نحرص على تقديم مجموعة مختارة من المنتجات الطبيعية
                والمكملات الغذائية، بطريقة واضحة ومريحة لعملائنا.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            ABOUT CONTENT
        ====================================================== */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <article className="rounded-[28px] border border-[#e3d8c5] bg-[#fffdf8] p-7 shadow-[0_12px_40px_rgba(68,36,16,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(68,36,16,0.10)]">
              <div className="mb-6 h-px w-12 bg-[#c69a52]" />

              <p className="mb-2 text-xs font-bold tracking-widest text-[#b1843d]">
                اختيار بعناية
              </p>

              <h2 className="text-2xl font-black text-[#442410]">
                منتجات نختارها بثقة
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#766b5c]">
                نركز على تقديم منتجات تتناسب مع اهتمامات عملائنا، مع الاهتمام
                بتفاصيل المنتج ومعلوماته لتكون تجربة الشراء أكثر وضوحًا.
              </p>
            </article>

            {/* Card 2 */}
            <article className="rounded-[28px] border border-[#e3d8c5] bg-[#fffdf8] p-7 shadow-[0_12px_40px_rgba(68,36,16,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(68,36,16,0.10)]">
              <div className="mb-6 h-px w-12 bg-[#71804a]" />

              <p className="mb-2 text-xs font-bold tracking-widest text-[#71804a]">
                تجربة أسهل
              </p>

              <h2 className="text-2xl font-black text-[#442410]">
                تسوق بسيط وواضح
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#766b5c]">
                صممنا متجر شهدان ليكون سهل الاستخدام، من استكشاف المنتجات
                والتعرف عليها وحتى إتمام الطلب ومتابعته.
              </p>
            </article>

            {/* Card 3 */}
            <article className="rounded-[28px] border border-[#e3d8c5] bg-[#fffdf8] p-7 shadow-[0_12px_40px_rgba(68,36,16,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(68,36,16,0.10)]">
              <div className="mb-6 h-px w-12 bg-[#c69a52]" />

              <p className="mb-2 text-xs font-bold tracking-widest text-[#b1843d]">
                نهتم بك
              </p>

              <h2 className="text-2xl font-black text-[#442410]">
                خدمة تضعك أولًا
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#766b5c]">
                نحرص على توفير تجربة مريحة ودعم يساعدك في الحصول على المعلومات
                التي تحتاجها قبل الطلب وبعده.
              </p>
            </article>
          </div>
        </section>

        {/* =====================================================
            VALUES
        ====================================================== */}
        <section className="border-y border-[#e3d8c5] bg-[#eee7d8]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
            <div className="grid items-center gap-10 md:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="text-xs font-black tracking-[0.25em] text-[#b1843d]">
                  رؤيتنا
                </p>

                <h2 className="mt-3 text-3xl font-black leading-tight text-[#442410] md:text-4xl">
                  تجربة طبيعية
                  <br />
                  <span className="text-[#71804a]">بلمسة راقية.</span>
                </h2>
              </div>

              <div className="relative rounded-[30px] border border-[#ddd0ba] bg-[#fffdf8] p-7 md:p-9">
                <FaLeaf className="mb-5 text-xl text-[#71804a]" />

                <p className="text-sm leading-8 text-[#665b4c] md:text-base">
                  هدفنا في شهدان ستور هو بناء متجر يجمع بين المنتجات المختارة
                  بعناية والتجربة الإلكترونية الحديثة. نريد أن يجد العميل ما
                  يبحث عنه بسهولة، وأن يحصل على معلومات واضحة وخدمة موثوقة في كل
                  خطوة من خطوات طلبه.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTACT
        ====================================================== */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
          <div className="relative overflow-hidden rounded-[32px] bg-[#442410] px-6 py-12 text-center md:px-12 md:py-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#c69a52]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#71804a]/10 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-bold tracking-[0.25em] text-[#d6b16b]">
                نحن هنا لخدمتك
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#fffdf8] md:text-4xl">
                هل لديك استفسار؟
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#dfd2bd]">
                يسعد فريق شهدان ستور بالتواصل معك والإجابة عن استفساراتك.
              </p>

              <a
                href="mailto:shahdan.store@gmail.com"
                className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#c69a52] px-6 py-4 text-sm font-black text-[#442410] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#d6b16b]"
              >
                <FaEnvelope />
                تواصل معنا
              </a>
            </div>
          </div>

          {/* Back to products */}
          <div className="mt-8 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#71804a] transition hover:text-[#442410]"
            >
              اكتشف منتجات شهدان ستور
              <FaArrowLeft className="text-xs" />
            </Link>
          </div>
        </section>

        {/* =====================================================
            BOTTOM
        ====================================================== */}
        <div className="border-t border-[#e3d8c5] py-7 text-center">
          <p className="text-xs text-[#897d6d]">
            شهدان ستور — منتجات مختارة بعناية، وتجربة تستحق ثقتك.
          </p>
        </div>
      </main>
    </>
  );
}

export default About;
