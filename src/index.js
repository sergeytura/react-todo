import React from "react";
import ReactDOM from "react-dom/client";
import Footer from "./components/Footer";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

class App extends React.Component {

    genID = 100
    
    state = {
        all: true,
        active: false,
        completed: false,
        value: '',
        todoData: [
            this.createTodoItem('first a'),
            this.createTodoItem('sec b'),
            this.createTodoItem('thutt c'),
            this.createTodoItem('first a'),
            this.createTodoItem('sec b'),
            this.createTodoItem('thutt c')
        ],
        filterData: []
    };

    createTodoItem(label) {
        return {
            label,
            completed: false,
            editing: false,
            id: this.genID++
        }
    }

    toggleProperty (arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [...arr.slice(0,idx),newItem,...arr.slice(idx + 1)];
    }

    onToggleCompleted = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'completed')
            }
        })
        
    }

    onEditing = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'editing')
            }
        })
    }

    onChangeEdit = (id, event) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const oldItem = todoData[idx];
            const newItem = {...oldItem, label: event.target.value};
            const newArr = [...todoData.slice(0,idx),newItem,...todoData.slice(idx + 1)];
            return {
                todoData: newArr
            }
        })
    }

    onSubmitEdit = (id, event) => {
        event.preventDefault()
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'editing')
            }
        })
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArr = [...todoData.slice(0,idx), ...todoData.slice(idx + 1)];
            return {
                todoData: newArr
            }
        })
    }

    

    addItem = (text) => {
        const newItem = {
            label: text,
            completed: false,
            editing: false,
            id: this.genID++
        }
        this.setState(({todoData}) => {
            const newArr = [...todoData, newItem]
            return {
                todoData: newArr
            }
        })
    }

    clearCompleted = () => {
        this.setState(({todoData,filterData}) => {
            const clearData = todoData.filter((el) => !el.completed)
            const clearFilterData = filterData.filter((el) => !el.completed)

            return {
                todoData: clearData,
                filterData: clearFilterData
            }
        })
    }

    allFilter = () => {
        this.setState({
            all: true,
            active: false,
            completed: false
        })

    }

    activeFilter = () => {
        this.setState(({todoData}) => {
            const activeArray = todoData.filter((el) => !el.completed)
            return {
                all: false,
                active: true,
                completed: false,
                filterData: activeArray
            }
        })
    }

    complitedFilter = () => {
        this.setState(({todoData}) => {
            const complitedArray = todoData.filter((el) => el.completed)
            return {
                all: false,
                active: false,
                completed: true,
                filterData: complitedArray
            }
        })
    }

    render () {
        const {filterData,todoData,all,active,completed} = this.state;
        const itemsCompleted = todoData.filter((el) => el.completed)
        const itemsLeft = todoData.length - itemsCompleted.length;
        return (
            <section className="todoapp">
                    <NewTaskForm 
                    onItem={this.addItem}/>
                <section className="main">
                    <TaskList
                    onSubmitEdit={this.onSubmitEdit}
                    onChangeEdit={this.onChangeEdit}
                    onToggleCompleted={this.onToggleCompleted}
                    onEditing={this.onEditing} 
                    todos={(all) ? todoData : filterData}
                    // todos={this.sendData}
                    onDeleted={this.deleteItem}/>
                    <Footer
                    all={all}
                    active={active}
                    completed={completed} 
                    allFilter={this.allFilter}
                    activeFilter={this.activeFilter}
                    complitedFilter={this.complitedFilter} 
                    items={itemsLeft}
                    onClear={this.clearCompleted}/>
                </section>
            </section>
        );
    }
}

root.render(<App />)

