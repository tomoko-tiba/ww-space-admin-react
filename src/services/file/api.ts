import { request } from '@umijs/max';

export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return request<API.UploadFileResult>('http://localhost:3000/files/upload', {
        data: formData,
        method: 'POST',
    })
}