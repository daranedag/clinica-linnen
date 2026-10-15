import "server-only";

import { cache } from "react";
import { fallbackContent } from "@/lib/content/fallback";
import type { ContentRepository, SiteContent } from "@/lib/content/types";
import { siteContentPayloadSchema } from "@/lib/content/validation";
import { createInsforgeReadClient } from "@/lib/insforge/server";

const tableName = process.env.INSFORGE_CONTENT_TABLE || "site_content";

class StaticContentRepository implements ContentRepository {
  async getHomePage() {
    return fallbackContent;
  }
}

class InsforgeContentRepository implements ContentRepository {
  async getHomePage(): Promise<SiteContent> {
    const client = createInsforgeReadClient();

    if (!client) {
      return fallbackContent;
    }

    const { data, error } = await client.database
      .from(tableName)
      .select("key,locale,payload,updated_at")
      .eq("key", "home")
      .eq("locale", "es-CL")
      .eq("status", "published")
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      console.warn("[content] InsForge unavailable; using local fallback.", error);
      return fallbackContent;
    }

    const row = data as {
      payload: Omit<SiteContent, "updatedAt">;
      updated_at: string;
    };

    const parsed = siteContentPayloadSchema.safeParse(row.payload);

    if (!parsed.success) {
      console.warn("[content] Published content is invalid; using local fallback.");
      return fallbackContent;
    }

    return {
      ...parsed.data,
      updatedAt: row.updated_at,
    };
  }
}

export function getContentRepository(): ContentRepository {
  if (
    process.env.NEXT_PUBLIC_INSFORGE_URL &&
    process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY
  ) {
    return new InsforgeContentRepository();
  }

  return new StaticContentRepository();
}

export const getHomePageContent = cache(() => getContentRepository().getHomePage());
