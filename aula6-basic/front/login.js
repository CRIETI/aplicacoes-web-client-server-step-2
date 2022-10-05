const api = 'http://localhost:3001/';

async function auth()
{
    let formData = getFormData();

    let headers = new Headers({
        username: formData.username,
        password: formData.password
    });

    let options = {
        headers: headers,
        method: 'GET',
        cache: "no-store"
    }

    let url = api+'auth';
    const response = await fetch(url,options);
    const usuario = await response.json();

    if( usuario != null && usuario.id )
    {
        localStorage.setItem('logado', JSON.stringify(usuario));
        alert("Login efetuado com sucesso!")
        window.location.reload();
    }
    else
    {
        alert("Não rolou filho! Tente novamente mais tarde!");
    }

    console.log(usuario);
}

async function verify()
{
    let logado = JSON.parse(localStorage.getItem('logado'));

    if (logado == null)
    {
        return;
    }

    let headers = new Headers({
        username: logado.email,
        password: logado.senha
    });

    let options = {
        headers: headers,
        method: 'GET',
        cache: "no-store"
    }

    let url = api+'verify';
    const response = await fetch(url,options);
    const usuario = await response.json();

    if ( usuario)
    {
        document.body.innerHTML = "Bem vindo, " + logado.nome;
        document.body.innerHTML +='<br/>';
        document.body.innerHTML +=
        " <a href='/login.html' onclick='out()'>Sair</a>";
    }
}

function out()
{
    localStorage.removeItem('logado');
}

function getFormData()
{
    let form = document.querySelector('form');
    let formData = new FormData(form);
    let dados = Object.fromEntries(formData)
    return dados;
}

verify();