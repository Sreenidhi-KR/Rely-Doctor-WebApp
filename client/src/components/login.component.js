import React, { Component } from "react";
import AuthService from "../services/auth.service";

import { withRouter } from "../common/with-router";


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });
    AuthService.login(this.state.username, this.state.password).then(
      () => {
        this.props.router.navigate("/dashboard");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage,
        });
      }
    );
  }

  render() {
    return (
      <div className="Auth-form-container">
      <form className="Auth-form">
        <div
          className="Auth-form-content"
          style={{ color: "darkblue", paddingLeft: "50px" }}
        >
          <h3
            style={{
              textAlign:"center",
              color: "#5e17eb",
              fontWeight: "bolder",
            }}
          >
            DOCTOR LOGIN
          </h3>
          <div className="form-group mt-3" style={{ paddingTop: "30px" }}>
            <h5>User Name</h5>
            <input
              type="text"
              required
              className="form-control mt-1"
              placeholder="Enter name"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group mt-3">
            <h5>Password</h5>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="d-grid mt-5">
            <button
              style={{
                backgroundColor: "#5e17eb",
                fontWeight: "bold",
              }}
              type="Submit"
              className="btn btn-primary btn-block"
              onClick={this.handleLogin}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </div>

    );
  }
}

export default withRouter(Login);
