import { useEffect } from "react";
import FilteredTask from "../components/FilteredTask";
import TaskListView from "../components/TaskListView";
import usePagination from '../hooks/usePagination';
import useSnackbar from "../hooks/useSnackbar";
import useTaskFilter from '../hooks/useTaskFilter';
import useTaskManager from '../hooks/useTaskManager';
import taskObservable from "../observables/taskObservable";
import logger from "../utils/logger";
import CustomSnackbar from "./CustomSnackbar";
import Pagination from './Pagination';
import Task from "../types/Task";
import useCategoryManager from "../hooks/useCategoryManager.ts";
import useObservable from "../hooks/useObservable";

const TaskListContainer = () => {
    const { tasks, addTask, removeTask, updateTask, isLoading } = useTaskManager();
    const { addCategory } = useCategoryManager();
    const { filteredTasks, filter, setFilter } = useTaskFilter(tasks);
    const { slicedItems, currentPage, totalPages, handlePageChange } = usePagination(filteredTasks, 10);
    const { open, message, severity, handleClose, handleOpen } = useSnackbar();

    useObservable(taskObservable, handleOpen);
    useObservable(taskObservable, logger);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) handlePageChange(currentPage - 1);
    }, [currentPage, totalPages, handlePageChange]);

    return (
        <>
            <FilteredTask filter={filter} setFilter={setFilter}>
                <>
                    <TaskListView
                        tasks={slicedItems as Task[]}
                        nextTaskId={tasks[tasks.length - 1]?.id + 1 || 1}
                        onAdd={addTask}
                        onAddCategory={addCategory}
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
            <CustomSnackbar
                open={open}
                onClose={handleClose}
                message={message}
                severity={severity}
            />
        </>
    );
};

export default TaskListContainer;
