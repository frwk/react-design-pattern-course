import Task from "./Task";

export default interface TaskListViewProps {
    tasks: Task[];
    onAdd: (title: string) => void;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}
