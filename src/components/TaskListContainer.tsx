import React from 'react';
import Task from '../types/Task';
import TaskListContainerState from '../types/TaskListContainerState';
import FilteredTaskList from './FilteredTask';
import TaskListView from './TaskListView';

class TaskListContainer extends React.Component<{}, TaskListContainerState> {

    state: TaskListContainerState = {
        tasks: []
    };

    async componentDidMount(): Promise<void> {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=50');
        const data = await res.json();
        this.setState({ tasks: data });
    }

    addTask = (title: string) => {
        const newTask: Task = {
            id: this.state.tasks[this.state.tasks.length - 1].id + 1,
            title: title,
            completed: false
        };
        this.setState({ tasks: [...this.state.tasks, newTask] });
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
                <FilteredTaskList tasks={this.state.tasks} render={(filteredTasks: Task[]) => (
                    <TaskListView 
                        tasks={filteredTasks} 
                        onAdd={this.addTask} 
                        onDelete={this.deleteTask} 
                        onToggle={this.toggleTask}
                        totalItems={filteredTasks.length}
                    />
                )}/>
            </>

        );
    }
}

export default TaskListContainer;