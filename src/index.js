import React from 'react'
import ReactDOM from 'react-dom/client'

import Footer from './components/Footer'
import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

class App extends React.Component {
  genID = 100

  state = {
    all: true,
    active: false,
    done: false,
    // value: '',
    todoData: [],
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed'),
      }
    })
  }

  onEditing = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'editing'),
      }
    })
  }

  onChangeEdit = (id, event) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, label: event.target.value }
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }

  onSubmitEdit = (id, event) => {
    event.preventDefault()
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'editing'),
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }

  addItem = (text) => {
    const newItem = {
      label: text,
      completed: false,
      editing: false,
      time: new Date(),
      id: this.genID++,
    }
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return {
        todoData: newArr,
      }
    })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const clearData = todoData.filter((el) => !el.completed)
      return {
        todoData: clearData,
      }
    })
  }

  allFilter = () => {
    this.setState({
      all: true,
      active: false,
      done: false,
    })
  }

  activeFilter = () => {
    this.setState({
      all: false,
      active: true,
      done: false,
    })
  }

  complitedFilter = () => {
    this.setState({
      all: false,
      active: false,
      done: true,
    })
  }

  todoRender = () => {
    if (this.state.all) return this.state.todoData
    if (this.state.active) return this.state.todoData.filter((el) => !el.completed)
    if (this.state.done) return this.state.todoData.filter((el) => el.completed)
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  render() {
    const { todoData, all, active, done } = this.state
    const itemsCompleted = todoData.filter((el) => el.completed)
    const itemsLeft = todoData.length - itemsCompleted.length
    return (
      <section className="todoapp">
        <NewTaskForm onItem={this.addItem} />
        <section className="main">
          <TaskList
            onSubmitEdit={this.onSubmitEdit}
            onChangeEdit={this.onChangeEdit}
            onToggleCompleted={this.onToggleCompleted}
            onEditing={this.onEditing}
            // todos={all ? todoData : filterData}
            todos={this.todoRender()}
            onDeleted={this.deleteItem}
          />
          <Footer
            all={all}
            active={active}
            done={done}
            allFilter={this.allFilter}
            activeFilter={this.activeFilter}
            complitedFilter={this.complitedFilter}
            items={itemsLeft}
            onClear={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}

root.render(<App />)
