import axios from 'axios';

export const loginUser = (data) => {
    return {
        type: 'LOGIN_USER',
        payload: axios.post('http://pasarqita.muhammadrisano.online/user/login', data, {
            headers: { "authorization": "semangat-team-faraday" },
        }),
    };
};

export const getUser = (data, header) => {
    return {
        type: 'GET_USER',
        payload: axios.get(`http://pasarqita.muhammadrisano.online/user?search=` + data, {
            headers: header
        }),
    };
};

// export const getuserid = (id_user, header) => {
//     return {
//         type: 'GET_USER_ID',
//         payload: axios.get('http://libraryapi.muhammadrisano.online/user/' + id_user, {
//             headers: header
//         })
//     }
// }

export const updateuser = (id_user, data, header) => {
    return {
        type: 'UPDATE_USER',
        payload: axios.patch('http://libraryapi.muhammadrisano.online/user/' + id_user, data, {
            headers: header
        })
    }
}