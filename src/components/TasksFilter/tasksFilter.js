import React from "react";
import './tasksFilter.css';

export default class TasksFilter extends React.Component  {
    
    state = {
        all: true,
        active: true,
        completed: false
    }

    render() {
        const {all,active,completed} = this.state;
        const {allFilter,activeFilter, complitedFilter} = this.props

        let classNames;
        all ? classNames = 'selected' : classNames = ''
        active ? classNames = 'selected' : classNames = ''
        completed ? classNames = 'selected' : classNames = ''
        
        return (
            <ul className="filters">
                <li>
                <button className={classNames}
                onClick={allFilter}>All</button>
                </li>
                <li>
                <button className={classNames}
                onClick={activeFilter}>Active</button>
                </li>
                <li>
                <button className={classNames}
                onClick={complitedFilter}>Completed</button>
                </li>
            </ul>
        )
    }
}
