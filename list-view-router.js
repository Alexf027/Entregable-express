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
    name: 'Masssimo',
    description: 'Pasear al perro',
    isCompleted: true,
  },
];

router.get('/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted);
  res.json(completedTasks);
});

router.get('/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  res.json(incompleteTasks);
});

module.exports = router;
