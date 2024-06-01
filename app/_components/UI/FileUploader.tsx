"use client";
import { TEXT } from "@/app/_constants";
import { FileUploaderProps } from "@/app/_types/Index";

import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.min.css";
import { forwardRef } from "react";
import { FilePond, registerPlugin } from "react-filepond";

const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(
  function FileUploaderComponent(props, ref) {
    registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

    return (
      <div ref={ref}>
        <label htmlFor={props.name}>
          {props.required && <span>({TEXT.REQUIRED_FIELD})</span>}
        </label>

        <FilePond
          imagePreviewHeight={135}
          itemInsertLocation={"after"}
          files={props?.value}
          onupdatefiles={(fileItems) => {
            props.onChange(fileItems.map((fileItem) => fileItem.file));
          }}
          instantUpload={false}
          allowMultiple={true}
          allowImagePreview={true}
          maxFiles={5}
          allowReorder={true}
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />

        {props.error && <span className="error">{props.error}</span>}
      </div>
    );
  }
);

FileUploader.displayName = "FileUploader"; // Set the displayName property

export default FileUploader;
