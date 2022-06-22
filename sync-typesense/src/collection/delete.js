import { deleteCollection } from '../requests/collections.js';

Promise.resolve().then(() => deleteCollection('jokes'));