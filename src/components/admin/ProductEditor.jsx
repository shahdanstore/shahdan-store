import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaAlignRight,
  FaAlignCenter,
  FaAlignLeft,
  FaLink,
  FaImage,
  FaEraser,
  FaQuoteRight,
} from "react-icons/fa";

function ToolbarButton({ children, onClick, active = false }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`
        flex h-10 min-w-[40px]
        items-center justify-center
        rounded-xl border
        transition-all duration-200
        ${
          active
            ? "border-green-600 bg-green-600 text-white shadow-sm"
            : "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50"
        }
      `}
    >
      {children}
    </button>
  );
}

function ProductEditor({ value, onChange }) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,

      Underline,

      Highlight.configure({
        multicolor: true,
      }),

      TextStyle,

      Color,

      Image.configure({
        inline: false,
      }),

      Link.configure({
        openOnClick: false,
        autolink: false,
        linkOnPaste: true,
      }),

      HorizontalRule,

      Placeholder.configure({
        placeholder: "اكتب وصف المنتج هنا...",
        emptyEditorClass: "is-editor-empty",
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: value || "",

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentContent = editor.getHTML();
    const newContent = value || "";

    if (newContent !== currentContent) {
      editor.commands.setContent(newContent, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  // =========================
  // العناوين
  // =========================

  const setHeading1 = () => {
    editor.chain().focus().toggleHeading({ level: 1 }).run();
  };

  const setHeading2 = () => {
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  };

  // =========================
  // التنسيق
  // =========================

  const toggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const toggleUnderline = () => {
    editor.chain().focus().toggleUnderline().run();
  };

  // =========================
  // القوائم
  // =========================

  const toggleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const toggleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  // =========================
  // المحاذاة
  // =========================

  const setAlignRight = () => {
    editor.chain().focus().setTextAlign("right").run();
  };

  const setAlignCenter = () => {
    editor.chain().focus().setTextAlign("center").run();
  };

  const setAlignLeft = () => {
    editor.chain().focus().setTextAlign("left").run();
  };

  // =========================
  // الاقتباس
  // =========================

  const toggleBlockquote = () => {
    editor.chain().focus().toggleBlockquote().run();
  };

  // =========================
  // الخط الأفقي
  // =========================

  const addHorizontalRule = () => {
    editor.chain().focus().setHorizontalRule().run();
  };

  // =========================
  // إزالة التنسيق
  // =========================

  const clearFormatting = () => {
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  };

  // =========================
  // اللون
  // =========================

  const setTextColor = (color) => {
    editor.chain().focus().setColor(color).run();
  };

  // =========================
  // الرابط
  // =========================

  const handleAddLink = () => {
    const { empty } = editor.state.selection;

    if (empty) {
      alert("حدد كلمة أو جملة أولاً");
      return;
    }

    const previousUrl = editor.getAttributes("link").href || "";

    const url = window.prompt("أدخل الرابط", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
        target: "_blank",
      })
      .run();
  };

  // =========================
  // إضافة صورة
  // =========================

  const handleAddImage = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.onchange = () => {
      const file = input.files?.[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        const src = reader.result;

        editor
          .chain()
          .focus()
          .setImage({
            src,
          })
          .run();
      };

      reader.readAsDataURL(file);
    };

    input.click();
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* =========================
          Toolbar
      ========================= */}

      <div className="flex flex-wrap gap-2 border-b bg-gray-50 p-4">
        {/* Bold */}
        <ToolbarButton onClick={toggleBold} active={editor.isActive("bold")}>
          <FaBold />
        </ToolbarButton>

        {/* Italic */}
        <ToolbarButton
          onClick={toggleItalic}
          active={editor.isActive("italic")}
        >
          <FaItalic />
        </ToolbarButton>

        {/* Underline */}
        <ToolbarButton
          onClick={toggleUnderline}
          active={editor.isActive("underline")}
        >
          <FaUnderline />
        </ToolbarButton>

        {/* H1 */}
        <ToolbarButton
          onClick={setHeading1}
          active={editor.isActive("heading", { level: 1 })}
        >
          <span className="font-bold">H1</span>
        </ToolbarButton>

        {/* H2 */}
        <ToolbarButton
          onClick={setHeading2}
          active={editor.isActive("heading", { level: 2 })}
        >
          <span className="font-bold">H2</span>
        </ToolbarButton>

        {/* Bullet List */}
        <ToolbarButton
          onClick={toggleBulletList}
          active={editor.isActive("bulletList")}
        >
          <FaListUl />
        </ToolbarButton>

        {/* Ordered List */}
        <ToolbarButton
          onClick={toggleOrderedList}
          active={editor.isActive("orderedList")}
        >
          <FaListOl />
        </ToolbarButton>

        {/* Align Right */}
        <ToolbarButton
          onClick={setAlignRight}
          active={editor.isActive({ textAlign: "right" })}
        >
          <FaAlignRight />
        </ToolbarButton>

        {/* Align Center */}
        <ToolbarButton
          onClick={setAlignCenter}
          active={editor.isActive({ textAlign: "center" })}
        >
          <FaAlignCenter />
        </ToolbarButton>

        {/* Align Left */}
        <ToolbarButton
          onClick={setAlignLeft}
          active={editor.isActive({ textAlign: "left" })}
        >
          <FaAlignLeft />
        </ToolbarButton>

        {/* Blockquote */}
        <ToolbarButton
          onClick={toggleBlockquote}
          active={editor.isActive("blockquote")}
        >
          <FaQuoteRight />
        </ToolbarButton>

        {/* Horizontal Rule */}
        <ToolbarButton onClick={addHorizontalRule}>
          <span className="font-bold">―</span>
        </ToolbarButton>

        {/* Link */}
        <ToolbarButton onClick={handleAddLink} active={editor.isActive("link")}>
          <FaLink />
        </ToolbarButton>

        {/* Image */}
        <ToolbarButton onClick={handleAddImage}>
          <FaImage />
        </ToolbarButton>

        {/* Clear Formatting */}
        <ToolbarButton onClick={clearFormatting}>
          <FaEraser />
        </ToolbarButton>

        {/* Color */}
        <label
          className="
            flex h-10 min-w-[40px]
            cursor-pointer items-center justify-center
            rounded-xl border border-gray-200
            bg-white
            hover:border-green-300
            hover:bg-green-50
          "
          title="لون النص"
        >
          <input
            type="color"
            className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
            onChange={(e) => setTextColor(e.target.value)}
          />
        </label>
      </div>

      {/* =========================
          Editor
      ========================= */}

      <div
        className="
          min-h-[320px]
          cursor-text
          p-5
        "
        onClick={() => editor.chain().focus().run()}
      >
        <EditorContent
          editor={editor}
          className="
            min-h-[280px]

            [&_.ProseMirror]:min-h-[280px]
            [&_.ProseMirror]:outline-none
            [&_.ProseMirror]:text-right
            [&_.ProseMirror]:text-base
            [&_.ProseMirror]:leading-8

            [&_.ProseMirror_h1]:mb-4
            [&_.ProseMirror_h1]:text-3xl
            [&_.ProseMirror_h1]:font-bold

            [&_.ProseMirror_h2]:mb-3
            [&_.ProseMirror_h2]:text-2xl
            [&_.ProseMirror_h2]:font-bold

            [&_.ProseMirror_ul]:my-3
            [&_.ProseMirror_ul]:list-disc
            [&_.ProseMirror_ul]:pr-6

            [&_.ProseMirror_ol]:my-3
            [&_.ProseMirror_ol]:list-decimal
            [&_.ProseMirror_ol]:pr-6

            [&_.ProseMirror_blockquote]:my-4
            [&_.ProseMirror_blockquote]:border-r-4
            [&_.ProseMirror_blockquote]:border-green-500
            [&_.ProseMirror_blockquote]:pr-4
            [&_.ProseMirror_blockquote]:text-gray-600

            [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-right
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400
            [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
          "
        />
      </div>
    </div>
  );
}

export default ProductEditor;
