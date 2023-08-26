const express = require('express');
const app = express();

const tasks = [
  {
    id: '123456',
    isCompleted: false,
    description: 'Hacer ejercicios de laboratorio',
  },
  {
    id: '789012',
    isCompleted: true,
    description: 'Leer documentacion',
  },
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
