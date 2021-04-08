import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { PODCAST_FRAGMENT } from "../../fragments";
import {
  deleteEpisode,
  deleteEpisodeVariables,
} from "../../__type_graphql__/deleteEpisode";
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

const DELETE_EPISODE_MUTATION = gql`
  mutation deleteEpisode($input: EpisodesSearchInput!) {
    deleteEpisode(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  podcastId: string;
}

export const MyPodcast = () => {
  const { podcastId } = useParams<IParams>();
  const { data } = useQuery<myPodcast, myPodcastVariables>(MY_PODCAST_QUERY, {
    variables: {
      input: {
        podcastId: +podcastId,
      },
    },
  });
  const [deleteEpisodeMutation, { data: deleteData, loading }] = useMutation<
    deleteEpisode,
    deleteEpisodeVariables
  >(DELETE_EPISODE_MUTATION);
  const onDelete = (id: number) => {
    if (window.confirm("Are you sure you wish to delete this podcast?")) {
      deleteEpisodeMutation({
        variables: {
          input: {
            podcastId: +podcastId,
            episodeId: id
          },
        },
      });
    }
  };
  return (
    <div>
      <div
        className="bg-gray-700 py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myPodcast.podcast?.coverImg})`,
        }}
      ></div>
      <div>
        <h2 className="mt-3">
          {data?.myPodcast.podcast?.title || "Loading..."}
        </h2>
        <div className="mt-5">
          <Link
            to={`/podcasts/${podcastId}/edit-podcast`}
            className="mr-8 text-white bg-gray-800 py-3 px-10"
          >
            Edit Podcast &rarr;
          </Link>
          <Link
            to={`/podcasts/${podcastId}/add-episode`}
            className="mr-8 text-white bg-gray-800 py-3 px-10"
          >
            Add Episode &rarr;
          </Link>
        </div>
        <div className="mt-10">
          {data?.myPodcast.podcast?.episodes?.length === 0 ? (
            <h4>Please upload a episode!</h4>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {data?.myPodcast.podcast?.episodes?.map((episode, index) => (
          <div
            key={index}
            className="w-full border-2 border-blue-400 rounded-lg px-4 md:px-16 py-3 flex justify-between items-center"
          >
            <div className="mr-2 md:mr-8">
              <h2 className="font-semibold font-lg">{episode.title}</h2>
              <h3 className="font-md"> - {episode.description}</h3>
            </div>
            <Link
              to={`/episodes/${podcastId}/${episode.id}/update-episode`}
              className="input"
            >
              edit
            </Link>
            <button
              onClick={() => {
                onDelete(episode.id);
              }}
              className="input"
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
