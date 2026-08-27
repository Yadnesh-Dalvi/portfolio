import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Education.css";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "Indiana University Bloomington",
    period: "Aug 2025 - May 2027",
    location: "Bloomington, IN, USA",
    result: "GPA: 4.0 / 4.0",
  },
  {
    degree: "Bachelor of Engineering in Computer Engineering with Data Science Honours",
    school: "Savitribai Phule Pune University",
    period: "Jun 2021 - Jul 2025",
    location: "Pune, MH, India",
    result: "CGPA: 8.75 / 10",
  },
];

const Education = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(".education-header", { opacity: 0, y: 50 }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".education-header", start: "top 82%" },
      });

      gsap.fromTo(cardsRef.current, { opacity: 0, y: 35 }, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".education-grid", start: "top 84%" },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section id="education" className="education-section" ref={sectionRef}>
      <div className="education-inner">
        <header className="education-header">
          <span className="section-label">Academic Foundation</span>
          <h2 className="education-title">Education</h2>
        </header>
        <div className="education-grid">
          {education.map((item, index) => (
            <article
              className="education-card"
              key={item.degree}
              ref={(element) => { cardsRef.current[index] = element; }}
            >
              <div>
                <p className="education-period">{item.period}</p>
                <h3>{item.degree}</h3>
                <p className="education-school">{item.school}</p>
              </div>
              <div className="education-meta">
                <span>{item.location}</span>
                <strong>{item.result}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
