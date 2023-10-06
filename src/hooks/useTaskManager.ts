import Task from "../types/Task";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import useUserContext from "./useUserContext";

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
    }
    if (error) {
      console.error(error);
    }
  }, [data, error, user]);

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