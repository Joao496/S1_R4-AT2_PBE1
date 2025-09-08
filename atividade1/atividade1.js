const express = require("express");
const app = express();
const PORT = 8081;
const fs = require('fs');

app.get("/Usuarios", (req, res) => {
    try {
      
        const data = fs.readFileSync("atividade.json", "utf-8");

     
        let usuarios = JSON.parse(data);

        const { nome, email } = req.query;

        if (nome) {
            usuarios = usuarios.filter(
                usuario => usuario.nome.toLowerCase().includes(nome.toLowerCase())
            );
        }

        if (email) {
            usuarios = usuarios.filter(
                usuario => usuario.email.toLowerCase().includes(email.toLowerCase())
            );
        }

    
        res.status(200).json(usuarios);

    } catch (error) {
        console.error("Erro ao ler o arquivo JSON", error);
        res.status(500).send("Erro interno no servidor");
    }
});
//SEMPRE NA ÚLTIMA LINHA, SERVE QUE IRÁ RODAR
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
