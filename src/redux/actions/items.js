import axios from 'axios';
export const getallitem = () => {
    return {

        type: 'GETALL_ITEM',
        payload: axios.get('http://localhost:4000/item', {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};

export const inputitem = (data) => {
    return {

        type: 'INPUT_ITEM',
        payload: axios.post('http://localhost:4000/item', data, {
            headers: { "authorization": "jangan-coba-coba" },
        }),
    };
};

