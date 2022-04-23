import fetch from 'node-fetch';
import chalk from 'chalk';

function manejaErros(erro) {
    throw new Error(chalk.red(erro.message));
}

async function checaStatus(arrayURLs) {
    try {
        const arrayStatus = await Promise.all(
                arrayURLs.map(async url => {
                    const res = await fetch(url);
                    return `${res.status} - ${res.statusText}`;;
                })
            );
        return arrayStatus;
    } catch(erro) {
        manejaErros(erro);
    }
}

function geraArrayDeURLs(arrayLinks) {
    // para cada objeto, retorna apenas o valor
    // Object.values(objeto) -> retorn array com valores do objeto
    return arrayLinks.map(objetoLink => Object.values(objetoLink).join());
}

export default async function validaURLs(arrayLinks) {
    const links = geraArrayDeURLs(arrayLinks);
    const statusLinks = await checaStatus(links);

    const resultados = arrayLinks.map((objeto, indice) => ({
        ...objeto,
        status: statusLinks[indice]    
    }))
    return resultados;
}