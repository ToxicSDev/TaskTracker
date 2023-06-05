import React from "react";
import Task from "../containers/Task";
import EditableText from "./EditableText";

const TaskList = ({
    tasks,
    onMoveTask,
    onDeleteTask,
    onEditTask,
    onValueClick,
}) => {
    return (
        <ul className="tasks-list">
            {tasks.map((task) => (
                <Task id={task.id} key={task.id} onMoveTask={onMoveTask}>
                    <EditableText
                        editing={task.editing}
                        id={task.id}
                        value={task.text}
                        onDelete={onDeleteTask}
                        onEdit={onEditTask}
                        onValueClick={onValueClick}
                    />
                </Task>
            ))}
        </ul>
    );
};

export default TaskList;
