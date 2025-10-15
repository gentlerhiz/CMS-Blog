import { useState } from "react";
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, TreePine } from "lucide-react";
import type { Article } from "./ArticleListView";

interface TreeNavigationProps {
  articles: Article[];
  onArticleSelect: (article: Article) => void;
  selectedArticleId?: string;
}

interface TreeNodeProps {
  article: Article;
  level: number;
  onSelect: (article: Article) => void;
  selectedId?: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

function TreeNode({ article, level, onSelect, selectedId, isExpanded = false, onToggle }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(isExpanded);
  const hasChildren = article.children && article.children.length > 0;
  const isSelected = article.id === selectedId;
  
  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
      onToggle?.();
    }
  };

  const handleSelect = () => {
    onSelect(article);
  };

  return (
    <div className="select-none">
      <div
        className={`flex items-center py-3 cursor-pointer rounded-xl transition-all duration-200 group ${
          isSelected 
            ? 'bg-blue-50 text-gray-900 border border-blue-200 shadow-sm' 
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
        } ${
          level === 0 ? 'px-4' :
          level === 1 ? 'pl-9 pr-4' :
          level === 2 ? 'pl-14 pr-4' :
          level === 3 ? 'pl-19 pr-4' :
          'pl-24 pr-4'
        }`}
        onClick={handleSelect}
      >
        {hasChildren && (
          <div 
            className="flex items-center mr-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          >
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
            )}
          </div>
        )}
        
        <div className="flex items-center min-w-0 flex-1">
          {hasChildren ? (
            <>
              {isOpen ? (
                <FolderOpen className="w-4 h-4 mr-3 text-blue-600" />
              ) : (
                <Folder className="w-4 h-4 mr-3 text-blue-600" />
              )}
            </>
          ) : (
            <File className="w-4 h-4 mr-3 text-purple-500" />
          )}
          
          <span className="truncate text-sm font-medium">
            {article.title}
          </span>
        </div>
      </div>
      
      {hasChildren && isOpen && (
        <div className="border-l-2 border-gray-200 ml-6">
          {article.children!.map((child) => (
            <TreeNode
              key={child.id}
              article={child}
              level={level + 1}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeNavigation({ articles, onArticleSelect, selectedArticleId }: TreeNavigationProps) {
  // Group articles by category for the tree structure
  const articlesByCategory = articles.reduce((acc, article) => {
    if (!article.parentId) { // Only show root articles
      const category = article.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(article);
    }
    return acc;
  }, {} as Record<string, Article[]>);

  // Simple state - start with all categories expanded
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(Object.keys(articlesByCategory))
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  return (
    <div className="h-full">
      <div className="p-4 space-y-3">
        {Object.entries(articlesByCategory).map(([category, categoryArticles]) => (
          <div key={category} className="space-y-2">
            {/* Enhanced Category Header */}
            <button
              type="button"
              className={`w-full flex items-center py-3 px-4 cursor-pointer rounded-xl transition-all duration-300 group border ${
                expandedCategories.has(category)
                  ? 'bg-blue-50 border-blue-200 shadow-sm'
                  : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:shadow-sm'
              }`}
              onClick={() => toggleCategory(category)}
            >
              <div className="flex items-center min-w-0 flex-1">
                <div className="transition-transform duration-200">
                  {expandedCategories.has(category) ? (
                    <ChevronDown className="w-4 h-4 mr-3 text-blue-600" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-3 text-gray-500 group-hover:text-blue-600" />
                  )}
                </div>
                <div className="p-2 rounded-lg mr-3 transition-colors duration-200 bg-blue-100 group-hover:bg-blue-200">
                  {expandedCategories.has(category) ? (
                    <FolderOpen className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Folder className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <span className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors duration-200">
                  {category}
                </span>
                <div className="ml-auto flex items-center space-x-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full transition-colors duration-200 ${
                    expandedCategories.has(category)
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-white text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700'
                  }`}>
                    {categoryArticles.length}
                  </span>
                </div>
              </div>
            </button>

            {/* Enhanced Articles in Category */}
            {expandedCategories.has(category) && (
              <div className="ml-4 space-y-1">
                {categoryArticles.map((article) => (
                  <div
                    key={article.id}
                    className={`flex items-center py-3 px-4 cursor-pointer rounded-xl transition-all duration-300 group border ${
                      article.id === selectedArticleId
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200 shadow-md transform scale-[1.02]'
                        : 'bg-white border-gray-100 hover:bg-blue-50 hover:border-blue-200 hover:shadow-md hover:transform hover:scale-[1.01]'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onArticleSelect(article);
                    }}
                  >
                    <div className="p-2 rounded-lg mr-3 transition-colors duration-200 bg-purple-100 group-hover:bg-purple-200">
                      <File className="w-3 h-3 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`truncate text-sm font-medium transition-colors duration-200 ${
                        article.id === selectedArticleId 
                          ? 'text-blue-900' 
                          : 'text-gray-900 group-hover:text-blue-700'
                      }`}>
                        {article.title}
                      </div>
                      <div className="flex items-center mt-1 space-x-2">
                        {article.status && (
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                            article.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' :
                            article.status === 'draft' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            article.status === 'amendment' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                            'bg-purple-50 text-purple-700 border-purple-200'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                              article.status === 'active' ? 'bg-green-500' :
                              article.status === 'draft' ? 'bg-yellow-500' :
                              article.status === 'amendment' ? 'bg-orange-500' :
                              'bg-purple-500'
                            }`}></div>
                            {article.status}
                          </span>
                        )}
                        {article.updatedAt && (
                          <span className="text-xs text-gray-500">
                            {new Date(article.updatedAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                    {article.id === selectedArticleId && (
                      <div className="ml-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {Object.keys(articlesByCategory).length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 shadow-inner">
              <File className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Articles Yet</h3>
            <p className="text-sm text-gray-600 mb-4">Create your first article to see it here</p>
            <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
              Articles will be organized by category automatically
            </div>
          </div>
        )}
      </div>
    </div>
  );
}