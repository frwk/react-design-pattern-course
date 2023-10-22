import { useEffect } from "react";
import FilteredTask from "../components/FilteredTask";
import TaskListView from "../components/TaskListView";
import usePagination from '../hooks/usePagination';
import useTaskFilter from '../hooks/useTaskFilter';
import useTaskManager from '../hooks/useTaskManager';
import Pagination from './Pagination';
import Task from "../types/Task";

const TaskListContainer = () => {
    const { tasks, addTask, removeTask, updateTask, isLoading } = useTaskManager();
    const { filteredTasks, filter, setFilter } = useTaskFilter(tasks);
    const { slicedItems, currentPage, totalPages, handlePageChange } = usePagination(filteredTasks, 10);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) handlePageChange(currentPage - 1);
    }, [currentPage, totalPages, handlePageChange]);

    return (
        <FilteredTask filter={filter} setFilter={setFilter}>
            <>
                <TaskListView
                    tasks={slicedItems as Task[]}
                    onAdd={addTask}
                    onDelete={removeTask}
                    onToggle={updateTask}
                    isLoading={isLoading}
                />
                {isLoading || (totalPages <= 1) ? null : (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </>
        </FilteredTask>
    );
};

export default TaskListContainer;
