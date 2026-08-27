import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Projects.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    num: "01",
    title: "SecureMesh.ai",
    category: "Multi-Agent Risk Intelligence",
    desc: "A production-ready platform that unifies three investigation domains by orchestrating agents with ReAct, FastAPI, LangGraph, and MCPShield. It parallelizes transaction, entity-graph, policy, and threat-intelligence analysis and ships with a containerized API integrating PostgreSQL, Qdrant, Kubernetes, OpenTelemetry, and GitHub Actions.",
    tags: ["ReAct", "FastAPI", "LangGraph", "MCPShield", "Qdrant", "Kubernetes"],
    size: "large",
    year: "2026",
  },
  {
    id: 2,
    num: "02",
    title: "VectorMind.ai",
    category: "Production RAG & LLM Inference",
    desc: "A production RAG system combining hybrid retrieval, Reciprocal Rank Fusion, and cross-encoder reranking on ChromaDB. It includes RAGAS benchmarking and an asynchronous FastAPI service using Meta Llama 3.3 via Groq with prompt versioning and structured JSON outputs.",
    tags: ["RAG", "FastAPI", "ChromaDB", "RAGAS", "Llama 3.3", "Groq"],
    size: "small",
    year: "2026",
    period: "Mar 2026 - Apr 2026",
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
      });

      cardsRef.current.forEach((element) => {
        gsap.fromTo(element, { opacity: 0, y: 50, scale: 0.96 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%" },
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  const toggleFlip = (id) => setFlipped((current) => ({ ...current, [id]: !current[id] }));

  return (
    <section id="projects" className="proj-section" ref={sectionRef}>
      <div className="proj-inner">
        <div ref={titleRef} className="proj-header">
          <span className="section-label">Selected Work</span>
          <h2 className="proj-title">Projects</h2>
          <p className="proj-subtitle">Select a card to explore the implementation</p>
        </div>

        <div className="proj-bento">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`proj-card-wrap ${project.size}`}
              ref={(element) => { cardsRef.current[index] = element; }}
              onClick={() => toggleFlip(project.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  toggleFlip(project.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${project.title}`}
            >
              <div className={`proj-card-flipper ${flipped[project.id] ? "flipped" : ""}`}>
                <div className="proj-face proj-front">
                  <div className="proj-front-num">{project.num}</div>
                  <div className="proj-front-content">
                    <span className="proj-category">{project.category}</span>
                    <h3 className="proj-name">{project.title}</h3>
                    <span className="proj-year">{project.period || project.year}</span>
                  </div>
                  <div className="proj-front-hint">select for details →</div>
                  <div className="proj-card-glow" />
                </div>

                <div className="proj-face proj-back">
                  <div className="proj-back-top">
                    <h3 className="proj-back-title">{project.title}</h3>
                    <span className="proj-category">{project.category}</span>
                  </div>
                  <p className="proj-back-desc">{project.desc}</p>
                  <div className="proj-back-tags">
                    {project.tags.map((tag) => <span key={tag} className="proj-tag">{tag}</span>)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
