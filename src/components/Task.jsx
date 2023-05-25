import React from "react";
import { DragSource, DropTarget } from "react-dnd";

const Task = ({
    children,
    connectDragSource,
    connectDropTarget,
    isDragging,
    onMoveTask,
    id,
}) => {
    const taskSource = {
        beginDrag() {
            return { id };
        },
        isDragging(props, monitor) {
            return props.id === monitor.getItem().id;
        },
    };

    const taskTarget = {
        hover(targetProps, monitor) {
            const targetId = targetProps.id;
            const sourceId = monitor.getItem().id;

            if (sourceId !== targetId) {
                onMoveTask(sourceId, targetId);
            }
        },
    };

    const collectDragSource = (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    });

    const collectDropTarget = (connect) => ({
        connectDropTarget: connect.dropTarget(),
    });

    return connectDragSource(
        connectDropTarget(
            <li style={{ opacity: isDragging ? 0 : 1 }} className="task">
                {children}
            </li>
        )
    );
};

const TaskDragSource = DragSource("NOTE", taskSource, collectDragSource)(
    Task
);

const TaskDropTarget = DropTarget("NOTE", taskTarget, collectDropTarget)(
    TaskDragSource
);

export default TaskDropTarget;