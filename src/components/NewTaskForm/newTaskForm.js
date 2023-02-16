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
        <form onSubmit={this.onSubmitLabel}>
          <input
            required
            minLength="1"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onChangeLabel}
            value={label}
          />
        </form>
      </header>
    )
  }
}

NewTaskForm.defaultProps = {
  // onChange: () => {},
  // onChangeLabel: () => {},
  onItem: () => {},
  // label: '',
  // onSubmitLabel: () => {},
}

NewTaskForm.propTypes = {
  // onChange: PropTypes.func,
  // onChangeLabel: PropTypes.func,
  onItem: PropTypes.func,
  // label: PropTypes.string,
  // onSubmitLabel: PropTypes.func,
}
