import type { Route } from "./+types/articles.$id";
import { Link } from "react-router";
import { Edit, ArrowLeft } from "lucide-react";
import { getArticleById } from "../lib/articles";
import { convertPrismaArticleToArticle } from "../lib/typeConverters";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Article - EdTech CMS" },
    { name: "description", content: "View article" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  
  try {
    const prismaArticle = await getArticleById(id);
    if (!prismaArticle) {
      throw new Response("Article not found", { status: 404 });
    }
    
    const article = convertPrismaArticleToArticle(prismaArticle);
    return { article };
    return { article };
  } catch (error) {
    console.error("Failed to load article:", error);
    throw new Response("Article not found", { status: 404 });
  }
}

export default function ArticleView({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link
            to="/articles"
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 mr-6 rounded-lg hover:bg-blue-50 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
        </div>
        <Link
          to={`/articles/${article.id}/edit`}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Article
        </Link>
      </div>

      {/* Article Content */}
      <article className="bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
        {/* Article Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-8 border-b border-gray-100">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="inline-flex px-4 py-2 text-sm font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                {article.category}
              </span>
              {article.status && (
                <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full ${
                  article.status === 'active' ? 'bg-green-100 text-green-700 border border-green-200' :
                  article.status === 'draft' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                  article.status === 'amendment' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                  'bg-purple-100 text-purple-700 border border-purple-200'
                }`}>
                  {article.status}
                </span>
              )}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-gray-600 gap-6">
            <div className="flex items-center">
              <span className="font-medium">Created:</span>
              <span className="ml-2">{new Date(article.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center">
              <span className="font-medium">Updated:</span>
              <span className="ml-2">{new Date(article.updatedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            {article.dueDate && (
              <>
                <span className="text-gray-400">•</span>
                <div className="flex items-center">
                  <span className="font-medium">Due:</span>
                  <span className="ml-2">{new Date(article.dueDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </>
            )}
            <span className="text-gray-400">•</span>
            <span className="font-mono text-purple-600 font-medium">/{article.slug}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700">
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Edit className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 italic text-lg mb-4">No content available</p>
                <Link
                  to={`/articles/${article.id}/edit`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Add Content
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Related Articles */}
        {article.children && article.children.length > 0 && (
          <div className="border-t border-gray-200 p-8 lg:p-12 bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {article.children.map((child: any) => (
                <Link
                  key={child.id}
                  to={`/articles/${child.id}`}
                  className="block p-6 bg-white border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 group shadow-sm hover:shadow-md"
                >
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                    {child.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {child.category}
                  </p>
                  {child.status && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-3 ${
                      child.status === 'active' ? 'bg-green-100 text-green-700' :
                      child.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                      child.status === 'amendment' ? 'bg-orange-100 text-orange-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {child.status}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}