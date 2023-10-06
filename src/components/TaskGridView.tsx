import TaskListViewProps from '../types/TaskListViewProps';
import { Button, Card, CardActions, CardContent, Grid } from '@mui/material';

const TaskGridView: React.FC<TaskListViewProps> = ({ tasks, onAdd, onDelete, onToggle, }) => {

    const handleAddTask = () => {
        const title = prompt('Entrez le nom de la nouvelle tâche:');
        if (title) {
            onAdd(title);
        }
    };

    return (
        <div className='flex flex-col items-center gap-4'>
            <Button variant="contained" onClick={handleAddTask}>Ajouter une tâche</Button>
            <Grid container spacing={2}>
                {tasks.map(task => (
                    <Grid item xs={12} sm={6} lg={4} key={task.id}>
                        <Card variant="outlined" className={task.completed ? 'bg-green-500' : ''}>
                            <CardContent>
                                {task.title}
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="contained" color="error" onClick={() => onDelete(task.id)}>Supprimer</Button>
                                <Button size="small" variant="contained" color={task.completed ? 'error' : 'success'} onClick={() => onToggle(task.id)}>
                                    {task.completed ? 'Annuler' : 'Terminer'}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default TaskGridView;
