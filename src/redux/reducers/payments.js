const globalState = {

    datasound: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false

};


const payments = (state = globalState, action) => {



    switch (action.type) {
        case 'GET_SOUND_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GET_SOUND_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GET_SOUND_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                datasound: action.payload.data.result
            };
        case 'DELETE_SOUND_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'DELETE_SOUND_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'DELETE_SOUND_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            };
        case 'ADD_SOUND_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'ADD_SOUND_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'ADD_SOUND_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            };
        default:
            return state;
    }

}

export default payments;