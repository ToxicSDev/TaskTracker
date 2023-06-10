import React from "react";

import TaskList from "./TaskList";
import EditableText from "./EditableText";

const Category = (props) => {
  const {
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
  } = props;

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
        <h2 className="category__name">
          <EditableText
            editing={category.editing}
            id={category.id}
            value={category.name}
            onEdit={onEditCategory}
            onValueClick={onEditCategory}
          />
          <button className="category__delete" onClick={handleDeleteCategory} />
          {connectDragSource(<button className="category__drag" />)}
        </h2>
        <TaskList
          tasks={categoryTasks}
          onDeleteTask={handleDeleteTask}
          onEditTask={onEditTask}
          onValueClick={onEditTask}
          onMoveTask={onMoveTask}
        />
        <button className="add-task" onClick={handleCreateTask}>
          + Task
        </button>
      </div>
    )
  );
};

export default Category;
