// React core
import { Ref, forwardRef, useEffect } from "react";

// Components
import FormElementError from "../FormElementError";
// import Label from "../Label";

// Third party libraries
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Others
import { CkEditorProps } from "@/app/_types/Index";
import { useController } from "react-hook-form";
import Label from "../Label";
import Toolbar from "./Toolbar";

const CkEditor = (
  {
    control,
    name,
    error,
    required,
    label,
    isGeneratedListingDescription,
    onResetDescriptionGeneration,
    isEditorClear,
  }: CkEditorProps,
  ref: Ref<HTMLInputElement>
) => {
  const { field } = useController({ name, control });
  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      field.onChange(editor.getHTML());
      isGeneratedListingDescription && onResetDescriptionGeneration?.();
    },
  });

  // generate content when, fetching description from API
  useEffect(() => {
    if (editor?.isEmpty || isGeneratedListingDescription) {
      editor?.commands.setContent(field.value);
    }
  }, [field.value, editor, isGeneratedListingDescription]);

  // clear editor content on chat, after sending new message
  useEffect(() => {
    isEditorClear && editor?.commands.clearContent();
  }, [isEditorClear, editor]);

  return (
    <div ref={ref}>
      {label && <Label required={required} label={label} name={name} />}
      <div className="text-editor">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <FormElementError error={error} />
    </div>
  );
};

export default forwardRef(CkEditor);
