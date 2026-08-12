import { useState, useEffect, useRef } from "react";
import Pricing  from "../components/Pricing";
import Navbar   from "../components/Navbar";   // ← alag file
import Footer   from "../components/Footer";   // ← alag file
import DemoForm from "../components/DemoForm";

// ─── ALL CSS (Navbar + Footer ka CSS unki apni files mein hai) ──────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --navy:      #0B2550;
  --navy-2:    #0d2d5e;
  --navy-light:#1a3f7a;
  --cyan:      #00AEEF;
  --cyan-2:    #0096d6;
  --cyan-light:#e6f7fd;
  --cyan-mid:  #b3e8fa;
  --white:     #ffffff;
  --gray-50:   #f8fafc;
  --gray-100:  #f1f5f9;
  --gray-200:  #e2e8f0;
  --gray-300:  #cbd5e1;
  --gray-500:  #64748b;
  --gray-600:  #475569;
  --gray-800:  #1e293b;
  --green:     #10b981;
  --amber:     #f59e0b;
  --red:       #ef4444;
  --gradient:  linear-gradient(135deg, #0B2550, #00AEEF);
  --gradient-cyan: linear-gradient(135deg, #00AEEF, #0096d6);
  --shadow-sm: 0 1px 3px rgba(11,37,80,0.08), 0 1px 2px rgba(11,37,80,0.06);
  --shadow:    0 4px 16px rgba(11,37,80,0.10), 0 2px 6px rgba(11,37,80,0.07);
  --shadow-lg: 0 20px 60px rgba(11,37,80,0.12), 0 8px 24px rgba(11,37,80,0.08);
  --shadow-xl: 0 40px 100px rgba(11,37,80,0.16);
  --radius:    14px;
  --radius-lg: 22px;
  --font: 'Plus Jakarta Sans', sans-serif;
  --font-serif: 'Instrument Serif', serif;
}

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:var(--font);background:var(--white);color:var(--gray-800);font-size:16px;line-height:1.6;overflow-x:hidden;}

/* ── WA FLOAT ── */
.wa-float{position:fixed;bottom:28px;right:28px;z-index:999;width:58px;height:58px;border-radius:50%;background:#25D366;color:white;display:flex;align-items:center;justify-content:center;font-size:1.6rem;text-decoration:none;box-shadow:0 6px 24px rgba(37,211,102,0.45);transition:all 0.3s;animation:waBounce 2s ease-in-out infinite;}
.wa-float:hover{transform:scale(1.1);box-shadow:0 10px 32px rgba(37,211,102,0.55);}
@keyframes waBounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}

/* ── ANN BAR ── */
.ann-bar{background:var(--gradient);color:white;text-align:center;padding:10px 20px;font-size:0.82rem;font-weight:600;letter-spacing:0.01em;}
.ann-bar a{color:var(--cyan-mid);text-decoration:underline;}
.ann-bar span{background:rgba(255,255,255,0.2);padding:2px 10px;border-radius:100px;margin:0 6px;}

/* ── LAYOUT ── */
section{position:relative;}
.container{max-width:1160px;margin:0 auto;padding:0 5%;}
.section-label{display:inline-flex;align-items:center;gap:7px;padding:5px 14px;border-radius:100px;background:var(--cyan-light);border:1px solid var(--cyan-mid);font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--navy-2);margin-bottom:16px;}
.section-label::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--cyan);}
.section-title{font-family:var(--font);font-size:clamp(2rem,3.8vw,3rem);font-weight:800;line-height:1.12;letter-spacing:-0.03em;color:var(--navy);margin-bottom:16px;}
.section-title .serif{font-family:var(--font-serif);font-style:italic;font-weight:400;color:var(--cyan);}
.section-body{color:var(--gray-500);font-size:1.05rem;line-height:1.8;max-width:580px;}
.text-center{text-align:center;}
.text-center .section-body{margin:0 auto;}

/* ── HERO ── */
#hero{padding:80px 5% 0;background:linear-gradient(175deg,#f0f9ff 0%,#ffffff 45%,#f8fafc 100%);overflow:hidden;min-height:90vh;display:flex;flex-direction:column;justify-content:center;}
.hero-inner{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:100px;background:white;border:1px solid var(--cyan-mid);box-shadow:var(--shadow-sm);font-size:0.78rem;font-weight:600;color:var(--navy);margin-bottom:28px;opacity:0;animation:fadeUp 0.7s 0.1s forwards;}
.badge-live{display:flex;align-items:center;gap:5px;color:var(--green);}
.badge-dot{width:7px;height:7px;border-radius:50%;background:var(--green);animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(1.5);}}
.hero-headline{font-size:clamp(2.6rem,4.5vw,4rem);font-weight:800;line-height:1.08;letter-spacing:-0.04em;color:var(--navy);margin-bottom:22px;opacity:0;animation:fadeUp 0.8s 0.2s forwards;}
.hero-headline .cyan-word{color:var(--cyan);}
.hero-headline .serif-word{font-family:var(--font-serif);font-style:italic;font-weight:400;}
.hero-sub{font-size:1.1rem;color:var(--gray-500);line-height:1.8;max-width:520px;margin-bottom:36px;opacity:0;animation:fadeUp 0.8s 0.35s forwards;}
.hero-sub strong{color:var(--navy);font-weight:700;}
.hero-price-hook{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1px solid #fbbf24;border-radius:12px;padding:10px 18px;margin-bottom:32px;font-size:0.9rem;font-weight:600;color:#92400e;opacity:0;animation:fadeUp 0.8s 0.45s forwards;}
.price-big{font-size:1.5rem;font-weight:800;color:var(--navy);}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;opacity:0;animation:fadeUp 0.8s 0.55s forwards;}
.btn-hero-primary{padding:15px 32px;border-radius:12px;font-size:1rem;font-weight:700;border:none;color:white;cursor:pointer;background:var(--gradient);font-family:var(--font);transition:all 0.3s;text-decoration:none;box-shadow:0 6px 24px rgba(0,174,239,0.35);display:inline-flex;align-items:center;gap:8px;}
.btn-hero-primary:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(0,174,239,0.45);}
.btn-hero-wa{padding:15px 28px;border-radius:12px;font-size:1rem;font-weight:700;border:1.5px solid #25D366;color:#128C7E;cursor:pointer;background:#f0fdf4;font-family:var(--font);transition:all 0.3s;text-decoration:none;display:inline-flex;align-items:center;gap:8px;}
.btn-hero-wa:hover{background:#dcfce7;transform:translateY(-2px);}
.hero-trust{display:flex;align-items:center;gap:10px;margin-top:28px;flex-wrap:wrap;opacity:0;animation:fadeUp 0.8s 0.7s forwards;}
.trust-avs{display:flex;}
.trust-av{width:30px;height:30px;border-radius:50%;border:2px solid white;display:grid;place-items:center;font-size:0.6rem;font-weight:800;color:white;margin-left:-8px;flex-shrink:0;}
.trust-av:first-child{margin-left:0;}
.trust-text{font-size:0.8rem;color:var(--gray-500);}
.trust-stars{color:#f59e0b;font-size:0.85rem;}

/* ── DASHBOARD MOCK ── */
.hero-right{opacity:0;animation:fadeRight 0.9s 0.4s forwards;position:relative;}
@keyframes fadeRight{from{opacity:0;transform:translateX(40px);}to{opacity:1;transform:translateX(0);}}
.hero-dashboard{background:white;border-radius:20px;overflow:hidden;box-shadow:var(--shadow-xl),0 0 0 1px var(--gray-200);position:relative;}
.dash-topbar{background:var(--navy);padding:12px 18px;display:flex;align-items:center;gap:10px;}
.dash-dots{display:flex;gap:6px;}
.dash-dot{width:10px;height:10px;border-radius:50%;}
.dash-dot:nth-child(1){background:#ff5f57;}
.dash-dot:nth-child(2){background:#febc2e;}
.dash-dot:nth-child(3){background:#28c840;}
.dash-url{flex:1;text-align:center;font-size:0.7rem;color:rgba(255,255,255,0.4);font-family:monospace;}
.dash-body{display:grid;grid-template-columns:180px 1fr;min-height:400px;}
.dash-side{background:#f8fafc;border-right:1px solid var(--gray-200);padding:16px 12px;}
.dash-logo-sm{display:flex;align-items:center;gap:6px;margin-bottom:20px;}
.dash-logo-sm img{height:24px;}
.dash-nav{display:flex;flex-direction:column;gap:3px;}
.dni{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;font-size:0.72rem;color:var(--gray-500);font-weight:500;cursor:pointer;}
.dni.active{background:var(--cyan-light);color:var(--navy);font-weight:700;border:1px solid var(--cyan-mid);}
.dni-icon{font-size:0.9rem;}
.dash-main{padding:16px;display:flex;flex-direction:column;gap:12px;overflow:hidden;}
.dash-greeting{font-size:0.8rem;font-weight:700;color:var(--navy);}
.dash-greeting span{color:var(--cyan);}
.dash-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.kpi{background:var(--gray-50);border:1px solid var(--gray-200);border-radius:10px;padding:10px 12px;}
.kpi-label{font-size:0.62rem;color:var(--gray-500);text-transform:uppercase;letter-spacing:0.05em;}
.kpi-val{font-size:1.3rem;font-weight:800;color:var(--navy);line-height:1.2;}
.kpi-delta{font-size:0.6rem;color:var(--green);font-weight:600;}
.dash-rx-preview{background:linear-gradient(135deg,#f0f9ff,#e6f7fd);border:1px solid var(--cyan-mid);border-radius:10px;padding:12px;}
.rx-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
.rx-title{font-size:0.7rem;font-weight:700;color:var(--navy);}
.rx-badge{font-size:0.6rem;background:var(--navy);color:white;padding:2px 8px;border-radius:100px;}
.rx-fields{display:flex;flex-direction:column;gap:5px;}
.rx-row{display:flex;gap:6px;}
.rx-chip{background:white;border:1px solid var(--gray-200);border-radius:6px;padding:4px 10px;font-size:0.65rem;color:var(--gray-600);font-weight:500;}
.rx-chip.custom{background:var(--cyan-light);border-color:var(--cyan-mid);color:var(--navy);font-weight:700;}
.appt-title{font-size:0.7rem;font-weight:700;color:var(--navy);margin-bottom:6px;}
.appt-row{display:flex;align-items:center;gap:8px;padding:6px 8px;background:var(--gray-50);border-radius:8px;margin-bottom:4px;border:1px solid var(--gray-200);}
.appt-av{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-size:0.55rem;font-weight:800;color:white;flex-shrink:0;}
.appt-name{font-size:0.68rem;font-weight:600;color:var(--navy);flex:1;}
.appt-time{font-size:0.62rem;color:var(--gray-500);}
.appt-tag{font-size:0.58rem;padding:2px 6px;border-radius:4px;font-weight:700;}
.tag-ok{background:#dcfce7;color:#166534;}
.tag-pend{background:#fef9c3;color:#854d0e;}

/* ── FLOAT CARDS ── */
.hero-float-card{position:absolute;bottom:-20px;left:-30px;background:white;border-radius:14px;padding:14px 18px;box-shadow:var(--shadow-lg);border:1px solid var(--gray-200);min-width:180px;animation:floatY 4s ease-in-out infinite;}
@keyframes floatY{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
.float-label{font-size:0.65rem;color:var(--gray-500);font-weight:600;text-transform:uppercase;letter-spacing:0.06em;}
.float-val{font-size:1.4rem;font-weight:800;color:var(--green);line-height:1.2;margin:2px 0;}
.float-sub{font-size:0.65rem;color:var(--gray-500);}
.hero-float-card-2{position:absolute;top:20px;right:-20px;background:var(--navy);border-radius:14px;padding:12px 16px;box-shadow:var(--shadow-lg);animation:floatY 4s ease-in-out infinite 2s;min-width:160px;}
.float-2-label{font-size:0.65rem;color:rgba(255,255,255,0.6);font-weight:600;text-transform:uppercase;letter-spacing:0.06em;}
.float-2-val{font-size:1.2rem;font-weight:800;color:var(--cyan);line-height:1.3;margin:3px 0;}
.float-2-sub{font-size:0.65rem;color:rgba(255,255,255,0.5);}

/* ── STATS ── */
#stats{background:var(--navy);padding:50px 5%;}
.stats-inner{display:grid;grid-template-columns:repeat(4,1fr);}
.sband{padding:20px;text-align:center;border-right:1px solid rgba(255,255,255,0.1);opacity:0;transform:translateY(20px);transition:all 0.6s ease;}
.sband:last-child{border-right:none;}
.sband.visible{opacity:1;transform:translateY(0);}
.sband-num{font-size:2.6rem;font-weight:800;background:linear-gradient(135deg,#ffffff,var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-0.03em;line-height:1;}
.sband-label{color:rgba(255,255,255,0.7);font-size:0.85rem;margin-top:6px;}
.sband-sub{color:rgba(255,255,255,0.4);font-size:0.72rem;margin-top:3px;}

/* ── USP ── */
#usp{padding:100px 5%;background:linear-gradient(180deg,#f0f9ff 0%,white 100%);}
.usp-inner{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
.usp-visual{background:var(--navy);border-radius:var(--radius-lg);padding:36px;position:relative;overflow:hidden;}
.usp-visual::before{content:'';position:absolute;top:-60px;right:-60px;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(0,174,239,0.3),transparent 70%);}
.usp-tag-row{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;}
.usp-tag{padding:6px 14px;border-radius:8px;font-size:0.75rem;font-weight:700;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.8);transition:all 0.3s;cursor:default;}
.usp-tag:hover{background:rgba(0,174,239,0.15);border-color:rgba(0,174,239,0.3);color:var(--cyan);}
.usp-tag.highlight{background:rgba(0,174,239,0.15);border-color:rgba(0,174,239,0.35);color:var(--cyan);}
.usp-custom-demo{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:20px;margin-top:10px;}
.usp-demo-title{font-size:0.72rem;color:rgba(255,255,255,0.5);font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:14px;}
.custom-field-row{display:flex;flex-direction:column;gap:8px;}
.cfield{display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px 14px;}
.cfield-name{font-size:0.75rem;color:rgba(255,255,255,0.8);font-weight:600;}
.cfield-type{font-size:0.65rem;color:var(--cyan);background:rgba(0,174,239,0.1);border:1px solid rgba(0,174,239,0.2);padding:2px 8px;border-radius:4px;font-weight:700;}
.usp-bottom-note{margin-top:16px;display:flex;align-items:center;gap:8px;}
.usp-bottom-note span{font-size:0.72rem;color:rgba(255,255,255,0.5);}
.usp-check{color:var(--green);font-weight:700;font-size:0.85rem;}
.usp-headline{font-family:var(--font);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:800;color:var(--navy);line-height:1.15;letter-spacing:-0.03em;margin-bottom:20px;}
.usp-headline .cyan{color:var(--cyan);}
.usp-desc{color:var(--gray-500);font-size:1rem;line-height:1.8;margin-bottom:28px;}
.usp-list{list-style:none;display:flex;flex-direction:column;gap:14px;}
.usp-li{display:flex;gap:12px;align-items:flex-start;opacity:0;transform:translateX(16px);transition:all 0.5s ease;}
.usp-li.visible{opacity:1;transform:translateX(0);}
.usp-li-icon{width:36px;height:36px;border-radius:10px;background:var(--cyan-light);border:1px solid var(--cyan-mid);display:grid;place-items:center;font-size:0.95rem;flex-shrink:0;}
.usp-li-title{font-size:0.9rem;font-weight:700;color:var(--navy);margin-bottom:2px;}
.usp-li-text{font-size:0.82rem;color:var(--gray-500);line-height:1.6;}

/* ── FEATURES ── */
#features{padding:100px 5%;background:white;}
.features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:60px;}
.feat-card{background:var(--gray-50);border:1.5px solid var(--gray-200);border-radius:var(--radius);padding:32px 28px;cursor:default;opacity:0;transform:translateY(20px);transition:opacity 0.5s ease,transform 0.5s ease,border-color 0.3s,box-shadow 0.3s,background 0.3s;}
.feat-card.visible{opacity:1;transform:translateY(0);}
.feat-card:hover{border-color:var(--cyan-mid);background:var(--cyan-light);box-shadow:var(--shadow);}
.feat-icon{width:48px;height:48px;border-radius:12px;background:white;border:1.5px solid var(--gray-200);display:grid;place-items:center;font-size:1.3rem;margin-bottom:18px;transition:all 0.3s;}
.feat-card:hover .feat-icon{background:var(--cyan);border-color:var(--cyan);}
.feat-title{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:10px;}
.feat-desc{font-size:0.85rem;color:var(--gray-500);line-height:1.7;}
.feat-new{display:inline-block;margin-top:12px;font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;padding:3px 10px;border-radius:100px;background:#fef3c7;color:#92400e;border:1px solid #fbbf24;}

/* ── HOW IT WORKS ── */
#how{padding:100px 5%;background:var(--gray-50);}
.steps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;margin-top:60px;position:relative;}
.steps-connector{position:absolute;top:36px;left:calc(16.6% + 20px);right:calc(16.6% + 20px);height:2px;background:linear-gradient(90deg,var(--cyan),var(--navy));opacity:0.2;}
.step{text-align:center;padding:36px 28px;background:white;border-radius:var(--radius-lg);border:1.5px solid var(--gray-200);box-shadow:var(--shadow-sm);opacity:0;transform:translateY(24px);transition:opacity 0.6s ease,transform 0.6s ease,box-shadow 0.3s;}
.step.visible{opacity:1;transform:translateY(0);}
.step:hover{box-shadow:var(--shadow-lg);border-color:var(--cyan-mid);}
.step-num{width:72px;height:72px;border-radius:50%;margin:0 auto 22px;background:var(--gradient);color:white;display:grid;place-items:center;font-size:1.5rem;font-weight:800;box-shadow:0 8px 24px rgba(0,174,239,0.35);position:relative;}
.step-num::after{content:'';position:absolute;inset:-5px;border-radius:50%;border:2px dashed rgba(0,174,239,0.25);animation:spin 15s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.step-title{font-size:1.1rem;font-weight:700;color:var(--navy);margin-bottom:10px;}
.step-desc{font-size:0.875rem;color:var(--gray-500);line-height:1.75;}

/* ── TESTIMONIALS ── */
#testimonials{padding:100px 5%;background:white;}
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:60px;}
.testi{background:var(--gray-50);border:1.5px solid var(--gray-200);border-radius:var(--radius-lg);padding:32px;opacity:0;transform:translateY(20px);transition:opacity 0.6s ease,transform 0.6s ease,border-color 0.3s,box-shadow 0.3s;}
.testi.visible{opacity:1;transform:translateY(0);}
.testi:hover{border-color:var(--cyan-mid);box-shadow:var(--shadow);}
.testi-stars{color:var(--amber);font-size:0.9rem;letter-spacing:2px;margin-bottom:16px;}
.testi-text{font-size:0.9rem;color:var(--gray-600);line-height:1.8;font-style:italic;margin-bottom:22px;}
.testi-author{display:flex;align-items:center;gap:12px;}
.testi-av{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-size:0.9rem;font-weight:800;color:white;flex-shrink:0;}
.testi-name{font-size:0.9rem;font-weight:700;color:var(--navy);}
.testi-role{font-size:0.75rem;color:var(--gray-500);margin-top:1px;}

/* ── PRICING ── */
#pricing{padding:100px 5%;background:var(--gray-50);}
.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:60px;align-items:start;}
.price-card{background:white;border:1.5px solid var(--gray-200);border-radius:var(--radius-lg);padding:40px 32px;position:relative;opacity:0;transform:translateY(20px);transition:opacity 0.6s ease,transform 0.6s ease,border-color 0.3s,box-shadow 0.3s;}
.price-card.visible{opacity:1;transform:translateY(0);}
.price-card:hover{box-shadow:var(--shadow-lg);border-color:var(--cyan-mid);}
.price-card.featured{background:var(--navy);border-color:var(--cyan);box-shadow:0 20px 60px rgba(11,37,80,0.25);}
.price-card.featured:hover{box-shadow:0 30px 80px rgba(11,37,80,0.35);}
.price-card.featured .price-plan{color:var(--cyan);}
.price-card.featured .price-amount{color:white;}
.price-card.featured .price-period{color:rgba(255,255,255,0.6);}
.price-card.featured .price-desc{color:rgba(255,255,255,0.7);}
.price-card.featured hr{border-color:rgba(255,255,255,0.1);}
.price-card.featured .pf-item{color:rgba(255,255,255,0.8);}
.price-card.featured .pf-item::before{color:var(--cyan);}
.price-card.featured .pf-item.muted{color:rgba(255,255,255,0.3);}
.pc-badge{position:absolute;top:-1px;right:24px;background:var(--gradient-cyan);color:white;font-size:0.65rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;padding:5px 16px;border-radius:0 0 10px 10px;}
.price-plan{font-size:0.72rem;font-weight:800;color:var(--navy);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:14px;}
.price-amount{font-size:3rem;font-weight:800;color:var(--navy);letter-spacing:-0.04em;line-height:1;}
.price-amount sup{font-size:1.4rem;vertical-align:super;}
.price-amount sub{font-size:0.9rem;font-weight:500;color:var(--gray-500);}
.price-period{font-size:0.8rem;color:var(--gray-500);margin:4px 0 6px;}
.price-annual{font-size:0.75rem;font-weight:700;color:var(--green);background:#dcfce7;padding:3px 10px;border-radius:100px;display:inline-block;margin-bottom:16px;}
.price-desc{font-size:0.875rem;color:var(--gray-500);line-height:1.65;margin-bottom:20px;}
.price-divider{border:none;border-top:1.5px solid var(--gray-200);margin-bottom:20px;}
.pf-list{list-style:none;display:flex;flex-direction:column;gap:11px;margin-bottom:30px;}
.pf-item{display:flex;align-items:flex-start;gap:9px;font-size:0.85rem;color:var(--gray-600);}
.pf-item::before{content:'✓';color:var(--green);font-weight:800;flex-shrink:0;margin-top:1px;}
.pf-item.muted::before{content:'–';color:var(--gray-300);}
.pf-item.muted{color:var(--gray-400);}
.pf-item strong{color:var(--navy);}
.btn-price{width:100%;padding:13px;border-radius:10px;font-size:0.9rem;font-weight:700;cursor:pointer;font-family:var(--font);transition:all 0.3s;text-decoration:none;display:block;text-align:center;border:none;}
.btn-price-outline{background:transparent;border:1.5px solid var(--navy);color:var(--navy);}
.btn-price-outline:hover{background:var(--navy);color:white;}
.btn-price-filled{background:var(--gradient-cyan);color:white;box-shadow:0 6px 20px rgba(0,174,239,0.35);}
.btn-price-filled:hover{box-shadow:0 10px 30px rgba(0,174,239,0.5);transform:translateY(-1px);}
.btn-price-ghost{background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.8);border:1.5px solid rgba(255,255,255,0.2);}
.btn-price-ghost:hover{background:rgba(255,255,255,0.2);color:white;}
.pricing-note{text-align:center;margin-top:24px;font-size:0.82rem;color:var(--gray-500);}

/* ── FAQ ── */
#faq{padding:100px 5%;background:white;}
.faq-inner{max-width:740px;margin:60px auto 0;}
.faq-item{border:1.5px solid var(--gray-200);border-radius:var(--radius);margin-bottom:12px;overflow:hidden;transition:border-color 0.3s;}
.faq-item:hover,.faq-item.open{border-color:var(--cyan-mid);}
.faq-q{padding:20px 24px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;background:var(--gray-50);font-size:0.95rem;font-weight:600;color:var(--navy);user-select:none;transition:background 0.2s;}
.faq-item.open .faq-q{background:var(--cyan-light);}
.faq-icon{width:28px;height:28px;border-radius:50%;background:var(--gray-200);display:grid;place-items:center;font-size:1rem;font-weight:700;color:var(--navy);flex-shrink:0;transition:all 0.3s;}
.faq-item.open .faq-icon{background:var(--cyan);color:white;transform:rotate(45deg);}
.faq-a{max-height:0;overflow:hidden;transition:max-height 0.4s ease,padding 0.3s;font-size:0.875rem;color:var(--gray-500);line-height:1.8;padding:0 24px;background:white;}
.faq-item.open .faq-a{max-height:200px;padding:0 24px 20px;}

/* ── LEAD SECTION ── */
#lead{padding:100px 5%;background:linear-gradient(135deg,var(--navy),var(--navy-2));position:relative;overflow:hidden;}
#lead::before{content:'';position:absolute;top:-100px;right:-100px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(0,174,239,0.15),transparent 70%);pointer-events:none;}
#lead::after{content:'';position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(0,174,239,0.08),transparent 70%);pointer-events:none;}
.lead-inner{display:grid;grid-template-columns:1fr 1.1fr;gap:80px;align-items:center;position:relative;z-index:1;}
.lead-headline{font-family:var(--font);font-size:clamp(2rem,3.5vw,2.8rem);font-weight:800;color:white;line-height:1.15;letter-spacing:-0.03em;margin-bottom:16px;}
.lead-headline .cyan{color:var(--cyan);}
.lead-sub{color:rgba(255,255,255,0.7);font-size:1rem;line-height:1.8;margin-bottom:28px;}
.lead-perks{list-style:none;display:flex;flex-direction:column;gap:12px;margin-bottom:32px;}
.lead-perks li{display:flex;align-items:center;gap:10px;font-size:0.875rem;color:rgba(255,255,255,0.8);}
.lead-perks li::before{content:'✓';color:var(--cyan);font-weight:800;font-size:1rem;}
.lead-contact-info{display:flex;flex-direction:column;gap:10px;}
.lead-contact-btn{display:inline-flex;align-items:center;gap:10px;padding:12px 22px;border-radius:10px;font-size:0.9rem;font-weight:700;text-decoration:none;transition:all 0.3s;width:fit-content;}
.btn-wa-lead{background:#25D366;color:white;box-shadow:0 4px 16px rgba(37,211,102,0.35);}
.btn-wa-lead:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(37,211,102,0.45);}
.btn-call-lead{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:white;}
.btn-call-lead:hover{background:rgba(255,255,255,0.2);transform:translateY(-2px);}
.form-embed-wrap{background:white;border-radius:var(--radius-lg);box-shadow:var(--shadow-xl);padding:40px 32px;}
.form-title{font-family:var(--font);font-size:1.6rem;font-weight:700;color:var(--navy);margin-bottom:8px;}
.form-subtitle{color:var(--gray-500);font-size:0.9rem;margin-bottom:28px;}
.input-group{margin-bottom:18px;}
.input-group label{display:block;font-size:0.8rem;font-weight:600;color:var(--gray-600);margin-bottom:6px;}
.input-group input,.input-group select{width:100%;padding:14px 16px;border:1.5px solid var(--gray-200);border-radius:12px;font-family:var(--font);font-size:0.9rem;background:var(--gray-50);outline:none;transition:border-color 0.2s;}
.input-group input:focus,.input-group select:focus{border-color:var(--cyan);}
.btn-submit-form{width:100%;padding:16px 24px;background:var(--gradient-cyan);color:white;border:none;border-radius:12px;font-family:var(--font);font-weight:700;font-size:1rem;cursor:pointer;transition:all 0.3s;box-shadow:0 6px 20px rgba(0,174,239,0.35);margin-top:12px;}
.btn-submit-form:hover{box-shadow:0 10px 28px rgba(0,174,239,0.5);transform:translateY(-1px);}
.privacy-note{font-size:0.75rem;color:var(--gray-500);text-align:center;margin-top:16px;}
.thankyou-wrap{text-align:center;padding:20px 0;}
.ty-icon{font-size:48px;color:var(--green);margin-bottom:16px;}
.ty-title{font-size:1.5rem;font-weight:700;color:var(--navy);margin-bottom:8px;}
.ty-sub{color:var(--gray-500);margin-bottom:20px;}
.ty-box{background:var(--gray-50);border-radius:20px;padding:24px;text-align:left;margin-bottom:24px;border:1px solid var(--gray-200);}
.ty-box h4{display:flex;gap:8px;margin-bottom:16px;color:var(--navy);font-size:1rem;}
.ty-box p{margin-bottom:16px;color:var(--gray-600);font-size:0.9rem;line-height:1.7;}
.ty-wa-row{background:white;border-radius:16px;padding:20px;display:flex;align-items:center;gap:16px;border:1px solid var(--gray-200);}
.ty-wa-row .wa-num{font-size:1.3rem;font-weight:700;color:var(--navy);}
.ty-wa-row .wa-label{font-size:0.8rem;color:var(--gray-500);}
.ty-alert{background:#fef3c7;border-radius:12px;padding:14px 18px;color:#92400e;font-size:0.9rem;font-weight:500;display:flex;align-items:center;gap:10px;margin-top:16px;}
.btn-wa-final{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:white;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:700;width:100%;margin-bottom:12px;}
.ty-sign{margin-top:16px;color:var(--gray-500);font-size:0.9rem;}


/* ── ANIMATIONS ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
.reveal{opacity:0;transform:translateY(24px);transition:opacity 0.7s ease,transform 0.7s ease;}
.reveal.visible{opacity:1;transform:translateY(0);}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .hero-inner{grid-template-columns:1fr;gap:40px;}
  .hero-float-card,.hero-float-card-2{display:none;}
  .usp-inner{grid-template-columns:1fr;gap:40px;}
  .usp-visual{display:none;}
  .stats-inner{grid-template-columns:repeat(2,1fr);}
  .sband{border-right:none;border-bottom:1px solid rgba(255,255,255,0.1);}
  .lead-inner{grid-template-columns:1fr;gap:40px;}
}
@media(max-width:768px){
  .features-grid{grid-template-columns:1fr;}
  .testi-grid{grid-template-columns:1fr;}
  .pricing-grid{grid-template-columns:1fr;max-width:420px;margin:60px auto 0;}
  .steps-grid{grid-template-columns:1fr;gap:20px;}
  .steps-connector{display:none;}
  .stats-inner{grid-template-columns:1fr 1fr;}
  .hero-headline{font-size:2.4rem;}
  .dash-side{display:none;}
  .dash-body{grid-template-columns:1fr;}
}
`;

const FA_CDN = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";

// ─── INTERSECTION OBSERVER HOOK ─────────────────────────────────────────────
function useReveal(ref, options = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("visible"); io.unobserve(el); }
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px", ...options });
    io.observe(el);
    return () => io.disconnect();
  }, []);
}

// ─── STAT COUNTER ────────────────────────────────────────────────────────────
function StatBand({ target, label, sub }) {
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        el.classList.add("visible");
        const isM = target >= 1000000;
        const isK = target >= 1000 && target < 1000000;
        const dispTarget = isM ? target / 1000000 : isK ? Math.floor(target / 1000) : target;
        const suffix = isM ? "M+" : isK ? "K+" : "%";
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1800, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const cur = isM ? (eased * dispTarget).toFixed(1) : Math.floor(eased * dispTarget);
          const numEl = el.querySelector(".sband-num");
          if (numEl) numEl.textContent = cur + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div className="sband" ref={ref}>
      <div className="sband-num">0</div>
      <div className="sband-label">{label}</div>
      <div className="sband-sub">{sub}</div>
    </div>
  );
}

// ─── FAQ ITEM ────────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <div className="faq-q" onClick={() => setOpen(!open)}>
        {q} <span className="faq-icon">+</span>
      </div>
      <div className="faq-a">{a}</div>
    </div>
  );
}

// ─── REVEAL WRAPPER ──────────────────────────────────────────────────────────
function Reveal({ children, className = "", delay = "" }) {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: delay } : {}}>
      {children}
    </div>
  );
}

// ─── MAIN HOME ───────────────────────────────────────────────────────────────
export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [form, setForm] = useState({
    full_name: "", clinic_name: "", mobile: "", city: "",
    specialization: "", preferred_time: "Morning (9 AM - 12 PM)",
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".step, .testi, .price-card, .usp-li, .feat-card").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <style>{css}</style>
      <link rel="stylesheet" href={FA_CDN} />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/919382555796?text=Hi%2C%20I%20want%20to%20book%20a%20free%20demo%20of%20DocEdge"
        target="_blank" rel="noreferrer"
        className="wa-float" title="Chat on WhatsApp"
      >💬</a>

      {/* Announcement bar */}
      <div className="ann-bar">
        🎉 Limited Offer: Start at just <span>₹33/day</span> — Get 100 FREE WhatsApp + SMS Messages on your first month! &nbsp;
        <a href="#lead" onClick={e => { e.preventDefault(); scrollTo("lead"); }}>Claim Now →</a>
      </div>

      {/* ── NAVBAR ── */}
      <Navbar scrollTo={scrollTo} />

      {/* ── HERO ── */}
      <section id="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-left">
              <div className="hero-badge">
                <span className="badge-live"><span className="badge-dot"></span> Live</span>
                &nbsp;12,000+ Doctors Trust DocEdge Across India
              </div>
              <h1 className="hero-headline">
                India's Most<br />
                <span className="cyan-word">Customisable</span><br />
                Clinic Software
              </h1>
              <p className="hero-sub">
                Every field. Every template. Every letterhead.<br />
                <strong>Built exactly the way you practice medicine.</strong><br />
                ePrescription · Patient Records · Billing · WhatsApp Reminders
              </p>
              <div className="hero-price-hook">
                ⚡ Start today for just <span className="price-big">&nbsp;₹33</span>&nbsp;/ day &nbsp;—&nbsp; Less than your chai!
              </div>
              <div className="hero-actions">
                <a href="#lead" className="btn-hero-primary" onClick={e => { e.preventDefault(); scrollTo("lead"); }}>🚀 Book Free Demo</a>
                <a href="https://wa.me/919382555796" target="_blank" rel="noreferrer" className="btn-hero-wa">💬 WhatsApp Us</a>
              </div>
              <div className="hero-trust">
                <div className="trust-avs">
                  {[
                    ["AS","linear-gradient(135deg,#0B2550,#00AEEF)"],
                    ["RK","linear-gradient(135deg,#7c3aed,#0B2550)"],
                    ["PM","linear-gradient(135deg,#059669,#00AEEF)"],
                    ["VN","linear-gradient(135deg,#dc2626,#7c3aed)"],
                  ].map(([init, bg]) => (
                    <div key={init} className="trust-av" style={{ background: bg }}>{init}</div>
                  ))}
                </div>
                <span className="trust-stars">★★★★★</span>
                <span className="trust-text">4.9/5 from 2,400+ doctor reviews</span>
              </div>
            </div>

            {/* Dashboard mock */}
            <div className="hero-right">
              <div className="hero-dashboard">
                <div className="dash-topbar">
                  <div className="dash-dots">
                    <div className="dash-dot"></div>
                    <div className="dash-dot"></div>
                    <div className="dash-dot"></div>
                  </div>
                  <div className="dash-url">🔒 app.docedge.in/dashboard</div>
                </div>
                <div className="dash-body">
                  <div className="dash-side">
                    <div className="dash-logo-sm">
                      <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--navy)" }}>DocEdge</span>
                    </div>
                    <div className="dash-nav">
                      {[["📊","Dashboard",true],["📅","Appointments"],["👤","Patients"],["💊","Prescriptions"],["💳","Billing"],["💬","WhatsApp"],["📈","Reports"]].map(([icon, label, active]) => (
                        <div key={label} className={`dni${active ? " active" : ""}`}>
                          <span className="dni-icon">{icon}</span> {label}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="dash-main">
                    <div className="dash-greeting">Good morning, <span>Dr. Sharma 👋</span></div>
                    <div className="dash-kpis">
                      <div className="kpi"><div className="kpi-label">Today</div><div className="kpi-val">18</div><div className="kpi-delta">↑ Patients</div></div>
                      <div className="kpi"><div className="kpi-label">Revenue</div><div className="kpi-val">₹6.4K</div><div className="kpi-delta">↑ 8% today</div></div>
                      <div className="kpi"><div className="kpi-label">Reminders</div><div className="kpi-val">24</div><div className="kpi-delta">✓ WhatsApp</div></div>
                    </div>
                    <div className="dash-rx-preview">
                      <div className="rx-header">
                        <div className="rx-title">✏️ Smart ePrescription — Customised for You</div>
                        <div className="rx-badge">AI Assist</div>
                      </div>
                      <div className="rx-fields">
                        <div className="rx-row">
                          <div className="rx-chip custom">Chief Complaint</div>
                          <div className="rx-chip custom">Vitals</div>
                          <div className="rx-chip custom">Diagnosis</div>
                        </div>
                        <div className="rx-row">
                          <div className="rx-chip custom">Your Custom Fields</div>
                          <div className="rx-chip">Drug Allergy?</div>
                          <div className="rx-chip custom">Letterhead</div>
                        </div>
                        <div className="rx-row">
                          <div className="rx-chip">Follow-up Date</div>
                          <div className="rx-chip custom">Doctor's Signature</div>
                        </div>
                      </div>
                    </div>
                    <div className="dash-appts">
                      <div className="appt-title">📅 Next Appointments</div>
                      <div className="appt-row">
                        <div className="appt-av" style={{ background: "linear-gradient(135deg,#0B2550,#00AEEF)" }}>RS</div>
                        <div className="appt-name">Rahul Singh</div>
                        <div className="appt-time">10:30 AM</div>
                        <span className="appt-tag tag-ok">Confirmed</span>
                      </div>
                      <div className="appt-row">
                        <div className="appt-av" style={{ background: "linear-gradient(135deg,#7c3aed,#0B2550)" }}>PK</div>
                        <div className="appt-name">Priya Kumari</div>
                        <div className="appt-time">11:00 AM</div>
                        <span className="appt-tag tag-pend">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-float-card">
                <div className="float-label">No-Show Rate</div>
                <div className="float-val">↓ 68%</div>
                <div className="float-sub">With WhatsApp Reminders</div>
              </div>
              <div className="hero-float-card-2">
                <div className="float-2-label">Setup Time</div>
                <div className="float-2-val">15 min</div>
                <div className="float-2-sub">Ready to use today</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats">
        <div className="container">
          <div className="stats-inner">
            <StatBand target={12000}   label="Doctors on DocEdge"       sub="Across 22+ states" />
            <StatBand target={4800000} label="Patient Records Managed"  sub="Encrypted & secure" />
            <StatBand target={3200000} label="Prescriptions Generated"  sub="Digital & error-free" />
            <StatBand target={99}      label="% Uptime Guaranteed"       sub="Enterprise SLA" />
          </div>
        </div>
      </section>

      {/* ── USP ── */}
      <section id="usp">
        <div className="container">
          <div className="usp-inner">
            <Reveal className="usp-visual">
              <div className="usp-tag-row">
                {[["Custom Questions",true],["Custom Answers",true],["Templates",false],["Letterhead",true],["Clinic Branding",false],["Every Field",true],["Drug Library",false],["Your Workflow",true]].map(([t, h]) => (
                  <span key={t} className={`usp-tag${h ? " highlight" : ""}`}>{t}</span>
                ))}
              </div>
              <div className="usp-custom-demo">
                <div className="usp-demo-title">Your Prescription — 100% Your Way</div>
                <div className="custom-field-row">
                  {[["Chief Complaint","Text Field"],["Blood Pressure","Custom Vital"],["Diagnosis (ICD-10)","Dropdown"],["Your Custom Field 1","You Choose"],["Your Custom Field 2","You Choose"]].map(([n, t]) => (
                    <div key={n} className="cfield">
                      <div className="cfield-name">{n}</div>
                      <div className="cfield-type">{t}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="usp-bottom-note">
                <span className="usp-check">✓</span><span>Unique custom letterhead per doctor</span>
                &nbsp;&nbsp;<span className="usp-check">✓</span><span>Works exactly how you practice</span>
              </div>
            </Reveal>

            <div className="usp-content">
              <div className="section-label">Our #1 USP</div>
              <h2 className="usp-headline">No other software gives you this level of <span className="cyan">customisation</span></h2>
              <p className="usp-desc">Other clinic software forces you to adapt to their rigid templates. DocEdge is built backwards — we start with <em>your</em> workflow and build around it.</p>
              <ul className="usp-list">
                {[
                  ["📝","Fully Custom Prescription Fields","Add, remove, rename, and reorder every field on your prescription — exactly how you examine patients. No locked templates."],
                  ["🏥","Your Letterhead, Your Brand","Upload your clinic logo, signature, MCI number, and create a letterhead that looks as professional as your practice.","0.1s"],
                  ["⚙️","Specialty-Specific Workflows","Dermatologist? Paediatrician? Orthopaedic? Your questions and templates are different — DocEdge supports every specialty uniquely.","0.2s"],
                  ["💬","Customise Once, Use Forever","Set up your personalised workflow on day one. From prescription to billing, every click is optimised for your way of working.","0.3s"],
                ].map(([icon, title, text, delay]) => (
                  <li key={title} className="usp-li" style={delay ? { transitionDelay: delay } : {}}>
                    <div className="usp-li-icon">{icon}</div>
                    <div><div className="usp-li-title">{title}</div><div className="usp-li-text">{text}</div></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features">
        <div className="container">
          <Reveal className="section-header text-center">
            <div className="section-label">Complete Platform</div>
            <h2 className="section-title">Six powerful modules.<br /><span className="serif">One seamless system.</span></h2>
            <p className="section-body">Replace 6 different tools with one intelligent platform built specifically for Indian clinics and hospitals.</p>
          </Reveal>
          <div className="features-grid">
            {[
              ["💊","Smart ePrescription","Generate fully customised digital prescriptions in under 30 seconds. Add your own fields, templates, drug library, and letterhead. Works offline too.","⭐ Our USP"],
              ["📁","Patient Records","Complete health history, visit notes, lab reports, and documents — instantly searchable. ABDM-ready with lifetime patient profiles."],
              ["💳","Billing & Invoicing","GST-compliant invoices, UPI/card/cash, insurance claims, and daily revenue reports — zero manual accounting required."],
              ["📅","Appointment Booking","Online + walk-in booking with smart queue management. Real-time slot availability with a patient-facing booking link."],
              ["💬","WhatsApp & SMS Reminders","Automated appointment reminders, prescription sharing, follow-up alerts, and health tips on WhatsApp and SMS. Cut no-shows by 68%.","100 Free Messages / 1st Month"],
              ["📊","Analytics & Reports","Revenue trends, patient footfall, doctor performance, diagnosis patterns — real-time insights that turn your clinic data into smart decisions."],
            ].map(([icon, title, desc, badge]) => (
              <div key={title} className="feat-card">
                <div className="feat-icon">{icon}</div>
                <div className="feat-title">{title}</div>
                <div className="feat-desc">{desc}</div>
                {badge && <span className="feat-new">{badge}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how">
        <div className="container">
          <Reveal className="section-header text-center">
            <div className="section-label">Quick Start</div>
            <h2 className="section-title">Go fully digital in<br /><span className="serif">15 minutes flat</span></h2>
            <p className="section-body">No IT team. No training days. No complex setup. Three steps and your clinic runs on DocEdge.</p>
          </Reveal>
          <div className="steps-grid">
            <div className="steps-connector"></div>
            {[
              ["Sign Up & Tell Us About Your Clinic","Register in 2 minutes. Share your specialty, doctor count, and how you currently work. Our onboarding wizard handles the rest."],
              ["We Customise It For You","Our team configures your prescription fields, letterhead, appointment slots, and WhatsApp reminders exactly to your workflow — free.","0.15s"],
              ["Go Live & Grow Your Practice","Share your booking link, start seeing patients, and watch DocEdge handle records, billing, reminders, and reports automatically.","0.3s"],
            ].map(([title, desc, delay], i) => (
              <div key={title} className="step" style={delay ? { transitionDelay: delay } : {}}>
                <div className="step-num">{i + 1}</div>
                <div className="step-title">{title}</div>
                <p className="step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials">
        <div className="container">
          <Reveal className="section-header text-center">
            <div className="section-label">Doctor Reviews</div>
            <h2 className="section-title">Loved by doctors<br /><span className="serif">across every specialty</span></h2>
          </Reveal>
          <div className="testi-grid">
            {[
              ["SK","linear-gradient(135deg,#0B2550,#00AEEF)","Dr. Sunita Khanna","Dermatologist · Delhi NCR","\"The customisation is unreal. I'm a dermatologist — I added before/after photo fields, skin type dropdowns, and my custom notes section. My patients say my prescriptions look the most professional they've seen.\""],
              ["MP","linear-gradient(135deg,#7c3aed,#0B2550)","Dr. Manish Patel","Diabetologist · Ahmedabad","\"₹33 a day felt too good to be true. DocEdge shocked me — it's feature-rich, fast, and works offline. The WhatsApp reminder alone recovered ₹60,000 in lost revenue from no-shows in just 6 weeks.\"","0.1s"],
              ["RK","linear-gradient(135deg,#059669,#00AEEF)","Dr. Rajiv Kulkarni","Orthopaedic Surgeon · Pune","\"Our 5-doctor orthopaedic clinic runs entirely on DocEdge now. Queue management, multi-doctor billing, and custom templates per doctor. Within 2 weeks we couldn't imagine going back to paper.\"","0.2s"],
              ["PM","linear-gradient(135deg,#dc2626,#7c3aed)","Dr. Preethi Menon","Paediatrician · Chennai","\"The onboarding team set up my custom letterhead and WhatsApp reminders in 2 hours. Three months in — zero no-shows, zero billing errors. My staff loves it.\"","0.1s"],
              ["AS","linear-gradient(135deg,#0891b2,#0B2550)","Dr. Ananya Sharma","General Physician · Bengaluru","\"DocEdge is the first software that actually adapted to how I work, not the other way around. The AI drug suggestion on prescription saves 3 minutes per patient.\"","0.2s"],
              ["VN","linear-gradient(135deg,#0B2550,#7c3aed)","Dr. Vikram Nair","Hospital Director · Kochi","\"Running a 3-branch hospital got exponentially simpler. All doctors, all branches, one dashboard. NABH documentation prep is finally automated. DocEdge is enterprise-grade at a clinic price.\"","0.3s"],
            ].map(([init, bg, name, role, text, delay]) => (
              <div key={name} className="testi" style={delay ? { transitionDelay: delay } : {}}>
                <div className="testi-stars">★★★★★</div>
                <p className="testi-text">{text}</p>
                <div className="testi-author">
                  <div className="testi-av" style={{ background: bg }}>{init}</div>
                  <div><div className="testi-name">{name}</div><div className="testi-role">{role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <Pricing />

      {/* ── FAQ ── */}
      <section id="faq">
        <div className="container">
          <Reveal className="section-header text-center">
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Questions doctors<br /><span className="serif">ask us most</span></h2>
          </Reveal>
          <div className="faq-inner">
            {[
              ["What makes DocEdge different from other clinic software?","DocEdge is the only clinic software in India that lets you fully customise every field, every question, every answer, every template, and your letterhead — exactly matching how you practice."],
              ["Do WhatsApp and SMS reminders require extra setup?","No — it's built into DocEdge. The Solo plan includes 100 free messages in your first month. The Clinic Pro plan includes WhatsApp + SMS with 2,000 messages/month. Our team handles the WhatsApp Business setup for you."],
              ["Is ₹33/day the final cost? Are there any hidden fees?","₹33/day is the all-inclusive Solo plan cost billed annually (₹12,000/year). There are zero hidden fees. Free setup, free onboarding, free data migration, free updates."],
              ["How quickly can I get started?","You can be live in 15 minutes. After signing up, our onboarding specialist calls you, understands your workflow, and sets up your custom prescription template, letterhead, and settings."],
              ["Does DocEdge work without the internet?","Yes. DocEdge has an offline mode — you can generate prescriptions, view patient records, and manage appointments even without internet. Everything syncs automatically when you reconnect."],
              ["Can I try before I pay?","Yes — we offer a 7-day full-feature free trial. No credit card required. You can also book a free 30-minute live demo where our team walks through every feature customised to your specialty."],
              ["Is my patient data safe and private?","Absolutely. We use 256-bit AES encryption, store all data on AWS India servers, and take automated daily backups. We comply with India's Digital Personal Data Protection Act (DPDPA). Your patient data never leaves India."],
            ].map(([q, a]) => <FaqItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ── LEAD FORM ── */}
      <DemoForm />

      {/* ── FOOTER ── */}
      <Footer />
    </>
  );
}