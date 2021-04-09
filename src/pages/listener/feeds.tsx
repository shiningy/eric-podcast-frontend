import { gql, useSubscription } from "@apollo/client";
import React from "react";
import { subscribePodcast } from "../../__type_graphql__/subscribePodcast";

const NEW_EPISODE_SUBSCRIPTION = gql`
  subscription subscribePodcast {
    subscribePodcast {
      title
      description
      podcast {
        id
        title
      }
    }
  }
`;

export const Feeds = () => {
  const { data, loading } = useSubscription<subscribePodcast>(
    NEW_EPISODE_SUBSCRIPTION
  );
  console.log(data?.subscribePodcast);
  return (
    <div>
      <h1>Feeds</h1>
      <span>{!loading && data?.subscribePodcast.title}</span>
    </div>
  );
};
