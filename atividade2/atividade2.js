const express = require("express");
const app = express();
const PORT = 8081;
const fs = require("fs");

app.get("/usuarios2", (req, res) => {
    try {
       
        const data = fs.readFileSync("atividade2.json", "utf-8");

     
        let usuarios = JSON.parse(data);

        
        const { nome } = req.query;

        if (nome) {
            usuarios = usuarios.filter(usuario =>
                usuario.nome.toLowerCase().includes(nome.toLowerCase())
            );
        }

        //Aqui são os status da pagina, 200 caso ocorra tudo certo e 500 caso ocorra um erro interno no servidor.
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Erro ao ler ou parsear o arquivo JSON:", error);
        res.status(500).send("Erro interno no servidor");
    }
});

//SEMPRE NA ÚLTIMA LINHA, SERVE QUE IRÁ RODAR
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});