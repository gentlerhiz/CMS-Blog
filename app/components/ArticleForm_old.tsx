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
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-12">
        {/* Background Decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#9DD9D2]/20 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-[#F4D06F]/30 rounded-full blur-lg"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-[#9DD9D2]/20 rounded-full border border-[#9DD9D2] mb-6">
            <FileText className="w-5 h-5 text-[#FF8811] mr-2" />
            <span className="text-[#392F5A] font-medium">Content Creation</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-[#392F5A]">{article ? "Edit" : "Create"}</span>
            <br />
            <span className="text-[#9DD9D2]">Your Content</span>
          </h1>
          
          <p className="text-xl text-[#392F5A]/80 max-w-2xl mx-auto leading-relaxed">
            {article ? "Update your existing content with our powerful editor" : "Share your knowledge with the world using our intuitive creation tools"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Card */}
        <div className="bg-white rounded-xl p-6 border border-[#9DD9D2]/50 shadow-lg space-y-6">
          <h2 className="text-lg font-semibold text-[#392F5A] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#FF8811]" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-[#392F5A] mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 ${
                  errors.title 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-[#9DD9D2] focus:border-[#FF8811] focus:ring-[#FF8811]/20'
                } shadow-sm focus:outline-none focus:ring-4 bg-white text-black placeholder-[#392F5A]/60`}
                placeholder="Enter a compelling title"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <X className="w-4 h-4" />
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="slug" className="text-sm font-semibold text-[#392F5A] mb-2 flex items-center gap-1">
                <Link2 className="w-4 h-4" />
                Slug *
              </label>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 ${
                  errors.slug 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-[#9DD9D2] focus:border-[#FF8811] focus:ring-[#FF8811]/20'
                } shadow-sm focus:outline-none focus:ring-4 bg-white text-black placeholder-[#392F5A]/60`}
                placeholder="article-slug"
              />
              {errors.slug ? (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <X className="w-4 h-4" />
                  {errors.slug}
                </p>
              ) : (
                <p className="mt-2 text-sm text-[#392F5A]/60">
                  URL-friendly version (auto-generated from title)
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="category" className="text-sm font-semibold text-[#392F5A] mb-2 flex items-center gap-1">
              <Tag className="w-4 h-4" />
              Category *
            </label>
            <div className="space-y-3">
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                title="Select a category"
                className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 ${
                  errors.category 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-[#9DD9D2] focus:border-[#FF8811] focus:ring-[#FF8811]/20'
                } shadow-sm focus:outline-none focus:ring-4 bg-white text-black`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 ${
                  errors.category 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-[#9DD9D2] focus:border-[#FF8811] focus:ring-[#FF8811]/20'
                } shadow-sm focus:outline-none focus:ring-4 bg-white text-black placeholder-[#392F5A]/60`}
                placeholder="Or create a new category"
              />
            </div>
            {errors.category && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <X className="w-4 h-4" />
                {errors.category}
              </p>
            )}
          </div>
        </div>

        {/* Content Editor Card */}
        <div className="bg-white rounded-xl p-6 border border-[#9DD9D2]/50 shadow-lg">
          <h2 className="text-lg font-semibold text-[#392F5A] mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#FF8811]" />
            Content
          </h2>
          <RichTextEditor
            content={formData.content}
            onChange={(content) => handleChange("content", content)}
            placeholder="Write your article content here. Use the toolbar to format your text..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-[#9DD9D2]/50">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-[#9DD9D2] rounded-xl text-[#392F5A] hover:bg-[#9DD9D2]/10 hover:border-[#9DD9D2] focus:outline-none focus:ring-4 focus:ring-[#9DD9D2]/20 transition-all duration-200 font-medium disabled:opacity-50"
            disabled={isSubmitting}
          >
            <X className="w-4 h-4 mr-2 inline" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#FF8811] text-white rounded-xl hover:bg-[#FF8811]/90 focus:outline-none focus:ring-4 focus:ring-[#FF8811]/20 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 font-medium"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2 inline" />
                {article ? "Update Article" : "Create Article"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}