import fs from 'fs'
import trataErros from './funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';

const caminhoArquivo = process.argv[2];
const endereco = process.argv[3];

fs.readFile(caminhoArquivo, 'utf-8', (erro, texto) => {
  try {
    if (erro) throw erro;
    const resultado = contaPalavras(texto);
    criaESalvaArquivo(resultado, endereco);
  } catch (erro){
    trataErros(erro)
  }
})

//Utilizando async await
// async function criaESalvaArquivo (listaPalavras, endereco) {
//     const arquivoNovo = `${endereco}/resultado.txt`;
//     const textoPalavras = JSON.stringify(listaPalavras);
    
//     try {
//         await fs.promises.writeFile(arquivoNovo, textoPalavras);
//         console.log('Arquivo criado.');
//     } catch (erro) {
//         throw erro;
//     }
// }

//utilizando .then .catch .finally
function criaESalvaArquivo (listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);
    
    fs.promises.writeFile(arquivoNovo, textoPalavras)
        .then(() => {
            console.log('Arquivo criado.');
        })
        .catch ((erro) => {
            throw erro;
        })
        .finally (() => {
            console.log('Operação finalizada!')
        })

}