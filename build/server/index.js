import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, redirect, useFetcher } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { BookOpen, Home, FileText, Edit3, X, Menu, Sparkles, Edit, ArrowRight, List, Zap, Globe, Plus, Search, Filter, Tag, Eye, Trash2, ChevronUp, ChevronDown, Type, Bold, Italic, AlignLeft, ListOrdered, Quote, Undo, Redo, Link2, Loader2, Save, ArrowLeft, ChevronRight, FolderOpen, Folder, File } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout$1({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout: Layout$1,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigation = [{
    name: "Dashboard",
    href: "/",
    icon: Home
  }, {
    name: "Articles",
    href: "/articles",
    icon: FileText
  }, {
    name: "Editor",
    href: "/editor",
    icon: Edit3
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-50",
    children: [/* @__PURE__ */ jsxs("header", {
      className: "bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50",
      children: [/* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex justify-between items-center h-20",
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex items-center",
            children: /* @__PURE__ */ jsxs(Link, {
              to: "/",
              className: "flex items-center space-x-4 group",
              children: [/* @__PURE__ */ jsx("div", {
                className: "p-3 bg-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105",
                children: /* @__PURE__ */ jsx(BookOpen, {
                  className: "w-7 h-7 text-white"
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("h1", {
                  className: "text-2xl font-bold text-gray-900",
                  children: "EdTech CMS"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 -mt-1",
                  children: "Content Management"
                })]
              })]
            })
          }), /* @__PURE__ */ jsx("nav", {
            className: "hidden md:flex items-center space-x-2",
            children: navigation.map((item) => {
              const Icon = item.icon;
              return /* @__PURE__ */ jsxs(Link, {
                to: item.href,
                className: "flex items-center px-6 py-3 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group",
                children: [/* @__PURE__ */ jsx(Icon, {
                  className: "w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200"
                }), item.name]
              }, item.name);
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "md:hidden",
            children: /* @__PURE__ */ jsx("button", {
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
              className: "p-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200",
              children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, {
                className: "w-6 h-6"
              }) : /* @__PURE__ */ jsx(Menu, {
                className: "w-6 h-6"
              })
            })
          })]
        })
      }), isMobileMenuOpen && /* @__PURE__ */ jsx("div", {
        className: "md:hidden bg-white border-t border-gray-200",
        children: /* @__PURE__ */ jsx("div", {
          className: "px-6 py-4 space-y-2",
          children: navigation.map((item) => {
            const Icon = item.icon;
            return /* @__PURE__ */ jsxs(Link, {
              to: item.href,
              onClick: () => setIsMobileMenuOpen(false),
              className: "flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200",
              children: [/* @__PURE__ */ jsx(Icon, {
                className: "w-5 h-5 mr-3"
              }), item.name]
            }, item.name);
          })
        })
      })]
    }), /* @__PURE__ */ jsx("main", {
      className: "max-w-7xl mx-auto py-12 px-6 lg:px-8",
      children: /* @__PURE__ */ jsx("div", {
        className: "bg-white rounded-3xl shadow-xl border border-gray-200 min-h-[calc(100vh-12rem)]",
        children: /* @__PURE__ */ jsx("div", {
          className: "p-8 lg:p-12",
          children: /* @__PURE__ */ jsx(Outlet, {})
        })
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "fixed top-1/2 -left-4 w-8 h-20 bg-purple-300 rounded-r-full opacity-20"
    }), /* @__PURE__ */ jsx("div", {
      className: "fixed top-1/4 -right-4 w-8 h-16 bg-blue-300 rounded-l-full opacity-20"
    })]
  });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout
}, Symbol.toStringTag, { value: "Module" }));
function meta$5({}) {
  return [{
    title: "EdTech CMS - Empower Education"
  }, {
    name: "description",
    content: "Transform educational content creation with our modern CMS platform"
  }];
}
const home = UNSAFE_withComponentProps(function Home2() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-50",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "relative overflow-hidden bg-white",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "absolute inset-0",
        children: [/* @__PURE__ */ jsx("div", {
          className: "absolute top-20 left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-xl"
        }), /* @__PURE__ */ jsx("div", {
          className: "absolute top-40 right-20 w-24 h-24 bg-blue-300/30 rounded-full blur-lg"
        }), /* @__PURE__ */ jsx("div", {
          className: "absolute bottom-20 left-1/3 w-40 h-40 bg-indigo-200/20 rounded-full blur-2xl"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "relative max-w-6xl mx-auto px-6 lg:px-8 py-20 text-center",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "mb-12",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "inline-flex items-center px-6 py-3 bg-blue-50 rounded-full border border-blue-200 mb-8",
            children: [/* @__PURE__ */ jsx(Sparkles, {
              className: "w-5 h-5 text-blue-600 mr-2"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-gray-900 font-medium",
              children: "Mini-CMS for Blog Articles"
            })]
          }), /* @__PURE__ */ jsxs("h1", {
            className: "text-5xl md:text-7xl font-bold mb-8 tracking-tight",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-gray-900",
              children: "Create & Manage"
            }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
              className: "text-blue-600",
              children: "Blog Articles"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12",
            children: "A powerful mini-CMS that supports complete CRUD operations for blog articles. Create, read, update, and delete articles with our intuitive table management and rich text editor."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col sm:flex-row gap-6 justify-center mb-20",
          children: [/* @__PURE__ */ jsxs(Link, {
            to: "/articles/new",
            className: "group inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold",
            children: [/* @__PURE__ */ jsx(Edit, {
              className: "w-5 h-5 mr-2"
            }), "Create Blog Article", /* @__PURE__ */ jsx(ArrowRight, {
              className: "w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
            })]
          }), /* @__PURE__ */ jsxs(Link, {
            to: "/editor",
            className: "group inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold",
            children: [/* @__PURE__ */ jsx(FileText, {
              className: "w-5 h-5 mr-2"
            }), "Tree Editor", /* @__PURE__ */ jsx(ArrowRight, {
              className: "w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
            })]
          }), /* @__PURE__ */ jsxs(Link, {
            to: "/articles",
            className: "group inline-flex items-center px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold",
            children: [/* @__PURE__ */ jsx(List, {
              className: "w-5 h-5 mr-2"
            }), "Manage Articles", /* @__PURE__ */ jsx(ArrowRight, {
              className: "w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
            })]
          })]
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "max-w-6xl mx-auto px-6 lg:px-8 py-20",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center mb-16",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-4xl font-bold text-gray-900 mb-6",
          children: "Complete CRUD Operations"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl text-gray-600 max-w-2xl mx-auto",
          children: "Everything you need to create, manage, and update blog articles"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "group p-8 bg-white rounded-3xl border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300",
            children: /* @__PURE__ */ jsx(Edit, {
              className: "w-8 h-8 text-blue-600"
            })
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold text-gray-900 mb-4",
            children: "Text Editor"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600 leading-relaxed",
            children: "Create and update blog articles with our rich text editor featuring formatting tools and real-time editing capabilities."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "group p-8 bg-white rounded-3xl border border-gray-200 hover:border-purple-200 transition-all duration-300 hover:shadow-xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors duration-300",
            children: /* @__PURE__ */ jsx(List, {
              className: "w-8 h-8 text-purple-600"
            })
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold text-gray-900 mb-4",
            children: "Table List View"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600 leading-relaxed",
            children: "Manage all your blog articles in a comprehensive table view with sorting, filtering, and easy access to edit or delete operations."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "group p-8 bg-white rounded-3xl border border-gray-200 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors duration-300",
            children: /* @__PURE__ */ jsx(FileText, {
              className: "w-8 h-8 text-indigo-600"
            })
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold text-gray-900 mb-4",
            children: "CRUD Operations"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600 leading-relaxed",
            children: "Full Create, Read, Update, and Delete functionality for blog articles with intuitive controls and seamless data management."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "group p-8 bg-white rounded-3xl border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300",
            children: /* @__PURE__ */ jsx(Zap, {
              className: "w-8 h-8 text-blue-600"
            })
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold text-gray-900 mb-4",
            children: "Lightning Fast"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600 leading-relaxed",
            children: "Built for speed with modern technologies ensuring quick load times and smooth user experience."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "group p-8 bg-white rounded-3xl border border-gray-200 hover:border-purple-200 transition-all duration-300 hover:shadow-xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors duration-300",
            children: /* @__PURE__ */ jsx(Globe, {
              className: "w-8 h-8 text-purple-600"
            })
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold text-gray-900 mb-4",
            children: "Global Access"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600 leading-relaxed",
            children: "Cloud-based platform accessible from anywhere, ensuring your content reaches students worldwide."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "group p-8 bg-white rounded-3xl border border-gray-200 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors duration-300",
            children: /* @__PURE__ */ jsx(FileText, {
              className: "w-8 h-8 text-indigo-600"
            })
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold text-gray-900 mb-4",
            children: "Smart Organization"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600 leading-relaxed",
            children: "Intelligent categorization and search capabilities make finding and managing content effortless."
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "max-w-4xl mx-auto px-6 lg:px-8 py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "bg-blue-600 rounded-3xl p-12 text-white relative overflow-hidden border border-blue-700 shadow-2xl",
        children: [/* @__PURE__ */ jsx("div", {
          className: "absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        }), /* @__PURE__ */ jsx("div", {
          className: "absolute bottom-0 left-0 w-48 h-48 bg-purple-300/10 rounded-full blur-2xl"
        }), /* @__PURE__ */ jsxs("div", {
          className: "relative",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-4xl md:text-5xl font-bold mb-6 text-white",
            children: "Ready to Create Blog Articles?"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl mb-10 text-blue-100 leading-relaxed",
            children: "Start building your blog with our mini-CMS featuring complete CRUD operations and intuitive article management."
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col sm:flex-row gap-6 justify-center",
            children: [/* @__PURE__ */ jsxs(Link, {
              to: "/articles/new",
              className: "group inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-2xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl",
              children: [/* @__PURE__ */ jsx(Edit, {
                className: "w-5 h-5 mr-2"
              }), "Create Your First Blog Article", /* @__PURE__ */ jsx(ArrowRight, {
                className: "w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              })]
            }), /* @__PURE__ */ jsxs(Link, {
              to: "/editor",
              className: "group inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl",
              children: [/* @__PURE__ */ jsx(FileText, {
                className: "w-5 h-5 mr-2"
              }), "Try Tree Editor", /* @__PURE__ */ jsx(ArrowRight, {
                className: "w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              })]
            })]
          })]
        })]
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const statusColors = {
  draft: "bg-green-100 text-green-800 border-green-200",
  active: "bg-blue-100 text-blue-800 border-blue-200",
  amendment: "bg-purple-100 text-purple-800 border-purple-200",
  upcoming: "bg-yellow-100 text-yellow-800 border-yellow-200"
};
const statusLabels = {
  draft: "Draft",
  active: "Active",
  amendment: "Amendment",
  upcoming: "Upcoming"
};
function ArticleTableView({ articles: articles2, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortField, setSortField] = useState("updatedAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const categories = [...new Set(articles2.map((article) => article.category))];
  const statuses = ["draft", "active", "amendment", "upcoming"];
  const filteredArticles = articles2.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || article.category === selectedCategory;
    const matchesStatus = selectedStatus === "" || article.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    if (sortField === "createdAt" || sortField === "updatedAt" || sortField === "dueDate") {
      const aTime = aValue ? new Date(aValue).getTime() : 0;
      const bTime = bValue ? new Date(bValue).getTime() : 0;
      aValue = aTime;
      bValue = bTime;
    }
    if (aValue === null || aValue === void 0) aValue = "";
    if (bValue === null || bValue === void 0) bValue = "";
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = sortedArticles.slice(startIndex, startIndex + itemsPerPage);
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this article?")) {
      onDelete(id);
    }
  };
  const getDueDateStatus = (dueDate, status) => {
    if (!dueDate || status === "active") return null;
    const due = new Date(dueDate);
    const now = /* @__PURE__ */ new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    if (diffDays < 0) return { label: "Past Due", class: "text-red-600 font-semibold" };
    if (diffDays === 0) return { label: "Due Today", class: "text-orange-600 font-semibold" };
    if (diffDays <= 7) return { label: `In ${diffDays} days`, class: "text-yellow-600 font-semibold" };
    if (diffDays <= 30) return { label: `In ${diffDays} days`, class: "text-blue-600" };
    return { label: `In ${diffDays} days`, class: "text-gray-600" };
  };
  const SortIcon = ({ field }) => {
    if (sortField !== field) return /* @__PURE__ */ jsx("div", { className: "w-4 h-4" });
    return sortDirection === "asc" ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-4 h-4 text-blue-600" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-blue-600" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white border-b border-gray-200", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "My Articles" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: "Manage your educational content" })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/articles/new",
          className: "inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5 mr-2" }),
            "Create Article"
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 lg:px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 border border-gray-200 shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-6 flex-wrap", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setSelectedStatus(""),
            className: `px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${selectedStatus === "" ? "bg-blue-100 text-blue-700 border border-blue-200" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"}`,
            children: [
              "All (",
              articles2.length,
              ")"
            ]
          }
        ),
        statuses.map((status) => {
          const count = articles2.filter((a) => a.status === status).length;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setSelectedStatus(status),
              className: `px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${selectedStatus === status ? `${statusColors[status]}` : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`,
              children: [
                statusLabels[status],
                " (",
                count,
                ")"
              ]
            },
            status
          );
        })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Filter by title or category...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:w-64", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Filter, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: selectedCategory,
              onChange: (e) => setSelectedCategory(e.target.value),
              className: "w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white appearance-none",
              title: "Filter by category",
              "aria-label": "Filter articles by category",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "All Categories" }),
                categories.map((category) => /* @__PURE__ */ jsx("option", { value: category, children: category }, category))
              ]
            }
          )
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 lg:px-8 pb-12", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden", children: paginatedArticles.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-16", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(FileText, { className: "w-10 h-10 text-gray-400" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "No articles found" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-8", children: searchTerm || selectedCategory || selectedStatus ? "Try adjusting your search or filter criteria." : "Get started by creating your first article." }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/articles/new",
          className: "inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5 mr-2" }),
            "Create Article"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border-b border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-4 p-4 text-sm font-semibold text-gray-600 uppercase tracking-wide", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-4", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleSort("title"),
            className: "flex items-center gap-2 hover:text-gray-900 transition-colors",
            children: [
              "Title ",
              /* @__PURE__ */ jsx(SortIcon, { field: "title" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleSort("createdAt"),
            className: "flex items-center gap-2 hover:text-gray-900 transition-colors",
            children: [
              "Date ",
              /* @__PURE__ */ jsx(SortIcon, { field: "createdAt" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleSort("updatedAt"),
            className: "flex items-center gap-2 hover:text-gray-900 transition-colors",
            children: [
              "Updated ",
              /* @__PURE__ */ jsx(SortIcon, { field: "updatedAt" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleSort("category"),
            className: "flex items-center gap-2 hover:text-gray-900 transition-colors",
            children: [
              "Category ",
              /* @__PURE__ */ jsx(SortIcon, { field: "category" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleSort("status"),
            className: "flex items-center gap-2 hover:text-gray-900 transition-colors",
            children: [
              "Status ",
              /* @__PURE__ */ jsx(SortIcon, { field: "status" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-1 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-200", children: paginatedArticles.map((article) => {
        const dueDateStatus = getDueDateStatus(article.dueDate, article.status);
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors",
            children: [
              /* @__PURE__ */ jsx("div", { className: "col-span-4", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: `/articles/${article.id}`,
                    className: "font-semibold text-gray-900 hover:text-blue-600 transition-colors",
                    children: article.title
                  }
                ),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mt-1", children: [
                  "/",
                  article.slug
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
                dueDateStatus ? /* @__PURE__ */ jsx("span", { className: dueDateStatus.class, children: dueDateStatus.label }) : new Date(article.createdAt).toLocaleDateString(),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: new Date(article.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                }) })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
                "Last Update: ",
                new Date(article.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200", children: [
                /* @__PURE__ */ jsx(Tag, { className: "w-3 h-3 mr-1" }),
                article.category
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[article.status]}`, children: statusLabels[article.status] }) }),
              /* @__PURE__ */ jsxs("div", { className: "col-span-1 flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: `/articles/${article.id}`,
                    className: "p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200",
                    title: "View Article",
                    children: /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: `/articles/${article.id}/edit`,
                    className: "p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200",
                    title: "Edit Article",
                    children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(article.id),
                    className: "p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200",
                    title: "Delete Article",
                    children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ]
          },
          article.id
        );
      }) }),
      totalPages > 1 && /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border-t border-gray-200 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
          "Showing ",
          startIndex + 1,
          "-",
          Math.min(startIndex + itemsPerPage, sortedArticles.length),
          " of ",
          sortedArticles.length,
          " articles"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setCurrentPage(currentPage - 1),
              disabled: currentPage === 1,
              className: "px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed",
              children: "Previous"
            }
          ),
          Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setCurrentPage(page),
              className: `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === page ? "bg-blue-100 text-blue-700 border border-blue-200" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`,
              children: page
            },
            page
          )),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setCurrentPage(currentPage + 1),
              disabled: currentPage === totalPages,
              className: "px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed",
              children: "Next"
            }
          )
        ] })
      ] }) })
    ] }) }) })
  ] });
}
let prisma;
if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.__prisma) {
      global.__prisma = new PrismaClient();
    }
    prisma = global.__prisma;
  }
} else {
  prisma = {};
}
async function createArticle(data) {
  const articleData = {
    title: data.title,
    slug: data.slug,
    content: data.content,
    category: data.category,
    parentId: data.parentId || null,
    status: data.status || "draft"
  };
  if (data.dueDate) {
    articleData.dueDate = new Date(data.dueDate).toISOString();
  }
  return prisma.article.create({
    data: articleData
  });
}
async function getArticles() {
  return prisma.article.findMany({
    orderBy: [
      { category: "asc" },
      { createdAt: "desc" }
    ],
    include: {
      children: true,
      parent: true
    }
  });
}
async function getArticlesTree() {
  const rootArticles = await prisma.article.findMany({
    where: {
      parentId: null
    },
    include: {
      children: {
        include: {
          children: true
        }
      }
    },
    orderBy: [
      { category: "asc" },
      { createdAt: "desc" }
    ]
  });
  return rootArticles;
}
async function getArticleById(id) {
  return prisma.article.findUnique({
    where: { id },
    include: {
      children: true,
      parent: true
    }
  });
}
async function updateArticle(data) {
  const { id, dueDate, ...updateData } = data;
  const articleData = { ...updateData };
  if (dueDate) {
    articleData.dueDate = new Date(dueDate).toISOString();
  }
  return prisma.article.update({
    where: { id },
    data: articleData
  });
}
async function deleteArticle(id) {
  return prisma.article.delete({
    where: { id }
  });
}
async function getCategories() {
  const articles2 = await prisma.article.findMany({
    select: { category: true },
    distinct: ["category"]
  });
  return articles2.map((article) => article.category);
}
function convertPrismaArticleToArticle(prismaArticle) {
  return {
    id: prismaArticle.id,
    title: prismaArticle.title,
    slug: prismaArticle.slug,
    content: prismaArticle.content ?? void 0,
    category: prismaArticle.category,
    status: prismaArticle.status || "draft",
    dueDate: prismaArticle.dueDate?.toISOString() ?? void 0,
    parentId: prismaArticle.parentId ?? void 0,
    createdAt: prismaArticle.createdAt.toISOString(),
    updatedAt: prismaArticle.updatedAt.toISOString(),
    children: prismaArticle.children?.map(convertPrismaArticleToArticle),
    parent: prismaArticle.parent ? convertPrismaArticleToArticle(prismaArticle.parent) : void 0
  };
}
function convertPrismaArticlesToArticles(prismaArticles) {
  return prismaArticles.map(convertPrismaArticleToArticle);
}
function meta$4({}) {
  return [{
    title: "Articles - EdTech CMS"
  }, {
    name: "description",
    content: "Manage your articles"
  }];
}
async function loader$4({
  request
}) {
  try {
    const prismaArticles = await getArticles();
    const articles2 = convertPrismaArticlesToArticles(prismaArticles);
    return {
      articles: articles2
    };
  } catch (error) {
    console.error("Failed to load articles:", error);
    return {
      articles: []
    };
  }
}
async function action$3({
  request
}) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const articleId = formData.get("articleId");
  if (intent === "delete" && typeof articleId === "string") {
    try {
      await deleteArticle(articleId);
      return redirect("/articles");
    } catch (error) {
      console.error("Failed to delete article:", error);
      return new Response(JSON.stringify({
        error: "Failed to delete article"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  }
  return null;
}
const articles = UNSAFE_withComponentProps(function Articles({
  loaderData
}) {
  const {
    articles: articles2
  } = loaderData;
  const handleDelete = (id) => {
    const form = new FormData();
    form.append("intent", "delete");
    form.append("articleId", id);
    fetch("/articles", {
      method: "POST",
      body: form
    }).then(() => {
      window.location.reload();
    });
  };
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx(ArticleTableView, {
      articles: articles2,
      onDelete: handleDelete
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  default: articles,
  loader: loader$4,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function RichTextEditor({ content, onChange, placeholder = "Start writing your content..." }) {
  const editor2 = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder
      })
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor: editor22 }) => {
      onChange(editor22.getHTML());
    }
  });
  useEffect(() => {
    if (editor2 && content !== editor2.getHTML()) {
      editor2.commands.setContent(content);
    }
  }, [content, editor2]);
  if (!editor2) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl border border-[#9DD9D2]/50 p-6 shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "animate-pulse", children: [
      /* @__PURE__ */ jsx("div", { className: "h-12 bg-[#9DD9D2]/20 rounded-lg mb-4" }),
      /* @__PURE__ */ jsx("div", { className: "h-48 bg-[#9DD9D2]/20 rounded-lg" })
    ] }) });
  }
  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title
  }) => /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      title,
      className: `p-3 rounded-xl transition-all duration-200 ${isActive ? "bg-blue-100 text-blue-700 shadow-sm border border-blue-200" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-blue-200 hover:text-blue-600 hover:shadow-sm"}`,
      children
    }
  );
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mr-4", children: [
        /* @__PURE__ */ jsx(Type, { className: "w-5 h-5 text-gray-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-gray-900", children: "Format" })
      ] }),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor2.chain().focus().toggleBold().run(),
          isActive: editor2.isActive("bold"),
          title: "Bold (Ctrl+B)",
          children: /* @__PURE__ */ jsx(Bold, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor2.chain().focus().toggleItalic().run(),
          isActive: editor2.isActive("italic"),
          title: "Italic (Ctrl+I)",
          children: /* @__PURE__ */ jsx(Italic, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-gray-300 mx-2" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mr-4", children: [
        /* @__PURE__ */ jsx(AlignLeft, { className: "w-5 h-5 text-gray-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-gray-900", children: "Lists" })
      ] }),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor2.chain().focus().toggleBulletList().run(),
          isActive: editor2.isActive("bulletList"),
          title: "Bullet List",
          children: /* @__PURE__ */ jsx(List, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor2.chain().focus().toggleOrderedList().run(),
          isActive: editor2.isActive("orderedList"),
          title: "Numbered List",
          children: /* @__PURE__ */ jsx(ListOrdered, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor2.chain().focus().toggleBlockquote().run(),
          isActive: editor2.isActive("blockquote"),
          title: "Quote",
          children: /* @__PURE__ */ jsx(Quote, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-gray-300 mx-2" }),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor2.chain().focus().undo().run(),
          title: "Undo (Ctrl+Z)",
          children: /* @__PURE__ */ jsx(Undo, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor2.chain().focus().redo().run(),
          title: "Redo (Ctrl+Y)",
          children: /* @__PURE__ */ jsx(Redo, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "prose prose-slate max-w-none", children: /* @__PURE__ */ jsx(
      EditorContent,
      {
        editor: editor2,
        className: "p-8 min-h-[500px] focus:outline-none text-gray-900 leading-relaxed"
      }
    ) })
  ] });
}
function ArticleForm({
  article,
  categories,
  onSubmit,
  onCancel,
  isSubmitting = false
}) {
  const [formData, setFormData] = useState({
    title: article?.title || "",
    slug: article?.slug || "",
    content: article?.content || "",
    category: article?.category || "",
    status: article?.status || "draft",
    dueDate: article?.dueDate ? new Date(article.dueDate).toISOString().split("T")[0] : "",
    parentId: article?.parent?.id || ""
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (formData.title && !article) {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, article]);
  const validateForm = () => {
    const newErrors = {};
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: void 0 }));
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-6 lg:px-8 py-12", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg border border-gray-200 p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Article Details" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "title", className: "block text-sm font-semibold text-gray-900 mb-3", children: "Title *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "title",
              value: formData.title,
              onChange: (e) => handleChange("title", e.target.value),
              placeholder: "Enter a compelling title...",
              className: `w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.title ? "border-red-300 bg-red-50" : "border-gray-300 bg-white hover:border-gray-400"}`
            }
          ),
          errors.title && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "slug", className: "block text-sm font-semibold text-gray-900 mb-3", children: [
            /* @__PURE__ */ jsx(Link2, { className: "w-4 h-4 inline mr-1" }),
            "URL Slug *"
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "slug",
              value: formData.slug,
              onChange: (e) => handleChange("slug", e.target.value),
              placeholder: "url-friendly-slug",
              className: `w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.slug ? "border-red-300 bg-red-50" : "border-gray-300 bg-white hover:border-gray-400"}`
            }
          ),
          errors.slug && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.slug })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "category", className: "block text-sm font-semibold text-gray-900 mb-3", children: [
            /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4 inline mr-1" }),
            "Category *"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "category",
                value: formData.category,
                onChange: (e) => handleChange("category", e.target.value),
                className: `w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 appearance-none ${errors.category ? "border-red-300 bg-red-50" : "border-gray-300 bg-white hover:border-gray-400"}`,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select a category" }),
                  categories.map((category) => /* @__PURE__ */ jsx("option", { value: category, children: category }, category))
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Or create a new category:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.category,
                onChange: (e) => handleChange("category", e.target.value),
                placeholder: "Enter new category name",
                className: `w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.category ? "border-red-300 bg-red-50" : "border-gray-300 bg-white hover:border-gray-400"}`
              }
            )
          ] }),
          errors.category && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.category })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "status", className: "block text-sm font-semibold text-gray-900 mb-3", children: "Status *" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "status",
              value: formData.status,
              onChange: (e) => handleChange("status", e.target.value),
              className: "w-full px-4 py-4 border border-gray-300 bg-white hover:border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 appearance-none",
              children: [
                /* @__PURE__ */ jsx("option", { value: "draft", children: "Draft" }),
                /* @__PURE__ */ jsx("option", { value: "active", children: "Active" }),
                /* @__PURE__ */ jsx("option", { value: "amendment", children: "Amendment" }),
                /* @__PURE__ */ jsx("option", { value: "upcoming", children: "Upcoming" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "dueDate", className: "block text-sm font-semibold text-gray-900 mb-3", children: "Due Date" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              id: "dueDate",
              value: formData.dueDate,
              onChange: (e) => handleChange("dueDate", e.target.value),
              className: "w-full px-4 py-4 border border-gray-300 bg-white hover:border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg border border-gray-200 p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Content" }),
      /* @__PURE__ */ jsx(
        RichTextEditor,
        {
          content: formData.content,
          onChange: (content) => handleChange("content", content),
          placeholder: "Start writing your article content..."
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-end", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: "px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold",
          children: [
            /* @__PURE__ */ jsx(X, { className: "w-5 h-5 mr-2 inline" }),
            "Cancel"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isSubmitting,
          className: "px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl font-semibold",
          children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 mr-2 inline animate-spin" }),
            "Saving..."
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Save, { className: "w-5 h-5 mr-2 inline" }),
            article ? "Update Article" : "Create Article"
          ] })
        }
      )
    ] })
  ] }) }) });
}
function meta$3({}) {
  return [{
    title: "New Article - EdTech CMS"
  }, {
    name: "description",
    content: "Create a new article"
  }];
}
async function loader$3({
  request
}) {
  try {
    const categories = await getCategories();
    return {
      categories
    };
  } catch (error) {
    console.error("Failed to load categories:", error);
    return {
      categories: []
    };
  }
}
async function action$2({
  request
}) {
  const formData = await request.formData();
  const articleData = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    category: formData.get("category"),
    parentId: formData.get("parentId") || void 0,
    status: formData.get("status") || "draft",
    dueDate: formData.get("dueDate") || void 0
  };
  try {
    const article = await createArticle(articleData);
    return redirect("/articles");
  } catch (error) {
    console.error("Failed to create article:", error);
    return new Response(JSON.stringify({
      error: "Failed to create article"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
const articles_new = UNSAFE_withComponentProps(function NewArticle({
  loaderData
}) {
  const {
    categories
  } = loaderData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    try {
      const response = await fetch("/articles/new", {
        method: "POST",
        body: formData
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
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx(ArticleForm, {
      categories,
      onSubmit: handleSubmit,
      onCancel: handleCancel,
      isSubmitting
    })
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: articles_new,
  loader: loader$3,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({
  params
}) {
  return [{
    title: "Article - EdTech CMS"
  }, {
    name: "description",
    content: "View article"
  }];
}
async function loader$2({
  params
}) {
  const {
    id
  } = params;
  try {
    const prismaArticle = await getArticleById(id);
    if (!prismaArticle) {
      throw new Response("Article not found", {
        status: 404
      });
    }
    const article = convertPrismaArticleToArticle(prismaArticle);
    return {
      article
    };
    return {
      article
    };
  } catch (error) {
    console.error("Failed to load article:", error);
    throw new Response("Article not found", {
      status: 404
    });
  }
}
const articles_$id = UNSAFE_withComponentProps(function ArticleView({
  loaderData
}) {
  const {
    article
  } = loaderData;
  return /* @__PURE__ */ jsxs("div", {
    className: "max-w-4xl mx-auto",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex items-center justify-between mb-8",
      children: [/* @__PURE__ */ jsx("div", {
        className: "flex items-center",
        children: /* @__PURE__ */ jsxs(Link, {
          to: "/articles",
          className: "inline-flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 mr-6 rounded-lg hover:bg-blue-50 font-medium",
          children: [/* @__PURE__ */ jsx(ArrowLeft, {
            className: "w-4 h-4 mr-2"
          }), "Back to Articles"]
        })
      }), /* @__PURE__ */ jsxs(Link, {
        to: `/articles/${article.id}/edit`,
        className: "inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold",
        children: [/* @__PURE__ */ jsx(Edit, {
          className: "w-4 h-4 mr-2"
        }), "Edit Article"]
      })]
    }), /* @__PURE__ */ jsxs("article", {
      className: "bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-8 border-b border-gray-100",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex items-start justify-between mb-6",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex items-center space-x-3",
            children: [/* @__PURE__ */ jsx("span", {
              className: "inline-flex px-4 py-2 text-sm font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200",
              children: article.category
            }), article.status && /* @__PURE__ */ jsx("span", {
              className: `inline-flex px-4 py-2 text-sm font-semibold rounded-full ${article.status === "active" ? "bg-green-100 text-green-700 border border-green-200" : article.status === "draft" ? "bg-yellow-100 text-yellow-700 border border-yellow-200" : article.status === "amendment" ? "bg-orange-100 text-orange-700 border border-orange-200" : "bg-purple-100 text-purple-700 border border-purple-200"}`,
              children: article.status
            })]
          })
        }), /* @__PURE__ */ jsx("h1", {
          className: "text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight",
          children: article.title
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-wrap items-center text-sm text-gray-600 gap-6",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center",
            children: [/* @__PURE__ */ jsx("span", {
              className: "font-medium",
              children: "Created:"
            }), /* @__PURE__ */ jsx("span", {
              className: "ml-2",
              children: new Date(article.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })
            })]
          }), /* @__PURE__ */ jsx("span", {
            className: "text-gray-400",
            children: "•"
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center",
            children: [/* @__PURE__ */ jsx("span", {
              className: "font-medium",
              children: "Updated:"
            }), /* @__PURE__ */ jsx("span", {
              className: "ml-2",
              children: new Date(article.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })
            })]
          }), article.dueDate && /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-gray-400",
              children: "•"
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "font-medium",
                children: "Due:"
              }), /* @__PURE__ */ jsx("span", {
                className: "ml-2",
                children: new Date(article.dueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })
              })]
            })]
          }), /* @__PURE__ */ jsx("span", {
            className: "text-gray-400",
            children: "•"
          }), /* @__PURE__ */ jsxs("span", {
            className: "font-mono text-purple-600 font-medium",
            children: ["/", article.slug]
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "p-8 lg:p-12",
        children: /* @__PURE__ */ jsx("div", {
          className: "prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700",
          children: article.content ? /* @__PURE__ */ jsx("div", {
            dangerouslySetInnerHTML: {
              __html: article.content
            }
          }) : /* @__PURE__ */ jsxs("div", {
            className: "text-center py-12",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center",
              children: /* @__PURE__ */ jsx(Edit, {
                className: "w-10 h-10 text-gray-400"
              })
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-500 italic text-lg mb-4",
              children: "No content available"
            }), /* @__PURE__ */ jsxs(Link, {
              to: `/articles/${article.id}/edit`,
              className: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
              children: [/* @__PURE__ */ jsx(Edit, {
                className: "w-4 h-4 mr-2"
              }), "Add Content"]
            })]
          })
        })
      }), article.children && article.children.length > 0 && /* @__PURE__ */ jsxs("div", {
        className: "border-t border-gray-200 p-8 lg:p-12 bg-gray-50",
        children: [/* @__PURE__ */ jsx("h3", {
          className: "text-2xl font-bold text-gray-900 mb-6",
          children: "Related Articles"
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-6",
          children: article.children.map((child) => /* @__PURE__ */ jsxs(Link, {
            to: `/articles/${child.id}`,
            className: "block p-6 bg-white border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 group shadow-sm hover:shadow-md",
            children: [/* @__PURE__ */ jsx("h4", {
              className: "font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2",
              children: child.title
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-600",
              children: child.category
            }), child.status && /* @__PURE__ */ jsx("span", {
              className: `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-3 ${child.status === "active" ? "bg-green-100 text-green-700" : child.status === "draft" ? "bg-yellow-100 text-yellow-700" : child.status === "amendment" ? "bg-orange-100 text-orange-700" : "bg-purple-100 text-purple-700"}`,
              children: child.status
            })]
          }, child.id))
        })]
      })]
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: articles_$id,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({
  params
}) {
  return [{
    title: "Edit Article - EdTech CMS"
  }, {
    name: "description",
    content: "Edit article"
  }];
}
async function loader$1({
  params
}) {
  const {
    id
  } = params;
  try {
    const [prismaArticle, categories] = await Promise.all([getArticleById(id), getCategories()]);
    if (!prismaArticle) {
      throw new Response("Article not found", {
        status: 404
      });
    }
    const article = convertPrismaArticleToArticle(prismaArticle);
    return {
      article,
      categories
    };
  } catch (error) {
    console.error("Failed to load article:", error);
    throw new Response("Article not found", {
      status: 404
    });
  }
}
async function action$1({
  params,
  request
}) {
  const {
    id
  } = params;
  const formData = await request.formData();
  const articleData = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    category: formData.get("category"),
    parentId: formData.get("parentId") || void 0,
    status: formData.get("status") || "draft",
    dueDate: formData.get("dueDate") || void 0
  };
  try {
    await updateArticle({
      id,
      ...articleData
    });
    return redirect("/articles");
  } catch (error) {
    console.error("Failed to update article:", error);
    return new Response(JSON.stringify({
      error: "Failed to update article"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
const articles_$id_edit = UNSAFE_withComponentProps(function EditArticle({
  loaderData
}) {
  const {
    article,
    categories
  } = loaderData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    try {
      const response = await fetch(`/articles/${article.id}/edit`, {
        method: "POST",
        body: formData
      });
      if (response.redirected) {
        window.location.href = response.url;
      } else if (!response.ok) {
        throw new Error("Failed to update article");
      }
    } catch (error) {
      console.error("Failed to update article:", error);
      alert("Failed to update article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCancel = () => {
    window.history.back();
  };
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx(ArticleForm, {
      article,
      categories,
      onSubmit: handleSubmit,
      onCancel: handleCancel,
      isSubmitting
    })
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: articles_$id_edit,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function TreeNavigation({ articles: articles2, onArticleSelect, selectedArticleId }) {
  const articlesByCategory = articles2.reduce((acc, article) => {
    if (!article.parentId) {
      const category = article.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(article);
    }
    return acc;
  }, {});
  const [expandedCategories, setExpandedCategories] = useState(
    new Set(Object.keys(articlesByCategory))
  );
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-3", children: [
    Object.entries(articlesByCategory).map(([category, categoryArticles]) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: `w-full flex items-center py-3 px-4 cursor-pointer rounded-xl transition-all duration-300 group border ${expandedCategories.has(category) ? "bg-blue-50 border-blue-200 shadow-sm" : "bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:shadow-sm"}`,
          onClick: () => toggleCategory(category),
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: "transition-transform duration-200", children: expandedCategories.has(category) ? /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 mr-3 text-blue-600" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 mr-3 text-gray-500 group-hover:text-blue-600" }) }),
            /* @__PURE__ */ jsx("div", { className: "p-2 rounded-lg mr-3 transition-colors duration-200 bg-blue-100 group-hover:bg-blue-200", children: expandedCategories.has(category) ? /* @__PURE__ */ jsx(FolderOpen, { className: "w-4 h-4 text-blue-600" }) : /* @__PURE__ */ jsx(Folder, { className: "w-4 h-4 text-blue-600" }) }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors duration-200", children: category }),
            /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center space-x-2", children: /* @__PURE__ */ jsx("span", { className: `text-xs font-medium px-2 py-1 rounded-full transition-colors duration-200 ${expandedCategories.has(category) ? "bg-blue-100 text-blue-700" : "bg-white text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700"}`, children: categoryArticles.length }) })
          ] })
        }
      ),
      expandedCategories.has(category) && /* @__PURE__ */ jsx("div", { className: "ml-4 space-y-1", children: categoryArticles.map((article) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `flex items-center py-3 px-4 cursor-pointer rounded-xl transition-all duration-300 group border ${article.id === selectedArticleId ? "bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200 shadow-md transform scale-[1.02]" : "bg-white border-gray-100 hover:bg-blue-50 hover:border-blue-200 hover:shadow-md hover:transform hover:scale-[1.01]"}`,
          onClick: (e) => {
            e.stopPropagation();
            onArticleSelect(article);
          },
          children: [
            /* @__PURE__ */ jsx("div", { className: "p-2 rounded-lg mr-3 transition-colors duration-200 bg-purple-100 group-hover:bg-purple-200", children: /* @__PURE__ */ jsx(File, { className: "w-3 h-3 text-purple-600" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: `truncate text-sm font-medium transition-colors duration-200 ${article.id === selectedArticleId ? "text-blue-900" : "text-gray-900 group-hover:text-blue-700"}`, children: article.title }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center mt-1 space-x-2", children: [
                article.status && /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${article.status === "active" ? "bg-green-50 text-green-700 border-green-200" : article.status === "draft" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : article.status === "amendment" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-purple-50 text-purple-700 border-purple-200"}`, children: [
                  /* @__PURE__ */ jsx("div", { className: `w-1.5 h-1.5 rounded-full mr-1 ${article.status === "active" ? "bg-green-500" : article.status === "draft" ? "bg-yellow-500" : article.status === "amendment" ? "bg-orange-500" : "bg-purple-500"}` }),
                  article.status
                ] }),
                article.updatedAt && /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: new Date(article.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                }) })
              ] })
            ] }),
            article.id === selectedArticleId && /* @__PURE__ */ jsx("div", { className: "ml-2", children: /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }) })
          ]
        },
        article.id
      )) })
    ] }, category)),
    Object.keys(articlesByCategory).length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 shadow-inner", children: /* @__PURE__ */ jsx(File, { className: "w-8 h-8 text-gray-400" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "No Articles Yet" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Create your first article to see it here" }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100", children: "Articles will be organized by category automatically" })
    ] })
  ] }) });
}
function meta({}) {
  return [{
    title: "Editor - EdTech CMS"
  }, {
    name: "description",
    content: "Tree-based article editor"
  }];
}
async function action({
  request
}) {
  const formData = await request.formData();
  const id = formData.get("id");
  const content = formData.get("content");
  try {
    await updateArticle({
      id,
      content
    });
    return {
      success: true
    };
  } catch (error) {
    console.error("Failed to update article:", error);
    return {
      success: false,
      error: "Failed to save article"
    };
  }
}
async function loader({
  request
}) {
  try {
    const prismaArticles = await getArticlesTree();
    const articles2 = convertPrismaArticlesToArticles(prismaArticles);
    return {
      articles: articles2
    };
  } catch (error) {
    console.error("Failed to load articles:", error);
    return {
      articles: []
    };
  }
}
const editor = UNSAFE_withComponentProps(function Editor({
  loaderData
}) {
  const {
    articles: articles2
  } = loaderData;
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [content, setContent] = useState("");
  const fetcher = useFetcher();
  const isSaving = fetcher.state === "submitting";
  useEffect(() => {
    if (selectedArticle) {
      console.log("Article selected, updating content:", selectedArticle.title);
      setContent(selectedArticle.content || "");
    }
  }, [selectedArticle]);
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        alert("Article saved successfully!");
        setSelectedArticle((prev) => prev ? {
          ...prev,
          content
        } : null);
      } else {
        alert(fetcher.data.error || "Failed to save article");
      }
    }
  }, [fetcher.data, content]);
  const handleArticleSelect = (article) => {
    console.log("Selecting article:", article.title);
    console.log("Article content:", article.content);
    setSelectedArticle(article);
    setContent(article.content || "");
  };
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };
  const handleSave = () => {
    if (!selectedArticle) return;
    const formData = new FormData();
    formData.append("id", selectedArticle.id);
    formData.append("content", content);
    fetcher.submit(formData, {
      method: "POST"
    });
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "h-screen flex bg-gray-50 overflow-hidden",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "w-80 bg-white border-r border-gray-200 shadow-xl flex flex-col overflow-hidden",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 flex-shrink-0",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center mb-3",
          children: [/* @__PURE__ */ jsx("div", {
            className: "p-3 bg-blue-600 rounded-xl mr-4 shadow-lg",
            children: /* @__PURE__ */ jsxs("svg", {
              className: "w-6 h-6 text-white",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: [/* @__PURE__ */ jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              }), /* @__PURE__ */ jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z"
              })]
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-xl font-bold text-gray-900",
              children: "Content Library"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-600",
              children: "Select an article to edit"
            })]
          })]
        }), articles2.length > 0 && /* @__PURE__ */ jsxs("div", {
          className: "text-xs text-gray-500 bg-white/50 px-3 py-2 rounded-lg border border-white/60",
          children: [articles2.length, " article", articles2.length !== 1 ? "s" : "", " available"]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "flex-1 overflow-y-auto scrollbar-hide",
        children: /* @__PURE__ */ jsx(TreeNavigation, {
          articles: articles2,
          onArticleSelect: handleArticleSelect,
          selectedArticleId: selectedArticle?.id
        })
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "flex-1 flex flex-col bg-white overflow-hidden",
      children: selectedArticle ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx("div", {
          className: "border-b border-gray-200 bg-gradient-to-r from-white to-gray-50/50 px-8 py-6 shadow-sm flex-shrink-0",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex items-center space-x-6",
              children: /* @__PURE__ */ jsxs("div", {
                className: "flex-1",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-4 mb-2",
                  children: [/* @__PURE__ */ jsx("h1", {
                    className: "text-2xl font-bold text-gray-900",
                    children: selectedArticle.title
                  }), selectedArticle.status && /* @__PURE__ */ jsxs("span", {
                    className: `inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${selectedArticle.status === "active" ? "bg-green-100 text-green-700 border border-green-200" : selectedArticle.status === "draft" ? "bg-yellow-100 text-yellow-700 border border-yellow-200" : selectedArticle.status === "amendment" ? "bg-orange-100 text-orange-700 border border-orange-200" : "bg-purple-100 text-purple-700 border border-purple-200"}`,
                    children: [/* @__PURE__ */ jsx("div", {
                      className: `w-2 h-2 rounded-full mr-2 ${selectedArticle.status === "active" ? "bg-green-500" : selectedArticle.status === "draft" ? "bg-yellow-500" : selectedArticle.status === "amendment" ? "bg-orange-500" : "bg-purple-500"}`
                    }), selectedArticle.status]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-6 text-sm text-gray-600",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "flex items-center",
                    children: /* @__PURE__ */ jsxs("span", {
                      className: "inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-xs",
                      children: [/* @__PURE__ */ jsx("svg", {
                        className: "w-3 h-3 mr-1",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        children: /* @__PURE__ */ jsx("path", {
                          fillRule: "evenodd",
                          d: "M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z",
                          clipRule: "evenodd"
                        })
                      }), selectedArticle.category]
                    })
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center",
                    children: [/* @__PURE__ */ jsx("svg", {
                      className: "w-4 h-4 mr-2 text-gray-400",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      })
                    }), /* @__PURE__ */ jsxs("span", {
                      className: "font-mono text-purple-600 font-medium",
                      children: ["/", selectedArticle.slug]
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center",
                    children: [/* @__PURE__ */ jsx("svg", {
                      className: "w-4 h-4 mr-2 text-gray-400",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    }), /* @__PURE__ */ jsxs("span", {
                      children: ["Updated ", new Date(selectedArticle.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric"
                      })]
                    })]
                  })]
                })]
              })
            }), /* @__PURE__ */ jsx("div", {
              className: "flex items-center space-x-3",
              children: /* @__PURE__ */ jsx("button", {
                onClick: handleSave,
                disabled: isSaving,
                className: "inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105",
                children: isSaving ? /* @__PURE__ */ jsxs(Fragment, {
                  children: [/* @__PURE__ */ jsxs("svg", {
                    className: "animate-spin -ml-1 mr-3 h-4 w-4 text-white",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: [/* @__PURE__ */ jsx("circle", {
                      className: "opacity-25",
                      cx: "12",
                      cy: "12",
                      r: "10",
                      stroke: "currentColor",
                      strokeWidth: "4"
                    }), /* @__PURE__ */ jsx("path", {
                      className: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    })]
                  }), "Saving..."]
                }) : /* @__PURE__ */ jsxs(Fragment, {
                  children: [/* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 mr-2",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                    })
                  }), "Save Changes"]
                })
              })
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "flex-1 overflow-hidden bg-gray-50",
          children: /* @__PURE__ */ jsx("div", {
            className: "h-full p-8",
            children: /* @__PURE__ */ jsx("div", {
              className: "h-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden",
              children: /* @__PURE__ */ jsx("div", {
                className: "h-full p-6 overflow-y-auto",
                children: /* @__PURE__ */ jsx(RichTextEditor, {
                  content,
                  onChange: handleContentChange,
                  placeholder: "Start writing your article content..."
                })
              })
            })
          })
        })]
      }) : /* @__PURE__ */ jsx("div", {
        className: "flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30",
        children: /* @__PURE__ */ jsxs("div", {
          className: "text-center p-12 max-w-lg",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg",
            children: /* @__PURE__ */ jsx("svg", {
              className: "w-16 h-16 text-blue-600",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 1.5,
                d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              })
            })
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold text-gray-900 mb-4",
            children: "Ready to Create Content?"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600 mb-8 leading-relaxed",
            children: "Select an article from the content library on the left to start editing. You can navigate through categories and choose any article to view and edit its content in the rich text editor."
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-white rounded-xl p-6 border border-gray-200 shadow-sm",
            children: [/* @__PURE__ */ jsx("h4", {
              className: "font-semibold text-gray-900 mb-3",
              children: "Quick Tips:"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-sm text-gray-600 space-y-2 text-left",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 mr-2 text-blue-500",
                  fill: "currentColor",
                  viewBox: "0 0 20 20",
                  children: /* @__PURE__ */ jsx("path", {
                    fillRule: "evenodd",
                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                    clipRule: "evenodd"
                  })
                }), "Expand categories to see articles"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 mr-2 text-blue-500",
                  fill: "currentColor",
                  viewBox: "0 0 20 20",
                  children: /* @__PURE__ */ jsx("path", {
                    fillRule: "evenodd",
                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                    clipRule: "evenodd"
                  })
                }), "Click any article to start editing"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 mr-2 text-blue-500",
                  fill: "currentColor",
                  viewBox: "0 0 20 20",
                  children: /* @__PURE__ */ jsx("path", {
                    fillRule: "evenodd",
                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                    clipRule: "evenodd"
                  })
                }), "Auto-save keeps your work safe"]
              })]
            })]
          })]
        })
      })
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: editor,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DTgyclKf.js", "imports": ["/assets/chunk-OIYGIGL5-DhW0zAkl.js", "/assets/index-BBefw_Qh.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-2srEMz9A.js", "imports": ["/assets/chunk-OIYGIGL5-DhW0zAkl.js", "/assets/index-BBefw_Qh.js"], "css": ["/assets/root-P9IpRdaf.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "components/Layout": { "id": "components/Layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/Layout-DDHYq64N.js", "imports": ["/assets/chunk-OIYGIGL5-DhW0zAkl.js", "/assets/createLucideIcon-DvTHDFVP.js", "/assets/file-text-72rw8F_m.js", "/assets/x-CV5Lq9Mb.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "components/Layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-CdmKlUKQ.js", "imports": ["/assets/chunk-OIYGIGL5-DhW0zAkl.js", "/assets/createLucideIcon-DvTHDFVP.js", "/assets/square-pen-DJNpU6I9.js", "/assets/file-text-72rw8F_m.js", "/assets/list-DUDElNus.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/articles": { "id": "routes/articles", "parentId": "components/Layout", "path": "articles", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/articles-C6NfhtYt.js", "imports": ["/assets/chunk-OIYGIGL5-DhW0zAkl.js", "/assets/createLucideIcon-DvTHDFVP.js", "/assets/file-text-72rw8F_m.js", "/assets/tag-CacXKHD8.js", "/assets/square-pen-DJNpU6I9.js", "/assets/chevron-down-SVzqfwsi.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/articles.new": { "id": "routes/articles.new", "parentId": "components/Layout", "path": "articles/new", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/articles.new-B6BWD3-2.js", "imports": ["/assets/chunk-OIYGIGL5-DhW0zAkl.js", "/assets/ArticleForm-CoJdQ6uk.js", "/assets/RichTextEditor-B_rsxs_f.js", "/assets/index-BBefw_Qh.js", "/assets/createLucideIcon-DvTHDFVP.js", "/assets/list-DUDElNus.js", "/assets/tag-CacXKHD8.js", "/assets/x-CV5Lq9Mb.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/articles.$id": { "id": "routes/articles.$id", "parentId": "components/Layout", "path": "articles/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/articles._id-CpMp-wzi.js", "imports": ["/assets/chunk-OIYGIGL5-DhW0zAkl.js", "/assets/createLucideIcon-DvTHDFVP.js", "/assets/square-pen-DJNpU6I9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/articles.$id.edit": { "id": "routes/articles.$id.edit", "parentId": "components/Layout", "path": "articles/:id/edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/articles._id.edit-Dfs92U9j.js", "imports": ["/assets/chunk-OIYGIGL5-DhW0zAkl.js", "/assets/ArticleForm-CoJdQ6uk.js", "/assets/RichTextEditor-B_rsxs_f.js", "/assets/index-BBefw_Qh.js", "/assets/createLucideIcon-DvTHDFVP.js", "/assets/list-DUDElNus.js", "/assets/tag-CacXKHD8.js", "/assets/x-CV5Lq9Mb.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/editor": { "id": "routes/editor", "parentId": "components/Layout", "path": "editor", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/editor-BJcqtWFZ.js", "imports": ["/assets/chunk-OIYGIGL5-DhW0zAkl.js", "/assets/chevron-down-SVzqfwsi.js", "/assets/createLucideIcon-DvTHDFVP.js", "/assets/RichTextEditor-B_rsxs_f.js", "/assets/index-BBefw_Qh.js", "/assets/list-DUDElNus.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-1b41a402.js", "version": "1b41a402", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "components/Layout": {
    id: "components/Layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/home": {
    id: "routes/home",
    parentId: "components/Layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/articles": {
    id: "routes/articles",
    parentId: "components/Layout",
    path: "articles",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/articles.new": {
    id: "routes/articles.new",
    parentId: "components/Layout",
    path: "articles/new",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/articles.$id": {
    id: "routes/articles.$id",
    parentId: "components/Layout",
    path: "articles/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/articles.$id.edit": {
    id: "routes/articles.$id.edit",
    parentId: "components/Layout",
    path: "articles/:id/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/editor": {
    id: "routes/editor",
    parentId: "components/Layout",
    path: "editor",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
