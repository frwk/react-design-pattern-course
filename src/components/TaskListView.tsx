import TaskListViewProps from '../types/TaskListViewProps';
import { Button, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Task from '../types/Task';

const TaskListView = ({ tasks, onAdd, onDelete, onToggle, isLoading }: TaskListViewProps) => {

  const handleAddTask = () => {
    const title = prompt('Entrez le nom de la nouvelle tâche:');
    if (title) {
      onAdd({
        id: tasks.length + 1,
        title,
        completed: false
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
      <Button variant="contained" onClick={handleAddTask}>Ajouter une tâche</Button>
      {isLoading ? <p>Loading...</p> : (
        <List>
          {tasks.map((task: any) => (
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
