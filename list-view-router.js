const express = require('express');
const router = express.Router();

const tasks = [
  {
    id: '1',
    name: 'Alimentos',
    description: 'Hacer la compra',
    isCompleted: false,
  },
  {
    id: '2',
    name: 'Massimo',
    description: 'Pasear al perro',
    isCompleted: true,
  },
];

function validateParameters(req, res, next) {
  const paramId = req.params.taskId; 

  if (!/^\d+$/.test(paramId)) {
    return res.status(400).json({ error: 'Parámetro no válido' });
  }
  next();
}

router.get('/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted);
  res.json(completedTasks);
});

router.get('/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  res.json(incompleteTasks);
});

router.get('/:taskId', validateParameters, (req, res) => {
  const taskId = req.params.taskId;
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  res.json(task);
});

module.exports = router;
