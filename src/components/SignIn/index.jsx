import React, { Component, useEffect, useState } from "react";
import "./styles.scss";
import Button from "../Forms/Button";
import { auth, handleUserProfile, provider } from "../../firebase/config";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigateTo = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        const { user } = data;
        if (user.email) {
          await handleUserProfile({ user });
          setCurrentUser(user);
          navigateTo("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="signin">
      <div className="wrap">
        <h2>Log In</h2>

        <div className="formWrap">
          <form onSubmit={handleSubmit}>
            <div className="socialSignin">
              <div className="row">
                <Button onClick={handleClick}>Sign in with Google</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
