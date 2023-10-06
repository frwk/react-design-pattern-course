import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import taskObservable from "../observables/taskObservable";
import Task from "../types/Task";

const TaskOverview = () => {
  const [tasksLength, setTasksLength] = useState(0);
  const [completedTasksLength, setCompletedTasksLength] = useState(0);
  const [incompleteTasksLength, setIncompleteTasksLength] = useState(0);

  const updateTasksLength = ({ tasks }: { tasks: Task[] }) => {
    if (!tasks) {
      return;
    }
    setTasksLength(tasks.length);
    setCompletedTasksLength(tasks.filter(task => task.completed).length);
    setIncompleteTasksLength(tasks.filter(task => !task.completed).length);
  }

  useEffect(() => {
    taskObservable.subscribe(updateTasksLength);

    return () => {
      taskObservable.unsubscribe(updateTasksLength);
    };
  }, []);

  return (
    <div className="flex flex-wrap justify-center space-x-2">
      <Chip label={`Total des tâches: ${tasksLength}`} />
      <Chip label={`Complété: ${completedTasksLength}`} />
      <Chip label={`Non complété: ${incompleteTasksLength}`} />
    </div>
  );
};

export default TaskOverview;
