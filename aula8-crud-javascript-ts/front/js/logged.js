const api = 'http://localhost:3000/';

function getLogado()
{
    return JSON.parse(localStorage.getItem('logado'))
}

async function verify()
{
    let logado = getLogado();

    if (logado == null)
    {
        window.location = 'login.html'
        return;
    }
    
    let authorization = logado.email + ":" + logado.password;
    let base64 = btoa(authorization);
   
    let headers = new Headers({
        authorization: "Basic " + base64
    });

    let options = {
        headers: headers,
        method: 'GET',
        cache: "no-store"
    }

    let url = api+'verify';
    const response = await fetch(url,options);
    const usuario = await response.json();

    console.log(usuario);
    
    if ( !usuario )
    {
        window.location = 'login.html'
    }
    else
    {
        let loggeAt = new Date(usuario.loggedAt);
        let dataAtual = new Date();

        //comparar se passou mais de 1 hora logado
        //entao deslogar
    }
}

function out()
{
    localStorage.removeItem('logado');
}

verify();