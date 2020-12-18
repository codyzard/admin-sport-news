import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CronBuilder from "react-cron-builder";
import "react-cron-builder/dist/bundle.css";
import { isEmpty } from "lodash";
import { alertMessage } from "../../../utils/help_function";
import { getScheduleRequest, setScheduleRequest } from "../../../actions";
import { Rings } from "@agney/react-loading";
import cronstrue from "cronstrue";
class AutomationUpdate extends Component {
  state = {
    cronValue: "",
    scheduler: {},
    loading: true,
    now_schedule: "",
  };
  async componentDidMount() {
    await this.props.getSchedule();
    let now_schedule = cronstrue.toString(this.props.scheduler.time);
    this.setState({
      scheduler: this.props.scheduler,
      loading: false,
      now_schedule: now_schedule,
    });
  }
  handleChange(cronValue) {
    this.setState({ cronValue });
  }
  onSubmit = async () => {
    let { cronValue } = this.state;
    if (isEmpty(cronValue)) {
      alertMessage("Lỗi", "Hãy gerenate ra trước");
      return;
    }
    this.setState({ loading: true });
    let access_token = JSON.parse(localStorage.getItem("access_token"));
    const header = { Authorization: `Bearer ${access_token}` };
    await this.props
      .setSchedule(header, cronValue)
      .then(() => {
        this.setState({ loading: false });
        alertMessage("Thông báo", "Cập nhật lịch thành công");
      })
      .catch((err) => {
        this.setState({ loading: false });
        if (err.response && err.response.status === 401) {
          alertMessage("Lỗi", "Phiên đăng nhập hết hạn vui lòng đăng nhập lại");
          return;
        } else if (err.response && err.response.status === 400) {
          alertMessage("Lỗi", "Lịch đã tồn tại");
          return;
        } else return;
      });
  };
  static getDerivedStateFromProps(props, state) {
    if (props.scheduler !== state.scheduler) {
      return {
        user: props.scheduler,
        loading: false,
        now_schedule: cronstrue.toString(props.scheduler.time),
      };
    }
    return null;
  }
  render() {
    var { loading, now_schedule, scheduler } = this.state;
    return (
      <div className="dashboard-wrapper">
        <div className="dashboard-ecommerce">
          <div className="container-fluid dashboard-content ">
            <h2 className="pageheader-title">{"Bài viết cá nhân"}</h2>
            <div className="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/" className="breadcrumb-link">
                      {"Trang chủ"}
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#" className="breadcrumb-link">
                      {"Quản lý"}
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {"Lên lịch thu thập tin tức"}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <h1 className="text-center">
                Lịch đã được thiết lập vào:{" "}
                {now_schedule + " (" + scheduler.time + ")"}
              </h1>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              {loading ? (
                <Rings color="#00BFFF" height="800" width="100%" />
              ) : (
                <div className="form-group">
                  <CronBuilder
                    onChange={(cronExpression) =>
                      this.handleChange(cronExpression)
                    }
                    showResult={true}
                  />
                  <button
                    onClick={this.onSubmit}
                    className="btn btn-success float-right mt-3 mr-2"
                  >
                    Lưu
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    scheduler: state.scheduler,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    setSchedule: (header, cronValue) => {
      return dispatch(setScheduleRequest(header, cronValue));
    },
    getSchedule: () => {
      return dispatch(getScheduleRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AutomationUpdate);
