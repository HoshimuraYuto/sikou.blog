const { Feed } = require("feed");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const bd = require("../blog_data");

const now = new Date();
const year = now.getFullYear();

const postsDirectory = path.join(process.cwd(), "pages", "blog");
const fileNames = fs.readdirSync(postsDirectory);

const posts = fileNames.map((fileName) => {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const slug = fullPath.match(/^.*\/pages(\/.*)\.mdx$/);

  return {
    fileName,
    slug,
    ...matterResult.data,
  };
});

const feed = new Feed({
  title: bd.TITLE,
  description: bd.DESCRIPTION,
  id: bd.URL,
  link: bd.URL,
  language: "ja",
  image: `${bd.URL}/favicon.png`,
  favicon: `${bd.URL}/favicon.png`,
  copyright: `© ${year} sikou.blog All rights reserved.`,
  updated: now,
  generator: bd.AUTHOR,
  feedLinks: {
    json: `${bd.URL}/json`,
    atom: `${bd.URL}/atom`,
  },
  author: {
    name: bd.AUTHOR,
    link: bd.URL,
  },
});

function generateRssFeed() {
  posts.map((page) => {
    console.log(page.slug[1]);
    feed.addItem({
      title: page.title,
      id: `${bd.URL}${page.slug[1]}`,
      link: `${bd.URL}${page.slug[1]}`,
      description: page.description,
      date: new Date(page.date),
    });
  });

  const publicFolder = path.join(process.cwd(), "public");
  fs.writeFile(path.join(publicFolder, "rss.xml"), feed.rss2(), () => {
    console.log("RSS feed generated and saved to public/rss.xml");
  });
}

generateRssFeed();
