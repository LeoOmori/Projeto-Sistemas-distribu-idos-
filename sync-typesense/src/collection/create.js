import { createCollection } from '../requests/collections.js';

const jokes = {
    "name": "jokes",
    "fields": [
        {"name": "id", "type": "int32", "optional": false, "facet": true},
        {"name": "joke", "type": "string", "optional": false, "facet": true},
        {"name": "date", "type": "int32", "optional": true},
        {"name": "users", "type": "string[]", "optional": true},
        {"name": "rating_average", "type": "int32", "optional": true},
        {"name": "rating_amount", "type": "int32", "optional": true},
    ],
    "default_sorting": "date",
}

Promise.resolve().then(() => createCollection(jokes));
