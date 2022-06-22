import { getProductsConsultations } from '../services/products-consultations/get';
import { insertDocuments } from '../requests/documents';
import { buildProductsConsultations } from '../utils/format-documents';
import { ConsultProduct } from '../interfaces/products-consultations';
import convertToJsonL from '../utils/jsonl';

const chunkSize = 10;

const firstId = 1;

const productsConsultationStart = (productId) => getProductsConsultations(productId, chunkSize, 'id', '>')
    .then(response => {
        console.log(response.map(product => product.id));
        return buildAndInsertData(response, chunkSize);
    });

const buildAndInsertData = (products, limit) => {

    const productId = (products[products.length - 1] || {}).id;

    const buildedProducts = buildProductsConsultations(products);
    const formattedProducts = convertToJsonL(buildedProducts);

    if(!products.length) return null;

    return insertDocuments(formattedProducts, 'products_consultations')
    .then(response => {
        if (response) console.log(response.data);
        if(products.length < limit) return null;
        else productsConsultationStart(parseInt(productId));        
    })
}

Promise.resolve()
.then(() => productsConsultationStart(firstId));