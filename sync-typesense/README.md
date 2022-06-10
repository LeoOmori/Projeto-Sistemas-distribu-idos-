# Joke Hub - Typesense sync

### Primeiro instale as dependências:

```
$ yarn install
```

## Para realizar as funçôes do Sync Typesense é necessario seguir os seguintes passos:

### Criação de uma instância do Typesense, para saber mais acesse [typesense](https://typesense.org/)

Para subir uma instância no docker:

```
$ docker-compose up
```

### Criação de coleções que deseja sincronizar:

```
$ node src/collection/create.js
```

#### Para remover a coleção:

```
$ node src/collection/delete.js
```

### Iniciando o serviço de sincronização

```
$ yarn dev:server
```

## Modelos de coleções e documentos

### Jokes:

#### Collection

```JSON
{
    "name": "jokes",
    "fields": [
        {"name": "id", "type": "int32", "optional": false},
        {"name": "joke", "type": "string", "optional": false},
        {"name": "date", "type": "int32", "optional": true},
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
    "date": 1632229601, // timestamp da data que a piada foi publicada,
    "ratind_average": 4, // média das avaliações da piada
    "rating_amount": 10, // quantidade de avaliações
}
```
