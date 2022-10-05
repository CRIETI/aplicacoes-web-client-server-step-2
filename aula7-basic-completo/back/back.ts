import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import Usuario from './model/usuario'
const app : Express = express();

app.use(cors());

async function authentication(request:Request)
{
    let authorization = request.headers.authorization+"";
    authorization = authorization.replace("Basic ",'');
    let ascii = Buffer.from(authorization, 'base64').toString('ascii')
    let dados = ascii.split(":");
    console.log(authorization);
    console.log(ascii);

    let username = dados[0];
    let password = dados[1];

    let logado = await Usuario.localizaUsuario(username, password);
    console.log(logado?.toJSON());
    return logado;
}

app.get('/auth', async function(request, response)
{
    response.json( await authentication(request));
});

app.get('/verify', async function(request, response)
{    
    let usuario = await authentication(request)
    response.json(usuario);
});

app.listen(3001, function()
{
    console.log("Back online!");
});
