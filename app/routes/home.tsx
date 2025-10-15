import type { Route } from "./+types/home";
import { Link } from "react-router";
import { FileText, Edit, List, ArrowRight, Sparkles, BookOpen, Users, Zap, Globe } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "EdTech CMS - Empower Education" },
    { name: "description", content: "Transform educational content creation with our modern CMS platform" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        {/* Background Decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300/30 rounded-full blur-lg"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-indigo-200/20 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-20 text-center">
          <div className="mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-blue-50 rounded-full border border-blue-200 mb-8">
              <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-gray-900 font-medium">Mini-CMS for Blog Articles</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              <span className="text-gray-900">
                Create & Manage
              </span>
              <br />
              <span className="text-blue-600">Blog Articles</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              A powerful mini-CMS that supports complete CRUD operations for blog articles. 
              Create, read, update, and delete articles with our intuitive table management and rich text editor.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link
              to="/articles/new"
              className="group inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              <Edit className="w-5 h-5 mr-2" />
              Create Blog Article
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/editor"
              className="group inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              <FileText className="w-5 h-5 mr-2" />
              Tree Editor
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/articles"
              className="group inline-flex items-center px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              <List className="w-5 h-5 mr-2" />
              Manage Articles
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Complete CRUD Operations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create, manage, and update blog articles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards */}
          <div className="group p-8 bg-white rounded-3xl border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300">
              <Edit className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Text Editor</h3>
            <p className="text-gray-600 leading-relaxed">
              Create and update blog articles with our rich text editor featuring formatting tools and real-time editing capabilities.
            </p>
          </div>

          <div className="group p-8 bg-white rounded-3xl border border-gray-200 hover:border-purple-200 transition-all duration-300 hover:shadow-xl">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors duration-300">
              <List className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Table List View</h3>
            <p className="text-gray-600 leading-relaxed">
              Manage all your blog articles in a comprehensive table view with sorting, filtering, and easy access to edit or delete operations.
            </p>
          </div>

          <div className="group p-8 bg-white rounded-3xl border border-gray-200 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors duration-300">
              <FileText className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">CRUD Operations</h3>
            <p className="text-gray-600 leading-relaxed">
              Full Create, Read, Update, and Delete functionality for blog articles with intuitive controls and seamless data management.
            </p>
          </div>

          <div className="group p-8 bg-white rounded-3xl border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
            <p className="text-gray-600 leading-relaxed">
              Built for speed with modern technologies ensuring quick load times and smooth user experience.
            </p>
          </div>

          <div className="group p-8 bg-white rounded-3xl border border-gray-200 hover:border-purple-200 transition-all duration-300 hover:shadow-xl">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors duration-300">
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Access</h3>
            <p className="text-gray-600 leading-relaxed">
              Cloud-based platform accessible from anywhere, ensuring your content reaches students worldwide.
            </p>
          </div>

          <div className="group p-8 bg-white rounded-3xl border border-gray-200 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors duration-300">
              <FileText className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Organization</h3>
            <p className="text-gray-600 leading-relaxed">
              Intelligent categorization and search capabilities make finding and managing content effortless.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-blue-600 rounded-3xl p-12 text-white relative overflow-hidden border border-blue-700 shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-300/10 rounded-full blur-2xl"></div>
          
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Create Blog Articles?</h2>
            <p className="text-xl mb-10 text-blue-100 leading-relaxed">
              Start building your blog with our mini-CMS featuring complete CRUD operations and intuitive article management.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/articles/new"
                className="group inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-2xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
              >
                <Edit className="w-5 h-5 mr-2" />
                Create Your First Blog Article
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/editor"
                className="group inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
              >
                <FileText className="w-5 h-5 mr-2" />
                Try Tree Editor
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
