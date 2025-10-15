import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo, Type, AlignLeft } from "lucide-react";
import { useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder = "Start writing your content..." }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="bg-white rounded-xl border border-[#9DD9D2]/50 p-6 shadow-lg">
        <div className="animate-pulse">
          <div className="h-12 bg-[#9DD9D2]/20 rounded-lg mb-4"></div>
          <div className="h-48 bg-[#9DD9D2]/20 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    children,
    title
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    children: React.ReactNode;
    title?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-3 rounded-xl transition-all duration-200 ${
        isActive 
          ? 'bg-blue-100 text-blue-700 shadow-sm border border-blue-200' 
          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-blue-200 hover:text-blue-600 hover:shadow-sm'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
      {/* Toolbar */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 mr-4">
          <Type className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-semibold text-gray-900">Format</span>
        </div>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        
        <div className="w-px h-6 bg-gray-300 mx-2" />
        
        <div className="flex items-center gap-2 mr-4">
          <AlignLeft className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-semibold text-gray-900">Lists</span>
        </div>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        
        <div className="w-px h-6 bg-gray-300 mx-2" />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>
      </div>
      
      {/* Editor */}
      <div className="prose prose-slate max-w-none">
        <EditorContent 
          editor={editor} 
          className="p-8 min-h-[500px] focus:outline-none text-gray-900 leading-relaxed"
        />
      </div>
    </div>
  );
}