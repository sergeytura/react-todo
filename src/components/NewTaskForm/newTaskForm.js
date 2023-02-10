import React from "react";
import './newTaskForm.css';

export default class NewTaskForm extends React.Component {

    state = {
        newTask: ''
    }

    // getTask () {
    //     console.log('hi')
    // }
    

    render() {
        const {onItem} = this.props
        return (
            <header className="header">
                <h1>todos</h1>
                
                    <input 
                    className="new-todo" 
                    placeholder="What needs to be done?"
                    onChange={ () => onItem()}
                    autoFocus/>
            </header>
        )

        
    }
}