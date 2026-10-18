import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, btnPrimary } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/home")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My account — 66Lottery" },
      { name: "description", content: "Your 66Lottery account." },
      { property: "og:title", content: "My account — 66Lottery" },
      { property: "og:description", content: "Your 66Lottery account." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [who, setWho] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { navigate({ to: "/", replace: true }); return; }
      setWho((data.user.user_metadata?.["phone"] as string) || data.user.email || "");
    });
  }, [navigate]);
  if (who === null) return null;
  return (
    <AuthShell title="Welcome" subtitle={`Signed in as ${who}`}>
      <div className="px-6 pt-6">
        <button className={btnPrimary} onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/", replace: true }); }}>Log out</button>
      </div>
    </AuthShell>
  );
}
