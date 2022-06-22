import axios from '../config/axios.js';

export function insertJokes(body){
    return Promise.resolve()
    .then(() => axios.post(`/collections/jokes/documents/import?action=upsert`, body))
    .then(response => response)
    .catch((err) => console.log(err.response.data.message))
}

export function getLastUpdate(collection, query){
    return Promise.resolve()
    .then(() => axios.get(`/collections/${collection}/documents/search?q=&query_by=${query}&sort_by=updated_at:desc&page=1&per_page=1`))
    .then(response => response)
    .catch((err) => console.log(err))
}