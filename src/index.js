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
        value: '',
        todoData: [
            this.createTodoItem('first a'),
            this.createTodoItem('sec b'),
            this.createTodoItem('thutt c'),
            this.createTodoItem('first a'),
            this.createTodoItem('sec b'),
            this.createTodoItem('thutt c')
        ]
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
        this.setState(({todoData}) => {
            const clearArr = todoData.filter((el) => !el.completed)
            return {
                todoData: clearArr
            }
        })
    }

    allFilter = () => {
        console.log('all filter')
    }

    activeFilter = () => {
        this.setState(({todoData}) => {
            const activeArray = todoData.filter((el) => !el.completed)
            return {
                todoData: activeArray
            }
        })
        console.log('active filter')
    }

    complitedFilter = () => {
        this.setState(({todoData}) => {
            const complitedArray = todoData.filter((el) => el.completed)
            return {
                todoData: complitedArray
            }
        })
        console.log('complited filter')
    }

    render () {
        const {todoData} = this.state;
        const itemsCompleted = todoData.filter((el) => el.completed)
        const itemsLeft = todoData.length - itemsCompleted.length;
        return (
            <section className="todoapp">
                    <NewTaskForm 
                    onItem={this.addItem}/>
                <section className="main">
                    <TaskList
                    onToggleCompleted={this.onToggleCompleted}
                    onEditing={this.onEditing} 
                    todos={todoData}
                    onDeleted={this.deleteItem}/>
                    <Footer
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

