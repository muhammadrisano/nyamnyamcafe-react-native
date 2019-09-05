import axios from 'axios';


export const checkoutpayment = (id_user) => {
    return {

        type: 'PAYMENT_CHECKOUT',
        payload: axios.post('http://nyamnyam.muhammadrisano.online/payment/start/' + id_user, {}, {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};

export const getAllPayment = () => {
    return {

        type: 'GETALL_PAYMENT',
        payload: axios.get('http://nyamnyam.muhammadrisano.online/payment/', {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};