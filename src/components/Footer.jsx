// ─── Footer.jsx ─────────────────────────────────────────────────────────────

const footerCss = `
/* ── FOOTER ── */
footer{background:var(--gray-800);color:rgba(255,255,255,0.7);padding:60px 5% 30px;}
.footer-inner{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:50px;margin-bottom:50px;}
.footer-logo{margin-bottom:14px;}
.footer-logo img{height:34px;filter:brightness(0) invert(1) opacity(0.9);}
.footer-tagline{font-size:0.85rem;line-height:1.7;max-width:270px;color:rgba(255,255,255,0.5);}
.footer-url{font-size:0.82rem;color:var(--cyan);margin-top:8px;text-decoration:none;font-weight:600;display:block;}
.footer-url:hover{color:white;}
.footer-col h4{font-size:0.78rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:white;margin-bottom:18px;}
.footer-links{list-style:none;display:flex;flex-direction:column;gap:10px;}
.footer-links a{font-size:0.85rem;color:rgba(255,255,255,0.5);text-decoration:none;transition:color 0.2s;}
.footer-links a:hover{color:rgba(255,255,255,0.8);}
.footer-bottom{border-top:1px solid rgba(255,255,255,0.1);padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;}
.footer-bottom p{font-size:0.78rem;color:rgba(255,255,255,0.35);}
.footer-live{display:flex;align-items:center;gap:6px;font-size:0.75rem;color:rgba(255,255,255,0.4);}
.footer-live-dot{width:6px;height:6px;border-radius:50%;background:#00e878;box-shadow:0 0 6px #00e878;}
.footer-socials{display:flex;gap:10px;margin-top:20px;}
.soc-btn{width:34px;height:34px;border-radius:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);display:grid;place-items:center;font-size:0.85rem;color:rgba(255,255,255,0.5);text-decoration:none;transition:all 0.2s;}
.soc-btn:hover{background:rgba(0,174,239,0.2);border-color:rgba(0,174,239,0.3);color:white;}

@media(max-width:1024px){
  .footer-inner{grid-template-columns:1fr 1fr;gap:36px;}
}
@media(max-width:768px){
  .footer-inner{grid-template-columns:1fr;}
  .footer-bottom{flex-direction:column;text-align:center;}
}
`;

export default function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    
    
    {
      heading: "Company",
      links: [
        // { label: "About Us",      href: "#" },
        // { label: "Blog",          href: "#" },
        { label: "Privacy Policy",href: "/privacy-policy" },
        { label: "Terms of Use",  href: "/term-condt." },
      ],
    },
  ];

  return (
    <>
      <style>{footerCss}</style>
      <footer>
        <div className="container">
          <div className="footer-inner">

            {/* Brand column */}
            <div>
              <div className="footer-logo">
                {/* Replace with <img src="/logo.png" alt="DocEdge" /> */}
                    <img src="/footer-svg.png" alt="DocEdge" />

              </div>
              <p className="footer-tagline">
                India's most customisable clinic management software — built for every doctor, every specialty, every workflow.
              </p>
              <a href="https://docedge.in" className="footer-url" target="_blank" rel="noreferrer">
                🌐 www.docedge.in
              </a>
              <div className="footer-socials">
                {[
                  { icon: "📘", href: "#", title: "Facebook"  },
                  { icon: "🐦", href: "#", title: "Twitter"   },
                  { icon: "💼", href: "#", title: "LinkedIn"  },
                  { icon: "▶️", href: "#", title: "YouTube"   },
                ].map(({ icon, href, title }) => (
                  <a key={title} href={href} className="soc-btn" title={title} target="_blank" rel="noreferrer">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {columns.map(({ heading, links }) => (
              <div key={heading} className="footer-col">
                <h4>{heading}</h4>
                <ul className="footer-links">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a href={href}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-bottom">
            <p>© {year} DocEdge Technologies Pvt. Ltd. · All rights reserved.</p>
            <div className="footer-live">
              <div className="footer-live-dot"></div>
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}