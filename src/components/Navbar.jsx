import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, LogIn, Zap, MessageCircle } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const navRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("docedge_token");
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle("scrolled", window.scrollY > 10);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", id: "top" },
    { label: "Features", id: "features" },
    { label: "How It Works", id: "how" },
    { label: "Pricing", id: "pricing" },
    { label: "Testimonials", id: "testimonials" },
    { label: "FAQ", id: "faq" },
  ];

  // ── GraminKart jaisa smart scroll ──────────────────────────────
  const handleNavClick = (id) => {
    if (id === "top") {
      // Home pe navigate karo, phir top pe scroll
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 300);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const scrollToSection = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Agar already home page pe hain → directly scroll
    if (location.pathname === "/") {
      scrollToSection();
    } else {
      // Kisi aur route pe hain → pehle home pe jao, phir scroll
      navigate("/");
      setTimeout(scrollToSection, 300);
    }
  };

  return (
    <nav ref={navRef}>
      <div className="nav-logo">
        <img src="/docedge.png" alt="DocEdge Logo" style={{ height: "49px", width: "auto" }} />
      </div>

      <ul className="nav-links">
        {links.map(({ label, id }) => (
          <li key={id}>
            <a
              href={id === "top" ? "/" : `#${id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(id);
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        {/* Mobile WhatsApp */}
        <a
          href="https://wa.me/919382555796"
          target="_blank"
          rel="noreferrer"
          className="nav-mobile-wa"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>

        {isLoggedIn ? (
          <Link to="/dashboard" className="btn-nav-ghost">
            <LayoutDashboard size={15} />
            Dashboard
          </Link>
        ) : (
          <Link to="/auth" className="btn-nav-ghost">
            <LogIn size={15} />
            Login
          </Link>
        )}

        <a
          href="#lead"
          className="btn-nav-cta"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("lead");
          }}
        >
          <Zap size={15} />
          Free Demo
        </a>
      </div>
    </nav>
  );
}