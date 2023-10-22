export default interface Task {
    id: number;
    title: string;
    category: string|null
    completed: boolean;
    userId: number;
}
