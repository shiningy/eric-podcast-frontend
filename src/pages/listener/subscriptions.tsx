import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { Podcast } from "../../components/podcast";
import { subscriptionsQuery } from "../../__type_graphql__/subscriptionsQuery";

const SUBSCRIPTIONS_QUERY = gql`
  query subscriptionsQuery {
    subscriptions {
      title
      description
      category {
        name
      }
      rating
      id
      coverImg
    }
  }
`;

export const Subscriptions = () => {
  const { data, loading } = useQuery<subscriptionsQuery>(SUBSCRIPTIONS_QUERY);
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>Subscriptions | Nuber-podcasts</title>
      </Helmet>
      <div>
        Subscriptions
      </div>
      {!loading && (
        <div>
          <div className="w-full bg-gray-900 px-5 sm:px-10 mx-auto  grid md:grid-cols-2 xl:grid-cols-4 gap-7 pt-5">
            {data?.subscriptions?.map((podcast) => (
              <Podcast
                key={podcast.id}
                id={podcast.id + ""}
                title={podcast.title}
                coverImg={podcast.coverImg}
                creator={""}
                description={podcast.description}
                category={podcast.category?.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
