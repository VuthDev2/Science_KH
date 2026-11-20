// ==============================================================================
// ScienceKH — Study Reference Library (formerly Vocab / Codex)
// Seamlessly redirects to the redesigned academic Study Reference Library (/reference)
// ==============================================================================

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/vocab")({
  validateSearch: (search: Record<string, unknown>): { grade?: number } => ({
    grade: typeof search.grade === "number" ? search.grade : undefined,
  }),
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/reference",
      search: {
        grade: search.grade,
      },
    });
  },
  component: () => null,
});
