import React from "react";

const EditableText = ({ id, onEdit, editing, onValueClick, value, onDelete }) => {
  const selectToEnd = (input) => {
    if (input) input.focus();
  };

  const handleDelete = () => {
    if (onDelete) onDelete(id);
  };

  const handleValueClick = () => onValueClick(id);

  const handleFinishEdit = (e) => {
    if (e.type === "keypress" && e.key !== "Enter") {
      return;
    }

    const targetValue = e.target.value;

    if (onEdit && targetValue.trim().length) {
      onEdit(id, targetValue);
    }
  };

  const renderEdit = () => (
    <input
      type="text"
      className="editing"
      ref={selectToEnd}
      defaultValue={value}
      onBlur={handleFinishEdit}
      onKeyPress={handleFinishEdit}
    />
  );

  const renderValue = () => {
    return (
      <span>
        <input
          type="text"
          onClick={handleValueClick}
          defaultValue={value}
          readOnly
        />
        {onDelete ? (
          <span className="delete" onClick={handleDelete}>
            &times;
          </span>
        ) : null}
      </span>
    );
  };

  if (editing) {
    return renderEdit();
  }

  return renderValue();
};

export default EditableText;
