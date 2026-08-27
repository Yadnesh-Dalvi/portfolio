import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/Header.css";
import Icons from "./Icons.jsx";

const Header = () => {
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const descRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const timeline = gsap.timeline({ delay: 0.2 });

    timeline
      .fromTo(card, { opacity: 0, y: 60, scale: 0.96 }, {
        opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out",
      })
      .fromTo(nameRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
      }, "-=0.7")
      .fromTo(roleRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      }, "-=0.5")
      .fromTo(descRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      }, "-=0.4");

    const onMove = (event) => {
      const rect = card.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      gsap.to(card, {
        rotateY: dx * 8,
        rotateX: -dy * 8,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 900,
      });
    };

    const onLeave = () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "power3.out" });
    };

    window.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      timeline.kill();
      window.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-glow" />
      <div className="hero-wrapper">
        <div className="hero-card" ref={cardRef} data-spotlight>
          <div className="hero-card-inner">
            <p className="hero-eyebrow">AI Engineer & Full-Stack Software Engineer</p>
            <h1 ref={nameRef} className="hero-name">Yadnesh Sandeep Dalvi</h1>
            <p ref={roleRef} className="hero-role">
              M.S. Computer Science at Indiana University &nbsp;|&nbsp; 4.0 GPA
            </p>
            <p ref={descRef} className="hero-desc">
              I build production AI applications and multi-agent systems with Python,
              FastAPI, React, and LangGraph. My work spans RAG platforms, graph-based
              recommendation systems, and evaluation pipelines across production and research.
            </p>
            <Icons />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
