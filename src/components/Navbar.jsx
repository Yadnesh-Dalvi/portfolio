import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/Navbar.css";

const SECTIONS = ["home", "experience", "projects", "skills", "education", "contact"];

const Navbar = () => {
  const navRef = useRef(null);
  const [active, setActive] = useState("home");

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav ref={navRef} className="navbar">
      <ul className="nav-links">
        {SECTIONS.map((item) => (
          <li key={item}>
            <button
              className={`nav-btn ${active === item ? "active" : ""}`}
              onClick={() => scrollTo(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
