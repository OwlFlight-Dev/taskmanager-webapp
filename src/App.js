import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState(''); // Deadline as a string
  const [editingTask, setEditingTask] = useState(null);  // Keep track of the task being edited

  // Add new task
  const addTask = () => {
    if (taskTitle) {
      const newTask = {
        title: taskTitle,
        description: taskDescription,
        deadline: taskDeadline,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
      setTaskDescription('');
      setTaskDeadline(''); // Reset deadline
    }
  };

  // Edit task
  const startEditingTask = (task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskDeadline(task.deadline);
  };

  // Save the edited task
  const saveTask = () => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task === editingTask
            ? { ...task, title: taskTitle, description: taskDescription, deadline: taskDeadline }
            : task
        )
      );
      // Reset form and editing mode after saving
      setEditingTask(null);
      setTaskTitle('');
      setTaskDescription('');
      setTaskDeadline(''); // Reset deadline
    }
  };

  // Delete task
  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
  };

  // Toggle task completion status
  const toggleComplete = (taskToToggle) => {
    setTasks(
      tasks.map((task) =>
        task === taskToToggle
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Task Manager
      </Typography>

      {/* Task Form */}
      <TextField
        label="Task Title"
        variant="outlined"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        disabled={editingTask && editingTask.completed} // Disable editing if task is completed
      />
      <TextField
        label="Task Description"
        variant="outlined"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        multiline
        rows={3}
        disabled={editingTask && editingTask.completed} // Disable editing if task is completed
      />
      
      {/* Deadline Input */}
      <input
        type="datetime-local"
        value={taskDeadline}
        onChange={(e) => setTaskDeadline(e.target.value)}
        disabled={editingTask && editingTask.completed} // Disable if task is completed
        style={{ padding: '8px', fontSize: '16px' }}
      />

      {editingTask ? (
        <Button variant="contained" color="primary" onClick={saveTask}>
          Save Changes
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={addTask}>
          Add Task
        </Button>
      )}

      {/* Task List */}
      <Box mt={3}>
        {tasks.map((task, index) => (
          <Card
            key={index}
            sx={{
              marginBottom: 2,
              backgroundColor: task.completed ? 'rgba(0, 255, 0, 0.1)' : 'white', // Change background for completed tasks
              textDecoration: task.completed ? 'line-through' : 'none', // Strikethrough for completed tasks
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6">{task.title}</Typography>
                  {task.description && <Typography variant="body2">{task.description}</Typography>}
                  {task.deadline && <Typography variant="body2" color="textSecondary">{task.deadline}</Typography>}
                </Box>
                <Box display="flex" alignItems="center">
                  {/* Task Completion Checkbox */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={task.completed}
                        onChange={() => toggleComplete(task)} // Toggle completion on checkbox change
                      />
                    }
                  />
                  <IconButton color="primary" onClick={() => startEditingTask(task)} disabled={task.completed}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteTask(task)} disabled={task.completed}>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default App;
