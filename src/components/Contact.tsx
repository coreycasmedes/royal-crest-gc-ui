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

const info = [
  { label: 'Phone',    value: '(469) 432 0341'                     },
  { label: 'Email',    value: 'royalcrestgeneralcontracting@outlook.com'              },
  { label: 'Location', value: 'Dallas, Ft. Worth & Surrounding Areas'},
  { label: 'Hours',    value: 'Mon–Fri  7 AM – 6 PM\nSat  8 AM – 4 PM' },
];

export default function Contact() {
  const { ref: headRef, inView: headIn } = useInView();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ first: '', last: '', email: '', phone: '', service: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  const fieldStyle = {
    background: 'transparent',
    border: '1px solid rgba(26,23,20,0.14)',
    color: 'var(--color-ink)',
    fontFamily: 'inherit',
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'var(--color-ink)';
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'rgba(26,23,20,0.14)';
  };
  const cls = `w-full px-4 py-3.5 text-[0.9rem] outline-none transition-all placeholder:opacity-40`;

  return (
    <section id="contact" className="py-24 lg:py-28" style={{ background: '#fafaf8' }}>
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">

        <div ref={headRef} className={`mb-14 reveal ${headIn ? 'visible' : ''}`}>
          <p className="label">Get In Touch</p>
          <h2
            className="font-heading font-bold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--color-ink)' }}
          >
            Start Your Project
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-start">

          {/* Form */}
          {sent ? (
            <div className="py-16">
              <p className="font-heading text-3xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>
                Message Received
              </p>
              <p className="text-[0.9rem] mb-6" style={{ color: 'var(--color-muted)' }}>
                We'll be in touch within one business day.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-[0.76rem] font-semibold tracking-[0.1em] uppercase pb-0.5 border-b"
                style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)' }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-2" style={{ color: 'var(--color-muted)' }}>
                    First Name
                  </label>
                  <input required className={cls} style={fieldStyle} placeholder="James"
                    value={form.first} onChange={e => setForm({ ...form, first: e.target.value })}
                    onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label className="block text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-2" style={{ color: 'var(--color-muted)' }}>
                    Last Name
                  </label>
                  <input required className={cls} style={fieldStyle} placeholder="Anderson"
                    value={form.last} onChange={e => setForm({ ...form, last: e.target.value })}
                    onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-2" style={{ color: 'var(--color-muted)' }}>
                    Email
                  </label>
                  <input type="email" required className={cls} style={fieldStyle} placeholder="james@example.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label className="block text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-2" style={{ color: 'var(--color-muted)' }}>
                    Phone
                  </label>
                  <input type="tel" className={cls} style={fieldStyle} placeholder="(469) 432 0341"
                    value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-2" style={{ color: 'var(--color-muted)' }}>
                  Service Needed
                </label>
                <select className={`${cls} appearance-none`} style={fieldStyle}
                  value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                  onFocus={onFocus} onBlur={onBlur}>
                  <option value="" disabled>Select a service…</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-2" style={{ color: 'var(--color-muted)' }}>
                  Project Details
                </label>
                <textarea
                  className={`${cls} resize-y min-h-[110px]`}
                  style={fieldStyle}
                  placeholder="Tell us about your project…"
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 text-[0.78rem] font-semibold tracking-[0.1em] uppercase transition-all duration-200"
                style={{ background: 'var(--color-ink)', color: '#fafaf8' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-ink)'; }}
              >
                Send Message →
              </button>
            </form>
          )}

          {/* Contact info */}
          <div className="flex flex-col gap-8 lg:pt-2">
            {info.map(({ label, value }) => (
              <div key={label}>
                <p
                  className="text-[0.66rem] font-semibold tracking-[0.22em] uppercase mb-1.5"
                  style={{ color: 'var(--color-faint)' }}
                >
                  {label}
                </p>
                <p
                  className="text-[0.95rem] leading-relaxed whitespace-pre-line"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
