import Head from "next/head";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import TextAnimate from "./textAnimate";
import FloatingCode from "../components/floatingCode";
import Resume from "../components/resume";

const SITE_URL = "https://geekrk.vercel.app";
const SITE_TITLE = "Rohit Kumawat (devrk) | Frontend Engineer Blog";
const SITE_DESCRIPTION =
  "Blogs on JavaScript, React and frontend interview preparation by Rohit Kumawat, SDE3 at Swiggy. Learn arrays, hoisting, var/let/const, React performance and more.";

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
    <div className={utilStyles.mainContainer}>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta
          name="keywords"
          content="javascript, react, frontend, web development, interview preparation, blog, Rohit Kumawat"
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

      <section className={`${utilStyles.headingMd} ${utilStyles.hero}`}>
        <FloatingCode />
        <div className={utilStyles.profile}>
          <Image
            priority
            src="https://ik.imagekit.io/15p9cgr0y/IMG20251226195040.jpg?tr=w-500,h-500,fo-face,z-0.35"
            className={utilStyles.borderCircle}
            height={250}
            width={250}
            objectFit="cover"
            alt="Rohit Kumawat Profile Pic"
          />
          <div className={utilStyles.socials}>
            <a
              target="_blank"
              rel="noopener"
              href="https://www.linkedin.com/in/rohit-kumawat-0088b7102/"
            >
              <img src="/images/linkedin.svg" alt="LinkedIn" />
            </a>
            <a target="_blank" rel="noopener" href="https://twitter.com/geekrk">
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
        <div className={utilStyles.introWrap}>
          <div
            className={`${utilStyles.intro} ${utilStyles.name} ${utilStyles.gradientName}`}
          >
            Hello 👋, I'm Rohit.
          </div>
          <div className={utilStyles.intro}>
            I am a Lead Software Engineer at Swiggy
          </div>
          <div className={utilStyles.tech}>
            <div className={utilStyles.techStack}> Tech Stack </div>
            <TextAnimate />
          </div>
        </div>
      </section>

      <Resume />

      <section className={`${utilStyles.blogSection}`}>
        <div className={utilStyles.blogHeader}>
          <h1 className={utilStyles.headingLg}>Recent Blogs:</h1>
        </div>
        <ul className={utilStyles.list}>
          <div className={utilStyles.projects}>
            {allPostsData.map(({ id, date, title }) => (
              <div className={utilStyles.project} key={id}>
                <Link href={`/posts/${id}`}>
                  <img
                    className={utilStyles.projectImg}
                    src={`/images/${id}.png`}
                    alt={title}
                  />
                </Link>
                <li className={utilStyles.listItem}>
                  <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                  </small>
                  <Link href={`/posts/${id}`}>
                    <a onClick={() => clickBlog(title)}>{title}</a>
                  </Link>
                </li>
              </div>
            ))}
          </div>
        </ul>
      </section>
      <section className={utilStyles.projectSection}>
        <h1>Projects:</h1>
        <div className={utilStyles.projects}>
          <div className={utilStyles.project}>
            <img src="/images/project.png" alt="Swiggy Spending Calculator" />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://chrome.google.com/webstore/detail/swiggy-spending-calculato/obaickalaaihhheaeoholimecdfeenid"
            >
              Swiggy Spending Calculator
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
