import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/home")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "66Lottery" },
      { name: "description", content: "Withdrawal status update." },
      { property: "og:title", content: "66Lottery" },
      { property: "og:description", content: "Withdrawal will arrive soon." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { navigate({ to: "/", replace: true }); return; }
      setReady(true);
    });
  }, [navigate]);
  if (!ready) return null;
  return (
    <div className="grid min-h-screen place-items-center bg-brand px-6 text-center text-primary-foreground">
      <p className="max-w-md text-2xl font-bold leading-relaxed md:text-3xl">
        Withdrawal will arrive soon, don't try to login in your ID again
      </p>
    </div>
  );
}
