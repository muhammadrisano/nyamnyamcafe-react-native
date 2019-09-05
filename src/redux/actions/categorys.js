import axios from 'axios';
export const getcategory = () => {
    return {

        type: 'GET_CATEGORY',
        payload: axios.get('http://nyamnyam.muhammadrisano.online/category', {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};
