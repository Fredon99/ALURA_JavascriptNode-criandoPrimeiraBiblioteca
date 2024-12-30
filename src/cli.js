import fs from 'fs'
import path from 'path';
import trataErros from './funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --caminhoTexto <string>', 'caminho do texto a ser processado')
    .option('-d, --caminhoDestino <string>', 'caminho da pasta onde salvar o arquivo de resultados')
    .action((options) => {
        //desestrutucao de variaveis
        const {caminhoTexto, caminhoDestino} = options;

        if (!caminhoTexto || !caminhoDestino) {
            console.error(chalk.red('error: Favor inserir caminho de origem e destino'));
            program.help();
            return;
        }

        const caminhoDoTexto = path.resolve(caminhoTexto)
        const caminhoDoDestino = path.resolve(caminhoDestino)

        try {
            processaArquivo(caminhoDoTexto,caminhoDoDestino);
            console.log(chalk.green('Texto processado com sucesso'));
        } catch (erro) {
            console.log(chalk.red('Ocorreu um erro no processamento'), erro)
        }
    })

program.parse()

// com essa nova lib não precisarei mais de obter os arquivos dessa maneira
// const caminhoArquivo = process.argv[2];
// const endereco = process.argv[3];

function processaArquivo (caminhoTexto, caminhoDestino) {
    fs.readFile(caminhoTexto, 'utf-8', (erro, texto) => {
        try {
          if (erro) throw erro;
          const resultado = contaPalavras(texto);
          criaESalvaArquivo(resultado, caminhoDestino);
        } catch (erro){
          trataErros(erro)
        }
      })
}



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