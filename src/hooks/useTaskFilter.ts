import Task from "../types/Task";
import { useState } from "react";

const useTaskFilter = (tasks: Task[]) => {
  const [filter, setFilter] = useState('all'); // par défaut, affiche toutes les tâches

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'notCompleted':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  return {
    filter,
    setFilter,
    filteredTasks: getFilteredTasks(),
  };
}

export default useTaskFilter;
