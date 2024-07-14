import express, { Express, Request, Response} from "express";
import dotenv from 'dotenv';

//config the .env file
dotenv.config();

const app:Express = express();
const port: string | number = process.env.PORT || 8000;

app.get('/',(req:Request, res:Response) => {
    res.send("welcme");
});

app.get('/hello',(req:Request, res:Response) => {
    res.send("Hi julito Rojas!");
});

app.listen(port,() => {
    console.log(`running server at http://localhost:${port}`);
});

