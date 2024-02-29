import { request } from '@umijs/max';

export async function getAllUser() {
    return request<API.User[]>('/users', {
        method: 'GET',
    });
}

export async function getOneUserById(id: number) {
    return request<API.User>(`/users/${id}`, {
        method: 'GET',
    })
}

export async function createOneUser(data: API.UserCreateInput) {
    return request<API.User>('/users', {
        method: "POST",
        data
    })
}

export async function updateOneUserById(id: number, data: API.UserUpdateInput) {
    return request<API.User>(`/users/${id}`, {
        method: 'PUT',
        data
    })
}

export async function deleteOneUserById(id: number) {
    return request<API.User>(`/users/${id}`, {
        method: 'DELETE',
    })
}