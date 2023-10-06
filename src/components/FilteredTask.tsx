import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import FilteredTaskProps from '../types/FilteredTaskProps';

const FilteredTaskList: React.FC<FilteredTaskProps> = ({ tasks, render }) => {
    const [filter, setFilter] = useState('all'); // par défaut, affiche toutes les tâches

    const getFilteredTasks = () => {
        switch (filter) {
            case 'completed':
                return tasks.filter(task => task.completed);
            case 'notCompleted':
                return tasks.filter(task => !task.completed);
            default:
                return tasks;
        }
    };

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="filter-select-label">Filtre</InputLabel>
                <Select
                    labelId="filter-select-label"
                    value={filter}
                    label="Filtre"
                    onChange={(e) => setFilter(e.target.value as string)}
                >
                    <MenuItem value='all'>Tout</MenuItem>
                    <MenuItem value='completed'>Completées</MenuItem>
                    <MenuItem value='notCompleted'>Non completées</MenuItem>
                </Select>
            </FormControl>
            {render(getFilteredTasks())}
        </>
    );
};

export default FilteredTaskList;
