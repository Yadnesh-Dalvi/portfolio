import { FaEnvelope, FaLinkedin, FaGithub, FaPhone } from "react-icons/fa";
import "../styles/Icons.css";

const Icons = () => {
  return (
    <div className="social-container">
      <a href="mailto:yadalvi@email.com" className="social-icon">
        <FaEnvelope />
      </a>

      <a href="www.linkedin.com/in/yadnesh-dalvi" target="_blank" className="social-icon">
        <FaLinkedin />
      </a>

      <a href="https://github.com/Yadnesh-Dalvi" target="_blank" className="social-icon">
        <FaGithub />
      </a>

      <a href="tel:+9309046495" className="social-icon">
        <FaPhone />
      </a>
    </div>
  );
};

export default Icons;
