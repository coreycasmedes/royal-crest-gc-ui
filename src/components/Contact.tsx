import { useState } from 'react';
import { useInView } from '../hooks/useInView';

const services = [
  'Custom Home Build',
  'Kitchen Remodel',
  'Bathroom Renovation',
  'Home Addition',
  'Roofing & Exterior',
  'Commercial Construction',
  'Other',
];

const infoItems = [
  {
    label: 'Phone',
    value: '(214) 555-0187',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.17h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'info@royalcrestgc.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Address',
    value: '1845 Oak Lawn Ave\nDallas, TX 75219',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'License',
    value: 'TX GC #12-48276\nFully Bonded & Insured',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const hours = [
  { day: 'Mon – Fri',  time: '7:00 AM – 6:00 PM' },
  { day: 'Saturday',   time: '8:00 AM – 4:00 PM' },
  { day: 'Sunday',     time: 'By Appointment'     },
];

export default function Contact() {
  const { ref: headRef, inView: headIn } = useInView();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ first: '', last: '', email: '', phone: '', service: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputBase = `w-full px-4 py-3.5 text-[0.9rem] text-ink rounded-sm outline-none transition-colors placeholder:text-faint`;
  const inputStyle = { background: 'var(--color-card)', border: '1px solid var(--color-gold-border)' };

  return (
    <section id="contact" className="py-24 lg:py-28" style={{ background: 'var(--color-dark)' }}>
      <div className="max-w-[1260px] mx-auto px-6">

        {/* Header */}
        <div ref={headRef} className={`mb-14 reveal ${headIn ? 'visible' : ''}`}>
          <p className="label">Get In Touch</p>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-ink leading-tight">
            Start Your Project Today
          </h2>
          <p className="mt-3 text-muted max-w-md leading-relaxed">
            Fill out the form and we'll get back to you within one business day with a free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Form */}
          {sent ? (
            <div
              className="flex flex-col items-center text-center gap-4 p-12 rounded-xl border"
              style={{ background: 'var(--color-gold-dim)', borderColor: 'var(--color-gold-border)' }}
            >
              <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-content text-dark text-2xl flex-shrink-0">
                <span className="m-auto">✓</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-ink">Message Received!</h3>
              <p className="text-muted text-[0.9rem]">
                Thank you for reaching out. A member of our team will contact you within one business day.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 text-[0.8rem] font-bold tracking-widest uppercase text-gold border border-gold-border px-6 py-2.5 rounded-sm hover:border-gold transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted mb-2">First Name</label>
                  <input
                    required
                    className={inputBase}
                    style={inputStyle}
                    placeholder="James"
                    value={form.first}
                    onChange={e => setForm({ ...form, first: e.target.value })}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                    onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-gold-border)')}
                  />
                </div>
                <div>
                  <label className="block text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted mb-2">Last Name</label>
                  <input
                    required
                    className={inputBase}
                    style={inputStyle}
                    placeholder="Anderson"
                    value={form.last}
                    onChange={e => setForm({ ...form, last: e.target.value })}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                    onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-gold-border)')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className={inputBase}
                    style={inputStyle}
                    placeholder="james@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                    onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-gold-border)')}
                  />
                </div>
                <div>
                  <label className="block text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted mb-2">Phone</label>
                  <input
                    type="tel"
                    className={inputBase}
                    style={inputStyle}
                    placeholder="(214) 555-0100"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                    onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-gold-border)')}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted mb-2">Service Needed</label>
                <select
                  className={`${inputBase} appearance-none`}
                  style={inputStyle}
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                  onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-gold-border)')}
                >
                  <option value="" disabled>Select a service…</option>
                  {services.map(s => <option key={s} value={s} style={{ background: 'var(--color-card)' }}>{s}</option>)}
                </select>
              </div>

              <div className="mb-5">
                <label className="block text-[0.72rem] font-bold tracking-[0.12em] uppercase text-muted mb-2">Project Details</label>
                <textarea
                  className={`${inputBase} resize-y min-h-[130px]`}
                  style={inputStyle}
                  placeholder="Tell us about your project, timeline, and any specific requirements…"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                  onBlur={e  => (e.currentTarget.style.borderColor = 'var(--color-gold-border)')}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 text-[0.82rem] font-bold tracking-[0.08em] uppercase rounded-sm bg-gold text-dark border border-gold hover:bg-gold-light hover:border-gold-light transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,168,76,0.35)]"
              >
                Send Message →
              </button>
            </form>
          )}

          {/* Info panel */}
          <div>
            <div className="flex flex-col divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {infoItems.map(({ label, value, icon }) => (
                <div key={label} className="flex gap-4 py-5 first:pt-0">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-sm flex-shrink-0 text-gold border"
                    style={{ background: 'var(--color-gold-dim)', borderColor: 'var(--color-gold-border)' }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-faint mb-1">{label}</p>
                    <p className="text-[0.92rem] text-ink leading-relaxed whitespace-pre-line">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div
              className="rounded-xl p-6 mt-8 border"
              style={{ background: 'var(--color-card)', borderColor: 'var(--color-gold-border)' }}
            >
              <p className="text-[0.72rem] font-bold tracking-[0.18em] uppercase text-gold mb-4">Business Hours</p>
              {hours.map(({ day, time }) => (
                <div
                  key={day}
                  className="flex justify-between text-[0.84rem] text-muted py-2 border-b last:border-0"
                  style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                >
                  <span>{day}</span>
                  <span className="text-ink">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
