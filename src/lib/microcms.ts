import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

export type StatItem = {
  fieldId: string;
  label: string;
  value: string;
};

export type ActivityItem = {
  fieldId: string;
  name: string;
  description: string;
  image: MicroCMSImage[];
};

export type Ensemble = {
  id: string;
  title: string;
  sub?: string;
  forestType?: string;
  tags?: string;
  type?: string;
  heroImage?: MicroCMSImage;
  philosophy?: string;
  stats?: StatItem[];
  activity?: ActivityItem[];
  caution?: string;
  travelConditions?: string;
  gallery?: MicroCMSImage[];
  bookingUrl?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export async function getEnsembles(): Promise<Ensemble[]> {
  const res = await client.getList<Ensemble>({
    endpoint: "ensembles",
    queries: { limit: 50, orders: "publishedAt" },
  });
  return res.contents;
}

export async function getEnsemble(id: string): Promise<Ensemble> {
  return client.getListDetail<Ensemble>({
    endpoint: "ensembles",
    contentId: id,
  });
}

export async function getSpots(): Promise<Ensemble[]> {
  const res = await client.getList<Ensemble>({
    endpoint: "ensembles",
    queries: { filters: "type[equals]spot", limit: 50 },
  });
  return res.contents;
}

export type Slide = {
  fieldId: string;
  image?: MicroCMSImage;
  label?: string;
  title?: string;
  link?: string;
  linkLabel?: string;
};

export type Page = {
  id: string;
  pageId: string;
  heroTitle?: string;
  heroCaption?: string;
  body?: string;
  conceptTag?: string;
  conceptLinkLabel?: string;
  slides?: Slide[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export async function getPage(pageId: string): Promise<Page | null> {
  const res = await client.getList<Page>({
    endpoint: "pages",
    queries: { filters: `pageId[equals]${pageId}`, limit: 1 },
  });
  return res.contents[0] ?? null;
}

export type Report = {
  id: string;
  title: string;
  date?: string;
  category?: string;
  image?: MicroCMSImage;
  body?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export async function getReports(): Promise<Report[]> {
  const res = await client.getList<Report>({
    endpoint: "reports",
    queries: { limit: 50, orders: "-publishedAt" },
  });
  return res.contents;
}

export async function getReport(id: string): Promise<Report> {
  return client.getListDetail<Report>({
    endpoint: "reports",
    contentId: id,
  });
}
