import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

export default class Task extends React.Component {
  render() {
    const { time, onSubmitEdit, onChangeEdit, label, onDeleted, onToggleCompleted, onEditing, completed, editing } =
      this.props

    let classNames = ''
    if (completed) classNames = 'completed'
    if (editing) classNames = 'editing'
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" onClick={onToggleCompleted} defaultChecked={completed} type="checkbox" />
          <label htmlFor="description">
            <span className="title">{label}</span>
            <span className="description">
              <button className="icon icon-play"></button>
              <button className="icon icon-pause"></button>
            </span>
            <span className="description">Created {formatDistanceToNow(time, { includeSeconds: true })}</span>
          </label>
          <button type="button" aria-label="edit" className="icon icon-edit" onClick={onEditing} />
          <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <form onSubmit={onSubmitEdit}>
          <input type="text" className="edit" defaultValue={label} onChange={onChangeEdit} />
        </form>
      </li>
    )
  }
}

Task.defaultProps = {
  onSubmitEdit: () => {},
  onChangeEdit: () => {},
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onEditing: () => {},
  label: '',
  completed: false,
  editing: false,
}

Task.propTypes = {
  onSubmitEdit: PropTypes.func,
  onChangeEdit: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onEditing: PropTypes.func,
  label: PropTypes.string,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
}
