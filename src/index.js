//Não consigo usar o require diretamento em um arquivo txt, pois ele só funciona com arquivos js ou equivalentes (json por exemplo)
const fs = require('fs');

//é uma propriedade que contém um array de strings representando os argumentos passados para o script ao ser executado no terminal
const caminhoArquivo = process.argv[2];

fs.readFile(caminhoArquivo, 'utf-8', (erro, texto) => {
  //implementado try catch para mostrar erro caso ocorra
  try {
    quebraEmParagrafo(texto);
  } catch {
    console.error(erro);
  }
})

//criar um array com todas as palavras
//contar quantas vezes as palavras se repetem
//montar objeto palavras e qtd de ocorrencias

function quebraEmParagrafo (texto) {
    const paragrafos = texto.toLowerCase().split('\n')
    // paragrafos com string vazia sao falsy consequentemente nao será retornado pelo filter
    //flatMap retorna um array como .map e junta arrays por ex [1,2,[3,4]] vira [1,2,3,4]
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