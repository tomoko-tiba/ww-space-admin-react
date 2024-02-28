import { request } from '@umijs/max';

export async function getAllWork(params: {
    page: number,
    pageSize: number,
    searchText: string
}) {
    return request<{data:API.WorkVO[], count: number}>('http://localhost:3000/works/pages', {
        method: 'GET',
        params
    });
}

export async function getOneWorkById(id: number) {
    return request<API.WorkVO>(`http://localhost:3000/works/${id}?flag=admin`, {
        method: 'GET',
    })
}

export async function createOneWork(data: API.WorkInput) {
    return request<API.Work>('http://localhost:3000/works', {
        method: 'POST',
        data
    })
}

export async function updateOneWorkById(id: number, data: API.WorkInput) {
    return request<API.Work>(`http://localhost:3000/works/${id}`, {
        method: 'PUT',
        data
    })
}

export async function deleteOneWorkById(id: number) {
    return request<API.Work>(`http://localhost:3000/works/${id}`, {
        method: 'DELETE',
    })
}