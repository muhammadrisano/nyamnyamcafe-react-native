const globalState = {

    category: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false

};


const categorys = (state = globalState, action) => {



    switch (action.type) {
        case 'GET_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GET_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GET_CATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                category: action.payload.data.result
            };

        default:
            return state;
    }

}

export default categorys;