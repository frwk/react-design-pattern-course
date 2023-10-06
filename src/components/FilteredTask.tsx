import React from 'react';
import Task from "../types/Task.ts";
import {Button} from "@mui/material";

class FilteredTaskList extends React.Component<{ tasks: Task[]}> {
    state = {
        tasks: [],
        filter: 'all', // par défaut, affiche toutes les tâches
    };

    setFilter = (filter: string) => {
        this.setState({ filter });
    };

    getFilteredTasks = () => {
        switch (this.state.filter) {
            case 'completed':
                return this.props.tasks.filter(task => task.completed);
            case 'notCompleted':
                return this.props.tasks.filter(task => !task.completed);
            default:
                return this.props.tasks;
        }
    };

    render() {
        return (
            <>
                {this.getFilteredTasks().map((task) => (
                    <li key={task.id} className={task.completed ? 'completed' : 'incomplete'}>
                        {task.title}
                    </li>
                ))}
                <div className='flex justify-center gap-2'>
                    <Button variant='contained' color='success' onClick={() => this.setFilter('all')}>Toutes les tâches</Button>
                    <Button variant='contained' color='primary' onClick={() => this.setFilter('completed')}>Complètes</Button>
                    <Button variant='contained' color='error' onClick={() => this.setFilter('notCompleted')}>Incomplètes</Button>
                </div>
            </>
        );
    }
}

export default FilteredTaskList;