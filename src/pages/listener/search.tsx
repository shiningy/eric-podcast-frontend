import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Podcast } from "../../components/podcast";
import { PODCAST_FRAGMENT } from "../../fragments";
import {
  searchPodcasts,
  searchPodcastsVariables,
} from "../../__type_graphql__/searchPodcasts";

const SEARCH_PODCAST = gql`
  query searchPodcasts($input: SearchPodcastsInput!) {
    searchPodcasts(input: $input) {
      ok
      error
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();

  const [callQuery, { loading, data, called }] = useLazyQuery<
    searchPodcasts,
    searchPodcastsVariables
  >(SEARCH_PODCAST);
  useEffect(() => {
    const [_, query] = location.search.split("?term=");
    if (!query) {
      return history.replace("/");
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location]);
  console.log(loading, data?.searchPodcasts?.podcasts, called);
  // callQuery();
  return (
    <div>
      {!loading && (
        <div>
          <div>
            Search Results
          </div>
          <div className="w-full bg-gray-900 px-5 sm:px-10 mx-auto  grid md:grid-cols-2 xl:grid-cols-4 gap-7 pt-5">
            {data?.searchPodcasts.podcasts?.map((podcast) => (
              <Podcast
                key={podcast.id}
                id={podcast.id + ""}
                title={podcast.title}
                coverImg={podcast.coverImg}
                creator={podcast.creator.identity}
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
