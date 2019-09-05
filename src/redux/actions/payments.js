import axios from 'axios';
export const getsound = () => {
    return {

        type: 'GET_SOUND',
        payload: axios.get('http://titaktitak.muhammadrisano.online/button', {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};
export const deletesound = (id_sound) => {
    return {

        type: 'DELETE_SOUND',
        payload: axios.delete('http://titaktitak.muhammadrisano.online/button/' + id_sound, {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};

export const addsound = (data) => {
    return {

        type: 'ADD_SOUND',
        payload: axios.post('http://localhost:4000/button', data, {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};