import React, { useState } from 'react'

import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import './App.css'

// export default class App extends React.Component {
export default function App () {
  // genID = 100
  let genID
  genID = 100

  // state = {
  //   all: true,
  //   active: false,
  //   done: false,
  //   todoData: [],
  // }

  const [all, setAll] = useState(true)
  const [active, setActive] = useState(false)
  const [done, setDone] = useState(false)
  const [todoData, setTodoData] = useState([])

  // onToggleCompleted = (id) => {
  //   this.setState(({ todoData }) => {
  //     return {
  //       todoData: this.toggleProperty(todoData, id, 'completed'),
  //     }
  //   })
  // }

  const onToggleCompleted = (id) => {
    setTodoData(toggleProperty(todoData, id, 'completed'))
  }

  // onEditing = (id) => {
  //   this.setState(({ todoData }) => {
  //     return {
  //       todoData: this.toggleProperty(todoData, id, 'editing'),
  //     }
  //   })
  // }

  const onEditing = (id) => {
    setTodoData(toggleProperty(todoData, id, 'editing'))
  }

  // onChangeEdit = (id, event) => {
  //   this.setState(({ todoData }) => {
  //     const idx = todoData.findIndex((el) => el.id === id)
  //     const oldItem = todoData[idx]
  //     const newItem = { ...oldItem, label: event.target.value }
  //     const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
  //     return {
  //       todoData: newArr,
  //     }
  //   })
  // }

  const onChangeEdit = (id, event) => {
    setTodoData( (todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, label: event.target.value }
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return newArr
    })
  }

  // setTimer = (id, seconds, minutes) => {
  //   this.setState(({ todoData }) => {
  //     const saved = todoData.map((todo) => {
  //       if (todo.id !== id) return todo
  //       return {
  //         ...todo,
  //         sec: seconds,
  //         min: minutes,
  //       }
  //     })
  //     return { todoData: saved }
  //   })
  // }

  const setTimer = (id, seconds, minutes) => {
      setTodoData(( todoData ) => {
        const saved = todoData.map((todo) => {
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



  // onSubmitEdit = (id, event) => {
  //   event.preventDefault()
  //   this.setState(({ todoData }) => {
  //     return {
  //       todoData: this.toggleProperty(todoData, id, 'editing'),
  //     }
  //   })
  // }

  const onSubmitEdit = (id, event) => {
    event.preventDefault()
    setTodoData(toggleProperty(todoData, id, 'editing'))
  }

  // deleteItem = (id) => {
  //   this.setState(({ todoData }) => {
  //     const idx = todoData.findIndex((el) => el.id === id)
  //     const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
  //     return {
  //       todoData: newArr,
  //     }
  //   })
  // }

  const deleteItem = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return newArr
      })
  }

  // addItem = (text, currSec, currMin) => {
  //   const newItem = {
  //     label: text,
  //     completed: false,
  //     editing: false,
  //     time: new Date(),
  //     id: this.genID++,
  //     min: currMin,
  //     sec: currSec,
  //   }
  //   this.setState(({ todoData }) => {
  //     const newArr = [...todoData, newItem]
  //     return {
  //       todoData: newArr,
  //     }
  //   })
  // }

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
    setTodoData(( todoData ) => {
      const newArr = [...todoData, newItem]
      return newArr
      })
  }

  // clearCompleted = () => {
  //   this.setState(({ todoData }) => {
  //     const clearData = todoData.filter((el) => !el.completed)
  //     return {
  //       todoData: clearData,
  //     }
  //   })
  // }

  const clearCompleted = () => {
    setTodoData(( todoData ) => {
      const clearData = todoData.filter((el) => !el.completed)
      return clearData
    })
  }

  // allFilter = () => {
  //   this.setState({
  //     all: true,
  //     active: false,
  //     done: false,
  //   })
  // }

  // activeFilter = () => {
  //   this.setState({
  //     all: false,
  //     active: true,
  //     done: false,
  //   })
  // }

  // complitedFilter = () => {
  //   this.setState({
  //     all: false,
  //     active: false,
  //     done: true,
  //   })
  // }

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


  // todoRender = () => {
  //   if (this.state.all) return this.state.todoData
  //   if (this.state.active) return this.state.todoData.filter((el) => !el.completed)
  //   if (this.state.done) return this.state.todoData.filter((el) => el.completed)
  // }

  const todoRender = () => {
    if (all) return todoData
    if (active) return  todoData.filter((el) => !el.completed)
    if (done) return  todoData.filter((el) => el.completed)
  }

  // toggleProperty(arr, id, propName) {
  //   const idx = arr.findIndex((el) => el.id === id)
  //   const oldItem = arr[idx]
  //   const newItem = { ...oldItem, [propName]: !oldItem[propName] }
  //   return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  // }

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  // render() {
    // const { todoData, all, active, done } = this.state
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
    //
      // return (
      //   <section className="todoapp">
      //     <NewTaskForm onItem={this.addItem} />
      //     <section className="main">
      //       <TaskList
      //         setTimer={this.setTimer}
      //         onSubmitEdit={this.onSubmitEdit}
      //         onChangeEdit={this.onChangeEdit}
      //         onToggleCompleted={this.onToggleCompleted}
      //         onEditing={this.onEditing}
      //         todos={this.todoRender()}
      //         onDeleted={this.deleteItem}
      //       />
      //       <Footer
      //         all={all}
      //         active={active}
      //         done={done}
      //         allFilter={this.allFilter}
      //         activeFilter={this.activeFilter}
      //         complitedFilter={this.complitedFilter}
      //         items={itemsLeft}
      //         onClear={this.clearCompleted}
      //       />
      //     </section>
      //   </section>
      // )
    //
  // }
}
