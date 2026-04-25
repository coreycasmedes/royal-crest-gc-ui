import React, { useState } from "react";
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

export default function SignupForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    first: "", last: "", email: "", phone: "", service: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl shadow-input mx-auto w-full bg-white p-4 md:rounded-2xl md:p-8">
        <h2 className="text-xl font-bold text-neutral-800">Message Received</h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600">
          We'll be in touch within one business day.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-xs font-semibold tracking-widest uppercase pb-0.5 border-b border-neutral-800 text-neutral-800"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div className="shadow-input mx-auto w-full rounded-2xl bg-white p-4 md:p-8">
      <h2 className="text-xl font-bold text-neutral-800">
        Request a Free Estimate
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600">
        Fill out the form and we'll get back to you within one business day.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="James"
              type="text"
              required
              value={form.first}
              onChange={e => setForm({ ...form, first: e.target.value })}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Anderson"
              type="text"
              required
              value={form.last}
              onChange={e => setForm({ ...form, last: e.target.value })}
            />
          </LabelInputContainer>
        </div>

        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              placeholder="james@example.com"
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              placeholder="(469) 432-0341"
              type="tel"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="service">Service needed</Label>
          <select
            id="service"
            value={form.service}
            onChange={e => setForm({ ...form, service: e.target.value })}
            className="shadow-input flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>Select a service…</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
        >
          Send Request &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

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
