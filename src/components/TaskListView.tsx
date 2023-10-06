import { useState, useEffect } from 'react';
import TaskListViewProps from '../types/TaskListViewProps';
import { Button, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import withPagination from './HOC/withPagination';
import PaginationProps from '../types/PaginationProps';

const TaskListView = ({ tasks, onAdd, onDelete, onToggle, currentPage, itemsPerPage }: TaskListViewProps & Partial<PaginationProps>) => {
  const [displayedTasks, setDisplayedTasks] = useState(tasks);

  useEffect(() => {
    if (currentPage && itemsPerPage) {
      setDisplayedTasks(tasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    } else {
      setDisplayedTasks(tasks);
    }
  }, [currentPage, itemsPerPage, tasks]);

  const handleAddTask = () => {
    const title = prompt('Entrez le nom de la nouvelle tâche:');
    if (title) {
      onAdd(title);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <Button variant="contained" onClick={handleAddTask}>Ajouter une tâche</Button>
      <List>
        {displayedTasks.map((task: any) => (
          <ListItem key={task.id}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.completed}
                disableRipple
                onClick={() => onToggle(task.id)}
              />
            </ListItemIcon>
            <ListItemText
              style={{ textDecoration: task.completed ? 'line-through' : 'none', userSelect: 'none' }}
              onClick={() => onToggle(task.id)}
            >
              {task.title}
            </ListItemText>
            <IconButton color="error" onClick={() => onDelete(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default withPagination(TaskListView);
