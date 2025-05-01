// pages/api/visitas.js
import fs from 'fs';
import path from 'path';

// Caminho para o arquivo visitas.json
const filePath = path.resolve('./visitas.json');

// Função para ler o número de visitas do arquivo
function getCount() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data).total || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

// Função que será chamada quando a rota for acessada
export default function handler(req, res) {
  const count = getCount() + 1; // Aumenta o contador
  fs.writeFileSync(filePath, JSON.stringify({ total: count })); // Atualiza o arquivo visitas.json
  res.status(200).json({ total: count }); // Retorna o número de visitas atualizado
}