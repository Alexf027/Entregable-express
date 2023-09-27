const express = require('express');
const router = express.Router();
const Task = require("../models/task.model");

router.get("/tasks", async(req, res) =>{
  const tasks = await Task.find({
    user: req.user.id
  }).populate('user')
  res.status(200).json(tasks);
})

router.get('/completed', async(req, res) => {
  const completedTasks = await Task.find(task => task.isCompleted).populate('user');
  res.json(completedTasks);
});

router.get('/incomplete', async(req, res) => {
  const incompleteTasks = await Task.filter(task => !task.isCompleted).populate('user');
  res.json(incompleteTasks);
});

router.get('/:id', async(req, res) => {
  const task = await Task.findById(req.params.id).populate('user');
  if (!task) {
    return res.status(404).json({ message: "🔎 Task not found" });
  }
  res.json(task);
});

module.exports = router;
