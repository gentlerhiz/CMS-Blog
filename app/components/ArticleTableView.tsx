import { Link } from "react-router";
import { Edit, Trash2, Eye, Plus, Search, Filter, Calendar, Tag, FileText, ChevronUp, ChevronDown } from "lucide-react";
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

type SortField = 'title' | 'createdAt' | 'updatedAt' | 'category' | 'status' | 'dueDate';
type SortDirection = 'asc' | 'desc';

const statusColors = {
  draft: 'bg-green-100 text-green-800 border-green-200',
  active: 'bg-blue-100 text-blue-800 border-blue-200',
  amendment: 'bg-purple-100 text-purple-800 border-purple-200',
  upcoming: 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

const statusLabels = {
  draft: 'Draft',
  active: 'Active',
  amendment: 'Amendment',
  upcoming: 'Upcoming'
};

export function ArticleTableView({ articles, onDelete }: ArticleListViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortField, setSortField] = useState<SortField>('updatedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = [...new Set(articles.map(article => article.category))];
  const statuses = ['draft', 'active', 'amendment', 'upcoming'] as const;
  
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || article.category === selectedCategory;
    const matchesStatus = selectedStatus === "" || article.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];
    
    if (sortField === 'createdAt' || sortField === 'updatedAt' || sortField === 'dueDate') {
      const aTime = aValue ? new Date(aValue as string).getTime() : 0;
      const bTime = bValue ? new Date(bValue as string).getTime() : 0;
      aValue = aTime;
      bValue = bTime;
    }
    
    if (aValue === null || aValue === undefined) aValue = '';
    if (bValue === null || bValue === undefined) bValue = '';
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = sortedArticles.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      onDelete(id);
    }
  };

  const getDueDateStatus = (dueDate: string | null | undefined, status: string) => {
    if (!dueDate || status === 'active') return null;
    
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { label: 'Past Due', class: 'text-red-600 font-semibold' };
    if (diffDays === 0) return { label: 'Due Today', class: 'text-orange-600 font-semibold' };
    if (diffDays <= 7) return { label: `In ${diffDays} days`, class: 'text-yellow-600 font-semibold' };
    if (diffDays <= 30) return { label: `In ${diffDays} days`, class: 'text-blue-600' };
    return { label: `In ${diffDays} days`, class: 'text-gray-600' };
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <div className="w-4 h-4" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-blue-600" /> : 
      <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Articles</h1>
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

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setSelectedStatus("")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                selectedStatus === "" 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              All ({articles.length})
            </button>
            {statuses.map(status => {
              const count = articles.filter(a => a.status === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    selectedStatus === status 
                      ? `${statusColors[status]}` 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {statusLabels[status]} ({count})
                </button>
              );
            })}
          </div>

          {/* Search and Category Filter */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Filter by title or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                />
              </div>
            </div>
            
            <div className="lg:w-64">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white appearance-none"
                  title="Filter by category"
                  aria-label="Filter articles by category"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {paginatedArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-8">
                {searchTerm || selectedCategory || selectedStatus
                  ? "Try adjusting your search or filter criteria." 
                  : "Get started by creating your first article."}
              </p>
              <Link
                to="/articles/new"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Article
              </Link>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  <div className="col-span-4">
                    <button 
                      onClick={() => handleSort('title')}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      Title <SortIcon field="title" />
                    </button>
                  </div>
                  <div className="col-span-2">
                    <button 
                      onClick={() => handleSort('createdAt')}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      Date <SortIcon field="createdAt" />
                    </button>
                  </div>
                  <div className="col-span-2">
                    <button 
                      onClick={() => handleSort('updatedAt')}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      Updated <SortIcon field="updatedAt" />
                    </button>
                  </div>
                  <div className="col-span-2">
                    <button 
                      onClick={() => handleSort('category')}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      Category <SortIcon field="category" />
                    </button>
                  </div>
                  <div className="col-span-1">
                    <button 
                      onClick={() => handleSort('status')}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      Status <SortIcon field="status" />
                    </button>
                  </div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {paginatedArticles.map((article) => {
                  const dueDateStatus = getDueDateStatus(article.dueDate, article.status);
                  return (
                    <div
                      key={article.id}
                      className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="col-span-4">
                        <div>
                          <Link
                            to={`/articles/${article.id}`}
                            className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            {article.title}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">/{article.slug}</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-sm text-gray-600">
                          {dueDateStatus ? (
                            <span className={dueDateStatus.class}>
                              {dueDateStatus.label}
                            </span>
                          ) : (
                            new Date(article.createdAt).toLocaleDateString()
                          )}
                          <div className="text-xs text-gray-400">
                            {new Date(article.createdAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-sm text-gray-600">
                          Last Update: {new Date(article.updatedAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                          <Tag className="w-3 h-3 mr-1" />
                          {article.category}
                        </span>
                      </div>
                      <div className="col-span-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[article.status]}`}>
                          {statusLabels[article.status]}
                        </span>
                      </div>
                      <div className="col-span-1 flex items-center justify-end gap-2">
                        <Link
                          to={`/articles/${article.id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="View Article"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        
                        <Link
                          to={`/articles/${article.id}/edit`}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                          title="Edit Article"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-gray-50 border-t border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedArticles.length)} of {sortedArticles.length} articles
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            currentPage === page 
                              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}