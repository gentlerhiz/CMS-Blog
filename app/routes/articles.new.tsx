import type { Route } from "./+types/articles.new";
import { redirect } from "react-router";
import { useState } from "react";
import { ArticleForm, type ArticleFormData } from "../components/ArticleForm";
import { createArticle, getCategories } from "../lib/articles";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Article - EdTech CMS" },
    { name: "description", content: "Create a new article" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const categories = await getCategories();
    return { categories };
  } catch (error) {
    console.error("Failed to load categories:", error);
    return { categories: [] };
  }
}

export async function action({ request }: Route.ActionArgs) {
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
    const article = await createArticle(articleData);
    return redirect("/articles");
  } catch (error) {
    console.error("Failed to create article:", error);
    return new Response(JSON.stringify({ error: "Failed to create article" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export default function NewArticle({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const response = await fetch("/articles/new", {
        method: "POST",
        body: formData,
      });

      if (response.redirected) {
        window.location.href = response.url;
      } else if (!response.ok) {
        throw new Error("Failed to create article");
      }
    } catch (error) {
      console.error("Failed to create article:", error);
      alert("Failed to create article. Please try again.");
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
        categories={categories}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}