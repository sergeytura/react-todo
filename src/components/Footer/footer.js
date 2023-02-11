import React from "react";
import TasksFilter from "../TasksFilter";
import './footer.css';

const Footer = ({items,onClear,allFilter,complitedFilter,activeFilter}) => {
    return (
        <footer className="footer">
          <span className="todo-count">{items} items left</span>
          <TasksFilter 
          allFilter={allFilter}
          complitedFilter={complitedFilter}
          activeFilter={activeFilter}/>
          <button className="clear-completed"
          onClick={onClear}>Clear completed</button>
        </footer>
    )
}

export default Footer;