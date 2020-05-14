import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

class Header extends Component {

    state = {
        user: {
            user: '',
            email:'',
            password: ''
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempUser = {...this.state.user};
        tempUser[name] = value;
        this.setState(
            {
                user: tempUser
            }
        )

    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:2500/invest/Api/userLogIn', this.state.user)
            .then( response => {
                //1. Store the loggedInUser
                localStorage.setItem("loggedInUser", response.data.email);
                //2. Navigate to the user's account page
                this.props.history.push('/home');
            }).catch(error =>{
            //Display some error message
        })
    }

    signOut = () => {
        localStorage.removeItem("loggedInUser");
        this.props.history.push("/");
    }

    render() {
        let links = (
            <Link className="nav-link" to="/sign-up">Sign up<span className="sr-only">(current)</span></Link>
        )
        let signInForm = (
            <div className="container">
                <form  onSubmit={this.handleSubmit} className="form-signin">
                    <div className="row justify-content-md-center">
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="textbox">
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input value = {this.state.user.user} name="user" onChange = {this.handleChange} className="form-control mr-sm-2"   type="text" placeholder="Username"/>
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input value = {this.state.user.password} name = "password" onChange={this.handleChange} className="form-control mr-sm-2" type="password" placeholder="Password"/>
                            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
                            <p className="col justify-content-md-center">INVZT & Anthony Landry</p>
                        </div>
                    </div>
                </form>
            </div>
        );
        if(localStorage.getItem("loggedInUser")){
            links = <Link className="nav-link" to="/settings">Settings<span className="sr-only">(current)</span></Link>

            signInForm = <button onClick ={this.signOut} className="btn btn-outline-danger my-2 my-sm-0" type="submit">Sign Out</button>

        }
        return (

            <div className="mb-5">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="#">User Profile</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarCollapse"
                            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                {links}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href to="about-us">About Us</Link>
                            </li>
                        </ul>
                        {signInForm}
                    </div>
                </nav>
            </div>
        );
    }
}
export default Header;