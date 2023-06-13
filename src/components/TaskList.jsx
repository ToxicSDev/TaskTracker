import React from 'react';
import PropTypes from 'prop-types';
import Task from '../containers/Task';
import Editable from './Editable';

const TaskList = ({
  tasks,
  onMoveTask,
  onDeleteTask,
  onEditTask,
  onValueClick,
  categoryColor,
}) => (
  <ul className="task-list">
    {tasks.map((task) => {
      const { id, editing, text } = task;

      return (
        <Task id={id} key={id} onMoveTask={onMoveTask} categoryColor={categoryColor}>
          <Editable
            editing={editing}
            id={id}
            value={text}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
            onValueClick={onValueClick}
          />
        </Task>
      );
    })}
  </ul>
);

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]).isRequired,
      editing: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  onMoveTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onValueClick: PropTypes.func.isRequired,
  categoryColor: PropTypes.string.isRequired,
};

export default TaskList;
