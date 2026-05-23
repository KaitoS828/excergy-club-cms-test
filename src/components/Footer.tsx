import { Logo } from "./Logo";

const FOOTER_NAV = [
  {
    title: "食べられる森について",
    links: [
      { label: "コンセプト", href: "/concept" },
      { label: "食べられる森とは", href: "/#about" },
    ],
  },
  {
    title: "各地の拠点",
    links: [
      { label: "拠点一覧", href: "/ensembles" },
      { label: "地図から探す", href: "/#search" },
    ],
  },
  {
    title: "宿泊・参加",
    links: [
      { label: "宿泊拠点一覧", href: "/spots" },
      { label: "倶楽部に参加", href: "/join" },
    ],
  },
  {
    title: "活動・お問い合わせ",
    links: [
      { label: "活動レポート", href: "/reports" },
      { label: "お問い合わせ", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="pt-10 pb-6"
      style={{ backgroundColor: "#F4F4F2", borderTop: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
          <Logo size="sm" />
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            {FOOTER_NAV.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-bold mb-3 tracking-wide" style={{ color: "#1A2B1E" }}>
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-xs hover:text-[#3C6B4F] transition-colors"
                        style={{ color: "rgba(26,43,30,0.6)" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex flex-wrap items-center gap-3 pt-5 border-t text-xs"
          style={{ borderColor: "rgba(0,0,0,0.08)", color: "rgba(26,43,30,0.45)", fontFamily: "'Noto Serif JP', serif" }}
        >
          {[
            { label: "プライバシーポリシー", href: "/privacy" },
            { label: "利用規約", href: "/terms" },
          ].map((link, i) => (
            <span key={link.href} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden style={{ color: "rgba(0,0,0,0.2)" }}>|</span>}
              <a href={link.href} className="hover:text-[#3C6B4F] transition-colors">{link.label}</a>
            </span>
          ))}
          <span className="w-full sm:w-auto sm:ml-auto">
            © 2024 食べられる森アンサンブル倶楽部
          </span>
        </div>
      </div>
    </footer>
  );
}
