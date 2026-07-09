import Head from "next/head";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import TextAnimate from "./textAnimate";

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
        <title>devrk</title>
      </Head>

      <section>
        <div className={utilStyles.series}>
          <Link href={`/frontend-interview-guide`}>
            <a>Launching: Guide to prepare for Frontend Interviews</a>
          </Link>
        </div>
      </section>

      <section className={utilStyles.headingMd}>
        <div className={utilStyles.profile}>
          <Image
            priority
            src="/images/profile.jpg"
            className={utilStyles.borderCircle}
            height={250}
            width={250}
            alt="Rohit Kumawat Profile Pic"
          />
          <div className={utilStyles.socials}>
            <a
              target="_blank"
              rel="noopener"
              href="https://www.linkedin.com/in/rohit-kumawat-0088b7102/"
            >
              <img src="/images/linkedin.svg" />
            </a>
            <a target="_blank" rel="noopener" href="https://twitter.com/geekrk">
              <img src="/images/twitter.svg" />
            </a>
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/ip127001"
            >
              <img src="/images/github.svg" />
            </a>
          </div>
        </div>
        <div className={utilStyles.introWrap}>
          <div className={`${utilStyles.intro} ${utilStyles.name}`}>
            Hello 👋, I'm Rohit.
          </div>
          <div className={utilStyles.intro}>I am a SDE3 at Swiggy</div>
          <div className={utilStyles.tech}>
            <div className={utilStyles.techStack}> Tech Stack </div>
            <TextAnimate />
          </div>
        </div>
      </section>

      <section className={`${utilStyles.blogSection}`}>
        <div className={utilStyles.blogHeader}>
          <h1 className={utilStyles.headingLg}>Recent Blogs:</h1>
          {/* <span className={`${utilStyles.tag} ${utilStyles.yellow}`}>
            JavaScript
          </span>
          <span className={`${utilStyles.tag} ${utilStyles.blue}`}>React</span> */}
        </div>
        <ul className={utilStyles.list}>
          <div className={utilStyles.projects}>
            {allPostsData.map(({ id, date, title }) => (
              <div className={utilStyles.project} key={id}>
                <Link href={`/posts/${id}`}>
                  <img
                    className={utilStyles.projectImg}
                    src={`/images/${id}.png`}
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
            <img src="/images/project.png" />
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
