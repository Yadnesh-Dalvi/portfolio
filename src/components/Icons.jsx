import { FaEnvelope, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import "../styles/Icons.css";

const links = [
  { href: "mailto:ydalvi@iu.edu", label: "Email Yadnesh", icon: <FaEnvelope /> },
  {
    href: "https://www.linkedin.com/in/yadnesh-dalvi",
    label: "Yadnesh on LinkedIn",
    icon: <FaLinkedin />,
  },
  {
    href: "https://github.com/Yadnesh-Dalvi",
    label: "Yadnesh on GitHub",
    icon: <FaGithub />,
  },
  {
    href: "https://yadnesh-dalvi.github.io/portfolio/",
    label: "Portfolio website",
    icon: <FaGlobe />,
  },
];

const Icons = () => (
  <div className="social-container">
    {links.map(({ href, label, icon }) => (
      <a
        key={label}
        href={href}
        aria-label={label}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="social-icon link"
      >
        {icon}
      </a>
    ))}
  </div>
);

export default Icons;
