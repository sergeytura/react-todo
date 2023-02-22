import React from 'react'
import PropTypes from 'prop-types'
import './newTaskForm.css'

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
  }

  onChangeLabel = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onSubmitLabel = (event) => {
    event.preventDefault()
    this.props.onItem(this.state.label)
    this.setState({
      label: '',
    })
  }

  render() {
    const { label } = this.state
    
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
           disabled
          className="new-todo-form__timer" 
          placeholder="Min" 
          autoFocus/>
          <input 
          disabled 
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
