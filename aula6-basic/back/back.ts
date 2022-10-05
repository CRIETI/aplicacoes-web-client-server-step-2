import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import Usuario from './model/usuario'
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname)));

app.use(cors());

app.get('/auth', async function(request:Request, response: Response)
{
    let username = request.headers.username+"";
    let password = request.headers.password+"";

    let logado = await Usuario.localizaUsuario(username, password);
    console.log(logado?.toJSON());
    response.json(logado);
});

app.get('/verify', async function(request:Request, response: Response)
{    
    let username = request.headers.username+"";
    let password = request.headers.password+"";
    let logado = await Usuario.localizaUsuario(username, password);
    response.json(logado);
});

app.listen(3001, function()
{
    console.log("Back online!");
});
