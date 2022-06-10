import { getProducts } from '../services/products/get';
import { insertDocuments } from '../requests/documents';
import { buildProducts} from '../utils/format-documents';
import convertToJsonL from '../utils/jsonl';
import { FullProduct } from '../interfaces/products';

const chunkSize = 9;

const firstId = 1;

const productsStart = (productId: number) => getProducts(productId, chunkSize, 'id', '>')
    .then(response => {
        console.log(response.map(product => product.id));
        return buildAndInsertData(response, chunkSize);
    });

const buildAndInsertData = (products: FullProduct[], limit: number) => {

    const productId = (products[products.length - 1] || {}).id;

    const buildedProducts = buildProducts(products);
    const formattedProducts = convertToJsonL(buildedProducts);

    if(!products.length) return null;

    return insertDocuments(formattedProducts, 'products')
    .then(response => {
        if (response) console.log(response.data);
        if(products.length < limit) return null;
        else productsStart(parseInt(productId));        
    })
}

Promise.resolve()
.then(() => productsStart(firstId));