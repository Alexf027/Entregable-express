const express = require('express');
const router = express.Router();

const tasks = [
  {
    id: '3',
    name: 'Estudiar',
    description: 'Leer documentacion de express',
    isCompleted: false,
  },
  {
    id: '4',
    name: 'Ejercicio',
    description: 'entrenar 1 hora diaria',
    isCompleted: true,
  },
];

router.post('/create', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(newTask);
});

router.delete('/delete/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  tasks = tasks.filter(task => task.id !== taskId);
  res.json({ message: `Tarea con ID ${taskId} eliminada` });
});

router.put('/update/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body;
  tasks = tasks.map(task => (task.id === taskId ? updatedTask : task));
  res.json(updatedTask);
});

module.exports = router;
