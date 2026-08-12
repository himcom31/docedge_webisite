import { useState } from "react";

const API_BASE = "https://software.docedge.in"

export default function ForgotPassword() {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError]     = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res  = await fetch(`${API_BASE}/api/authuser/forgot-password`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", 
                  justifyContent:"center", background:"#f4f7f9", fontFamily:"Inter,sans-serif" }}>
      <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 8px 40px rgba(13,92,99,0.15)",
                    padding:"2.5rem 2rem", width:"100%", maxWidth:420 }}>

        <h2 style={{ color:"#0d5c63", marginBottom:8 }}>Forgot Password?</h2>
        <p style={{ color:"#6b7a8d", fontSize:"0.9rem", marginBottom:24 }}>
          Enter your registered email. We'll send a reset link.
        </p>

        {error   && <div style={alertStyle("error")}>⚠ {error}</div>}
        {message && <div style={alertStyle("success")}>✔ {message}</div>}

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Email Address</label>
          <input
            type="email"
            required
            placeholder="doctor@clinic.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Sending…" : "Send Reset Link"}
          </button>
        </form>

        <p style={{ textAlign:"center", marginTop:20, fontSize:"0.85rem", color:"#6b7a8d" }}>
          Remembered it?{" "}
          <a href="/auth" style={{ color:"#0d5c63", fontWeight:600, textDecoration:"none" }}>
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}

// ── Inline styles ─────────────────────────────────────────────────────────
const labelStyle = { fontSize:"0.8rem", fontWeight:600, color:"#1a2533", 
                     textTransform:"uppercase", letterSpacing:"0.05em", display:"block", marginBottom:6 };

const inputStyle = { width:"100%", padding:"0.65rem 0.85rem", border:"1.5px solid #dde3e9",
                     borderRadius:6, fontSize:"0.9rem", outline:"none", 
                     fontFamily:"inherit", marginBottom:16, boxSizing:"border-box" };

const btnStyle   = { width:"100%", padding:"0.8rem", background:"linear-gradient(135deg,#0d5c63,#1a7a82)",
                     color:"#fff", border:"none", borderRadius:6, fontSize:"0.95rem",
                     fontWeight:700, cursor:"pointer", fontFamily:"inherit" };

const alertStyle = (type) => ({
  padding:"0.7rem 1rem", borderRadius:6, fontSize:"0.875rem", fontWeight:500,
  marginBottom:16, borderLeft:`3px solid ${type==="error" ? "#e53e3e" : "#2f855a"}`,
  background: type === "error" ? "#fff5f5" : "#f0fff4",
  color: type === "error" ? "#e53e3e" : "#2f855a",
});