import React from "react";
import { Link } from "react-router-dom";

interface IPodcastProps {
  id: string;
  title: string;
  coverImg: string | null;
  category?: string;
  description: string | null;
  creator: string | null;
}

export const Podcast: React.FC<IPodcastProps> = ({
  id,
  title,
  coverImg,
  category,
  description,
  creator,
}) => (
  <Link to={`/podcasts/${id}`} className="relative group">
    <div className="p-4 rounded-md h-full flex bg-opacity-5 bg-gray-100">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="flex-none bg-cover w-40 h-40 rounded-md"
      ></div>
      <div className="flex-grow group ml-5 text-left">
        <h3 className="font-medium text-xl  pb-2 font-bold text-white">
          {title}
        </h3>
        <div className="text-gray-100 font-semibold pt-2">{creator}</div>
        <div className="text-gray-500 pt-2">{category}</div>
      </div>
    </div>
    <div className="p-8 rounded-md bg-opacity-90 bg-gray-400 absolute top-0 left-0 h-full w-full hidden group-hover:block flex flex-col items-center justify-center">
      <h3 className="font-medium text-xl text-center font-bold text-white">
        {title}
      </h3>
      <span className="overflow-hidden mt-3 overflow-ellipsis break-words truncate-4-lines h-28 border-t pt-3 text-gray-200">
        {description}
      </span>
    </div>
  </Link>
);
