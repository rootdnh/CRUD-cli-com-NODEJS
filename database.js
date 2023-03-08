const {
  readFile
} = require('fs')

const {
  promisify //metodo para transformar em promise
} = require('util')

const readFileAsync = promisify(readFile); //transformando o readFile em promise

class Database {

  constructor(){
    this.NOME_ARQUIVO = "herois.json";
  }

 async getArquivo() {
  const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8'); 
  return JSON.parse(arquivo.toString());
 }
 setArquivo() {

 }

 async listar(id) {
  const dados = await this.getArquivo()
  const dadosFiltrados = dados.filter(item =>(id ? (item.id === id) : true));
  return dadosFiltrados;
 }
}

module.exports = new Database(); 