import React from "react";
import './task.css';

export default class Task extends React.Component {

    // state = {
    //     completed: false,
    //     editing: false,
    // }

    // onLabelClick = () => {
        // this.setState(({completed}) => {
        //     return {completed: !completed}
        // })
    // }

    // onEditingClick = () => {
    //     this.setState(({editing}) => {
    //         return {editing: !editing}
    //     })
    // }

    render () {
        const {label,onDeleted, onToggleCompleted, onEditing, completed, editing} = this.props;
        // const {completed, editing} = this.state;
        let classNames = '';
        if(completed) classNames = 'completed'
        if(editing) classNames = 'editing'      
        return (
            <li className={classNames}>
                <div className="view">
                <input  className="toggle"
                onClick={onToggleCompleted}
                type="checkbox"/>
                <label>
                    <span className="description"
                    >{label}</span>
                    <span className="created">created 5 minutes ago</span>
                </label>
                <button className="icon icon-edit"
                onClick={onEditing}></button>
                <button className="icon icon-destroy"
                onClick={onDeleted}></button>
                </div>
                <input type="text" className="edit" value="Editing task"/>
            </li>
        )
    }
    
}

