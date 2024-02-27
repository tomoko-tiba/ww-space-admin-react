import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
// import { uploadFile } from '@/services/file/api';

const getBase64 = (img: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  

const validFile = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

interface UploadImgProps {
    value?: string;
    onChange?: (value: string) => void; 
}

const UploadImg: React.FC<UploadImgProps> = (props) => {
  const { value, onChange } = props;
  const [loading, setLoading] = useState(false);              

  const beforeUpload = async (file: File) => {
    if(!validFile(file)){
        return
    }
    setLoading(true);
    // 请求上传
    //const msg = await uploadFile(file);
    //const imgurl = 'http://localhost:3000/' + msg.path;
    //onChange?.(imgurl);
    //console.log(imgurl);
    //setLoading(false);
    getBase64(file, url => {
        onChange?.(url);
        setLoading(false);
      })
    return false
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {value && !loading ? <img src={value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </>
  );
};

export default UploadImg;