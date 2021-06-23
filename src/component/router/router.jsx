import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../home";
import Posts from "../posts";
import Navbar from "./navbar";
function RouterConfig() {
  return (
    <Router>
      <Switch>
        <Navbar />
        <Route exact path='/' component={Posts} />
        <Route path='/fgsdg' component={Home} />
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Router>
  );
}
export default RouterConfig;
