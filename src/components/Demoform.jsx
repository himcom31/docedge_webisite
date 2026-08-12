import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"; // ← NEW
import axios from "axios";
import "./Demoform.css";

const API_URL = `https://software.docedge.in/api/formlanding`;

export default function DemoForm() {
  const { executeRecaptcha } = useGoogleReCaptcha(); // ← NEW

  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const [form, setForm] = useState({
    full_name:      "",
    clinic_name:    "",
    mobile:         "",
    city:           "",
    specialization: "",
    email:          "",
    preferred_time: "Morning (9 AM - 12 PM)",
  });

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── UPDATED handleSubmit ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // console.log("1. Submit start");  // ← ADD

      if (!executeRecaptcha) {
        // console.log("2. executeRecaptcha null hai");  // ← ADD
        setError("reCAPTCHA load nahi hua. Page refresh karo.");
        setLoading(false);
        return;
      }

      // console.log("3. Token generate ho raha hai");  // ← ADD
      const token = await executeRecaptcha("demo_form");
      // console.log("4. Token:", token);  // ← ADD

      await axios.post(API_URL, {
        ...form,
        recaptchaToken: token,
      });

      // console.log("5. Submit success");  // ← ADD
      setEmailSent(!!form.email);
      setSubmitted(true);

    } catch (err) {
      // console.log("ERROR:", err);  // ← ADD
      const msg =
        err.response?.data?.message ||
        "Some problem occurred. Try again after some time or WhatsApp me.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead" className="lead-section">
      <div className="lead-blob lead-blob--top-right" />
      <div className="lead-blob lead-blob--bottom-left" />

      <div className="lead-container">
        <div className="lead-inner">

          {/* ── LEFT PANEL ── */}
          <div className="lead-left">
            <div className="lead-eyebrow">Book Your Free Demo</div>

            <h2 className="lead-headline">
              See DocEdge live in{" "}
              <span className="lead-headline__accent">your specialty</span>
              {" "}— 100% free
            </h2>

            <p className="lead-sub">
              Our specialist will show you DocEdge customised for your exact
              practice type, patient volume, and workflow. Zero pressure. Zero
              commitment.
            </p>

            <ul className="lead-perks">
              {[
                "Free setup + data migration included",
                "7-day free trial, no card needed",
                "100 FREE WhatsApp + SMS messages",
                "Dedicated onboarding specialist",
                "Cancel anytime, no lock-in",
              ].map((p) => (
                <li key={p} className="lead-perks__item">
                  <span className="lead-perks__tick">✓</span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="lead-contact">
              <a href="https://wa.me/919382555796" target="_blank" rel="noreferrer"
                className="lead-contact-btn lead-contact-btn--wa">
                💬 WhatsApp: +91 93825 55796
              </a>
              <a href="tel:+919382555796" className="lead-contact-btn lead-contact-btn--call">
                📞 Call Us: +91 93825 55796
              </a>
            </div>
          </div>

          {/* ── FORM / THANK-YOU ── */}
          <div className="demo-form-wrap">
            {!submitted ? (
              <>
                <div className="demo-form-title">🎉 Get Your Free Demo</div>
                <div className="demo-form-subtitle">
                  Fill this form. We'll reply on WhatsApp within 2 hours.
                </div>

                <form onSubmit={handleSubmit} className="demo-form">

                  {/* ── Static fields ── */}
                  {[
                    ["full_name",   "Full Name *",                 "text",  "Dr. / Mr. / Ms."],
                    ["clinic_name", "Clinic / Hospital Name *",   "text",  "Your clinic name"],
                    ["mobile",      "Mobile Number (WhatsApp) *", "tel",   "+91 98765 43210"],
                    ["city",        "City *",                     "text",  "Mumbai, Delhi…"],
                  ].map(([name, label, type, placeholder]) => (
                    <div key={name} className="demo-form__group">
                      <label className="demo-form__label">{label}</label>
                      <input
                        className="demo-form__input"
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        required
                        value={form[name]}
                        onChange={handleChange}
                      />
                    </div>
                  ))}

                  {/* ── Email (optional) ── */}
                  <div className="demo-form__group">
                    <label className="demo-form__label">
                      Email Address
                      <span className="demo-form__label-badge">
                        📧 Instant credentials
                      </span>
                    </label>
                    <input
                      className="demo-form__input"
                      type="email"
                      name="email"
                      placeholder="doctor@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                    <p className="demo-form__field-hint">
                      ✉️ Demo login credentials will be sent instantly to this email
                    </p>
                  </div>

                  {/* ── Specialization ── */}
                  <div className="demo-form__group">
                    <label className="demo-form__label">Specialization *</label>
                    <select
                      className="demo-form__input"
                      name="specialization"
                      required
                      value={form.specialization}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select your specialty</option>
                      {[
                        "General Physician","Dentist","Dermatologist",
                        "Pediatrician","Gynecologist","Orthopedic",
                        "Ophthalmologist","ENT","Homeopathy","Ayurveda","Other",
                      ].map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* ── Preferred time ── */}
                  <div className="demo-form__group">
                    <label className="demo-form__label">Preferred Demo Time</label>
                    <select
                      className="demo-form__input"
                      name="preferred_time"
                      value={form.preferred_time}
                      onChange={handleChange}
                    >
                      <option>Morning (9 AM - 12 PM)</option>
                      <option>Afternoon (12 PM - 4 PM)</option>
                      <option>Evening (4 PM - 7 PM)</option>
                    </select>
                  </div>

                  {error && (
                    <div className="demo-form__error">⚠️ {error}</div>
                  )}

                  <button
                    type="submit"
                    className="demo-form__submit"
                    disabled={loading}
                  >
                    {loading ? "⏳ Submitting…" : "🚀 Book My Free Demo"}
                  </button>

                  <p className="demo-form__privacy">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              </>
            ) : (
              /* ── THANK-YOU STATE ── */
              <div className="thankyou">
                <div className="thankyou__icon">✅</div>
                <h3 className="thankyou__title">🎉 Demo Request Received!</h3>
                <p className="thankyou__sub">
                  Thank you for choosing <strong>DocEdge</strong>. You've taken
                  the first step toward a smarter, paperless clinic at just{" "}
                  <strong>₹33/day</strong>.
                </p>

                {emailSent && (
                  <div className="thankyou__email-notice">
                    📧 <strong>Check your inbox!</strong> Demo login credentials have been
                    sent to your email address.
                  </div>
                )}

                <div className="thankyou__box">
                  <h4 className="thankyou__box-heading">⏰ What's Next?</h4>
                  <p className="thankyou__box-text">
                    Our Clinic Specialist will personally message you on WhatsApp
                    within the next <strong>2 business hours</strong> to confirm
                    your preferred time and send you the secure demo link.
                  </p>

                  <div className="thankyou__wa-row">
                    <span className="thankyou__wa-emoji">💬</span>
                    <div>
                      <div className="thankyou__wa-label">WhatsApp Business</div>
                      <div className="thankyou__wa-num">+91 93825 55796</div>
                    </div>
                  </div>

                  <div className="thankyou__alert">
                    🔖{" "}
                    <span>
                      <strong>Please save this number</strong> so you don't miss our call.
                    </span>
                  </div>
                </div>

                <a href="https://wa.me/919382555796" target="_blank" rel="noreferrer"
                  className="thankyou__wa-btn">
                  💬 Message Us Now on WhatsApp
                </a>

                <p className="thankyou__sign">— The DocEdge Team</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}