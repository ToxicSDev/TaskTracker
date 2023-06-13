import React from "react";
import PropTypes from 'prop-types';

const Task = ({
  children,
  connectDragSource,
  connectDropTarget,
  isDragging,
  categoryColor,
}) => {
  const taskStyle = {
    opacity: isDragging ? 0 : 1,
    borderLeftColor: categoryColor || "#3395f0",
  };

  return connectDragSource(
    connectDropTarget(
      <li style={taskStyle} className="task">
        {children}
      </li>
    )
  );
};


Task.propTypes = {
  children: PropTypes.node.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  categoryColor: PropTypes.string.isRequired,
};

export default Task;
