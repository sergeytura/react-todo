import React from "react";
import PropTypes from 'prop-types';
import Task from "../Task/task";
import './taskList.css'

const TaskList = ({todos, onDeleted, onEditing,onSubmitEdit,onChangeEdit, onToggleCompleted}) => {
    
    TaskList.defaultProps = {
        onDeleted: () => {},
        onEditing: () => {},
        onSubmitEdit: () => {},
        onChangeEdit: () => {},
        onToggleCompleted: () => {},
        todos: [{}]
    }

    TaskList.propTypes = {
        onDeleted: PropTypes.func,
        onEditing: PropTypes.func,
        onSubmitEdit: PropTypes.func,
        onChangeEdit: PropTypes.func,
        onToggleCompleted: PropTypes.func,
        todos: PropTypes.arrayOf(PropTypes.object)
    }


    const elements = todos.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <Task key={id}
            {...itemProps}
            onToggleCompleted={() => onToggleCompleted(id)}
            onEditing={() => onEditing(id)}
            onDeleted={() => onDeleted(id)}
            onChangeEdit={(event) => onChangeEdit(id,event)}
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

