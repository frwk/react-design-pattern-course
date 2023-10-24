import Category from "../types/Category";
import Task from "../types/Task";
import { useEffect, useReducer, useState } from "react";

interface FilterState {
  completed: boolean | null;
  categories: Category[];
}

const filterReducer = (state: FilterState, action: { type: string, payload: any }) => {
  const categoryTitle = action.payload;
  const updatedCategories = new Set(state.categories.map(category => category.title));

  switch (action.type) {
    case 'SET_COMPLETION':
      return {
        ...state,
        completed: action.payload,
      };
    case 'TOGGLE_CATEGORY':
      if (updatedCategories.has(categoryTitle)) {
        updatedCategories.delete(categoryTitle);
      } else {
        updatedCategories.add(categoryTitle);
      }
      return {
        ...state,
        categories: Array.from(updatedCategories).map(title => ({ title })),
      };
    case 'REMOVE_NON_EXISTING_CATEGORIES':
      return {
        ...state,
        categories: state.categories.filter(category => action.payload.some((task: Task) => task.category === category.title)),
      };
    default:
      return state;
  }
}

const useFilter = (tasks: Task[]) => {
  const [filter, dispatch] = useReducer(filterReducer, { completed: null, categories: [] });
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    dispatch({ type: 'REMOVE_NON_EXISTING_CATEGORIES', payload: tasks });
    const filteredTasks = tasks.filter((task) => filter.completed === null || filter.completed === task.completed).filter((task) => filter.categories.length === 0 || filter.categories.some((category) => task.category === category.title));
    setFilteredTasks(filteredTasks);

    return () => {
      setFilteredTasks([]);
    }
  }, [filter, tasks]);


  return {
    filter,
    dispatch,
    filteredTasks,
  };
}

export default useFilter;
