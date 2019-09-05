import axios from 'axios';
export const getcategory = () => {
    return {

        type: 'GET_CATEGORY',
        payload: axios.get('http://localhost:4000/category', {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};
