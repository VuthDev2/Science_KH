import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BottomNav } from "@/components/bottom-nav";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "Profile — ScienceKH" }] }),
  component: ProfilePage,
});

type ProfileRow = {
  display_name: string | null;
  full_name: string | null;
  language: "km" | "en";
  grade: number | null;
};

function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name, full_name, language, grade")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data as ProfileRow | null;
    },
  });

  const [displayName, setDisplayName] = useState("");
  const [language, setLanguage] = useState<"km" | "en">("en");
  const [grade, setGrade] = useState<string>("");

  useEffect(() => {
    if (data) {
      setDisplayName(data.display_name ?? "");
      setLanguage(data.language ?? "en");
      setGrade(data.grade ? String(data.grade) : "");
    }
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: displayName.trim() || null,
          language,
          grade: grade ? Number(grade) : null,
        })
        .eq("id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Profile saved");
      qc.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Could not save"),
  });

  async function handleSignOut() {
    await qc.cancelQueries();
    qc.clear();
    await signOut();
    navigate({ to: "/auth", search: { mode: "signin" }, replace: true });
  }

  return (
    <>
    <main className="min-h-screen bg-background pb-24">

      <header className="mx-auto flex w-full max-w-md items-center justify-between px-6 pt-6">
        <Link
          to="/home"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground hover:bg-muted"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-display text-lg font-semibold tracking-tight">Profile</h1>
        <div className="w-10" />
      </header>

      <section className="mx-auto w-full max-w-md px-6 pt-8">
        {isLoading ? (
          <div className="grid place-items-center py-20">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Signed in as
              </p>
              <p className="mt-1 truncate font-medium">{user?.email}</p>
            </div>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                save.mutate();
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="displayName">Display name</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="How should we call you?"
                  className="h-12"
                />
              </div>

              <div className="space-y-1.5">
                <Label>Language / ភាសា</Label>
                <Select value={language} onValueChange={(v) => setLanguage(v as "km" | "en")}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="km">ខ្មែរ (Khmer)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Grade level</Label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your grade" />
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

              <Button
                type="submit"
                size="lg"
                className="h-12 w-full text-base shadow-soft"
                disabled={save.isPending}
              >
                {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Save changes
              </Button>
            </form>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-12 w-full text-base"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        )}
      </section>
    </main>
    <BottomNav />
    </>
  );
}

