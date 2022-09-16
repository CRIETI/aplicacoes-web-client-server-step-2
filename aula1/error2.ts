function caraOuCoroa()
{
    return Math.random() > 0.5 ? 1 : 0;
}

let resultado = caraOuCoroa();

console.log(resultado);