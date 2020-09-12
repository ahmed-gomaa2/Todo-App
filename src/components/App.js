import React, {Component} from 'react';
import {BrowserRouter, Link, Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import Landing from './Landing'
import Today from './Today'
import Tomorrow from './Tomorrow'
import Sidebar from "./Sidebar";
import './css/sidebar.css'
import * as actions from "../actions";


class App extends Component {
    state = {
        toggle: false
    }

    handletoggle = () => {
        this.setState({toggle:!this.state.toggle})
    }
    render() {

        return (
            <BrowserRouter>
                <Route exact component={() => <Sidebar toggleButton={this.handletoggle}/>} />
                <div className='container'>
                    <div className={`sidbar-items ${this.state.toggle ? 'sidbar-items-active' : ''}`}>
                        <ui className="items">
                            <NavLink className='link' activeClassName='active-link' to='/today'>Today</NavLink>
                            <NavLink className='link' activeClassName='active-link' to='/tomorrow'>Tomorrow</NavLink>
                            <NavLink className='link' activeClassName='active-link' to='/week'>Week</NavLink>
                        </ui>
                    </div>
                    <Route exact path='/' component={Landing} />
                    {this.props.uid ? [
                        <div style={{width:'100%'}}>
                            <Route exact path='/today' component={Today} />
                            <Route exact path='/tomorrow' component={Tomorrow} />
                        </div>
                    ]: ''}
                </div>

            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid,
    }
}

export default compose(
    connect(mapStateToProps, actions)
)(App);