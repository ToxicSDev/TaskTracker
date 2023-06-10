import React from "react";

const Task = ({
  children,
  connectDragSource,
  connectDropTarget,
  isDragging,
}) => {
  return connectDragSource(
    connectDropTarget(
      <li style={{ opacity: isDragging ? 0 : 1 }} className="task">
        {children}
      </li>
    )
  );
};

export default Task;
