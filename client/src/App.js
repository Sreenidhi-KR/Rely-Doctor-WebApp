import React, { Component, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Nav from "react-bootstrap/Nav";
import AuthService from "./services/auth.service";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import VideoCall from './components/VideoCall.component';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href={"/home"}>Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {currentUser && (
                  <Nav.Item>
                    <Nav.Link eventKey="User" href={"/user"}>
                      User
                    </Nav.Link>
                  </Nav.Item>
                )}
                </Nav>
                <Nav>
                {currentUser ? (
                  <Fragment>
                    <Nav.Link href={"/profile"}>Profile</Nav.Link>
                    <Nav.Link href={"/video"}>VideoCall</Nav.Link>
                    <Nav.Link href="/login" onClick={this.logOut}>
                      LogOut
                    </Nav.Link>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Nav.Link href={"/login"}>Login</Nav.Link>
                    <Nav.Link href={"/register"}>SignUp</Nav.Link>
                  </Fragment>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/video" element={<VideoCall/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
