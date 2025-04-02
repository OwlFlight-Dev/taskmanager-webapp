import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent, Checkbox, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState(null); // Use Date object for task deadline
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
      setTaskDeadline(null); // Reset deadline
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
      setTaskDeadline(null); // Reset deadline
    }
  };

  // Delete task
  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
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
      
      {/* DateTime Picker for Deadline */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Deadline"
          value={taskDeadline}
          onChange={setTaskDeadline}
          renderInput={(props) => <TextField {...props} />}
          disabled={editingTask && editingTask.completed} // Disable if task is completed
        />
      </LocalizationProvider>

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
          <Card key={index} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6">{task.title}</Typography>
                  {task.description && <Typography variant="body2">{task.description}</Typography>}
                  {task.deadline && <Typography variant="body2" color="textSecondary">{task.deadline.toString()}</Typography>}
                </Box>
                <Box>
                  <IconButton color="primary" onClick={() => startEditingTask(task)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteTask(task)}>
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
