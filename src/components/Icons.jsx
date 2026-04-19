import { FaEnvelope, FaLinkedin, FaGithub, FaPhone } from "react-icons/fa";
import "../styles/Icons.css";

const Icons = () => {
  return (
    <div className="social-container">
      <a href="mailto:youremail@email.com" className="social-icon">
        <FaEnvelope />
      </a>

      <a href="https://linkedin.com" target="_blank" className="social-icon">
        <FaLinkedin />
      </a>

      <a href="https://github.com" target="_blank" className="social-icon">
        <FaGithub />
      </a>

      <a href="tel:+1234567890" className="social-icon">
        <FaPhone />
      </a>
    </div>
  );
};

export default Icons;
