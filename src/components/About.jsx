import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../styles/About.css"

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const textRef = useRef(null);

  useGSAP(() => {
    // Text reveal animation - line by line
    const lines = gsap.utils.toArray(".fade-line");
    
    lines.forEach((line) => {
      gsap.fromTo(
        line,
        {
          color: "rgba(255, 255, 255, 0.2)", // Grey/faded
        },
        {
          color: "rgba(255, 255, 255, 1)", // White
          scrollTrigger: {
            trigger: line,
            start: "top 75%",
            end: "top 40%",
            scrub: 1,
            markers: true
          },
        }
      );
    });

  }, []);

  return (
    <div className="about">
      <div className="about-text" ref={textRef}>
        <p className="fade-line">
          I am a Computer Science graduate student specializing in full-stack development with interests in artificial intelligence and data science.
        </p>
        <p className="fade-line">
          I have hands-on experience building interactive web applications and enjoy creating smooth user experiences using modern frameworks.
        </p>
        <p className="fade-line">
          I am motivated by solving complex problems and continuously improving my technical skill set.
        </p>
      </div>
    </div>
  );
};

export default About;