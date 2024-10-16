import api from './api';

export const addToCart = (productId: string) => {
    return api.post('/carts/add-item', {
        productId
    });
}

export const getCart = () => {
    return api.get('/carts');
}

export const removeFromCart = (productId: string) => {
    return api.post('/carts/remove-item', {
        productId
    });
}

export const clearCart = () => {
    return api.delete('/carts/clear-cart');
}