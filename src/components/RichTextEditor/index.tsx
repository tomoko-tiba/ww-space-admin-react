import { uploadFile } from '@/services/file/api';
import React, { useRef } from 'react';
import BundledEditor from './BundleEditor';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  const { value, onChange } = props;
  const initialValueRef = useRef(value);

  return (
    <>
      <BundledEditor
        initialValue={initialValueRef.current}
        onChange={(e) => {
          onChange?.(e.target.getContent());
        }}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'anchor',
            'autolink',
            'help',
            'image',
            'link',
            'lists',
            'searchreplace',
            'table',
            'wordcount',
            'fullscreen',
            'code',
            'media',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | removeformat | ' +
            'image media | code | fullscreen',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          // 配置上传只能图片和视频类型
          file_picker_types: 'image media',
          file_picker_callback: (callback, value, meta) => {
            const acceptMap = {
              image: 'image/*',
              media: 'video/*',
            };
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', acceptMap[meta.filetype as keyof typeof acceptMap]);

            input.addEventListener('change', async () => {
              const file = input.files?.[0];
              if (!file) {
                return;
              }
              const msg = await uploadFile(file);
              callback('/backend/' + msg.path);
            });

            input.click();
          },
          // 配置上传地址
          images_upload_handler: async (blobInfo) => {
            const file = new File([blobInfo.blob()], blobInfo.filename());
            const msg = await uploadFile(file);
            const imgUrl = '/backend/' + msg.path;
            return imgUrl;
          },
          language: 'zh-Hans',
          // 配置上传地址后不转化为相对 url
          relative_urls: false,
          convert_urls: false,
        }}
      />
    </>
  );
};

export default RichTextEditor;
