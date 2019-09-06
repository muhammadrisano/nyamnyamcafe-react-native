const globalState = {
    token: sessionStorage.getItem('token') || null,
    id_user: sessionStorage.getItem('id_user') || 1,
    role_id: sessionStorage.getItem('role_id') || null,
    fullname: sessionStorage.getItem('fullname') || "Muhammad Risano AKbar",
    userid: '',
    user: localStorage.getItem('user'),
    isLoading: false,
    isFulfilled: false,
    isRejected: false
};


const users = (state = globalState, action) => {

    switch (action.type) {
        case 'LOGIN_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'LOGIN_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'LOGIN_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                user: action.payload.data.result,
                token: action.payload.data.result.token,
                id_user: action.payload.data.result.id_user,
                role_id: action.payload.data.result.role_id,
                fullname: action.payload.data.result.name,
            };
        case 'GET_USER_iD_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };

        case 'GET_USER_ID_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GET_USER_ID_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userid: action.payload.data.result
            };

        default:
            return state;
    }


}

export default users;