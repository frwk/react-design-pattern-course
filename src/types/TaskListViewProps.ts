import Task from "./Task";

export default interface TaskListViewProps {
    tasks: Task[];
    nextTaskId: number;
    onAdd: (task: Task) => void;
    onDelete: (task: Task) => void;
    onToggle: (task: Task) => void;
    isLoading: boolean;
}
