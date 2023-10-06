import React from 'react';
import TaskListView from './TaskListView';
import Task from '../types/Task';
import TaskListContainerState from '../types/TaskListContainerState';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

class TaskListContainer extends React.Component<{}, TaskListContainerState> {

    state: TaskListContainerState = {
        tasks: [
            { id: 1, title: 'Première tâche', completed: false },
            { id: 2, title: 'Deuxième tâche', completed: true }
        ],
        filter: 'all',
    };

    setFilter = (filter: string) => {
        this.setState({ filter });
    };


    addTask = (title: string) => {
        const newTask: Task = {
            id: this.state.tasks.length + 1,
            title: title,
            completed: false
        };
        this.setState({ tasks: [...this.state.tasks, newTask] });
    };

    deleteTask = (id: number) => {
        const updatedTasks = this.state.tasks.filter((task: Task) => task.id !== id);
        this.setState({ tasks: updatedTasks });
    };

    toggleTask = (id: number) => {
        const updatedTasks = this.state.tasks.map((task: Task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        this.setState({ tasks: updatedTasks });
    };

    getFilteredTasks = (): Task[] => {
        switch (this.state.filter) {
            case 'completed':
                return this.state.tasks.filter(task => task.completed);
            case 'notCompleted':
                return this.state.tasks.filter(task => !task.completed);
            default:
                return this.state.tasks;
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
                <TaskListView
                    tasks={this.getFilteredTasks()}
                    onAdd={this.addTask}
                    onDelete={this.deleteTask}
                    onToggle={this.toggleTask}
                />
            </>
        );
    }
}

export default TaskListContainer;