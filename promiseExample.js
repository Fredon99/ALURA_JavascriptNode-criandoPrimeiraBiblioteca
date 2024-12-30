function promessa(bool) {
 const x = bool;
 console.log('Vou ver e te aviso...')
 return new Promise((resolve, reject) => {
   if (!x) {
     reject('Falha na promessa');
   }
   setTimeout(() => {
    resolve("sucesso na promessa");
   },2000)
   
 });
}

function exibeResposta(textoResult) {
 console.log(textoResult);
}

promessa(true)
 .then((texto) => exibeResposta(texto))
 .catch((texto) => exibeResposta(texto))
 .finally(() => {
    console.log('Finalmente terminou essa parada!')
 })
// sucesso na promessa