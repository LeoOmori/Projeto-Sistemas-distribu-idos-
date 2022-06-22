import axios from '../config/axios.js';

export function createCollection(body){
    return Promise.resolve()
    .then(() => axios.post('/collections', body, { headers: { 'Content-Type': 'application/json' }}))
    .then(response => {
        if (response.status == 201)console.log('collection created')
    })
    .catch((err) => console.log(err.response.data.message))
}

export function deleteCollection(collectionName){
    return Promise.resolve()
    .then(() => axios.delete(`/collections/${collectionName}`))
    .then(response => {
        if (response.status == 200)console.log('collection deleted')
    })
    .catch((err) => console.log(err.response.data.message))
}