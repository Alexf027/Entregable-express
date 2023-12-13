const express = require('express');
const router = express.Router();
const Task = require("../models/task.model");

router.get("/tasks", async(req, res) =>{
  const tasks = await Task.find({
    user: req.user.id
  }).populate('user')
  res.status(200).json(tasks);
})

router.get('/tasks/completed', async(req, res) => {
  try {
    const completedTasks = await Task.find(task => task.isCompleted).populate('user');
  res.json(completedTasks);
  } catch (error) {
    return res.status(500).json({ message: "😓 Something went wrong" });
  }
});

router.get('/tasks/incomplete', async(req, res) => {
  try {
    const incompleteTasks = await Task.filter(task => !task.isCompleted).populate('user');
  res.json(incompleteTasks);
  } catch (error) {
    return res.status(500).json({ message: "😓 Something went wrong" });
  }
});

router.get('tasks/:id', async(req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('user');
    if (!task)
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: 'Task not found'});
  }
});

module.exports = router;
