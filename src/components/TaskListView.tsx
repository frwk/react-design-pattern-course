import React from 'react';
import TaskListViewProps from '../types/TaskListViewProps';
import { Button, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import withPagination from './HOC/withPagination';
import PaginationProps from '../types/PaginationProps';

class TaskListView extends React.Component<TaskListViewProps & PaginationProps> {

    handleAddTask = () => {
        const title = prompt('Entrez le nom de la nouvelle tâche:');
        if (title) {
            this.props.onAdd(title);
        }
    };

    render() {
        const { items, onDelete, onToggle } = this.props;

        return (
            <div className='flex flex-col items-center'>
                <Button variant="contained" onClick={this.handleAddTask}>Ajouter une tâche</Button>
                <List>
                    {items.map(task => (
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
    }
}

export default withPagination(TaskListView);