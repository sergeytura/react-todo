import React from "react";
import './tasksFilter.css';

export default class TasksFilter extends React.Component  {
    

    render() {

        const {allFilter,activeFilter, complitedFilter,all,active,completed} = this.props
        let allData;
        let activeData;
        let completedData;
        all ? allData = 'selected' : allData = ''
        active ? activeData = 'selected' : activeData = ''
        completed ? completedData = 'selected' : completedData = ''
        
        return (
            <ul className="filters">
                <li>
                <button className={allData}
                onClick={allFilter}>All</button>
                </li>
                <li>
                <button className={activeData}
                onClick={activeFilter}>Active</button>
                </li>
                <li>
                <button className={completedData}
                onClick={complitedFilter}>Completed</button>
                </li>
            </ul>
        )
    }
}
