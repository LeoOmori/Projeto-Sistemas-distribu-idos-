import { deleteCollection } from '../requests/collections.js';
// deleta a collection jokes
Promise.resolve().then(() => deleteCollection('jokes'));