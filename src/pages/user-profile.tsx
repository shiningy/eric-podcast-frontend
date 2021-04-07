import React from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { LS_TOKEN } from "../constants";

export const UserProfile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    localStorage.removeItem(LS_TOKEN);
    authTokenVar(null);
    isLoggedInVar(false);
    history.push("/");
  };

  return (
    <div>
      <Helmet>
        <title>User Profile | Nuber Podcast</title>
      </Helmet>
      <div>User Profile</div>
      <div>
        <Link to={"/edit-profile"} className="input">
          Edit Profile
        </Link>
      </div>
      <div>
        <button className="input" onClick={onLogOutClick}>
          LogOut
        </button>
      </div>
    </div>
  );
};
