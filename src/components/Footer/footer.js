import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'
import './footer.css'

function Footer({ items, onClear, allFilter, complitedFilter, activeFilter, all, active, done }) {
  return (
    <footer className="footer">
      <span className="todo-count">{items} items left</span>
      <TasksFilter
        all={all}
        active={active}
        done={done}
        allFilter={allFilter}
        complitedFilter={complitedFilter}
        activeFilter={activeFilter}
      />
      <button type="button" className="clear-completed" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  items: 0,
  onClear: () => {},
  all: true,
  active: false,
  done: false,
  allFilter: true,
  activeFilter: false,
  complitedFilter: false,
}

Footer.propTypes = {
  items: PropTypes.number,
  onClear: PropTypes.func,
  all: PropTypes.bool,
  active: PropTypes.bool,
  done: PropTypes.bool,
  allFilter: PropTypes.func,
  activeFilter: PropTypes.func,
  complitedFilter: PropTypes.func,
}

export default Footer
