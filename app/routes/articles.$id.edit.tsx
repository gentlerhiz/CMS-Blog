import type { Route } from "./+types/articles.$id.edit";
import { redirect } from "react-router";
import { useState } from "react";
import { ArticleForm, type ArticleFormData } from "../components/ArticleForm";
import { getArticleById, updateArticle, getCategories } from "../lib/articles";
import { convertPrismaArticleToArticle } from "../lib/typeConverters";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Edit Article - EdTech CMS" },
    { name: "description", content: "Edit article" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  
  try {
    const [prismaArticle, categories] = await Promise.all([
      getArticleById(id),
      getCategories()
    ]);
    
    if (!prismaArticle) {
      throw new Response("Article not found", { status: 404 });
    }
    
    const article = convertPrismaArticleToArticle(prismaArticle);
    return { article, categories };
  } catch (error) {
    console.error("Failed to load article:", error);
    throw new Response("Article not found", { status: 404 });
  }
}

export async function action({ params, request }: Route.ActionArgs) {
  const { id } = params;
  const formData = await request.formData();
  
  const articleData: ArticleFormData = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    parentId: formData.get("parentId") as string || undefined,
    status: (formData.get("status") as 'draft' | 'active' | 'amendment' | 'upcoming') || 'draft',
    dueDate: formData.get("dueDate") as string || undefined,
  };

  try {
    await updateArticle({ id, ...articleData });
    return redirect("/articles");
  } catch (error) {
    console.error("Failed to update article:", error);
    return new Response(JSON.stringify({ error: "Failed to update article" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export default function EditArticle({ loaderData }: Route.ComponentProps) {
  const { article, categories } = loaderData;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const response = await fetch(`/articles/${article.id}/edit`, {
        method: "POST",
        body: formData,
      });

      if (response.redirected) {
        window.location.href = response.url;
      } else if (!response.ok) {
        throw new Error("Failed to update article");
      }
    } catch (error) {
      console.error("Failed to update article:", error);
      alert("Failed to update article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div>
      <ArticleForm
        article={article}
        categories={categories}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}