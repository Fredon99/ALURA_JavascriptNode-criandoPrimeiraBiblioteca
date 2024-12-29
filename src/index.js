//Não consigo usar o require diretamento em um arquivo txt, pois ele só funciona com arquivos js ou equivalentes (json por exemplo)
const fs = require('fs');
const trataErros = require('./funcoesErro')

//é uma propriedade que contém um array de strings representando os argumentos passados para o script ao ser executado no terminal
const caminhoArquivo = process.argv[2];

fs.readFile(caminhoArquivo, 'utf-8', (erro, texto) => {
  //refinando try catch
  try {
    if (erro) throw erro;
    contaPalavras(texto);
  } catch (erro){
    trataErros(erro)
  }
})

function contaPalavras (texto) {
    // paragrafos com string vazia sao falsy consequentemente nao será retornado pelo filter
    //flatMap retorna um array como .map e junta arrays por ex [1,2,[3,4]] vira [1,2,3,4]
    const paragrafos = extraiParagrafos(texto)
    const contagem = paragrafos.flatMap((paragrafo) => {
      if (!paragrafo) return [];
      return verificaPalavrasDuplicadas(paragrafo);
  })
  //devido a performance foi utilizado o flatMap
  // .filter((paragrafo) => paragrafo)
  // .map((paragrafo) => {
  //     return verificaPalavrasDuplicadas(paragrafo)
  // })
  console.log(contagem)
}

function extraiParagrafos (texto) {
  return texto.toLowerCase().split('\n')
}

function limpaPalavras(palavra) {
    //regex para remover caracteres especiais
    return palavra.replace('/[.,\/#!$%\^&\*;:{}=\-_`~()]/g','')
}

function verificaPalavrasDuplicadas (texto) {
    const listaPalavras = texto.split(' ');
    const resultado = {};

    listaPalavras.forEach((palavra) => {
        if (palavra.length >= 3 ) {
            const palavraLimpa = limpaPalavras(palavra)
            //operado OR verifica se há valor verdadeiro da esquerda p direito e pega o primeiro truthy ou último falsy
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1
        }
    });

    return resultado;
}