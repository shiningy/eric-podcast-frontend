import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Podcast } from "../../components/podcast";
import { PODCAST_FRAGMENT } from "../../fragments";
import {
  deletePodcast,
  deletePodcastVariables,
} from "../../__type_graphql__/deletePodcast";
import { myPodcasts } from "../../__type_graphql__/myPodcasts";
import { confirmAlert } from "react-confirm-alert"; // Import

const MY_PODCASTS_QUERY = gql`
  query myPodcasts {
    myPodcasts {
      ok
      error
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

const DELETE_PODCAST_MUTATION = gql`
  mutation deletePodcast($input: PodcastSearchInput!) {
    deletePodcast(input: $input) {
      ok
      error
    }
  }
`;

export const MyPodcasts = () => {
  const { data } = useQuery<myPodcasts>(MY_PODCASTS_QUERY);
  const [deletePodcastMutation, { data: deleteData, loading }] = useMutation<
    deletePodcast,
    deletePodcastVariables
  >(DELETE_PODCAST_MUTATION);
  const onDelete = (id: number) => {
    if (window.confirm("Are you sure you wish to delete this podcast?")) {
      deletePodcastMutation({
        variables: {
          input: {
            id,
          },
        },
      });
    }
  };

  const client = useApolloClient();
  useEffect(() => {
    setTimeout(() => {
      const queryResult = client.readQuery({ query: MY_PODCASTS_QUERY });
      console.log(queryResult);
      client.writeQuery({
        query: MY_PODCASTS_QUERY,
        data: {
          ...queryResult,
          podcasts: [1, 2, 3, 4],
        },
      });
    }, 8000);
  }, []);
  return (
    <div>
      <Helmet>
        <title>My Podcasts | Nuber Podcast</title>
      </Helmet>
      <div>
        <h2 className="mb-3">My Podcasts</h2>
        <Link
          className="mr-8 text-white bg-gray-800 py-3 px-10"
          to="/add-podcast"
        >
          Create One &rarr;
        </Link>
        {data?.myPodcasts.ok && data?.myPodcasts.podcasts?.length === 0 ? (
          <div className="mt-8">
            <h4>You have no podcasts...</h4>
          </div>
        ) : (
          <div className="grid mt-8 md:grid-cols-3 gap-x-5 gap-y-10 bg-gray-800">
            {data?.myPodcasts.podcasts?.map((podcast) => (
              <div key={podcast.id}>
                <Podcast
                  key={podcast.id}
                  id={podcast.id + ""}
                  title={podcast.title}
                  coverImg={podcast.coverImg}
                  creator={podcast.creator.identity}
                  description={podcast.description}
                  category={podcast.category?.name}
                />

                <button
                  onClick={() => {
                    onDelete(podcast.id);
                  }}
                  className="focus:outline-none font-medium text-2xl mr-8 text-white bg-red-800 py-3 px-10"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
