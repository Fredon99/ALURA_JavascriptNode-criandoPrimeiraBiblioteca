//Não consigo usar o require diretamento em um arquivo txt, pois ele só funciona com arquivos js ou equivalentes (json por exemplo)
const fs = require('fs');

//é uma propriedade que contém um array de strings representando os argumentos passados para o script ao ser executado no terminal
const caminhoArquivo = process.argv[2];

fs.readFile(caminhoArquivo, 'utf-8', (erro, texto) => {
  //implementado try catch para mostrar erro caso ocorra
  try {
    console.log(texto);
  } catch {
    console.error(erro)
  }
})