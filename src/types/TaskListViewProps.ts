import Task from "./Task";
import Category from "./Category.ts";

export default interface TaskListViewProps {
    tasks: Task[];
    nextTaskId: number;
    onAdd: (task: Task) => void;
    onAddCategory: (category: Category) => void;
    onDelete: (task: Task) => void;
    onToggle: (task: Task) => void;
    isLoading: boolean;
}
