import React from 'react';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import TasksFilter from '../TasksFilter';
import './app.css';

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

export default App;