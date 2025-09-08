const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8081;

app.get('/eventos', (req, res) => {
  const dataFiltro = req.query.data;

  try {
    const data = fs.readFileSync('atividade3.json', 'utf8');
    const eventos = JSON.parse(data);

    let eventosFiltrados = eventos;

    if (dataFiltro) {
      eventosFiltrados = eventos.filter(evento => evento.data === dataFiltro);
    }
//Aqui são os status da pagina, 200 caso ocorra tudo certo e 500 caso ocorra um erro interno no servidor.
    res.status(200).json(eventosFiltrados);
  } catch (error) {
    console.error('Erro ao ler o arquivo de eventos:', error);
    res.status(500).json({ erro: 'Erro ao processar os dados dos eventos' });
  }
});
//SEMPRE A ÚLTIMA LINHA DO CÓDIGO
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});