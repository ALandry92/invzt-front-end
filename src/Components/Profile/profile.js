import React, { Component } from 'react';
import axios from 'axios';
import './profile.css'


class Profile extends Component{

    state = {
        user:{
            user: '',
            email: ''
        }
    }

    componentDidMount() {
        const email = localStorage.getItem("loggedInUser");
        axios.get(`http://localhost:2500/invest/api/user/${email}`)
            .then(response => {
                this.setState(
                    {
                        user: response.data
                    }
                )
            }).catch(error => {

        });
    }

    render () {
        return (
            <div className="container emp-profile card md">
                    <div className="row card-body">
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                     aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Username: </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{this.state.user.user}</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email: </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{this.state.user && this.state.user.email? this.state.user.email : ""}</p>
                                        </div>
                                    </div>



                                </div>

                            </div>
                        </div>
                    </div>
                    <form method="post">
                        <div className="row">
                            <div className="col-md-4">

                            </div>

                            <div className="col-md-2">
                                <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                            </div>
                        </div>
                </form>
            </div>
        )
    }
}



export default Profile;