import React, { useEffect } from "react";
import { withRouter } from "./with-router";
import  secureLocalStorage  from  "react-secure-storage";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  let location = props.router.location;

  useEffect(() => {
    const user = JSON.parse(secureLocalStorage.getItem("user"));

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);
      console.log(decodedJwt)
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location]);

  return <div></div>;
};

export default withRouter(AuthVerify);
