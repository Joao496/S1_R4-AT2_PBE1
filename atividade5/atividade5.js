const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8081;

app.get('/produtos/pagina/:pagina', (req, res) => {
  const numeroPagina = parseInt(req.params.pagina);

  try {
    const data = fs.readFileSync('atividade5.json', 'utf8');
    const produtos = JSON.parse(data);

    let inicio = 0;
    let fim = 0;
//Aqui são os numeros das páginas que serão pesquisadas para ver os nomes dos produtos
    if (numeroPagina === 1) {
      inicio = 0;
      fim = 10;
    } else if (numeroPagina === 2) {
      inicio = 10;
      fim = 20;
    } else if (numeroPagina === 3) {
      inicio = 20;
      fim = 30;
    } else {
      return res.status(404).json({ erro: 'Página não encontrada' });
    }

    const paginaProdutos = produtos.slice(inicio, fim);
    res.json(paginaProdutos);
//Aqui são os status da pagina, 200 caso ocorra tudo certo e 500 caso ocorra um erro interno no servidor.
  } catch (erro) {
    console.error('Erro ao ler o arquivo:', erro);
    res.status(500).json({ erro: 'Erro ao ler os dados do arquivo' });
  }
});
//SEMPRE A ÚLTIMA LINHA DO CÓDIGO
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});