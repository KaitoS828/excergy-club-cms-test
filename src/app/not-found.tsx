import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <Header />
      <main className="pt-[72px] min-h-[80vh] flex items-center">
        <div className="max-w-[600px] mx-auto px-5 lg:px-10 py-24 text-center">
          <p
            className="font-bold mb-6"
            style={{ fontSize: "clamp(5rem, 20vw, 10rem)", lineHeight: 1, color: "#3C6B4F", opacity: 0.15, fontFamily: "'Noto Serif JP', serif" }}
          >
            404
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold mb-6 leading-snug"
            style={{ fontFamily: "'Noto Serif JP', serif", color: "#3C6B4F" }}
          >
            ページが見つかりません
          </h1>
          <p className="text-base leading-[1.9] mb-10" style={{ color: "#1A2B1E", opacity: 0.65 }}>
            お探しのページは移動または削除された可能性があります。
            <br />
            URLをご確認いただくか、トップページからお探しください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-white text-base font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#3C6B4F" }}
            >
              トップページへ
            </a>
            <a
              href="/ensembles"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-medium border-2 transition-opacity hover:opacity-70"
              style={{ borderColor: "rgba(0,95,2,0.25)", color: "#3C6B4F" }}
            >
              アンサンブル一覧へ
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
