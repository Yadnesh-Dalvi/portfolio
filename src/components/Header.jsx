// import React, { useRef } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import "../styles/Header.css"; // ✅ Remove 'styles from'
// import Icons from "./Icons.jsx"

// const Header = () => {
//   const headerRef = useRef(null);

//   useGSAP(() => {
//     const header = headerRef.current;

//     const radius = 600;
//     const moveStrength = 50;
//     const rotateStrength = 30;

//     const onMouseMove = (e) => {
//       const rect = header.getBoundingClientRect();

//       const centerX = rect.left + rect.width / 2;
//       const centerY = rect.top + rect.height / 2;

//       const dx = e.clientX - centerX;
//       const dy = e.clientY - centerY;

//       const distance = Math.sqrt(dx * dx + dy * dy);

//       if (distance < radius) {
//         const factor = 1 - distance / radius;

//         gsap.to(header, {
//           x: (dx / rect.width) * moveStrength * factor,
//           y: (dy / rect.height) * moveStrength * factor,
//           rotateY: (dx / rect.width) * rotateStrength * factor,
//           rotateX: (-dy / rect.height) * rotateStrength * factor,
//           scale: 1 + 0.08 * factor,
//           duration: 0.35,
//           ease: "power3.out",
//         });
//       } else {
//         gsap.to(header, {
//           x: 0,
//           y: 0,
//           rotateX: 0,
//           rotateY: 0,
//           scale: 1,
//           duration: 0.6,
//           ease: "power3.out",
//         });
//       }
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     return () => window.removeEventListener("mousemove", onMouseMove);
//   });

//   return (
//       <div className="full_header">
//         <div className="header-icon">
//         <div className="header" ref={headerRef}>
//           <h1>Yadnesh Dalvi</h1>
//           {/* <h3>...Turning Caffeine to Code Since 2021</h3> */}
//           <h2>I am a Computer Science graduate student specializing in full-stack development with interests in artificial intelligence and data science. I have hands-on experience building interactive web applications and enjoy creating smooth user experiences using modern frameworks. I am motivated by solving complex problems and continuously improving my technical skill set.</h2>
//           <h2>Full-Stack Developer | AI Enthusiast | Data Science Explorer</h2>
//         </div>
//         < Icons />
//         </div>
//       </div>
//   );
// };

// export default Header;

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import "../styles/Header.css";
import Icons from "./Icons.jsx"

const Hero = () => {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const descRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(cardRef.current,
      { opacity: 0, y: 60, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }
    )
    .fromTo(nameRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.7"
    )
    .fromTo(roleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5"
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4"
    );

    // Parallax tilt on card
    const card = cardRef.current;
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
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
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section id="home" className="hero-section" ref={sectionRef}>
      <div className="hero-bg-glow" />
      <div className="hero-wrapper">
        <div className="hero-card" ref={cardRef}>
          <div className="hero-card-inner">
            <h1 ref={nameRef} className="hero-name">Yadnesh Dalvi</h1>
            <p ref={roleRef} className="hero-role">
              Full‑Stack Developer &nbsp;|&nbsp; AI Enthusiast &nbsp;|&nbsp; Data Science Explorer
            </p>
            <p ref={descRef} className="hero-desc">
              I am a Computer Science graduate student specializing in full-stack development
              with interests in artificial intelligence and data science. I have hands-on experience
              building interactive web applications and enjoy creating smooth user experiences
              using modern frameworks.
            </p>
            < Icons />
          </div>
        </div>
      </div>
      <div className="hero-bottom" />
    </section>
  );
};

export default Hero;
