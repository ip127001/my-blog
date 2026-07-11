import Link from "next/link";
import utilStyles from "../styles/utils.module.css";

function scrollToSection(hash) {
  const el = document.getElementById(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `/#${hash}`);
  }
}

function handleSectionNav(e, hash) {
  if (window.location.pathname === "/") {
    e.preventDefault();
    scrollToSection(hash);
  }
}

export default function Layout({ children }) {
  return (
    <div className={utilStyles.siteWrap}>
      <nav className={utilStyles.navbar}>
        <Link href="/">
          <a className={utilStyles.logo}>rohit.dev</a>
        </Link>
        <div className={utilStyles.navLinks}>
          <Link href="/#resume" scroll={false}>
            <a onClick={(e) => handleSectionNav(e, "resume")}>Resume</a>
          </Link>
          <Link href="/#blogs" scroll={false}>
            <a onClick={(e) => handleSectionNav(e, "blogs")}>Blogs</a>
          </Link>
          <Link href="/#projects" scroll={false}>
            <a onClick={(e) => handleSectionNav(e, "projects")}>Projects</a>
          </Link>
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
