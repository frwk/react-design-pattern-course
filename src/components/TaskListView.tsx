import TaskListViewProps from '../types/TaskListViewProps';
import { Button, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Task from '../types/Task';
import { useContext } from 'react';
import { UserContext } from '../App';

const TaskListView = ({ tasks, onAdd, onDelete, onToggle, isLoading }: TaskListViewProps) => {

  const user = useContext(UserContext);

  const handleAddTask = () => {
    if (!user) return;
    const title = prompt('Entrez le nom de la nouvelle tâche:');
    if (title) {
      onAdd({
        id: tasks.length + 1,
        title,
        completed: false,
        userId: user.id
      });
    }
  };

  const toggleTask = (task: Task) => {
    onToggle({
      ...task,
      completed: !task.completed
    });
  };

  return (
    <div className='flex flex-col items-center'>
      <Tooltip placement="top" title={user ? null : 'Vous devez être connecté pour ajouter une tâche'}>
        <span>
            <Button variant="contained" onClick={handleAddTask} disabled={!user}>Ajouter une tâche</Button>
        </span>
      </Tooltip>
      {isLoading ? <p>Loading...</p> : (
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  disableRipple
                  onClick={() => toggleTask(task)}
                />
              </ListItemIcon>
              <ListItemText
                style={{ textDecoration: task.completed ? 'line-through' : 'none', userSelect: 'none' }}
                onClick={() => toggleTask(task)}
              >
                {task.title}
              </ListItemText>
              <IconButton color="error" onClick={() => onDelete(task)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default TaskListView;