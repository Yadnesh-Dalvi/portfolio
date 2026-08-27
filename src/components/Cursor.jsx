import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Set initial state with proper centering
    gsap.set([cursor, follower], { 
      opacity: 1,
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0
    });

    const moveCursor = (e) => {
      const spotlightSurface = e.target.closest?.("[data-spotlight]");

      if (spotlightSurface) {
        const bounds = spotlightSurface.getBoundingClientRect();
        spotlightSurface.style.setProperty("--spot-x", `${e.clientX - bounds.left}px`);
        spotlightSurface.style.setProperty("--spot-y", `${e.clientY - bounds.top}px`);
      }

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "none",
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const hoverIn = () => {
      gsap.to(cursor, { scale: 0.4, duration: 0.25 });
      gsap.to(follower, { scale: 2.5, duration: 0.25 });
    };

    const hoverOut = () => {
      gsap.to(cursor, { scale: 1, duration: 0.25 });
      gsap.to(follower, { scale: 1, duration: 0.25 });
    };

    window.addEventListener("mousemove", moveCursor);

    document.querySelectorAll(".link").forEach((el) => {
      el.addEventListener("mouseenter", hoverIn);
      el.addEventListener("mouseleave", hoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll(".link").forEach((el) => {
        el.removeEventListener("mouseenter", hoverIn);
        el.removeEventListener("mouseleave", hoverOut);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-follower" ref={followerRef}></div>
    </>
  );
};

export default Cursor;
