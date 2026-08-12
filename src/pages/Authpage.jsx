// AuthPage.jsx
import { useState } from "react";
import "./AuthPage.css";

const API_BASE = "http://localhost:5000";

const INITIAL_REGISTER = {
  clinicName: "",
  doctorName: "",
  email: "",
  phone: "",
  specialization: "",
  password: "",
  confirmPassword: "",
};

const INITIAL_LOGIN = { email: "", password: "" };

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [loginData, setLoginData] = useState(INITIAL_LOGIN);
  const [regData, setRegData] = useState(INITIAL_REGISTER);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ── handlers ──────────────────────────────────────────────────────────────
  const handleSwitch = (m) => {
    setMode(m);
    setError("");
    setSuccess("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/authuser/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed.");
      // Store token and redirect
      localStorage.setItem("docedge_token", data.token);
      const redirectTo = sessionStorage.getItem("redirect_after_login") || "/";
sessionStorage.removeItem("redirect_after_login");  // clean up
window.location.href = redirectTo;
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (regData.password !== regData.confirmPassword) {
      return setError("Passwords do not match.");
    }
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = regData;
      const res = await fetch(`${API_BASE}/api/authuser/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed.");
      localStorage.setItem("docedge_token", data.token);
      setSuccess("Account created! Redirecting…");
      setTimeout(() => (window.location.href = "/dashboard"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="auth-root">
      {/* ── left panel ── */}
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-brand__icon">⚕</span>
          <span className="auth-brand__name">DocEdge</span>
        </div>
        <div className="auth-left__body">
          <h1 className="auth-left__headline">
            Smarter clinic management, <em>every day.</em>
          </h1>
          <ul className="auth-feature-list">
            {[
              { icon: "🗂️", text: "Patient records in one place" },
              { icon: "📅", text: "Appointment scheduling made easy" },
              { icon: "💊", text: "Prescription & billing tools" },
              { icon: "📊", text: "Analytics built for doctors" },
            ].map(({ icon, text }) => (
              <li key={text} className="auth-feature-list__item">
                <span className="auth-feature-list__icon">{icon}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <p className="auth-left__tagline">Trusted by 500+ clinics across India</p>
      </div>

      {/* ── right panel ── */}
      <div className="auth-right">
        <div className="auth-card">
          {/* tab switcher */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === "login" ? "auth-tab--active" : ""}`}
              onClick={() => handleSwitch("login")}
              type="button"
            >
              Login
            </button>
            <button
              className={`auth-tab ${mode === "register" ? "auth-tab--active" : ""}`}
              onClick={() => handleSwitch("register")}
              type="button"
            >
              Register
            </button>
            <span
              className="auth-tab-indicator"
              style={{ transform: mode === "register" ? "translateX(100%)" : "translateX(0)" }}
            />
          </div>

          {/* alerts */}
          {error && <div className="auth-alert auth-alert--error">⚠ {error}</div>}
          {success && <div className="auth-alert auth-alert--success">✔ {success}</div>}

          {/* ── LOGIN FORM ── */}
          {mode === "login" && (
            <form className="auth-form" onSubmit={handleLogin} noValidate>
              <div className="auth-field">
                <label className="auth-label">Email address</label>
                <input
                  className="auth-input"
                  type="email"
                  placeholder="doctor@clinic.com"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                  autoComplete="email"
                />
              </div>

              <div className="auth-field">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrap">
                  <input
                    className="auth-input"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData((p) => ({ ...p, password: e.target.value }))
                    }
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="auth-eye"
                    onClick={() => setShowPass((p) => !p)}
                    aria-label="Toggle password"
                  >
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <div className="auth-forgot-row">
                <a href="/forgot-password" className="auth-link">
                  Forgot password?
                </a>
              </div>

              <button className="auth-btn" type="submit" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : "Login"}
              </button>

              <p className="auth-switch-hint">
                No account?{" "}
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => handleSwitch("register")}
                >
                  Create one free
                </button>
              </p>
            </form>
          )}

          {/* ── REGISTER FORM ── */}
          {mode === "register" && (
            <form className="auth-form" onSubmit={handleRegister} noValidate>
              <div className="auth-row">
                <div className="auth-field">
                  <label className="auth-label">Clinic name</label>
                  <input
                    className="auth-input"
                    type="text"
                    placeholder="City Heart Clinic"
                    value={regData.clinicName}
                    onChange={(e) =>
                      setRegData((p) => ({ ...p, clinicName: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="auth-field">
                  <label className="auth-label">Doctor name</label>
                  <input
                    className="auth-input"
                    type="text"
                    placeholder="Dr. Anjali Sharma"
                    value={regData.doctorName}
                    onChange={(e) =>
                      setRegData((p) => ({ ...p, doctorName: e.target.value }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="auth-row">
                <div className="auth-field">
                  <label className="auth-label">Email address</label>
                  <input
                    className="auth-input"
                    type="email"
                    placeholder="doctor@clinic.com"
                    value={regData.email}
                    onChange={(e) =>
                      setRegData((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="auth-field">
                  <label className="auth-label">Phone number</label>
                  <input
                    className="auth-input"
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    value={regData.phone}
                    onChange={(e) =>
                      setRegData((p) => ({
                        ...p,
                        phone: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label">
                  Specialization{" "}
                  <span className="auth-optional">(optional)</span>
                </label>
                <input
                  className="auth-input"
                  type="text"
                  placeholder="e.g. Cardiology, General Medicine"
                  value={regData.specialization}
                  onChange={(e) =>
                    setRegData((p) => ({
                      ...p,
                      specialization: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="auth-row">
                <div className="auth-field">
                  <label className="auth-label">Password</label>
                  <div className="auth-input-wrap">
                    <input
                      className="auth-input"
                      type={showPass ? "text" : "password"}
                      placeholder="Min 8 characters"
                      value={regData.password}
                      onChange={(e) =>
                        setRegData((p) => ({ ...p, password: e.target.value }))
                      }
                      required
                      minLength={8}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="auth-eye"
                      onClick={() => setShowPass((p) => !p)}
                      aria-label="Toggle password"
                    >
                      {showPass ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>
                <div className="auth-field">
                  <label className="auth-label">Confirm password</label>
                  <input
                    className="auth-input"
                    type={showPass ? "text" : "password"}
                    placeholder="Repeat password"
                    value={regData.confirmPassword}
                    onChange={(e) =>
                      setRegData((p) => ({
                        ...p,
                        confirmPassword: e.target.value,
                      }))
                    }
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <p className="auth-terms">
                By registering you agree to our{" "}
                <a href="/terms" className="auth-link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="auth-link">
                  Privacy Policy
                </a>
                .
              </p>

              <button className="auth-btn" type="submit" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : "Create account"}
              </button>

              <p className="auth-switch-hint">
                Already registered?{" "}
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => handleSwitch("login")}
                >
                  Log in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}