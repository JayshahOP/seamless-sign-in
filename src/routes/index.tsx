import { createFileRoute } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Log in — 66Lottery" },
      { name: "description", content: "Log in with your phone number or email." },
      { property: "og:title", content: "Log in — 66Lottery" },
      { property: "og:description", content: "Log in with your phone number or email." },
    ],
  }),
  component: () => (
    <AuthShell title="Log in" subtitle="Please log in with your phone number or email">
      <AuthForm />
    </AuthShell>
  ),
});
