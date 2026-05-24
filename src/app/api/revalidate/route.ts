import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.MICROCMS_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const api: string = body.api ?? "";
  const id: string = body.id ?? "";

  if (api === "reports") {
    revalidatePath("/reports");
    if (id) revalidatePath(`/reports/${id}`);
    revalidatePath("/");
  } else if (api === "ensembles") {
    revalidatePath("/ensembles");
    revalidatePath("/spots");
    if (id) {
      revalidatePath(`/ensembles/${id}`);
      revalidatePath(`/spots/${id}`);
    }
    revalidatePath("/");
  } else if (api === "pages") {
    revalidatePath("/");
    revalidatePath("/concept");
  } else {
    revalidatePath("/", "layout");
  }

  return NextResponse.json({ revalidated: true, api, id });
}
