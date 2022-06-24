import axios from '../config/axios.js';

// função já configurada para inserir uma piada na collection "jokes" no typesense
// recebe como parâmetro o body da piada que representa os campos [id, joke, date]
export function insertJokes(body){
    return Promise.resolve()
    .then(() => axios.post(`/collections/jokes/documents/import?action=upsert`, body))
    .then(response => response)
    .catch((err) => console.log(err.response.data.message))
}