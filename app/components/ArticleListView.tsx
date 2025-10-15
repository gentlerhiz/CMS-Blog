import { Link } from "react-router";
import { Edit, Trash2, Eye, Plus, Search, Filter, Calendar, Tag, FileText } from "lucide-react";
import { useState } from "react";

export interface Article {
  id: string;
  title: string;
  slug: string;
  content?: string | null;
  category: string;
  status: 'draft' | 'active' | 'amendment' | 'upcoming';
  dueDate?: string | null;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
  children?: Article[];
  parent?: Article | null;
}

interface ArticleListViewProps {
  articles: Article[];
  onDelete: (id: string) => void;
}

export function ArticleListView({ articles, onDelete }: ArticleListViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [...new Set(articles.map(article => article.category))];
  
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      onDelete(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
              <p className="text-gray-600 mt-1">Manage your educational content</p>
            </div>
            <Link
              to="/articles/new"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Article
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
              />
            </div>
            
            <div className="relative sm:w-64">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                title="Filter by category"
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid/List */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-12">
        {filteredArticles.length > 0 ? (
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">/{article.slug}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {article.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Updated {new Date(article.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/articles/${article.id}`}
                      className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                      title="View Article"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    
                    <Link
                      to={`/articles/${article.id}/edit`}
                      className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
                      title="Edit Article"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                      title="Delete Article"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-8">
              <FileText className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {searchTerm || selectedCategory ? "No articles found" : "No articles yet"}
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-sm mx-auto">
              {searchTerm || selectedCategory 
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first article to share your knowledge"
              }
            </p>
            {!searchTerm && !selectedCategory && (
              <Link
                to="/articles/new"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Article
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}