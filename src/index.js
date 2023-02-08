import React from "react";
import ReactDOM from "react-dom/client";
import Footer from "./components/Footer";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const App = () => {
    return (
        <section className="todoapp">
                <NewTaskForm />
            <section className="main">
                <TaskList />
                <Footer />
            </section>
        </section>
    );
}

root.render(<App />)