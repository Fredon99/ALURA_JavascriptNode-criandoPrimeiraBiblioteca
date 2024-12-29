function trataErros (erro) {
    if (erro.code === 'ENOENT') {
        //lança um objeto Error "personalizado"
        throw new Error('Arquivo não encontrado')
        //Apena imprime uma mensagem de erro
        //return 'Erro devido a arquivo não encontrado.'
    } else {
        return 'Erro na aplicação'
    }
}

module.exports = trataErros;