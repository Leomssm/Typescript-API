import express, { Request, Response } from 'express';

const __PORT = 8080;
const app = express();

// Middleware para aceitar dados em formato JSON
app.use(express.json());

import UsersController from "./controllers/UsersController";

//Criar as rotas
app.use('/', UsersController);

//GET
app.get("/", (req: Request, res: Response) => {
    res.send("Bem-vindo ao site!");
});




app.listen(__PORT, () => { console.log(`Executando na porta ${__PORT}`) });

