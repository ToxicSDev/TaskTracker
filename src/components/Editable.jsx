import React from 'react';
import PropTypes from 'prop-types';

class Editable extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      currentValue: props.value,
    };
  }

  handleDelete = () => {
    const { onDelete, id } = this.props;
    if (onDelete) {
      onDelete(id);
    }
  };

  handleValueClick = () => {
    const { onValueClick, id } = this.props;
    onValueClick(id);
  };

  handleEditStart = () => {
    const { value, onValueClick, id } = this.props;
    this.setState({
      currentValue: value,
    });
    onValueClick(id);
  };

  handleFinishEdit = (e) => {
    const { onEdit, id } = this.props;
    const isEnterKey = e.type === 'keypress' && e.key === 'Enter';
    const isBlurEvent = e.type === 'blur';
    const targetValue = e.target.value.trim();

    if (onEdit && (isEnterKey || isBlurEvent) && targetValue.length) {
      onEdit(id, targetValue);
    }
  };

  renderEdit = () => {
    const { currentValue } = this.state;

    return (
      <input
        type="text"
        className="editing"
        defaultValue={currentValue}
        autoFocus
        onBlur={this.handleFinishEdit}
        onKeyPress={this.handleFinishEdit}
        onChange={(e) =>
          this.setState({
            currentValue: e.target.value,
          })
        }
      />
    );
  };

  renderValue = () => {
    const { value, onDelete } = this.props;

    return (
      <span>
        <input
          type="text"
          onClick={this.handleEditStart}
          defaultValue={value}
          readOnly
        />
        {onDelete && (
          <span className="delete" onClick={this.handleDelete}>
            &times;
          </span>
        )}
      </span>
    );
  };

  render() {
    const { editing } = this.props;

    return editing ? this.renderEdit() : this.renderValue();
  }
}

Editable.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onEdit: PropTypes.func,
  editing: PropTypes.bool,
  onValueClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default Editable;