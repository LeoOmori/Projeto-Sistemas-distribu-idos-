import express from "express";
import { port } from "./config/server.js";
import dotenv from "dotenv";
import { insertJokes } from "./requests/documents.js";
import { connect, StringCodec } from "nats";

dotenv.config({ path: "../.env" });

const app = express();

// conectando no endereço que está rodando o nats
const nc = await connect({ servers: "0.0.0.0:4222" });

const sc = StringCodec();

// criando um subscriber e iterando as mensagens recebidas
const sub = nc.subscribe("jokes");
(async () => {
  for await (const m of sub) {
    const data = sc.decode(m.data).split("&/");

    // criando objeto com dados necessários para inserir uma piada no typesense
    const dataToInsert = {
      id: data[3],
      joke: `${data[0]}\n${data[1]}`,
      date: data[2],
    };

    // aguarda a mensagem e insere a piada no typesense
    const eachJoke = await insertJokes(JSON.stringify(dataToInsert))

    // mostra o status do resultado da promise
    console.log(`${sub.getProcessed()} - success: ${eachJoke.data.success || false}`)
  }
})();

app.listen(port);
