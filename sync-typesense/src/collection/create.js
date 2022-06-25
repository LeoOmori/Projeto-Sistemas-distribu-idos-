import { createCollection } from '../requests/collections.js';

// body para criar uma collection no typesense
const jokes = {
    "name": "jokes",
    "fields": [
        {"name": "id", "type": "string", "optional": false, "facet": true},
        {"name": "joke", "type": "string", "optional": false, "facet": true},
        {"name": "date", "type": "string", "optional": true},
        {"name": "users_saved", "type": "string[]", "optional": true,"facet": true},
        {"name": "users_rated", "type": "string[]", "optional": true},
        {"name": "rating_average", "type": "float", "optional": true},
        {"name": "rating_amount", "type": "int32", "optional": true},
    ],
    "default_sorting": "date",
}
// chama a função que cria uma collection passando o body por parâmetro
Promise.resolve().then(() => createCollection(jokes));
