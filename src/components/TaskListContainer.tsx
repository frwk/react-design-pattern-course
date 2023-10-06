import { useState, useEffect } from 'react';
import Task from '../types/Task';
import TaskListContainerState from '../types/TaskListContainerState';
import FilteredTask from "../components/FilteredTask";
import TaskListView from "../components/TaskListView";

const TaskListContainer: React.FC<TaskListContainerState> = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=50');
            const data = await res.json();
            setTasks(data);
        };

        fetchTasks();
    }, []);

    const addTask = (title: string) => {
        const newTask: Task = {
            id: tasks[tasks.length - 1].id + 1,
            title: title,
            completed: false
        };
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    };

    const toggleTask = (id: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <>
            <FilteredTask tasks={tasks} render={(filteredTasks: Task[]) => (
                <TaskListView 
                    tasks={filteredTasks} 
                    onAdd={addTask} 
                    onDelete={deleteTask} 
                    onToggle={toggleTask}
                    totalItems={filteredTasks.length}
                />
            )}/>
        </>

    );
};

export default TaskListContainer;
