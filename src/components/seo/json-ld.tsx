// ==============================================================================
// ScienceKH — JSON-LD Structured Data React Component
// Injects safe Schema.org JSON scripts into the DOM for search engine crawlers.
// ==============================================================================

import type { FC } from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const JsonLd: FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
};
