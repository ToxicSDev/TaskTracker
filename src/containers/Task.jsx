import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

import Task from '../components/Task';
import * as objectTypes from '../redux/types/objectTypes';

const taskSource = {
  beginDrag: props => ({ id: props.id }),
  isDragging: (props, monitor) => props.id === monitor.getItem().id,
};

const taskTarget = {
  hover: (targetProps, monitor) => {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if (targetId !== sourceId && targetProps.onMoveTask) {
      targetProps.onMoveTask(sourceId, targetId);
    }
  },
};

const collectDragSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const collectDropTarget = connect => ({
  connectDropTarget: connect.dropTarget(),
});

const TaskWithDnD = DragSource(
  objectTypes.TASK,
  taskSource,
  collectDragSource
)(
  DropTarget(
    objectTypes.TASK,
    taskTarget,
    collectDropTarget
  )(Task)
);

TaskWithDnD.propTypes = {
  id: PropTypes.string.isRequired,
  onMoveTask: PropTypes.func,
};

export default TaskWithDnD;