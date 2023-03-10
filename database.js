const {
  readFile, 
  writeFile
} = require('fs')

const {
  promisify //metodo para transformar em promise
} = require('util')

const readFileAsync = promisify(readFile); //transformando o readFile em promise
const writeFileAsync = promisify(writeFile);

class Database {

  constructor(){
    this.NOME_ARQUIVO = "herois.json";
  }

 async getArquivo() {
  const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8'); 
  return JSON.parse(arquivo.toString());
 }

 async setArquivo(dados) { 
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
    return true;
 }
 async cadastrar(heroi){
  const dados = await this.getArquivo();
  const id = heroi.id <= 2 ? heroi.id : Date.now(); //apenas para testes
  const heroisComId = {
    id,
    ...heroi
  }
  const dadosFinal = [
    ...dados,
    heroisComId
  ]
  const resultado = await this.setArquivo(dadosFinal);
  return resultado;
 }

 async listar(id) {
  const dados = await this.getArquivo()
  const dadosFiltrados = dados.filter(item =>(id ? (item.id === id) : true));
  return dadosFiltrados;
 }

 async remover(id) {
  if(!id){
    return await this.setArquivo([]);//retorna boolean
  }
  const dados = await this.getArquivo();
  const indice = dados.findIndex(item => item.id === parseInt(id));
  if(indice === -1){
    throw  Error('O usuário não existe');
  }
  dados.splice(indice, 1);
  return await this.setArquivo(dados)
 }  
}

module.exports = new Database(); 