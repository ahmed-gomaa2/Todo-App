import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './css/loginModal.css'
import './css/sidebar.css'
import * as actions from '../actions/authActions'


class PersistentDrawerLeft extends React.Component {
    state = {
        openModal: false,
        email: '',
        password: '',
        openSignUpModel: false,
        signupEmail: '',
        signupPassword: '',
        toggleSidbar: false
    }

    handleLoginClick = () => {
        this.setState({openModal: !this.state.openModal, email:'', password:'', openSignUpModel: false})
    }

    handleSignupClick = () => {
        this.setState({openSignUpModel: !this.state.openSignUpModel, signupEmail: '', singupPassword: '', openModal: false})
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value})
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})
    }

    handleSingupEmailChange = (e) => {
        this.setState({signupEmail:e.target.value})
    }

    handleSignupPasswordChange = (e) => {
        this.setState({signupPassword: e.target.value})
    }

    handleLoginSubmit =(e) => {
        e.preventDefault()
        this.props.signIn(this.state.email, this.state.password)
        this.setState({email:'', password:'', openModal: false})
    }

    handleSignupSubmit = (e) => {
        e.preventDefault()
        this.props.signUp(this.state.signupEmail, this.state.signupPassword)
        this.setState({signupPassword:'', signupEmail: '', openSignUpmodel: !this.state.openSignUpModel})
    }

    handleSignOut = () => {
        this.props.signOut()
    }

    handleBurgerClick = () => {
        this.setState({toggleSidbar: !this.state.toggleSidbar})
        this.props.toggleButton()
    }

    renderNav = () => {
        if(this.props.uid) {
            return <li className="login">
                <a onClick={this.handleSignOut} className="signupLink">SignOut</a>
            </li>
        }else {
            return [
                <li className="login">
                    <a onClick={this.handleLoginClick} className="loginLink">Login</a>
                </li>,
                <li className="login">
                    <a onClick={this.handleSignupClick} className="signupLink">Signup</a>
                </li>
            ]
        }
    }
    render(){
        console.log(this.props)
    return (
        <div >
            <div className='nav-bar' >

                <div className="right">

                    <div onClick={this.handleBurgerClick} className='humburger'>&#9776;</div>

                    <ui className="right-links">
                        <li className="home">
                            <Link to='/' className="homeLink">Home</Link>
                        </li>
                    </ui>
                </div>
                <div className="left">
                    <ui className="left-links">
                        {this.renderNav()}
                    </ui>
                </div>
            </div>

            <div className={`modal-container ${this.state.openModal || !this.props.uid && !this.state.openSignUpModel ? 'bg-active' : ''}`}>
                <div onClick={this.handleLoginClick} className='close'></div>
                <div className= 'modal-bg' >
                    <form onSubmit={this.handleLoginSubmit} className="modal" >
                        <h2 className="loginHeader">Login</h2>
                        <input type="text"  value={this.state.email} onChange={this.handleEmailChange} placeholder='Email' className="loginUsername"/>
                        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder='Password' className="loginPassword"/>
                        <button className="loginButton">Login</button>
                        <p>Don't have email?</p>
                        <Link className='login' onClick={this.handleSignupClick}>Signup</Link>
                    </form>
                </div>
            </div>

            <div className={`modal-container ${this.state.openSignUpModel ? 'bg-active' : ''}`}>
                <div onClick={this.handleSignupClick} className='close'></div>
                <div className= 'modal-bg' >
                    <form onSubmit={this.handleSignupSubmit} className="modal" >
                        <h2 className="loginHeader">Signup</h2>
                        <input type="text" value={this.state.signupEmail} onChange={this.handleSingupEmailChange} placeholder='Email' className="loginUsername"/>
                        <input type="password" value={this.state.signupPassword} onChange={this.handleSignupPasswordChange} placeholder='Password' className="loginPassword"/>
                        <button className="loginButton">Signup</button>
                        <p>already have one?</p>
                        <Link className='login' onClick={this.handleLoginClick}>Login</Link>
                    </form>
                </div>
            </div>
        </div>
    )};
}

const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid
    }
}



export default connect(mapStateToProps, actions) (PersistentDrawerLeft)