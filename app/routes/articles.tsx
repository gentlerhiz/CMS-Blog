import type { Route } from "./+types/articles";
import { redirect } from "react-router";
import { ArticleTableView } from "../components/ArticleTableView";
import { getArticles, deleteArticle } from "../lib/articles";
import { convertPrismaArticlesToArticles } from "../lib/typeConverters";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Articles - EdTech CMS" },
    { name: "description", content: "Manage your articles" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const prismaArticles = await getArticles();
    const articles = convertPrismaArticlesToArticles(prismaArticles);
    return { articles };
  } catch (error) {
    console.error("Failed to load articles:", error);
    return { articles: [] };
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const articleId = formData.get("articleId");

  if (intent === "delete" && typeof articleId === "string") {
    try {
      await deleteArticle(articleId);
      return redirect("/articles");
    } catch (error) {
      console.error("Failed to delete article:", error);
      return new Response(JSON.stringify({ error: "Failed to delete article" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  return null;
}

export default function Articles({ loaderData }: Route.ComponentProps) {
  const { articles } = loaderData;

  const handleDelete = (id: string) => {
    const form = new FormData();
    form.append("intent", "delete");
    form.append("articleId", id);
    
    fetch("/articles", {
      method: "POST",
      body: form,
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div>
      <ArticleTableView articles={articles} onDelete={handleDelete} />
    </div>
  );
}