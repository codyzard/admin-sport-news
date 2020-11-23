import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LeftNavigation from "../CommonPages/LeftNavigation";
import NotFound404 from "../CommonPages/NotFound404";
import TopNavigation from "../CommonPages/TopNavigation";
import Homepage from "../Homepages/Homepage";
import Categories from "../ManagePages/CategoryPages/Categories";
import Login from "../SessionPages/Login";
import {isLogged} from '../../actions/index';
class Main extends Component {
  state = {
    username: "",
    password: "",
    loggedIn: true,
  };
  constructor(props){
    super(props);
    this.props.isLogged()
  }
  render() {
    var {loggedIn} = this.state;
    return (
      <div className="dashboard-main-wrapper">
        <TopNavigation />
        {loggedIn ? <LeftNavigation /> : <></>}
        <Switch>
            <Route path="/" exact component={Homepage}/>
            <Route path="/management/categories" component={Categories} />
            <Route path="/login" component={Login}/>
            <Route component={NotFound404}/>
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    isLogged: () => {
      return dispatch(isLogged());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

