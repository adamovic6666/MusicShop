// Others
import { Editor } from "@tiptap/react";
import * as Icons from "../../Icons/Icons";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  return (
    <div className="toolbar">
      <span
        onClick={() => editor?.chain().focus().toggleBold().run()}
        className={editor?.isActive("bold") ? "is-active" : ""}
      >
        <Icons.Bold color="gray" />
      </span>

      <span
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        className={editor?.isActive("italic") ? "is-active" : ""}
      >
        <Icons.Italic color="gray" />
      </span>

      <span
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className={editor?.isActive("bulletList") ? "is-active" : ""}
      >
        <Icons.BulletList color="gray" />
      </span>

      <span
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        className={editor?.isActive("orderedList") ? "is-active" : ""}
      >
        <Icons.OrderedList color="gray" />
      </span>
    </div>
  );
};

export default Toolbar;
