import { Link } from "@tanstack/react-router";
import { ChevronLeft, Headset, ShieldCheck, Zap, Gift } from "lucide-react";
import type { ReactNode } from "react";
import logo from "@/assets/bg678-logo.png";

export const phoneToEmail = (cc: string, phone: string) =>
  `p${cc.replace(/\D/g, "")}${phone.replace(/\D/g, "")}@phone.users.app`;

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <img src={logo} alt="BG678 logo" width={40} height={40} className="h-9 w-9 rounded-full lg:h-11 lg:w-11" />
      <span className="text-[10px] font-semibold uppercase tracking-widest opacity-90 lg:text-xs">Maintenance</span>
      <span className="text-2xl font-extrabold italic tracking-tight lg:text-3xl">66<span className="text-lg lg:text-xl">Lottery</span></span>
    </span>
  );
}

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-cols-2">
      {/* Brand panel (tablet/desktop) */}
      <aside className="relative hidden overflow-hidden bg-brand p-10 text-primary-foreground md:flex md:flex-col md:justify-between lg:p-16">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-foreground/10" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-primary-foreground/10" />
        <div className="relative flex items-center justify-between">
          <Logo />
          <span className="text-sm font-medium">🇺🇸 EN</span>
        </div>
        <div className="relative">
          <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Play smart.<br />Win big.</h2>
          <p className="mt-4 max-w-sm text-base opacity-95">Log in with your phone number or email to continue where you left off.</p>
          <ul className="mt-10 space-y-4 text-base">
            {[{ i: ShieldCheck, t: "Secure account protection" }, { i: Zap, t: "Instant deposits & withdrawals" }, { i: Gift, t: "Daily bonuses and rewards" }].map(({ i: I, t }) => (
              <li key={t} className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-foreground/20"><I className="h-5 w-5" /></span>{t}</li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm opacity-80">© 66Lottery</p>
      </aside>

      {/* Form side */}
      <div className="md:flex md:items-center md:justify-center md:p-8">
        <div className="mx-auto w-full max-w-md md:max-w-lg md:overflow-hidden md:rounded-3xl md:bg-card md:shadow-xl">
          <header className="bg-brand px-5 pb-10 pt-4 text-primary-foreground md:bg-none md:bg-card md:px-8 md:pb-2 md:pt-8 md:text-foreground">
            <div className="flex items-center justify-between md:hidden">
              <Link to="/" aria-label="Back"><ChevronLeft className="h-6 w-6" /></Link>
              <Logo />
              <span className="text-sm font-medium">🇺🇸 EN</span>
            </div>
            <h1 className="mt-6 text-3xl font-bold md:mt-0 md:text-primary">{title}</h1>
            <p className="mt-3 text-sm leading-relaxed opacity-95 md:text-muted-foreground">{subtitle}</p>
          </header>
          <main className="px-4 pb-24 pt-4 md:px-8 md:pb-8">{children}</main>
        </div>
      </div>
      <a href="#" aria-label="Customer service" className="fixed bottom-8 right-6 grid h-14 w-14 place-items-center rounded-full bg-card text-primary shadow-lg">
        <Headset className="h-8 w-8" />
      </a>
    </div>
  );
}

export const inputCls = "h-12 w-full rounded-lg bg-card px-4 text-base text-foreground shadow-sm outline-none ring-1 ring-input placeholder:text-muted-foreground focus:ring-2 focus:ring-ring md:bg-background";
export const btnPrimary = "h-12 w-full rounded-full bg-brand text-lg font-bold text-primary-foreground shadow-brand transition active:translate-y-1 active:shadow-none disabled:opacity-60";
export const btnOutline = "flex h-12 w-full items-center justify-center rounded-full border border-primary text-lg font-bold text-primary";
