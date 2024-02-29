import BundledEditor from "./BundleEditor";
import React, { useRef } from "react";
import { uploadFile } from "@/services/file/api";

interface RichTextEditorProps {
    value?: string
    onChange?: (value: string) => void
}

const RichTextEditor:React.FC<RichTextEditorProps> = (props) => {
    const { value, onChange } = props;
    const initialValueRef = useRef(value);

    return (
      <>
        <BundledEditor
          initialValue={initialValueRef.current}
          onChange={e => {
            onChange?.(e.target.getContent())
          }}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
              'searchreplace', 'table', 'wordcount', 'fullscreen', 'code'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | removeformat | ' +
              'image | code | fullscreen',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            // 配置上传只能图片类型
            file_picker_types: 'image',
            // 配置上传地址后不转化为相对 url
            relative_urls: false,
            convert_urls: false,
            // 配置上传地址
            images_upload_handler: async (blobInfo) => {
                const file = new File([blobInfo.blob()], blobInfo.filename());
                const msg = await uploadFile(file);
                const imgUrl = '/backend/' + msg.path;
                return imgUrl
            },
            language: 'zh-Hans',
          }}
        />
      </>
    );
  }

  export default RichTextEditor;