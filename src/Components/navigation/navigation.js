import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import './navigation.css'
import axios from 'axios';

class Navigation extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )

    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
        axios.post('http://localhost:2500/invest/api/userLogIn', this.state)
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
        this.props.history.push("/home");
    }

    render() {
let signInForm = (
    <div className="login-container">
        <form onSubmit = {this.handleSubmit} className="form-inline mt-2 mt-md-0">
            <input value= {this.state.user} onChange={(e)=>this.handleChange(e)} type="text" placeholder="email" name="email"/>
            <input value= {this.state.password} onChange={(e)=>this.handleChange(e)} type="password" placeholder="Password" name="password"/>
            <button className="btn btn-outline-success" onClick={(e) => this.handleSubmit(e)} type="submit">Login</button>
        </form>
    </div>
)
        if(localStorage.getItem("loggedInUser")){
           /* links = <Link className="nav-link" to="/settings">Settings<span className="sr-only">(current)</span></Link>*/

            signInForm = <button onClick ={this.signOut} className="btn btn-outline-danger my-2 my-sm-0" type="submit">Sign Out</button>

        }
        return (
            <div className="mb-5">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="#"><span>INVZT</span></Link>
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <Link className="nav-link" to="home">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="sign-up">Sign Up</Link>
                            </li>
                            {
                                localStorage.getItem("loggedInUser")?
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile">Profile</Link>
                                    </li> : ""
                            }
                            {
                                localStorage.getItem("loggedInUser")?
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/portfolio">Portfolio</Link>
                                    </li> : ""
                            }
                            {
                                localStorage.getItem("loggedInUser")?
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/stock-tracker">Track</Link>
                                    </li> : ""
                            }
                           {/* {
                                localStorage.getItem("loggedInUser") ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/portfolio">Portfolio</Link>
                                    </li> : ""
                            }*/}


                            <li className="nav-item">
                                <Link className="nav-link" to="about-us">About Us</Link>
                            </li>
                        </ul>
                        {signInForm}
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(Navigation);




