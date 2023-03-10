import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/task'
import './taskList.css'

export default function TaskList({
  setTimer,
  todos,
  onDeleted,
  onEditing,
  onSubmitEdit,
  onChangeEdit,
  onToggleCompleted,
}) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task
        key={id}
        {...itemProps}
        id={id}
        setTimer={(sec, min) => setTimer(id, sec, min)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onEditing={() => onEditing(id)}
        onDeleted={() => onDeleted(id)}
        onChangeEdit={(event) => onChangeEdit(id, event)}
        onSubmitEdit={(event) => onSubmitEdit(id, event)}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onEditing: () => {},
  onSubmitEdit: () => {},
  onChangeEdit: () => {},
  onToggleCompleted: () => {},
}

TaskList.propTypes = {
  onDeleted: PropTypes.func,
  onEditing: PropTypes.func,
  onSubmitEdit: PropTypes.func,
  onChangeEdit: PropTypes.func,
  onToggleCompleted: PropTypes.func,
}
