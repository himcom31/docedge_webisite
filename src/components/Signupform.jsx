import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Building2,
  Mail,
  Lock,
  Phone,
  MapPin,
  ArrowLeft,
  ShieldCheck,
  Loader2,
  AlertTriangle,
  CreditCard,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ── Keyframe injection ──────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("docedge-signup-styles")) return;
  const style = document.createElement("style");
  style.id = "docedge-signup-styles";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes gradShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes checkPop {
      0%   { transform: scale(0); opacity:0; }
      60%  { transform: scale(1.25); opacity:1; }
      100% { transform: scale(1); opacity:1; }
    }
    @keyframes floatA {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-14px); }
    }
    @keyframes floatB {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(10px); }
    }

    /* ── Page ── */
    .de-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 16px;
      font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
      background: #f5f6fa;
      position: relative;
      overflow: hidden;
    }

    /* Subtle background decorations */
    .de-blob {
      position: fixed;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      z-index: 0;
    }
    .de-blob-1 {
      width: 480px; height: 480px;
      background: rgba(99,102,241,0.07);
      top: -140px; left: -160px;
      animation: floatA 10s ease-in-out infinite;
    }
    .de-blob-2 {
      width: 380px; height: 380px;
      background: rgba(139,92,246,0.06);
      bottom: -100px; right: -120px;
      animation: floatB 13s ease-in-out infinite;
    }

    /* ── Card ── */
    .de-card {
      background: #ffffff;
      border: 1px solid #e8eaf0;
      border-radius: 24px;
      max-width: 660px;
      width: 100%;
      box-shadow:
        0 1px 3px rgba(0,0,0,0.04),
        0 8px 32px rgba(0,0,0,0.07),
        0 32px 64px rgba(99,102,241,0.06);
      animation: fadeSlideUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
      position: relative;
      z-index: 1;
      overflow: hidden;
    }

    /* ── Header ── */
    .de-header {
      padding: 30px 36px 28px;
      position: relative;
      overflow: hidden;
    }
    .de-header-bg {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #6366f1 100%);
      background-size: 200% 200%;
      animation: gradShift 7s ease infinite;
      z-index: 0;
    }
    .de-header-noise {
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
      z-index: 1;
      opacity: 0.4;
    }
    .de-header-content { position: relative; z-index: 2; }

    .de-back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255,255,255,0.14);
      border: 1px solid rgba(255,255,255,0.22);
      color: rgba(255,255,255,0.92);
      font-size: 12px;
      font-weight: 600;
      padding: 6px 14px 6px 10px;
      border-radius: 20px;
      cursor: pointer;
      margin-bottom: 20px;
      transition: background 0.2s, transform 0.15s;
      font-family: inherit;
      letter-spacing: 0.01em;
    }
    .de-back-btn:hover {
      background: rgba(255,255,255,0.24);
      transform: translateX(-2px);
    }

    .de-header-eyebrow {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.58);
      margin: 0 0 6px;
    }
    .de-header-plan {
      font-size: 26px;
      font-weight: 800;
      color: #fff;
      margin: 0 0 16px;
      letter-spacing: -0.02em;
    }

    .de-price-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .de-price-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255,255,255,0.14);
      border: 1.5px solid rgba(255,255,255,0.24);
      color: rgba(255,255,255,0.88);
      border-radius: 40px;
      padding: 5px 14px;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.2s;
    }
    .de-price-chip.active {
      background: #fff;
      color: #4f46e5;
      border-color: #fff;
      box-shadow: 0 2px 12px rgba(255,255,255,0.22);
    }

    /* Shimmer loader */
    .de-shimmer {
      height: 28px;
      width: 180px;
      border-radius: 20px;
      background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.1) 75%);
      background-size: 400px 100%;
      animation: shimmer 1.4s infinite;
    }

    /* ── Error ── */
    .de-error {
      margin: 16px 36px 0;
      background: #fff5f5;
      border: 1px solid #fecaca;
      color: #dc2626;
      border-radius: 10px;
      padding: 11px 16px;
      font-size: 13px;
      font-weight: 600;
      animation: fadeSlideUp 0.3s ease both;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* ── Form ── */
    .de-form {
      padding: 28px 36px 36px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .de-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .de-field {
      flex: 1;
      min-width: 200px;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .de-label {
      font-size: 11.5px;
      font-weight: 700;
      color: #8b8fa8;
      letter-spacing: 0.07em;
      text-transform: uppercase;
    }

    .de-input-wrap {
      position: relative;
    }

    .de-input-icon {
      position: absolute;
      left: 13px;
      top: 50%;
      transform: translateY(-50%);
      color: #b0b4c8;
      pointer-events: none;
      transition: color 0.2s;
      display: flex;
      align-items: center;
    }

    .de-input {
      width: 100%;
      box-sizing: border-box;
      background: #f8f9fc;
      border: 1.5px solid #e4e7f0;
      border-radius: 12px;
      padding: 12px 14px 12px 40px;
      font-size: 14px;
      color: #1a1d2e;
      font-family: inherit;
      font-weight: 500;
      transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
      outline: none;
    }
    .de-input::placeholder { color: #c2c6d8; }
    .de-input:focus {
      border-color: #6366f1;
      background: #fafaff;
      box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
    }
    .de-input-wrap:focus-within .de-input-icon { color: #6366f1; }

    /* ── Billing toggle ── */
    .de-billing-grid {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .de-billing-card {
      flex: 1;
      min-width: 150px;
      border: 1.5px solid #e4e7f0;
      border-radius: 14px;
      padding: 14px 16px;
      cursor: pointer;
      background: #f8f9fc;
      transition: all 0.2s cubic-bezier(0.22,1,0.36,1);
      position: relative;
      overflow: hidden;
    }
    .de-billing-card:hover {
      border-color: rgba(99,102,241,0.4);
      background: rgba(99,102,241,0.03);
    }
    .de-billing-card.active {
      border-color: #6366f1;
      background: rgba(99,102,241,0.05);
      box-shadow: 0 0 0 1px rgba(99,102,241,0.15) inset, 0 4px 16px rgba(99,102,241,0.08);
    }
    .de-billing-card.active::before {
      content: '';
      position: absolute;
      top: 0; right: 0;
      width: 0; height: 0;
      border-style: solid;
      border-width: 0 30px 30px 0;
      border-color: transparent #6366f1 transparent transparent;
    }
    .de-billing-card.active::after {
      content: '✓';
      position: absolute;
      top: 2px; right: 5px;
      font-size: 10px;
      color: #fff;
      font-weight: 800;
      animation: checkPop 0.3s ease both;
    }
    .de-billing-name {
      font-size: 13px;
      font-weight: 700;
      color: #374151;
      margin-bottom: 4px;
    }
    .de-billing-price {
      font-size: 15px;
      font-weight: 800;
      color: #1a1d2e;
    }
    .de-save-badge {
      display: inline-block;
      margin-top: 6px;
      background: rgba(22,163,74,0.1);
      border: 1px solid rgba(22,163,74,0.2);
      color: #16a34a;
      font-size: 11px;
      font-weight: 700;
      border-radius: 20px;
      padding: 2px 9px;
    }

    /* ── Single billing ── */
    .de-single-billing {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8f9fc;
      border: 1.5px solid #e4e7f0;
      border-radius: 12px;
      padding: 14px 18px;
    }
    .de-single-billing-label { font-size: 13px; font-weight: 600; color: #6b7280; }
    .de-single-billing-price { font-size: 16px; font-weight: 800; color: #1a1d2e; }

    /* ── Divider ── */
    .de-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #e4e7f0, transparent);
    }

    /* ── Submit button ── */
    .de-submit-btn {
      position: relative;
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      color: #fff;
      border: none;
      border-radius: 14px;
      padding: 15px 24px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
      letter-spacing: -0.01em;
      transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
      box-shadow: 0 4px 20px rgba(99,102,241,0.28), 0 0 0 1px rgba(255,255,255,0.08) inset;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    .de-submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(99,102,241,0.4), 0 0 0 1px rgba(255,255,255,0.12) inset;
    }
    .de-submit-btn:active:not(:disabled) { transform: translateY(0px); }
    .de-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
    .de-submit-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent 60%);
      pointer-events: none;
    }

    .de-price-tag {
      background: rgba(255,255,255,0.18);
      border-radius: 20px;
      padding: 3px 11px;
      font-size: 13px;
      font-weight: 700;
    }

    .de-note {
      font-size: 12px;
      color: #9ca3af;
      text-align: center;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    /* ── Staggered field animations ── */
    .de-anim-1 { animation: fadeSlideUp 0.5s 0.08s cubic-bezier(0.22,1,0.36,1) both; }
    .de-anim-2 { animation: fadeSlideUp 0.5s 0.16s cubic-bezier(0.22,1,0.36,1) both; }
    .de-anim-3 { animation: fadeSlideUp 0.5s 0.24s cubic-bezier(0.22,1,0.36,1) both; }
    .de-anim-4 { animation: fadeSlideUp 0.5s 0.30s cubic-bezier(0.22,1,0.36,1) both; }
    .de-anim-5 { animation: fadeSlideUp 0.5s 0.36s cubic-bezier(0.22,1,0.36,1) both; }
    .de-anim-6 { animation: fadeSlideUp 0.5s 0.42s cubic-bezier(0.22,1,0.36,1) both; }

    @media (max-width: 520px) {
      .de-form { padding: 22px 20px 28px; }
      .de-header { padding: 24px 20px 22px; }
      .de-error { margin: 14px 20px 0; }
      .de-input { font-size: 16px; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; }
    }
  `;
  document.head.appendChild(style);
};

export default function SignupForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const planId   = searchParams.get("planId");
  const planName = searchParams.get("planName") || "Selected";

  const [planData, setPlanData]       = useState(null);
  const [planLoading, setPlanLoading] = useState(false);

  const [form, setForm] = useState({
    name: "", clinicName: "", email: "",
    password: "", mobile: "", address: "",
    interval: "monthly",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    if (!planId) return;
    setPlanLoading(true);
    fetch(`${API_BASE}/api/plans/${planId}`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.plan) {
          const { monthlyPrice, yearlyPrice } = data.plan;
          setPlanData({ monthlyPrice, yearlyPrice });
          if (monthlyPrice && !yearlyPrice) setForm(p => ({ ...p, interval: "monthly" }));
          if (!monthlyPrice && yearlyPrice)  setForm(p => ({ ...p, interval: "yearly" }));
        }
      })
      .catch(() => {})
      .finally(() => setPlanLoading(false));
  }, [planId]);

  const hasMonthly = planData?.monthlyPrice > 0;
  const hasYearly  = planData?.yearlyPrice  > 0;
  const showBillingToggle = hasMonthly && hasYearly;
  const selectedPrice =
    form.interval === "monthly" ? planData?.monthlyPrice : planData?.yearlyPrice;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.clinicName.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Saari required fields bharein"); return;
    }
    if (!planId) {
      setError("Koi plan select nahi hua. Pricing page se dobara try karein."); return;
    }
    try {
      setSubmitting(true);
      const { data } = await axios.post(`${API_BASE}/api/lead/signup`, { ...form, planId });

      if (!data.success || !data.paymentSessionId) {
        setError("Order create nahi hua, dobara try karein"); return;
      }

      // Cashfree SDK load karo
      await new Promise((resolve) => {
        if (window.Cashfree) { resolve(); return; }
        const script = document.createElement("script");
        script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
        script.onload = resolve;
        document.head.appendChild(script);
      });

      const cashfree = window.Cashfree({ mode: "sandbox" }); // production pe "production"
      cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed, dobara try karein");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="de-page">
      <div className="de-blob de-blob-1" />
      <div className="de-blob de-blob-2" />

      <div className="de-card">

        {/* ── Header ── */}
        <div className="de-header">
          <div className="de-header-bg" />
          <div className="de-header-noise" />
          <div className="de-header-content">
            <button className="de-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={13} />
              Back to plans
            </button>
            <p className="de-header-eyebrow">You've selected</p>
            <h1 className="de-header-plan">{planName} Plan</h1>

            {planLoading && <div className="de-shimmer" />}

            {!planLoading && planData && (
              <div className="de-price-row">
                {hasMonthly && (
                  <span className={`de-price-chip${form.interval === "monthly" ? " active" : ""}`}>
                    <CreditCard size={12} />
                    ₹{planData.monthlyPrice.toLocaleString("en-IN")}/mo
                  </span>
                )}
                {hasYearly && (
                  <span className={`de-price-chip${form.interval === "yearly" ? " active" : ""}`}>
                    <CreditCard size={12} />
                    ₹{planData.yearlyPrice.toLocaleString("en-IN")}/yr
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="de-error">
            <AlertTriangle size={15} />
            {error}
          </div>
        )}

        {/* ── Form ── */}
        <form className="de-form" onSubmit={handleSubmit}>

          {/* Row 1 */}
          <div className="de-row de-anim-1">
            <InputField label="Full Name *" icon={<User size={15} />} name="name"
              placeholder="Dr. Himanshu Chaudhary" value={form.name} onChange={handleChange} />
            <InputField label="Clinic Name *" icon={<Building2 size={15} />} name="clinicName"
              placeholder="Sunrise Clinic" value={form.clinicName} onChange={handleChange} />
          </div>

          {/* Row 2 */}
          <div className="de-row de-anim-2">
            <InputField label="Email Address *" icon={<Mail size={15} />} name="email"
              type="email" placeholder="doctor@example.com" value={form.email} onChange={handleChange} />
            <InputField label="Password *" icon={<Lock size={15} />} name="password"
              type="password" placeholder="Create a password" value={form.password} onChange={handleChange} />
          </div>

          {/* Row 3 */}
          <div className="de-row de-anim-3">
            <InputField label="Mobile Number" icon={<Phone size={15} />} name="mobile"
              placeholder="9876543210" value={form.mobile} onChange={handleChange} />
            <InputField label="Location" icon={<MapPin size={15} />} name="address"
              placeholder="City, State" value={form.address} onChange={handleChange} />
          </div>

          <div className="de-divider de-anim-4" />

          {/* ── Billing cycle ── */}
          {!planLoading && showBillingToggle && (
            <div className="de-anim-4">
              <label className="de-label" style={{ display: "block", marginBottom: 10 }}>
                Billing Cycle
              </label>
              <div className="de-billing-grid">
                <label
                  className={`de-billing-card${form.interval === "monthly" ? " active" : ""}`}
                  onClick={() => setForm(p => ({ ...p, interval: "monthly" }))}
                >
                  <input type="radio" name="interval" value="monthly"
                    checked={form.interval === "monthly"} onChange={handleChange}
                    style={{ display: "none" }} />
                  <div className="de-billing-name">Monthly</div>
                  <div className="de-billing-price">
                    ₹{planData.monthlyPrice.toLocaleString("en-IN")}
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af" }}>/month</span>
                  </div>
                </label>

                <label
                  className={`de-billing-card${form.interval === "yearly" ? " active" : ""}`}
                  onClick={() => setForm(p => ({ ...p, interval: "yearly" }))}
                >
                  <input type="radio" name="interval" value="yearly"
                    checked={form.interval === "yearly"} onChange={handleChange}
                    style={{ display: "none" }} />
                  <div className="de-billing-name">Yearly</div>
                  <div className="de-billing-price">
                    ₹{planData.yearlyPrice.toLocaleString("en-IN")}
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af" }}>/year</span>
                  </div>
                  <div className="de-save-badge">Save more</div>
                </label>
              </div>
            </div>
          )}

          {!planLoading && planData && !showBillingToggle && (
            <div className="de-single-billing de-anim-4">
              <span className="de-single-billing-label">
                {hasMonthly ? "Monthly billing" : "Yearly billing"}
              </span>
              <span className="de-single-billing-price">
                ₹{(hasMonthly ? planData.monthlyPrice : planData.yearlyPrice).toLocaleString("en-IN")}
                <span style={{ fontSize: 13, fontWeight: 500, color: "#9ca3af" }}>
                  {hasMonthly ? "/month" : "/year"}
                </span>
              </span>
            </div>
          )}

          {/* ── Submit ── */}
          <button className="de-submit-btn de-anim-5" type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 size={16} style={{ animation: "spin 0.7s linear infinite" }} />
                Redirecting to payment...
              </>
            ) : (
              <>
                <ShieldCheck size={17} />
                Proceed to Payment
                {selectedPrice && (
                  <span className="de-price-tag">
                    ₹{selectedPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </>
            )}
          </button>

          <p className="de-note de-anim-6">
            <ShieldCheck size={13} style={{ color: "#6366f1", flexShrink: 0 }} />
            Account created automatically after successful payment
          </p>

        </form>
      </div>
    </div>
  );
}

// ── Reusable InputField ──────────────────────────────────────────────────────
function InputField({ label, icon, name, type = "text", placeholder, value, onChange }) {
  return (
    <div className="de-field">
      <label className="de-label">{label}</label>
      <div className="de-input-wrap">
        <span className="de-input-icon">{icon}</span>
        <input
          className="de-input"
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={type === "password" ? "new-password" : "off"}
        />
      </div>
    </div>
  );
}