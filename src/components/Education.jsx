import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Education.css";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    step: "02",
    degree: "Master of Science in Computer Science",
    school: "Indiana University Bloomington",
    period: "Aug 2025 - May 2027",
    years: "2025 — 2027",
    location: "Bloomington, IN, USA",
    result: "4.0 / 4.0",
    resultLabel: "GPA",
    status: "In progress",
  },
  {
    step: "01",
    degree: "Bachelor of Engineering in Computer Engineering with Data Science Honours",
    school: "Savitribai Phule Pune University",
    period: "Jun 2021 - Jul 2025",
    years: "2021 — 2025",
    location: "Pune, MH, India",
    result: "8.75 / 10",
    resultLabel: "CGPA",
    status: "Completed",
  },
];

const Education = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);
  const nodesRef = useRef([]);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(".education-header > *", {
        opacity: 0,
        y: 45,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".education-header",
          start: "top 82%",
        },
      });

      gsap.fromTo(lineRef.current, {
        scaleX: 0,
      }, {
        scaleX: 1,
        duration: 1.4,
        ease: "power3.inOut",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: ".education-journey",
          start: "top 78%",
        },
      });

      gsap.fromTo(nodesRef.current, {
        scale: 0,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.55,
        stagger: 0.22,
        ease: "back.out(2.2)",
        scrollTrigger: {
          trigger: ".education-journey",
          start: "top 76%",
        },
      });

      gsap.fromTo(cardsRef.current, {
        opacity: 0,
        y: 70,
        rotateX: -7,
      }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.95,
        stagger: 0.18,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".education-cards",
          start: "top 82%",
        },
      });
    }, sectionRef);

    const cleanups = [];
    if (window.matchMedia("(hover: hover)").matches) {
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const onMove = (event) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const rotateY = ((x / rect.width) - 0.5) * 7;
          const rotateX = ((y / rect.height) - 0.5) * -7;

          card.style.setProperty("--spot-x", `${x}px`);
          card.style.setProperty("--spot-y", `${y}px`);
          gsap.to(card, {
            rotateX,
            rotateY,
            y: -8,
            duration: 0.35,
            ease: "power2.out",
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <section id="education" className="education-section" ref={sectionRef}>
      <div className="education-ambient education-ambient-one" />
      <div className="education-ambient education-ambient-two" />

      <div className="education-inner">
        <header className="education-header">
          <div>
            <span className="section-label">Academic Trajectory</span>
            <h2 className="education-title">Education</h2>
          </div>
          <div className="education-summary">
            <span className="education-summary-number">02</span>
            <p>
              Degrees spanning computer engineering,
              data science, and advanced computer science.
            </p>
          </div>
        </header>

        <div className="education-journey" aria-hidden="true">
          <span className="education-journey-label">2021</span>
          <div className="education-line">
            <span className="education-line-fill" ref={lineRef} />
            {education.slice().reverse().map((item, index) => (
              <span
                key={item.step}
                className="education-node"
                ref={(element) => { nodesRef.current[index] = element; }}
              >
                <span />
              </span>
            ))}
          </div>
          <span className="education-journey-label">2027</span>
        </div>

        <div className="education-cards">
          {education.map((item, index) => (
            <article
              className="education-card"
              key={item.degree}
              ref={(element) => { cardsRef.current[index] = element; }}
            >
              <div className="education-spotlight" />
              <div className="education-orbit" aria-hidden="true">
                <span />
                <span />
              </div>

              <div className="education-card-top">
                <span className="education-step">{item.step}</span>
                <span className="education-status">
                  <i />
                  {item.status}
                </span>
              </div>

              <div className="education-card-content">
                <p className="education-period">{item.period}</p>
                <h3>{item.degree}</h3>
                <p className="education-school">{item.school}</p>
              </div>

              <div className="education-card-bottom">
                <div className="education-location">
                  <span>Location</span>
                  <strong>{item.location}</strong>
                </div>
                <div className="education-score">
                  <span>{item.resultLabel}</span>
                  <strong>{item.result}</strong>
                </div>
              </div>

              <div className="education-years">{item.years}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
