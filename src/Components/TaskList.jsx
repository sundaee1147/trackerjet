
// TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('deadline');



    const fetchTasks = async () => {
    try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
    } catch (error) {
        console.error(error);
    }
    };

    useEffect(() => {
    fetchTasks();
    }, []);

    //function to handle Updating tasks
    const handleUpdateTask = async (id, updatedTask) => {
    try {
        await axios.put(`/api/tasks/${id}`, updatedTask);
        fetchTasks(); // Refresh the task list after updating
    } catch (error) {
        console.error(error);
    }
    };


    //function to handle Deleting tasks
    const handleDeleteTask = async (id) => {
    try {
        await axios.delete(`/api/tasks/${id}`);
        fetchTasks(); // Refresh the task list after deleting
    } catch (error) {
        console.error(error);
    }
};

    // Filtering tasks based on status and search term
    const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'all' || (filterStatus === 'done' && task.isDone) || (filterStatus === 'notDone' && !task.isDone)) {
        return task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
    });

// Sorting tasks based on the selected sort option
const sortedTasks = filteredTasks.sort((task1, task2) => {
if (sortOption === 'deadline') {
    return new Date(task1.deadline) - new Date(task2.deadline);
} else if (sortOption === 'priority') {
    return task2.priority - task1.priority;
} else {
    return new Date(task1.deadline) - new Date(task2.deadline);  // Default to sorting by deadline
}
});



return (
    <div>
      <div>
        <label style={{color:"goldenrod"}}>Filter by Status:</label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="done">Completed</option>
          <option value="notDone">In Progress</option>
        </select>
        <label style={{color:"goldenrod"}}>Search:</label>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <label style={{color:"goldenrod"}}>Sort by:</label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="deadline">Deadline</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      
      {sortedTasks.map((task) => (
        <div key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Status: {task.isDone ? 'Done' : 'Not Done'}</p>
            <button onClick={() => handleUpdateTask(task._id, { ...task, isDone: !task.isDone })}>
                {task.isDone ? 'Mark as Not Done' : 'Mark as Done'}
            </button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
        </div>
        ))}
    </div>
    );
};

export default TaskList;
