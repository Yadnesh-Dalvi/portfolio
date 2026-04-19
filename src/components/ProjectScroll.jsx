import { useEffect, useRef, useState } from "react";
import "../styles/ProjectScroll.css";

// npm install gsap

const PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "Aether UI",
    category: "Design System",
    year: "2024",
    desc: "A comprehensive component library built for high-performance web apps. Dark-first, token-based, zero compromise.",
    tags: ["React", "TypeScript", "Figma"],
    color: "rgba(234,78,78,0.06)",
  },
  {
    id: 2,
    num: "02",
    title: "Obsidian CMS",
    category: "Full Stack",
    year: "2024",
    desc: "Headless CMS with a visual editor, real-time collaboration, and a plugin system built for developers.",
    tags: ["Next.js", "Postgres", "Tiptap"],
    color: "rgba(180,30,50,0.07)",
  },
  {
    id: 3,
    num: "03",
    title: "Pulse Analytics",
    category: "Data Viz",
    year: "2023",
    desc: "Real-time analytics dashboard with animated charts, live feeds, and custom alerting built for SaaS teams.",
    tags: ["D3.js", "WebSockets", "Redis"],
    color: "rgba(234,78,78,0.05)",
  },
  {
    id: 4,
    num: "04",
    title: "Void Studio",
    category: "Branding",
    year: "2023",
    desc: "Complete brand identity for a creative agency — logo system, motion guidelines, and digital presence.",
    tags: ["Illustrator", "After Effects", "Webflow"],
    color: "rgba(150,20,35,0.08)",
  },
  {
    id: 5,
    num: "05",
    title: "Rift Protocol",
    category: "Web3",
    year: "2022",
    desc: "Decentralized exchange interface with on-chain portfolio tracking and gas-optimized transaction flows.",
    tags: ["Solidity", "ethers.js", "wagmi"],
    color: "rgba(234,78,78,0.06)",
  },
];

export default function ProjectsScroll() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const orbRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let ctx;
    let ScrollTriggerRef;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ScrollTriggerRef = ScrollTrigger;

      // Wait two frames for DOM layout to fully settle
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));

      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // ── CRITICAL: remove any overflow:hidden on parent elements ──
      // Walk up the DOM and remove overflow hidden that would clip the track
      let el = section.parentElement;
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        if (style.overflow === "hidden" || style.overflowX === "hidden") {
          el.style.overflow = "visible";
          el.dataset.gsapFixed = "true";
        }
        el = el.parentElement;
      }

      ctx = gsap.context(() => {
        const getAmount = () => -(track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: getAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // markers: true, // ← uncomment to debug
            onUpdate(self) {
              const idx = Math.min(
                Math.round(self.progress * (PROJECTS.length - 1)),
                PROJECTS.length - 1
              );
              setActive(idx);

              if (orbRef.current) {
                gsap.to(orbRef.current, {
                  x: self.progress * (window.innerWidth * 0.6),
                  y: Math.sin(self.progress * Math.PI) * 200,
                  duration: 0.6,
                  ease: "power2.out",
                });
              }
            },
          },
        });

        // Card entrance
        track.querySelectorAll(".proj-card").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Number parallax
        track.querySelectorAll(".proj-num").forEach((num) => {
          gsap.to(num, {
            x: -25,
            ease: "none",
            scrollTrigger: {
              trigger: num.closest(".proj-card"),
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          });
        });
      }, section);
    };

    init();

    return () => {
      ctx?.revert();
      ScrollTriggerRef?.getAll().forEach((t) => t.kill());
      // Restore any overflow we changed
      document.querySelectorAll("[data-gsap-fixed]").forEach((el) => {
        el.style.overflow = "";
        delete el.dataset.gsapFixed;
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="projects-section">
      <div ref={orbRef} className="proj-glow-orb" />

      <div className="projects-header">
        <h2>Selected<br /><em>Work</em></h2>
        <p>Scroll to explore</p>
      </div>

      <div className="proj-counter">
        <strong>{String(active + 1).padStart(2, "0")}</strong> / 0{PROJECTS.length}
      </div>

      <div className="progress-dots">
        {PROJECTS.map((_, i) => (
          <span key={i} className={i === active ? "active" : ""} />
        ))}
      </div>

      <div className="scroll-hint">Scroll down</div>

      <div ref={trackRef} className="proj-track">
        <div className="proj-track-spacer" />

        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className="proj-card"
            style={{ "--card-color": p.color }}
          >
            <div className="proj-card-top">
              <div className="proj-num">{p.num}</div>
              <div className="proj-meta">
                <span className="proj-category">{p.category}</span>
                <span className="proj-year">{p.year}</span>
              </div>
            </div>

            <div className="proj-card-mid">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>

            <div className="proj-card-divider" />

            <div className="proj-tags">
              {p.tags.map((t) => (
                <span key={t} className="proj-tag">{t}</span>
              ))}
            </div>

            <div className="proj-arrow">↗</div>
          </div>
        ))}

        <div className="proj-end-card">
          <span>That's all<br />for now.</span>
          <a href="#">View Archive →</a>
        </div>
      </div>
    </section>
  );
}