import { useState, useEffect } from "react";
import { RichTextEditor } from "./RichTextEditor";
import { Save, X, FileText, Link2, Tag, Loader2 } from "lucide-react";
import type { Article } from "./ArticleListView";

interface ArticleFormProps {
  article?: Article;
  categories: string[];
  onSubmit: (data: ArticleFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export interface ArticleFormData {
  title: string;
  slug: string;
  content: string;
  category: string;
  status: 'draft' | 'active' | 'amendment' | 'upcoming';
  dueDate?: string;
  parentId?: string;
}

export function ArticleForm({ 
  article, 
  categories, 
  onSubmit, 
  onCancel, 
  isSubmitting = false 
}: ArticleFormProps) {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: article?.title || "",
    slug: article?.slug || "",
    content: article?.content || "",
    category: article?.category || "",
    status: article?.status || "draft",
    dueDate: article?.dueDate ? new Date(article.dueDate).toISOString().split('T')[0] : "",
    parentId: article?.parent?.id || "",
  });

  const [errors, setErrors] = useState<Partial<ArticleFormData>>({});

  useEffect(() => {
    // Auto-generate slug from title
    if (formData.title && !article) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, article]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ArticleFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof ArticleFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Article Details Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Article Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title Field */}
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-3">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter a compelling title..."
                  className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                    errors.title 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Slug Field */}
              <div>
                <label htmlFor="slug" className="block text-sm font-semibold text-gray-900 mb-3">
                  <Link2 className="w-4 h-4 inline mr-1" />
                  URL Slug *
                </label>
                <input
                  type="text"
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="url-friendly-slug"
                  className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                    errors.slug 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                />
                {errors.slug && (
                  <p className="mt-2 text-sm text-red-600">{errors.slug}</p>
                )}
              </div>

              {/* Category Field */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-3">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Category *
                </label>
                <div className="space-y-3">
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 appearance-none ${
                      errors.category 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  <div className="text-sm text-gray-600">
                    Or create a new category:
                  </div>
                  
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    placeholder="Enter new category name"
                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                      errors.category 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  />
                </div>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              {/* Status Field */}
              <div>
                <label htmlFor="status" className="block text-sm font-semibold text-gray-900 mb-3">
                  Status *
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 bg-white hover:border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 appearance-none"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="amendment">Amendment</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>

              {/* Due Date Field */}
              <div>
                <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-900 mb-3">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 bg-white hover:border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Content Editor Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Content</h2>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => handleChange('content', content)}
              placeholder="Start writing your article content..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
            >
              <X className="w-5 h-5 mr-2 inline" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 inline animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2 inline" />
                  {article ? 'Update Article' : 'Create Article'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}