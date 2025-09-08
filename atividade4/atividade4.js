const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8081;

app.get('/livros', (req, res) => {
  fs.readFile('atividade4.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return res.status(500).json({ erro: 'Erro ao ler os dados dos livros' });
    }

    try {
      let livros = JSON.parse(data);

      // Filtros para ver os nomes e autores/ano dos livros.
      const { titulo, autor, ano } = req.query;

      if (titulo) {
        livros = livros.filter(livro =>
          livro.titulo.toLowerCase().includes(titulo.toLowerCase())
        );
      }

      if (autor) {
        livros = livros.filter(livro =>
          livro.autor.toLowerCase().includes(autor.toLowerCase())
        );
      }

      if (ano) {
        const anoInt = parseInt(ano);
        if (!isNaN(anoInt)) {
          livros = livros.filter(livro => livro.ano >= anoInt);
        }
      }
//Aqui são os status da pagina, 200 caso ocorra tudo certo e 500 caso ocorra um erro interno no servidor.
      res.status(200).json(livros);
    } catch (parseError) {
      console.error('Erro ao processar os dados:', parseError);
      res.status(500).json({ erro: 'Erro ao processar os dados dos livros' });
    }
  });
});
//SEMPRE A ÚLTIMA LINHA DO CÓDIGO
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});