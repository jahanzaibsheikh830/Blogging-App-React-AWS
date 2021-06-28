import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../home";
import Posts from "../posts";
import Navbar from "./navbar";
import Login from "../login/login";
import Dashboard from "../adminDashboard/adminDashboard";
import { useSelector, useDispatch } from "react-redux";
import { Auth } from "aws-amplify";
import { user } from "../../redux/action/reduxaction";
function RouterConfig() {
  const useData = useSelector((state) => state.addUser);
  const dispatch = useDispatch();
  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const User = await Auth.currentAuthenticatedUser();
      console.log(User);
      dispatch(
        user({
          loginStatus: true,
          loginUser: User,
        })
      );
    } catch (err) {
      console.log("authenticate user err", err);
    }
  }
  return (
    <Router>
      {window.location.pathname === "/login" ? null : useData.loginStatus ===
        true ? null : (
        <Navbar />
      )}
      {useData.loginStatus === false ? (
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/posts' component={Posts} />
            <Route path='/login' component={Login} />
            <Route path='*'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </div>
      ) : null}
      {useData.loginStatus === true ? (
        <div>
          <Switch>
            <Route exact path='/' component={Dashboard} />
          </Switch>
        </div>
      ) : null}
    </Router>
  );
}
export default RouterConfig;
