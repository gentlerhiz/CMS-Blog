# EdTech CMS - Content Management System

A modern, full-stack Content Management System built with React Router v7, Prisma, and Supabase. Features a professional tree-based editor, article status management, and a clean admin interface.

![EdTech CMS](https://img.shields.io/badge/Built%20with-React%20Router%20v7-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![Prisma](https://img.shields.io/badge/Database-Prisma%20%2B%20Supabase-green)

## ✨ Features

- 🌳 **Tree-based Navigation** - Hierarchical content organization by categories
- 📝 **Rich Text Editor** - Professional TipTap editor with formatting tools
- 📊 **Status Management** - Track articles through draft, active, amendment, and upcoming states
- 📋 **Enhanced Table View** - Sortable, filterable article list with pagination
- 🎨 **Modern Design** - Professional Design Academy color scheme
- 🚀 **Server-side Rendering** - Built on React Router v7 for optimal performance
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🔒 **TypeScript** - Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend**: React Router v7, TypeScript, Tailwind CSS
- **Editor**: TipTap Rich Text Editor
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account and project
- Git (for version control)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd edtech-cms
npm install
```

### 2. Environment Setup

Copy the environment example file:
```bash
cp .env.example .env
```

Update `.env` with your Supabase credentials:
```env
# Database URLs from your Supabase project settings
DATABASE_URL="postgresql://postgres.xxx:[PASSWORD]@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxx:[PASSWORD]@aws-1-us-east-1.pooler.supabase.com:5432/postgres"

# Optional: For future authentication features
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### 3. Database Setup

Initialize the database schema:
```bash
npx prisma migrate dev --name init
```

Generate the Prisma client:
```bash
npx prisma generate
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your CMS in action!

## 📁 Project Structure

```
edtech-cms/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── ArticleForm.tsx
│   │   ├── ArticleListView.tsx
│   │   ├── RichTextEditor.tsx
│   │   └── TreeNavigation.tsx
│   ├── lib/                 # Utility functions and API
│   │   ├── articles.ts      # Article CRUD operations
│   │   ├── prisma.ts        # Database client
│   │   └── typeConverters.ts
│   ├── routes/              # Page routes
│   │   ├── home.tsx         # Landing page
│   │   ├── articles.tsx     # Article list page
│   │   ├── editor.tsx       # Tree-based editor
│   │   └── create.tsx       # Article creation
│   ├── app.css             # Global styles
│   └── root.tsx            # App root component
├── prisma/
│   └── schema.prisma       # Database schema
├── vercel.json             # Vercel deployment config
└── package.json
```

## 🎯 Key Features Explained

### Tree Navigation Editor
- **Categories**: Articles are organized by categories
- **Hierarchical Structure**: Support for parent-child article relationships
- **Collapsible Interface**: Expand/collapse categories for better organization
- **Live Selection**: Click any article to edit it immediately

### Article Status Management
- **Draft**: Work-in-progress articles
- **Active**: Published and live articles
- **Amendment**: Articles under review/revision
- **Upcoming**: Scheduled future articles

### Rich Text Editor
- **Professional Toolbar**: Bold, italic, lists, quotes, and more
- **Placeholder Support**: Helpful writing prompts
- **Auto-save Ready**: Built for real-time content saving
- **SSR Compatible**: Works with server-side rendering

## 🚀 Deployment

### Deploy to Vercel

1. **Connect Repository**:
   ```bash
   # Push your code to GitHub/GitLab/Bitbucket
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Configure Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect React Router v7

3. **Set Environment Variables**:
   In your Vercel dashboard, add:
   - `DATABASE_URL`: Your Supabase connection string
   - `DIRECT_URL`: Your Supabase direct connection

4. **Deploy**:
   Vercel will automatically build and deploy your CMS.

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 🗄️ Database Management

### Migrations

Create a new migration:
```bash
npx prisma migrate dev --name your-migration-name
```

Apply migrations in production:
```bash
npx prisma migrate deploy
```

### Database Inspection

Open Prisma Studio to view/edit data:
```bash
npx prisma studio
```

Reset database (⚠️ destructive):
```bash
npx prisma migrate reset
```

## 🎨 Customization

### Styling
- Colors: Modify `app.css` for global color scheme
- Components: Each component uses Tailwind CSS classes
- Design System: Based on Design Academy professional colors

### Adding Features
- **New Routes**: Add files to `app/routes/`
- **Components**: Create in `app/components/`
- **Database**: Modify `prisma/schema.prisma`

## 🐛 Troubleshooting

### Common Issues

**Hydration Mismatch Errors**:
- These are typically browser extension related and don't affect functionality
- Disable browser extensions if needed during development

**Database Connection Issues**:
- Verify your DATABASE_URL is correct
- Check Supabase project status
- Ensure you've run `prisma generate`

**Build Errors**:
- Clear node_modules: `rm -rf node_modules && npm install`
- Regenerate Prisma client: `npx prisma generate`

### Getting Help

1. Check the [React Router documentation](https://reactrouter.com/)
2. Review [Prisma documentation](https://www.prisma.io/docs)
3. Check [Supabase documentation](https://supabase.com/docs)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Next Steps

- [ ] Add user authentication with Supabase Auth
- [ ] Implement article scheduling functionality
- [ ] Add image upload capabilities
- [ ] Create article versioning system
- [ ] Add SEO optimization features

---

Built with ❤️ using React Router v7, Prisma, and Supabase.