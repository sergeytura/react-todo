import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

export default class Task extends React.Component {

  // seconds = 0
  // minutes = 0
  
  state = {
    seconds: parseInt(this.props.sec),
    minutes: parseInt(this.props.min)
  }

  onPlay = () => {
    if(this.interval) clearInterval(this.interval)
    this.interval = setInterval( () => this.timerWorks(), 1000)
  }

  onPause = () => {
    clearInterval(this.interval)
  }

  timerWorks = () => {
    if(this.state.minutes == 0 && this.state.seconds == 0) {
      clearInterval(this.interval)
      this.setState({
          seconds: `00`,
          minutes: `00`
        
      })
    }else if(this.state.seconds == 0) {
      this.setState({
        
          seconds: 59,
          minutes: (this.state.minutes <= 10) ? `0${this.state.minutes - 1}` : `${this.state.minutes - 1}`
        
      })
    }else{
      this.setState({
        
          seconds: (this.state.seconds <= 10) ? `0${this.state.seconds - 1}` : `${this.state.seconds - 1}` 
        
      })
    }
    console.log('timerWorks', this.state.seconds, this.state.minutes)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }


  render() {
    const { time, onSubmitEdit, onChangeEdit, label, onDeleted, onToggleCompleted, onEditing, completed, editing } =
      this.props
    const { seconds, minutes } = this.state
    console.log(typeof seconds)
    let classNames = ''
    if (completed) classNames = 'completed'
    if (editing) classNames = 'editing'
    return (
      <li className={classNames} >
        <div className="view" >
          <input className="toggle" onClick={onToggleCompleted} defaultChecked={completed} type="checkbox" />
          <label htmlFor="description">
            <span className="title">{label}</span>
            <span className="description">
              {minutes}:{seconds}
              <button className="icon icon-play" onClick={this.onPlay}></button>
              <button className="icon icon-pause" onClick={this.onPause}></button>
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
