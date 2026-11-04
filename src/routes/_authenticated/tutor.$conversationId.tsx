import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Loader2, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { askTutor } from "@/lib/ai-tutor.functions";
import { useProfile } from "@/lib/use-profile";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { tx } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/tutor/$conversationId")({
  head: () => ({ meta: [{ title: "Chat — ScienceKH" }] }),
  component: ChatPage,
});

type Msg = { id: string; role: string; content: string };

function ChatPage() {
  const { conversationId } = Route.useParams();
  const { lang } = useProfile();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const ask = useServerFn(askTutor);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: conv } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: async () => {
      const { data } = await supabase
        .from("ai_conversations")
        .select("id, title")
        .eq("id", conversationId)
        .maybeSingle();
      return data;
    },
  });

  const { data: messages } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_messages")
        .select("id, role, content")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as Msg[];
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = useMutation({
    mutationFn: async (userMessage: string) => {
      return ask({ data: { conversationId, userMessage, language: lang } });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["messages", conversationId] });
      qc.invalidateQueries({ queryKey: ["conversation", conversationId] });
      qc.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not send"),
  });

  function handleSend() {
    const txt = input.trim();
    if (!txt || send.isPending) return;
    setInput("");
    // optimistic
    qc.setQueryData<Msg[]>(["messages", conversationId], (old) => [
      ...(old ?? []),
      { id: `tmp-${Date.now()}`, role: "user", content: txt },
    ]);
    send.mutate(txt);
  }

  return (
    <PageShell back="/tutor" title={conv?.title ?? "Chat"}>
      <div
        ref={scrollRef}
        className="mx-auto w-full max-w-md flex-1 overflow-y-auto px-6 pt-4 pb-44"
        style={{ minHeight: "calc(100vh - 220px)" }}
      >
        {(!messages || messages.length === 0) && (
          <div className="grid place-items-center py-12 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <p className="mt-4 font-display text-lg font-semibold">
              {lang === "km" ? "សួរសំណួរដំបូងរបស់អ្នក" : "Ask your first question"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {lang === "km" ? "ឧ. ហេតុអ្វីមេឃមានពណ៌ខៀវ?" : "e.g. Why is the sky blue?"}
            </p>
          </div>
        )}
        <ul className="space-y-3">
          {(messages ?? []).map((m) => (
            <li
              key={m.id}
              className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground",
                )}
              >
                {m.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none prose-p:my-2 prose-headings:font-display">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  m.content
                )}
              </div>
            </li>
          ))}
          {send.isPending && (
            <li className="flex justify-start">
              <div className="rounded-2xl border border-border bg-card px-4 py-2.5">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </li>
          )}
        </ul>
      </div>

      <form
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <div className="mx-auto flex w-full max-w-md gap-2 px-4 py-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tx(lang, "sendMessage")}
            className="h-12 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none focus:border-primary"
          />
          <Button
            type="submit"
            size="icon"
            className="h-12 w-12 shrink-0 rounded-full"
            disabled={!input.trim() || send.isPending}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </form>
    </PageShell>
  );
}
