const express = require('express');
const router = express.Router();

function validateTaskData(req, res, next) {
  const { id, name, description, isCompleted } = req.body;

  if(req.method === 'POST' || req.method === 'PUT'){
    if(!id || !name || !description || typeof isCompleted !== 'boolean'){
      return res.status(400).json({error: 'Datos de tarea inválidos'});
    }
  }
  next();
};

router.use(express.json());

router.post('/create', validateTaskData, (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(newTask);
});

router.delete('/delete/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  tasks = tasks.filter(task => task.id !== taskId);
  res.json({ message: `Tarea con ID ${taskId} eliminada` });
});

router.put('/update/:taskId', validateTaskData, (req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body;
  tasks = tasks.map(task => (task.id === taskId ? updatedTask : task));
  res.json(updatedTask);
});

module.exports = router;
