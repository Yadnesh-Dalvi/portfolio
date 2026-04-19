import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEnvelope, FaLinkedin, FaGithub, FaPhone } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import "../styles/Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftRef = useRef(null);
  const formRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
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

    gsap.fromTo(
      leftRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 85%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    emailjs.send(
      "service_if8qczz",      // ← replace with your EmailJS Service ID
      "template_5dguo24",     // ← replace with your EmailJS Template ID
      {
        name: form.name,
        email: form.email,
        message: form.message,
        time: new Date().toLocaleString(),
      },
      "4pNjRUJt_geiBmHRL"       // ← replace with your EmailJS Public Key
    )
    .then(() => {
      setLoading(false);
      gsap.to(formRef.current, {
        scale: 0.98, duration: 0.1, yoyo: true, repeat: 1,
        onComplete: () => setSent(true),
      });
    })
    .catch((err) => {
      setLoading(false);
      setError("Something went wrong. Please try again.");
      console.error("EmailJS error:", err);
    });
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-inner">

        <div ref={titleRef} className="contact-header">
          <span className="section-label">Get In Touch</span>
          <h2 className="contact-title">Let's Build<br />Something Together</h2>
        </div>

        <div className="contact-grid">

          {/* LEFT — info */}
          <div ref={leftRef} className="contact-info" style={{ opacity: 0 }}>
            <p className="contact-desc">
              I'm currently open to new opportunities. Whether you have a project,
              a question, or just want to say hello — my inbox is always open.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="detail-label">Email</span>
                <a href="mailto:ydalvi@iu.edu" className="detail-value">ydalvi@iu.edu</a>
              </div>
              <div className="contact-detail-item">
                <span className="detail-label">Location</span>
                <span className="detail-value">Bloomington, IN</span>
              </div>
              <div className="contact-detail-item">
                <span className="detail-label">Status</span>
                <span className="detail-value available">
                  <span className="status-dot" /> Open to opportunities
                </span>
              </div>
            </div>

            <div className="contact-socials">
              <a href="mailto:ydalvi@iu.edu" className="social-icon-btn">
                <FaEnvelope />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-btn">
                <FaLinkedin />
              </a>
              <a href="https://github.com/Yadnesh-Dalvi" target="_blank" rel="noreferrer" className="social-icon-btn">
                <FaGithub />
              </a>
              <a href="tel:+1234567890" className="social-icon-btn">
                <FaPhone />
              </a>
            </div>
          </div>

          {/* RIGHT — form */}
          <div ref={formRef} className="contact-form-wrap" style={{ opacity: 0 }}>
            {sent ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>

                {error && (
                  <p style={{ color: "rgba(234,78,78,0.9)", fontSize: "13px", marginTop: "-8px" }}>
                    {error}
                  </p>
                )}

                <button type="submit" className="form-submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && <span className="submit-arrow">→</span>}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="contact-footer">
        <p>© 2025 Yadnesh Dalvi. Built with React & GSAP.</p>
        <p className="footer-quote">"Turning Caffeine to Code Since 2021"</p>
      </footer>
    </section>
  );
};

export default Contact;