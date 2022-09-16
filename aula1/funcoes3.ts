function montaNome(nome: string, sobreNome: string, nomeMeio?: string)
{
    console.log("Oi, " + nome.toUpperCase() + " " +
nomeMeio?.toUpperCase()+ " " + sobreNome.toUpperCase() + "!!");
}

montaNome("Eduardo","Bonfandini", "meio");