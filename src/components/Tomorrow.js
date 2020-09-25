import React, {Component} from 'react';
import AddIcon from "@material-ui/icons/Add";
import './css/today.css'
import Todo from "./Todo";
import {compose} from "redux";
import {connect} from "react-redux";
import * as actions from "../actions";
import {firestoreConnect} from "react-redux-firebase";

class Tomorrow extends Component {
    state= {
        task: '',
        adding:false
    }

    handleChange = (e) => {
        this.setState({task:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const task = {
            task: this.state.task,
            collection: 'tomorrow',
            date: new Date(),
            userID: this.props.uid,
            overdueDate: new Date()
        }
        this.props.addTask(task)
        this.setState({task:''})
    }

    renderTasks = () => {
        if(this.props.tasks) {
            return this.props.tasks.map(todo => {
                if(todo.userID === this.props.uid){
                    return <Todo  todo={todo} key={todo.id} complete={this.props.completeTask}  collection='tomorrow' edit={this.props.editTask} delete={this.props.deleteTodo} />
                }else {
                    return ''
                }
            })
        }else {
            return 'Loading'
        }
    }

    checkPassing = () => {
        const today = new Date()
        const todayDate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        if(this.props.tasks) {
            this.props.tasks.map(task => {
                const taskDate = task.overdueDate.toDate()
                const taskDateFormated = taskDate.getFullYear() + '/' + (taskDate.getMonth() + 1) + '/' + taskDate.getDate();
                if(todayDate > taskDateFormated) {
                    this.props.moveTomorrowTasks(task, 'today', 'tomorrow')
                }
            })
        }
    }

    componentDidMount() {
        this.interval = setInterval(this.checkPassing, 2000)
    }

    componentWillMount() {
        clearInterval(this.interval)
    }

    render() {
        const day = new Date();
        const nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);
        return (
                <div className='today'>
                    <h2>Tomorrow <span className='dateString'>{nextDay.toDateString()}</span></h2>
                    {!this.state.adding ? <p onClick={(event => this.setState({adding: true}))} className='addingButton'><AddIcon /> Add Task</p> : <form className='addTodo' onSubmit={this.handleSubmit}>
                        <input type='text' value={this.state.task} onChange={this.handleChange} />
                        <button disabled={!this.state.task} type='submit'>Add Task</button>
                        <button onClick={event => this.setState({adding:false})} className='cancelButton'>Cancel</button>
                    </form> }

                    <div>
                        {this.renderTasks()}
                    </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        tasks: state.firestore.ordered.tomorrow,
        uid: state.firebase.auth.uid
    }
}

export default compose(
    connect(mapStateToProps, actions),
    firestoreConnect(props => [
        {
            collection: 'tomorrow'
        }
    ])
)(Tomorrow);