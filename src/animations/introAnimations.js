// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// const introAnimations = (containerRef) => {
//   useGSAP(() => {
//     const tl = gsap.timeline();

//     tl.from(".navbar", {
//       y: -100,
//       opacity: 0,
//       duration: 1,
//     })
//       .from(".header h1", {
//         filter: "blur(10px)",
//         opacity: 0,
//         duration: 1.2,
//         ease: "power3.out",
//       })
//       .from(".header h3", {
//         x: -50,
//         opacity: 0,
//         duration: 1,
//       })
//       .from(".header h2", {
//         filter: "blur(10px)",
//         opacity: 0,
//         duration: 1.2,
//         ease: "power3.out",
//         stagger: 0.15,
//       })
//       .from(".social-container", {
//         filter: "blur(10px)",
//         opacity: 0,
//         duration: 1.2,
//         ease: "power3.out",
//         stagger: 0.15,
//       });

//     // const profile_photo = document.querySelector(".image");
//     // profile_photo.addEventListener("mouseenter", () => {
//     //   gsap.to(profile_photo, {
//     //     scale: 1.05,
//     //     color: "navy blue",
//     //     duration: 0.25,
//     //     ease: "power3.out",
//     //   });
//     // });

//     // profile_photo.addEventListener("mouseleave", () => {
//     //   gsap.to(profile_photo, {
//     //     scale: 1,
//     //     color: "#6db6ff",
//     //     duration: 0.25,
//     //     ease: "power3.out",
//     //   });
//     // });

//   }, { scope: containerRef });
// };

// export default introAnimations;
