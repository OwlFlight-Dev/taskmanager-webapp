import React from 'react';
import { Card, CardContent, Typography, Button, Checkbox, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const Task = ({ task, onEdit, onDelete, onComplete }) => {
  return (
    <Card sx={{ marginBottom: 2, backgroundColor: task.completed ? '#e0f7fa' : 'white' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6">{task.title}</Typography>
            {task.description && <Typography variant="body2">{task.description}</Typography>}
            {task.deadline && <Typography variant="body2" color="textSecondary">{task.deadline}</Typography>}
          </Box>
          <Checkbox
            checked={task.completed}
            onChange={() => onComplete(task)}
            color="primary"
          />
        </Box>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => onEdit(task)}
            startIcon={<Edit />}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onDelete(task)}
            startIcon={<Delete />}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Task;
