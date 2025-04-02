// App.js
import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Card, CardContent, Checkbox, Divider } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const App = () => {
  // State for tasks
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');

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
      // Reset form after adding task
      setTaskTitle('');
      setTaskDescription('');
      setTaskDeadline('');
    }
  };

  // Edit task
  const editTask = (editedTask) => {
    setTasks(tasks.map((task) => (task.title === editedTask.title ? editedTask : task)));
  };

  // Delete task
  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
  };

  // Toggle task completion status
  const completeTask = (taskToComplete) => {
    setTasks(
      tasks.map((task) =>
        task === taskToComplete ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Container maxWidth="sm">
      {/* Task Manager Title */}
      <Box mt={5} mb={3}>
        <Typography variant="h4" align="center">
          Task Manager
        </Typography>
      </Box>

      {/* Add Task Form */}
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
        <Typography variant="h6" gutterBottom>
          Add New Task
        </Typography>
        <TextField
          label="Task Title"
          variant="outlined"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <TextField
          label="Task Description"
          variant="outlined"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          multiline
          rows={3}
        />
        <TextField
          label="Deadline"
          type="datetime-local"
          variant="outlined"
          value={taskDeadline}
          onChange={(e) => setTaskDeadline(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={addTask}>
          Add Task
        </Button>
      </Box>

      {/* Task List */}
      <Box mt={3}>
        {tasks.map((task, index) => (
          <Card key={index} sx={{ marginBottom: 2, backgroundColor: task.completed ? '#e0f7fa' : 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6">{task.title}</Typography>
                  {task.description && <Typography variant="body2">{task.description}</Typography>}
                  {task.deadline && <Typography variant="body2" color="textSecondary">{task.deadline}</Typography>}
                </Box>
                <Checkbox
                  checked={task.completed}
                  onChange={() => completeTask(task)}
                  color="primary"
                />
              </Box>
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => editTask(task)}
                  startIcon={<Edit />}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => deleteTask(task)}
                  startIcon={<Delete />}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default App;
