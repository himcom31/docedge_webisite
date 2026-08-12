import { useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ResetPassword() {
  const { token }             = useParams();
  const [password, setPass]   = useState("");
  const [confirm,  setConf]   = useState("");
  const [loading,  setLoad]   = useState(false);
  const [message,  setMsg]    = useState("");
  const [error,    setErr]    = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setErr("Passwords do not match.");
    if (password.length < 8)  return setErr("Minimum 8 characters required.");

    setLoad(true); setErr(""); setMsg("");
    try {
      const res  = await fetch(`${API_BASE}/api/authuser/reset-password/${token}`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMsg("Password reset! Redirecting to login…");
      setTimeout(() => window.location.href = "/auth", 2000);
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center",
                  justifyContent:"center", background:"#f4f7f9", fontFamily:"Inter,sans-serif" }}>
      <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 8px 40px rgba(13,92,99,0.15)",
                    padding:"2.5rem 2rem", width:"100%", maxWidth:420 }}>

        <h2 style={{ color:"#0d5c63", marginBottom:8 }}>Set New Password</h2>
        <p style={{ color:"#6b7a8d", fontSize:"0.9rem", marginBottom:24 }}>
          Choose a strong password (min 8 characters).
        </p>

        {error   && <div style={alertStyle("error")}>⚠ {error}</div>}
        {message && <div style={alertStyle("success")}>✔ {message}</div>}

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>New Password</label>
          <input type="password" required placeholder="••••••••"
            value={password} onChange={e => setPass(e.target.value)} style={inputStyle} />

          <label style={labelStyle}>Confirm Password</label>
          <input type="password" required placeholder="••••••••"
            value={confirm} onChange={e => setConf(e.target.value)} style={inputStyle} />

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Resetting…" : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

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