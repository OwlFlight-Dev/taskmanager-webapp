import React, { useState } from 'react';

const Task = ({ task, deleteTask, toggleComplete, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSaveEdit = () => {
    editTask(task.id, editedTask);
    setIsEditing(false);
  };

  return (
    <li style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      {isEditing ? (
        <div>
          <input 
            type="text" 
            name="title" 
            value={editedTask.title} 
            onChange={handleEditChange} 
          />
          <input 
            type="text" 
            name="description" 
            value={editedTask.description} 
            onChange={handleEditChange} 
          />
          <input 
            type="datetime-local" 
            name="deadline" 
            value={editedTask.deadline} 
            onChange={handleEditChange} 
          />
          <button onClick={handleSaveEdit}>Save</button>
        </div>
      ) : (
        <div>
          <span>{task.title}</span> - <span>{task.deadline}</span> 
          {task.description && <span> - {task.description}</span>}
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => toggleComplete(task.id)} 
          />
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </li>
  );
};

export default Task;
