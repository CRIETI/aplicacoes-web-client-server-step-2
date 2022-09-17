import fetch from 'node-fetch';
import * as xml2js from 'xml2js';
//import { URLSearchParams } from "url"

async function main()
{
    //let queryString = new URLSearchParams({page: "1", pagesize: "100"}).toString();
    //npm install @types/node --save-dev
    let url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=95912024&sCepDestino=95900718&nVlPeso=30&nCdFormato=1&nVlComprimento=28.75&nVlAltura=11.5&nVlLargura=11.5&nVlDiametro=0&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nCdServico=41106';

    const response = await fetch(url);
    const xml = await response.text();

    console.log(xml);

    const json :any = await xml2js.parseStringPromise(xml) ;

    console.log(JSON.stringify(json));

    //console.log(json.Servicos.cServico[0].Valor[0]);
}

main();