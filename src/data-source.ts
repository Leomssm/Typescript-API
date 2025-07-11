import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
});

//Inicializar conexão com o banco de dados
AppDataSource.initialize().then(() => {
    console.log('conexao com banco OK')
}).catch((error) => {
    console.log(error);
});