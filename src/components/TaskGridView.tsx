import Task from '../types/Task';
import TaskListViewProps from '../types/TaskListViewProps';
import { Button, Card, CardActions, CardContent, Chip, Grid, Tooltip } from '@mui/material';
import useUserContext from '../hooks/useUserContext';

const TaskGridView = ({ tasks, nextTaskId, onAdd, onAddCategory, onDelete, onToggle, isLoading }: TaskListViewProps) => {

    const user = useUserContext();

    const handleAddTask = () => {
        if (!user) return;
        const title = prompt('Entrez le nom de la nouvelle tâche:');
        const category = prompt('Entrez le nom de la catégorie');
        if (title) {
            onAdd({
                id: nextTaskId,
                title,
                category,
                completed: false,
                userId: user.id
            });
        }

        if (category) {
            onAddCategory({
                title: category
            })
        }
    };

    const toggleTask = (task: Task) => {
        onToggle({
            ...task,
            completed: !task.completed
        });
    };

    return (
        <div className='flex flex-col items-center gap-4'>
            <Tooltip placement="top" title={user ? null : 'Vous devez être connecté pour ajouter une tâche'}>
                <span>
                    <Button variant="contained" onClick={handleAddTask} disabled={!user}>Ajouter une tâche</Button>
                </span>
            </Tooltip>
            {isLoading ? <p>Loading...</p> : (
                <Grid container spacing={2}>
                    {tasks.map(task => (
                        <Grid item xs={12} sm={6} lg={4} key={task.id}>
                            <Card variant="outlined" className={task.completed ? 'bg-green-500' : ''}>
                                <CardContent>
                                    <div className='flex items-center gap-2'>
                                        <span>{task.title}</span>
                                        {task.category && <Chip label={task.category} size="small" />}
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained" color="error" onClick={() => onDelete(task)}>Supprimer</Button>
                                    <Button size="small" variant="contained" color={task.completed ? 'error' : 'success'} onClick={() => toggleTask(task)}>
                                        {task.completed ? 'Annuler' : 'Terminer'}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default TaskGridView;