import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { Atom, FlaskConical, Sparkles, Languages } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ScienceKH — Learn science in Khmer & English" },
      {
        name: "description",
        content:
          "Interactive science lessons, quizzes, and an AI tutor for Cambodian Grade 7–12 students. Free to start.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { user, loading } = useAuth();

  if (!loading && user) {
    return <Navigate to="/home" />;
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex w-full max-w-md items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <Atom className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">ScienceKH</span>
        </div>
        <Link
          to="/auth"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Sign in
        </Link>
      </header>

      <section className="mx-auto w-full max-w-md px-6 pt-12 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          វិទ្យាសាស្ត្រ · Science · Grade 7–12
        </div>
        <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground">
          Understand science,<br />
          <span className="text-primary">not memorize it.</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          Interactive lessons, quick quizzes, and a patient AI tutor — in Khmer and English. Built
          for Cambodian students preparing for high school exams.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Button asChild size="lg" className="h-12 text-base shadow-soft">
            <Link to="/auth" search={{ mode: "signup" }}>
              Create free account
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="h-12 text-base">
            <Link to="/auth" search={{ mode: "signin" }}>
              I already have an account
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-md px-6 pb-16">
        <div className="grid gap-3">
          <FeatureRow
            icon={<FlaskConical className="h-4 w-4" />}
            title="Physics, Chemistry, Biology, Earth"
            body="Lessons mapped to the Cambodian curriculum."
          />
          <FeatureRow
            icon={<Sparkles className="h-4 w-4" />}
            title="AI tutor that explains step-by-step"
            body="Ask anything. Get age-appropriate answers."
          />
          <FeatureRow
            icon={<Languages className="h-4 w-4" />}
            title="Khmer & English, side by side"
            body="Learn in your language. Build vocabulary in both."
          />
        </div>
      </section>
    </main>
  );
}

function FeatureRow({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
