import React, { Component } from "react";
import { redirect, Route, Routes, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/config";

// import pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import "./default.scss";

// import layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

const initialState = {
  currentUser: null,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  authListener = null;

  async componentDidMount() {
    try {
      this.authListener = auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const userRef = await handleUserProfile(userAuth);
          // console.log(userRef);
          if (userRef) {
            userRef.onSnapshot((snapshot) => {
              this.setState({
                currentUser: {
                  id: snapshot.id,
                  ...snapshot.data(),
                },
              });
            });
          }
        } else {
          // if userAuth is null, clear the currentUser state
          this.setState({ currentUser: null });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <HomepageLayout currentUser={currentUser}>
                <Homepage />
              </HomepageLayout>
            }
          />
          <Route
            path="/registration"
            element={
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Login />
                </MainLayout>
              )
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
