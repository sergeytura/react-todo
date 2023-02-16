import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './tasksFilter.css'

export default class TasksFilter extends React.Component {
  render() {
    const { allFilter, activeFilter, complitedFilter, all, active, done } = this.props

    return (
      <ul className="filters">
        <li>
          <button type="button" className={classNames(null, { selected: all === true })} onClick={allFilter}>
            All
          </button>
        </li>
        <li>
          <button type="button" className={classNames(null, { selected: active === true })} onClick={activeFilter}>
            Active
          </button>
        </li>
        <li>
          <button type="button" className={classNames(null, { selected: done === true })} onClick={complitedFilter}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

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
