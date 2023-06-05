import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const EditableText = ({ id, onEdit, editing, onValueClick, value, onDelete }) => {
    const inputRef = useRef(null);

    const handleDelete = useCallback(() => {
        onDelete && onDelete(id);
    }, [onDelete, id]);

    const handleValueClick = useCallback(() => {
        onValueClick && onValueClick(id);
    }, [onValueClick, id]);

    const handleFinishEdit = useCallback((e) => {
        if (e.type === "keypress" && e.key !== "Enter") return;

        const targetValue = e.target.value;

        if (onEdit && targetValue.trim().length) {
            onEdit(id, targetValue);
        }
    }, [onEdit, id]);

    const renderEditView = () => (
        <input
            type="text"
            className="editing"
            ref={inputRef}
            defaultValue={value}
            onBlur={handleFinishEdit}
            onKeyPress={handleFinishEdit}
        />
    );

    const renderReadView = () => (
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

    return editing ? renderEditView() : renderReadView();
};

EditableText.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onEdit: PropTypes.func,
    editing: PropTypes.bool,
    onValueClick: PropTypes.func,
    value: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
};

EditableText.defaultProps = {
    onEdit: null,
    editing: false,
    onValueClick: null,
    onDelete: null,
};

export default EditableText;