import React, {Component} from 'react';
import './sign up.css'
import {Link} from 'react-router-dom';
import axios from 'axios'

class signUp extends Component {
    state = {
        user:{
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
        //Prevent Query String from displaying on the browser
        event.preventDefault();

        axios.post('http://localhost:2500/invest/api/user', this.state.user)
            .then(response => {
                //navigate to a thank you page
                localStorage.setItem("loggedInUser", response.data.email);

                this.props.history.push('/thank-you');
        }).catch(error => {
            //Display an some error messages
        });
    }

render() {

    return (

        <div className="signup-container">
            <form  onSubmit = {this.handleSubmit} className="form-signin">
                <div className="row justify-content-md-center">
                    <h1>Register Below</h1>
                </div>
                <div className="row justify-content-md-center">
                    <div className="textbox-input">
                        <label htmlFor="inputUsername" className="sr-only">Username</label>
                        <input value = {this.state.user.user} name="user" onChange = {this.handleChange} className="form-control mr-sm-2"   type="text" placeholder="Username"/>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input value = {this.state.user.email}  name = "email" onChange = {this.handleChange}  className="form-control mr-sm-2" type="text" placeholder="Email" aria-label="Email"/>

                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input value = {this.state.user.password} name = "password" onChange={this.handleChange} className="form-control mr-sm-2" type="password" placeholder="Password"/>
                        <button className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit}>Sign Up</button>
                        <p className="col justify-content-md-center">INVZT & Anthony Landry</p>
                    </div>
                </div>
            </form>

    </div>
    );
}
}
export default signUp;
