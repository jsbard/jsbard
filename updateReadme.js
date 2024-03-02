const fs = require('fs');
const Parser = require('rss-parser');
const parser = new Parser();

const README_FILE = 'README.md';
const FEED_URL = 'https://wordpresswhispers.com/feed/';
const POSTS_LIMIT = 4;

(async () => {
    let feed = await parser.parseURL(FEED_URL);
    let latestPosts = feed.items.slice(0, POSTS_LIMIT).map(item => `- [${item.title}](${item.link})`).join('\n');

    let readmeContent = fs.readFileSync(README_FILE, 'utf8');
    let updatedReadme = readmeContent.replace(/(<!-- BLOGPOSTS:START -->)[\s\S]*(<!-- BLOGPOSTS:END -->)/, `$1\n${latestPosts}\n$2`);

    fs.writeFileSync(README_FILE, updatedReadme);
    console.log('README updated with latest blog posts.');
})();
