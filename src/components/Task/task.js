import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

export default class Task extends React.Component {
  state = {
    seconds: this.props.sec.length < 2 ? `0${this.props.sec}` : `${this.props.sec}`,
    minutes: this.props.min.length < 2 ? `0${this.props.min}` : `${this.props.min}`,
  }

  componentWillUnmount() {
    clearInterval(this.intervalTimer)
    clearInterval(this.interval)
  }

  onPlay = () => {
    if (this.interval) clearInterval(this.interval)
    this.interval = setInterval(() => this.timerWorks(), 1000)
    if (this.intervalTimer) clearInterval(this.intervalTimer)
    this.intervalTimer = setInterval(() => this.updateTimer(), 100)
  }

  onPause = () => {
    clearInterval(this.interval)
    clearInterval(this.intervalTimer)
  }

  timerWorks = () => {
    if (this.state.minutes === '00' && this.state.seconds === '00') {
      clearInterval(this.interval)
      clearInterval(this.intervalTimer)
    } else if (this.state.seconds === '00') {
      this.setState(({ minutes }) => {
        return {
          seconds: '59',
          minutes: minutes <= 10 ? `0${minutes - 1}` : `${minutes - 1}`,
        }
      })
    } else {
      this.setState(({ seconds }) => {
        return {
          seconds: seconds <= 10 ? `0${seconds - 1}` : `${seconds - 1}`,
        }
      })
    }
  }

  updateTimer() {
    this.props.seTtimer(this.props.timer, this.state.seconds, this.state.minutes)
  }

  render() {
    const { time, onSubmitEdit, onChangeEdit, label, onDeleted, onToggleCompleted, onEditing, completed, editing } =
      this.props
    const { seconds, minutes } = this.state
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
              <button type="button" aria-label="icon-play" className="icon icon-play" onClick={this.onPlay} />
              <button type="button" aria-label="icon-pause" className="icon icon-pause" onClick={this.onPause} />
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
