import Task from '../types/Task';
import FilteredTask from "../components/FilteredTask";
import TaskListView from "../components/TaskListView";
import usePagination from '../hooks/usePagination';
import Pagination from './Pagination';
import useTaskManager from '../hooks/useTaskManager';

const TaskListContainer = () => {
    const { tasks, addTask, removeTask, updateTask, isLoading } = useTaskManager();

    return (
        <FilteredTask tasks={tasks} render={(filteredTasks: Task[]) => {
            const { slicedItems, currentPage, totalPages, handlePageChange } = usePagination(filteredTasks, 10);
            return (
                <>
                    <TaskListView
                        tasks={slicedItems}
                        onAdd={addTask}
                        onDelete={removeTask}
                        onToggle={updateTask}
                        isLoading={isLoading}
                    />
                    {isLoading ? null : (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )
        }} />
    );
};

export default TaskListContainer;
