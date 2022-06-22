import express from 'express';
import { port } from './config/server';
import convertToJsonL from './utils/jsonl';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' })

const app = express();


app.listen(port);