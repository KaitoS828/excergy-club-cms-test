import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPage } from "@/lib/microcms";

export const metadata = {
  title: "食べられる森とは | 食べられる森アンサンブル倶楽部",
};

export const revalidate = 60;


const BODY_DEFAULT = `<p>食べられる森とは、産業が生まれる以前から続く「食べていくための森」のことです。効率よく何かを大量生産する畑や養殖場とは違い、自然界の仕組みのなかで、人が暮らし、食べていける環境そのものを指します。</p><p>たとえば昆布漁。海で昆布を一生懸命に育てている人は、昆布だけを見ているわけではありません。魚や貝、ほかの海藻が共に育つ海の生態系を整えている——つまり「海の森」を育てているのです。</p><p>エビの養殖だけがうまくいけばいいと考え、まわりの海が死んでいくような営みは、食べられる森にはなりません。隣にあるものと一緒に豊かになっていく。それが、食べられる森の本来の姿です。</p><p>私たちは、各地の暮らしをこの同じ切り口で捉え直しています。地域だけで完結させるのではなく、海の森も、砂丘の森も、都市の小さな庭も、同じ「食べられる森」として並べて発信していく。そうすることで、これまでとは違う旅の形、人やものの移動が生まれてくると考えています。</p>`;

export default async function ConceptPage() {
  const page = await getPage("concept").catch(() => null);

  const title = page?.heroTitle || "食べられる森とは";
  const bodyHtml = page?.body || BODY_DEFAULT;
  const galleryImages = (page?.slides ?? []).map((s) => s.image).filter(Boolean) as { url: string; width: number; height: number }[];

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <Header />
      <main className="pt-[72px]">
        {/* ヒーロー：背景画像 + テキスト */}
        <section className="relative" style={{ minHeight: "320px" }}>
          <div className="absolute inset-0" style={{ backgroundImage: "url('/hero-garden.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(20, 38, 24, 0.58)" }} />
          <div className="relative z-10 max-w-[760px] mx-auto px-5 lg:px-10 py-16 md:py-24">
            <span className="inline-block text-sm font-medium px-4 mb-5" style={{ height: "24px", lineHeight: "24px", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}>
              コンセプト
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Noto Serif JP', serif", color: "#FFFFFF" }}>
              {title}
            </h1>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-[760px] mx-auto px-5 lg:px-10">

            <div
              className="space-y-5 text-base md:text-[15px] leading-[2] [&_p]:mb-5"
              style={{ color: "#1A2B1E" }}
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />

            {galleryImages.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-3">
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl"
                    style={{ height: i === 0 && galleryImages.length > 1 ? "280px" : "200px", gridColumn: i === 0 && galleryImages.length > 1 ? "1 / -1" : undefined }}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 text-center">
              <a href="/#search" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-medium text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#3C6B4F" }}>
                各地の食べられる森を見る →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
