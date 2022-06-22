import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const {
    TYPESENSE_URL = 'http://localhost:8108',
    TYPESENSE_API_KEY = 'xyz',
} = process.env;

export default {
    baseUrl: TYPESENSE_URL,
    key: TYPESENSE_API_KEY,
};
