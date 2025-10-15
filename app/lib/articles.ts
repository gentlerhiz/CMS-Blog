import { prisma } from "./prisma";

export interface CreateArticleData {
  title: string;
  slug: string;
  content?: string;
  category: string;
  parentId?: string;
  status?: 'draft' | 'active' | 'amendment' | 'upcoming';
  dueDate?: string;
}

export interface UpdateArticleData extends Partial<CreateArticleData> {
  id: string;
}

// Create a new article
export async function createArticle(data: CreateArticleData) {
  const articleData: any = {
    title: data.title,
    slug: data.slug,
    content: data.content,
    category: data.category,
    parentId: data.parentId || null,
    status: data.status || 'draft',
  };

  // Convert date string to ISO DateTime if provided
  if (data.dueDate) {
    articleData.dueDate = new Date(data.dueDate).toISOString();
  }

  return prisma.article.create({
    data: articleData,
  });
}

// Get all articles
export async function getArticles() {
  return prisma.article.findMany({
    orderBy: [
      { category: 'asc' },
      { createdAt: 'desc' }
    ],
    include: {
      children: true,
      parent: true,
    },
  });
}

// Get articles in tree structure
export async function getArticlesTree() {
  const rootArticles = await prisma.article.findMany({
    where: {
      parentId: null,
    },
    include: {
      children: {
        include: {
          children: true,
        },
      },
    },
    orderBy: [
      { category: 'asc' },
      { createdAt: 'desc' }
    ],
  });

  return rootArticles;
}

// Get article by ID
export async function getArticleById(id: string) {
  return prisma.article.findUnique({
    where: { id },
    include: {
      children: true,
      parent: true,
    },
  });
}

// Get article by slug
export async function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({
    where: { slug },
    include: {
      children: true,
      parent: true,
    },
  });
}

// Update article
export async function updateArticle(data: UpdateArticleData) {
  const { id, dueDate, ...updateData } = data;
  
  const articleData: any = { ...updateData };
  
  // Convert date string to ISO DateTime if provided
  if (dueDate) {
    articleData.dueDate = new Date(dueDate).toISOString();
  }
  
  return prisma.article.update({
    where: { id },
    data: articleData,
  });
}

// Delete article
export async function deleteArticle(id: string) {
  return prisma.article.delete({
    where: { id },
  });
}

// Get articles by category
export async function getArticlesByCategory(category: string) {
  return prisma.article.findMany({
    where: { category },
    orderBy: { createdAt: 'desc' },
    include: {
      children: true,
      parent: true,
    },
  });
}

// Get unique categories
export async function getCategories() {
  const articles = await prisma.article.findMany({
    select: { category: true },
    distinct: ['category'],
  });
  
  return articles.map((article: { category: string }) => article.category);
}