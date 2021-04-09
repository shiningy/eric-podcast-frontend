import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Podcast } from "../../components/podcast";
import { PODCAST_FRAGMENT } from "../../fragments";
import {
  deletePodcast,
  deletePodcastVariables,
} from "../../__type_graphql__/deletePodcast";
import { myPodcasts } from "../../__type_graphql__/myPodcasts";
import { confirmAlert } from "react-confirm-alert"; // Import
import { Sidebar } from "../../components/sidebar";

export const MY_PODCASTS_QUERY = gql`
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

  // const client = useApolloClient();
  // useEffect(() => {
  //   setTimeout(() => {
  //     const queryResult = client.readQuery({ query: MY_PODCASTS_QUERY });
  //     console.log(queryResult);
  //     client.writeQuery({
  //       query: MY_PODCASTS_QUERY,
  //       data: {
  //         ...queryResult,
  //         podcasts: [1, 2, 3, 4],
  //       },
  //     });
  //   }, 8000);
  // }, []);
  return (
    <div>
      <Helmet>
        <title>My Podcasts | Nuber Podcast</title>
      </Helmet>
      <div className="flex h-screen w-screen">
        <div>
          <Sidebar identity="Creator Identity" />
        </div>
        <div>
          <h2 className="m-6 text-2xl">My Podcasts</h2>
          <div>
            <Link
              className="ml-6 text-white bg-green-700 py-3 px-10 hover:bg-green-500 rounded-lg"
              to="/add-podcast"
            >
              Create New Podcast &rarr;
            </Link>
          </div>
          <div className="flex flex-col m-6">
            {data?.myPodcasts.ok && data?.myPodcasts.podcasts?.length === 0 ? (
              <div className="mt-8">
                <h4>You have no podcasts...</h4>
              </div>
            ) : (
              <table className="table-auto sm:w-full items-center justify-center">
                <thead>
                  <tr>
                    <th className="w-14">ID</th>
                    <th className="w-14">Thumbnail</th>
                    <th className="w-14">Title</th>
                    <th className="w-14">Author</th>
                    <th className="w-14">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.myPodcasts.podcasts?.map((podcast) => (
                    <tr>
                      <td>{podcast.id}</td>
                      <td>
                        <Link
                          className="group"
                          key={podcast.id}
                          to={`/podcasts/${podcast.id}`}
                        >
                          <div
                            style={{
                              backgroundImage: `url(${podcast.coverImg})`,
                            }}
                            className="flex-none bg-cover w-20 h-20 rounded-md"
                          ></div>
                        </Link>
                      </td>
                      <td>{podcast.title}</td>
                      <td>{podcast.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              // <div className="mt-8 gap-x-5 gap-y-10 bg-gray-100">
              //   {data?.myPodcasts.podcasts?.map((podcast) => (
              //     <div className="m-2">
              // <Link
              //   className="flex items-center group"
              //   key={podcast.id}
              //   to={`/podcasts/${podcast.id}`}
              // >
              //         <div
              //           style={{
              //             backgroundImage: `url(${podcast.coverImg})`,
              //           }}
              //           className="flex-none bg-cover w-20 h-20 rounded-md"
              //         ></div>
              //         <div className="flex-grow">{podcast.title}</div>
              //         <div className="flex-grow">{podcast.category?.name}</div>
              //         <button
              //           onClick={() => {
              //             onDelete(podcast.id);
              //           }}
              //           className="flex-none focus:outline-none font-medium text-2xl mr-8 text-white bg-red-800 py-3 px-5 items-center rounded-lg"
              //         >
              //           <svg
              //             className="w-6"
              //             xmlns="http://www.w3.org/2000/svg"
              //             fill="none"
              //             viewBox="0 0 20 20"
              //             stroke="currentColor"
              //           >
              //             <path
              //               fill="none"
              //               d="M16.588,3.411h-4.466c0.042-0.116,0.074-0.236,0.074-0.366c0-0.606-0.492-1.098-1.099-1.098H8.901c-0.607,0-1.098,0.492-1.098,1.098c0,0.13,0.033,0.25,0.074,0.366H3.41c-0.606,0-1.098,0.492-1.098,1.098c0,0.607,0.492,1.098,1.098,1.098h0.366V16.59c0,0.808,0.655,1.464,1.464,1.464h9.517c0.809,0,1.466-0.656,1.466-1.464V5.607h0.364c0.607,0,1.1-0.491,1.1-1.098C17.688,3.903,17.195,3.411,16.588,3.411z M8.901,2.679h2.196c0.202,0,0.366,0.164,0.366,0.366S11.3,3.411,11.098,3.411H8.901c-0.203,0-0.366-0.164-0.366-0.366S8.699,2.679,8.901,2.679z M15.491,16.59c0,0.405-0.329,0.731-0.733,0.731H5.241c-0.404,0-0.732-0.326-0.732-0.731V5.607h10.983V16.59z M16.588,4.875H3.41c-0.203,0-0.366-0.164-0.366-0.366S3.208,4.143,3.41,4.143h13.178c0.202,0,0.367,0.164,0.367,0.366S16.79,4.875,16.588,4.875zM6.705,14.027h6.589c0.202,0,0.366-0.164,0.366-0.366s-0.164-0.367-0.366-0.367H6.705c-0.203,0-0.366,0.165-0.366,0.367S6.502,14.027,6.705,14.027z M6.705,11.83h6.589c0.202,0,0.366-0.164,0.366-0.365c0-0.203-0.164-0.367-0.366-0.367H6.705c-0.203,0-0.366,0.164-0.366,0.367C6.339,11.666,6.502,11.83,6.705,11.83z M6.705,9.634h6.589c0.202,0,0.366-0.164,0.366-0.366c0-0.202-0.164-0.366-0.366-0.366H6.705c-0.203,0-0.366,0.164-0.366,0.366C6.339,9.47,6.502,9.634,6.705,9.634z"
              //             ></path>
              //           </svg>
              //         </button>
              //       </Link>
              //     </div>
              //   ))}
              // </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
