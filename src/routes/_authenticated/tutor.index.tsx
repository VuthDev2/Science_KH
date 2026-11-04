import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, MessageSquarePlus, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useProfile } from "@/lib/use-profile";
import { PageShell } from "@/components/page-shell";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { tx } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/tutor/")({
  head: () => ({ meta: [{ title: "AI Tutor — ScienceKH" }] }),
  component: TutorIndex,
});

function TutorIndex() {
  const { user } = useAuth();
  const { lang } = useProfile();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_conversations")
        .select("id, title, updated_at")
        .eq("user_id", user!.id)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("ai_conversations")
        .insert({ user_id: user!.id, title: "New chat" })
        .select("id")
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (c) => {
      qc.invalidateQueries({ queryKey: ["conversations", user?.id] });
      navigate({ to: "/tutor/$conversationId", params: { conversationId: c.id } });
    },
  });

  return (
    <>
      <main className="min-h-screen bg-background pb-24">
        <header className="mx-auto w-full max-w-md px-6 pt-8">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary to-accent p-5 text-primary-foreground shadow-elevated">
            <Sparkles className="h-6 w-6 opacity-90" />
            <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
              {tx(lang, "askTutor")}
            </h1>
            <p className="mt-1 text-sm opacity-90">
              {lang === "km"
                ? "សួរសំណួរអ្វីក៏បានអំពីវិទ្យាសាស្ត្រ"
                : "Ask anything about Physics, Chemistry, Biology or Earth Science."}
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-4 h-11 w-full"
              onClick={() => create.mutate()}
              disabled={create.isPending}
            >
              {create.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MessageSquarePlus className="h-4 w-4" />
              )}
              {tx(lang, "newChat")}
            </Button>
          </div>
        </header>

        <section className="mx-auto w-full max-w-md px-6 pt-8">
          <h2 className="font-display text-lg font-semibold tracking-tight">
            {tx(lang, "recentChats")}
          </h2>
          {isLoading ? (
            <div className="mt-4 space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-14 animate-pulse rounded-2xl bg-muted" />
              ))}
            </div>
          ) : !conversations || conversations.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              {lang === "km" ? "មិនទាន់មានសន្ទនា" : "No chats yet."}
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {conversations.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/tutor/$conversationId"
                    params={{ conversationId: c.id }}
                    className="block rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
                  >
                    <p className="line-clamp-1 font-medium">{c.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {new Date(c.updated_at).toLocaleString()}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <BottomNav />
    </>
  );
}
