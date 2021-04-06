import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Podcast } from "../../components/podcast";
import { CATEGORY_FRAGMENT, PODCAST_FRAGMENT } from "../../fragments";
import { category, categoryVariables } from "../../__type_graphql__/category";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

interface IFormProps {
  searchTerm: string;
}

export const Category = () => {
  const [page, setPage] = useState(1);
  const params = useParams<ICategoryParams>();
  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page,
          slug: params.slug,
        },
      },
    }
  );
  console.log(data);
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };

  return (
    <div className="bg-gray-900">
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.category?.podcasts?.map((podcast) => (
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
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.category.totalPages}
            </span>
            {page !== data?.category.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
function getValues(): { searchTerm: any } {
  throw new Error("Function not implemented.");
}
