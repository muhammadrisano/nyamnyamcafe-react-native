import axios from 'axios';
export const addcart = (data) => {
    return {
        type: 'ADD_CART',
        payload: axios.post('http://localhost:4000/cart', data, {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};

export const getallcart = (id_user) => {
    return {
        type: 'GETALL_CART',
        payload: axios.get('http://localhost:4000/cart/byuser/' + id_user, {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};

export const quantityplush = (id_cart) => {
    return {
        type: 'QUANTITYPLUS_CART',
        payload: axios.patch('http://localhost:4000/cart/quantityplus/' + id_cart, {}, {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};
export const quantityminus = (id_cart) => {
    return {
        type: 'QUANTITYMINUS_CART',
        payload: axios.patch('http://localhost:4000/cart/quantityminus/' + id_cart, {}, {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};
export const removecart = (id_cart) => {
    return {
        type: 'REMOVE_CART',
        payload: axios.delete('http://localhost:4000/cart/' + id_cart, {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};


