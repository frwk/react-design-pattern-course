import Task from "../types/Task";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import useUserContext from "./useUserContext";
import taskObservable from "../observables/taskObservable";

const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data, error, isLoading }: {data: Task[], error: any, isLoading: boolean} = useFetch({ endpoint: 'todos?_limit=50' });
  
  const user = useUserContext();

  useEffect(() => {
    if (data) {
      if (user) {
        const filteredData = data.filter((task: Task) => task.userId === user.id);
        setTasks(filteredData);
        return;
      }
      setTasks(data);
      taskObservable.notify({ message: 'Tasks loaded', severity: 'success', tasks: data });
    }
    if (error) {
      console.error(error);
    }
  }, [data, error, user]);

  const addTask = (task: Task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    taskObservable.notify({ message: `Task "${task.title}" added`, severity: 'success', tasks: updatedTasks });
  };

  const removeTask = (task: Task) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id)
    setTasks(updatedTasks);
    taskObservable.notify({ message: `Task "${task.title}" removed`, severity: 'info', tasks: updatedTasks });
  };

  const updateTask = (task: Task) => {
    const updatedTasks = tasks.map((t) => t.id === task.id ? task : t);
    setTasks(updatedTasks);
    taskObservable.notify({ message: `Task "${task.title}" updated`, severity: 'info', tasks: updatedTasks });
  }

  return {
    tasks,
    addTask,
    updateTask,
    removeTask,
    isLoading,
  };
}

export default useTaskManager;