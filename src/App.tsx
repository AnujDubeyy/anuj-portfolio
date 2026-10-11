import { useState, useEffect, useRef, type ReactNode } from "react";

const projects = [
  {
    number: "01",
    title: "ProjectPulse",
    year: "2026",
    stack: "JavaScript, Prisma, RAG",
    description:
      "Developing an end-to-end Agile project management platform for projects and sprints, with role-based access for PMO, consultant, and user roles. Supports detailed project information, project reports, and sprint report exports. Automatically generates sprints from project start and end dates, removing manual sprint planning. Building RAG-based report generation with Prisma as the database layer.",
    kind: "projectpulse",
    comingSoon: true,
    liveUrl: "",
    githubUrl: "",
  },
  {
    number: "03",
    title: "Cybrion Consulting",
    year: "2025",
    stack: "React.js, Vite, JavaScript, CSS, EmailJS",
    description:
      "Designed and developed an advisory website end-to-end for a cybersecurity consulting firm, from Figma UI design through production deployment on Vercel. Translated Figma designs into responsive React components with custom CSS, integrated EmailJS for direct client inquiries, and managed the complete project lifecycle independently.",
    kind: "cybrion",
    liveUrl: "https://cybrionconsulting.com/",
    githubUrl: "https://github.com/AnujDubeyy/bluecheck-v2",
  },
  {
    number: "04",
    title: "To-Do List",
    year: "2025",
    stack: "Figma, Browser Storage",
    description:
      "A clean browser-based task manager designed for simple task creation, organization, and persistence, including in-browser note storage. Designed the complete frontend in Figma and translated it into a working application with a dark-themed glassmorphism interface and browser storage persistence.",
    kind: "todo",
    liveUrl: "https://to-do-list-gobi-manchurian.vercel.app/",
    githubUrl: "https://github.com/AnujDubeyy",
  },
];

const skills = [
  ["Languages", "Python, C, JavaScript, HTML/CSS"],
  ["Databases", "MySQL, MongoDB"],
  ["Frameworks", "React, Node.js, FastAPI, Flask, WordPress"],
  [
    "Developer Tools",
    "Git, Ollama, Google Colab, VS Code, PyCharm, IntelliJ, Docker",
  ],
  ["Other Tools", "Figma, Affinity, n8n"],
  ["Methodologies", "Agile, Problem Solving"],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SectionNumber({ children }: { children: ReactNode }) {
  return <span className="section-number">{children}.</span>;
}

function ProjectPreview({ kind, isHovered }: { kind: string; isHovered: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  let videoSrc = "";
  let imgSrc = "/assets/cleanupcrew_shot.png";
  let altText = "";
  let isComingSoon = false;

  if (kind === "projectpulse") {
    imgSrc = "/assets/cleanupcrew_shot.png";
    altText = "ProjectPulse RAG AI Workspace";
    isComingSoon = true;
  } else if (kind === "todo") {
    videoSrc = "/assets/todo_video.mp4";
    imgSrc = "/assets/todo_shot.png";
    altText = "To-Do List App";
  } else if (kind === "cybrion") {
    videoSrc = "/assets/cybrion_video.mp4";
    imgSrc = "/assets/cybrion_shot.png";
    altText = "Cybrion Consulting";
  }

  useEffect(() => {
    if (!videoRef.current || !videoSrc) return;
    if (isHovered) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
    } else {
      videoRef.current.pause();
    }
  }, [isHovered, videoSrc]);

  const showVideo = isHovered && videoSrc;

  return (
    <div className="project-preview-card">
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted
          playsInline
          className="preview-img"
          title={altText}
          preload="auto"
          style={{ display: showVideo ? "block" : "none" }}
        />
      )}
      {!showVideo && (
        <img
          src={imgSrc}
          alt={altText}
          className={`preview-img ${isComingSoon ? "preview-blurred" : ""}`}
        />
      )}
      {isComingSoon && (
        <div className="simple-coming-soon-overlay">
          <span>COMING SOON</span>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="card-number">{project.number}</span>
      <ProjectPreview kind={project.kind} isHovered={isHovered} />
      <div className="project-title-row">
        <h3>{project.title}</h3>
        <span>{project.year}</span>
      </div>
      <p className="stack">{project.stack}</p>
      <p>{project.description}</p>
      <div className="project-links">
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            Live <Arrow />
          </a>
        ) : (
          <span>Coming Soon ✣</span>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
        )}
      </div>
    </article>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Hover tracking for interactive inverted theme animation
  const [isEduHovered, setIsEduHovered] = useState(false);
  const [eduRipple, setEduRipple] = useState<{
    x: number;
    y: number;
    isDark: boolean;
    key: number;
  } | null>(null);

  // Skills hover theme state
  const [isSkillsHovered, setIsSkillsHovered] = useState(false);
  const [skillsRipple, setSkillsRipple] = useState<{
    x: number;
    y: number;
    isDark: boolean;
    key: number;
  } | null>(null);

  // Certifications hover theme state
  const [isCertHovered, setIsCertHovered] = useState(false);
  const [certRipple, setCertRipple] = useState<{
    x: number;
    y: number;
    isDark: boolean;
    key: number;
  } | null>(null);

  // In dark mode: base theme is dark, hovering inverts to light
  // In light mode: base theme is light, hovering inverts to dark
  const eduIsDark = isDarkMode ? !isEduHovered : isEduHovered;
  const skillsIsDark = isDarkMode ? !isSkillsHovered : isSkillsHovered;
  const certIsDark = isDarkMode ? !isCertHovered : isCertHovered;

  const handleEduMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setActiveSection("education");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const targetIsDark = !isDarkMode;
    setEduRipple({ x, y, isDark: targetIsDark, key: Date.now() });
    setIsEduHovered(true);
  };

  const handleEduMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const targetIsDark = isDarkMode;
    setEduRipple({ x, y, isDark: targetIsDark, key: Date.now() });
    setIsEduHovered(false);
  };

  const handleSkillsMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setActiveSection("skills");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const targetIsDark = !isDarkMode;
    setSkillsRipple({ x, y, isDark: targetIsDark, key: Date.now() });
    setIsSkillsHovered(true);
  };

  const handleSkillsMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const targetIsDark = isDarkMode;
    setSkillsRipple({ x, y, isDark: targetIsDark, key: Date.now() });
    setIsSkillsHovered(false);
  };

  const handleCertMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setActiveSection("certifications");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const targetIsDark = !isDarkMode;
    setCertRipple({ x, y, isDark: targetIsDark, key: Date.now() });
    setIsCertHovered(true);
  };

  const handleCertMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const targetIsDark = isDarkMode;
    setCertRipple({ x, y, isDark: targetIsDark, key: Date.now() });
    setIsCertHovered(false);
  };

  // Reset ripples and hover states cleanly when toggling global theme
  useEffect(() => {
    setIsEduHovered(false);
    setEduRipple(null);
    setIsSkillsHovered(false);
    setSkillsRipple(null);
    setIsCertHovered(false);
    setCertRipple(null);
  }, [isDarkMode]);

  useEffect(() => {
    const sections = ["home", "about", "projects", "education", "skills", "certifications", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDarkMode((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <main>
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand-orbit" href="#home" aria-label="Home" onClick={closeMobileMenu}>
          <img src="/assets/earthspin.gif" alt="" />
        </a>
        <div className="nav-links desktop-nav">
          <a href="#home" className={activeSection === "home" ? "nav-active" : ""}>Home</a>
          <a href="#about" className={activeSection === "about" ? "nav-active" : ""}>About</a>
          <a href="#projects" className={activeSection === "projects" ? "nav-active" : ""}>Projects</a>
          <a href="#education" className={activeSection === "education" ? "nav-active" : ""}>Education</a>
          <a href="#skills" className={activeSection === "skills" ? "nav-active" : ""}>Skills</a>
          <a href="#certifications" className={activeSection === "certifications" ? "nav-active" : ""}>Certifications</a>
          <a href="#contact" className={activeSection === "contact" ? "nav-active" : ""}>Contact</a>
        </div>
        <div className="topbar-actions">
          <a
            className="availability"
            href="#darkmode"
            onClick={toggleDarkMode}
            title="Toggle Dark / Light Mode"
            role="button"
          >
            // ANUJ.DUBEY( )
          </a>
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span>MENU</span>
              <button onClick={closeMobileMenu} aria-label="Close menu">✕</button>
            </div>
            <nav className="mobile-menu-links">
              <a href="#home" onClick={closeMobileMenu}>00 // HOME</a>
              <a href="#about" onClick={closeMobileMenu}>01 // ABOUT</a>
              <a href="#projects" onClick={closeMobileMenu}>02 // PROJECTS</a>
              <a href="#education" onClick={closeMobileMenu}>03 // EDUCATION</a>
              <a href="#skills" onClick={closeMobileMenu}>04 // SKILLS</a>
              <a href="#certifications" onClick={closeMobileMenu}>05 // CERTIFICATIONS</a>
              <a href="#contact" onClick={closeMobileMenu}>06 // CONTACT</a>
              <a
                href="/assets/Anuj_Dubey_Resume.pdf"
                download="Anuj_Dubey_Resume.pdf"
                onClick={closeMobileMenu}
                className="mobile-resume-btn"
              >
                RESUME ↗
              </a>
            </nav>
          </div>
        </div>
      )}

      <section className="hero page-section" id="home" onMouseEnter={() => setActiveSection("home")}>
        <div className="hero-copy">
          <div className="hero-title">
            <img src="/assets/Hello People, Anuj Here.png" alt="Hello PEOPLE ANUJ HERE" className="hero-title-img" />
          </div>
          <p className="intro">
            I’m a full-stack developer based in Mumbai who can design, build, and ship products, with growing expertise in AI/ML.
          </p>
          <div className="social-row">
            <a
              href="https://linkedin.com/in/anuj-dubey"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <Arrow />
            </a>
            <a
              href="https://github.com/AnujDubeyy"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <Arrow />
            </a>
            <a
              href="https://behance.net/anujdubey9"
              target="_blank"
              rel="noreferrer"
            >
              Behance <Arrow />
            </a>

            <a
              href="/assets/Anuj_Dubey_Resume.pdf"
              download="Anuj_Dubey_Resume.pdf"
            >
              Resume <Arrow />
            </a>
          </div>
        </div>

        <div className="hero-portrait">
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />
          <img
            src="/assets/anuj-halftone.jpeg"
            alt="Halftone portrait of Anuj Dubey"
          />
          <div className="portrait-sticker">
            In LARPest days,
            <br />
            In NICHest Night,
            <br />
            No media escapes my sight.
            <br />

            Beware the larper’s might!
          </div>
        </div>

        <aside className="hero-aside">
          <strong>MUMBAI</strong>
          <div className="wire-globe" aria-hidden="true">
            <span />
          </div>
          <p>
            CODING
            <br />
            UNTIL
            <br />
            TOKENS
            <br />
            RESIST
          </p>
          <a
            className="stamp"
            href="https://open.spotify.com/album/4LH4d3cOWNNsVw41Gqt2kv"
            target="_blank"
            rel="noopener noreferrer"
            title="The Dark Side of the Moon - Pink Floyd"
            aria-label="Listen to The Dark Side of the Moon on Spotify"
          >
            <img src="/assets/darksideofthemoon.png" alt="Dark Side of the Moon - Pink Floyd" />
          </a>
          <p>
            EST.
            <br />
            2005
          </p>
        </aside>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>I USE LINUX BTW</span>
          <b>+</b>
          <span>A FREE THINKER MADE TO RAGEBAIT TWO POLAR OPPOSITE GROUPS ON THE INTERNET</span>
          <b>+</b>
          <span>I USE LINUX BTW</span>
          <b>+</b>
          <span>A FREE THINKER MADE TO RAGEBAIT TWO POLAR OPPOSITE GROUPS ON THE INTERNET</span>
          <b>+</b>
          <span>I USE LINUX BTW</span>
          <b>+</b>
          <span>A FREE THINKER MADE TO RAGEBAIT TWO POLAR OPPOSITE GROUPS ON THE INTERNET</span>
          <b>+</b>
          <span>I USE LINUX BTW</span>
          <b>+</b>
          <span>A FREE THINKER MADE TO RAGEBAIT TWO POLAR OPPOSITE GROUPS ON THE INTERNET</span>
          <b>+</b>
        </div>
      </div>

      <section className="about page-section" id="about" onMouseEnter={() => setActiveSection("about")}>
        <div className="section-heading about-heading">
          <SectionNumber>01</SectionNumber>
          <div className="heading-highlight highlight-cyan">
            <h2>
              ABOUT ME
            </h2>
          </div>
        </div>
        <div className="about-copy">
          <p>
            I’m Anuj Dubey, a 3rd-year Information Technology student at SIES
            Graduate School of Technology, Mumbai. I’m a full-stack developer who enjoys
            designing, building and shipping Projects — from web applications to
            AI-powered tools.
          </p>
          <p>
            I’m curious about technology, design, automation, and how things work under the
            hood. I’m constantly exploring new ideas, experimenting with new technologies, and
            turning what I learn into things I can actually build.
          </p>
        </div>
        <div className="about-eye">
          <p>

            <br />

            <br />

            <br />
          </p>
        </div>
      </section>

      <section className="projects page-section" id="projects" onMouseEnter={() => setActiveSection("projects")}>
        <div className="projects-heading">
          <div className="section-heading">
            <SectionNumber>02</SectionNumber>
            <div className="heading-highlight">
              <h2>PROJECTS</h2>
            </div>
            <p className="pink-tape">THINGS I’VE BUILT</p>
          </div>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </div>
      </section>

      <div className="split-row">
        <section
          className={`education page-section ${eduIsDark ? "section-dark-theme" : "section-light-theme"}`}
          id="education"
          onMouseEnter={handleEduMouseEnter}
          onMouseLeave={handleEduMouseLeave}
        >
          {eduRipple && (
            <div
              key={eduRipple.key}
              className={`radial-ripple-overlay ${
                eduRipple.isDark ? "ripple-dark" : "ripple-light"
              }`}
              style={
                {
                  "--ripple-x": `${eduRipple.x}px`,
                  "--ripple-y": `${eduRipple.y}px`,
                } as React.CSSProperties
              }
            />
          )}
          <div className="section-heading inline-heading">
            <div>
              <SectionNumber>03</SectionNumber>
              <h2 className="blue-swipe">EDUCATION</h2>
            </div>
            <span className="plus-box">+</span>
          </div>
          <div className="education-layout">
            <div className="book-stack" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="education-list">
              <article>
                <h3>
                  SIES Graduate School
                  <br />
                  Of Technology, Mumbai
                </h3>
                <p>Bachelor of Information Technology</p>
                <p>CGPA — 8.59</p>
                <p>July 2024 – July 2028</p>
              </article>
              <article>
                <h3>
                  Ryan International School,
                  <br />
                  Mumbai
                </h3>
                <p>Secondary (89.9%)</p>
                <p>Higher Secondary (74.8%)</p>
                <p>July 2022 – May 2024</p>
              </article>
              <span className="pink-note">
                FORMAL EDUCATION
                <br />
                TYPE SHIT
              </span>
            </div>
          </div>
        </section>

        <section
          className={`skills page-section ${skillsIsDark ? "section-dark-theme" : "section-light-theme"}`}
          id="skills"
          onMouseEnter={handleSkillsMouseEnter}
          onMouseLeave={handleSkillsMouseLeave}
        >
          {skillsRipple && (
            <div
              key={skillsRipple.key}
              className={`radial-ripple-overlay ${
                skillsRipple.isDark ? "ripple-dark" : "ripple-light"
              }`}
              style={
                {
                  "--ripple-x": `${skillsRipple.x}px`,
                  "--ripple-y": `${skillsRipple.y}px`,
                } as React.CSSProperties
              }
            />
          )}
          <div className="section-heading inline-heading">
            <div>
              <SectionNumber>04</SectionNumber>
              <div className="heading-highlight highlight-pink">
                <h2>SKILLS</h2>
              </div>
            </div>
            <span className="plus-box">+</span>
          </div>
          <dl>
            {skills.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="skills-stamp">

            <strong>
              TOOLS
              <br />
              I USE
            </strong>
          </div>
        </section>
      </div>

      <section
        className={`certifications page-section ${certIsDark ? "section-dark-theme" : "section-light-theme"}`}
        id="certifications"
        onMouseEnter={handleCertMouseEnter}
        onMouseLeave={handleCertMouseLeave}
      >
        {certRipple && (
          <div
            key={certRipple.key}
            className={`radial-ripple-overlay ${
              certRipple.isDark ? "ripple-dark" : "ripple-light"
            }`}
            style={
              {
                "--ripple-x": `${certRipple.x}px`,
                "--ripple-y": `${certRipple.y}px`,
              } as React.CSSProperties
            }
          />
        )}
        <div className="section-heading inline-heading">
          <div>
            <SectionNumber>05</SectionNumber>
            <div className="heading-highlight highlight-purple">
              <h2>CERTIFICATIONS</h2>
            </div>
          </div>
          <span className="plus-box">+</span>
        </div>
        <div className="cert-content">
          <article className="certificate">
            <span>◎ DeepLearning.AI</span>
            <h3>
              Supervised Machine Learning:
              <br />
              Regression and Classification
            </h3>
            <p>Coursera, DeepLearning.AI &nbsp; | &nbsp; 2025</p>
            <p>
              · Completed Andrew Ng’s foundational ML course covering supervised
              learning, linear and logistic regression, and classification
              algorithms.
            </p>
            <a href="#contact" aria-label="View certification">
              ↗
            </a>
          </article>
          <div className="planet-orbit" aria-hidden="true">
            <div className="orbit-line" />
            <img src="/assets/earthspin.gif" alt="" />
            <b>×</b>
          </div>
        </div>
      </section>

      <footer id="contact" onMouseEnter={() => setActiveSection("contact")}>
        <div className="footer-main">
          <h2>
            LET’S
            <br />
            BUILD
            <br />
            SOMETHING
            <br />
            <span>COOL.</span>
          </h2>
          <a className="contact-card" href="mailto:i.anujdubey@gmail.com">
            <span>i.anujdubey@gmail.com</span>
            <span>Mumbai, India</span>
            <b>↗</b>
          </a>
          <div className="footer-portrait">
            <img src="/assets/anuj-halftone.jpeg" alt="Anuj Dubey" />
          </div>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
            <div className="footer-socials">
              <a
                href="https://linkedin.com/in/anuj-dubey"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                in
              </a>
              <a
                href="https://github.com/AnujDubeyy"
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
              >
                gh
              </a>
              <a
                href="https://behance.net/anujdubey9"
                aria-label="Behance"
                target="_blank"
                rel="noreferrer"
              >
                be
              </a>
              <a
                href="mailto:i.anujdubey@gmail.com"
                aria-label="Email"
              >
                @
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Anuj Dubey. All rights reserved.</span>
          <span>I USE LINUX BTW</span>
        </div>
      </footer>
    </main>
  );
}