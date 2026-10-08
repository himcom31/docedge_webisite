import { Wrench, Clock, Mail } from "lucide-react";

const SUPPORT_EMAIL = "support@docedge.in"; // ← apna support email daalein

const Maintenance = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

      @keyframes mtFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      @keyframes mtSpin { to { transform: rotate(360deg); } }
      @keyframes mtSpinRev { to { transform: rotate(-360deg); } }
      @keyframes mtFadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes mtPulse { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
      @keyframes mtBar {
        0%   { transform: translateX(-100%); }
        100% { transform: translateX(300%); }
      }

      .mt-page {
        min-height: 100vh; display: flex; align-items: center; justify-content: center;
        padding: 24px; box-sizing: border-box;
        font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
        background: linear-gradient(135deg, #1e1b4b 0%, #4c1d95 55%, #312e81 100%);
        color: #fff; position: relative; overflow: hidden;
      }
      .mt-blob {
        position: absolute; border-radius: 50%; filter: blur(90px);
        pointer-events: none; opacity: 0.45;
      }
      .mt-blob-1 { width: 420px; height: 420px; background: #6366f1; top: -120px; left: -120px; animation: mtFloat 9s ease-in-out infinite; }
      .mt-blob-2 { width: 380px; height: 380px; background: #a855f7; bottom: -120px; right: -100px; animation: mtFloat 12s ease-in-out infinite reverse; }

      .mt-card {
        position: relative; z-index: 1; max-width: 560px; width: 100%;
        text-align: center; padding: 48px 36px;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.14);
        border-radius: 28px;
        backdrop-filter: blur(14px);
        box-shadow: 0 24px 80px rgba(0,0,0,0.35);
        animation: mtFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
      }

      .mt-icon-wrap {
        position: relative; width: 120px; height: 120px; margin: 0 auto 28px;
      }
      .mt-ring {
        position: absolute; inset: 0; border-radius: 50%;
        border: 2px dashed rgba(255,255,255,0.3);
      }
      .mt-ring-1 { animation: mtSpin 14s linear infinite; }
      .mt-ring-2 { inset: 14px; border-style: solid; border-color: rgba(167,139,250,0.5); animation: mtSpinRev 9s linear infinite; }
      .mt-icon-core {
        position: absolute; inset: 28px; border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #a855f7);
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 8px 28px rgba(99,102,241,0.5);
      }

      .mt-badge {
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(251,191,36,0.14); border: 1px solid rgba(251,191,36,0.4);
        color: #fde68a; font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
        text-transform: uppercase; padding: 6px 14px; border-radius: 20px; margin-bottom: 18px;
      }
      .mt-dot { width: 7px; height: 7px; border-radius: 50%; background: #fbbf24; animation: mtPulse 1.4s ease-in-out infinite; }

      .mt-title {
        font-size: 34px; font-weight: 800; letter-spacing: -0.02em;
        margin: 0 0 12px; line-height: 1.2;
      }
      .mt-text {
        font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.78);
        margin: 0 auto 28px; max-width: 420px;
      }

      .mt-progress {
        height: 6px; border-radius: 10px; background: rgba(255,255,255,0.12);
        overflow: hidden; margin: 0 auto 28px; max-width: 320px; position: relative;
      }
      .mt-progress-bar {
        position: absolute; top: 0; left: 0; height: 100%; width: 35%;
        border-radius: 10px;
        background: linear-gradient(90deg, #818cf8, #e879f9);
        animation: mtBar 1.8s ease-in-out infinite;
      }

      .mt-info {
        display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;
      }
      .mt-chip {
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.16);
        padding: 9px 16px; border-radius: 12px; font-size: 13px; font-weight: 600;
        color: rgba(255,255,255,0.9); text-decoration: none; transition: background 0.2s, transform 0.2s;
      }
      a.mt-chip:hover { background: rgba(255,255,255,0.16); transform: translateY(-2px); }

      .mt-footer {
        margin-top: 28px; font-size: 12px; color: rgba(255,255,255,0.45);
      }

      @media (max-width: 520px) {
        .mt-card { padding: 36px 22px; border-radius: 22px; }
        .mt-title { font-size: 26px; }
        .mt-text { font-size: 14px; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
      }
    `}</style>

    <div className="mt-page">
      <div className="mt-blob mt-blob-1" />
      <div className="mt-blob mt-blob-2" />

      <div className="mt-card">
        <div className="mt-icon-wrap">
          <div className="mt-ring mt-ring-1" />
          <div className="mt-ring mt-ring-2" />
          <div className="mt-icon-core">
            <Wrench size={36} color="#fff" />
          </div>
        </div>

        <div className="mt-badge">
          <span className="mt-dot" />
          Under Maintenance
        </div>

        <h1 className="mt-title">We'll be back soon</h1>

        <p className="mt-text">
          DocEdge is currently undergoing scheduled upgrades to give you a better
          experience. The website will be unavailable for a short while. Thank you
          for your patience.
        </p>

        <div className="mt-progress">
          <div className="mt-progress-bar" />
        </div>

        <div className="mt-info">
          <span className="mt-chip">
            <Clock size={15} /> Back online soon
          </span>
          <a className="mt-chip" href={`mailto:${SUPPORT_EMAIL}`}>
            <Mail size={15} /> {SUPPORT_EMAIL}
          </a>
        </div>

        <p className="mt-footer">© {new Date().getFullYear()} DocEdge. All rights reserved.</p>
      </div>
    </div>
  </>
);

export default Maintenance;