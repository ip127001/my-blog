import { useState } from "react";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Link from "next/link";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { useEffect } from "react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

const SITE_URL = "https://geekrk.vercel.app";

function buildExcerpt(markdown) {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#*_`>~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plainText.length > 160
    ? `${plainText.slice(0, 157)}...`
    : plainText;
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
      excerpt: buildExcerpt(postData.markdown),
    },
  };
}

export default function Post({ postData, excerpt }) {
  const [likes, setLikes] = useState(postData.likes);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    // Turn ```mermaid code blocks into diagram containers before hljs
    // touches them, then let mermaid render them into SVGs.
    const mermaidBlocks = document.querySelectorAll("code.language-mermaid");
    mermaidBlocks.forEach((code) => {
      const container = document.createElement("div");
      container.className = "mermaid";
      container.textContent = code.textContent;
      code.parentElement.replaceWith(container);
    });

    if (mermaidBlocks.length > 0) {
      import("mermaid").then(({ default: mermaid }) => {
        mermaid.initialize({ startOnLoad: false, theme: "neutral" });
        mermaid.run({ querySelector: ".mermaid" });
      });
    }

    hljs.highlightAll();
  }, []);

  useEffect(() => {
    if (postData?.id) {
      getLikes(postData.id);
    } else {
      setisLoading(false);
    }
  }, [postData]);

  const updateLikes = async (data) => {
    await fetch("/api/likes", {
      method: "post",
      body: JSON.stringify({ data }),
    });
    getLikes(data.title);
  };

  async function getLikes(id) {
    const res = await fetch(`/api/likes?id=${id}`);
    const json = await res.json();
    setLikes(json?.likes || 0);
    setisLoading(false);
  }

  return (
    <div className={utilStyles.postContainer}>
      <Link href="/">
        <a className={utilStyles.backToHome}>&larr; Back to Home</a>
      </Link>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={excerpt} />
        {postData.tags && <meta name="keywords" content={postData.tags} />}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/posts/${postData.id}`} />
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${SITE_URL}/posts/${postData.id}`}
        />
        <meta
          property="og:image"
          content={`${SITE_URL}/images/${postData.id}.png`}
        />
        <meta property="article:published_time" content={postData.date} />
        <meta property="article:author" content="Rohit Kumawat" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@geekrk" />
        <meta name="twitter:title" content={postData.title} />
        <meta name="twitter:description" content={excerpt} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: postData.title,
              datePublished: postData.date,
              author: {
                "@type": "Person",
                name: "Rohit Kumawat",
                url: SITE_URL,
              },
              description: excerpt,
              image: `${SITE_URL}/images/${postData.id}.png`,
              mainEntityOfPage: `${SITE_URL}/posts/${postData.id}`,
            }),
          }}
        />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <div>
            <div>Rohit Kumawat</div>
            <Date dateString={postData.date} />
          </div>
          <div className={utilStyles.thumbsSection}>
            {isLoading ? (
              <div className={utilStyles.spinner}>
                <div className={utilStyles.bounce1}></div>
                <div className={utilStyles.bounce2}></div>
                <div className={utilStyles.bounce3}></div>
              </div>
            ) : (
              <>
                <button
                  onClick={() =>
                    updateLikes({
                      title: postData.id,
                      likes: Number(likes) + 1,
                    })
                  }
                >
                  &#128077;
                </button>
                {likes}
              </>
            )}
          </div>
        </div>
        <div
          className={utilStyles.postHtml}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </div>
  );
}
