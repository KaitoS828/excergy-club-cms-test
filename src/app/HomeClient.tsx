"use client";
import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Report, Ensemble } from "@/lib/microcms";
import { JapanMap } from "@/components/JapanMap/JapanMap";
import type { RegionId } from "@/components/JapanMap/mapData";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export type SlideView = { img: string; label: string; title: string; link: string; linkLabel: string };
export type ConceptView = { title: string; body1: string; body2: string; tag: string; linkLabel: string };

// ─────────────────────────────────────────
// Hero
// ─────────────────────────────────────────
const SLIDES_DEFAULT: SlideView[] = [
  { img: "/carousel/aa.png",      label: "広尾の森",              title: "十勝の大地で、食べられる植物を育てる。",             link: "/ensembles/hiroo",   linkLabel: "詳しくみる" },
  { img: "/carousel/img_02.jpg",  label: "食べられる森アンサンブル倶楽部", title: "自然界の仕組みが、新しい生き方を教えてくれる。", link: "/concept",           linkLabel: "詳しくみる" },
  { img: "/carousel/image6.png",  label: "全国各地のLC",          title: "食べる・育てる・つながる。生活生産の喜びを各地で。",  link: "/#events",           linkLabel: "拠点を見る" },
  { img: "/carousel/image4.png",  label: "インターローカル",      title: "地域と都市をつなぐ、暮らしの実験場。",               link: "/join",              linkLabel: "参加する" },
  { img: "/carousel/image5.png",  label: "四万十の森",            title: "清流と共にある暮らしを、四万十川の流域で。",          link: "/ensembles/shimanto",linkLabel: "詳しくみる" },
];

function HeroSection({ slides = SLIDES_DEFAULT }: { slides?: SlideView[] }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((index: number) => {
    setFading(true);
    setTimeout(() => { setCurrent(index); setFading(false); }, 300);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "min(88vh, 820px)", minHeight: "520px" }}>
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.02]"
        style={{ backgroundImage: `url('${slide.img}')`, opacity: fading ? 0 : 1, transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1)" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.05) 100%)" }} />
      <p className="absolute top-6 left-6 lg:left-12 text-xs tracking-wider z-10" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Noto Serif JP', serif" }}>TOP &gt;</p>
      <div className="absolute inset-0 flex items-end lg:items-center z-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 lg:pb-0">
          <p className="text-[14px] font-medium mb-3 tracking-wide" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Noto Serif JP', serif", opacity: fading ? 0 : 1, transition: "opacity 0.4s ease" }}>
            {slide.label}
          </p>
          <h1 className="font-bold text-white mb-6 max-w-[640px]" style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "clamp(2rem, 4.6vw, calc(3.5rem - 4px))", lineHeight: 1.45, letterSpacing: "0.04em", opacity: fading ? 0 : 1, transition: "opacity 0.45s ease" }}>
            {slide.title}
          </h1>
          <a href={slide.link} className="inline-flex items-center justify-center px-7 py-3 rounded-full text-[14px] font-bold tracking-wide transition-opacity hover:opacity-90" style={{ backgroundColor: "#FFFFFF", color: "#1A2B1E", fontFamily: "'Noto Serif JP', serif", minWidth: "160px" }}>
            {slide.linkLabel}
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 right-6 lg:right-12 flex items-center gap-2.5 z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`スライド ${i + 1}`} className="p-0 border-0 cursor-pointer transition-all duration-200"
            style={{ width: i === current ? "28px" : "8px", height: "8px", borderRadius: "4px", backgroundColor: i === current ? "#3C6B4F" : "rgba(255,255,255,0.5)" }}
          />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// 活動レポート（CMS連動）
// ─────────────────────────────────────────
function NewsroomSection({ reports = [] }: { reports?: Report[] }) {
  const latest = reports[0];
  const rest = reports.slice(1, 6);

  return (
    <section className="bg-white py-14 md:py-20 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <RevealOnScroll>
          <div className="flex items-end justify-between mb-10 md:mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: "'Noto Serif JP', serif", color: "#1A2B1E", letterSpacing: "0.02em" }}>
              活動レポート
            </h2>
            <a href="/reports" className="flex items-center justify-center w-10 h-10 rounded-full border transition-colors hover:bg-[#3C6B4F] hover:border-[#3C6B4F] group" style={{ borderColor: "rgba(0,0,0,0.15)" }} aria-label="活動レポート一覧へ">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:stroke-white transition-colors" stroke="#1A2B1E" strokeWidth="1.5">
                <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </RevealOnScroll>

        {!latest ? (
          <p className="text-base text-center py-12" style={{ color: "#1A2B1E", opacity: 0.4 }}>レポートはまだありません</p>
        ) : (
          <div className="flex flex-col gap-8">
            {/* 最新レポート：大きく表示 */}
            <RevealOnScroll>
              <a href={`/reports/${latest.id}`} className="group block md:flex gap-8 rounded-3xl overflow-hidden border hover:shadow-lg transition-shadow" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                <div className="shrink-0 md:w-[480px] aspect-[16/9] md:aspect-auto md:h-[320px] overflow-hidden bg-[#f0f0f0]">
                  {latest.image ? (
                    <img src={latest.image.url} alt={latest.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl" style={{ backgroundColor: "rgba(60,107,79,0.08)" }}>🌳</div>
                  )}
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <span className="inline-block text-xs font-medium px-2 py-0.5 mb-3 self-start" style={{ backgroundColor: "#3C6B4F", color: "white", borderRadius: "3px" }}>
                    最新
                  </span>
                  <p className="text-sm mb-3" style={{ color: "#1A2B1E", opacity: 0.45, fontFamily: "'Noto Serif JP', serif" }}>
                    {latest.date}{latest.category ? `　${latest.category}` : ""}
                  </p>
                  <p className="text-xl md:text-2xl font-bold leading-snug group-hover:text-[#3C6B4F] transition-colors" style={{ fontFamily: "'Noto Serif JP', serif", color: "#1A2B1E" }}>
                    {latest.title}
                  </p>
                </div>
              </a>
            </RevealOnScroll>

            {/* 過去レポート：横スクロール */}
            {rest.length > 0 && (
              <div className="flex gap-5 md:gap-6 overflow-x-auto pb-2 -mx-6 px-6 lg:mx-0 lg:px-0">
                {rest.map((item, i) => (
                  <RevealOnScroll key={item.id} delay={i * 60}>
                    <a href={`/reports/${item.id}`} className="shrink-0 group block" style={{ width: "min(240px, 70vw)" }}>
                      <div className="rounded-2xl overflow-hidden mb-4 aspect-[4/3] bg-[#f0f0f0]">
                        {item.image ? (
                          <img src={item.image.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl" style={{ backgroundColor: "rgba(60,107,79,0.08)" }}>🌳</div>
                        )}
                      </div>
                      <p className="text-sm mb-2 tracking-wide" style={{ color: "#1A2B1E", opacity: 0.45, fontFamily: "'Noto Serif JP', serif" }}>
                        {item.date}{item.category ? `　${item.category}` : ""}
                      </p>
                      <p className="text-base font-bold leading-snug group-hover:text-[#3C6B4F] transition-colors" style={{ fontFamily: "'Noto Serif JP', serif", color: "#1A2B1E" }}>
                        {item.title}
                      </p>
                    </a>
                  </RevealOnScroll>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// About
// ─────────────────────────────────────────
const CONCEPT_DEFAULT: ConceptView = {
  title: "すべての拠点の背景に、\n「食べられる森」があります。",
  body1: "海で昆布を育てることは「海の森」を育てること。砂丘も、都市の小さな庭も、見方を変えればすべて食べられる森になります。私たちは各地の暮らしを、この同じ切り口で捉え直し、発信しています。",
  body2: "ここで出会えるのは、ただの観光ではありません。各地の宿と、その背景にある食べられる森。まずは気になる地域から、覗いてみてください。",
  tag: "コンセプト",
  linkLabel: "食べられる森について詳しく →",
};

function AboutSection({ concept = CONCEPT_DEFAULT }: { concept?: ConceptView }) {
  return (
    <section id="about" className="relative py-24 md:py-36 overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0" style={{ backgroundImage: "url('/hero-garden.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(14, 28, 18, 0.42)" }} />

      {/* グラスカード */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
        <RevealOnScroll>
          <div
            className="max-w-[620px] p-8 md:p-12 rounded-3xl"
            style={{ fontFamily: "'Noto Serif JP', serif",
              background: "rgba(255,255,255,0.28)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              border: "1px solid rgba(255,255,255,0.4)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            }}
          >
            <span
              className="inline-block text-xs font-medium px-3 mb-5"
              style={{ height: "22px", lineHeight: "22px", borderRadius: "11px", backgroundColor: "rgba(255,255,255,0.25)", color: "white", letterSpacing: "0.06em" }}
            >
              {concept.tag}
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold leading-snug mb-4 whitespace-pre-line"
              style={{ fontFamily: "'Noto Serif JP', serif", color: "#FFFFFF", textShadow: "1px 0 4px rgba(0,0,0,0.25), -1px 0 4px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.25), 0 -1px 4px rgba(0,0,0,0.25)" }}
            >
              {concept.title}
            </h2>
            <p className="text-base leading-[1.9] mb-3" style={{ color: "rgba(255,255,255,0.9)", textShadow: "0 0 6px rgba(0,0,0,0.2), 1px 1px 3px rgba(0,0,0,0.15)" }}>
              {concept.body1}
            </p>
            <div
              className="mb-6 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.22)",
                border: "1px solid rgba(255,255,255,0.35)",
                borderLeft: "3px solid rgba(255,255,255,0.7)",
              }}
            >
              <p className="text-base leading-[1.9]" style={{ color: "rgba(255,255,255,0.82)", textShadow: "0 0 6px rgba(0,0,0,0.2), 1px 1px 3px rgba(0,0,0,0.15)" }}>
                {concept.body2}
              </p>
            </div>
            <a
              href="/concept"
              className="inline-flex items-center gap-3 group"
            >
              <span
                className="flex items-center justify-center w-11 h-11 rounded-full transition-colors group-hover:bg-white"
                style={{ backgroundColor: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:stroke-[#3C6B4F] transition-colors" stroke="white" strokeWidth="1.6">
                  <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-base font-medium border-b border-white/40 pb-0.5" style={{ color: "rgba(255,255,255,0.9)" }}>
                {concept.linkLabel}
              </span>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// 地域から探す（CMS連動）
// ─────────────────────────────────────────
const REGION_ID_TO_LABEL: Record<RegionId, string> = {
  hokkaido: "北海道",
  tohoku:   "東北",
  kanto:    "関東",
  shinetsu: "信越・北陸",
  tokai:    "東海",
  kinki:    "近畿",
  chugoku:  "中国・四国",
  kyushu:   "九州・沖縄",
};

const REGION_KEYWORDS: Record<RegionId, string[]> = {
  hokkaido: ["北海道", "十勝", "広尾", "帯広", "釧路", "網走", "旭川", "函館", "札幌"],
  tohoku:   ["東北", "青森", "岩手", "宮城", "秋田", "山形", "福島", "仙台"],
  kanto:    ["関東", "東京", "神奈川", "埼玉", "千葉", "茨城", "栃木", "群馬", "武蔵野", "横浜"],
  shinetsu: ["信越", "北陸", "新潟", "長野", "富山", "石川", "福井"],
  tokai:    ["東海", "静岡", "愛知", "岐阜", "三重", "御前崎", "浜松", "名古屋"],
  kinki:    ["近畿", "大阪", "京都", "兵庫", "奈良", "和歌山", "滋賀", "竹野", "神戸"],
  chugoku:  ["中国", "四国", "岡山", "広島", "鳥取", "島根", "山口", "香川", "高知", "徳島", "愛媛", "四万十"],
  kyushu:   ["九州", "沖縄", "福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島"],
};

function matchRegion(e: Ensemble, regionId: RegionId): boolean {
  const text = `${e.sub ?? ""} ${e.tags ?? ""} ${e.title ?? ""}`;
  return REGION_KEYWORDS[regionId].some((kw) => text.includes(kw));
}

function SearchSection({ ensembles = [], spots = [] }: { ensembles?: Ensemble[]; spots?: Ensemble[] }) {
  const [regionId, setRegionId]     = useState<RegionId | null>(null);
  const [activeType, setActiveType] = useState<"all" | "ensemble" | "stay">("all");

  const selected = regionId ? REGION_ID_TO_LABEL[regionId] : null;
  const matchEnsembles = regionId ? ensembles.filter((e) => matchRegion(e, regionId)) : [];
  const matchSpots     = regionId ? spots.filter((s) => matchRegion(s, regionId)) : [];

  const showEnsembles = activeType === "all" || activeType === "ensemble";
  const showSpots     = activeType === "all" || activeType === "stay";

  return (
    <section id="search" className="py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <RevealOnScroll>
          <div className="mb-10">
            <span className="inline-block text-sm font-medium px-3 mb-3" style={{ height: "23px", lineHeight: "23px", borderRadius: "11.5px", backgroundColor: "#3C6B4F", color: "white" }}>
              地域から探す
            </span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Noto Serif JP', serif", color: "#3C6B4F" }}>
              各地の食べられる森を探す
            </h2>
            <p className="text-base mt-2" style={{ color: "#1A2B1E", opacity: 0.45 }}>地図の地域をクリックすると、その地域のアンサンブルと宿泊拠点が表示されます</p>
          </div>
        </RevealOnScroll>

        <div className="flex flex-wrap gap-2 mb-8">
          {(Object.entries(REGION_ID_TO_LABEL) as [RegionId, string][]).map(([id, label]) => (
            <button key={id} onClick={() => setRegionId(regionId === id ? null : id)}
              className="text-base px-4 py-2 rounded-full border transition-all duration-200"
              style={{ backgroundColor: regionId === id ? "#3C6B4F" : "white", color: regionId === id ? "white" : "#1A2B1E", borderColor: regionId === id ? "#3C6B4F" : "rgba(0,95,2,0.2)" }}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {[
            { label: "LC（ローカルコミュニティ）", value: ensembles.length },
            { label: "LS（ローカルステイ）",       value: spots.length },
            { label: "登録コンテンツ",              value: ensembles.length + spots.length },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-4xl font-bold" style={{ fontFamily: "'Noto Serif JP', serif", color: "#3C6B4F" }}>{value}</span>
              <span className="text-sm" style={{ color: "#1A2B1E", opacity: 0.55 }}>{label}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="w-full max-w-[460px] mx-auto">
            <JapanMap value={regionId} onChange={setRegionId} />
          </div>

          <div>
            <div className="flex gap-2 mb-8">
              {([["all","すべて"],["ensemble","アンサンブル"],["stay","宿泊"]] as const).map(([v, lbl]) => (
                <button key={v} onClick={() => setActiveType(v)}
                  className="text-sm px-5 py-2 rounded-full border transition-all duration-200"
                  style={{ backgroundColor: activeType === v ? "#3C6B4F" : "white", color: activeType === v ? "white" : "#1A2B1E", borderColor: "#3C6B4F" }}>
                  {lbl}
                </button>
              ))}
            </div>

            {selected ? (
              <div style={{ animation: "fadeInUp 0.35s ease both" }}>
                <div className="flex items-center gap-3 mb-6">
                  <span style={{ backgroundColor: "#3C6B4F", color: "white", borderRadius: "20px", padding: "2px 14px", fontSize: "11px", fontWeight: 600 }}>{selected}</span>
                  <p className="text-base" style={{ color: "#3C6B4F" }}>の検索結果</p>
                </div>

                {showEnsembles && matchEnsembles.length > 0 && (
                  <div className="mb-10">
                    <p className="text-sm font-semibold mb-4 tracking-wider" style={{ color: "#1A2B1E" }}>ENSEMBLE</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      {matchEnsembles.map((e) => (
                        <a key={e.id} href={`/ensembles/${e.id}`} className="group flex flex-col items-center text-center">
                          <div className="relative overflow-hidden rounded-full mb-3 transition-transform duration-500 group-hover:scale-[1.05]"
                            style={{ width: "100px", height: "100px", boxShadow: "0 0 0 3px white, 0 0 0 5px rgba(60,107,79,0.3)", backgroundColor: "#f5f5f5" }}>
                            {e.heroImage
                              ? <img src={e.heroImage.url} alt={e.title} className="w-full h-full object-cover" />
                              : <div className="w-full h-full flex items-center justify-center text-2xl">🌳</div>
                            }
                          </div>
                          {e.sub && (
                            <span className="inline-block text-xs font-medium px-3 mb-1.5" style={{ height: "20px", lineHeight: "20px", borderRadius: "10px", backgroundColor: "#3C6B4F", color: "white" }}>
                              {e.sub}
                            </span>
                          )}
                          <p className="text-sm font-bold group-hover:text-[#3C6B4F] transition-colors" style={{ color: "#3C6B4F" }}>{e.title}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {showSpots && matchSpots.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold mb-4 tracking-wider" style={{ color: "#1A2B1E" }}>LOCAL STAY</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {matchSpots.map((s) => (
                        <a key={s.id} href={`/spots/${s.id}`} className="group block bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,95,2,0.15)" }}>
                          <div className="overflow-hidden" style={{ height: "140px", backgroundColor: "#f5f5f5" }}>
                            {s.heroImage && <img src={s.heroImage.url} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />}
                          </div>
                          <div className="p-4">
                            <p className="text-xs mb-1" style={{ color: "#1A2B1E", opacity: 0.6 }}>{s.sub}</p>
                            <p className="text-base font-bold mb-1 group-hover:text-[#3C6B4F] transition-colors" style={{ color: "#3C6B4F" }}>{s.title}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {showEnsembles && matchEnsembles.length === 0 && showSpots && matchSpots.length === 0 && (
                  <p className="text-base text-center py-8" style={{ color: "#1A2B1E", opacity: 0.5 }}>
                    {selected} に該当する拠点・アンサンブルはまだ登録されていません
                  </p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[200px] rounded-2xl" style={{ border: "1px dashed rgba(0,95,2,0.2)" }}>
                <p className="text-center text-base px-6" style={{ color: "#1A2B1E", opacity: 0.4 }}>地図の地域をクリックしてください</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// 各地の食べられる森（CMS連動）
// ─────────────────────────────────────────
function EnsembleListSection({ ensembles = [] }: { ensembles?: Ensemble[] }) {
  const displayed = ensembles;

  return (
    <section id="events" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
            <div>
              <span className="inline-block text-sm font-medium px-3 mb-3" style={{ height: "23px", lineHeight: "23px", borderRadius: "11.5px", backgroundColor: "#3C6B4F", color: "white" }}>
                LC（ローカルコミュニティ）
              </span>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Noto Serif JP', serif", color: "#3C6B4F" }}>
                各地の食べられる森
              </h2>
            </div>
            <p className="text-base max-w-[280px] md:text-right leading-[1.9]" style={{ color: "#1A2B1E" }}>
              全国各地のローカルコミュニティ（LC）をご紹介します。
            </p>
          </div>
        </RevealOnScroll>

        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {displayed.map((e, i) => (
              <RevealOnScroll key={e.id} delay={i * 60}>
                <a href={`/ensembles/${e.id}`} className="group flex flex-col items-center text-center">
                  <div className="relative overflow-hidden rounded-full mb-4 transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ width: "180px", height: "180px", boxShadow: "0 0 0 4px white, 0 0 0 6px rgba(60,107,79,0.25)", backgroundColor: "#FFFFFF" }}>
                    {e.heroImage
                      ? <img src={e.heroImage.url} alt={e.title} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-4xl">🌳</div>
                    }
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    {e.sub && (
                      <span className="inline-block text-xs font-medium px-3" style={{ height: "20px", lineHeight: "20px", borderRadius: "10px", backgroundColor: "#3C6B4F", color: "white" }}>{e.sub}</span>
                    )}
                    {e.forestType && (
                      <span className="inline-block text-xs font-medium px-3" style={{ height: "20px", lineHeight: "20px", borderRadius: "10px", backgroundColor: "rgba(26,43,30,0.82)", color: "white" }}>🌳 {e.forestType}</span>
                    )}
                  </div>
                  <h3 className="text-base font-bold mb-1 group-hover:text-[#3C6B4F] transition-colors" style={{ color: "#3C6B4F" }}>{e.title}</h3>
                </a>
              </RevealOnScroll>
            ))}
          </div>
        ) : (
          <p className="text-base text-center py-12" style={{ color: "#1A2B1E", opacity: 0.4 }}>アンサンブルはまだ登録されていません</p>
        )}

        <div className="mt-12 flex justify-center">
          <a href="/ensembles" className="flex items-center gap-2 text-base font-medium px-8 py-3 rounded-full border-2 transition-colors hover:bg-[#3C6B4F] hover:text-white hover:border-[#3C6B4F]" style={{ borderColor: "#3C6B4F", color: "#3C6B4F" }}>
            もっと見る →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// 宿泊（LS）
// ─────────────────────────────────────────
const NAV_TILES = [
  { img: "/carousel/aa.png",     label: "アンサンブル", sub: "LOCAL COMMUNITY", href: "/ensembles" },
  { img: "/carousel/image5.png", label: "宿泊する",     sub: "LOCAL STAY",      href: "/spots"     },
  { img: "/carousel/img_02.jpg", label: "活動レポート", sub: "REPORTS",         href: "/reports"   },
  { img: "/carousel/image4.png", label: "倶楽部に参加", sub: "JOIN US",         href: "/join"      },
];

function NavTilesSection() {
  return (
    <section id="stays" className="grid grid-cols-2 grid-rows-2" style={{ height: "min(80vh, 640px)" }}>
      {NAV_TILES.map((tile) => (
        <a key={tile.href} href={tile.href} className="relative group overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.06]"
            style={{ backgroundImage: `url('${tile.img}')` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.04) 100%)" }}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8 z-10">
            <div className="flex items-center gap-2 md:gap-3 mb-1">
              <span
                className="flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full flex-shrink-0 transition-colors group-hover:bg-white"
                style={{ border: "1.5px solid rgba(255,255,255,0.7)" }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="group-hover:stroke-[#3C6B4F] transition-colors" stroke="white" strokeWidth="1.5">
                  <path d="M1 5.5h9M6 1.5l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3
                className="text-lg md:text-2xl font-bold text-white"
                style={{ fontFamily: "'Noto Serif JP', serif", textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
              >
                {tile.label}
              </h3>
            </div>
            <p className="text-xs tracking-widest ml-9 md:ml-12" style={{ color: "rgba(255,255,255,0.6)" }}>
              {tile.sub}
            </p>
          </div>
        </a>
      ))}
    </section>
  );
}

// ─────────────────────────────────────────
// お問い合わせ（GSAP RevealOnScroll）
// ─────────────────────────────────────────
function ContactSection() {
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "rgba(0,95,2,0.03)" }}>
      <div className="max-w-[1000px] mx-auto px-5 lg:px-10 text-center">
        <RevealOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Noto Serif JP', serif", color: "#3C6B4F" }}>
            一緒にやりませんか
          </h2>
          <p className="text-base mb-10" style={{ color: "#1A2B1E" }}>
            アンサンブル（イベント）を開きたい方、拠点を登録・活用してほしい方からのご相談をお待ちしています。
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[640px] mx-auto text-left">
          <RevealOnScroll from="left" delay={80}>
            <a href="/contact?type=ensemble" className="group block rounded-2xl p-6 bg-white transition-transform hover:-translate-y-1" style={{ border: "1px solid rgba(0,95,2,0.15)" }}>
              <div className="text-3xl mb-3">🎪</div>
              <h3 className="text-base font-bold mb-2" style={{ color: "#3C6B4F" }}>アンサンブルを主催したい</h3>
              <p className="text-sm leading-[1.8]" style={{ color: "#1A2B1E" }}>地域でイベントを開いてみたい方。企画のご相談から承ります。</p>
            </a>
          </RevealOnScroll>
          <RevealOnScroll from="right" delay={80}>
            <a href="/contact?type=spot" className="group block rounded-2xl p-6 bg-white transition-transform hover:-translate-y-1" style={{ border: "1px solid rgba(0,95,2,0.15)" }}>
              <div className="text-3xl mb-3">🏡</div>
              <h3 className="text-base font-bold mb-2" style={{ color: "#3C6B4F" }}>拠点を登録・活用したい</h3>
              <p className="text-sm leading-[1.8]" style={{ color: "#1A2B1E" }}>宿や場所を拠点として登録したい・活用してほしい方はこちら。</p>
            </a>
          </RevealOnScroll>
        </div>
        <RevealOnScroll delay={160}>
          <div className="mt-8">
            <a href="/contact" className="text-base font-medium underline transition-opacity hover:opacity-70" style={{ color: "#3C6B4F" }}>
              その他のお問い合わせはこちら →
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Page
// ─────────────────────────────────────────
export default function HomeClient({
  slides,
  concept,
  reports = [],
  ensembles = [],
  spots = [],
}: {
  slides?: SlideView[];
  concept?: ConceptView;
  reports?: Report[];
  ensembles?: Ensemble[];
  spots?: Ensemble[];
}) {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <Header />
      <main className="pt-[72px] page-enter">
        <HeroSection slides={slides} />
        <NewsroomSection reports={reports} />
        <AboutSection concept={concept} />
        <EnsembleListSection ensembles={ensembles} />
        <NavTilesSection />
        <SearchSection ensembles={ensembles} spots={spots} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
