import React from 'react';
import TaskListView from './TaskListView';
import Task from '../types/Task';
import TaskListContainerState from '../types/TaskListContainerState';
import {Button} from "@mui/material";

class TaskListContainer extends React.Component<{}, TaskListContainerState> {

    state: TaskListContainerState = {
        tasks: [
            { id: 1, title: 'Première tâche', completed: false },
            { id: 2, title: 'Deuxième tâche', completed: true }
        ],
         filter: 'all'
    };

    addTask = (title: string) => {
        const newTask: Task = {
            id: this.state.tasks[this.state.tasks.length - 1].id + 1,
            title: title,
            completed: false
        };
        this.setState({ tasks: [...this.state.tasks, newTask] });
        console.log(this.state.tasks);
    };

    deleteTask = (id: number) => {
        const updatedTasks = this.state.tasks.filter(task => task.id !== id);
        this.setState({ tasks: updatedTasks });
    };

    toggleTask = (id: number) => {
        const updatedTasks = this.state.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        this.setState({ tasks: updatedTasks });
    };

    setFilter = (filter: string) => {
        this.setState({ filter });
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
                <TaskListView
                    tasks={this.getFilteredTasks()}
                    onAdd={this.addTask}
                    onDelete={this.deleteTask}
                    onToggle={this.toggleTask}
                />
                <div className='flex justify-center gap-2'>
                    <Button variant='contained' color="secondary" onClick={() => this.setFilter('all')}>Toutes les tâches</Button>
                    <Button variant='contained' color="success" onClick={() => this.setFilter('completed')}>Complètes</Button>
                    <Button variant='contained' color="error" onClick={() => this.setFilter('notCompleted')}>Incomplètes</Button>
                </div>
            </>

        );
    }
}

export default TaskListContainer;