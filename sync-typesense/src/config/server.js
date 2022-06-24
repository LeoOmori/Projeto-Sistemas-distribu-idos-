import dotenv from 'dotenv';
// configuração do servidor
dotenv.config({ path: '../.env' });

const {
    PORT,
} = process.env;

export const port = parseInt(PORT);