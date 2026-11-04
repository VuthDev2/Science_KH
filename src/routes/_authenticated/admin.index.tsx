import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BookOpen, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { PageShell } from "@/components/page-shell";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({ meta: [{ title: "Admin — ScienceKH" }] }),
  component: AdminIndex,
});

function AdminIndex() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [titleEn, setTitleEn] = useState("");
  const [titleKm, setTitleKm] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [grade, setGrade] = useState("7");

  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const { data } = await supabase
        .from("subjects")
        .select("id, slug, name_en, name_km")
        .order("sort_order");
      return data ?? [];
    },
  });

  const { data: lessons, isLoading } = useQuery({
    queryKey: ["admin-lessons"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("id, title_en, title_km, grade, is_published, subject:subjects(name_en)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      if (!subjectId) throw new Error("Pick a subject");
      const { data, error } = await supabase
        .from("lessons")
        .insert({
          title_en: titleEn,
          title_km: titleKm || titleEn,
          subject_id: subjectId,
          grade: Number(grade),
          created_by: user?.id ?? null,
        })
        .select("id")
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Lesson created");
      setOpen(false);
      setTitleEn("");
      setTitleKm("");
      qc.invalidateQueries({ queryKey: ["admin-lessons"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not create"),
  });

  return (
    <>
      <PageShell back="/home" title="Admin">
        <section className="mx-auto w-full max-w-md px-6 pt-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold">Manage lessons</p>
                <p className="text-xs text-muted-foreground">{lessons?.length ?? 0} total</p>
              </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4 h-11 w-full">
                  <Plus className="h-4 w-4" /> New lesson
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New lesson</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label>Title (English)</Label>
                    <Input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Title (Khmer)</Label>
                    <Input value={titleKm} onChange={(e) => setTitleKm(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Subject</Label>
                    <Select value={subjectId} onValueChange={setSubjectId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pick subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {(subjects ?? []).map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name_en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Grade</Label>
                    <Select value={grade} onValueChange={setGrade}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[7, 8, 9, 10, 11, 12].map((g) => (
                          <SelectItem key={g} value={String(g)}>
                            Grade {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => create.mutate()} disabled={create.isPending || !titleEn || !subjectId}>
                    {create.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <ul className="mt-6 space-y-2">
            {isLoading
              ? [...Array(3)].map((_, i) => (
                  <li key={i} className="h-16 animate-pulse rounded-2xl bg-muted" />
                ))
              : (lessons ?? []).map((l) => (
                  <li key={l.id}>
                    <Link
                      to="/admin/lessons/$lessonId"
                      params={{ lessonId: l.id }}
                      className="block rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-medium">{l.title_en}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {l.subject?.name_en} · Grade {l.grade}
                          </p>
                        </div>
                        <span
                          className={
                            "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider " +
                            (l.is_published
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-800")
                          }
                        >
                          {l.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
          </ul>
        </section>
      </PageShell>
      <BottomNav />
    </>
  );
}
