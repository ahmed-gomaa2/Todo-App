import React, {Component} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './css/todo.css'

class Todo extends Component {
    state ={
        todo: this.props.todo.task,
        editing: false
    }

    removeTask = () => {
        this.props.delete(this.props.todo, this.props.collection)
    }

    handleEditting = (e) => {
        e.preventDefault()
        this.props.edit(this.state.todo, this.props.todo,  this.props.collection)
        this.setState({editing: false})
    }

    handleChange = (e) => {
        this.setState({todo: e.target.value})
    }

    completeTask = () => {
        this.props.complete(this.props.todo, this.props.collection)
    }

    edit
    render() {
        return (
            <div >
                {this.state.editing ? <form className='editTodo' onSubmit={this.handleEditting}>
                    <input type='text' value={this.state.todo} onChange={this.handleChange} />
                    <button disabled={!this.state.todo} type='submit'>Edit Task</button>
                    <button onClick={event => this.setState({editing:false})} className='cancelButton'>Cancel</button>
                    </form> : <div className={`todoContainer ${this.props.todo.overdue ? 'overdue' : ''}`}>
                    <div onClick={this.completeTask} className={`done ${this.props.todo.done ? 'doneActive' : ''}`}>&#10003;</div>
                    <div className='todo'>
                        <div className='head'>
                            <p className='taskText'>{this.props.todo.task}</p>
                            <h5 >{this.props.todo.date.toDate().toUTCString()}</h5>
                        </div>
                    </div>
                    <div className='editTodoButton'>
                        {this.props.todo.overdue ? <p>overdue</p> : ''}
                        <DeleteIcon onClick={this.removeTask} className='deleteIcon' />
                        <EditIcon onClick={event => this.setState({editing:true})} className='editIcon' />
                    </div>
                </div>
                    }

            </div>
        );
    }
}

export default Todo;