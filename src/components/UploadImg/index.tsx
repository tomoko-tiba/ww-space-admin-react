import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { uploadFile } from '@/services/file/api';
import ImgCrop from 'antd-img-crop';
/*
const getBase64 = (img: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  */

const validFile = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('Image must smaller than 10MB!');
  }
  return isJpgOrPng && isLt10M;
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
    const msg = await uploadFile(file);
    const imgurl = '/backend/' + msg.path;
    onChange?.(imgurl);
    setLoading(false);
    /*
    getBase64(file, url => {
        onChange?.(url);
        setLoading(false);
      })
      */
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
    <ImgCrop rotationSlider aspectSlider>
      <Upload
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        
      >
        {value && !loading ? <img src={value} alt="example" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : uploadButton}
      </Upload>
    </ImgCrop>
    </>
  );
};

export default UploadImg;