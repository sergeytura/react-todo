import React, { useState } from 'react'

import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import './App.css'

export default function App() {
  const [all, setAll] = useState(true)
  const [active, setActive] = useState(false)
  const [done, setDone] = useState(false)
  const [todoData, setTodoData] = useState([])

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const onToggleCompleted = (id) => {
    setTodoData(toggleProperty(todoData, id, 'completed'))
  }

  const onEditing = (id) => {
    setTodoData(toggleProperty(todoData, id, 'editing'))
  }

  const onChangeEdit = (id, event) => {
    setTodoData((data) => {
      const idx = data.findIndex((el) => el.id === id)
      const oldItem = data[idx]
      const newItem = { ...oldItem, label: event.target.value }
      const newArr = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]
      return newArr
    })
  }

  const setTimer = (id, seconds, minutes) => {
    setTodoData((data) => {
      const saved = data.map((todo) => {
        if (todo.id !== id) return todo
        return {
          ...todo,
          sec: seconds,
          min: minutes,
        }
      })
      return saved
    })
  }

  const onSubmitEdit = (id, event) => {
    event.preventDefault()
    setTodoData(toggleProperty(todoData, id, 'editing'))
  }

  const deleteItem = (id) => {
    setTodoData((data) => {
      const idx = data.findIndex((el) => el.id === id)
      const newArr = [...data.slice(0, idx), ...data.slice(idx + 1)]
      return newArr
    })
  }

  const addItem = (text, currSec, currMin) => {
    const newItem = {
      label: text,
      completed: false,
      editing: false,
      time: new Date(),
      id: Date.now(),
      min: currMin,
      sec: currSec,
    }
    setTodoData((data) => {
      const newArr = [...data, newItem]
      return newArr
    })
  }

  const clearCompleted = () => {
    setTodoData((data) => {
      const clearData = data.filter((el) => !el.completed)
      return clearData
    })
  }

  const allFilter = () => {
    setAll(true)
    setActive(false)
    setDone(false)
  }

  const activeFilter = () => {
    setAll(false)
    setActive(true)
    setDone(false)
  }

  const complitedFilter = () => {
    setAll(false)
    setActive(false)
    setDone(true)
  }

  const todoRender = () => {
    if (all) return todoData
    if (active) return todoData.filter((el) => !el.completed)
    if (done) return todoData.filter((el) => el.completed)
  }

  const itemsCompleted = todoData.filter((el) => el.completed)
  const itemsLeft = todoData.length - itemsCompleted.length
  return (
    <section className="todoapp">
      <NewTaskForm onItem={addItem} />
      <section className="main">
        <TaskList
          setTimer={setTimer}
          onSubmitEdit={onSubmitEdit}
          onChangeEdit={onChangeEdit}
          onToggleCompleted={onToggleCompleted}
          onEditing={onEditing}
          todos={todoRender()}
          onDeleted={deleteItem}
        />
        <Footer
          all={all}
          active={active}
          done={done}
          allFilter={allFilter}
          activeFilter={activeFilter}
          complitedFilter={complitedFilter}
          items={itemsLeft}
          onClear={clearCompleted}
        />
      </section>
    </section>
  )
}
