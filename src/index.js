import React from "react";
import ReactDOM from "react-dom/client";
import Footer from "./components/Footer";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

class App extends React.Component {
    
    state = {
        todoData: [
            { label: "first a" },
            { label: "second b" },
            { label: "third c" }
        ]
    };

    onToggleCompleted = () => {
        console.log('Toggle Completed')
    }

    deleteItem = (label) => {
        console.log(label)
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.label === label);
            const before = todoData.slice(0,idx);
            const after = todoData.slice(idx + 1);
            const newArr = [...before, ...after];
            console.log(newArr)
            return {
                todoData: newArr
            }
        })
    }

    addItem = (text) => {
        console.log('woops')
        const newItem = {
            label: text
        }
        this.setState(({todoData}) => {
            const newArr = [...todoData, newItem]
            return {
                todoData: newArr
            }
        })
    }

    render () {
        const {todoData} = this.state;
        return (
            <section className="todoapp">
                    <NewTaskForm onItem={this.addItem} />
                <section className="main">
                    <TaskList
                    onToggleCompleted={this.onToggleCompleted} 
                    todos={todoData}
                    onDeleted={this.deleteItem}/>
                    <Footer />
                </section>
            </section>
        );
    }
}

root.render(<App />)

