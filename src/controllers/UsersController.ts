import express, {Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';


const router = express.Router();

router.post("/users", async (req : Request, res : Response) => {
    res.send("Cadastrar");
});


export default router;
