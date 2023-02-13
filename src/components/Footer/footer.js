import React from "react";
import PropTypes from 'prop-types'
import TasksFilter from "../TasksFilter";
import './footer.css';

const Footer = ({items,onClear,allFilter,complitedFilter,activeFilter,all,active,completed}) => {

    Footer.defaultProps = {
      items: 0,
      onClear: () => {},
      all: true,
      active: false,
      completed: false,
      allFilter: true,
      activeFilter: false,
      complitedFilter: false
    }

    Footer.propTypes = {
      items: PropTypes.number,
      onClear: PropTypes.func,
      all: PropTypes.bool,
      active: PropTypes.bool,
      completed: PropTypes.bool,
      allFilter: PropTypes.func,
      activeFilter: PropTypes.func,
      complitedFilter: PropTypes.func
    }

    return (
        <footer className="footer">
          <span className="todo-count">{items} items left</span>
          <TasksFilter
          all={all}
          active={active}
          completed={completed} 
          allFilter={allFilter}
          complitedFilter={complitedFilter}
          activeFilter={activeFilter}/>
          <button className="clear-completed"
          onClick={onClear}>Clear completed</button>
        </footer>
    )
}

export default Footer;