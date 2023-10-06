import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import FilteredTaskProps from '../types/FilteredTaskProps';

const FilteredTaskList = ({ filter, setFilter, children }: FilteredTaskProps) => {
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
            {children}
        </>
    );
};

export default FilteredTaskList;
