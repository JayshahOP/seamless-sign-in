import { Link } from "@tanstack/react-router";
import { ChevronLeft, Headset } from "lucide-react";
import type { ReactNode } from "react";

export const phoneToEmail = (cc: string, phone: string) =>
  `p${cc.replace(/\D/g, "")}${phone.replace(/\D/g, "")}@phone.users.app`;

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md">
        <header className="bg-brand px-5 pb-10 pt-4 text-primary-foreground">
          <div className="flex items-center justify-between">
            <Link to="/" aria-label="Back"><ChevronLeft className="h-6 w-6" /></Link>
            <span className="text-2xl font-extrabold italic tracking-tight">66<span className="text-lg">Lottery</span></span>
            <span className="text-sm font-medium">🇺🇸 EN</span>
          </div>
          <h1 className="mt-6 text-3xl font-bold">{title}</h1>
          <p className="mt-3 text-sm leading-relaxed opacity-95">{subtitle}</p>
        </header>
        <main className="px-4 pb-24 pt-4">{children}</main>
      </div>
      <a href="#" aria-label="Customer service" className="fixed bottom-8 right-6 grid h-14 w-14 place-items-center rounded-full bg-card text-primary shadow-lg">
        <Headset className="h-8 w-8" />
      </a>
    </div>
  );
}

export const inputCls = "h-12 w-full rounded-lg bg-card px-4 text-base text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring";
export const btnPrimary = "h-12 w-full rounded-full bg-brand text-lg font-bold text-primary-foreground shadow-brand transition active:translate-y-1 active:shadow-none disabled:opacity-60";
export const btnOutline = "flex h-12 w-full items-center justify-center rounded-full border border-primary text-lg font-bold text-primary";
