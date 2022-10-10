const router = require('express').Router();
const User = require('../models/User');

async function authentication(request)
{
    let authorization = request.headers.authorization+"";
    authorization = authorization.replace("Basic ",'');
    let ascii = Buffer.from(authorization, 'base64').toString('ascii')
    let dados = ascii.split(":");
    console.log(authorization);
    console.log(ascii);

    let username = dados[0];
    let password = dados[1];

    let logado = await User.locateUser(username, password);
    console.log(logado?.toJSON());
    return logado;
}

router.get('/auth', async function(request, response)
{
    response.json( await authentication(request));
});

router.get('/verify', async function(request, response)
{    
    let usuario = await authentication(request)
    response.json(usuario);
});

module.exports = router;