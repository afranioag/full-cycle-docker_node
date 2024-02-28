const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

function nome() {
  const nomes = ['João', 'Maria', 'Pedro', 'Ana', 'Lucas', 'Julia', 'Carlos', 'Mariana', 'Paulo', 'Camila', 'Luiza', 'Felipe', 'Gabriel', 'Isabela', 'Fernanda', 'Rafael', 'Leticia', 'Gustavo', 'Bruna', 'Thiago'];
  const sobrenomes = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Carvalho', 'Ferreira', 'Rodrigues', 'Almeida', 'Costa', 'Martins', 'Araujo', 'Lima', 'Gomes', 'Ribeiro', 'Alves', 'Monteiro', 'Barbosa', 'Rocha', 'Sousa'];

  const index = Math.floor(Math.random() * nomes.length);
  const index_SN = Math.floor(Math.random() * sobrenomes.length);

  return nomes[index] + ' ' + sobrenomes[index_SN];
}

function peopleList(callback) {
  const sql = 'SELECT * FROM people';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao executar a query:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}

app.get('/', (req, res) => {
  const name = nome();
  const sql = `INSERT INTO people(name) VALUES ('${name}')`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erro ao executar a query:', err);
      res.status(500).send('Erro interno do servidor');
      return;
    }
    console.log('Nome inserido com sucesso:', name);
  
    peopleList((err, people) => {
      if (err) {
        console.error('Erro ao obter a lista de pessoas:', err);
        res.status(500).send('Erro interno do servidor');
        return;
      }

      let response = '<h1>Full Cycle!!!</h1>\n';
     
      response += '<h2>Lista de Pessoas:</h2>\n<ul>';
     
      people.forEach(person => {
        response += `<li>ID: ${person.id}, Nome: ${person.name}</li>\n`;
      });
     
      response += '</ul>';

      res.send(response);

    });
  });
});


app.listen(port, ()=> {
  console.log('Rodando na porta ' + port)
})



