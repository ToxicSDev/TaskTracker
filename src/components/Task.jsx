import React from "react";
import PropTypes from 'prop-types';

const Task = ({
  children,
  connectDragSource,
  connectDropTarget,
  isDragging,
}) => {
  const taskStyle = {
    opacity: isDragging ? 0 : 1,
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
};

export default Task;
