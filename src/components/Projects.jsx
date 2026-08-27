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
  {
    id: 3,
    num: "03",
    title: "FounderFlow.ai",
    category: "AI / Full-Stack",
    desc: "An AI-powered startup launch co-pilot integrating Groq LLaMA 3.3-70B across five endpoints for idea auditing, differentiation, roadmap generation, and legal compliance workflows with official government portal links.",
    tags: ["React.js", "FastAPI", "Groq", "LLaMA 3.3", "Prompt Engineering"],
    size: "large",
    year: "2026",
  },
  {
    id: 4,
    num: "04",
    title: "Medilyzer.ai",
    category: "Healthcare / AI",
    desc: "A full-stack healthcare AI platform that processes medical PDFs with LLM-driven extraction, dynamic health scoring, a Claude-powered chatbot, citation grounding, and hallucination controls.",
    tags: ["React.js", "FastAPI", "Claude API", "PDF Processing"],
    size: "small",
    year: "2026",
  },
  {
    id: 5,
    num: "05",
    title: "ComedyIQ",
    category: "Real-Time / AI",
    desc: "A distributed multiplayer video system with WebRTC peer-to-peer communication, ELO-based matchmaking, and dual AI laugh detection using FFT audio analysis and TensorFlow.js facial recognition at 30 fps.",
    tags: ["MERN", "WebRTC", "Socket.io", "TensorFlow.js", "JWT"],
    size: "small",
    year: "2025",
  },
  {
    id: 6,
    num: "06",
    title: "ACampus.ai",
    category: "EdTech / AI",
    desc: "A personalized AI learning platform serving 100+ students with GPT-3.5 explanations, 500+ document summaries, and Agile-driven delivery that improved concept clarity by 35% and task completion by 28%.",
    tags: ["React.js", "Node.js", "OpenAI GPT-3.5", "Agile"],
    size: "large",
    year: "2025",
  },
  {
    id: 7,
    num: "07",
    title: "CLIP Evaluation",
    category: "Computer Vision / AI",
    desc: "A benchmark of pretrained CLIP models using ViT and CNN architectures across silhouettes, blur, and geon-based visual conditions, with Pearson correlations and p-values comparing model performance against human infant perception.",
    tags: ["Python", "CLIP", "PyTorch", "OpenCV", "Statistics"],
    size: "small",
    year: "2025",
  },
  {
    id: 8,
    num: "08",
    title: "Superstore BI Dashboard",
    category: "Data Science / BI",
    desc: "A dynamic Power BI dashboard analyzing 10,000+ sales transactions with DAX-driven KPIs, revealing 47% year-over-year revenue growth, loss-making product lines, and a 49% return rate in the Central region.",
    tags: ["Power BI", "DAX", "Data Analytics", "Tableau"],
    size: "large",
    year: "2025",
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
                <div className="proj-face proj-front" data-spotlight>
                  <div className="proj-front-num">{project.num}</div>
                  <div className="proj-front-content">
                    <span className="proj-category">{project.category}</span>
                    <h3 className="proj-name">{project.title}</h3>
                    <span className="proj-year">{project.period || project.year}</span>
                  </div>
                  <div className="proj-front-hint">select for details →</div>
                  <div className="proj-card-glow" />
                </div>

                <div className="proj-face proj-back" data-spotlight>
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
