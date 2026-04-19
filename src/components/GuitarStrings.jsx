import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "../styles/GuitarStrings.css";

const GuitarStrings = () => {
  const containerRef = useRef();

  useGSAP(() => {
    const strings = gsap.utils.toArray(".string");

    strings.forEach((string) => {
      const onMove = (e) => {
        const rect = string.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;

        const distance = e.clientY - centerY;
        const pull = gsap.utils.clamp(-40, 40, distance);

        gsap.to(string, {
          y: pull,
          duration: 0.15,
          ease: "power2.out"
        });
      };

      const onLeave = () => {
        gsap.to(string, {
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.25)" // 🔥 REAL STRING SNAP
        });
      };

      string.addEventListener("mousemove", onMove);
      string.addEventListener("mouseleave", onLeave);

      return () => {
        string.removeEventListener("mousemove", onMove);
        string.removeEventListener("mouseleave", onLeave);
      };
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="guitar">
      {[...Array(6)].map((_, i) => (
        <div className="string" key={i} />
      ))}
    </div>
  );
};

export default GuitarStrings;
