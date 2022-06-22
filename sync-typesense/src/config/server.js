import dotenv from 'dotenv';


dotenv.config({ path: '../env' });

const {
    NODE_ENV = 'development',
    PORT = '3002',
} = process.env;

export const env = NODE_ENV;
export const port = parseInt(PORT);

// export const logtype = env === 'production' ? 'combined' : 'dev';
