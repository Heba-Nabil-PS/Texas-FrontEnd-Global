import { headers } from "next/headers";
import { getTenantConfig } from "@/tenant.config";
import type { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  try {
    const host = (await headers()).get("host") ?? "";
    const tenant = getTenantConfig(host);
    const websiteUrl = tenant?.websiteUrl;

    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: [
            "/api/",
            "/trpc/",
            "/_next/",
            "/_vercel/",
            "/src/",
            "/assets/",
          ],
        },
      ],
      sitemap: websiteUrl + "/sitemap.xml",
    };
  } catch (error) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }
}
