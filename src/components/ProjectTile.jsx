import { useRef, useEffect } from "react";
import gsap from "gsap";
import "../styles/ProjectTile.css";

const ProjectTile = ({ project }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -10;
      const rotateY = ((x / rect.width) - 0.5) * 10;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const reset = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", reset);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div className="block">
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="project-link"
    >
      <div
        ref={cardRef}
        className="project-tile"
        style={{
          background: `linear-gradient(90deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      >
        {/* Floating image */}
        <img
          src={project.image}
          alt={project.name}
          className="project-image"
        />

        {/* Content */}
        <h2 className="project-title">{project.name}</h2>
        <p className="project-desc">{project.description}</p>

        {/* Tech icons */}
        <div className="tech-icons">
          {project.tech.map((tech, i) => (
            <img
              key={tech}
              src={`/icons/${tech}.svg`}
              alt={tech}
              style={{ marginLeft: i % 2 === 0 ? "32px" : "0" }}
            />
          ))}
        </div>
      </div>
    </a>
    </div>
  );
};

export default ProjectTile;
