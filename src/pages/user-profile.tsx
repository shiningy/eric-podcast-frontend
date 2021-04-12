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
    <div className="h-screen items-center bg-gray-50">
      <Helmet>
        <title>User Profile | Nuber Podcast</title>
      </Helmet>
      <div className="h-full rounded-lg justify-center pt-20">
        <div className="text-gray-500 text-3xl text-center mb-3 pb-20 font-medium border-b-2">
          User Profile
        </div>
        <div>
          <div className="mt-5 flex justify-center">
            <div className="p-10 border-2 rounded-full">User Images...</div>
          </div>
          <div className="mt-5 flex justify-center">
            <Link
              to={"/edit-profile"}
              className="text-xl mb-5 border-2 p-3 rounded-lg hover:bg-gray-100"
            >
              Edit Profile
            </Link>
          </div>
          <div className="flex justify-center text-2xl">
            <button
              className="input rounded-lg hover:bg-gray-100"
              onClick={onLogOutClick}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
