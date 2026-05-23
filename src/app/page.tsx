import { getPage, getReports, getEnsembles, getSpots } from "@/lib/microcms";
import HomeClient, { type SlideView, type ConceptView } from "./HomeClient";

export const revalidate = 60;

export default async function Home() {
  const [top, reports, ensembles, spots] = await Promise.all([
    getPage("top").catch(() => null),
    getReports().catch(() => []),
    getEnsembles().catch(() => []),
    getSpots().catch(() => []),
  ]);

  const slides: SlideView[] | undefined = top?.slides?.length
    ? top.slides.map((s) => ({
        img: s.image?.url ?? "",
        label: s.label ?? "",
        title: s.title ?? "",
        link: s.link ?? "/",
        linkLabel: s.linkLabel ?? "詳しくみる",
      }))
    : undefined;

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();

  const concept: ConceptView | undefined =
    top?.heroTitle || top?.heroCaption || top?.body
      ? {
          title: top.heroTitle ?? "",
          body1: top.heroCaption ?? "",
          body2: top.body ? stripHtml(top.body) : "",
          tag: top.conceptTag ?? "コンセプト",
          linkLabel: top.conceptLinkLabel ?? "食べられる森について詳しく →",
        }
      : undefined;

  const ensembleOnly = ensembles.filter((e) => e.type !== "spot");

  return (
    <HomeClient
      slides={slides}
      concept={concept}
      reports={reports}
      ensembles={ensembleOnly}
      spots={spots}
    />
  );
}
