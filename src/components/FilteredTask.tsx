import { Chip, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import FilteredTaskProps from '../types/FilteredTaskProps';

const FilteredTaskList = ({ filter, dispatch, categories, children }: FilteredTaskProps) => {
    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="filter-select-label">Filtre</InputLabel>
                <Select
                    labelId="filter-select-label"
                    value={filter.completed === null ? 'all' : filter.completed}
                    label="Filtre"
                    onChange={(e) => dispatch({ type: 'SET_COMPLETION', payload: e.target.value === 'true' ? true : e.target.value === 'false' ? false : null })}
                >
                    <MenuItem value='all'>Tout</MenuItem>
                    <MenuItem value='true'>Completées</MenuItem>
                    <MenuItem value='false'>Non completées</MenuItem>
                </Select>
            </FormControl>
            <Stack direction="row" spacing={1}>
                {categories.length > 0 && (
                    categories.map((category) => (
                        <Chip key={category.title} label={category.title} onClick={() => dispatch({ type: 'TOGGLE_CATEGORY', payload: category.title })} variant={filter.categories.some((c) => c.title === category.title) ? 'filled' : 'outlined'} />
                    ))
                )}
            </Stack>
            {children}
        </>
    );
};

export default FilteredTaskList;
