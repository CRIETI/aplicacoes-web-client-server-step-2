const api= 'http://localhost:3000/';
const fetchOptions = {
    method: 'GET',
    credentials: 'include',
    cache: "no-store"
}

async function auth()
{
    //let username = document.getElementById('username').value;
    //let password = document.getElementById('password').value;    
    //let params = 'username='+username+"&password="+password;

    let form = document.querySelector('form');
    let params = new URLSearchParams(new FormData(form)).toString()

    let url = api+"auth/?"+params;
    console.log(url);
    const response = await fetch(url,fetchOptions);
    const result = await response.json();
    
    if ( result == true)
    {
        alert("Login efetuado com sucesso!");
        window.location = window.location;
    }
    else
    {
        alert("Problemas no login, verifique dados digitados!");
    }

    console.log(result);
}

async function verify()
{
    let url = api+"verify";
    const response = await fetch(url,fetchOptions);
    const result = await response.json();

    if (result.loggedIn != "undefined")
    {
        document.body.innerHTML = "Bem vindo, " + result.userName;
    }
}

verify();