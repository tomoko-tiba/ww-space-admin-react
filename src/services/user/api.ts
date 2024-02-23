import { request } from '@umijs/max';

export async function getAllUser() {
    return request<API.User[]>('http://localhost:3000/users', {
        method: 'GET',
    });
}