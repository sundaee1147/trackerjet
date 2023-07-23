
// TaskForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        title,
        description,
        deadline,
      };
      await axios.post('/api/tasks/add', newTask);
      onTaskAdded();
      setTitle('');
      setDescription('');
      setDeadline('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}><label style={{color:"goldenrod"}}>TITLE:</label>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label style={{color:"goldenrod"}}>Description:</label>
      <textarea
        placeholder="Describe your task"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label style={{color:"goldenrod"}}>Deadline:</label>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
