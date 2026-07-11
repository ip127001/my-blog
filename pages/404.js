import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import Layout from "../components/layout";

export default function Custom404() {
  return (
    <Layout>
      <div className="page404">
        <h1 className={utilStyles.headingXl}>404</h1>
        <p style={{ color: "var(--text-secondary)" }}>
          This page doesn&apos;t exist.
        </p>
        <Link href="/">
          <a className={utilStyles.backToHome}>&larr; Back to Home</a>
        </Link>
        <img className="placeholder404" src="/images/404.svg" alt="" />
      </div>
    </Layout>
  );
}
