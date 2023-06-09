import React from 'react';
import PropTypes from 'prop-types';

import TaskList from './TaskList';
import Editable from './Editable';

const Category = ({
  onCreateTask,
  onMoveTask,
  onEditTask,
  onEditCategory,
  onDeleteCategory,
  onDeleteTask,
  category,
  allTasks,
  connectDragSource,
  connectDragPreview,
  connectDropTarget,
}) => {
  const categoryTasks = category.taskList
    .map((id) => allTasks.find((task) => task.id === id))
    .filter((task) => task);

  const handleDeleteTask = (taskId) => onDeleteTask(category.id, taskId);

  const handleDeleteCategory = () => {
    onDeleteCategory(category.id);
    category.taskList.forEach((taskId) => onDeleteTask(null, taskId));
  };

  const handleCreateTask = () => onCreateTask(category.id);

  return connectDragPreview(
    connectDropTarget(
      <div className="category">
        {connectDragSource(
          <h2 className="category-name" style={{ borderTopColor: category.color }}>
            <Editable
              editing={category.editing}
              id={category.id}
              value={category.name}
              onEdit={onEditCategory}
              onValueClick={onEditCategory}
            />
            <input
              type="color"
              value={category.color || "#3395f0"}
              className="category-color-picker"
              onChange={(event) => onEditCategory(category.id, category.name, event.target.value)}
            />
            <button className="category-delete" onClick={handleDeleteCategory} />
          </h2>
        )}
        <TaskList
          tasks={categoryTasks}
          onDeleteTask={handleDeleteTask}
          onEditTask={onEditTask}
          onValueClick={onEditTask}
          onMoveTask={onMoveTask}
          categoryColor={category.color}
        />
        <button className="add-task" onClick={handleCreateTask}>
          + Task
        </button>
      </div>
    )
  );
};

Category.propTypes = {
  onCreateTask: PropTypes.func.isRequired,
  onMoveTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onEditCategory: PropTypes.func.isRequired,
  onDeleteCategory: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  category: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    editing: PropTypes.bool,
    name: PropTypes.string,
    taskList: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ])
    ).isRequired,
  }).isRequired,
  allTasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      text: PropTypes.string,
      editing: PropTypes.bool,
    })
  ).isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default Category;