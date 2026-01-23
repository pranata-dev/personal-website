import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { BlogPost, BlogCategory, BLOG_CATEGORIES } from '@/types';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';

// Force dynamic rendering for Supabase data
export const dynamic = 'force-dynamic';

// Sample posts for fallback - Add your articles here with full content
const samplePosts: Record<string, BlogPost> = {
    // To add a new article, copy this template:
    // 'your-article-slug': {
    //   id: '1',
    //   title: 'Your Article Title',
    //   slug: 'your-article-slug',
    //   excerpt: 'A short description...',
    //   category: 'tech-ai',
    //   content: `# Your Article Title
    //
    // Your article content in markdown format here.
    //
    // ## Section Heading
    // Some content...
    // `,
    //   published: true,
    //   created_at: new Date().toISOString(),
    //   updated_at: new Date().toISOString(),
    // },
};

const categoryColors: Record<BlogCategory, string> = {
    'tech-ai': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    'reviews': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    'short-stories': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    'culture': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
};

async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single();

        if (error || !data) {
            return samplePosts[slug] || null;
        }

        return data;
    } catch {
        return samplePosts[slug] || null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: post.title,
        description: post.excerpt || undefined,
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const categoryLabel = BLOG_CATEGORIES.find(c => c.value === post.category)?.label || post.category;

    // Simple markdown-like rendering
    const renderContent = (content: string) => {
        return content
            .split('\n\n')
            .map((paragraph, index) => {
                // Headers
                if (paragraph.startsWith('# ')) {
                    return (
                        <h1 key={index} className="text-3xl md:text-4xl font-bold mb-6">
                            {paragraph.slice(2)}
                        </h1>
                    );
                }
                if (paragraph.startsWith('## ')) {
                    return (
                        <h2 key={index} className="text-2xl md:text-3xl font-bold mt-12 mb-4">
                            {paragraph.slice(3)}
                        </h2>
                    );
                }
                if (paragraph.startsWith('### ')) {
                    return (
                        <h3 key={index} className="text-xl md:text-2xl font-bold mt-8 mb-3">
                            {paragraph.slice(4)}
                        </h3>
                    );
                }

                // Italics for story text
                if (paragraph.startsWith('*') && paragraph.endsWith('*') && !paragraph.startsWith('**')) {
                    return (
                        <p key={index} className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed italic">
                            {paragraph.slice(1, -1)}
                        </p>
                    );
                }

                // Lists
                if (paragraph.includes('\n1. ') || paragraph.startsWith('1. ')) {
                    const items = paragraph.split('\n').filter((line) => line.match(/^\d+\. /));
                    return (
                        <ol key={index} className="list-decimal pl-6 space-y-2 mb-4">
                            {items.map((item, i) => (
                                <li key={i} className="text-neutral-600 dark:text-neutral-400">
                                    {item.replace(/^\d+\. /, '')}
                                </li>
                            ))}
                        </ol>
                    );
                }

                if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').filter((line) => line.startsWith('- '));
                    return (
                        <ul key={index} className="list-disc pl-6 space-y-2 mb-4">
                            {items.map((item, i) => (
                                <li key={i} className="text-neutral-600 dark:text-neutral-400">
                                    {item.slice(2)}
                                </li>
                            ))}
                        </ul>
                    );
                }

                // Regular paragraph
                return (
                    <p key={index} className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                        {paragraph.split('**').map((part, i) =>
                            i % 2 === 1 ? (
                                <strong key={i} className="font-semibold text-neutral-800 dark:text-neutral-200">
                                    {part}
                                </strong>
                            ) : (
                                part
                            )
                        )}
                    </p>
                );
            });
    };

    return (
        <div className="pt-24 pb-16">
            <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to blog
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium ${categoryColors[post.category]}`}>
                            <Tag className="w-4 h-4" />
                            {categoryLabel}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-neutral-500">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={post.created_at}>{formattedDate}</time>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
                        {post.title}
                    </h1>
                </header>

                {/* Content */}
                <div className="prose">{post.content && renderContent(post.content)}</div>
            </article>
        </div>
    );
}
