const fetch = require('node-fetch');

const SERVER_URL = 'http://localhost:3000/update';

function gerarDados() {
  const pressao = (Math.random() * 9 + 1).toFixed(2);
  const vazao = (Math.random() * 100).toFixed(2);
  return { pressao, vazao };
}

async function enviarDados() {
  const dados = gerarDados();
  const url = `${SERVER_URL}?pressao=${dados.pressao}&vazao=${dados.vazao}`;

  try {
    const res = await fetch(url);
    if (res.ok) {
      console.log('Dados enviados:', dados);
    } else {
      console.log('Falha no envio:', res.statusText);
    }
  } catch (error) {
    console.log('Erro ao enviar dados:', error.message);
  }
}

setInterval(enviarDados, 10000);
