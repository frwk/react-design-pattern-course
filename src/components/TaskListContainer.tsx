import React from 'react';
import Task from '../types/Task';
import TaskListContainerState from '../types/TaskListContainerState';
import FilteredTask from "./FilteredTask.tsx";

class TaskListContainer extends React.Component<{}, TaskListContainerState> {

    state: TaskListContainerState = {
        tasks: [
            { id: 1, title: 'Première tâche', completed: false },
            { id: 2, title: 'Deuxième tâche', completed: true }
        ],
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
    render() {
        return (
            <>
                <FilteredTask tasks={this.state.tasks} />
            </>
        );
    }
}

export default TaskListContainer;