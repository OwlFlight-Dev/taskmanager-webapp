import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const TaskForm = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');

  const handleAddTask = () => {
    if (taskTitle) {
      onAddTask({
        title: taskTitle,
        description: taskDescription,
        deadline: taskDeadline,
        completed: false,
      });
      setTaskTitle('');
      setTaskDescription('');
      setTaskDeadline('');
    }
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
        type="date"
        variant="outlined"
        value={taskDeadline}
        onChange={(e) => setTaskDeadline(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
