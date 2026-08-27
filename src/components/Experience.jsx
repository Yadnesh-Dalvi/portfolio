import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Experience.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "AI Engineer",
    company: "Project 990",
    period: "Jul 2026 - Present",
    location: "Remote",
    desc: [
      "Engineered scalable NLP feature-extraction pipelines in Python with RoBERTa and BART on HPC infrastructure for large volumes of IRS nonprofit records.",
      "Automated data labeling and validation with Mistral-7B, Gemini, and BERT-based models, accelerating NTEE rule generation and downstream dataset readiness.",
      "Fine-tuned and benchmarked BERT-Large, DeBERTa, and RoBERTa across iterative dataset and model releases.",
    ],
    tags: ["Python", "RoBERTa", "BART", "DeBERTa", "HPC"],
  },
  {
    role: "AI Full-Stack Software Engineering Intern",
    company: "CloudHire.ai",
    period: "May 2026 - Aug 2026",
    location: "Remote",
    desc: [
      "Developed a hybrid AI recommendation system using semantic retrieval, graph embeddings, and vector similarity search for personalized job matching.",
      "Architected RESTful microservices with FastAPI, PostgreSQL, MongoDB, and Elasticsearch for scalable ingestion and low-latency search.",
      "Prototyped and hardened graph learning models with PyTorch Geometric, LightGCN, and GraphSAGE while reviewing agent-generated code before release.",
    ],
    tags: ["FastAPI", "PyTorch Geometric", "PostgreSQL", "MongoDB", "Elasticsearch"],
  },
  {
    role: "Data Analyst and Machine Learning Intern",
    company: "IBM",
    period: "Jun 2024 - Aug 2024",
    location: "Remote",
    desc: [
      "Built Python data-preprocessing pipelines with Pandas and NumPy across 1,400+ employee records for predictive HR analytics.",
      "Optimized scikit-learn models to 92% prediction accuracy through feature engineering, cross-validation, and iterative tuning.",
      "Delivered exploratory analysis that informed decisions reducing employee attrition by nearly 30% across the organization.",
    ],
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "Data Analysis"],
  },
  {
    role: "Software Engineering Intern",
    company: "Bosch Limited",
    period: "Feb 2024 - Apr 2024",
    location: "India",
    desc: [
      "Implemented Django REST services with MySQL, reducing response latency by 32% for 200+ concurrent users on internal HR tools.",
      "Digitized certificate generation and approval workflows, cutting processing time by 80% company-wide.",
      "Improved reliability with unit tests, structured logging, and diagnostic monitoring, reducing production defects by 35% while sustaining 90% uptime.",
    ],
    tags: ["Python", "Django", "Django REST Framework", "MySQL", "Testing"],
  },
];

const Experience = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
      });

      itemsRef.current.forEach((element, index) => {
        gsap.fromTo(element, {
          opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20,
        }, {
          opacity: 1, x: 0, y: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%" },
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section id="experience" className="exp-section" ref={sectionRef}>
      <div className="exp-inner">
        <div ref={titleRef} className="exp-header">
          <span className="section-label">Professional Experience</span>
          <h2 className="exp-title">Experience</h2>
        </div>

        <div className="exp-timeline">
          <div className="timeline-line" />
          {experiences.map((experience, index) => (
            <article
              key={`${experience.company}-${experience.role}`}
              className="exp-item"
              ref={(element) => { itemsRef.current[index] = element; }}
            >
              <div className="exp-dot"><div className="exp-dot-inner" /></div>
              <div className="exp-card">
                <div className="exp-card-top">
                  <div>
                    <h3 className="exp-role">{experience.role}</h3>
                    <p className="exp-company">{experience.company}</p>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-period">{experience.period}</span>
                    <span className="exp-location">{experience.location}</span>
                  </div>
                </div>
                <ul className="exp-desc">
                  {experience.desc.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <div className="exp-tags">
                  {experience.tags.map((tag) => <span key={tag} className="exp-tag">{tag}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
