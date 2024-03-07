import { request } from '@umijs/max';

export async function getAllCategories() {
    return request<API.Category[]>('/categories', {
        method: 'GET',
    });
}

export async function getOneCategoryById(id: number) {
    return request<API.Category>(`/categories/${id}`, {
        method: 'GET',
    })
}

export async function createOneCategory(data: API.CategoryInput) {
    return request<API.Category>('/categories', {
        method: "POST",
        data
    })
}

export async function updateOneCategoryById(id: number, data: API.CategoryInput) {
    return request<API.Category>(`/categories/${id}`, {
        method: 'PUT',
        data
    })
}

export async function deleteOneCategoryById(id: number) {
    return request<API.Category>(`/categories/${id}`, {
        method: 'DELETE',
    })
}