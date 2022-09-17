import * as express from "express";
import * as bodyParser from "body-parser" //npm install body-parser
import { URLSearchParams } from "url"; //npm install @types/node --save-dev
import * as path from 'path'; 
import fetch from 'node-fetch'; //npm instal node-fetch@2.6.6
import * as xml2js from 'xml2js'; //npm install xml2js

let server: express.Application = express();
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json());

server.get("/", async function (req, res) 
{
    let json = JSON.parse( JSON.stringify(req.query));

    let result = await consultaCorreio(json);
    //let result = {resultado:1};
    res.json(result)
});

server.listen(3000, function()
{
    console.log("Servidor bombeando!");
});

async function consultaCorreio(params:any)
{
    console.log(params);
    let queryString : string = new URLSearchParams(params).toString();
    //console.log(queryString);

    //let queryString = new URLSearchParams({page: "1", pagesize: "100"}).toString();
    //npm install @types/node --save-dev
    //sCepOrigem=95912024&sCepDestino=95900718&nVlPeso=30&nCdFormato=1&nVlComprimento=28.75&nVlAltura=11.5&nVlLargura=11.5&nVlDiametro=0&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nCdServico=41106
    let url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?'+queryString;

    console.log(queryString);

    const response = await fetch(url);
    const xml = await response.text();

    //return xml;

    console.log(xml);

    const json :any = await xml2js.parseStringPromise(xml) ;

    //console.log(JSON.stringify(json));

    return JSON.parse(JSON.stringify(json));
    //
    //console.log(json.Servicos.cServico[0].Valor[0]);
}