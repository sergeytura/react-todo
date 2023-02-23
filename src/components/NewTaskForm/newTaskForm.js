import React from 'react'
import PropTypes from 'prop-types'
import './newTaskForm.css'

export default class NewTaskForm extends React.Component {

  state = {
    label: '',
    sec: '',
    min: ''
  }

  onChangeLabel = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onSubmitLabel = (event) => {
    event.preventDefault()
    this.props.onItem(this.state.label, this.state.sec, this.state.min)
    this.setState({
      label: '',
      sec: '',
      min: ''
    })
  }

  getSec = (event) => {
    console.log(`getSec`, event.target.value)
    if(event.target.value > 59) event.target.value = 59
    this.setState({
      sec: event.target.value
    })
     
  }

  getMin = (event) => {
    console.log(`getMin`, event.target.value)
    if(event.target.value > 480) event.target.value = 480
    this.setState({
      min: event.target.value
    })
     
  }

  render() {
   
    const { label, sec, min  } = this.state
     
    return (
      <header className="header">
        <h1>todos</h1>
        <form  
        className='new-todo-form'
        onSubmit={this.onSubmitLabel}>
            <input
              required
              className="new-todo"
              placeholder="Task"
              onChange={this.onChangeLabel}
              value={label}
            />
          <input
          type='number'
          min="0"
          value={min}
          onChange={this.getMin}
          className="new-todo-form__timer" 
          placeholder="Min" 
          autoFocus/>
          
          <input 
          type='number'
          min="0"
          value={sec}
          onChange={this.getSec}
          className="new-todo-form__timer" 
          placeholder="Sec" 
          autoFocus/>
          <input type="submit" className="new-todo-form__submit"/>
        </form>
      </header>
    )
  }
}

NewTaskForm.defaultProps = {
  onItem: () => {},
}

NewTaskForm.propTypes = {
  onItem: PropTypes.func,
}
