// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks for a user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user }).sort({ deadline: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Create a new task
router.post('/add', async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const newTask = new Task({
      user: req.user,
      title,
      description,
      deadline,
    });
    await newTask.save();
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
      const { title, description, deadline } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          deadline,
        },
        { new: true } // To return the updated task after the update
      );
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task' });
    }
  });


  // Delete a task
router.delete('/:id', async (req, res) => {
    try {
      await Task.findByIdAndRemove(req.params.id);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task' });
    }
  });
  

module.exports = router;
