const globalState = {

    item: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false

};
const items = (state = globalState, action) => {
    switch (action.type) {
        case 'GETALL_ITEM_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GETALL_ITEM_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GETALL_ITEM_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                item: action.payload.data.result
            };
        case 'INPUT_ITEM_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'INPUT_ITEM_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'INPUT_ITEM_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            };
        default:
            return state;
    }

}

export default items;