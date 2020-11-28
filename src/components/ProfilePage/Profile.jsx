import { isEmpty } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearError, updateAvatarRequest } from "../../actions";
import { Puff } from "@agney/react-loading";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
class Profile extends Component {
  state = {
    user: "",
    access_token: "",
    loading: true,
  };
  async componentDidMount() {
    var access_token = JSON.parse(localStorage.getItem("access_token"));
    var user = JSON.parse(localStorage.getItem("user"));
    if (isEmpty(access_token) || isEmpty(user)) {
      this.props.history.push("/login");
    }
    await this.setState({
      access_token: access_token,
      user: user,
      loading: false,
    });
  }
  onChangeAvatar = async (e) => {
    var avatar_src = e.target.files[0];
    var data = new FormData();
    data.append("file", avatar_src);
    var { access_token } = this.state;
    const header = { Authorization: `Bearer ${access_token}` }
    this.setState({
      loading: true,
    })
    await this.props.updateAvatar(data, header);
    if(this.props.error === 429){
      await this.setState({
        loading: false
      })
      confirmAlert({
        title: "Lỗi",
        message: "Qúa nhiều yêu cầu, vui lòng thử lại sau ít phút !!!",
        buttons: [
          {
            label: "OK",
          },
        ],
      });
      this.props.clearError();
    }
  };
  static getDerivedStateFromProps(props, state) {
    if (props.session.user !== state.user) {
      return {
        user: props.session.user,
        loading: false,
      };
    }
    return null;
  }
  componentDidUpdate(preProps, preState) {
    if (preProps.profile !== this.props.profile) {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    var { user, loading } = this.state;
    var {user_info} = user;
    return (
      <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">
          <div className="row">
            {loading ? (
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <Puff color="#00BFFF" height="800" width="100%" />
              </div>
            ) : (
              <>
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                  <div
                    className="avatar"
                    data-toggle="tooltip"
                    title="Đổi ảnh đại diện ?"
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      cursor: "pointer",
                    }}
                    onClick={() => this.fileInput.click()}
                  >
                    <input
                      type="file"
                      id="change-avatar"
                      hidden
                      ref={(fileInput) => {
                        // assigns a reference so we can trigger it later
                        this.fileInput = fileInput;
                      }}
                      onChange={(e) => this.onChangeAvatar(e)}
                    />
                    <img
                      src={
                        user_info && user_info.avatar_src
                          ? user_info.avatar_src
                          : "/images/default-avatar.png"
                      }
                      alt="avatar"
                    />
                  </div>
                  <div className="name-profile mt-3">
                    <h3 style={{ textAlign: "center" }}>{user.name}</h3>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                  {/* <ToastContainer /> */}
                  <section id="about" className="about cc_cursor">
                    <div className="section-header">
                      <h2>Thông tin cá nhân</h2>
                    </div>
                    {/* Intro */}
                    <div className="intro cc_cursor">
                      <ul className="info">
                        <li>
                          <h4>
                            Giới tính:{" "}
                            <i>
                              {user_info && user_info.gender ? "Nam" : "Nữ"}
                            </i>
                          </h4>
                        </li>
                        <li>
                          <h4>
                            Ngày sinh:{" "}
                            <i>
                              {user_info && user_info.birthday
                                ? user_info.birthday
                                : "N/A"}
                            </i>
                          </h4>
                        </li>
                        <li>
                          <h4>
                            Địa chỉ:{" "}
                            <i>
                              {user_info && user_info.address
                                ? user_info.address
                                : "N/A"}
                            </i>
                          </h4>
                        </li>
                        <li>
                          <h4>
                            Số điện thoại:{" "}
                            <i>
                              {user_info && user_info.phone
                                ? user_info.phone
                                : "N/A"}
                            </i>
                          </h4>
                        </li>
                        <li>
                          <h4>
                            Vai trò:{" "}
                            <i>
                              {user_info && user_info.role
                                ? "Quản trị viên"
                                : "Tác giả"}
                            </i>
                          </h4>
                        </li>
                      </ul>
                      <div className="form-group">
                        <Link to="/profile/update">
                          <button className="btn btn-info mt-3 mr-3">
                            Cập nhật thông tin
                          </button>
                        </Link>

                        <button className="btn btn-warning mt-3 mr-3">
                          Đổi mật khẩu
                        </button>
                      </div>
                    </div>
                    {/* Intro end */}
                  </section>
                  ;
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    session: state.session,
    error: state.error,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateAvatar: (avatar_src, config) => {
      return dispatch(updateAvatarRequest(avatar_src, config));
    },
    clearError: () => {
      return dispatch(clearError());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
