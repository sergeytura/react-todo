import React from "react";
import Task from "../Task/task";
import './taskList.css'

const TaskList = ({todos, onDeleted, onEditing,onSubmitEdit,onChangeEdit, onToggleCompleted}) => {
    
    const elements = todos.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <Task key={id}
            {...itemProps}
            onToggleCompleted={() => onToggleCompleted(id)}
            onEditing={() => onEditing(id)}
            onDeleted={() => onDeleted(id)}
            onChangeEdit={(event) =>onChangeEdit(id,event)}
            onSubmitEdit={(event) => onSubmitEdit(id,event)}></Task>
        )
        })
        return (
            <ul className="todo-list">
              {elements}
            </ul>
        )
}

export default TaskList;

