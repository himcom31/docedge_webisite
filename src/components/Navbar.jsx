import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, LogIn, Zap, MessageCircle } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const navRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      { label: "Home", id: "top" },  // ← yahan change


    { label: "Features", id: "features" },
    { label: "How It Works", id: "how" },
    { label: "Pricing", id: "pricing" },
    { label: "Testimonials", id: "testimonials" },
    { label: "FAQ", id: "faq" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav ref={navRef}>
      <div className="nav-logo">
        <img src="/docedge.png" alt="DocEdge Logo" style={{ height: "49px", width: "auto" }} />
      </div>

      <ul className="nav-links">
        {links.map(({ label, id }) =>
          id === "top" ? (
            <li key={id}>
              <Link to="/">Home</Link>
            </li>
          ) : (
            <li key={id}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>
                {label}
              </a>
            </li>
          )
        )}
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

        {/* Login/Dashboard — conditionally show */}
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

        {/* Free Demo — hamesha dikhega */}
        <a
          href="#lead"
          className="btn-nav-cta"
          onClick={e => { e.preventDefault(); scrollTo("lead"); }}
        >
          <Zap size={15} />
          Free Demo
        </a>
      </div>
    </nav>
  );
}