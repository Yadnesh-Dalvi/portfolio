import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectTile from "./ProjectTile";
import projects from "./projects";
import "../styles/Projects.css";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    const section = sectionRef.current;

    if (!track || !section) return;

    // Calculate scroll length
    const scrollLength = track.scrollWidth - window.innerWidth;

    // Kill any existing ScrollTriggers on this element
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === section) {
        trigger.kill();
      }
    });

    // Create horizontal scroll animation
    gsap.to(track, {
      x: -scrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `-=${scrollLength + window.innerHeight}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="projects-section">
      <div className="projects-header">
        <h2>PROJECTS</h2>
        <h1>My Works</h1>
      </div>

      <div className="projects-track" ref={trackRef}>
        {projects.map((p) => (
          <ProjectTile key={p.name} project={p} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;