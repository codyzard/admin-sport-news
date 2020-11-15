import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LeftNavigation from "../CommonPages/LeftNavigation";
import TopNavigation from "../CommonPages/TopNavigation";
import Homepage from "../Homepages/Homepage";
import Categories from "../ManagePages/CategoryPages/Categories";

class Main extends Component {
  render() {
    return (
      <div className="dashboard-main-wrapper">
        <TopNavigation />
        <LeftNavigation />
        <Switch>
            <Route path="/" exact component={Homepage}/>
            <Route path="/management/categories" component={Categories} />
        </Switch>
      </div>
    );
  }
}
export default Main;
