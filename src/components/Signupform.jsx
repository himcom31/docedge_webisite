import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User, Building2, Mail, Lock, Phone, MapPin,
  ArrowLeft, ShieldCheck, Loader2, AlertTriangle,
  CreditCard, ChevronRight, LayoutTemplate,
  Upload, X, CheckCircle2, ImageIcon, Eye,
  GraduationCap, Stethoscope, BookOpen, Award, Hash, ClipboardList,
  Plus, Trash2, Languages, FileText,
} from "lucide-react";

// const API_BASE = "http://localhost:5000";
const API_BASE = "https://software.docedge.in";

// Cashfree mode: backend ke CASHFREE_ENV ke saath match hona chahiye.
// Live ke liye "production", test ke liye "sandbox".
const CASHFREE_MODE = "production";
const CASHFREE_SDK_URL = "https://sdk.cashfree.com/js/v3/cashfree.js";

const DEGREE_OPTIONS = ["MBBS", "BDS", "MD", "MS", "DNB", "BHMS", "BAMS", "MDS", "DM", "MCh"];

const SPECIALIZATION_OPTIONS = [
  "General Physician", "Cardiologist", "Dermatologist", "Neurologist",
  "Orthopedic Surgeon", "Pediatrician", "Gynecologist", "Psychiatrist",
  "ENT Specialist", "Ophthalmologist", "Gastroenterologist", "Urologist",
  "Pulmonologist", "Endocrinologist", "Oncologist", "Dentist", "Other",
];

const LANGUAGE_OPTIONS = [
  "Hindi", "English", "Marathi", "Bengali", "Tamil",
  "Telugu", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Odia",
];

// ── Keyframe injection ────────────────────────────────────────────────────────
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
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
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
      0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); }
    }
    @keyframes floatB {
      0%,100% { transform: translateY(0); } 50% { transform: translateY(10px); }
    }
    @keyframes pulse {
      0%,100% { opacity:1; } 50% { opacity:0.5; }
    }
    @keyframes modalIn {
      from { opacity: 0; transform: scale(0.92) translateY(16px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }

    .de-page {
      min-height: 100vh; display: flex; align-items: center;
      justify-content: center; padding: 40px 16px;
      font-family: 'Plus Jakarta Sans','Inter',sans-serif;
      background: #f5f6fa; position: relative; overflow: hidden;
    }
    .de-blob { position: fixed; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }
    .de-blob-1 { width:480px;height:480px;background:rgba(99,102,241,0.07);top:-140px;left:-160px;animation:floatA 10s ease-in-out infinite; }
    .de-blob-2 { width:380px;height:380px;background:rgba(139,92,246,0.06);bottom:-100px;right:-120px;animation:floatB 13s ease-in-out infinite; }

    /* Step indicator */
    .de-steps {
      display: flex; align-items: center; gap: 0;
      margin-bottom: 0; padding: 0 36px;
      background: #fff;
      border-bottom: 1px solid #e8eaf0;
    }
    .de-step {
      display: flex; align-items: center; gap: 8px;
      padding: 16px 0; flex: 1;
      font-size: 12px; font-weight: 700;
      color: #c2c6d8; transition: color 0.3s;
      cursor: default; position: relative;
      letter-spacing: 0.03em;
    }
    .de-step.active { color: #6366f1; }
    .de-step.done   { color: #16a34a; }
    .de-step-dot {
      width: 26px; height: 26px; border-radius: 50%;
      border: 2px solid #e4e7f0;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 800; flex-shrink: 0;
      transition: all 0.3s; background: #fff;
    }
    .de-step.active .de-step-dot {
      border-color: #6366f1; background: #6366f1; color: #fff;
    }
    .de-step.done .de-step-dot {
      border-color: #16a34a; background: #16a34a; color: #fff;
    }
    .de-step-divider {
      width: 32px; height: 2px; background: #e4e7f0; flex-shrink: 0; margin: 0 4px;
    }

    .de-card {
      background: #fff; border: 1px solid #e8eaf0; border-radius: 24px;
      max-width: 700px; width: 100%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(99,102,241,0.06);
      animation: fadeSlideUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
      position: relative; z-index: 1; overflow: hidden;
    }
    .de-header {
      padding: 30px 36px 28px; position: relative; overflow: hidden;
    }
    .de-header-bg {
      position: absolute; inset: 0;
      background: linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#6366f1 100%);
      background-size: 200% 200%; animation: gradShift 7s ease infinite; z-index: 0;
    }
    .de-header-noise {
      position: absolute; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
      z-index: 1; opacity: 0.4;
    }
    .de-header-content { position: relative; z-index: 2; }
    .de-back-btn {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22);
      color: rgba(255,255,255,0.92); font-size: 12px; font-weight: 600;
      padding: 6px 14px 6px 10px; border-radius: 20px; cursor: pointer;
      margin-bottom: 20px; transition: background 0.2s,transform 0.15s;
      font-family: inherit; letter-spacing: 0.01em;
    }
    .de-back-btn:hover { background: rgba(255,255,255,0.24); transform: translateX(-2px); }
    .de-header-eyebrow {
      font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: rgba(255,255,255,0.58); margin: 0 0 6px;
    }
    .de-header-plan {
      font-size: 26px; font-weight: 800; color: #fff; margin: 0 0 16px; letter-spacing: -0.02em;
    }
    .de-price-row { display: flex; gap: 8px; flex-wrap: wrap; }
    .de-price-chip {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(255,255,255,0.14); border: 1.5px solid rgba(255,255,255,0.24);
      color: rgba(255,255,255,0.88); border-radius: 40px; padding: 5px 14px;
      font-size: 13px; font-weight: 600; transition: all 0.2s;
    }
    .de-price-chip.active {
      background: #fff; color: #4f46e5; border-color: #fff;
      box-shadow: 0 2px 12px rgba(255,255,255,0.22);
    }
    .de-shimmer {
      height: 28px; width: 180px; border-radius: 20px;
      background: linear-gradient(90deg,rgba(255,255,255,0.1) 25%,rgba(255,255,255,0.22) 50%,rgba(255,255,255,0.1) 75%);
      background-size: 400px 100%; animation: shimmer 1.4s infinite;
    }
    .de-error {
      margin: 16px 36px 0; background: #fff5f5; border: 1px solid #fecaca;
      color: #dc2626; border-radius: 10px; padding: 11px 16px;
      font-size: 13px; font-weight: 600; animation: fadeSlideUp 0.3s ease both;
      display: flex; align-items: center; gap: 8px;
    }
    .de-form { padding: 28px 36px 36px; display: flex; flex-direction: column; gap: 20px; }
    .de-row { display: flex; gap: 16px; flex-wrap: wrap; }
    .de-field { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 7px; }
    .de-label {
      font-size: 11.5px; font-weight: 700; color: #8b8fa8;
      letter-spacing: 0.07em; text-transform: uppercase;
    }
    .de-input-wrap { position: relative; }
    .de-input-icon {
      position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
      color: #b0b4c8; pointer-events: none; transition: color 0.2s; display: flex; align-items: center;
    }
    .de-input {
      width: 100%; box-sizing: border-box; background: #f8f9fc; border: 1.5px solid #e4e7f0;
      border-radius: 12px; padding: 12px 14px 12px 40px; font-size: 14px; color: #1a1d2e;
      font-family: inherit; font-weight: 500; transition: border-color 0.2s,background 0.2s,box-shadow 0.2s; outline: none;
    }
    .de-input::placeholder { color: #c2c6d8; }
    .de-input:focus { border-color: #6366f1; background: #fafaff; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
    .de-input-wrap:focus-within .de-input-icon { color: #6366f1; }

    /* ── Professional Details Section ── */
    .de-prof-section {
      background: linear-gradient(135deg, rgba(79,70,229,0.03) 0%, rgba(124,58,237,0.05) 100%);
      border: 1.5px solid #e0e7ff; border-radius: 18px;
      padding: 0; overflow: hidden;
      animation: fadeSlideUp 0.45s 0.2s ease both;
    }
    .de-prof-header {
      display: flex; align-items: center; gap: 12px;
      padding: 16px 20px; background: rgba(79,70,229,0.06);
      border-bottom: 1px solid #e0e7ff;
    }
    .de-prof-header-icon {
      width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 3px 10px rgba(79,70,229,0.3);
    }
    .de-prof-header-text { flex: 1; }
    .de-prof-header-title {
      font-size: 13px; font-weight: 800; color: #1a1d2e; letter-spacing: -0.01em;
    }
    .de-prof-header-sub {
      font-size: 11px; color: #a78bfa; font-weight: 600; margin-top: 2px;
    }
    .de-required-badge {
      display: inline-flex; align-items: center; gap: 4px;
      background: #fef3c7; border: 1px solid #fde68a;
      color: #d97706; font-size: 10px; font-weight: 800;
      padding: 3px 10px; border-radius: 20px; text-transform: uppercase;
      letter-spacing: 0.05em; flex-shrink: 0;
    }
    .de-prof-body {
      padding: 20px; display: flex; flex-direction: column; gap: 18px;
    }

    /* Degree chips */
    .de-degree-grid { display: flex; gap: 8px; flex-wrap: wrap; }
    .de-degree-chip {
      padding: 7px 16px; border-radius: 20px; font-size: 12px; font-weight: 700;
      cursor: pointer; border: 1.5px solid #e4e7f0; background: #f8f9fc;
      color: #6b7280; transition: all 0.18s; font-family: inherit; letter-spacing: 0.01em;
    }
    .de-degree-chip:hover { border-color: #a5b4fc; color: #4f46e5; background: #ede9fe; }
    .de-degree-chip.active {
      background: #4f46e5; border-color: #4f46e5; color: #fff;
      box-shadow: 0 2px 10px rgba(79,70,229,0.28);
    }

    /* Degree selected summary */
    .de-degree-summary {
      display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;
    }
    .de-degree-tag {
      display: inline-flex; align-items: center; gap: 5px;
      background: #ede9fe; border: 1.5px solid #c4b5fd; color: #4f46e5;
      border-radius: 20px; padding: 4px 10px 4px 12px;
      font-size: 12px; font-weight: 700;
    }
    .de-degree-tag-remove {
      background: none; border: none; cursor: pointer; padding: 0;
      display: flex; align-items: center; color: #7c3aed;
      transition: color 0.15s;
    }
    .de-degree-tag-remove:hover { color: #ef4444; }

    /* Language chips */
    .de-lang-grid { display: flex; gap: 8px; flex-wrap: wrap; }
    .de-lang-chip {
      padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700;
      cursor: pointer; border: 1.5px solid #e4e7f0; background: #f8f9fc;
      color: #6b7280; transition: all 0.18s; font-family: inherit;
    }
    .de-lang-chip:hover { border-color: #6ee7b7; color: #059669; background: #ecfdf5; }
    .de-lang-chip.active {
      background: #059669; border-color: #059669; color: #fff;
      box-shadow: 0 2px 8px rgba(5,150,105,0.28);
    }

    /* Specialization dropdown */
    .de-select-wrap { position: relative; }
    .de-select-icon {
      position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
      color: #b0b4c8; pointer-events: none; transition: color 0.2s; display: flex; align-items: center;
    }
    .de-select {
      width: 100%; box-sizing: border-box; background: #f8f9fc; border: 1.5px solid #e4e7f0;
      border-radius: 12px; padding: 12px 14px 12px 40px; font-size: 14px; color: #1a1d2e;
      font-family: inherit; font-weight: 500; transition: border-color 0.2s, box-shadow 0.2s;
      outline: none; appearance: none; cursor: pointer;
    }
    .de-select:focus { border-color: #6366f1; background: #fafaff; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
    .de-select-wrap:focus-within .de-select-icon { color: #6366f1; }
    .de-select-arrow {
      position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
      pointer-events: none; color: #b0b4c8;
    }

    /* Experience slider */
    .de-exp-row { display: flex; align-items: center; gap: 14px; }
    .de-exp-slider {
      flex: 1; -webkit-appearance: none; height: 6px; border-radius: 100px;
      outline: none; cursor: pointer; background: #e4e7f0;
    }
    .de-exp-slider::-webkit-slider-thumb {
      -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%;
      background: #fff; border: 2.5px solid #6366f1;
      box-shadow: 0 2px 8px rgba(99,102,241,0.35); cursor: pointer;
      transition: transform 0.15s;
    }
    .de-exp-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }
    .de-exp-badge {
      min-width: 72px; text-align: center; flex-shrink: 0;
      background: #ede9fe; color: #4f46e5; font-weight: 800; font-size: 13px;
      padding: 6px 12px; border-radius: 20px; border: 1.5px solid #c4b5fd;
      white-space: nowrap;
    }

    /* Section divider label */
    .de-section-label {
      font-size: 11px; font-weight: 800; color: #6366f1;
      text-transform: uppercase; letter-spacing: 0.1em;
      display: flex; align-items: center; gap: 8px;
    }
    .de-section-label::after { content: ''; flex: 1; height: 1px; background: #e0e7ff; }

    /* Education rows */
    .de-edu-list { display: flex; flex-direction: column; gap: 10px; }
    .de-edu-row {
      display: flex; align-items: flex-start; gap: 10px;
      background: #f8f9fc; border: 1.5px solid #e4e7f0; border-radius: 12px;
      padding: 14px; animation: fadeSlideUp 0.25s ease both;
    }
    .de-edu-fields { flex: 1; display: flex; gap: 10px; flex-wrap: wrap; }
    .de-edu-field { flex: 1; min-width: 120px; display: flex; flex-direction: column; gap: 5px; }
    .de-edu-label { font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.06em; }
    .de-edu-input {
      width: 100%; box-sizing: border-box; background: #fff; border: 1.5px solid #e4e7f0;
      border-radius: 9px; padding: 8px 12px; font-size: 13px; color: #1a1d2e;
      font-family: inherit; font-weight: 500; outline: none; transition: border-color 0.2s;
    }
    .de-edu-input:focus { border-color: #6366f1; }
    .de-edu-input::placeholder { color: #d1d5db; }
    .de-edu-remove {
      background: #fee2e2; border: none; border-radius: 8px; padding: 7px;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: background 0.15s; flex-shrink: 0; margin-top: 20px;
    }
    .de-edu-remove:hover { background: #fecaca; }
    .de-add-edu-btn {
      display: inline-flex; align-items: center; gap: 6px;
      background: #ede9fe; color: #4f46e5; border: 1.5px dashed #c4b5fd;
      border-radius: 10px; padding: 8px 16px; font-size: 12px; font-weight: 700;
      cursor: pointer; font-family: inherit; transition: all 0.15s; width: 100%;
      justify-content: center;
    }
    .de-add-edu-btn:hover { background: #ddd6fe; border-color: #a5b4fc; }

    /* Billing */
    .de-billing-grid { display: flex; gap: 12px; flex-wrap: wrap; }
    .de-billing-card {
      flex: 1; min-width: 150px; border: 1.5px solid #e4e7f0; border-radius: 14px;
      padding: 14px 16px; cursor: pointer; background: #f8f9fc;
      transition: all 0.2s cubic-bezier(0.22,1,0.36,1); position: relative; overflow: hidden;
    }
    .de-billing-card:hover { border-color: rgba(99,102,241,0.4); background: rgba(99,102,241,0.03); }
    .de-billing-card.active {
      border-color: #6366f1; background: rgba(99,102,241,0.05);
      box-shadow: 0 0 0 1px rgba(99,102,241,0.15) inset, 0 4px 16px rgba(99,102,241,0.08);
    }
    .de-billing-card.active::before {
      content:''; position:absolute; top:0;right:0; width:0;height:0;
      border-style:solid; border-width:0 30px 30px 0; border-color:transparent #6366f1 transparent transparent;
    }
    .de-billing-card.active::after {
      content:'✓'; position:absolute; top:2px;right:5px; font-size:10px;
      color:#fff; font-weight:800; animation:checkPop 0.3s ease both;
    }
    .de-billing-name { font-size: 13px; font-weight: 700; color: #374151; margin-bottom: 4px; }
    .de-billing-price { font-size: 15px; font-weight: 800; color: #1a1d2e; }
    .de-save-badge {
      display: inline-block; margin-top: 6px;
      background: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.2);
      color: #16a34a; font-size: 11px; font-weight: 700; border-radius: 20px; padding: 2px 9px;
    }
    .de-single-billing {
      display: flex; align-items: center; justify-content: space-between;
      background: #f8f9fc; border: 1.5px solid #e4e7f0; border-radius: 12px; padding: 14px 18px;
    }
    .de-single-billing-label { font-size: 13px; font-weight: 600; color: #6b7280; }
    .de-single-billing-price { font-size: 16px; font-weight: 800; color: #1a1d2e; }
    .de-divider { height: 1px; background: linear-gradient(90deg,transparent,#e4e7f0,transparent); }

    /* Submit */
    .de-submit-btn {
      position: relative; background: linear-gradient(135deg,#4f46e5,#7c3aed);
      color: #fff; border: none; border-radius: 14px; padding: 15px 24px;
      font-size: 15px; font-weight: 700; cursor: pointer; font-family: inherit;
      letter-spacing: -0.01em; transition: transform 0.18s,box-shadow 0.18s,opacity 0.18s;
      box-shadow: 0 4px 20px rgba(99,102,241,0.28),0 0 0 1px rgba(255,255,255,0.08) inset;
      overflow: hidden; display: flex; align-items: center; justify-content: center; gap: 10px;
    }
    .de-submit-btn:hover:not(:disabled) {
      transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,0.4),0 0 0 1px rgba(255,255,255,0.12) inset;
    }
    .de-submit-btn:active:not(:disabled) { transform: translateY(0px); }
    .de-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
    .de-submit-btn::before {
      content:''; position:absolute; inset:0;
      background:linear-gradient(135deg,rgba(255,255,255,0.12),transparent 60%); pointer-events:none;
    }
    .de-price-tag {
      background: rgba(255,255,255,0.18); border-radius: 20px; padding: 3px 11px;
      font-size: 13px; font-weight: 700;
    }
    .de-note {
      font-size: 12px; color: #9ca3af; text-align: center; margin: 0;
      display: flex; align-items: center; justify-content: center; gap: 6px;
    }

    /* ── Template Chooser ── */
    .de-template-section { animation: fadeSlideUp 0.4s ease both; }
    .de-template-section-title {
      font-size: 11.5px; font-weight: 700; color: #8b8fa8;
      letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 12px;
    }
    .de-cat-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
    .de-cat-tab {
      padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700;
      cursor: pointer; border: 1.5px solid #e4e7f0; background: #f8f9fc;
      color: #6b7280; transition: all 0.2s; font-family: inherit;
    }
    .de-cat-tab.active { background: #ede9fe; border-color: #7c3aed; color: #7c3aed; }
    .de-cat-tab:hover:not(.active) { border-color: #c4b5fd; color: #6366f1; }
    .de-tpl-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 12px; margin-bottom: 12px;
    }
    .de-tpl-card {
      border: 2px solid #e4e7f0; border-radius: 14px; overflow: hidden;
      cursor: pointer; background: #fff; transition: all 0.2s; position: relative;
    }
    .de-tpl-card:hover { border-color: #a5b4fc; box-shadow: 0 4px 16px rgba(99,102,241,0.1); }
    .de-tpl-card.selected { border-color: #6366f1; box-shadow: 0 0 0 2px rgba(99,102,241,0.2); }
    .de-tpl-card.selected::after {
      content:'✓'; position:absolute; top:6px;right:7px;
      width:20px;height:20px; background:#6366f1; border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:11px;color:#fff;font-weight:800; animation:checkPop 0.25s ease both;
    }
    .de-tpl-img-wrap {
      position: relative; width: 100%; height: 90px;
      background: #f8f9fc; border-bottom: 1px solid #e4e7f0; overflow: hidden;
    }
    .de-tpl-img { width: 100%; height: 100%; object-fit: contain; display: block; transition: transform 0.2s; }
    .de-tpl-card:hover .de-tpl-img { transform: scale(1.04); }
    .de-tpl-overlay {
      position: absolute; inset: 0; background: rgba(79,70,229,0.72);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.18s; backdrop-filter: blur(1px);
    }
    .de-tpl-card:hover .de-tpl-overlay { opacity: 1; }
    .de-tpl-view-btn {
      display: flex; align-items: center; gap: 5px; background: #fff; color: #4f46e5;
      border: none; border-radius: 20px; padding: 6px 12px; font-size: 11px; font-weight: 800;
      cursor: pointer; font-family: inherit; box-shadow: 0 2px 8px rgba(0,0,0,0.18);
      transition: transform 0.15s, box-shadow 0.15s; letter-spacing: 0.01em;
    }
    .de-tpl-view-btn:hover { transform: scale(1.06); box-shadow: 0 4px 14px rgba(0,0,0,0.22); }
    .de-tpl-name { font-size:11px;font-weight:700;color:#374151;padding:8px 10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
    .de-modal-backdrop {
      position: fixed; inset: 0; z-index: 1000; background: rgba(10,10,20,0.78);
      display: flex; align-items: center; justify-content: center;
      padding: 20px; backdrop-filter: blur(6px); animation: fadeIn 0.2s ease both;
    }
    .de-modal {
      background: #fff; border-radius: 20px; overflow: hidden;
      max-width: 680px; width: 100%; box-shadow: 0 24px 80px rgba(0,0,0,0.3);
      animation: modalIn 0.28s cubic-bezier(0.22,1,0.36,1) both;
      display: flex; flex-direction: column; max-height: 92vh;
    }
    .de-modal-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 18px; border-bottom: 1px solid #e8eaf0;
      background: linear-gradient(135deg,#4f46e5,#7c3aed);
      flex-shrink: 0; gap: 10px;
    }
    .de-modal-title { font-size: 14px; font-weight: 800; color: #fff; letter-spacing: -0.01em; margin: 0; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .de-modal-zoom-controls { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
    .de-zoom-btn {
      background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.28);
      border-radius: 8px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: #fff; font-size: 16px; font-weight: 800;
      transition: background 0.15s, transform 0.1s; line-height: 1; font-family: inherit; user-select: none;
    }
    .de-zoom-btn:hover { background: rgba(255,255,255,0.3); transform: scale(1.08); }
    .de-zoom-btn:active { transform: scale(0.95); }
    .de-zoom-label { font-size: 11px; font-weight: 800; color: rgba(255,255,255,0.85); min-width: 38px; text-align: center; letter-spacing: 0.02em; }
    .de-modal-close-btn {
      background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.28);
      border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: #fff; transition: background 0.15s; flex-shrink: 0;
    }
    .de-modal-close-btn:hover { background: rgba(255,255,255,0.3); }
    .de-modal-body {
      flex: 1; overflow: auto; background: #e8eaf0;
      display: flex; align-items: flex-start; justify-content: flex-start;
      cursor: grab; position: relative;
    }
    .de-modal-body.dragging { cursor: grabbing; }
    .de-modal-img-wrap { display: inline-flex; align-items: center; justify-content: center; padding: 24px; min-width: 100%; min-height: 100%; box-sizing: border-box; }
    .de-modal-img { object-fit: contain; border-radius: 10px; box-shadow: 0 6px 32px rgba(0,0,0,0.18); background: #fff; display: block; transform-origin: top left; user-select: none; pointer-events: none; }
    .de-modal-hint {
      position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
      background: rgba(20,20,40,0.62); color: rgba(255,255,255,0.82);
      font-size: 11px; font-weight: 600; border-radius: 20px; padding: 4px 12px;
      pointer-events: none; white-space: nowrap; letter-spacing: 0.01em;
    }
    .de-modal-footer { padding: 12px 18px; border-top: 1px solid #e8eaf0; display: flex; gap: 10px; flex-shrink: 0; background: #fff; }
    .de-modal-select-btn {
      flex: 1; background: linear-gradient(135deg,#4f46e5,#7c3aed); color: #fff; border: none;
      border-radius: 12px; padding: 11px 20px; font-size: 14px; font-weight: 700; cursor: pointer;
      font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 8px;
      transition: transform 0.15s, box-shadow 0.15s; box-shadow: 0 4px 16px rgba(99,102,241,0.25);
    }
    .de-modal-select-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.35); }
    .de-modal-cancel-btn {
      background: #f8f9fc; color: #6b7280; border: 1.5px solid #e4e7f0; border-radius: 12px;
      padding: 11px 18px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit; transition: background 0.15s;
    }
    .de-modal-cancel-btn:hover { background: #f1f2f6; }
    .de-tpl-custom {
      border: 2px dashed #c4b5fd; border-radius: 14px; cursor: pointer;
      background: rgba(99,102,241,0.02); transition: all 0.2s; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 6px; padding: 14px 10px; text-align: center; min-height: 120px;
    }
    .de-tpl-custom:hover { border-color: #6366f1; background: rgba(99,102,241,0.05); }
    .de-tpl-custom.selected { border-color: #6366f1; background: rgba(99,102,241,0.08); }
    .de-tpl-custom-label { font-size: 11px; font-weight: 700; color: #7c3aed; }
    .de-custom-preview {
      display: flex; align-items: center; gap: 12px; background: #f8f9fc;
      border: 1.5px solid #e4e7f0; border-radius: 12px; padding: 12px 16px;
      animation: fadeSlideUp 0.3s ease both;
    }
    .de-custom-preview-img { width:56px;height:56px;object-fit:contain;border-radius:8px;background:#fff; }
    .de-custom-preview-name { font-size:13px;font-weight:700;color:#1a1d2e;flex:1; }
    .de-custom-remove-btn { background:#fee2e2;border:none;border-radius:8px;padding:6px;cursor:pointer;display:flex;transition:background 0.15s; }
    .de-custom-remove-btn:hover { background:#fecaca; }
    .de-no-template {
      font-size: 12px; color: #9ca3af; text-align: center; cursor: pointer; padding: 8px;
      text-decoration: underline; text-underline-offset: 3px; transition: color 0.2s;
    }
    .de-no-template:hover { color: #6b7280; }
    .de-no-template.selected { color: #6366f1; font-weight: 700; }
    .de-tpl-shimmer {
      height: 120px; border-radius: 14px;
      background: linear-gradient(90deg,#f3f4f6 25%,#e9eaf0 50%,#f3f4f6 75%);
      background-size: 400px 100%; animation: shimmer 1.4s infinite;
    }
    .de-next-btn {
      background: linear-gradient(135deg,#4f46e5,#7c3aed); color: #fff; border: none;
      border-radius: 14px; padding: 14px 24px; font-size: 14px; font-weight: 700;
      cursor: pointer; font-family: inherit; display: flex; align-items: center;
      justify-content: center; gap: 8px; transition: transform 0.15s,box-shadow 0.15s;
      box-shadow: 0 4px 20px rgba(99,102,241,0.25);
    }
    .de-next-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,102,241,0.35); }
    .de-prev-btn {
      background: #f8f9fc; color: #6b7280; border: 1.5px solid #e4e7f0; border-radius: 14px;
      padding: 14px 24px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit;
      display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.15s;
    }
    .de-prev-btn:hover { background: #f1f2f6; }
    .de-btn-row { display: flex; gap: 12px; }
    .de-btn-row .de-next-btn { flex: 1; }

    .de-anim-1 { animation: fadeSlideUp 0.5s 0.08s cubic-bezier(0.22,1,0.36,1) both; }
    .de-anim-2 { animation: fadeSlideUp 0.5s 0.16s cubic-bezier(0.22,1,0.36,1) both; }
    .de-anim-3 { animation: fadeSlideUp 0.5s 0.24s cubic-bezier(0.22,1,0.36,1) both; }
    .de-anim-4 { animation: fadeSlideUp 0.5s 0.30s cubic-bezier(0.22,1,0.36,1) both; }
    .de-anim-5 { animation: fadeSlideUp 0.5s 0.36s cubic-bezier(0.22,1,0.36,1) both; }
    .de-anim-6 { animation: fadeSlideUp 0.5s 0.42s cubic-bezier(0.22,1,0.36,1) both; }
    .de-anim-7 { animation: fadeSlideUp 0.5s 0.48s cubic-bezier(0.22,1,0.36,1) both; }
    .de-anim-8 { animation: fadeSlideUp 0.5s 0.54s cubic-bezier(0.22,1,0.36,1) both; }

    @media (max-width: 520px) {
      .de-form { padding: 22px 20px 28px; }
      .de-header { padding: 24px 20px 22px; }
      .de-error { margin: 14px 20px 0; }
      .de-input { font-size: 16px; }
      .de-steps { padding: 0 20px; }
      .de-modal { border-radius: 16px; }
      .de-modal-title { max-width: 220px; }
      .de-degree-chip { font-size: 11px; padding: 6px 12px; }
      .de-edu-fields { flex-direction: column; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; }
    }
  `;
  document.head.appendChild(style);
};

// ── Cashfree SDK loader ───────────────────────────────────────────────────────
// Script ek hi baar load hoti hai. Load fail hone par reject karta hai, taaki UI atke nahi.
const loadCashfreeSdk = () =>
  new Promise((resolve, reject) => {
    if (window.Cashfree) return resolve();

    const existing = document.querySelector(`script[src="${CASHFREE_SDK_URL}"]`);
    if (existing) {
      existing.addEventListener("load", resolve);
      existing.addEventListener("error", () => reject(new Error("Cashfree SDK load nahi hua")));
      return;
    }

    const script = document.createElement("script");
    script.src = CASHFREE_SDK_URL;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Cashfree SDK load nahi hua"));
    document.head.appendChild(script);
  });

// ── Template Preview Modal ────────────────────────────────────────────────────
const ZOOM_STEPS = [0.5, 0.75, 1, 1.5, 2, 3];
const ZOOM_DEFAULT_IDX = 2;

function TemplatePreviewModal({ template, onClose, onSelect, isSelected }) {
  const [zoomIdx, setZoomIdx] = useState(ZOOM_DEFAULT_IDX);
  const zoom = ZOOM_STEPS[zoomIdx];
  const bodyRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 });
  const [dragging, setDragging] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });

  useEffect(() => { const t = setTimeout(() => setShowHint(false), 3200); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      setZoomIdx(prev => e.deltaY < 0 ? Math.min(prev + 1, ZOOM_STEPS.length - 1) : Math.max(prev - 1, 0));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    dragRef.current = { active: true, startX: e.clientX, startY: e.clientY, scrollLeft: bodyRef.current.scrollLeft, scrollTop: bodyRef.current.scrollTop };
    setDragging(true);
  };
  const onMouseMove = (e) => {
    if (!dragRef.current.active) return;
    bodyRef.current.scrollLeft = dragRef.current.scrollLeft - (e.clientX - dragRef.current.startX);
    bodyRef.current.scrollTop  = dragRef.current.scrollTop  - (e.clientY - dragRef.current.startY);
  };
  const onMouseUp = () => { dragRef.current.active = false; setDragging(false); };

  const imgW = naturalSize.w ? Math.max(naturalSize.w * zoom, 200) : undefined;
  const imgH = naturalSize.h ? Math.max(naturalSize.h * zoom, 200) : undefined;

  return (
    <div className="de-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="de-modal" onClick={e => e.stopPropagation()}>
        <div className="de-modal-header">
          <p className="de-modal-title">{template.name}</p>
          <div className="de-modal-zoom-controls">
            <button className="de-zoom-btn" onClick={() => setZoomIdx(p => Math.max(p - 1, 0))} disabled={zoomIdx === 0}>−</button>
            <span className="de-zoom-label" onClick={() => setZoomIdx(ZOOM_DEFAULT_IDX)} style={{ cursor: "pointer" }}>{Math.round(zoom * 100)}%</span>
            <button className="de-zoom-btn" onClick={() => setZoomIdx(p => Math.min(p + 1, ZOOM_STEPS.length - 1))} disabled={zoomIdx === ZOOM_STEPS.length - 1}>+</button>
          </div>
          <button className="de-modal-close-btn" onClick={onClose}><X size={14} /></button>
        </div>
        <div ref={bodyRef} className={`de-modal-body${dragging ? " dragging" : ""}`}
          onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
          <div className="de-modal-img-wrap">
            <img src={template.imageUrl} alt={template.name} className="de-modal-img"
              width={imgW} height={imgH}
              style={{ width: imgW ? `${imgW}px` : "auto", height: imgH ? `${imgH}px` : "auto", maxWidth: zoom <= 1 ? "100%" : "none" }}
              onLoad={(e) => setNaturalSize({ w: e.target.naturalWidth, h: e.target.naturalHeight })}
              draggable={false} />
          </div>
          {showHint && <div className="de-modal-hint">🔍 Ctrl + Scroll to zoom · Drag to pan</div>}
        </div>
        <div className="de-modal-footer">
          <button className="de-modal-cancel-btn" onClick={onClose}>Close</button>
          <button className="de-modal-select-btn" onClick={() => { onSelect(template); onClose(); }}>
            <CheckCircle2 size={16} />
            {isSelected ? "Selected ✓" : "Use This Template"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function SignupForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const planId   = searchParams.get("planId");
  const planName = searchParams.get("planName") || "Selected";

  const [planData, setPlanData]       = useState(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [step, setStep]               = useState(1);

  // ── Basic form fields ──────────────────────────────────────────────────────
  const [form, setForm] = useState({
    name: "", clinicName: "", email: "",
    password: "", mobile: "", address: "",
    interval: "monthly",
    // Professional
    degrees: [],
    otherDegree: "",
    specialization: "",
    otherSpecialization: "",
    experience: 1,
    medicalRegNo: "",
    about: "",
  });

  // ── Education rows ─────────────────────────────────────────────────────────
  const [education, setEducation] = useState([
    { degree: "", institution: "", year: "" },
  ]);

  // ── Languages ─────────────────────────────────────────────────────────────
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  // ── Template state ────────────────────────────────────────────────────────
  const [templates, setTemplates]           = useState({ categories: [], grouped: {} });
  const [tplLoading, setTplLoading]         = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTpl, setSelectedTpl]       = useState(null);
  const [customFile, setCustomFile]         = useState(null);
  const [customPreview, setCustomPreview]   = useState(null);
  const [previewTpl, setPreviewTpl]         = useState(null);

  const fileRef = useRef(null);
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

  useEffect(() => {
    if (step !== 2) return;
    setTplLoading(true);
    fetch(`${API_BASE}/api/templates`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setTemplates({ categories: data.categories, grouped: data.grouped });
          if (data.categories.length > 0) setActiveCategory("all");
        }
      })
      .catch(() => {})
      .finally(() => setTplLoading(false));
  }, [step]);

  const hasMonthly = planData?.monthlyPrice > 0;
  const hasYearly  = planData?.yearlyPrice  > 0;
  const showBillingToggle = hasMonthly && hasYearly;
  const selectedPrice = form.interval === "monthly" ? planData?.monthlyPrice : planData?.yearlyPrice;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSlider = (e) => {
    const val = Number(e.target.value);
    const pct = ((val - 1) / 49) * 100;
    e.target.style.background = `linear-gradient(to right, #6366f1 ${pct}%, #e4e7f0 ${pct}%)`;
    setForm(prev => ({ ...prev, experience: val }));
  };

  // ── Degree multi-select toggle ─────────────────────────────────────────────
  const toggleDegree = (degree) => {
    setForm(prev => {
      const already = prev.degrees.includes(degree);
      return {
        ...prev,
        degrees: already
          ? prev.degrees.filter(d => d !== degree)
          : [...prev.degrees, degree],
        otherDegree: already && degree === "Other" ? "" : prev.otherDegree,
      };
    });
    if (error) setError("");
  };

  // ── Education handlers ─────────────────────────────────────────────────────
  const handleEduChange = (idx, field, value) => {
    setEducation(prev => prev.map((row, i) => i === idx ? { ...row, [field]: value } : row));
  };
  const addEduRow = () => {
    setEducation(prev => [...prev, { degree: "", institution: "", year: "" }]);
  };
  const removeEduRow = (idx) => {
    setEducation(prev => prev.filter((_, i) => i !== idx));
  };

  // ── Language toggle ────────────────────────────────────────────────────────
  const toggleLanguage = (lang) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
    if (error) setError("");
  };

  // ── Step 1 → Step 2 validation ────────────────────────────────────────────
  const goToStep2 = () => {
    setError("");
    if (!form.name.trim() || !form.clinicName.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Name, Clinic Name, Email, and Password are required."); return;
    }
    if (form.degrees.length === 0) {
      setError("Please select at least one degree."); return;
    }
    if (form.degrees.includes("Other") && !form.otherDegree.trim()) {
      setError("Please enter your degree name."); return;
    }
    if (!form.specialization) {
      setError("Please select a specialization."); return;
    }
    if (form.specialization === "Other" && !form.otherSpecialization.trim()) {
      setError("Please enter your specialization."); return;
    }
    if (!form.medicalRegNo.trim()) {
      setError("Medical Registration Number is required."); return;
    }
    if (!planId) {
      setError("No plan selected. Please go back to the pricing page and try again."); return;
    }
    setStep(2);
  };

  // ── Template helpers ───────────────────────────────────────────────────────
  const handleCustomFile = (e) => {
    const f = e.target.files[0];
    if (!f || !f.type.startsWith("image/")) return;
    setCustomFile(f);
    setCustomPreview(URL.createObjectURL(f));
    setSelectedTpl({ type: "custom" });
  };

  const removeCustomFile = () => {
    setCustomFile(null);
    setCustomPreview(null);
    if (selectedTpl?.type === "custom") setSelectedTpl(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setError("");
    if (!planId) { setError("No plan selected."); return; }
    try {
      setSubmitting(true);
      const fd = new FormData();

      fd.append("name",       form.name);
      fd.append("clinicName", form.clinicName);
      fd.append("email",      form.email);
      fd.append("password",   form.password);
      fd.append("mobile",     form.mobile);
      fd.append("address",    form.address);
      fd.append("interval",   form.interval);
      fd.append("planId",     planId);

      // "Other" ki jagah user ka likha hua degree bhejein
      const finalDegrees = form.degrees.map(d =>
        d === "Other" ? form.otherDegree.trim() : d
      );
      fd.append("degrees", JSON.stringify(finalDegrees));

      const finalSpec = form.specialization === "Other"
        ? form.otherSpecialization.trim()
        : form.specialization;
      fd.append("specialization", finalSpec);

      fd.append("registrationNo", form.medicalRegNo.trim());
      fd.append("experience",     form.experience);
      fd.append("about",          form.about.trim());

      // Khali education rows hata dein
      const cleanEdu = education.filter(r => r.degree.trim() || r.institution.trim() || r.year.trim());
      fd.append("education", JSON.stringify(cleanEdu));

      fd.append("languages", JSON.stringify(selectedLanguages));

      if (selectedTpl?.type === "preset") {
        fd.append("templateId", selectedTpl.id);
      } else if (selectedTpl?.type === "custom" && customFile) {
        fd.append("customTemplate", customFile);
      }

      const { data } = await axios.post(`${API_BASE}/api/lead/signup`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!data.success || !data.paymentSessionId) {
        setError("Could not create order. Please try again.");
        return;
      }

      await loadCashfreeSdk();

      const cashfree = window.Cashfree({ mode: CASHFREE_MODE });
      await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Signup failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const displayedTemplates = (() => {
    if (activeCategory === "all") return Object.values(templates.grouped).flat();
    return templates.grouped[activeCategory] || [];
  })();

  const totalCount = Object.values(templates.grouped).flat().length;
  const sliderPct  = ((form.experience - 1) / 49) * 100;

  return (
    <div className="de-page">
      <div className="de-blob de-blob-1" />
      <div className="de-blob de-blob-2" />

      {previewTpl && (
        <TemplatePreviewModal
          template={previewTpl}
          onClose={() => setPreviewTpl(null)}
          onSelect={(t) => {
            setSelectedTpl({ type: "preset", id: t._id, name: t.name });
            removeCustomFile();
          }}
          isSelected={selectedTpl?.type === "preset" && selectedTpl?.id === previewTpl._id}
        />
      )}

      <div className="de-card">

        {/* ── Header ── */}
        <div className="de-header">
          <div className="de-header-bg" />
          <div className="de-header-noise" />
          <div className="de-header-content">
            <button className="de-back-btn"
              onClick={() => step === 2 ? setStep(1) : navigate(-1)}>
              <ArrowLeft size={13} />
              {step === 2 ? "Back to details" : "Back to plans"}
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

        {/* ── Step indicator ── */}
        <div className="de-steps">
          <div className={`de-step ${step === 1 ? "active" : "done"}`}>
            <div className="de-step-dot">{step > 1 ? "✓" : "1"}</div>
            Your Details
          </div>
          <div className="de-step-divider" />
          <div className={`de-step ${step === 2 ? "active" : step > 2 ? "done" : ""}`}>
            <div className="de-step-dot">2</div>
            Choose Template
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="de-error">
            <AlertTriangle size={15} />
            {error}
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━ STEP 1 ━━━━━━━━━━━━━━━ */}
        {step === 1 && (
          <div className="de-form">

            {/* ── Basic Info ── */}
            <div className="de-row de-anim-1">
              <InputField label="Full Name *" icon={<User size={15} />} name="name"
                placeholder="Dr. Himanshu Chaudhary" value={form.name} onChange={handleChange} />
              <InputField label="Clinic Name *" icon={<Building2 size={15} />} name="clinicName"
                placeholder="Sunrise Clinic" value={form.clinicName} onChange={handleChange} />
            </div>
            <div className="de-row de-anim-2">
              <InputField label="Email Address *" icon={<Mail size={15} />} name="email"
                type="email" placeholder="doctor@example.com" value={form.email} onChange={handleChange} />
              <InputField label="Password *" icon={<Lock size={15} />} name="password"
                type="password" placeholder="Create a password" value={form.password} onChange={handleChange} />
            </div>
            <div className="de-row de-anim-3">
              <InputField label="Mobile Number" icon={<Phone size={15} />} name="mobile"
                placeholder="9876543210" value={form.mobile} onChange={handleChange} />
              <InputField label="Location" icon={<MapPin size={15} />} name="address"
                placeholder="City, State" value={form.address} onChange={handleChange} />
            </div>

            {/* ━━━ Professional Details Section ━━━ */}
            <div className="de-prof-section de-anim-4">
              <div className="de-prof-header">
                <div className="de-prof-header-icon">
                  <GraduationCap size={18} color="#fff" />
                </div>
                <div className="de-prof-header-text">
                  <div className="de-prof-header-title">Professional Details</div>
                  <div className="de-prof-header-sub">Your medical qualifications and experience</div>
                </div>
                <span className="de-required-badge">⚡ Required</span>
              </div>

              <div className="de-prof-body">

                {/* ── Degree multi-select chips ── */}
                <div className="de-field">
                  <label className="de-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <GraduationCap size={11} /> Degree / Qualification *
                    {form.degrees.length > 0 && (
                      <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: "#6366f1", textTransform: "none", letterSpacing: 0 }}>
                        {form.degrees.length} selected
                      </span>
                    )}
                  </label>

                  <div className="de-degree-grid">
                    {DEGREE_OPTIONS.map(d => (
                      <button key={d} type="button"
                        className={`de-degree-chip${form.degrees.includes(d) ? " active" : ""}`}
                        onClick={() => toggleDegree(d)}>
                        {d}
                      </button>
                    ))}
                    <button type="button"
                      className={`de-degree-chip${form.degrees.includes("Other") ? " active" : ""}`}
                      onClick={() => toggleDegree("Other")}>
                      Other
                    </button>
                  </div>

                  {form.degrees.length > 0 && (
                    <div className="de-degree-summary">
                      {form.degrees.map(d => (
                        <span key={d} className="de-degree-tag">
                          {d === "Other" && form.otherDegree.trim() ? form.otherDegree.trim() : d}
                          <button
                            type="button"
                            className="de-degree-tag-remove"
                            onClick={() => toggleDegree(d)}
                            aria-label={`Remove ${d}`}
                          >
                            <X size={11} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {form.degrees.includes("Other") && (
                    <div className="de-input-wrap" style={{ marginTop: 10 }}>
                      <span className="de-input-icon"><BookOpen size={15} /></span>
                      <input className="de-input" type="text" name="otherDegree"
                        placeholder="Enter your degree (e.g. DMLT, BPT)"
                        value={form.otherDegree}
                        onChange={handleChange} />
                    </div>
                  )}
                </div>

                {/* Specialization */}
                <div className="de-field">
                  <label className="de-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Stethoscope size={11} /> Specialization *
                  </label>
                  <div className="de-select-wrap">
                    <span className="de-select-icon"><Stethoscope size={15} /></span>
                    <select className="de-select" name="specialization" value={form.specialization} onChange={handleChange}>
                      <option value="">-- Select specialization --</option>
                      {SPECIALIZATION_OPTIONS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <span className="de-select-arrow">▾</span>
                  </div>
                  {form.specialization === "Other" && (
                    <div className="de-input-wrap" style={{ marginTop: 10 }}>
                      <span className="de-input-icon"><Stethoscope size={15} /></span>
                      <input className="de-input" type="text" name="otherSpecialization"
                        placeholder="Enter your specialization"
                        value={form.otherSpecialization}
                        onChange={handleChange} />
                    </div>
                  )}
                </div>

                {/* Medical Reg No */}
                <div className="de-field">
                  <label className="de-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Hash size={11} /> Medical Registration Number *
                  </label>
                  <div className="de-input-wrap">
                    <span className="de-input-icon"><ClipboardList size={15} /></span>
                    <input className="de-input" type="text" name="medicalRegNo"
                      placeholder="MH-2019-12345"
                      value={form.medicalRegNo}
                      onChange={handleChange} />
                  </div>
                </div>

                {/* Experience Slider */}
                <div className="de-field">
                  <label className="de-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Award size={11} /> Years of Experience
                  </label>
                  <div className="de-exp-row">
                    <input
                      type="range" min="1" max="50" step="1"
                      className="de-exp-slider"
                      value={form.experience}
                      style={{ background: `linear-gradient(to right, #6366f1 ${sliderPct}%, #e4e7f0 ${sliderPct}%)` }}
                      onChange={handleSlider}
                    />
                    <div className="de-exp-badge">
                      {form.experience} {form.experience === 1 ? "yr" : "yrs"}
                    </div>
                  </div>
                </div>

                {/* ── Education Rows ── */}
                <div className="de-field">
                  <label className="de-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <BookOpen size={11} /> Education Details
                  </label>
                  <div className="de-edu-list">
                    {education.map((row, idx) => (
                      <div key={idx} className="de-edu-row">
                        <div className="de-edu-fields">
                          <div className="de-edu-field">
                            <div className="de-edu-label">Degree</div>
                            <input
                              className="de-edu-input"
                              type="text"
                              placeholder="e.g. MBBS"
                              value={row.degree}
                              onChange={e => handleEduChange(idx, "degree", e.target.value)}
                            />
                          </div>
                          <div className="de-edu-field" style={{ flex: 2 }}>
                            <div className="de-edu-label">College / University</div>
                            <input
                              className="de-edu-input"
                              type="text"
                              placeholder="e.g. AIIMS Delhi"
                              value={row.institution}
                              onChange={e => handleEduChange(idx, "institution", e.target.value)}
                            />
                          </div>
                          <div className="de-edu-field" style={{ maxWidth: 90 }}>
                            <div className="de-edu-label">Year</div>
                            <input
                              className="de-edu-input"
                              type="text"
                              placeholder="2010"
                              maxLength={4}
                              value={row.year}
                              onChange={e => handleEduChange(idx, "year", e.target.value)}
                            />
                          </div>
                        </div>
                        {education.length > 1 && (
                          <button className="de-edu-remove" type="button" onClick={() => removeEduRow(idx)}>
                            <Trash2 size={14} color="#ef4444" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {education.length < 5 && (
                    <button type="button" className="de-add-edu-btn" style={{ marginTop: 10 }} onClick={addEduRow}>
                      <Plus size={14} /> Add Another Degree
                    </button>
                  )}
                </div>

                {/* ── Languages ── */}
                <div className="de-field">
                  <label className="de-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Languages size={11} /> Languages Spoken
                  </label>
                  <div className="de-lang-grid">
                    {LANGUAGE_OPTIONS.map(lang => (
                      <button key={lang} type="button"
                        className={`de-lang-chip${selectedLanguages.includes(lang) ? " active" : ""}`}
                        onClick={() => toggleLanguage(lang)}>
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── About / Bio ── */}
                <div className="de-field">
                  <label className="de-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <FileText size={11} /> About / Short Bio
                  </label>
                  <div className="de-input-wrap">
                    <span className="de-input-icon" style={{ top: 14, transform: "none" }}>
                      <FileText size={15} />
                    </span>
                    <textarea
                      className="de-input"
                      name="about"
                      placeholder="Tell patients about yourself — your experience, expertise, and approach... (optional)"
                      value={form.about}
                      onChange={handleChange}
                      rows={3}
                      style={{ resize: "none", paddingTop: 12, lineHeight: 1.6 }}
                    />
                  </div>
                </div>

              </div>
            </div>
            {/* ━━━ End Professional Details ━━━ */}

            <div className="de-divider de-anim-5" />

            {/* Billing */}
            {!planLoading && showBillingToggle && (
              <div className="de-anim-6">
                <label className="de-label" style={{ display: "block", marginBottom: 10 }}>Billing Cycle</label>
                <div className="de-billing-grid">
                  <label className={`de-billing-card${form.interval === "monthly" ? " active" : ""}`}
                    onClick={() => setForm(p => ({ ...p, interval: "monthly" }))}>
                    <input type="radio" name="interval" value="monthly" checked={form.interval === "monthly"} onChange={handleChange} style={{ display: "none" }} />
                    <div className="de-billing-name">Monthly</div>
                    <div className="de-billing-price">₹{planData.monthlyPrice.toLocaleString("en-IN")}<span style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af" }}>/month</span></div>
                  </label>
                  <label className={`de-billing-card${form.interval === "yearly" ? " active" : ""}`}
                    onClick={() => setForm(p => ({ ...p, interval: "yearly" }))}>
                    <input type="radio" name="interval" value="yearly" checked={form.interval === "yearly"} onChange={handleChange} style={{ display: "none" }} />
                    <div className="de-billing-name">Yearly</div>
                    <div className="de-billing-price">₹{planData.yearlyPrice.toLocaleString("en-IN")}<span style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af" }}>/year</span></div>
                    <div className="de-save-badge">Save more</div>
                  </label>
                </div>
              </div>
            )}
            {!planLoading && planData && !showBillingToggle && (
              <div className="de-single-billing de-anim-6">
                <span className="de-single-billing-label">{hasMonthly ? "Monthly billing" : "Yearly billing"}</span>
                <span className="de-single-billing-price">
                  ₹{(hasMonthly ? planData.monthlyPrice : planData.yearlyPrice).toLocaleString("en-IN")}
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#9ca3af" }}>{hasMonthly ? "/month" : "/year"}</span>
                </span>
              </div>
            )}

            <button className="de-submit-btn de-anim-7" type="button" onClick={goToStep2}>
              <LayoutTemplate size={17} />
              Next: Choose Template
              <ChevronRight size={16} />
            </button>
            <p className="de-note de-anim-8">
              <ShieldCheck size={13} style={{ color: "#6366f1", flexShrink: 0 }} />
              Step 1 of 2 — template selection next
            </p>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━ STEP 2 — Template Chooser ━━━━━━━━━━━━━━━ */}
        {step === 2 && (
          <div className="de-form">
            <div className="de-template-section">
              <p className="de-template-section-title">Choose a Prescription / Letterhead Template</p>

              {tplLoading && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 12, marginBottom: 16 }}>
                  {[1,2,3,4].map(i => <div key={i} className="de-tpl-shimmer" />)}
                </div>
              )}

              {!tplLoading && totalCount > 0 && (
                <>
                  <div className="de-cat-tabs">
                    <button className={`de-cat-tab${activeCategory === "all" ? " active" : ""}`}
                      onClick={() => setActiveCategory("all")}>All ({totalCount})</button>
                    {templates.categories.map(cat => (
                      <button key={cat} className={`de-cat-tab${activeCategory === cat ? " active" : ""}`}
                        onClick={() => setActiveCategory(cat)}>
                        {cat} ({templates.grouped[cat]?.length || 0})
                      </button>
                    ))}
                  </div>

                  <div className="de-tpl-grid">
                    {displayedTemplates.map(t => {
                      const isSelected = selectedTpl?.type === "preset" && selectedTpl?.id === t._id;
                      return (
                        <div key={t._id} className={`de-tpl-card${isSelected ? " selected" : ""}`}
                          onClick={() => { setSelectedTpl({ type: "preset", id: t._id, name: t.name }); removeCustomFile(); }}>
                          <div className="de-tpl-img-wrap">
                            <img src={t.imageUrl} alt={t.name} className="de-tpl-img" />
                            <div className="de-tpl-overlay">
                              <button className="de-tpl-view-btn" onClick={(e) => { e.stopPropagation(); setPreviewTpl(t); }}>
                                <Eye size={12} /> View
                              </button>
                            </div>
                          </div>
                          <div className="de-tpl-name">{t.name}</div>
                        </div>
                      );
                    })}

                    <div className={`de-tpl-custom${selectedTpl?.type === "custom" ? " selected" : ""}`}
                      onClick={() => fileRef.current.click()}>
                      <Upload size={20} color="#7c3aed" />
                      <div className="de-tpl-custom-label">Upload Custom</div>
                      <div style={{ fontSize: 10, color: "#a78bfa" }}>PNG / JPG / PDF</div>
                    </div>
                  </div>
                </>
              )}

              {!tplLoading && totalCount === 0 && (
                <div style={{ textAlign: "center", padding: "28px 16px", color: "#9ca3af", fontSize: 13, background: "#f8f9fc", borderRadius: 14, border: "1.5px dashed #e4e7f0" }}>
                  <ImageIcon size={28} style={{ margin: "0 auto 10px", display: "block" }} />
                  <p>No templates have been added yet. You can upload a custom one below.</p>
                </div>
              )}

              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleCustomFile} />

              {customPreview && (
                <div className="de-custom-preview" style={{ marginTop: 12 }}>
                  <img src={customPreview} alt="custom" className="de-custom-preview-img" />
                  <div className="de-custom-preview-name">{customFile?.name}</div>
                  <button className="de-custom-remove-btn" onClick={removeCustomFile}><X size={15} color="#ef4444" /></button>
                </div>
              )}

              <div className={`de-no-template${!selectedTpl ? " selected" : ""}`}
                onClick={() => { setSelectedTpl(null); removeCustomFile(); }} style={{ marginTop: 10 }}>
                {!selectedTpl ? "✓ No template needed" : "Skip — no template needed"}
              </div>
            </div>

            <div className="de-divider" />

            {selectedTpl && (
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, color: "#15803d", display: "flex", alignItems: "center", gap: 8, animation: "fadeSlideUp 0.3s ease both" }}>
                <CheckCircle2 size={15} />
                {selectedTpl.type === "preset" ? `"${selectedTpl.name}" template selected` : `Custom template: ${customFile?.name}`}
              </div>
            )}

            <div className="de-btn-row">
              <button className="de-prev-btn" onClick={() => { setStep(1); setError(""); }}>
                <ArrowLeft size={15} /> Back
              </button>
              <button className="de-submit-btn" type="button" onClick={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <><Loader2 size={16} style={{ animation: "spin 0.7s linear infinite" }} /> Redirecting...</>
                ) : (
                  <>
                    <ShieldCheck size={17} />
                    Proceed to Payment
                    {selectedPrice && <span className="de-price-tag">₹{selectedPrice.toLocaleString("en-IN")}</span>}
                  </>
                )}
              </button>
            </div>

            <p className="de-note">
              <ShieldCheck size={13} style={{ color: "#6366f1", flexShrink: 0 }} />
              Your account is created automatically after successful payment.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Reusable InputField ───────────────────────────────────────────────────────
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