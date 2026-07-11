import utilStyles from "../styles/utils.module.css";

export default function Layout({ children }) {
  return (
    <div className={utilStyles.siteWrap}>
      <nav className={utilStyles.navbar}>
        <a href="/" className={utilStyles.logo}>
          rohit.dev
        </a>
        <div className={utilStyles.navLinks}>
          <a href="/#resume">Resume</a>
          <a href="/#blogs">Blogs</a>
          <a href="/#projects">Projects</a>
        </div>
      </nav>
      {children}
      <footer className={utilStyles.footer}>
        <div className={utilStyles.footerInner}>
          <span className={utilStyles.footerLogo}>rohit.dev</span>
          <p className={utilStyles.footerTagline}>
            Lead Frontend Engineer · building for scale
          </p>
          <div className={utilStyles.footerLinks}>
            <a
              href="https://www.linkedin.com/in/rohit-kumawat-0088b7102/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ip127001"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/geekrk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
          <p className={utilStyles.footerCopy}>
            © {new Date().getFullYear()} Rohit Kumawat · Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}
