import { createFileRoute } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — 66Lottery" },
      { name: "description", content: "Create an account with your phone number or email." },
      { property: "og:title", content: "Register — 66Lottery" },
      { property: "og:description", content: "Create an account with your phone number or email." },
    ],
  }),
  component: () => (
    <AuthShell title="Register" subtitle="Please register with your phone number or email">
      <AuthForm mode="register" />
    </AuthShell>
  ),
});
