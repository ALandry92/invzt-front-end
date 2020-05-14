import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './home.css'
import axios from 'axios';

class Home extends Component {

    state = {
        user: {}
    }

    componentDidMount() {
        const email = localStorage.getItem("loggedInUser");
        const params = {
            email: email
        }
        axios.get('http://localhost:2500/invest/api/findByEmail', {params})
            .then(response => {
                this.setState(
                    {
                        user: response.data
                    }
                )
            }).catch(error => {

        });
    }

    render() {
        return (
            <div>
                <div className="home-container">
                    <h1 className="primary">Welcome to INVZT</h1>

                </div>
                <div className="base-container">
                    <h2 className="secondarytext"> INVZT is a user-based stock tracking application
                    </h2>
                </div>
                <div className="link-container">
                    Click here to sign up: <Link to="/sign-Up">Sign Up</Link>
                </div>
                <div className="plus">
                    <img src={"https://media.brstatic.com/2017/09/25131833/stock-exchange-floor-nyse-corbis-mst.jpg?"}/>
                </div>
            </div>
        );
    }
}

export default Home;