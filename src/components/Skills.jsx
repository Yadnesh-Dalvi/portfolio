import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Skills.css";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    label: "Languages & Frameworks",
    color: "#14c7cc",
    skills: [
      "Python", "JavaScript", "TypeScript", "Java", "C++", "SQL", "HTML", "CSS",
      "FastAPI", "React.js", "Node.js", "Express.js", "Django", "Flask",
    ],
  },
  {
    label: "Generative AI & LLMs",
    color: "#26dce0",
    skills: [
      "LLMs", "RAG", "LangChain", "LangGraph", "Prompt Engineering",
      "Agentic AI Workflows", "Multi-Agent Systems", "MCP",
      "OpenAI API", "Claude API", "Gemini API", "Groq API",
    ],
  },
  {
    label: "AI, ML & Data Science",
    color: "#0f8f9b",
    skills: [
      "PyTorch", "PyTorch Geometric", "TensorFlow", "Scikit-learn",
      "Transformers", "BERT", "RoBERTa", "DeBERTa", "BART",
      "LightGCN", "GraphSAGE", "Vector Search", "Recommendation Systems", "PySpark",
    ],
  },
  {
    label: "Databases, Tools & DevOps",
    color: "#14c7cc",
    skills: [
      "GCP", "AWS", "Terraform", "PostgreSQL", "MongoDB", "Elasticsearch",
      "ChromaDB", "Pinecone", "Docker", "Kubernetes (GKE)", "Git", "CI/CD",
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const groupsRef = useRef([]);
  const [activeGroup, setActiveGroup] = useState(0);

  useEffect(() => {
    // Title entrance
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Groups pop in
    groupsRef.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Floating animation on skill pills after they're visible
    const pills = document.querySelectorAll(".skill-pill");
    pills.forEach((pill, i) => {
      gsap.to(pill, {
        y: -4,
        duration: 1.5 + (i % 5) * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: (i % 7) * 0.15,
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Animate skill pills when active group changes
  useEffect(() => {
    const pills = document.querySelectorAll(".skill-pill.active-group");
    gsap.fromTo(
      pills,
      { opacity: 0, scale: 0.8, y: 10 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 0.4, ease: "back.out(1.5)",
        stagger: 0.05,
      }
    );
  }, [activeGroup]);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-inner">

        <div ref={titleRef} className="skills-header">
          <span className="section-label">Technical Toolkit</span>
          <h2 className="skills-title">Technical Skills</h2>
        </div>

        <div className="skills-layout">

          {/* LEFT — group selector tabs */}
          <div className="skills-tabs">
            {skillGroups.map((group, i) => (
              <button
                key={i}
                ref={(el) => (groupsRef.current[i] = el)}
                className={`skills-tab ${activeGroup === i ? "active" : ""}`}
                onClick={() => setActiveGroup(i)}
                style={{ opacity: 0 }}
              >
                <span className="tab-dot" />
                <span className="tab-label">{group.label}</span>
                <span className="tab-count">{group.skills.length}</span>
              </button>
            ))}

            {/* Decorative vertical line */}
            <div className="skills-tab-line" />
          </div>

          {/* RIGHT — animated skill pills */}
          <div className="skills-display" data-spotlight>
            <div className="skills-group-label">
              {skillGroups[activeGroup].label}
            </div>

            <div className="skills-pills">
              {skillGroups[activeGroup].skills.map((skill, i) => (
                <span
                  key={skill}
                  className="skill-pill active-group"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Background number decoration */}
            <div className="skills-bg-num">
              {String(activeGroup + 1).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Bottom bar — all skills as a scrolling marquee */}
        <div className="skills-marquee-wrap">
          <div className="skills-marquee">
            {[...skillGroups.flatMap(g => g.skills), ...skillGroups.flatMap(g => g.skills)].map((skill, i) => (
              <span key={i} className="marquee-item">
                {skill} <span className="marquee-dot">·</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
