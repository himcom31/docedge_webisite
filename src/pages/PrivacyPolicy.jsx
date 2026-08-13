import { useState } from "react";

const styles = {
  // ── Reset & base ──────────────────────────────────────────────────────────
  "*": { boxSizing: "border-box", margin: 0, padding: 0 },

  page: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    background: "#f0f6ff",
    minHeight: "100vh",
    color: "#1a2340",
  },

  // ── Navbar ────────────────────────────────────────────────────────────────
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "#ffffff",
    borderBottom: "1px solid #dbeafe",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
    boxShadow: "0 1px 8px rgba(14,99,225,0.07)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  },
  logoIcon: {
    width: 36,
    height: 36,
    background: "linear-gradient(135deg,#0e63e1 0%,#22d3ee 100%)",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 800,
    fontSize: 18,
    letterSpacing: -1,
  },
  logoText: {
    fontWeight: 800,
    fontSize: 20,
    color: "#0e63e1",
    letterSpacing: 1,
  },
  navBack: {
    background: "#0e63e1",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "9px 20px",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    background: "linear-gradient(120deg,#0e63e1 0%,#0891b2 100%)",
    padding: "60px 40px 50px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.15)",
    color: "#bfdbfe",
    borderRadius: 20,
    padding: "5px 16px",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  heroDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#4ade80",
    display: "inline-block",
  },
  heroTitle: {
    fontSize: 44,
    fontWeight: 800,
    color: "#ffffff",
    lineHeight: 1.15,
    marginBottom: 16,
  },
  heroTitleAccent: {
    color: "#7dd3fc",
  },
  heroSub: {
    fontSize: 16,
    color: "#bfdbfe",
    maxWidth: 560,
    margin: "0 auto 28px",
    lineHeight: 1.7,
  },
  heroMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    flexWrap: "wrap",
  },
  heroMetaChip: {
    background: "rgba(255,255,255,0.12)",
    color: "#e0f2fe",
    borderRadius: 8,
    padding: "6px 14px",
    fontSize: 13,
    fontWeight: 500,
  },

  // ── Quick-nav ─────────────────────────────────────────────────────────────
  quickNav: {
    background: "#ffffff",
    borderBottom: "1px solid #dbeafe",
    padding: "0 40px",
    display: "flex",
    gap: 0,
    overflowX: "auto",
  },
  quickNavBtn: {
    padding: "14px 18px",
    fontSize: 13,
    fontWeight: 600,
    color: "#64748b",
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "color .2s,border-color .2s",
  },
  quickNavBtnActive: {
    color: "#0e63e1",
    borderBottom: "2px solid #0e63e1",
  },

  // ── Layout ────────────────────────────────────────────────────────────────
  layout: {
    maxWidth: 1100,
    margin: "48px auto",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    gap: 32,
    alignItems: "start",
  },

  // ── Sidebar TOC ───────────────────────────────────────────────────────────
  sidebar: {
    position: "sticky",
    top: 80,
    background: "#ffffff",
    borderRadius: 16,
    border: "1px solid #dbeafe",
    padding: "24px 20px",
    boxShadow: "0 2px 12px rgba(14,99,225,0.06)",
  },
  sidebarTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#94a3b8",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  tocItem: {
    display: "block",
    padding: "7px 10px",
    fontSize: 13,
    fontWeight: 500,
    color: "#475569",
    textDecoration: "none",
    borderRadius: 8,
    cursor: "pointer",
    border: "none",
    background: "none",
    width: "100%",
    textAlign: "left",
    transition: "background .15s,color .15s",
    marginBottom: 2,
  },
  tocItemActive: {
    background: "#eff6ff",
    color: "#0e63e1",
    fontWeight: 600,
  },

  // ── Main content ──────────────────────────────────────────────────────────
  main: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  // intro card
  introCard: {
    background: "#ffffff",
    borderRadius: 16,
    border: "1px solid #dbeafe",
    padding: "32px 36px",
    boxShadow: "0 2px 12px rgba(14,99,225,0.06)",
  },
  importantBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "#fef3c7",
    color: "#92400e",
    borderRadius: 8,
    padding: "5px 12px",
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 16,
  },
  introText: {
    fontSize: 15,
    lineHeight: 1.75,
    color: "#334155",
  },
  introHighlight: {
    background: "#eff6ff",
    borderLeft: "3px solid #0e63e1",
    borderRadius: "0 10px 10px 0",
    padding: "14px 18px",
    fontSize: 14,
    color: "#1e40af",
    marginTop: 20,
    fontWeight: 500,
    lineHeight: 1.65,
  },

  // section card
  sectionCard: {
    background: "#ffffff",
    borderRadius: 16,
    border: "1px solid #dbeafe",
    padding: "32px 36px",
    boxShadow: "0 2px 12px rgba(14,99,225,0.06)",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 20,
  },
  sectionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "linear-gradient(135deg,#eff6ff,#dbeafe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    flexShrink: 0,
  },
  sectionNumber: {
    fontSize: 11,
    fontWeight: 700,
    color: "#0e63e1",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0f172a",
  },
  sectionBody: {
    fontSize: 15,
    lineHeight: 1.8,
    color: "#334155",
  },
  sectionDivider: {
    height: 1,
    background: "#f1f5f9",
    margin: "20px 0",
  },

  // bullet list
  bulletList: {
    listStyle: "none",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px 20px",
    marginTop: 14,
  },
  bulletListSingle: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 14,
  },
  bulletItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    fontSize: 14,
    color: "#475569",
    lineHeight: 1.6,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#0e63e1",
    marginTop: 7,
    flexShrink: 0,
  },

  // sub-section
  subSection: {
    background: "#f8fafc",
    borderRadius: 12,
    padding: "18px 20px",
    marginTop: 16,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 10,
  },

  // rights grid
  rightsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginTop: 14,
  },
  rightChip: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "#1e40af",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  // contact card
  contactCard: {
    background: "linear-gradient(120deg,#0e63e1 0%,#0891b2 100%)",
    borderRadius: 16,
    padding: "36px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 24,
    boxShadow: "0 4px 24px rgba(14,99,225,0.25)",
  },
  contactInfo: { flex: 1 },
  contactTitle: {
    fontSize: 22,
    fontWeight: 800,
    marginBottom: 8,
  },
  contactSub: {
    fontSize: 14,
    color: "#bfdbfe",
    lineHeight: 1.6,
  },
  contactLinks: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  contactLink: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    padding: "10px 16px",
    fontSize: 14,
    color: "#fff",
    fontWeight: 500,
    textDecoration: "none",
  },

  // footer
  footer: {
    textAlign: "center",
    padding: "32px 20px",
    fontSize: 13,
    color: "#94a3b8",
    borderTop: "1px solid #e2e8f0",
    marginTop: 20,
    background: "#ffffff",
  },
};

// ── Data ─────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: "information-we-collect",
    icon: "📋",
    num: "01",
    title: "Information We Collect",
    content: (
      <>
        <p style={styles.sectionBody}>
          Depending on how you use DocEdge, we may collect the following
          categories of information when a clinic or healthcare professional
          creates an account.
        </p>
        <div style={styles.subSection}>
          <p style={styles.subTitle}>Account & Clinic Information</p>
          <ul style={styles.bulletList}>
            {[
              "Full name",
              "Doctor's professional information",
              "Clinic or organization name",
              "Email address",
              "Phone number",
              "Clinic address",
              "Login credentials",
              "Subscription details",
              "Clinic logo & branding",
              "Preferences & configuration",
            ].map((i) => (
              <li key={i} style={styles.bulletItem}>
                <span style={styles.bullet} />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div style={styles.subSection}>
          <p style={styles.subTitle}>Patient Information</p>
          <p style={{ ...styles.sectionBody, marginBottom: 12 }}>
            DocEdge allows authorized healthcare professionals to maintain
            digital patient records. Information may include:
          </p>
          <ul style={styles.bulletList}>
            {[
              "Patient name & date of birth",
              "Gender & contact information",
              "Medical history",
              "Symptoms & diagnoses",
              "Prescriptions & dosage",
              "Allergies",
              "Clinical notes",
              "Appointment information",
              "Billing & payment details",
              "Medical documents",
            ].map((i) => (
              <li key={i} style={styles.bulletItem}>
                <span style={styles.bullet} />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </>
    ),
  },
  {
    id: "payment-information",
    icon: "💳",
    num: "02",
    title: "Payment & Subscription Information",
    content: (
      <>
        <p style={styles.sectionBody}>
          If you purchase a DocEdge subscription, we may collect information
          relating to your plan, billing status, transactions, and invoices.
          Payments are processed through trusted third-party providers — we do
          not store complete payment card numbers on our own systems.
        </p>
        <ul style={styles.bulletListSingle}>
          {[
            "Subscription plan & billing status",
            "Transaction & invoice information",
            "Payment status & billing address",
          ].map((i) => (
            <li key={i} style={styles.bulletItem}>
              <span style={styles.bullet} />
              {i}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    icon: "⚙️",
    num: "03",
    title: "How We Use Information",
    content: (
      <>
        <p style={styles.sectionBody}>
          We use the information we collect to provide, operate, and continuously
          improve the DocEdge platform.
        </p>
        {[
          {
            label: "Service Delivery",
            items: [
              "Create and manage accounts",
              "Store and display patient records",
              "Generate prescriptions",
              "Manage appointments & billing",
              "Provide reports and analytics",
            ],
          },
          {
            label: "Platform Improvement",
            items: [
              "Improve performance & features",
              "Troubleshoot technical issues",
              "Analyze service usage patterns",
              "Enhance user experience",
            ],
          },
          {
            label: "Security & Fraud Prevention",
            items: [
              "Authenticate users",
              "Detect unauthorized access",
              "Maintain security logs",
              "Investigate security incidents",
            ],
          },
        ].map((group) => (
          <div key={group.label} style={styles.subSection}>
            <p style={styles.subTitle}>{group.label}</p>
            <ul style={styles.bulletListSingle}>
              {group.items.map((i) => (
                <li key={i} style={styles.bulletItem}>
                  <span style={styles.bullet} />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </>
    ),
  },
  {
    id: "data-security",
    icon: "🔐",
    num: "04",
    title: "Data Security",
    content: (
      <>
        <p style={styles.sectionBody}>
          We implement reasonable technical and organizational measures designed
          to protect information against unauthorized access, disclosure,
          accidental loss, destruction, or misuse. Security measures include:
        </p>
        <ul style={styles.bulletList}>
          {[
            "Appropriate access controls",
            "Authentication mechanisms",
            "Encryption where appropriate",
            "Continuous monitoring",
            "Regular backups",
            "Infrastructure security controls",
          ].map((i) => (
            <li key={i} style={styles.bulletItem}>
              <span style={styles.bullet} />
              {i}
            </li>
          ))}
        </ul>
        <div
          style={{
            ...styles.introHighlight,
            background: "#fef9c3",
            borderLeft: "3px solid #eab308",
            color: "#713f12",
          }}
        >
          ⚠️ No internet-based service can guarantee absolute security. Users
          are responsible for protecting their account credentials and must
          immediately notify DocEdge if they suspect unauthorized access.
        </div>
      </>
    ),
  },
  {
    id: "data-sharing",
    icon: "🔄",
    num: "05",
    title: "Data Sharing & Disclosure",
    content: (
      <>
        <p style={styles.sectionBody}>
          We do not sell patient medical information for advertising purposes. We
          may share information only in the limited circumstances below.
        </p>
        {[
          {
            label: "Service Providers",
            text:
              "We may use third-party providers for cloud hosting, database infrastructure, email delivery, SMS/WhatsApp services, payment processing, analytics, security, and backup storage. Providers may process information only as necessary to deliver their services.",
          },
          {
            label: "Legal Requirements",
            text:
              "We may disclose information to comply with applicable law, respond to lawful government requests, court orders, or to protect the rights and safety of users.",
          },
          {
            label: "Business Transactions",
            text:
              "If DocEdge is involved in a merger, acquisition, or sale of assets, information may be transferred as part of that transaction, subject to applicable law.",
          },
        ].map((item) => (
          <div key={item.label} style={styles.subSection}>
            <p style={styles.subTitle}>{item.label}</p>
            <p style={{ ...styles.sectionBody, fontSize: 14 }}>{item.text}</p>
          </div>
        ))}
      </>
    ),
  },
  {
    id: "data-retention",
    icon: "🗄️",
    num: "06",
    title: "Data Retention & Deletion",
    content: (
      <>
        <p style={styles.sectionBody}>
          We retain information for as long as reasonably necessary to provide
          services, maintain accounts, comply with legal requirements, and
          resolve disputes. Patient information may remain within a clinic's
          account according to its retention requirements and applicable law.
        </p>
        <div style={styles.subSection}>
          <p style={styles.subTitle}>Data Deletion</p>
          <p style={{ ...styles.sectionBody, fontSize: 14 }}>
            Depending on applicable law and user role, users may request
            deletion of personal information. Clinic administrators may request
            deletion or export of their organization's data, subject to legal
            retention requirements, contractual obligations, and backup
            procedures.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "your-rights",
    icon: "⚖️",
    num: "07",
    title: "Your Privacy Rights",
    content: (
      <>
        <p style={styles.sectionBody}>
          Depending on your location and applicable law, you may have the
          following rights relating to your personal information:
        </p>
        <div style={styles.rightsGrid}>
          {[
            { icon: "👁️", label: "Access Information" },
            { icon: "✏️", label: "Correct Inaccuracies" },
            { icon: "🗑️", label: "Request Deletion" },
            { icon: "⏸️", label: "Restrict Processing" },
            { icon: "🚫", label: "Object to Processing" },
            { icon: "📦", label: "Data Portability" },
            { icon: "↩️", label: "Withdraw Consent" },
            { icon: "🏛️", label: "Lodge a Complaint" },
          ].map((r) => (
            <div key={r.label} style={styles.rightChip}>
              <span>{r.icon}</span>
              {r.label}
            </div>
          ))}
        </div>
        <div style={styles.introHighlight}>
          ℹ️ Because DocEdge processes patient information on behalf of
          healthcare organizations, some requests concerning patient records may
          need to be directed to the relevant clinic or healthcare provider.
        </div>
      </>
    ),
  },
  {
    id: "cookies",
    icon: "🍪",
    num: "08",
    title: "Cookies & Tracking",
    content: (
      <>
        <p style={styles.sectionBody}>
          DocEdge may use cookies and similar technologies to keep users signed
          in, maintain sessions, remember preferences, improve functionality,
          analyze website usage, and improve security.
        </p>
        <p style={{ ...styles.sectionBody, marginTop: 14 }}>
          You may control cookies through your browser settings. Disabling
          certain cookies may affect functionality of the platform.
        </p>
      </>
    ),
  },
  {
    id: "children",
    icon: "👶",
    num: "09",
    title: "Children's Information",
    content: (
      <p style={styles.sectionBody}>
        DocEdge is primarily intended for use by healthcare professionals,
        clinics, and authorized staff. DocEdge does not knowingly collect
        children's personal information directly for marketing purposes.
        Healthcare providers may enter information relating to child patients as
        part of legitimate medical services. The relevant clinic or healthcare
        provider is responsible for obtaining required parental or guardian
        authorization and complying with applicable laws.
      </p>
    ),
  },
  {
    id: "changes",
    icon: "📝",
    num: "10",
    title: "Changes to This Policy",
    content: (
      <p style={styles.sectionBody}>
        We may update this Privacy Policy periodically to reflect changes to our
        Services, technology, applicable law, or business practices. When we
        make material changes, we will provide notice through the website,
        application, email, or other appropriate means. The updated version will
        be effective from the date stated at the beginning of the policy.
      </p>
    ),
  },
];

const tocItems = sections.map((s) => ({ id: s.id, label: s.title }));

// ── Component ─────────────────────────────────────────────────────────────────

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 130;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setActiveSection(id);
  };

  return (
    <div style={styles.page}>
      {/* ── Navbar ── */}
      

      {/* ── Hero ── */}
      <div style={styles.hero}>
        <div style={styles.heroEyebrow}>
          <span style={styles.heroDot} />
          Legal & Compliance
        </div>
        <h1 style={styles.heroTitle}>
          Privacy{" "}
          <span style={styles.heroTitleAccent}>Policy</span>
        </h1>
        <p style={styles.heroSub}>
          We are committed to protecting the information entrusted to us by
          doctors, clinics, healthcare professionals, and patients across India.
        </p>
        <div style={styles.heroMeta}>
          <span style={styles.heroMetaChip}>🌐 docedge.in</span>
          <span style={styles.heroMetaChip}>📅 Effective: 2025</span>
          <span style={styles.heroMetaChip}>🇮🇳 Indian Healthcare Compliant</span>
        </div>
      </div>

      {/* ── Quick Nav ── */}
      <div style={styles.quickNav}>
        {tocItems.slice(0, 6).map((t) => (
          <button
            key={t.id}
            style={{
              ...styles.quickNavBtn,
              ...(activeSection === t.id ? styles.quickNavBtnActive : {}),
            }}
            onClick={() => scrollTo(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div style={styles.layout}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <p style={styles.sidebarTitle}>Table of Contents</p>
          {tocItems.map((t) => (
            <button
              key={t.id}
              style={{
                ...styles.tocItem,
                ...(activeSection === t.id ? styles.tocItemActive : {}),
              }}
              onClick={() => scrollTo(t.id)}
            >
              {t.label}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main style={styles.main}>
          {/* Intro card */}
          <div style={styles.introCard}>
            <div style={styles.importantBadge}>⚠️ Important Notice</div>
            <p style={styles.introText}>
              DocEdge ("DocEdge," "we," "us," or "our") respects your privacy
              and is committed to protecting the information entrusted to us by
              doctors, clinics, healthcare professionals, staff members, and
              other users of our platform.
            </p>
            <p style={{ ...styles.introText, marginTop: 14 }}>
              This Privacy Policy explains how we collect, use, store, process,
              disclose, and protect information when you access or use the
              DocEdge website at{" "}
              <strong style={{ color: "#0e63e1" }}>docedge.in</strong>, the
              DocEdge application, clinic management platform, prescription
              software, and related services (collectively, the "Services").
            </p>
            <div style={styles.introHighlight}>
              DocEdge is a software platform for healthcare professionals and
              clinics. DocEdge does not itself provide medical diagnosis or
              treatment. Healthcare professionals remain responsible for the
              accuracy, legality, security, and appropriate use of patient
              information entered into the platform.
            </div>
          </div>

          {/* Section cards */}
          {sections.map((sec) => (
            <div key={sec.id} id={sec.id} style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIcon}>{sec.icon}</div>
                <div>
                  <p style={styles.sectionNumber}>Section {sec.num}</p>
                  <h2 style={styles.sectionTitle}>{sec.title}</h2>
                </div>
              </div>
              <div style={styles.sectionDivider} />
              {sec.content}
            </div>
          ))}

          {/* Contact card */}
          <div id="contact-us" style={styles.contactCard}>
            <div style={styles.contactInfo}>
              <h2 style={styles.contactTitle}>Contact Us</h2>
              <p style={styles.contactSub}>
                Have questions, concerns, or requests regarding this Privacy
                Policy or the handling of personal information? We're here to
                help.
              </p>
            </div>
            <div style={styles.contactLinks}>
              <a href="https://docedge.in" style={styles.contactLink}>
                🌐 docedge.in
              </a>
              <a
                href="mailto:privacy@docedge.in"
                style={styles.contactLink}
              >
                📧 privacy@docedge.in
              </a>
              <a
                href="mailto:support@docedge.in"
                style={styles.contactLink}
              >
                🛠️ support@docedge.in
              </a>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      
    </div>
  );
}