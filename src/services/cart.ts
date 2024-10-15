import api from './api';

export const addToCart = (productId: string) => {
    return api.post('/carts/add-item', {
        productId
    });
}

export const getCart = () => {
    return api.get('/carts');
}