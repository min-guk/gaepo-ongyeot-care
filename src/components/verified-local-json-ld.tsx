import { localBusinessJsonLd } from "@/lib/seo/local-business";

export function VerifiedLocalJsonLd() {
  const data = localBusinessJsonLd();
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</gu, "\\u003c") }} />;
}
