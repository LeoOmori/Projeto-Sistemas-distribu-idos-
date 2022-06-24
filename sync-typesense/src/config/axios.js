import axios from 'axios';
import typesense from './typesense.js';
// configuração padrão do axios com autenticação para as requisições com o typesense
const {
    baseUrl: url,
    key,
} = typesense;

export default axios.create({
    baseURL: url,
    headers: {'X-TYPESENSE-API-KEY': key}
})