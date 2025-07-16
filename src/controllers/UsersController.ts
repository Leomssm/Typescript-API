import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Not } from "typeorm";

const router = express.Router();

router.get("/users", async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const users = await userRepository.find();

        res.status(200).json(users);
        return;

    } catch (error) {
        res.status(500).json({
            message: "Erro ao cadastrar"
        })
        return;
    }


});

router.get("/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ id: parseInt(id) });

        if (!user) {
            res.status(404).json({
                message: "Usuário não encontrado!"
            });
            return;
        }

        res.status(200).json({ user });
        return;

    } catch (error) {
        res.send(500).json({
            message: "Erro. Não foi possível recuperar o registro"
        })
    }
})

router.post("/users", async (req: Request, res: Response) => {
    try {
        //Receber a requisição
        var data = req.body;
        //Cria uma instancia do repositório User
        const userRepository = AppDataSource.getRepository(User);

        // Recupera o registro do banco de dados com o valor da coluna email
        const existingUser = await userRepository.findOne({ where: { email: data.email } });

        if (existingUser) {
            res.status(400).json({
                message: "Já existe usuário cadastrado com este e-mail!"
            });
            return;
        }

        //Criar um novo registro
        const newUser = userRepository.create(data);

        //Salvar o registro
        await userRepository.save(newUser);

        res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao cadastrar o usuário."
        })
    }
});

router.put("/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;


        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ id: parseInt(id) });

        if (!user) {
            res.status(404).json({
                message: "Usuário não encontrado!"
            });
            return;
        }
        // Verifica se existe outro usuário com o mesmo e-mail, ignorando o próprio
        const existingUser = await userRepository.findOne({
            where: {
                email: data.email,
                id: Not(parseInt(id))
            }
        });

        if (existingUser) {
            res.status(404).json({
                message: "Usuário já existente com este e-mail!"
            });
            return;
        }

        //Atualizar os dados do usuário (user é o que o usuário já possui, e data é o que vem na requisição)
        userRepository.merge(user, data);

        //Salvando no banco de dados
        const updateUser = await userRepository.save(user);

        res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            user: updateUser
        })


    } catch (error) {
        res.status(500).json({
            message: "Erro ao editar o usuário!"
        });
        return;
    }
});

router.delete("/users/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ id: parseInt(id) });

        if (!user) {
            res.status(404).json({
                message: "Usuário não encontrado!"
            })
            return;
        }

        await userRepository.remove(user);

        res.status(200).json({
            message: "Usuário apagado com sucesso!",
        });

    } catch (error) {
        res.status(500).json({
            message: "Erro ao deletar usuário"
        });
    }
})


export default router;
