import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title) {
      const taskWithId = { ...newTask, id: Date.now() };
      addTask(taskWithId);
      setNewTask({ title: '', description: '', deadline: '', completed: false });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        placeholder="Task Title" 
        value={newTask.title} 
        onChange={handleChange} 
        required 
      />
      <textarea 
        name="description" 
        placeholder="Task Description" 
        value={newTask.description} 
        onChange={handleChange} 
      />
      <input 
        type="datetime-local" 
        name="deadline" 
        value={newTask.deadline} 
        onChange={handleChange} 
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
