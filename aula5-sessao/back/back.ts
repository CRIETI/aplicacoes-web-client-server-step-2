import express, {Express, Request, Response} from 'express';
const path = require('path');
import cors from 'cors';
import Usuario from './model/usuario';
import session from 'express-session';
import * as SessionData from './types/types';
//const session = require('express-session');

const app = express();
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname)));

app.use(session({
    name: "mynodelogin",
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
}));

app.get('/', function(request:Request, response: Response)
{
    response.json({sucesso:1})
});

app.get('/auth', async function(request:Request, response: Response)
{
    let username = request.query.username+"";
    let password = request.query.password+"";

    let logado = await Usuario.localizaUsuario(username, password);
    console.log(logado?.toJSON());

    if ( logado && logado.id )
    {
        request.session.loggedIn = true;
        request.session.username = logado.nome;
        request.session.userId = logado.id;
        request.session.email = logado.email;
        request.session.type = "admin";

        console.log("nome na sessão="+request.session.username);

        response.json(true);
    }
    else
    {
        response.json(false);
    }
});


app.get('/verify', function(request: Request, response: Response)
{
    let result = {
        loggedIn : request.session.loggedIn+"",
        userId: request.session.userId+"",
        userName: request.session.username+"",
        type: request.session.type+"",
    }

    response.json(result);
});

app.listen(3000, function()
{
    console.log("back online!");
});

