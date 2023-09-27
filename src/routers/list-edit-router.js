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

router.post('/create',validateSchema(createTaskSchema), validateTaskData, async(req, res) => {
  const { title, description, priority, isCompleted, date
  } = req.body;
  const newTask = new Task({
    title,
    description,
    priority,
    isCompleted,
    date,
    user: req.user.id
  });
  const savedTask = await newTask.save();
  res.status(201).json(savedTask);
});

router.delete('/delete/:id', async(req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "🔎 Task not found" });
  }
  return res.sendStatus(204);
});

router.put('/update/:id', validateTaskData, async(req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!task) {
    return res.status(404).json({ message: "🔎 Task not found" });
  }
  res.json(task);
});

module.exports = router;
