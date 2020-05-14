import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
/*  Link,
  useRouteMatch*/
} from "react-router-dom";

import Header from './Components/header/header'
import SignUp from './Components/sign-up/sign-up'
import Home from './Components/home/home'
import Navigation from "./Components/navigation/navigation";
import signUp from "./Components/sign-up/sign-up";
import StockTracker from "./Components/stock-tracker/stock-tracker";
import ThankYou from "./Components/thank-you/thank-you";
import SideBar from "./Components/side-nav/SideBar";
import Portfolio from './Components/Portfolio/portfolio';
import Profile from './Components/Profile/profile';
import aboutUs from './Components/about-us/about-us';

function App() {
  return (
      <div className="App">
        <Router>
            <Navigation />
            <signUp/>
            {/*<SideBar />*/}
          <div className="container">

            <Switch>
                <Route  exact path="/" component={SignUp} />
                <Route  exact path="/header" component={Header} />
                <Route exact path="/thank-you" component={ThankYou} />
                <Route exact path="/home" component={Home}/>
                <Route exact path="/sign-up" component={signUp}/>
                <Route exact path="/stock-tracker" component={StockTracker}/>
                <Route exact path="/portfolio" component={Portfolio}/>

                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/about-us" component={aboutUs}/>
              <Route exact path="/table-two" component={() => <SignUp name="Table Two" type="two" /> }/>

            </Switch>

          </div>

        </Router>

{/*
        <Footer />
*/}
      </div>
  );
}

export default App;
