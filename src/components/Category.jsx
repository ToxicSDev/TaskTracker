import React from 'react';
import PropTypes from 'prop-types';
import TaskList from './TaskList';
import EditableText from './EditableText';

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
    const categoryTasks = category.tasks
        .map((id) => allTasks.find((task) => task.id === id))
        .filter((task) => task);

    const handleDeleteTask = (taskId) => {
        onDeleteTask(category.id, taskId);
    };

    const handleDeleteCategory = () => {
        onDeleteCategory(category.id);
        category.tasks.forEach((taskId) => onDeleteTask(null, taskId));
    };

    const handleCreateTask = () => {
        onCreateTask(category.id);
    };

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
                    + TASK
                </button>
            </div>
        ),
    );
};

Category.propTypes = {
    onCreateTask: PropTypes.func.isRequired,
    onMoveTask: PropTypes.func.isRequired,
    onEditTask: PropTypes.func.isRequired,
    onEditCategory: PropTypes.func.isRequired,
    onDeleteCategory: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    allTasks: PropTypes.array.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
};

export default Category;
