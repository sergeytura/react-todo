import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './tasksFilter.css'

function TasksFilter({ allFilter, activeFilter, complitedFilter, all, active, done }) {
  const filterArr = [
    ['All', all, allFilter, 1],
    ['Active', active, activeFilter, 2],
    ['Completed', done, complitedFilter, 3],
  ]
  const filterElements = filterArr.map((item) => {
    return (
      <li key={item[3]}>
        <button type="button" className={classNames({ selected: item[1] })} onClick={item[2]}>
          {item[0]}
        </button>
      </li>
    )
  })
  return <ul className="filters">{filterElements}</ul>
}

export default TasksFilter

TasksFilter.defaultProps = {
  allFilter: () => {},
  activeFilter: () => {},
  complitedFilter: () => {},
  all: true,
  active: false,
  done: false,
}

TasksFilter.propTypes = {
  allFilter: PropTypes.func,
  activeFilter: PropTypes.func,
  complitedFilter: PropTypes.func,
  all: PropTypes.bool,
  active: PropTypes.bool,
  done: PropTypes.bool,
}
