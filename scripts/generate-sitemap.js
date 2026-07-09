const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const SITE_URL = "https://geekrk.vercel.app";
const postsDirectory = path.join(process.cwd(), "posts");

const posts = fs.readdirSync(postsDirectory).map((fileName) => {
  const id = fileName.replace(/\.md$/, "");
  const fileContents = fs.readFileSync(
    path.join(postsDirectory, fileName),
    "utf8"
  );
  const { data } = matter(fileContents);
  return { id, date: data.date };
});

const urls = [
  { loc: `${SITE_URL}/`, priority: "1.0" },
  { loc: `${SITE_URL}/frontend-interview-guide`, priority: "0.7" },
  ...posts.map((post) => ({
    loc: `${SITE_URL}/posts/${post.id}`,
    lastmod: post.date,
    priority: "0.8",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod, priority }) => `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);
console.log(`sitemap.xml generated with ${urls.length} urls`);
