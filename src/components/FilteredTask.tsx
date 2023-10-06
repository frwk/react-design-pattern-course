import React from 'react';
import Task from '../types/Task';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

class FilteredTask extends React.Component<{ tasks: Task[]}> {
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
                <FormControl fullWidth>
                    <InputLabel id="filter-select-label">Filtre</InputLabel>
                    <Select
                        labelId="filter-select-label"
                        value={this.state.filter}
                        label="Filtre"
                        onChange={(e) => this.setFilter(e.target.value as string)}
                    >
                        <MenuItem value='all'>Tout</MenuItem>
                        <MenuItem value='completed'>Completées</MenuItem>
                        <MenuItem value='notCompleted'>Non completées</MenuItem>
                    </Select>
                </FormControl>
                {this.getFilteredTasks().map((task) => (
                    <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none', userSelect: 'none' }}>
                        {task.title}
                    </li>
                ))}
            </>
        );
    }
}

export default FilteredTask;