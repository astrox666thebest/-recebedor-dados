const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para lidar com os dados JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para receber os dados do outro site
app.post('/receber-dados', (req, res) => {
  const dados = req.body;
  const dataString = JSON.stringify(dados, null, 2) + '\n';

  // Salvar os dados recebidos em um arquivo .txt
  fs.appendFile(path.join(__dirname, 'dados.txt'), dataString, (err) => {
    if (err) {
      console.error('Erro ao salvar os dados:', err);
      return res.status(500).send('Erro ao salvar os dados.');
    }
    res.send('Dados recebidos e salvos com sucesso!');
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
