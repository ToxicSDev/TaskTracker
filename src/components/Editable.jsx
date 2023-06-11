import React from 'react';
import PropTypes from 'prop-types';

const Editable = ({ id, onEdit, editing, onValueClick, value, onDelete }) => {
  const handleDelete = () => onDelete && onDelete(id);

  const handleValueClick = () => onValueClick(id);

  const handleFinishEdit = (e) => {
    const isEnterKey = e.type === 'keypress' && e.key === 'Enter';
    const isBlurEvent = e.type === 'blur';
    const targetValue = e.target.value.trim();

    if (onEdit && (isEnterKey || isBlurEvent) && targetValue.length) {
      onEdit(id, targetValue);
    }
  };

  const renderEdit = () => (
    <input
      type="text"
      className="editing"
      defaultValue={value}
      autoFocus
      onBlur={handleFinishEdit}
      onKeyPress={handleFinishEdit}
    />
  );

  const renderValue = () => (
    <span>
      <input
        type="text"
        onClick={handleValueClick}
        defaultValue={value}
        readOnly
      />
      {onDelete && (
        <span className="delete" onClick={handleDelete}>
          &times;
        </span>
      )}
    </span>
  );

  return editing ? renderEdit() : renderValue();
};

Editable.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onEdit: PropTypes.func,
  editing: PropTypes.bool,
  onValueClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default Editable;
