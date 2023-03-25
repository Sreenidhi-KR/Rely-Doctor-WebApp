import React, { Component } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import AuthService from "../services/auth.service";

import { withRouter } from "../common/with-router";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

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
        this.props.router.navigate("/profile");
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
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol
            md="8"
            className="justify-content-center"
            style={{ paddingLeft: "600px" }}>
            <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
              <h3
                className="fw-normal mb-3 ps-5 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                DOCTOR LOGIN
              </h3>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                label="User Name"
                type="text"
                size="lg"
                htmlFor="username"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                label="Password"
                type="password"
                size="lg"
                htmlFor="password"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />

              <MDBBtn
              className="mb-4 px-5 mx-5 w-100"
                color="info"
                size="lg"
                disabled={this.state.username!="" && this.state.password!="" ? false : true}
                onClick={this.handleLogin}>
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Login
              </MDBBtn>
              <p className="small mb-5 pb-lg-3 ms-5">
                <a class="text-muted" href="#!">
                  Forgot password?
                </a>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default withRouter(Login);
