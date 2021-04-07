import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { PODCAST_FRAGMENT } from "../../fragments";
import {
  myPodcast,
  myPodcastVariables,
} from "../../__type_graphql__/myPodcast";

export const MY_PODCAST_QUERY = gql`
  query myPodcast($input: PodcastInput!) {
    myPodcast(input: $input) {
      ok
      error
      podcast {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const MyPodcast = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myPodcast, myPodcastVariables>(MY_PODCAST_QUERY, {
    variables: {
      input: {
        podcastId: +id,
      },
    },
  });
  
  console.log(data);
  return (
    <div>
      <div
        className="bg-gray-700 py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myPodcast.podcast?.coverImg})`
        }}
      ></div>
      <div>
        <h2>
          {data?.myPodcast.podcast?.title || "Loading..."}
        </h2>
        <Link to={`/podcasts/${id}/add-episode`} className="mr-8 text-white bg-gray-800 py-3 px-10">
          Add Episode &rarr;
        </Link>
        <div className="mt-10">
          {data?.myPodcast.podcast?.episodes?.length === 0 ? (
            <h4>Please upload a episode!</h4>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {data?.myPodcast.podcast?.episodes?.map((episode, index) => (
          <div key={index} className="w-full border-2 border-blue-400 rounded-lg px-4 md:px-16 py-3 flex justify-between items-center">
            <div className="mr-2 md:mr-8">
              <h2 className="font-semibold font-lg">{episode.title}</h2>
              <h3 className="font-md"> - {episode.description}</h3>
            </div>
            <Link to={`/episodes/${id}/${episode.id}/update-episode`} className="input">
              edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
};
