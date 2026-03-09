import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  // Sort posts by date
  posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'wpagency.xyz Blog | No-BS WordPress Insights',
    description: 'Real talk about WordPress, performance, and web development. No fluff, just facts.',
    site: context.site || 'https://wpagency.xyz',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
      author: post.data.author,
    })),
    customData: `<language>en-us</language>`,
  });
}