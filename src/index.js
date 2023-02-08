import React from "react";
import ReactDOM from "react-dom/client";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import TasksFilter from "./components/TasksFilter";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const App = () => {
    return (
        <section className="todoapp">
                <NewTaskForm />
            <section className="main">
                <TaskList />
                <TasksFilter />
            </section>
        </section>
    );
}

root.render(<App />)