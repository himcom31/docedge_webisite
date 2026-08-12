import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pricing.css";

const API_URL ="http://localhost:5000";

// ─── Reveal Hook ──────────────────────────────────────────────────────────────
function useReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

// ─── Single Price Card — sirf backend se aaya data render karta hai ───────────
function PriceCard({ card, delay }) {
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Custom Pricing (Enterprise/Talk to Sales) waale plans WhatsApp pe jaate hain (external).
  // Baaki sab plans "Signup" page pe jaate hain, jaha plan ki details header mein dikhengi.
// Pricing.jsx — PriceCard component ke andar

const handleClick = (e, c) => {
  if (c.external) return; // WhatsApp/external links as-is
  e.preventDefault();

  // ── Auth check ──────────────────────────────────────────
  const token = localStorage.getItem("docedge_token");
  if (!token) {
    // Login nahi hai → auth page pe bhejo, wapas aane ke liye plan id save karo
    sessionStorage.setItem("redirect_after_login", `/plan/${card.id}`);
    navigate("/auth");
    return;
  }

  navigate(`/plan/${card.id}`);
};

  const cta = card.cta || { label: "Learn more", href: "#lead", external: false, variant: "outline" };
  const features = Array.isArray(card.features) ? card.features : [];

  return (
    <div
      ref={ref}
      className={`price-card${card.featured ? " featured" : ""}`}
      style={delay ? { transitionDelay: delay } : {}}
    >
      {card.badge && <div className="pc-badge">{card.badge}</div>}

      <div className="price-plan">{card.name}</div>

      {/* Amount */}
      {card.isCurrencyless ? (
        <div className="price-amount">{card.amount}</div>
      ) : (
        <div className="price-amount">
          <sup>₹</sup>{card.amount}<sub>/day</sub>
        </div>
      )}

      <div className="price-period">{card.period}</div>
      <div
        className="price-annual"
        style={
          card.featured
            ? { background: "rgba(0,174,239,0.15)", color: "var(--cyan)", border: "none" }
            : {}
        }
      >
        {card.annual}
      </div>

      {/* Monthly / Yearly price breakdown */}
      {Array.isArray(card.priceLines) && card.priceLines.length > 0 && (
        <div className="price-breakdown" style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "8px 0" }}>
          {card.priceLines.map((line, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.85rem",
                color: "#475569",
                background: "#f1f5f9",
                borderRadius: "6px",
                padding: "3px 10px",
                fontWeight: 600,
              }}
            >
              {line.value}
            </span>
          ))}
        </div>
      )}

      <p className="price-desc">{card.description}</p>
      <hr className="price-divider" />

      <ul className="pf-list">
        {features.map((f, i) => (
          <li key={i} className="pf-item">
            {f.text}
          </li>
        ))}
      </ul>

      <a
        href={cta.href}
        className={`btn-price ${cta.variant === "filled" ? "btn-price-filled" : "btn-price-outline"}`}
        target={cta.external ? "_blank" : undefined}
        rel={cta.external ? "noopener noreferrer" : undefined}
        onClick={(e) => !cta.external && handleClick(e, cta.href)}
      >
        {cta.label}
      </a>
    </div>
  );
}

// ─── Pricing Section ──────────────────────────────────────────────────────────
export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const delays = ["0s", "0.15s", "0.3s"];

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/plans`);
        if (!res.ok) throw new Error("Failed to fetch plans");
        const data = await res.json();

        if (data.success) {
          setPlans(data.plans); // backend se pehle se hi fully computed cards
        } else {
          setError("Plans load nahi ho paye");
        }
      } catch (err) {
        console.error("Pricing fetch error:", err);
        setError("Kuch galat ho gaya, dobara try karo");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <section id="pricing">
      <div className="pricing-container">

        {/* Header */}
        <Reveal className="pricing-header">
          <div className="section-label">Transparent Pricing</div>
          <h2 className="section-title">
            Less than ₹33 a day.<br />
            <span className="serif">No hidden charges. Ever.</span>
          </h2>
          <p className="section-body">
            All plans include free setup, data migration, and personalised onboarding.
          </p>
        </Reveal>

        {/* Loading / Error */}
        {loading && <p className="pricing-note">Loading plans...</p>}
        {error && <p className="pricing-note">{error}</p>}

        {/* Cards */}
        {!loading && !error && (
          <div className="pricing-grid">
            {plans
              .filter((card) => card && card.cta) // malformed/old-shape data ko skip karo
              .map((card, i) => (
                <PriceCard key={card.id || card._id || i} card={card} delay={delays[i]} />
              ))}
          </div>
        )}

        {/* Footer note */}
        <p className="pricing-note">
          ✅ All plans include: Free setup · Free data migration · Free onboarding · 7-day trial · Cancel anytime
        </p>

      </div>
    </section>
  );
}