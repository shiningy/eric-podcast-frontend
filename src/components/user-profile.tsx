import React from "react";
import { Link } from "react-router-dom";

interface IUserProfileProps {
  to: string;
}

export const UserProfile: React.FC<IUserProfileProps> = ({ to }) => (
  <span className="flex-none bg-gray-100 px-1 py-1 rounded-full">
    <Link className="hover:underline flex p-1" to={to}>
      <svg
        className="w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      {/* {data?.me.email} */}
    </Link>
  </span>
);
