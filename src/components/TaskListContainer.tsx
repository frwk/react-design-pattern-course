import FilteredTask from "../components/FilteredTask";
import TaskListView from "../components/TaskListView";
import usePagination from '../hooks/usePagination';
import Pagination from './Pagination';
import useTaskManager from '../hooks/useTaskManager';
import useTaskFilter from '../hooks/useTaskFilter';

const TaskListContainer = () => {
    const { tasks, addTask, removeTask, updateTask, isLoading } = useTaskManager();
    const { filteredTasks, filter, setFilter } = useTaskFilter(tasks);
    const { slicedItems, currentPage, totalPages, handlePageChange } = usePagination(filteredTasks, 10);

    return (
        <FilteredTask filter={filter} setFilter={setFilter}>
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
        </FilteredTask>
    );
};

export default TaskListContainer;
