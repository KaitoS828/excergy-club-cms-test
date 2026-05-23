import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getEnsembles } from "@/lib/microcms";
import EnsembleList from "./EnsembleList";

export const revalidate = 60;

export default async function EnsemblesPage() {
  const ensembles = await getEnsembles();

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <Header />
      <main className="pt-[72px]">
        <section className="relative" style={{ minHeight: "260px" }}>
          <div className="absolute inset-0" style={{ backgroundImage: "url('/hero-garden.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(20, 38, 24, 0.58)" }} />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10 py-12 md:py-16">
            <div className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.65)" }}>
              <a href="/" className="hover:opacity-80">トップ</a>
              <span className="mx-2">›</span>
              <span>アンサンブル一覧</span>
            </div>
            <span className="inline-block text-sm font-medium px-3 mb-3" style={{ height: "23px", lineHeight: "23px", borderRadius: "11.5px", backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}>
              イベント
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'Noto Serif JP', serif", color: "#FFFFFF" }}>
              アンサンブル一覧
            </h1>
            <p className="text-base" style={{ color: "rgba(255,255,255,0.8)" }}>
              全国各地のローカルコミュニティ（LC）をご紹介します。
            </p>
          </div>
        </section>

        <EnsembleList ensembles={ensembles} />

        <section className="py-12 bg-white border-t" style={{ borderColor: "rgba(0,95,2,0.15)" }}>
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 text-center">
            <p className="text-base font-bold mb-2" style={{ fontFamily: "'Noto Serif JP', serif", color: "#3C6B4F" }}>
              アンサンブルに参加・主催しませんか？
            </p>
            <p className="text-base mb-6" style={{ color: "#1A2B1E" }}>
              お気軽にお問い合わせください。
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#3C6B4F" }}
            >
              お問い合わせ →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
