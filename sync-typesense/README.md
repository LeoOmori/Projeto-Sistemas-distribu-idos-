## sync-typesense
O sync-typesense é uma aplicação que recebe mensagens do reddit scrapper através da ferramenta de messageria [nats](https://nats.io/), e syncroniza com o motor de busca [typesense](https://typesense.org/) inserindo cada mensagem no banco de dados gerenciado pelo próprio motor de busca, através de requisições http.

Navegue para o diretório sync-typesense
```
$ cd sync-typesense
```

### Primeiro instale as dependências:

```
$ yarn install
```

### Para realizar as funçôes do Sync Typesense é necessario seguir os seguintes passos:

Instale o Docker e docker-compose: [Docker](https://www.docker.com/get-started/),
 ou se preferir rodar o servidor localmente acesse [typesense](https://typesense.org/) para mais informações


### Iniciando o servidor em um container:

```
$ docker-compose up
```

### Criação a collection no typesense:

```
$ node src/collection/create.js
```

### Para remover a coleção:

```
$ node src/collection/delete.js
```

### Iniciando o serviço de sincronização

```
$ node src/index.js
```

## Modelos de coleções e documentos

### Jokes:

#### Collection

```JSON
{
    "name": "jokes",
    "fields": [
        {"name": "id", "type": "string", "optional": false},
        {"name": "joke", "type": "string", "optional": false},
        {"name": "date", "type": "string", "optional": true},
        {"name": "users", "type": "string[]", "optional": true},
        {"name": "rating_average", "type": "int32", "optional": true},
        {"name": "rating_amount", "type": "int32", "optional": true},
    ],
    "default_sorting": "date",
}
```

#### Document

```Js
{
    "id": "1",
    "joke": "joke content",
    "date": 1632229601, // data em que a piada foi publicada,
    "ratind_average": 4, // média das avaliações da piada
    "rating_amount": 10, // quantidade de avaliações
}
```