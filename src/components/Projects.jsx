import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Projects.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    num: "01",
    title: "FounderFlow.ai",
    category: "AI / Full-Stack",
    desc: "AI-powered startup launch co-pilot integrating Groq LLaMA 3.3-70B across 5 endpoints — covering idea audit, differentiation, roadmap generation, and legal compliance workflows with official government portal links.",
    tags: ["React.js", "FastAPI", "Groq", "LLaMA 3.3", "Prompt Engineering"],
    size: "large",
    year: "2026",
    // link: "#",
    // github: "#",
  },
  {
    id: 2,
    num: "02",
    title: "Medilyzer.ai",
    category: "Healthcare / AI",
    desc: "Full-stack healthcare AI platform processing medical PDFs with LLM-driven extraction, dynamic health scoring, Claude-powered chatbot, and ethical AI safeguards including citation grounding and hallucination control.",
    tags: ["React.js", "FastAPI", "Claude API", "PDF Processing"],
    size: "small",
    year: "2026",
    // link: "#",
    // github: "#",
  },
  {
    id: 3,
    num: "03",
    title: "ComedyIQ",
    category: "Real-Time / AI",
    desc: "Distributed multiplayer video system with WebRTC peer-to-peer communication, ELO-based matchmaking, and dual AI laugh detection combining FFT audio analysis and TensorFlow.js facial recognition at 30fps.",
    tags: ["MERN", "WebRTC", "Socket.io", "TensorFlow.js", "JWT"],
    size: "small",
    year: "2025",
    // link: "#",
    // github: "#",
  },
  {
    id: 4,
    num: "04",
    title: "ACampus.ai",
    category: "EdTech / AI",
    desc: "Personalized AI learning platform serving 100+ students with GPT-3.5 powered explanations, 500+ document summaries, and Agile-driven delivery that improved concept clarity by 35% and task-completion by 28%.",
    tags: ["React.js", "Node.js", "OpenAI GPT-3.5", "Agile"],
    size: "large",
    year: "2025",
    // link: "#",
    // github: "https://github.com/Yadnesh-Dalvi/Acampus.ai",
  },
  {
    id: 5,
    num: "05",
    title: "CLIP Evaluation",
    category: "Computer Vision / AI",
    desc: "Benchmarked pretrained CLIP models (ViT & CNN) on 5 visual conditions — silhouettes, blur, geons — computing Pearson correlations and p-values to compare vision-language model performance against human infant perception.",
    tags: ["Python", "CLIP", "PyTorch", "OpenCV", "Statistics"],
    size: "small",
    year: "2025",
    // link: "#",
    // github: "#",
  },
  {
    id: 6,
    num: "06",
    title: "Superstore BI Dashboard",
    category: "Data Science / BI",
    desc: "Dynamic Power BI dashboard analyzing 10K+ sales transactions with DAX-driven KPIs, revealing 47% YoY revenue growth, identifying loss-making product lines, and detecting a 49% return rate in the Central region.",
    tags: ["Power BI", "DAX", "Data Analytics", "Tableau"],
    size: "small",
    year: "2025",
    // link: "#",
    // github: "#",
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    // Title
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

    // Cards — staggered pop-in from below
    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section id="projects" className="proj-section" ref={sectionRef}>
      <div className="proj-inner">
        <div ref={titleRef} className="proj-header">
          <span className="section-label">Selected Work</span>
          <h2 className="proj-title">Projects</h2>
          <p className="proj-subtitle">Hover a card to flip it for details</p>
        </div>

        <div className="proj-bento">
          {projects.map((proj, i) => (
            <div
              key={proj.id}
              className={`proj-card-wrap ${proj.size}`}
              ref={(el) => (cardsRef.current[i] = el)}
              onClick={() => toggleFlip(proj.id)}
            >
              <div className={`proj-card-flipper ${flipped[proj.id] ? "flipped" : ""}`}>

                {/* FRONT */}
                <div className="proj-face proj-front">
                  <div className="proj-front-num">{proj.num}</div>
                  <div className="proj-front-content">
                    <span className="proj-category">{proj.category}</span>
                    <h3 className="proj-name">{proj.title}</h3>
                    <span className="proj-year">{proj.year}</span>
                  </div>
                  <div className="proj-front-hint">click to flip →</div>
                  <div className="proj-card-glow" />
                </div>

                {/* BACK */}
                <div className="proj-face proj-back">
                  <div className="proj-back-top">
                    <h3 className="proj-back-title">{proj.title}</h3>
                    <span className="proj-category">{proj.category}</span>
                  </div>
                  <p className="proj-back-desc">{proj.desc}</p>
                  <div className="proj-back-tags">
                    {proj.tags.map((t) => (
                      <span key={t} className="proj-tag">{t}</span>
                    ))}
                  </div>
                  <div className="proj-back-links">
                    <a href={proj.link} className="proj-link" onClick={(e) => e.stopPropagation()}>
                      Live ↗
                    </a>
                    <a href={proj.github} className="proj-link proj-link-ghost" onClick={(e) => e.stopPropagation()}>
                      GitHub
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
