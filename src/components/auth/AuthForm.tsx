import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail, Smartphone, CheckCircle2, Circle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { btnOutline, btnPrimary, inputCls, phoneToEmail } from "./AuthShell";

type Mode = "login" | "register";

export function AuthForm({ mode }: { mode: Mode }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"phone" | "email">("phone");
  const [cc, setCc] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (mode !== "login") return undefined;
    const saved = localStorage.getItem("remember_login");
    if (saved) {
      const s = JSON.parse(saved);
      setTab(s.tab); setCc(s.cc ?? "+91"); setPhone(s.phone ?? ""); setEmail(s.email ?? "");
    }
    return undefined;
  }, [mode]);

  const submit = async (e: React.FormEvent): Promise<unknown> => {
    e.preventDefault();
    let loginEmail = "";
    if (tab === "phone") {
      if (!/^\d{7,15}$/.test(phone)) return toast.error("Enter a valid phone number");
      loginEmail = phoneToEmail(cc, phone);
    } else {
      const r = z.string().trim().email().max(255).safeParse(email);
      if (!r.success) return toast.error("Enter a valid email");
      loginEmail = r.data;
    }
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    if (mode === "register" && password !== confirm) return toast.error("Passwords do not match");

    setBusy(true);
    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email: loginEmail, password })
        : await supabase.auth.signUp({
            email: loginEmail, password,
            options: { emailRedirectTo: window.location.origin, data: tab === "phone" ? { phone: `${cc}${phone}` } : {} },
          });
    setBusy(false);
    if (error) return toast.error(error.message.replace(/email/gi, tab === "phone" ? "phone" : "email"));
    if (mode === "login") {
      if (remember) localStorage.setItem("remember_login", JSON.stringify({ tab, cc, phone, email }));
      else localStorage.removeItem("remember_login");
    }
    toast.success(mode === "login" ? "Logged in" : "Account created");
    navigate({ to: "/home" });
    return undefined;
  };

  const Tab = ({ id, icon: Icon, label }: { id: "phone" | "email"; icon: typeof Mail; label: string }) => (
    <button type="button" onClick={() => setTab(id)}
      className={`flex flex-1 flex-col items-center gap-2 border-b-2 pb-3 ${tab === id ? "border-primary text-primary" : "border-input text-muted-foreground"}`}>
      <Icon className="h-9 w-9" /> <span className="text-base">{label}</span>
    </button>
  );

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex px-2">
        <Tab id="phone" icon={Smartphone} label={mode === "login" ? "Log in with phone" : "Register with phone"} />
        <Tab id="email" icon={Mail} label={mode === "login" ? "Email login" : "Email register"} />
      </div>

      {tab === "phone" ? (
        <div>
          <label className="mb-2 mt-4 flex items-center gap-2 text-base"><Smartphone className="h-6 w-6 text-primary" />Phone number</label>
          <div className="flex gap-2">
            <select value={cc} onChange={(e) => setCc(e.target.value)} className={`${inputCls} !w-24 shrink-0 text-center`}>
              {["+91", "+1", "+44", "+971", "+92", "+880"].map((c) => <option key={c}>{c}</option>)}
            </select>
            <input inputMode="numeric" placeholder="Please enter the phone number" value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))} className={inputCls} />
          </div>
        </div>
      ) : (
        <div>
          <label className="mb-2 mt-4 flex items-center gap-2 text-base"><Mail className="h-6 w-6 text-primary" />Mail</label>
          <input type="email" placeholder="Please input your email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
      )}

      <div>
        <label className="mb-2 flex items-center gap-2 text-base"><Lock className="h-6 w-6 text-primary" />Password</label>
        <div className="relative">
          <input type={show ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputCls} pr-12`} />
          <button type="button" onClick={() => setShow(!show)} aria-label="Toggle password" className="absolute right-3 top-3 text-muted-foreground">
            {show ? <Eye /> : <EyeOff />}
          </button>
        </div>
      </div>

      {mode === "register" && (
        <div>
          <label className="mb-2 flex items-center gap-2 text-base"><Lock className="h-6 w-6 text-primary" />Confirm password</label>
          <input type={show ? "text" : "password"} placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} />
        </div>
      )}

      {mode === "login" && (
        <div className="flex items-center justify-between py-2">
          <button type="button" onClick={() => setRemember(!remember)} className="flex items-center gap-2">
            {remember ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
            Remember password
          </button>
          <button type="button" className="text-primary" onClick={() => toast.info("Please contact customer service to reset your password")}>Forgot password</button>
        </div>
      )}

      <div className="space-y-4 px-6 pt-4">
        <button disabled={busy} className={btnPrimary}>{busy ? "Please wait…" : mode === "login" ? "Log in" : "Register"}</button>
        {mode === "login"
          ? <Link to="/register" className={btnOutline}>Register</Link>
          : <Link to="/" className={btnOutline}>I have an account, Log in</Link>}
      </div>
    </form>
  );
}
