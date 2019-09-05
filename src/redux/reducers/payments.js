const globalState = {

    checkout: null,
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    paymentall:[],
    ppn: null,
    total_price: null,
    total_payment: null,
    id_payment: null

};


const payments = (state = globalState, action) => {



    switch (action.type) {
        case 'PAYMENT_CHECKOUT_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'PAYMENT_CHECKOUT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'PAYMENT_CHECKOUT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                checkout: action.payload.data.result,
                ppn: action.payload.data.result.ppn,
                total_price: action.payload.data.result.total_price,
                total_payment: action.payload.data.result.total_payment,
                id_payment: action.payload.data.result.id_payment
            };
            case 'GETALL_PAYMENT_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GETALL_PAYMENT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GETALL_PAYMENT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                paymentall: action.payload.data.result,
            };
        default:
            return state;
    }

}

export default payments;