import Task from "../types/Task";
import { useEffect, useState } from "react";

const useFilter = (tasks: Task[]) => {
  const [filter, setFilter] = useState('all'); // par défaut, affiche toutes les tâches
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    const filterTasks = () => {
      switch (filter) {
        case 'completed':
          setFilteredTasks(tasks.filter(task => task.completed));
          break;
        case 'notCompleted':
          setFilteredTasks(tasks.filter(task => !task.completed));
          break;
        default:
          setFilteredTasks(tasks);
      }
    }
    filterTasks();

    return () => {
      setFilteredTasks([]);
    }
  }, [filter, tasks]);

  return {
    filter,
    setFilter,
    filteredTasks,
  };
}

export default useFilter;
