import React from "react";
import Task from "../Task/task";
import './taskList.css'

const TaskList = ({todos, onDeleted, onToggleCompleted}) => {
    const elements = todos.map((item) => {
      // const {id, ...itemProps} = item;
        const {label} = item;
        return (
            <Task key={label}
            // {...itemProps}
            onToggleCompleted={() => onToggleCompleted(label)}
            onDeleted={() => onDeleted(label)}/>
        )
      })
    return (
        <ul className="todo-list">
          {elements}
        </ul>
    )
}

export default TaskList;

