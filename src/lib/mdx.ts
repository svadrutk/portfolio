import { getAllPosts as getStaticPosts, getPostBySlug as getStaticPostBySlug, Post } from './posts-data';

export async function getAllPosts(): Promise<Post[]> {
  try {
    return getStaticPosts();
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return getStaticPostBySlug(slug);
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
} 