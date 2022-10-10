const api = 'http://localhost:3000/';

async function auth()
{
    let formData = getFormData();
    let authorization = formData.username + ":" + formData.password;
    let base64 = btoa(authorization);
   
    let headers = new Headers({
        authorization: "Basic " + base64
    });

    let options = {
        headers: headers,
        method: 'GET',
        cache: "no-store"
    }

    let url = api+'auth';
    const response = await fetch(url,options);
    const usuario = await response.json();
    console.log(usuario);

    if ( usuario == null )
    {
        alert("Não rolou filho! Tente novamente mais tarde!");
    }
    else
    {
        setLogado(usuario);
        alert("Login efetuado com sucesso!")
        window.location.reload();
    }

    console.log(usuario);
}

function setLogado(usuario)
{
    usuario.loggedAt = new Date();  
    localStorage.setItem('logado', JSON.stringify(usuario));
    return true;
}

function getLogado()
{
    return JSON.parse(localStorage.getItem('logado'))
}

async function verify()
{
    let logado = getLogado();

    if (logado == null)
    {
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
    
    if ( usuario )
    {
        window.location = 'users.html'
        //document.body.innerHTML = "Bem vindo, " + logado.name;
        //document.body.innerHTML +='<br/>';
        //document.body.innerHTML +=
        //" <a href='/login.html' onclick='out()'>Sair</a>";
    }
}

function out()
{
    setLogado(null);
    //localStorage.removeItem('logado');
}

function getFormData()
{
    let form = document.querySelector('form');
    let formData = new FormData(form);
    let dados = Object.fromEntries(formData)
    return dados;
}

verify();