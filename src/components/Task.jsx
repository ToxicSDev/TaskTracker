import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ taskContent, dragSourceConnector, dropTargetConnector, isBeingDragged }) => {
    const taskStyle = { opacity: isBeingDragged ? 0 : 1 };
    return dragSourceConnector(
        dropTargetConnector(
            <li style={taskStyle} className="task">
                {taskContent}
            </li>
        )
    );
};

Task.propTypes = {
    taskContent: PropTypes.node.isRequired,
    dragSourceConnector: PropTypes.func.isRequired,
    dropTargetConnector: PropTypes.func.isRequired,
    isBeingDragged: PropTypes.bool.isRequired,
};

export default Task;