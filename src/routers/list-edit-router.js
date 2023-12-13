const express = require('express');
const createTaskSchema = require('../schemas/task.schema');
const validateSchema = require('../middleware/validate');
const router = express.Router();
const Task = require("../models/task.model");

function validateTaskData(req, res, next) {
  if(req.method === 'POST' || req.method === 'PUT' ){
    if(!validateTaskData){
      return res.status(400).json({error: "🌐 Invalid parameter"});
    }
  }
  next();
};

router.post('/create', validateSchema(createTaskSchema), validateTaskData, async (req, res) => {
  try {
    const { title, description, priority, completed, date } = req.body;

    if (!['baja', 'media', 'alta'].includes(priority)) {
      return res.status(400).json({ error: '🌐 Invalid priority' });
    }

    const newTask = new Task({
      title,
      description,
      priority,
      completed,
      date,
      user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    return res.status(500).json({ message: '😓 Something went wrong' });
  }
});

router.delete('/delete/:id', async(req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "🔎 Task not found" });
  }
  return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "🔎 Task not found" });
  }
  
});

router.put('/update/:id', validateTaskData, async(req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!task) {
      return res.status(404).json({ message: "🔎 Task not found" });
    }
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "🔎 Task not found" });
  }
});

// Ruta para obtener las opciones de prioridad
router.get('/priorities', (req, res) => {
  const priorities = ['baja', 'media', 'alta'];
  res.json(priorities);
});

module.exports = router;
