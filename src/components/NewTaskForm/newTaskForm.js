import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './newTaskForm.css'

function NewTaskForm({ onItem }) {
  const [label, setLabel] = useState('')
  const [sec, setSec] = useState('')
  const [min, setMin] = useState('')

  const onChangeLabel = (event) => {
    setLabel(event.target.value)
  }

  const onSubmitLabel = (event) => {
    event.preventDefault()
    onItem(label, sec, min)
    setLabel('')
    setSec('')
    setMin('')
  }

  const getSec = (event) => {
    if (event.target.value > 59) event.target.value = 59
    setSec(event.target.value)
  }

  const getMin = (event) => {
    if (event.target.value > 480) event.target.value = 480
    setMin(event.target.value)
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmitLabel}>
        <input required className="new-todo" placeholder="Task" onChange={onChangeLabel} value={label} />
        <input
          type="number"
          min="0"
          required
          value={min}
          onChange={getMin}
          className="new-todo-form__timer"
          placeholder="Min"
        />
        <input
          type="number"
          min="0"
          required
          value={sec}
          onChange={getSec}
          className="new-todo-form__timer"
          placeholder="Sec"
        />
        <input type="submit" className="new-todo-form__submit" />
      </form>
    </header>
  )
}

NewTaskForm.defaultProps = {
  onItem: () => {},
}

NewTaskForm.propTypes = {
  onItem: PropTypes.func,
}

export default NewTaskForm
