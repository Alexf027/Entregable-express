const express = require('express');
const router = express.Router();
const tasks = require("../data/data")

function validateTaskData(req, res, next) {
  const { id, name, description, isCompleted } = req.body;

  if(req.method === 'POST'){
    if(!id || !name || !description || typeof isCompleted !== 'boolean'){
      return res.status(400).json({error: 'Datos de tarea inválidos'});
    }
  }
  next();
};

router.post('/create', validateTaskData, (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.delete('/delete/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const tasksIndex = tasks.findIndex(task => task.id !== taskId);
  tasks.splice(tasksIndex, 1);
  res.json({ message: `Tarea con ID ${taskId} eliminada` });
  
});

router.put('/update/:taskId', validateTaskData, (req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body;
  const taskIndex = tasks.findIndex(task => (task.id == taskId));
  tasks[taskIndex] = updatedTask
  res.json(updatedTask);
});

module.exports = router;
