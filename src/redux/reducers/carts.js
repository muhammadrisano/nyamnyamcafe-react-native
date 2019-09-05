const globalState = {
    cart: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false

};


const carts = (state = globalState, action) => {

    switch (action.type) {
        case 'ADD_CART_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'ADD_CART_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'ADD_CART_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            };

        case 'GETALL_CART_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GETALL_CART_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GETALL_CART_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                cart: action.payload.data.result
            };


        default:
            return state;
    }
}

export default carts;