import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { getPostBySlug } from '@/lib/posts';

interface PostPageParams {
  params: {
    slug: string;
  };
}

const postsDirectory = path.join(process.cwd(), 'src/app/content/posts');


export default async function Post({ params } : PostPageParams) {
  const { slug } = params;
  const post = getPostBySlug(slug);
  const processedContent = await remark().use(html).process((await post).content);
  const contentHtml = processedContent.toString();

  return (
    <div className="container">
      <h1>{(await post).title}</h1>
      <p>{new Date((await post).date).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
