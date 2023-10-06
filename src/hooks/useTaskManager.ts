import Task from "../types/Task";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data, error, isLoading } = useFetch({ endpoint: 'todos?_limit=50' });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
    if (error) {
      console.error(error);
    }
  }, [data, error]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (task: Task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const updateTask = (task: Task) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        }

        return t;
      })
    );
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
