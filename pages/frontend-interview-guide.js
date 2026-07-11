import Image from "next/image";
import seriesStyles from "../styles/series.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";

export default function Post() {
  return (
    <Layout>
      <div className={seriesStyles.interviewSeriesHeader}>
        <Head>
          <title>Frontend Interview Guide</title>
        </Head>
        <Link href="/">
          <a className={utilStyles.backToHome}>&larr; Back to Home</a>
        </Link>
      <h1 className={seriesStyles.header}>Frontend Interview Guide</h1>
      <Image
        priority
        src="/images/interview.jpg"
        height={450}
        width={700}
        alt="Rohit Kumawat Profile Pic"
      />

      <div className={seriesStyles.topicList}>
        <h2>
          Topic 1:
          <Link href={`/posts/hoisting`}>
            <a> Hoisting in JavaScript</a>
          </Link>
        </h2>
        <h2>
          Topic 2:
          <Link href={`/posts/var-let-const`}>
            <a> Difference between var, let, and const</a>
          </Link>
        </h2>
        <p>More coming soon...</p>
      </div>
      </div>
    </Layout>
  );
}
