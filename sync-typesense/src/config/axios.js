import axios from 'axios';
import typesense from './typesense.js';

const {
    baseUrl: url,
    key,
} = typesense;

export default axios.create({
    baseURL: url,
    headers: {'X-TYPESENSE-API-KEY': key}
})