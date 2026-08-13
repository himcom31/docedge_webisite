import React, { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0d1b3e;
    --blue: #1565c0;
    --blue-mid: #1976d2;
    --cyan: #00b4d8;
    --cyan-light: #48cae4;
    --bg: #f0f6ff;
    --bg-white: #ffffff;
    --text-primary: #0d1b3e;
    --text-secondary: #4a5568;
    --text-muted: #718096;
    --border: #dbe8f8;
    --shadow: 0 2px 16px rgba(13,27,62,0.08);
  }

  body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-primary); }

  .de-terms-root { min-height: 100vh; }

  /* ── TOPBAR ── */
  .de-topbar {
    background: linear-gradient(90deg, var(--navy) 0%, #1a3464 100%);
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    padding: 10px 16px;
    letter-spacing: 0.01em;
  }
  .de-topbar span { color: var(--cyan-light); }
  .de-topbar a { color: var(--cyan-light); text-decoration: underline; margin-left: 8px; }

  /* ── NAVBAR ── */
  .de-nav {
    background: #fff;
    border-bottom: 1.5px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 12px rgba(13,27,62,0.07);
  }
  .de-nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    height: 64px;
  }
  .de-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }
  .de-logo-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--navy) 60%, var(--blue-mid));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
    font-weight: 800;
    font-family: 'Plus Jakarta Sans', sans-serif;
    letter-spacing: -1px;
  }
  .de-logo-text {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800;
    font-size: 20px;
    color: var(--navy);
    letter-spacing: 0.06em;
  }
  .de-nav-links {
    display: flex;
    align-items: center;
    gap: 28px;
    list-style: none;
  }
  .de-nav-links a {
    text-decoration: none;
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s;
  }
  .de-nav-links a:hover { color: var(--blue); }
  .de-nav-actions { display: flex; gap: 10px; align-items: center; }
  .de-btn-outline {
    border: 1.5px solid var(--navy);
    background: transparent;
    color: var(--navy);
    padding: 8px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    font-family: 'Inter', sans-serif;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .de-btn-outline:hover { background: var(--navy); color: #fff; }
  .de-btn-primary {
    background: linear-gradient(90deg, var(--blue) 0%, var(--cyan) 100%);
    color: #fff;
    border: none;
    padding: 8px 22px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: opacity 0.2s;
  }
  .de-btn-primary:hover { opacity: 0.88; }

  /* ── HERO ── */
  .de-hero {
    background: linear-gradient(135deg, var(--navy) 0%, #1a3464 55%, #0a5fa3 100%);
    color: #fff;
    padding: 64px 32px 56px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .de-hero::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 340px; height: 340px;
    background: radial-gradient(circle, rgba(0,180,216,0.18) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
  .de-hero::after {
    content: '';
    position: absolute;
    bottom: -60px; left: -60px;
    width: 260px; height: 260px;
    background: radial-gradient(circle, rgba(72,202,228,0.13) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
  .de-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.22);
    border-radius: 100px;
    padding: 6px 18px;
    font-size: 13px;
    font-weight: 500;
    color: var(--cyan-light);
    margin-bottom: 22px;
    letter-spacing: 0.02em;
  }
  .de-hero h1 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(28px, 5vw, 46px);
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 14px;
    letter-spacing: -0.02em;
  }
  .de-hero h1 span { color: var(--cyan); }
  .de-hero-sub {
    font-size: 15px;
    color: rgba(255,255,255,0.7);
    max-width: 520px;
    margin: 0 auto 28px;
    line-height: 1.6;
  }
  .de-hero-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
  }
  .de-hero-meta-item {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 13px;
    color: rgba(255,255,255,0.75);
  }
  .de-hero-meta-item .dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--cyan);
    flex-shrink: 0;
  }

  /* ── LAYOUT ── */
  .de-content-wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 32px 80px;
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 40px;
    align-items: start;
  }

  /* ── SIDEBAR ── */
  .de-sidebar {
    position: sticky;
    top: 80px;
  }
  .de-sidebar-card {
    background: var(--bg-white);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 24px 20px;
    box-shadow: var(--shadow);
  }
  .de-sidebar-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-muted);
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
  }
  .de-toc-list { list-style: none; }
  .de-toc-item {
    margin-bottom: 2px;
  }
  .de-toc-link {
    display: block;
    padding: 7px 10px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }
  .de-toc-link:hover { background: var(--bg); color: var(--blue); }
  .de-toc-link.active { background: #e8f1ff; color: var(--blue); font-weight: 600; }
  .de-sidebar-contact {
    margin-top: 20px;
    padding-top: 18px;
    border-top: 1px solid var(--border);
  }
  .de-sidebar-contact p {
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 8px;
    font-weight: 500;
  }
  .de-sidebar-contact a {
    display: block;
    font-size: 12px;
    color: var(--blue);
    text-decoration: none;
    margin-bottom: 4px;
  }
  .de-sidebar-contact a:hover { text-decoration: underline; }

  /* ── MAIN ── */
  .de-main {}

  .de-section-block {
    background: var(--bg-white);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 36px 40px;
    margin-bottom: 20px;
    box-shadow: var(--shadow);
    scroll-margin-top: 90px;
    transition: border-color 0.2s;
  }
  .de-section-block:hover { border-color: #b3d0f5; }

  .de-section-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 20px;
    padding-bottom: 18px;
    border-bottom: 1.5px solid var(--border);
  }
  .de-section-num {
    min-width: 36px;
    height: 36px;
    border-radius: 9px;
    background: linear-gradient(135deg, var(--blue) 0%, var(--cyan) 100%);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .de-section-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--navy);
    line-height: 1.3;
  }
  .de-section-body {
    font-size: 14.5px;
    color: var(--text-secondary);
    line-height: 1.75;
  }
  .de-section-body p { margin-bottom: 12px; }
  .de-section-body p:last-child { margin-bottom: 0; }
  .de-section-body ul {
    list-style: none;
    margin: 10px 0 14px 0;
    padding: 0;
  }
  .de-section-body ul li {
    padding: 5px 0 5px 22px;
    position: relative;
    font-size: 14px;
    color: var(--text-secondary);
  }
  .de-section-body ul li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 13px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--cyan);
  }
  .de-section-body strong { color: var(--navy); font-weight: 600; }
  .de-section-body a { color: var(--blue); text-decoration: none; }
  .de-section-body a:hover { text-decoration: underline; }

  /* ── IMPORTANT NOTICE ── */
  .de-notice {
    background: linear-gradient(135deg, #fff7e6 0%, #fff3d6 100%);
    border: 1.5px solid #f59e0b;
    border-radius: 14px;
    padding: 20px 24px;
    margin-bottom: 20px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  .de-notice-icon {
    font-size: 22px;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .de-notice-text {
    font-size: 14px;
    color: #78350f;
    line-height: 1.6;
    font-weight: 500;
  }
  .de-notice-text strong { color: #92400e; }

  /* ── CONTACT FOOTER ── */
  .de-contact-block {
    background: linear-gradient(135deg, var(--navy) 0%, #1a3464 100%);
    border-radius: 16px;
    padding: 40px;
    color: #fff;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: center;
  }
  .de-contact-block h3 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 8px;
  }
  .de-contact-block p {
    font-size: 14px;
    color: rgba(255,255,255,0.7);
    line-height: 1.6;
  }
  .de-contact-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .de-contact-link {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 10px;
    padding: 10px 16px;
    color: #fff;
    text-decoration: none;
    font-size: 13.5px;
    font-weight: 500;
    transition: background 0.2s;
  }
  .de-contact-link:hover { background: rgba(255,255,255,0.16); }
  .de-contact-link .icon { font-size: 16px; }

  /* ── FOOTER ── */
  .de-footer {
    background: var(--navy);
    color: rgba(255,255,255,0.55);
    text-align: center;
    padding: 24px 32px;
    font-size: 13px;
  }
  .de-footer a { color: var(--cyan-light); text-decoration: none; }
  .de-footer a:hover { text-decoration: underline; }

  /* ── SCROLL TO TOP ── */
  .de-scroll-top {
    position: fixed;
    bottom: 32px;
    right: 32px;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--blue) 0%, var(--cyan) 100%);
    color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 16px rgba(21,101,192,0.35);
    transition: opacity 0.3s, transform 0.2s;
    z-index: 50;
  }
  .de-scroll-top:hover { transform: translateY(-2px); }

  @media (max-width: 900px) {
    .de-content-wrap { grid-template-columns: 1fr; }
    .de-sidebar { position: static; }
    .de-contact-block { grid-template-columns: 1fr; }
    .de-section-block { padding: 24px 20px; }
    .de-nav-links { display: none; }
  }
  @media (max-width: 600px) {
    .de-content-wrap { padding: 24px 16px 60px; }
    .de-hero { padding: 44px 16px 40px; }
    .de-hero-meta { gap: 16px; }
  }
`;

const sections = [
  {
    id: "about",
    num: "1",
    title: "About DocEdge",
    content: (
      <>
        <p>DocEdge is a software-as-a-service ("SaaS") platform designed to help healthcare professionals, doctors, clinics, and healthcare organizations manage administrative and clinical workflows.</p>
        <p>Depending on the subscription and configuration, DocEdge may provide functionality including:</p>
        <ul>
          {["Patient management","Digital patient records","Appointment management","Digital prescriptions","Prescription customization","Clinical templates","Billing and invoicing","Follow-up management","Reports and analytics","Staff and user management","Notifications and communications","WhatsApp or other third-party integrations","Clinic workflow customization"].map(i => <li key={i}>{i}</li>)}
        </ul>
        <p>The features available to you depend on your selected subscription plan and any separately agreed services.</p>
      </>
    )
  },
  {
    id: "eligibility",
    num: "2",
    title: "Eligibility",
    content: (
      <>
        <p>You may use DocEdge only if:</p>
        <ul>
          {["You are legally capable of entering into a binding agreement","You provide accurate account information","You have the authority to represent the clinic or organization you register","Your use of the Services complies with applicable laws and regulations"].map(i => <li key={i}>{i}</li>)}
        </ul>
        <p>If you create an account on behalf of a clinic, hospital, or organization, you represent that you have authority to accept these Terms on its behalf.</p>
      </>
    )
  },
  {
    id: "registration",
    num: "3",
    title: "Account Registration",
    content: (
      <>
        <p>To use certain DocEdge features, you may need to create an account. You agree to:</p>
        <ul>
          {["Provide accurate and current information","Keep your login credentials confidential","Use unique and secure passwords","Prevent unauthorized access to your account","Immediately notify us of suspected unauthorized access","Ensure that authorized staff use their own accounts where appropriate"].map(i => <li key={i}>{i}</li>)}
        </ul>
        <p>You are responsible for activities conducted through your account unless caused by a security incident attributable to DocEdge.</p>
      </>
    )
  },
  {
    id: "clinic-admin",
    num: "4",
    title: "Clinic Administrator Responsibilities",
    content: (
      <>
        <p>If you are a clinic administrator or account owner, you are responsible for:</p>
        <ul>
          {["Managing authorized users","Assigning appropriate permissions","Removing access when staff leave the organization","Maintaining accurate clinic information","Ensuring appropriate patient consent and authorization","Ensuring lawful use of patient information","Ensuring that staff use the platform appropriately"].map(i => <li key={i}>{i}</li>)}
        </ul>
        <p>DocEdge provides technology to support your operations but does not determine how your clinic should provide medical care.</p>
      </>
    )
  },
  {
    id: "healthcare-resp",
    num: "5",
    title: "Healthcare Professional Responsibility",
    content: (
      <>
        <p>DocEdge is a software platform and is <strong>not a doctor, healthcare provider, medical professional, or medical decision-making service</strong>.</p>
        <p>Healthcare professionals remain solely responsible for: patient diagnosis, treatment decisions, prescriptions, medication selection and dosage, clinical notes, medical records, patient communication, clinical accuracy, and compliance with applicable healthcare regulations.</p>
        <p>DocEdge does not guarantee that any diagnosis, prescription, medication, treatment recommendation, or clinical information generated, entered, stored, or displayed through the platform is medically correct. You must independently review all clinical information before providing it to a patient.</p>
      </>
    )
  },
  {
    id: "patient-data",
    num: "6",
    title: "Patient Data",
    content: (
      <>
        <p>Users may enter patient information into DocEdge. The clinic or healthcare organization remains responsible for determining what information is collected, why it is collected, whether appropriate consent or authorization is required, how the information is used, how long it must be retained, and who should have access to it.</p>
        <p>Your use of patient information must comply with all applicable privacy and healthcare laws. Additional provisions regarding personal information are described in the DocEdge Privacy Policy.</p>
      </>
    )
  },
  {
    id: "subscriptions",
    num: "7",
    title: "Subscription Plans",
    content: (
      <>
        <p>DocEdge may offer multiple subscription plans, including:</p>
        <ul>
          {["Starter","Basic","Professional","Clinic Pro","Enterprise"].map(i => <li key={i}>{i}</li>)}
        </ul>
        <p>Plans may differ in number of doctors, staff users, monthly consultations, appointment limits, features, storage, integrations, support, customization, and other usage limits. The features and limits applicable to your account will be those displayed at the time of purchase or otherwise agreed with you.</p>
      </>
    )
  },
  {
    id: "usage-plans",
    num: "8",
    title: "Usage-Based Plans",
    content: (
      <>
        <p>Certain DocEdge plans may be based on monthly usage, including consultations, patient visits, appointments, or other measurable activity.</p>
        <p>Unless specifically stated otherwise, patient records may remain stored independently of the monthly consultation limit. If your account reaches its included usage limit, DocEdge may notify you, offer additional usage, offer an upgrade, apply applicable overage charges, or restrict certain usage after reasonable notice.</p>
        <p>We will not intentionally delete historical patient records merely because a monthly usage threshold has been reached, subject to our Privacy Policy, applicable law, account status, and contractual requirements.</p>
      </>
    )
  },
  {
    id: "fees",
    num: "9",
    title: "Fees and Payments",
    content: (
      <>
        <p>Subscription fees are displayed on the DocEdge website or communicated to you before purchase. You agree to pay all applicable subscription fees and other charges associated with your selected plan.</p>
        <p>Fees may be charged monthly, annually, according to usage, according to an enterprise agreement, or according to separately agreed development or integration services. Applicable taxes may be added where required by law.</p>
      </>
    )
  },
  {
    id: "renewal",
    num: "10",
    title: "Subscription Renewal",
    content: (
      <>
        <p>Unless otherwise specified, subscriptions may automatically renew for the applicable billing period. You authorize DocEdge or its payment provider to charge the applicable renewal amount where automatic renewal is enabled.</p>
        <p>You may cancel future renewal according to the cancellation process made available through your account or by contacting DocEdge. Cancellation of renewal does not automatically entitle you to a refund for a billing period that has already started, except where required by applicable law or expressly stated otherwise.</p>
      </>
    )
  },
  {
    id: "refunds",
    num: "11",
    title: "Refunds and Cancellation",
    content: (
      <>
        <p>Refund eligibility depends on the applicable subscription plan, purchase terms, and applicable law. Unless otherwise expressly stated:</p>
        <ul>
          {["Subscription fees are generally non-refundable after the applicable billing period begins","Unused subscription time may not be refundable","Promotional or discounted purchases may have different refund conditions","Enterprise agreements may contain separate cancellation and refund provisions"].map(i => <li key={i}>{i}</li>)}
        </ul>
        <p>If you believe you were charged incorrectly, contact us at <a href="mailto:info@docedge.in">info@docedge.in</a> or <a href="mailto:docedgesoftware@gmail.com">docedgesoftware@gmail.com</a>.</p>
      </>
    )
  },
  {
    id: "trials",
    num: "12",
    title: "Free Trials and Demonstration Accounts",
    content: (
      <>
        <p>DocEdge may offer free trials, demonstrations, or promotional accounts. Trial accounts may have limited features, limited duration, usage restrictions, demo data, and restricted integrations.</p>
        <p>At the end of a trial, the account may be suspended or converted to a paid subscription if you have selected a paid plan and agreed to the applicable payment terms. DocEdge may modify or discontinue trial programs at any time.</p>
      </>
    )
  },
  {
    id: "acceptable-use",
    num: "13",
    title: "Acceptable Use",
    content: (
      <>
        <p>You agree not to use DocEdge to:</p>
        <ul>
          {["Violate any applicable law","Access another person's account without authorization","Attempt to bypass security controls","Introduce malware, viruses, or harmful code","Interfere with platform availability","Reverse engineer the Services except where legally permitted","Scrape or systematically extract platform data without permission","Use the Services for fraudulent purposes","Misuse patient information"].map(i => <li key={i}>{i}</li>)}
        </ul>
        <p>We reserve the right to investigate suspected violations and take appropriate action.</p>
      </>
    )
  },
  {
    id: "user-content",
    num: "14",
    title: "User Content",
    content: (
      <p>You retain ownership of information and content that you lawfully upload or enter into DocEdge, subject to the rights necessary for us to provide the Services. You grant DocEdge a limited right to host, store, process, transmit, and display such information solely as reasonably necessary to operate and provide the Services. You are responsible for ensuring that you have the necessary rights and permissions to upload or process such content.</p>
    )
  },
  {
    id: "ip",
    num: "18",
    title: "Intellectual Property",
    content: (
      <>
        <p>The DocEdge platform, including its software, interface, design, branding, logos, documentation, graphics, content, features, source code, and product architecture, is owned by or licensed to DocEdge and is protected by applicable intellectual-property laws.</p>
        <p>Except as expressly permitted under these Terms, you may not copy, modify, distribute, sell, lease, license, reverse engineer, reproduce, or create derivative works from any part of the Services without prior written authorization.</p>
      </>
    )
  },
  {
    id: "disclaimer",
    num: "22",
    title: "Medical Disclaimer",
    content: (
      <>
        <p>DocEdge is <strong>not a medical device or medical professional</strong> unless expressly identified as such under a separate regulatory authorization. The platform is intended to support healthcare professionals with administrative, documentation, prescription, and practice-management workflows.</p>
        <p>DocEdge does not replace professional medical judgment, clinical examination, diagnosis, treatment planning, emergency medical care, or applicable healthcare regulations. Users must independently verify all clinical information before relying on it.</p>
      </>
    )
  },
  {
    id: "liability",
    num: "23",
    title: "Limitation of Liability",
    content: (
      <>
        <p>To the maximum extent permitted by applicable law, DocEdge will not be liable for indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the Services, including losses arising from loss of profits, loss of data, service interruption, third-party services, or clinical decisions made by healthcare professionals.</p>
        <p>For paid subscriptions, any aggregate liability of DocEdge will generally be limited to the amount paid by the customer during the 12 months preceding the event giving rise to the claim, unless a separate written agreement provides otherwise.</p>
      </>
    )
  },
  {
    id: "governing-law",
    num: "28",
    title: "Governing Law",
    content: (
      <p>These Terms will be governed by the laws applicable to the legal entity operating DocEdge, subject to mandatory consumer, privacy, healthcare, or other laws that may apply to users in their jurisdiction. For international customers, mandatory local laws may apply notwithstanding this provision.</p>
    )
  },
  {
    id: "dispute",
    num: "29",
    title: "Dispute Resolution",
    content: (
      <>
        <p>If a dispute arises, the parties should first attempt to resolve it through good-faith communication. You may contact DocEdge at <a href="mailto:info@docedge.in">info@docedge.in</a> or <a href="mailto:docedgesoftware@gmail.com">docedgesoftware@gmail.com</a>.</p>
        <p>Enterprise customers may have separate dispute-resolution provisions under their written agreement. Nothing in this section limits rights that cannot legally be waived.</p>
      </>
    )
  },
  {
    id: "contact-us",
    num: "32",
    title: "Contact Us",
    content: (
      <>
        <p>For questions regarding these Terms, subscriptions, account issues, or legal matters, contact:</p>
        <p><strong>DocEdge</strong><br />Website: <a href="https://docedge.in">docedge.in</a><br />Email: <a href="mailto:info@docedge.in">info@docedge.in</a><br />Email: <a href="mailto:docedgesoftware@gmail.com">docedgesoftware@gmail.com</a></p>
      </>
    )
  }
];

const tocItems = [
  { id: "about", label: "About DocEdge" },
  { id: "eligibility", label: "Eligibility" },
  { id: "registration", label: "Account Registration" },
  { id: "clinic-admin", label: "Clinic Admin" },
  { id: "healthcare-resp", label: "Healthcare Responsibility" },
  { id: "patient-data", label: "Patient Data" },
  { id: "subscriptions", label: "Subscription Plans" },
  { id: "usage-plans", label: "Usage-Based Plans" },
  { id: "fees", label: "Fees & Payments" },
  { id: "renewal", label: "Renewal" },
  { id: "refunds", label: "Refunds & Cancellation" },
  { id: "trials", label: "Free Trials" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "user-content", label: "User Content" },
  { id: "ip", label: "Intellectual Property" },
  { id: "disclaimer", label: "Medical Disclaimer" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "governing-law", label: "Governing Law" },
  { id: "dispute", label: "Dispute Resolution" },
  { id: "contact-us", label: "Contact Us" },
];

export default function DocEdgeTerms() {
  const [active, setActive] = useState("about");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top < 120) {
          setActive(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="de-terms-root">

        {/* Topbar */}
        
        {/* Navbar */}
        
        {/* Hero */}
        <div className="de-hero">
          <div className="de-hero-badge">
            <span>📋</span> Legal Documentation
          </div>
          <h1>Terms &amp; <span>Conditions</span></h1>
          <p className="de-hero-sub">Please read these terms carefully before using DocEdge's clinic management platform and services.</p>
          <div className="de-hero-meta">
            <div className="de-hero-meta-item"><span className="dot" />Effective Date: 12 August 2026</div>
            <div className="de-hero-meta-item"><span className="dot" />Last Updated: 12 August 2026</div>
            <div className="de-hero-meta-item"><span className="dot" />docedge.in</div>
          </div>
        </div>

        {/* Content */}
        <div className="de-content-wrap">

          {/* Sidebar */}
          <aside className="de-sidebar">
            <div className="de-sidebar-card">
              <div className="de-sidebar-title">Table of Contents</div>
              <ul className="de-toc-list">
                {tocItems.map(item => (
                  <li key={item.id} className="de-toc-item">
                    <button
                      className={`de-toc-link${active === item.id ? " active" : ""}`}
                      onClick={() => scrollTo(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="de-sidebar-contact">
                <p>Questions about these terms?</p>
                <a href="mailto:info@docedge.in">info@docedge.in</a>
                <a href="mailto:docedgesoftware@gmail.com">docedgesoftware@gmail.com</a>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="de-main">
            {/* Notice */}
            <div className="de-notice">
              <span className="de-notice-icon">⚠️</span>
              <div className="de-notice-text">
                <strong>Important:</strong> By creating an account, purchasing a subscription, accessing, or using the Services, you agree to be bound by these Terms. If you do not agree with these Terms, you must not use the Services.
              </div>
            </div>

            {/* Sections */}
            {sections.map(sec => (
              <div key={sec.id} id={sec.id} className="de-section-block">
                <div className="de-section-header">
                  <div className="de-section-num">{sec.num}</div>
                  <div className="de-section-title">{sec.title}</div>
                </div>
                <div className="de-section-body">{sec.content}</div>
              </div>
            ))}

            {/* Contact block */}
            <div className="de-contact-block">
              <div>
                <h3>Need Help?</h3>
                <p>Have questions about these Terms, your subscription, or account issues? Our team is here to help.</p>
              </div>
              <div className="de-contact-links">
                <a href="https://docedge.in" className="de-contact-link"><span className="icon">🌐</span> docedge.in</a>
                <a href="mailto:info@docedge.in" className="de-contact-link"><span className="icon">✉️</span> info@docedge.in</a>
                <a href="mailto:docedgesoftware@gmail.com" className="de-contact-link"><span className="icon">📧</span> docedgesoftware@gmail.com</a>
              </div>
            </div>
          </main>
        </div>

        {/* Footer */}
        
        {/* Scroll to top */}
        {showTop && (
          <button className="de-scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            ↑
          </button>
        )}
      </div>
    </>
  );
}