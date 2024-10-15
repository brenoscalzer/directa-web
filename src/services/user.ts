import api from './api';

export const login = (email: string, password: string) => {
    return api.post('/users/login', {
        email,
        password
    });
}