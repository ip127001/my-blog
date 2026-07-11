import Head from "next/head";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import TextAnimate from "./textAnimate";
import FloatingCode from "../components/floatingCode";
import Resume from "../components/resume";
import Layout from "../components/layout";

const SITE_URL = "https://geekrk.vercel.app";
const SITE_TITLE = "Rohit Kumawat | Lead Frontend Engineer";
const SITE_DESCRIPTION =
  "Portfolio and blog of Rohit Kumawat — Lead Software Engineer at Swiggy. Writing on JavaScript, React, performance, and frontend interviews.";

const STATS = [
  { value: "7+", label: "Years building" },
  { value: "10M+", label: "Users impacted" },
  { value: "10K+", label: "Extension downloads" },
];

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  function clickBlog(title) {
    window.gtag("event", "blog_clicked", {
      event_category: "tech",
      event_label: "link tracking",
      value: title,
    });
  }

  return (
    <Layout>
      <div className={utilStyles.mainContainer}>
        <Head>
          <title>{SITE_TITLE}</title>
          <meta name="description" content={SITE_DESCRIPTION} />
          <meta
            name="keywords"
            content="javascript, react, frontend, lead engineer, swiggy, interview preparation, blog, Rohit Kumawat"
          />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={`${SITE_URL}/`} />
          <meta property="og:title" content={SITE_TITLE} />
          <meta property="og:description" content={SITE_DESCRIPTION} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${SITE_URL}/`} />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dst3jqdwc/image/upload/v1656324684/logo_jwdqxb.png"
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@geekrk" />
          <meta name="twitter:title" content={SITE_TITLE} />
          <meta name="twitter:description" content={SITE_DESCRIPTION} />
        </Head>

        <section className={utilStyles.hero}>
          <FloatingCode />
          <div className={utilStyles.heroGrid}>
            <div className={utilStyles.heroContent}>
              <span className={utilStyles.badge}>
                <span className={utilStyles.badgeDot} />
                Lead Frontend Engineer @ Swiggy
              </span>
              <h1 className={utilStyles.heroTitle}>
                Rohit <span className={utilStyles.gradientName}>Kumawat</span>
              </h1>
              <p className={utilStyles.heroSubtitle}>
                I lead frontend teams shipping products used by tens of millions
                — from zero-to-one launches to infra migrations that cut costs
                by 70%.
              </p>
              <div className={utilStyles.tech}>
                <span className={utilStyles.techStack}>Stack</span>
                <TextAnimate />
              </div>
              <div className={utilStyles.statsRow}>
                {STATS.map((stat) => (
                  <div key={stat.label} className={utilStyles.stat}>
                    <span className={utilStyles.statValue}>{stat.value}</span>
                    <span className={utilStyles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={utilStyles.heroVisual}>
              <div className={utilStyles.avatarRing}>
                <Image
                  priority
                  src="https://ik.imagekit.io/15p9cgr0y/IMG20251226195040.jpg?tr=w-500,h-500,fo-face,z-0.35"
                  className={utilStyles.borderCircle}
                  height={280}
                  width={280}
                  objectFit="cover"
                  alt="Rohit Kumawat"
                />
              </div>
              <div className={utilStyles.socials}>
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://www.linkedin.com/in/rohit-kumawat-0088b7102/"
                >
                  <img src="/images/linkedin.svg" alt="LinkedIn" />
                </a>
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://twitter.com/geekrk"
                >
                  <img src="/images/twitter.svg" alt="Twitter" />
                </a>
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://github.com/ip127001"
                >
                  <img src="/images/github.svg" alt="GitHub" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Resume />

        <section id="blogs" className={utilStyles.blogSection}>
          <div className={utilStyles.sectionHeader}>
            <span className={utilStyles.sectionLabel}>// 02 · writing</span>
            <h2 className={utilStyles.headingLg}>Recent Blogs</h2>
            <p className={utilStyles.sectionDesc}>
              Deep dives on JavaScript, React, and frontend interviews.
            </p>
          </div>
          <ul className={utilStyles.list}>
            <div className={utilStyles.blogGrid}>
              {allPostsData.map(({ id, date, title }) => (
                <article className={utilStyles.blogCard} key={id}>
                  <Link href={`/posts/${id}`}>
                    <a
                      className={utilStyles.blogCardLink}
                      onClick={() => clickBlog(title)}
                    >
                      <img
                        className={utilStyles.blogCardImg}
                        src={`/images/${id}.png`}
                        alt={title}
                      />
                      <div className={utilStyles.blogCardBody}>
                        <time className={utilStyles.blogDate}>
                          <Date dateString={date} />
                        </time>
                        <h3 className={utilStyles.blogCardTitle}>{title}</h3>
                        <span className={utilStyles.readMore}>
                          Read article →
                        </span>
                      </div>
                    </a>
                  </Link>
                </article>
              ))}
            </div>
          </ul>
        </section>

        <section id="projects" className={utilStyles.projectSection}>
          <div className={utilStyles.sectionHeader}>
            <span className={utilStyles.sectionLabel}>// 03 · building</span>
            <h2 className={utilStyles.headingLg}>Projects</h2>
          </div>
          <div className={utilStyles.featureCard}>
            <img
              src="/images/project.png"
              alt="Swiggy Spending Calculator"
              className={utilStyles.featureImg}
            />
            <div className={utilStyles.featureBody}>
              <h3 className={utilStyles.featureTitle}>
                Swiggy Spending Calculator
              </h3>
              <p className={utilStyles.featureDesc}>
                Chrome extension that analyses your Swiggy order history —
                total spend, yearly breakdowns, and top dishes. 10,000+
                downloads with a 5-star rating.
              </p>
              <a
                className={utilStyles.featureBtn}
                target="_blank"
                rel="noopener noreferrer"
                href="https://chrome.google.com/webstore/detail/swiggy-spending-calculato/obaickalaaihhheaeoholimecdfeenid"
              >
                View on Chrome Store →
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
