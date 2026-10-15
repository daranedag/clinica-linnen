import { NextResponse } from "next/server";
import { getHomePageContent } from "@/lib/content/repository";

export async function GET() {
  const content = await getHomePageContent();

  return NextResponse.json(content, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}
