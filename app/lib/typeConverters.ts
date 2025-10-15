import type { Article as PrismaArticle } from "@prisma/client";
import type { Article } from "../components/ArticleTableView";

export function convertPrismaArticleToArticle(prismaArticle: PrismaArticle & {
  children?: PrismaArticle[];
  parent?: PrismaArticle | null;
}): Article {
  return {
    id: prismaArticle.id,
    title: prismaArticle.title,
    slug: prismaArticle.slug,
    content: prismaArticle.content ?? undefined,
    category: prismaArticle.category,
    status: ((prismaArticle as any).status as 'draft' | 'active' | 'amendment' | 'upcoming') || 'draft',
    dueDate: (prismaArticle as any).dueDate?.toISOString() ?? undefined,
    parentId: prismaArticle.parentId ?? undefined,
    createdAt: prismaArticle.createdAt.toISOString(),
    updatedAt: prismaArticle.updatedAt.toISOString(),
    children: prismaArticle.children?.map(convertPrismaArticleToArticle),
    parent: prismaArticle.parent ? convertPrismaArticleToArticle(prismaArticle.parent) : undefined,
  };
}

export function convertPrismaArticlesToArticles(prismaArticles: (PrismaArticle & {
  children?: PrismaArticle[];
  parent?: PrismaArticle | null;
})[]): Article[] {
  return prismaArticles.map(convertPrismaArticleToArticle);
}