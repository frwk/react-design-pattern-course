import Task from "./Task";

export default interface TaskListContainerState {
    tasks: Task[];
    filter: string
}
