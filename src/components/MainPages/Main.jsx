import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LeftNavigation from "../CommonPages/LeftNavigation";
import NotFound404 from "../CommonPages/NotFound404";
import TopNavigation from "../CommonPages/TopNavigation";
import Homepage from "../Homepages/Homepage";
import Categories from "../ManagePages/CategoryPages/Categories";
import Login from "../SessionPages/Login";
import { isLogged } from "../../actions/index";
import CreateCategoryForm from "../ManagePages/CategoryPages/CreateCategoryForm";
import CategoryDetail from "../ManagePages/CategoryPages/CategoryDetail";
import Profile from "../ProfilePage/Profile";
import UpdateProfile from "../ProfilePage/UpdateProfile";
import News from "../ManagePages/NewsPages/News";
import NewsForm from "../ManagePages/NewsPages/NewsForm";
import NewsInfoEdit from "../ManagePages/NewsPages/NewsInfoEdit";
import ApprovalListNews from "../ManagePages/ApprovalNewsPages/ApprovalListNews";
import AuthorAccount from "../ManagePages/AuthorAccountPages/AuthorAccount";
import RegisterAuthorAccount from "../ManagePages/AuthorAccountPages/RegisterAuthorAccount";
import WhiteListNews from "../ManagePages/ApprovalNewsPages/WhiteListNews";
import Footer from "../CommonPages/Footer";
import AutomationUpdate from "../ManagePages/AutomationUpdatePages/AutomationUpdate";
class Main extends Component {
  state = {
    username: "",
    password: "",
    loggedIn: true,
  };
  constructor(props) {
    super(props);
    this.props.isLogged();
  }
  render() {
    var { loggedIn } = this.state;
    return (
      <div className="dashboard-main-wrapper">
        <TopNavigation />
        {loggedIn ? <LeftNavigation /> : <></>}
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/management/automation_update" component={AutomationUpdate} />
          <Route
            path="/management/categories/create"
            component={CreateCategoryForm}
          />
          <Route path="/management/categories/:id" component={CategoryDetail} />
          <Route path="/management/categories" component={Categories} />
          <Route path="/management/news/create" component={NewsForm} />
          <Route path="/management/news/:id" component={NewsInfoEdit} />
          <Route path="/management/news" component={News} />
          <Route path="/management/white_list_news" component={WhiteListNews} />
          <Route
            path="/management/approval_news"
            component={ApprovalListNews}
          />
          <Route
            path="/management/author_account/register"
            component={RegisterAuthorAccount}
          />
          <Route path="/management/author_account" component={AuthorAccount} />
          <Route path="/profile/update" component={UpdateProfile} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route component={NotFound404} />
        </Switch>
        <div className="container-fluid">
          <div className="row">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    isLogged: () => {
      return dispatch(isLogged());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
