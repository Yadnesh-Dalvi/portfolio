import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const useNavbarHover = (containerRef) => {
useGSAP(() => {
  const items = gsap.utils.toArray(".nav-item , .navbar img");

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.to(item, {
        scale: 1.15,
        duration: 0.25,
        ease: "power3.out",
        border: "1px solid #6db6ff"
      });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(item, {
        scale: 1,
        duration: 0.25,
        ease: "power3.out",
        border: "transparent",
      });
    });
  });
}, { scope: containerRef });
};

export default useNavbarHover;
