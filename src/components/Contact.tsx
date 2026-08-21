import { useInView } from "../hooks/useInView";
import SignupForm from "./ui/signup-form";

const info = [
  { label: "Phone", value: "(469) 432 0341", href: "tel:+14694320341" },
  { label: "Email", value: "royalcrestgeneralcontracting@outlook.com", href: "mailto:royalcrestgeneralcontracting@outlook.com" },
  { label: "Location", value: "Dallas, Ft. Worth & Surrounding Areas" },
  { label: "Hours", value: "Mon–Fri  7 AM – 6 PM\nSat  8 AM – 4 PM" },
];

function MapFrame() {
  return (
    <div className="rounded-lg ring-1 ring-text/8 hover:ring-2 hover:ring-accent transition duration-300">
      <div className="m-0.5">
        <iframe
          title="Service Area"
          src="https://maps.google.com/maps?ll=32.8,-97.0&z=9&output=embed"
          width="100%"
          height="320"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full grayscale block"
        />
      </div>
    </div>
  );
}

export default function Contact() {
  const { ref: headRef, inView: headIn } = useInView();

  return (
    <section id="contact" className="py-24 lg:py-28 bg-bg">
      <div className="max-w-[1260px] mx-auto px-8 lg:px-12">
        <div
          ref={headRef}
          className={`mb-14 reveal ${headIn ? "visible" : ""}`}
        >
          <p className="label">Get In Touch</p>
          <h2
            className="font-heading font-bold leading-tight text-text"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
          >
            Start Your Project
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-start">
          <SignupForm />

          <div className="flex flex-col gap-8 lg:pt-2">
            {info.map(({ label, value, href }) => (
              <div key={label}>
                <p className="text-[0.66rem] font-semibold tracking-[0.22em] uppercase mb-1.5 text-text/40">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="text-[0.95rem] leading-relaxed whitespace-pre-line text-text hover:text-accent transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-[0.95rem] leading-relaxed whitespace-pre-line text-text">
                    {value}
                  </p>
                )}
              </div>
            ))}

            <MapFrame />
          </div>
        </div>
      </div>
    </section>
  );
}
