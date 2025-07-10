import express, { Request, Response } from 'express';
import { AppDataSource } from "./data-source";

const __PORT = 8080;
const app = express();

AppDataSource.initialize().then(() => {
    console.log('conexao com banco OK')
}).catch((error) => {
    console.log(error);
})

//GET
app.get("/", (req: Request, res: Response) => {
    res.send("Bem-vindo ao site!");
})


app.listen(__PORT, () => { console.log(`Executando na porta ${__PORT}`) });

