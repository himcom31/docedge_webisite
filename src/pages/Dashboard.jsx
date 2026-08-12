// Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LogOut, User, Building2, Phone, Mail, Stethoscope,
    Calendar, Clock, ShieldCheck, Edit3,
    LayoutDashboard, CreditCard, Bell
} from "lucide-react";
import "./Dashboard.css";

const API_BASE = "https://software.docedge.in"

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("overview");

    // Main subscription (DocEdge plan)
    const [planData, setPlanData] = useState(null);
    const [planLoading, setPlanLoading] = useState(false);

    // Notification subscription
    const [notifSub, setNotifSub] = useState(null);
    const [notifLoading, setNotifLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("docedge_token");
        if (!token) { navigate("/auth"); return; }
        fetchMe(token);
    }, []);

    const fetchMe = async (token) => {
        try {
            const res = await fetch(`${API_BASE}/api/authuser/me`, {
                headers: { Authorization: `Bearer ${token}` },
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to load profile.");
            setUser(data.data.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchPlan = async () => {
        setPlanLoading(true);
        try {
            const token = localStorage.getItem("docedge_token");
            const res = await fetch(`${API_BASE}/api/subscriptions/my`, {
                headers: { Authorization: `Bearer ${token}` },
                credentials: "include",
            });
            const data = await res.json();
            if (data.success) setPlanData(data);
            else console.error("Plan error:", data);
        } catch (e) {
            console.error("fetchPlan failed:", e);
        } finally {
            setPlanLoading(false);
        }
    };

    const fetchNotifSub = async () => {
        setNotifLoading(true);
        try {
            const token = localStorage.getItem("docedge_token");
            const res = await fetch(`${API_BASE}/api/notification-plans/my-subscription-web`, {
                headers: { Authorization: `Bearer ${token}` },
                credentials: "include",
            });
            const data = await res.json();
            if (data.success) setNotifSub(data);
            else console.error("Notif sub error:", data);
        } catch (e) {
            console.error("fetchNotifSub failed:", e);
        } finally {
            setNotifLoading(false);
        }
    };

    const handleTabChange = (id) => {
        setActiveTab(id);
        if (id === "plan" && !planData) fetchPlan();
        if (id === "notifications" && !notifSub) fetchNotifSub();
    };

    const handleLogout = () => {
        localStorage.removeItem("docedge_token");
        navigate("/");
    };

    const getInitials = (name = "") =>
        name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

    const formatDate = (iso) =>
        iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—";

    const formatDateShort = (iso) =>
        iso ? new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

    if (loading) return (
        <div className="db-loading">
            <div className="db-spinner" />
            <p>Loading your dashboard…</p>
        </div>
    );

    if (error) return (
        <div className="db-loading">
            <p className="db-error">⚠ {error}</p>
            <button className="db-logout-btn" onClick={handleLogout}>Back to Login</button>
        </div>
    );

    const NAV_ITEMS = [
        { id: "overview", icon: <LayoutDashboard size={18} />, label: "Overview" },
        { id: "profile", icon: <User size={18} />, label: "Profile" },
        { id: "plan", icon: <CreditCard size={18} />, label: "Plan" },
        { id: "notifications", icon: <Bell size={18} />, label: "Notification Plan" },
    ];

    const NOTIF_CHANNELS = [
        { key: "whatsapp", icon: "💬", label: "WhatsApp" },
        { key: "email", icon: "📧", label: "Email" },
        { key: "sms", icon: "📱", label: "SMS" },
    ];

    return (
        <div className="db-root">

            {/* ── SIDEBAR ── */}
            <aside className="db-sidebar">

                <div className="db-sidebar__brand">
                    <span className="db-brand-icon">⚕</span>
                    <span className="db-brand-name">DocEdge</span>
                </div>

                <div className="db-sidebar__nav">
                    {NAV_ITEMS.map(({ id, icon, label }) => (
                        <div
                            key={id}
                            role="button"
                            tabIndex={0}
                            className={`db-sidebar__link ${activeTab === id ? "db-sidebar__link--active" : ""}`}
                            onClick={() => handleTabChange(id)}
                            onKeyDown={(e) => e.key === "Enter" && handleTabChange(id)}
                        >
                            {icon}
                            <span>{label}</span>
                        </div>
                    ))}
                </div>

                <div className="db-sidebar__spacer" />

                <button className="db-logout-btn" onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                </button>

            </aside>

            {/* ── MAIN ── */}
            <main className="db-main">

                {/* Topbar */}
                <header className="db-topbar">
                    <div className="db-topbar__left">
                        <h1 className="db-topbar__title">
                            {activeTab === "overview" ? "Dashboard"
                                : activeTab === "profile" ? "My Profile"
                                    : activeTab === "plan" ? "Plan & Billing"
                                        : "Notification Plan"}
                        </h1>
                        <p className="db-topbar__sub">
                            Welcome back, <strong>{user?.doctorName || "Doctor"}</strong>
                        </p>
                    </div>
                    <div className="db-topbar__right">
                        <div className="db-avatar" title={user?.doctorName}>
                            {getInitials(user?.doctorName)}
                        </div>
                        <button className="db-logout-btn-top" onClick={handleLogout}>
                            <LogOut size={15} />
                            Logout
                        </button>
                    </div>
                </header>

                {/* ── OVERVIEW TAB ── */}
                {activeTab === "overview" && (
                    <div className="db-content">

                        <div className="db-plan-banner">
                            <div className="db-plan-banner__left">
                                <ShieldCheck size={22} />
                                <div>
                                    <div className="db-plan-banner__title">Active Plan</div>
                                    <div className="db-plan-banner__name">
                                        {user?.planName || "Solo Plan"} &nbsp;·&nbsp; Active
                                    </div>
                                </div>
                            </div>
                            <button className="db-plan-banner__btn" onClick={() => handleTabChange("plan")}>
                                View Plan
                            </button>
                        </div>

                        <div className="db-stats">
                            {[
                                { label: "Clinic", value: user?.clinicName || "—", icon: <Building2 size={20} /> },
                                { label: "Specialization", value: user?.specialization || "General", icon: <Stethoscope size={20} /> },
                                { label: "Member Since", value: formatDate(user?.createdAt), icon: <Calendar size={20} /> },
                                { label: "Last Login", value: formatDate(user?.lastLogin), icon: <Clock size={20} /> },
                            ].map(({ label, value, icon }) => (
                                <div key={label} className="db-stat-card">
                                    <div className="db-stat-card__icon">{icon}</div>
                                    <div className="db-stat-card__body">
                                        <div className="db-stat-card__label">{label}</div>
                                        <div className="db-stat-card__value">{value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="db-section-title">Quick Actions</div>
                        <div className="db-actions">
                            {[
                                { icon: "📋", label: "New Prescription", desc: "Create a digital prescription" },
                                { icon: "👤", label: "Add Patient", desc: "Register a new patient" },
                                { icon: "📅", label: "Book Appointment", desc: "Schedule a new appointment" },
                                { icon: "💬", label: "Send Reminder", desc: "WhatsApp / SMS reminder" },
                            ].map(({ icon, label, desc }) => (
                                <div key={label} className="db-action-card">
                                    <div className="db-action-card__icon">{icon}</div>
                                    <div className="db-action-card__label">{label}</div>
                                    <div className="db-action-card__desc">{desc}</div>
                                </div>
                            ))}
                        </div>

                    </div>
                )}

                {/* ── PROFILE TAB ── */}
                {activeTab === "profile" && (
                    <div className="db-content">
                        <div className="db-profile-card">

                            <div className="db-profile-hero">
                                <div className="db-profile-avatar">{getInitials(user?.doctorName)}</div>
                                <div>
                                    <div className="db-profile-name">{user?.doctorName}</div>
                                    <div className="db-profile-role">
                                        {user?.specialization || "General Physician"} &nbsp;·&nbsp;
                                        <span className="db-profile-badge">
                                            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || "Admin"}
                                        </span>
                                    </div>
                                </div>
                                <button className="db-edit-btn"><Edit3 size={14} /> Edit Profile</button>
                            </div>

                            <hr className="db-divider" />

                            <div className="db-profile-grid">
                                {[
                                    { icon: <User size={16} />, label: "Full Name", value: user?.doctorName },
                                    { icon: <Building2 size={16} />, label: "Clinic Name", value: user?.clinicName },
                                    { icon: <Mail size={16} />, label: "Email Address", value: user?.email },
                                    { icon: <Phone size={16} />, label: "Phone Number", value: user?.phone },
                                    { icon: <Stethoscope size={16} />, label: "Specialization", value: user?.specialization || "General Medicine" },
                                    { icon: <ShieldCheck size={16} />, label: "Account Role", value: user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) },
                                    { icon: <Calendar size={16} />, label: "Member Since", value: formatDate(user?.createdAt) },
                                    { icon: <Clock size={16} />, label: "Last Login", value: formatDate(user?.lastLogin) },
                                ].map(({ icon, label, value }) => (
                                    <div key={label} className="db-detail-row">
                                        <div className="db-detail-icon">{icon}</div>
                                        <div className="db-detail-body">
                                            <div className="db-detail-label">{label}</div>
                                            <div className="db-detail-value">{value || "—"}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr className="db-divider" />

                            <div className="db-danger-zone">
                                <div className="db-danger-zone__title">Account Actions</div>
                                <button className="db-btn-logout-full" onClick={handleLogout}>
                                    <LogOut size={16} /> Logout from DocEdge
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                {/* ── PLAN TAB ── */}
                {activeTab === "plan" && (
                    <div className="db-content">

                        {/* ════════════════════════════════════
                            SECTION 1 — DOCEDGE SUBSCRIPTION
                        ════════════════════════════════════ */}

                        <div className="db-section-title">DocEdge Subscription</div>

                        {planLoading && (
                            <div className="db-loading" style={{ minHeight: "unset", padding: "4rem" }}>
                                <div className="db-spinner" />
                                <p>Loading subscription details…</p>
                            </div>
                        )}

                        {!planLoading && planData && !planData.hasSubscription && (
                            <div className="db-no-sub">
                                <div className="db-no-sub__icon">📭</div>
                                <div className="db-no-sub__title">No Subscription Found</div>
                                <p className="db-no-sub__desc">Please contact support or purchase a plan.</p>
                            </div>
                        )}

                        {!planLoading && planData?.hasSubscription && (() => {
                            const c = planData.current;
                            const isExpired = c.isExpired;

                            return (
                                <>
                                    {!isExpired && c.daysLeft <= 7 && (
                                        <div className="db-alert db-alert--warn">
                                            ⚠️ Your plan expires in <strong>&nbsp;{c.daysLeft} day{c.daysLeft !== 1 ? "s" : ""}</strong>. Renew now to avoid interruption.
                                        </div>
                                    )}
                                    {isExpired && (
                                        <div className="db-alert db-alert--error">
                                            ❌ Your subscription has expired. Please renew to continue using DocEdge.
                                        </div>
                                    )}

                                    <div className="db-plan-detail-banner">

                                        <div className="db-plan-detail-banner__header">
                                            <ShieldCheck size={22} />
                                            <div className="db-plan-detail-banner__info">
                                                <div className="db-plan-detail-banner__label">Current Plan</div>
                                                <div className="db-plan-detail-banner__name">{c.planName}</div>
                                            </div>
                                            <span className={`db-plan-status-badge ${isExpired ? "db-plan-status-badge--expired" : "db-plan-status-badge--active"}`}>
                                                {isExpired ? "Expired" : "Active"}
                                            </span>
                                        </div>

                                        <div className="db-plan-stats-grid">
                                            {[
                                                { label: "Billing Cycle", value: c.interval === "yearly" ? "Annual" : "Monthly" },
                                                { label: "Expires On", value: formatDateShort(c.expiryDate) },
                                                { label: "Days Left", value: isExpired ? "—" : `${c.daysLeft} days` },
                                                { label: "Appointments Used", value: c.appointmentsUsed },
                                                { label: "Appointment Limit", value: c.appointmentLimit > 0 ? c.appointmentLimit : "Unlimited" },
                                                { label: "Total Paid", value: `₹${Number(c.totalPaid || 0).toLocaleString("en-IN")}` },
                                            ].map(({ label, value }) => (
                                                <div key={label} className="db-plan-stat-cell">
                                                    <div className="db-plan-stat-cell__label">{label}</div>
                                                    <div className="db-plan-stat-cell__value">{value}</div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                    <div className="db-section-title">Renewal History</div>

                                    {planData.history.length === 0 ? (
                                        <div className="db-history-empty">
                                            No renewals yet — this is your first billing cycle.
                                        </div>
                                    ) : (
                                        <div className="db-history-table-wrap">
                                            <table className="db-history-table">
                                                <thead>
                                                    <tr>
                                                        {["#", "Order ID", "Plan", "Interval", "Amount", "Paid On"].map((h, i) => (
                                                            <th key={h} className={i === 1 ? "col-order" : ""}>{h}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {planData.history.map((r, i) => (
                                                        <tr key={i}>
                                                            <td className="td-num">{planData.history.length - i}</td>
                                                            <td className="td-order col-order">{r.orderId}</td>
                                                            <td className="td-plan">{r.planName}</td>
                                                            <td>
                                                                <span className={`db-interval-badge db-interval-badge--${r.interval}`}>
                                                                    {r.interval}
                                                                </span>
                                                            </td>
                                                            <td className="td-amount">₹{Number(r.amount).toLocaleString("en-IN")}</td>
                                                            <td className="td-date">{formatDateShort(r.paidAt)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </>
                            );
                        })()}

                    </div>
                )}

                {/* ── NOTIFICATION PLAN TAB ── */}
                {activeTab === "notifications" && (
                    <div className="db-content">

                        <div className="db-section-title">Notification Subscription</div>

                        {notifLoading && (
                            <div className="db-loading" style={{ minHeight: "unset", padding: "4rem" }}>
                                <div className="db-spinner" />
                                <p>Loading notification plan…</p>
                            </div>
                        )}

                        {!notifLoading && notifSub && !notifSub.hasSubscription && (
                            <div className="db-no-sub">
                                <div className="db-no-sub__icon">🔕</div>
                                <div className="db-no-sub__title">No Notification Plan Active</div>
                                <p className="db-no-sub__desc">
                                    Subscribe to a notification plan for WhatsApp, email, and SMS reminders.
                                </p>
                            </div>
                        )}

                        {!notifLoading && notifSub?.hasSubscription && (() => {
                            const n = notifSub;

                            return (
                                <>
                                    {/* Expiry warning */}
                                    {n.daysLeft !== null && n.daysLeft <= 7 && (
                                        <div className="db-alert db-alert--warn">
                                            ⚠️ Notification plan expires in <strong>&nbsp;{n.daysLeft} day{n.daysLeft !== 1 ? "s" : ""}</strong>. Renew to keep reminders running.
                                        </div>
                                    )}

                                    {/* Plan card — teal gradient to differentiate from DocEdge plan */}
                                    <div
                                        className="db-plan-detail-banner"
                                        style={{ background: "linear-gradient(135deg, #0d5c63 0%, #0891b2 100%)" }}
                                    >
                                        {/* Header */}
                                        <div className="db-plan-detail-banner__header">
                                            <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>🔔</span>
                                            <div className="db-plan-detail-banner__info">
                                                <div className="db-plan-detail-banner__label">Notification Plan</div>
                                                <div className="db-plan-detail-banner__name">
                                                    {n.plan?.name}
                                                    {n.plan?.badge && (
                                                        <span style={{
                                                            fontSize: "0.63rem",
                                                            fontWeight: 700,
                                                            background: "rgba(255,255,255,0.18)",
                                                            padding: "2px 8px",
                                                            borderRadius: "100px",
                                                            marginLeft: "8px",
                                                            verticalAlign: "middle",
                                                            letterSpacing: "0.04em",
                                                        }}>
                                                            {n.plan.badge}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="db-plan-status-badge db-plan-status-badge--active">
                                                Active
                                            </span>
                                        </div>

                                        {/* Meta stats */}
                                        <div className="db-plan-stats-grid">
                                            {[
                                                { label: "Billing Cycle", value: n.interval === "yearly" ? "Annual" : "Monthly" },
                                                { label: "Expires On", value: formatDateShort(n.expiryDate) },
                                                { label: "Days Left", value: n.daysLeft !== null ? `${n.daysLeft} days` : "—" },
                                            ].map(({ label, value }) => (
                                                <div key={label} className="db-plan-stat-cell">
                                                    <div className="db-plan-stat-cell__label">{label}</div>
                                                    <div className="db-plan-stat-cell__value">{value}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Channel usage bars */}
                                        <div style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(3, 1fr)",
                                            gap: "0.75rem",
                                        }}>
                                            {NOTIF_CHANNELS.map(({ key, icon, label }) => {
                                                const ch = n.limits?.[key];
                                                if (!ch?.enabled) return null;

                                                const pct = Math.min(100, Math.round((ch.used / ch.limit) * 100));
                                                const isHigh = pct >= 90;
                                                const isMid = pct >= 70 && pct < 90;

                                                return (
                                                    <div key={key} style={{
                                                        background: "rgba(255,255,255,0.12)",
                                                        borderRadius: "10px",
                                                        padding: "0.75rem 1rem",
                                                        backdropFilter: "blur(4px)",
                                                    }}>
                                                        {/* Channel label */}
                                                        <div style={{
                                                            fontSize: "0.63rem",
                                                            opacity: 0.7,
                                                            fontWeight: 700,
                                                            textTransform: "uppercase",
                                                            letterSpacing: "0.06em",
                                                            marginBottom: "6px",
                                                        }}>
                                                            {icon} {label}
                                                        </div>

                                                        {/* Used / limit */}
                                                        <div style={{ fontWeight: 800, fontSize: "1.05rem", lineHeight: 1 }}>
                                                            {ch.used}
                                                            <span style={{ fontWeight: 500, fontSize: "0.75rem", opacity: 0.65 }}>
                                                                &nbsp;/ {ch.limit}
                                                            </span>
                                                        </div>

                                                        {/* Progress bar */}
                                                        <div style={{
                                                            marginTop: "8px",
                                                            height: "4px",
                                                            borderRadius: "4px",
                                                            background: "rgba(255,255,255,0.2)",
                                                        }}>
                                                            <div style={{
                                                                height: "100%",
                                                                borderRadius: "4px",
                                                                width: `${pct}%`,
                                                                background: isHigh ? "#fc8181" : isMid ? "#fbbf24" : "#fff",
                                                                transition: "width 0.4s ease",
                                                            }} />
                                                        </div>

                                                        {/* Remaining */}
                                                        <div style={{
                                                            fontSize: "0.68rem",
                                                            opacity: 0.65,
                                                            marginTop: "5px",
                                                        }}>
                                                            {ch.remaining} remaining
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {/* If ALL channels are disabled */}
                                            {NOTIF_CHANNELS.every(({ key }) => !n.limits?.[key]?.enabled) && (
                                                <div style={{
                                                    gridColumn: "1 / -1",
                                                    background: "rgba(255,255,255,0.08)",
                                                    borderRadius: "10px",
                                                    padding: "0.75rem 1rem",
                                                    fontSize: "0.8rem",
                                                    opacity: 0.7,
                                                    textAlign: "center",
                                                }}>
                                                    No channels enabled in this plan.
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                    {/* Notification plan payment info */}
                                    <div className="db-history-table-wrap">
                                        <table className="db-history-table">
                                            <thead>
                                                <tr>
                                                    {["Plan", "Interval", "Amount Paid", "Active Since", "Expires On"].map(h => (
                                                        <th key={h}>{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="td-plan">{n.plan?.name || "—"}</td>
                                                    <td>
                                                        <span className={`db-interval-badge db-interval-badge--${n.interval}`}>
                                                            {n.interval}
                                                        </span>
                                                    </td>
                                                    <td className="td-amount">
                                                        ₹{Number(n.paidAmount || 0).toLocaleString("en-IN")}
                                                    </td>
                                                    <td className="td-date">
                                                        {n.expiryDate
                                                            ? formatDateShort(
                                                                new Date(new Date(n.expiryDate).getTime() - (n.interval === "yearly" ? 365 : 30) * 24 * 60 * 60 * 1000)
                                                            )
                                                            : "—"
                                                        }
                                                    </td>
                                                    <td className="td-date">{formatDateShort(n.expiryDate)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            );
                        })()}

                    </div>
                )}

            </main>
        </div>
    );
}