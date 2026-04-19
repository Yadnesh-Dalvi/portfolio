import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Experience.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Full-Stack Developer Intern",
    company: "Bosch Limited",
    period: "Feb. 2024 – Apr. 2024",
    location: "India",
    desc: [
      "Delivered end-to-end modules for the Intern Management System using Django, REST APIs, and MySQL, improving backend latency by 32% while supporting operational workflows for 200+ interns.",
      "Automated certificate-generation pipelines using Django templates, eliminating manual HR steps, reducing processing effort by 90%, and accelerating approvals across 5 internal departments.",
      "Strengthened system reliability through structured unit tests, diagnostic logging, and error traceability, cutting critical defects by 35% and maintaining 99% uptime in production.",
    ],
    tags: ["Django", "REST APIs", "MySQL", "Python", "Unit Testing"],
  },
  {
    role: "Data Analyst Intern",
    company: "IBM",
    period: "Jun. 2023 – Aug. 2023",
    location: "Remote",
    desc: [
      "Analyzed 1,400+ employee records using Python (Pandas, NumPy) to identify key attrition drivers, surfacing insights that explained an 18% variance in turnover across multiple job categories.",
      "Built and optimized predictive ML models including Logistic Regression and Random Forest, achieving 98% classification accuracy and enabling HR teams to design targeted retention interventions.",
      "Translated model outputs into actionable workforce strategies that contributed to a 30% reduction in attrition, presenting findings to stakeholders through structured data visualizations and reports.",
    ],
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "Machine Learning", "Data Visualization"],
  },
];

const Experience = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    // ── Title: fade + slide up, reverses on scroll up ─────────────────
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // ── Cards: each card is its own trigger so scroll position drives
    //    the stagger naturally in BOTH directions ───────────────────────
    itemsRef.current.forEach((el, i) => {
      const fromX = i % 2 === 0 ? -60 : 60;

      gsap.fromTo(
        el,
        { opacity: 0, x: fromX, y: 20 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,        // each card triggers itself
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // ── Dots: pop in/out, each with its own trigger ───────────────────
    const dots = document.querySelectorAll(".exp-dot-inner");
    dots.forEach((dot) => {
      gsap.fromTo(
        dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,       // each dot triggers itself
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section id="experience" className="exp-section" ref={sectionRef}>
      <div className="exp-inner">
        <div ref={titleRef} className="exp-header">
          <span className="section-label">Work History</span>
          <h2 className="exp-title">Experience</h2>
        </div>

        <div className="exp-timeline">
          <div className="timeline-line" />

          {experiences.map((exp, i) => (
            <div
              key={i}
              className="exp-item"
              ref={(el) => (itemsRef.current[i] = el)}
            >
              <div className="exp-dot">
                <div className="exp-dot-inner" />
              </div>

              <div className="exp-card">
                <div className="exp-card-top">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-company">{exp.company}</p>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-period">{exp.period}</span>
                    <span className="exp-location">{exp.location}</span>
                  </div>
                </div>

                <ul className="exp-desc">
                  {exp.desc.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>

                <div className="exp-tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="exp-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;