import type { Route } from "./+types/editor";
import { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import { TreeNavigation } from "../components/TreeNavigation";
import { RichTextEditor } from "../components/RichTextEditor";
import { getArticlesTree, updateArticle } from "../lib/articles";
import { convertPrismaArticlesToArticles } from "../lib/typeConverters";
import type { Article } from "../components/ArticleListView";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Editor - EdTech CMS" },
    { name: "description", content: "Tree-based article editor" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const content = formData.get("content") as string;

  try {
    await updateArticle({ id, content });
    return { success: true };
  } catch (error) {
    console.error("Failed to update article:", error);
    return { success: false, error: "Failed to save article" };
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const prismaArticles = await getArticlesTree();
    const articles = convertPrismaArticlesToArticles(prismaArticles);
    return { articles };
  } catch (error) {
    console.error("Failed to load articles:", error);
    return { articles: [] };
  }
}

export default function Editor({ loaderData }: Route.ComponentProps) {
  const { articles } = loaderData;
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [content, setContent] = useState("");
  const fetcher = useFetcher();

  const isSaving = fetcher.state === "submitting";

  // Update content when selected article changes
  useEffect(() => {
    if (selectedArticle) {
      console.log('Article selected, updating content:', selectedArticle.title);
      setContent(selectedArticle.content || "");
    }
  }, [selectedArticle]);

  // Handle save response
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        alert("Article saved successfully!");
        // Update the selected article with new content
        setSelectedArticle(prev => prev ? { ...prev, content } : null);
      } else {
        alert(fetcher.data.error || "Failed to save article");
      }
    }
  }, [fetcher.data, content]);

  const handleArticleSelect = (article: Article) => {
    console.log('Selecting article:', article.title);
    console.log('Article content:', article.content);
    setSelectedArticle(article);
    setContent(article.content || ''); // Set the content to the article's content
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {
    if (!selectedArticle) return;

    const formData = new FormData();
    formData.append("id", selectedArticle.id);
    formData.append("content", content);

    fetcher.submit(formData, { method: "POST" });
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Enhanced Tree Navigation Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 shadow-xl flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 flex-shrink-0">
          <div className="flex items-center mb-3">
            <div className="p-3 bg-blue-600 rounded-xl mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Content Library</h2>
              <p className="text-sm text-gray-600">Select an article to edit</p>
            </div>
          </div>
          {articles.length > 0 && (
            <div className="text-xs text-gray-500 bg-white/50 px-3 py-2 rounded-lg border border-white/60">
              {articles.length} article{articles.length !== 1 ? 's' : ''} available
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <TreeNavigation
            articles={articles}
            onArticleSelect={handleArticleSelect}
            selectedArticleId={selectedArticle?.id}
          />
        </div>
      </div>

      {/* Enhanced Main Editor Panel */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {selectedArticle ? (
          <>
            {/* Enhanced Article Header */}
            <div className="border-b border-gray-200 bg-gradient-to-r from-white to-gray-50/50 px-8 py-6 shadow-sm flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {selectedArticle.title}
                      </h1>
                      {selectedArticle.status && (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          selectedArticle.status === 'active' ? 'bg-green-100 text-green-700 border border-green-200' :
                          selectedArticle.status === 'draft' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                          selectedArticle.status === 'amendment' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                          'bg-purple-100 text-purple-700 border border-purple-200'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            selectedArticle.status === 'active' ? 'bg-green-500' :
                            selectedArticle.status === 'draft' ? 'bg-yellow-500' :
                            selectedArticle.status === 'amendment' ? 'bg-orange-500' :
                            'bg-purple-500'
                          }`}></div>
                          {selectedArticle.status}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-xs">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                          </svg>
                          {selectedArticle.category}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span className="font-mono text-purple-600 font-medium">/{selectedArticle.slug}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Updated {new Date(selectedArticle.updatedAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Rich Text Editor */}
            <div className="flex-1 overflow-hidden bg-gray-50">
              <div className="h-full p-8">
                <div className="h-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="h-full p-6 overflow-y-auto">
                    <RichTextEditor
                      content={content}
                      onChange={handleContentChange}
                      placeholder="Start writing your article content..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="text-center p-12 max-w-lg">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Create Content?</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Select an article from the content library on the left to start editing. 
                You can navigate through categories and choose any article to view and edit its content in the rich text editor.
              </p>
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Tips:</h4>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Expand categories to see articles
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Click any article to start editing
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Auto-save keeps your work safe
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}