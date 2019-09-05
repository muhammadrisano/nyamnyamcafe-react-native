import axios from 'axios';


export const checkoutpayment = (id_user) => {
    return {

        type: 'PAYMENT_CHECKOUT',
        payload: axios.post('http://localhost:4000/payment/start/' + id_user, {}, {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};

export const getAllPayment = () => {
    return {

        type: 'GETALL_PAYMENT',
        payload: axios.get('http://localhost:4000/payment/', {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};