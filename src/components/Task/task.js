import React from "react";
import PropTypes from 'prop-types'; 
import { formatDistanceToNow } from 'date-fns'
import './task.css';


export default class Task extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func,
        onSubmitEdit: PropTypes.func,
        onChangeEdit: PropTypes.func,
        onDeleted: PropTypes.func,
        onToggleCompleted: PropTypes.func,
        onEditing: PropTypes.func,
        label: PropTypes.string,
        completed: PropTypes.bool,
        editing: PropTypes.bool
    }

    render () {
        
        const {time, onSubmitEdit,onChangeEdit,label,onDeleted, onToggleCompleted, onEditing, completed, editing} = this.props;
        
        let classNames = '';
        if(completed) classNames = 'completed'
        if(editing) classNames = 'editing'      
        return (
            <li className={classNames}>
                <div className="view">
                    <input className="toggle"
                    onClick={onToggleCompleted}
                    defaultChecked={completed}
                    type="checkbox"/>
                <label>
                    <span className="description"
                    >{label}</span>
                    <span className="created">Created {formatDistanceToNow(time,{includeSeconds:true})}</span>
                </label>
                    <button className="icon icon-edit"
                    onClick={onEditing}></button>
                    <button className="icon icon-destroy"
                    onClick={onDeleted}></button>
                </div>
                <form onSubmit={onSubmitEdit}>
                    <input type="text" 
                    className="edit" 
                    defaultValue={label}
                    onChange={onChangeEdit}/>
                </form>
            </li>
        )
    }
    
}

