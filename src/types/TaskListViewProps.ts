import Task from "./Task";
import User from "./User/User";

export default interface TaskListViewProps {
    tasks: Task[];
    onAdd: (task: Task) => void;
    onDelete: (task: Task) => void;
    onToggle: (task: Task) => void;
    isLoading: boolean;
    user: User | null;
}
