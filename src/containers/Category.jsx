import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import Category from '../components/Category';
import categoryActions from '../redux/actions/categories';
import taskActions from '../redux/actions/tasks';
import * as objectTypes from '../redux/types/objectTypes';

const categorySource = {
  beginDrag(props) {
    return {
      id: props.category.id,
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  },
};

const categoryTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.category.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
    const sourceType = monitor.getItemType();

    if (!targetProps.category.taskList.length && sourceType === objectTypes.TASK) {
      targetProps.attachToCategory(targetId, sourceId);
    } else if (targetId !== sourceId && sourceType === objectTypes.CATEGORY) {
      targetProps.onMoveCategory(sourceId, targetId);
    }
  },
};

const collectDragSource = (DnDconnect, monitor) => ({
  connectDragSource: DnDconnect.dragSource(),
  connectDragPreview: DnDconnect.dragPreview(),
  isDragging: monitor.isDragging(),
});

const collectDropTarget = (DnDconnect) => ({
  connectDropTarget: DnDconnect.dropTarget(),
});

const mapStateToProps = (state) => ({
  allTasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  onCreateTask(categoryId) {
    const newTask = taskActions.createTask('New Task');
    dispatch(newTask);
    dispatch(categoryActions.attachToCategory(categoryId, newTask.payload.id));
  },

  onDeleteTask(categoryId, taskId) {
    dispatch(taskActions.deleteTask(taskId));

    if (categoryId) {
      dispatch(categoryActions.detachFromCategory(categoryId, taskId));
    }
  },

  onEditTask(taskId, value) {
    const updatedTask = {
      id: taskId,
      text: value || '',
      editing: !value,
    };

    dispatch(taskActions.updateTask(updatedTask));
  },

  onMoveTask(sourceId, targetId) {
    dispatch(categoryActions.move('task', sourceId, targetId));
  },

  attachToCategory(categoryId, taskId) {
    dispatch(categoryActions.attachToCategory(categoryId, taskId));
  },

  onEditCategory(categoryId, name, color) {
    const updatedCategory = {
      id: categoryId,
    };

    if (name) {
      updatedCategory.name = name;
      updatedCategory.editing = false;
    } else {
      updatedCategory.editing = true;
    }

    if (color) {
      updatedCategory.color = color;
    }

    dispatch(categoryActions.updateCategory(updatedCategory));
  },
});

const DnDWrapper = DragSource(objectTypes.CATEGORY, categorySource, collectDragSource)(
  DropTarget([objectTypes.TASK, objectTypes.CATEGORY], categoryTarget, collectDropTarget)(Category)
);

DnDWrapper.propTypes = {
  allTasks: PropTypes.array.isRequired,
  category: PropTypes.object.isRequired,
  attachToCategory: PropTypes.func.isRequired,
  onMoveCategory: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DnDWrapper);
