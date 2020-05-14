import React, { Component } from 'react';
import './SideBar.css';


class SideBar extends Component {

    render () {
        return (
            <div>
            <nav className="navbar navbar-inverse sidebar" role="navigation">
                <div className="container-fluid">

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target="#bs-sidebar-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Brand</a>
                    </div>


                    <div className="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active"><span className="font-16 hidden-xs showopacity glyphicon glyphicon-user"></span>
                            </li>
                            <li><a href="#">Profile<span className="font-16 hidden-xs showopacity glyphicon glyphicon-user"></span></a>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Settings <span
                                    className="caret"></span><span className="font-16 hidden-xs showopacity glyphicon glyphicon-user"></span></a>
                                <ul className="dropdown-menu forAnimate" role="menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li className="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                    <li className="divider"></li>
                                    <li><a href="#">One more separated link</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Home<span className="font-16 hidden-xs showopacity glyphicon glyphicon-user"></span></a>
                            </li>
                            <li><a href="./profile">Profile<span className="font-16 hidden-xs showopacity glyphicon glyphicon-user"></span></a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            </div>
        )
    }
}

export default SideBar;