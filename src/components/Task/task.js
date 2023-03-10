import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

function Task({
  sec,
  min,
  setTimer,
  time,
  onSubmitEdit,
  onChangeEdit,
  label,
  onDeleted,
  onToggleCompleted,
  onEditing,
  completed,
  editing,
}) {
  const [seconds, setSeconds] = useState(sec.length < 2 ? `0${sec}` : `${sec}`)
  const [minutes, setMinutes] = useState(min.length < 2 ? `0${min}` : `${min}`)

  const [timing, setTiming] = useState(false)

  const timerWorks = () => {
    if (timing) {
      if (minutes === '00' && seconds === '00') {
        setTiming(false)
      } else if (seconds === '00') {
        setSeconds('59')
        setMinutes(minutes <= 10 ? `0${minutes - 1}` : `${minutes - 1}`)
      } else {
        setSeconds(seconds <= 10 ? `0${seconds - 1}` : `${seconds - 1}`)
      }
    }
  }

  const onPlay = () => {
    setTiming(true)
  }

  const onPause = () => {
    setTiming(false)
  }

  useEffect(() => {
    const interval = setInterval(() => timerWorks(), 1000)
    return () => {
      setTimer(seconds, minutes)
      clearInterval(interval)
    }
  }, [timing, seconds, minutes])

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
            {minutes}:{seconds}
            <button type="button" aria-label="icon-play" className="icon icon-play" onClick={onPlay} />
            <button type="button" aria-label="icon-pause" className="icon icon-pause" onClick={onPause} />
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

export default Task
