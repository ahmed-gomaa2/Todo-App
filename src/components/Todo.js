import React, {Component, forwardRef} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './css/todo.css'

const Todo  = forwardRef((props, ref) => {
    const [todo, setTodo] = React.useState(props.todo.task)
    const [editing, setEditing] = React.useState(false)

    const removeTask = () => {
        props.delete(props.todo, props.collection)
    }

    const handleEditting = (e) => {
        e.preventDefault()
        props.edit(todo, props.todo,  props.collection)
        setEditing( false)
    }

    const handleChange = (e) => {
        setTodo( e.target.value)
    }

    const completeTask = () => {
        props.complete(props.todo, props.collection)
    }

    return (
        <div ref={ref}>
            {editing ? <form className='editTodo' onSubmit={handleEditting}>
                <input type='text' value={todo} onChange={handleChange} />
                <button disabled={!todo} type='submit'>Edit Task</button>
                <button onClick={event => setEditing(false)} className='cancelButton'>Cancel</button>
                </form> : <div className={`todoContainer ${props.todo.overdue ? 'overdue' : ''}`}>
                <div onClick={completeTask} className={`done ${props.todo.done ? 'doneActive' : ''}`}>&#10003;</div>
                <div className='todo'>
                    <div className='head'>
                        <p className='taskText'>{props.todo.task}</p>
                        <h5 >{props.todo?.timestamp?.toDate().toUTCString()}</h5>
                    </div>
                </div>
                <div className='editTodoButton'>
                    {props.todo.overdue ? <p>overdue</p> : ''}
                    <DeleteIcon onClick={removeTask} className='deleteIcon' />
                    <EditIcon onClick={event => setEditing(true)} className='editIcon' />
                </div>
            </div>
                }

        </div>
    )

})

export default Todo;