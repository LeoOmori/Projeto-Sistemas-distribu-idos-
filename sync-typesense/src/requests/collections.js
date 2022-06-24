import axios from '../config/axios.js';

// função para criar uma collection no typesense, recebe como parâmetro body
// que representa o nome da collection, os campos e a ordenação padrão 
export function createCollection(body){
    return Promise.resolve()
    .then(() => axios.post('/collections', body, { headers: { 'Content-Type': 'application/json' }}))
    .then(response => {
        if (response.status == 201)console.log('collection created')
    })
    .catch((err) => console.log(err.response.data.message))
}

// função que deleta uma collection e todos seus dados do typesense, recebe como
// parâmetro o nome da collecção
export function deleteCollection(collectionName){
    return Promise.resolve()
    .then(() => axios.delete(`/collections/${collectionName}`))
    .then(response => {
        if (response.status == 200)console.log('collection deleted')
    })
    .catch((err) => console.log(err.response.data.message))
}