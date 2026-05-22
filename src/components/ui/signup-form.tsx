import React, { useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "motion/react";
import { IconVideo } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const services = [
  "Custom Home Build",
  "Kitchen Remodel",
  "Bathroom Renovation",
  "Home Addition",
  "Roofing & Exterior",
  "Commercial Construction",
  "Other",
];

const detailsPlaceholder: Record<string, string> = {
  "Custom Home Build":
    "Tell us about your lot, desired square footage, style, and timeline…",
  "Kitchen Remodel":
    "Describe your current kitchen layout and what you'd like changed (cabinets, countertops, layout, etc.)…",
  "Bathroom Renovation":
    "Full gut or cosmetic update? Any specific fixtures, tile, or layout changes in mind?",
  "Home Addition":
    "What type of addition — bedroom, garage, ADU? Approximate square footage?",
  "Roofing & Exterior":
    "New install, repair, or replacement? Any storm damage or specific materials you're considering?",
  "Commercial Construction":
    "Describe the project type, scope, and any deadlines or zoning considerations…",
  Other:
    "Tell us what you have in mind and we'll point you in the right direction…",
};

const RL_KEY     = "rcgc_submissions";
const COOLDOWN   = 5 * 60 * 1000;   // 5 minutes between submissions
const DAILY_MAX  = 3;                // max submissions per 24-hour window
const DAY        = 24 * 60 * 60 * 1000;

function getTimestamps(): number[] {
  try {
    return JSON.parse(localStorage.getItem(RL_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function hasRecentSubmission(): boolean {
  const now  = Date.now();
  const logs = getTimestamps().filter((t) => now - t < DAY);
  if (logs.length >= DAILY_MAX) return true;
  const last = logs.at(-1);
  return !!(last && now - last < COOLDOWN);
}

function recordSubmission() {
  const now  = Date.now();
  const logs = getTimestamps().filter((t) => now - t < DAY);
  localStorage.setItem(RL_KEY, JSON.stringify([...logs, now]));
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function isValidUSPhone(v: string) {
  const d = v.replace(/\D/g, "");
  return d.length === 10 && /^[2-9]/.test(d) && /^[2-9]/.test(d[3]);
}

export default function SignupForm() {
  const [sent, setSent] = useState(() => hasRecentSubmission());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({ email: false, phone: false });
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const emailError =
    touched.email && !isValidEmail(form.email)
      ? "Enter a valid email address."
      : "";
  const phoneError =
    touched.phone && form.phone && !isValidUSPhone(form.phone)
      ? "Enter a valid US phone number."
      : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ email: true, phone: true });
    if (
      !isValidEmail(form.email) ||
      (form.phone && !isValidUSPhone(form.phone))
    )
      return;

    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    setLoading(false);
    if (data.success) {
      recordSubmission();
      setSent(true);
    } else {
      setError(data.message ?? "Something went wrong. Please try again.");
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl shadow-input mx-auto w-full bg-bg p-4 md:rounded-2xl md:p-8">
        <h2 className="text-xl font-bold text-text">Request Received</h2>
        <p className="mt-2 text-sm text-text/60">
          We received your request and will get back to you within one business day.
        </p>
        <p className="mt-3 text-sm text-text/60">
          If this is an emergency, please call us directly at{" "}
          <a
            href="tel:4694320341"
            className="text-text font-medium hover:text-accent transition-colors duration-200"
          >
            (469) 432 0341
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="shadow-input mx-auto w-full rounded-2xl bg-bg p-4 md:p-8">
      <h2 className="flex flex-wrap items-center gap-2.5 text-xl font-bold text-text">
        Request a Free Estimate
        <div className="flex-shrink-0 inline-flex items-center gap-1.5 border border-surface rounded-2xl px-2 py-0.5 font-light text-xs text-text/60">
          <IconVideo className="h-4 w-4 text-accent flex-shrink-0" />
          <span className="whitespace-nowrap">Online Available</span>
        </div>
      </h2>
      <p className="mt-2 max-w-sm text-sm text-text/60">
        Fill out the form and we'll get back to you within one business day.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="access_key"
          value="459de2ed-ea1d-4fb0-9618-ba87e8f7c47a"
        />
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              name="first_name"
              placeholder="James"
              type="text"
              required
              value={form.first}
              onChange={(e) => setForm({ ...form, first: e.target.value })}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              name="last_name"
              placeholder="Anderson"
              type="text"
              required
              value={form.last}
              onChange={(e) => setForm({ ...form, last: e.target.value })}
            />
          </LabelInputContainer>
        </div>

        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              placeholder="james@example.com"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            />
            <FieldError message={emailError} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="(469) 432-0341"
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: formatPhone(e.target.value) })
              }
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            />
            <FieldError message={phoneError} />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="service">Service needed</Label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="shadow-input flex h-10 w-full rounded-md border-none bg-bg px-3 py-2 text-sm text-text placeholder:text-text/40 focus-visible:ring-[2px] focus-visible:ring-text/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>
              Select a service…
            </option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </LabelInputContainer>

        <AnimatePresence>
          {form.service && (
            <motion.div
              key="details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <LabelInputContainer className="mb-8">
                <Label htmlFor="message">Project details</Label>
                <TextareaInput
                  id="message"
                  name="message"
                  rows={4}
                  placeholder={detailsPlaceholder[form.service]}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </LabelInputContainer>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={loading}
          className="group/btn relative block h-10 w-full rounded-md bg-deep font-medium text-bg hover:bg-accent transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Sending…" : "Send Request →"}
          <BottomGradient />
        </button>
        {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
      </form>
    </div>
  );
}

const FieldError = ({ message }: { message: string }) => (
  <AnimatePresence>
    {message && (
      <motion.p
        key="err"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.15 }}
        className="text-xs text-red-600"
      >
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const TextareaInput = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`radial-gradient(${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px, var(--color-accent), transparent 80%)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input rounded-lg p-[2px] transition duration-300"
    >
      <textarea
        {...props}
        className={cn(
          "shadow-input flex w-full rounded-md border-none bg-bg px-3 py-2 text-sm text-text transition duration-400 group-hover/input:shadow-none",
          "placeholder:text-text/40",
          "focus-visible:ring-[2px] focus-visible:ring-accent focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-none",
        )}
      />
    </motion.div>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
