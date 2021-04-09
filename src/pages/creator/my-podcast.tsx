import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { PODCAST_FRAGMENT, REVIEW_FRAGMENT } from "../../fragments";
import {
  deleteEpisode,
  deleteEpisodeVariables,
} from "../../__type_graphql__/deleteEpisode";
import {
  getEpisodes,
  getEpisodesVariables,
} from "../../__type_graphql__/getEpisodes";
import {
  subscribers,
  subscribersVariables,
} from "../../__type_graphql__/subscribers";
// import {
//   myPodcast,
//   myPodcastVariables,
// } from "../../__type_graphql__/myPodcast";
import { GET_EPISODES_QUERY } from "../listener/episodes";

const DELETE_EPISODE_MUTATION = gql`
  mutation deleteEpisode($input: EpisodesSearchInput!) {
    deleteEpisode(input: $input) {
      ok
      error
    }
  }
`;

const SUBSCRIBERS_QUERY = gql`
  query subscribers($input: PodcastInput!) {
    subscribers(input: $input) {
      ok
      error
      subscribers {
        id
        email
      }
    }
  }
`;

interface IParams {
  podcastId: string;
}

export const MyPodcast = () => {
  const { podcastId } = useParams<IParams>();
  // const { data } = useQuery<myPodcast, myPodcastVariables>(MY_PODCAST_QUERY, {
  //   variables: {
  //     input: {
  //       podcastId: +podcastId,
  //     },
  //   },
  // });
  const { data, loading: loadingQuery, error: errorQuery } = useQuery<
    getEpisodes,
    getEpisodesVariables
  >(GET_EPISODES_QUERY, {
    variables: {
      input: {
        id: +podcastId,
      },
    },
  });

  const { data: dataSubscribers, loading: loadingSubscribers } = useQuery<
    subscribers,
    subscribersVariables
  >(SUBSCRIBERS_QUERY, {
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
            episodeId: id,
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
          backgroundImage: `url(${data?.getPodcast.podcast?.coverImg})`,
        }}
      ></div>
      <div>
        <h2 className="mt-3">
          {data?.getPodcast.podcast?.title || "Loading..."}
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
          {data?.getPodcast.podcast?.episodes?.length === 0 ? (
            <h4>Please upload a episode!</h4>
          ) : null}
        </div>
        <div className="flex">
          <h4>Subscribers : </h4>

          <span>{dataSubscribers?.subscribers.subscribers?.length}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {data?.getPodcast.podcast?.episodes?.map((episode, index) => (
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
      <div className="mt-3">
        <h4>Reviews</h4>
        {data?.getReviews.reviews?.map((review) => (
          <div key={review.id}>
            <div>{review.creator.email}</div>
            <div>{review.title}</div>
            <div>{review.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
