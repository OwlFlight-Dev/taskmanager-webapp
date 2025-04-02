import React from 'react';
import { List, Divider } from '@mui/material';
import Task from './Task';

const TaskList = ({ tasks, onEdit, onDelete, onComplete }) => {
  return (
    <List>
      {tasks.map((task, index) => (
        <React.Fragment key={index}>
          <Task
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onComplete={onComplete}
          />
          {index < tasks.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default TaskList;
