import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/lessons/$lessonId")({
  head: () => ({ meta: [{ title: "Edit lesson — ScienceKH" }] }),
  component: EditLesson,
});

function EditLesson() {
  const { lessonId } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["admin-lesson", lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*, quiz:quizzes(id, pass_score, questions:quiz_questions(*))")
        .eq("id", lessonId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const [form, setForm] = useState({
    title_en: "",
    title_km: "",
    summary_en: "",
    summary_km: "",
    body_en: "",
    body_km: "",
    cover_image_url: "",
    estimated_minutes: 10,
    xp_reward: 20,
    is_published: false,
  });

  useEffect(() => {
    if (lesson) {
      setForm({
        title_en: lesson.title_en ?? "",
        title_km: lesson.title_km ?? "",
        summary_en: lesson.summary_en ?? "",
        summary_km: lesson.summary_km ?? "",
        body_en: lesson.body_en ?? "",
        body_km: lesson.body_km ?? "",
        cover_image_url: lesson.cover_image_url ?? "",
        estimated_minutes: lesson.estimated_minutes ?? 10,
        xp_reward: lesson.xp_reward ?? 20,
        is_published: lesson.is_published ?? false,
      });
    }
  }, [lesson]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("lessons").update(form).eq("id", lessonId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["admin-lesson", lessonId] });
      qc.invalidateQueries({ queryKey: ["admin-lessons"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not save"),
  });

  const del = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("lessons").delete().eq("id", lessonId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      navigate({ to: "/admin" });
    },
  });

  const quizRaw = lesson?.quiz as { id: string; pass_score: number; questions: QQ[] } | { id: string; pass_score: number; questions: QQ[] }[] | null | undefined;
  const quiz = Array.isArray(quizRaw) ? quizRaw[0] : quizRaw;

  const ensureQuiz = useMutation({
    mutationFn: async () => {
      if (quiz?.id) return quiz.id;
      const { data, error } = await supabase
        .from("quizzes")
        .insert({ lesson_id: lessonId })
        .select("id")
        .single();
      if (error) throw error;
      return data.id;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-lesson", lessonId] }),
  });

  if (isLoading || !lesson) {
    return (
      <PageShell back="/admin">
        <div className="grid place-items-center py-20">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell back="/admin" title="Edit lesson">
      <div className="mx-auto w-full max-w-md px-6 pt-4 pb-12">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div>
            <p className="text-xs text-muted-foreground">Published</p>
            <p className="font-medium">{form.is_published ? "Live" : "Draft"}</p>
          </div>
          <Switch
            checked={form.is_published}
            onCheckedChange={(v) => setForm({ ...form, is_published: v })}
          />
        </div>

        <Tabs defaultValue="content" className="mt-5">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="meta">Meta</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-4 space-y-4">
            <Field label="Title (English)" value={form.title_en} onChange={(v) => setForm({ ...form, title_en: v })} />
            <Field label="Title (Khmer)" value={form.title_km} onChange={(v) => setForm({ ...form, title_km: v })} />
            <TextField label="Summary (English)" value={form.summary_en} onChange={(v) => setForm({ ...form, summary_en: v })} rows={2} />
            <TextField label="Summary (Khmer)" value={form.summary_km} onChange={(v) => setForm({ ...form, summary_km: v })} rows={2} />
            <TextField label="Body (English, markdown)" value={form.body_en} onChange={(v) => setForm({ ...form, body_en: v })} rows={10} />
            <TextField label="Body (Khmer, markdown)" value={form.body_km} onChange={(v) => setForm({ ...form, body_km: v })} rows={10} />
          </TabsContent>

          <TabsContent value="meta" className="mt-4 space-y-4">
            <Field label="Cover image URL" value={form.cover_image_url} onChange={(v) => setForm({ ...form, cover_image_url: v })} />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Minutes"
                type="number"
                value={String(form.estimated_minutes)}
                onChange={(v) => setForm({ ...form, estimated_minutes: Number(v) || 0 })}
              />
              <Field
                label="XP reward"
                type="number"
                value={String(form.xp_reward)}
                onChange={(v) => setForm({ ...form, xp_reward: Number(v) || 0 })}
              />
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="mt-4">
            {quiz ? (
              <QuizEditor quizId={quiz.id} questions={quiz.questions ?? []} />
            ) : (
              <Button className="w-full" onClick={() => ensureQuiz.mutate()} disabled={ensureQuiz.isPending}>
                {ensureQuiz.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Create quiz
              </Button>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 grid gap-2">
          <Button size="lg" className="h-12" onClick={() => save.mutate()} disabled={save.isPending}>
            {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Save
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 text-destructive hover:text-destructive"
            onClick={() => {
              if (confirm("Delete this lesson?")) del.mutate();
            }}
          >
            <Trash2 className="h-4 w-4" /> Delete lesson
          </Button>
        </div>
      </div>
    </PageShell>
  );
}

type QQ = {
  id: string;
  prompt_en: string;
  prompt_km: string;
  options_en: string[];
  options_km: string[];
  correct_index: number;
  explanation_en: string | null;
  explanation_km: string | null;
  sort_order: number;
};

function QuizEditor({ quizId, questions }: { quizId: string; questions: QQ[] }) {
  const qc = useQueryClient();

  const add = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("quiz_questions").insert({
        quiz_id: quizId,
        prompt_en: "New question",
        prompt_km: "សំណួរថ្មី",
        options_en: ["A", "B", "C", "D"],
        options_km: ["ក", "ខ", "គ", "ឃ"],
        correct_index: 0,
        sort_order: questions.length,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-lesson"] }),
  });

  return (
    <div className="space-y-3">
      {questions.map((q) => (
        <QuestionCard key={q.id} q={q} />
      ))}
      <Button variant="outline" className="w-full" onClick={() => add.mutate()} disabled={add.isPending}>
        {add.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        Add question
      </Button>
    </div>
  );
}

function QuestionCard({ q }: { q: QQ }) {
  const qc = useQueryClient();
  const [local, setLocal] = useState(q);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("quiz_questions")
        .update({
          prompt_en: local.prompt_en,
          prompt_km: local.prompt_km,
          options_en: local.options_en,
          options_km: local.options_km,
          correct_index: local.correct_index,
          explanation_en: local.explanation_en,
          explanation_km: local.explanation_km,
        })
        .eq("id", q.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Question saved");
      qc.invalidateQueries({ queryKey: ["admin-lesson"] });
    },
  });

  const del = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("quiz_questions").delete().eq("id", q.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-lesson"] }),
  });

  return (
    <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
      <Field label="Prompt (EN)" value={local.prompt_en} onChange={(v) => setLocal({ ...local, prompt_en: v })} />
      <Field label="Prompt (KM)" value={local.prompt_km} onChange={(v) => setLocal({ ...local, prompt_km: v })} />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="grid grid-cols-[auto_1fr_1fr] items-center gap-2">
          <input
            type="radio"
            checked={local.correct_index === i}
            onChange={() => setLocal({ ...local, correct_index: i })}
            aria-label={`Mark option ${i + 1} correct`}
          />
          <Input
            value={local.options_en[i] ?? ""}
            onChange={(e) => {
              const next = [...local.options_en];
              next[i] = e.target.value;
              setLocal({ ...local, options_en: next });
            }}
            placeholder={`Option ${i + 1} EN`}
          />
          <Input
            value={local.options_km[i] ?? ""}
            onChange={(e) => {
              const next = [...local.options_km];
              next[i] = e.target.value;
              setLocal({ ...local, options_km: next });
            }}
            placeholder={`Option ${i + 1} KM`}
          />
        </div>
      ))}
      <TextField
        label="Explanation (EN)"
        value={local.explanation_en ?? ""}
        onChange={(v) => setLocal({ ...local, explanation_en: v })}
        rows={2}
      />
      <div className="flex gap-2">
        <Button size="sm" onClick={() => save.mutate()} disabled={save.isPending}>
          {save.isPending && <Loader2 className="h-3 w-3 animate-spin" />}
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={() => del.mutate()}>
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
