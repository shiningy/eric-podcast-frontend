import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { PODCAST_FRAGMENT, REVIEW_FRAGMENT } from "../../fragments";
import {
  createReview,
  createReviewVariables,
} from "../../__type_graphql__/createReview";
import {
  getEpisodes,
  getEpisodesVariables,
  getEpisodes_getPodcast_podcast,
} from "../../__type_graphql__/getEpisodes";
import {
  toggleSubscribe,
  toggleSubscribeVariables,
} from "../../__type_graphql__/toggleSubscribe";

export const GET_EPISODES_QUERY = gql`
  query getEpisodes($input: PodcastSearchInput!) {
    getPodcast(input: $input) {
      ok
      error
      podcast {
        ...PodcastParts
      }
    }
    getEpisodes(input: $input) {
      ok
      error
      episodes {
        title
        description
      }
    }
    getReviews(input: $input) {
      ok
      error
      reviews {
        ...ReviewParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
  ${REVIEW_FRAGMENT}
`;

const CREATE_REVIEW_MUTATION = gql`
  mutation createReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      ok
      error
      id
    }
  }
`;

export const TOGGLE_SUBSCRIBE = gql`
  mutation toggleSubscribe($input: ToggleSubscribeInput!) {
    toggleSubscribe(input: $input) {
      ok
      error
    }
  }
`;

interface IEpisodeParams {
  id: string;
}

interface IFormProps {
  title: string;
  text: string;
}

export const Episodes = () => {
  const params = useParams<IEpisodeParams>();
  const { data, loading, error } = useQuery<getEpisodes, getEpisodesVariables>(
    GET_EPISODES_QUERY,
    {
      variables: {
        input: {
          id: +params.id,
        },
      },
    }
  );
  const onCompleted = (data: createReview) => {
    const {
      createReview: { ok },
    } = data;

    // if (ok) {
    //   alert("Podcast Created! Check it now!");
    // }
  };
  const [
    createReviewMutation,
    { loading: loadingReview, data: dataReview },
  ] = useMutation<createReview, createReviewVariables>(CREATE_REVIEW_MUTATION, {
    onCompleted,
  });
  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: "onChange",
  });
  const onSubmit = () => {
    const { title, text } = getValues();
    if (window.confirm("Are you sure you review this content?")) {
      createReviewMutation({
        variables: {
          input: {
            title,
            text,
            podcastId: +params.id,
          },
        },
      });
    }
  };
  const [toggleSubscrition] = useMutation<
    toggleSubscribe,
    toggleSubscribeVariables
  >(TOGGLE_SUBSCRIBE);

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Helmet>
          <title>Episode List | Nuber-podcasts</title>
        </Helmet>
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <div className="w-full px-5 xl:px-0 mx-auto max-w-screen-xl">
      <Helmet>
        <title>Episode List | Nuber-podcasts</title>
      </Helmet>
      <div className="flex justify-center my-8">
        <div className="flex flex-col justify-center px-3 md:px-12 w-3/4">
          <h1 className="text-blue-400 font-semibold text-3xl">
            {data?.getPodcast.podcast?.title}
          </h1>
          <h2 className="py-3 text-md font-light">
            {data?.getPodcast.podcast?.description}
          </h2>
        </div>
        <div>
          <label className="flex items-center relative w-max cursor-pointer select-none">
            <span className="text-lg font-bold mr-3">Toggle</span>
            <input
              type="checkbox"
              className="toggle-checkbox appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500"
            />
            <span className="absolute font-medium text-xs uppercase right-1 text-white">
              {" "}
              OFF{" "}
            </span>
            <span className="absolute font-medium text-xs uppercase right-8 text-white">
              {" "}
              ON{" "}
            </span>
            <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" />
          </label>
        </div>
        <div className="pr-10 group">
          <button
            onClick={() =>
              toggleSubscrition({
                variables: {
                  input: { podcastId: +params.id },
                },
              })
            }
          >
            <svg
              className="w-12 hover:text-blue-400 transition-colors cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"
              />
            </svg>
          </button>
        </div>
        <div
          style={{
            backgroundImage: `url(${data?.getPodcast.podcast?.coverImg})`,
          }}
          className="flex-none bg-cover w-32 h-32 md:w-48 md:h-48 rounded-md"
        ></div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {data?.getEpisodes.episodes?.map((episode, index) => (
          <div
            key={index}
            className="w-full border-2 border-blue-400 rounded-lg px-4 md:px-16 py-3 flex justify-between items-center"
          >
            <div className="mr-2 md:mr-8">
              <h2 className="font-semibold font-lg">{episode.title}</h2>
              <h3 className="font-md"> - {episode.description}</h3>
            </div>
            <Link to={""}></Link>
            <div>
              <svg
                className="w-12 hover:text-blue-400 transition-colors cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <form
          className="mx-auto w-full rounded-xl flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-gray-800 font-medium text-xl mb-4">
            Write Your Review!
          </p>
          <input
            className="input focus:bg-gray-50 border border-gray-300 p-3 mb-4 outline-none"
            type="text"
            name="title"
            placeholder="Title"
            ref={register({ required: "Title is required." })}
          />
          <input
            className="input focus:bg-gray-50 sec p-3 border border-gray-300 outline-none mb-4"
            type="textarea"
            name="text"
            placeholder="text..."
            ref={register({ required: "Review is required." })}
          />
          <Button
            loading={loading}
            canClick={formState.isValid}
            actionText="Review Confirm"
          />
        </form>
        <div className="grid grid-cols-1 gap-3 my-3">
          <h4 className="font-bold text-2xl">Reviews</h4>

          {data?.getReviews.reviews?.map((review) => (
            <div
              className="w-full border-2 border-green-400 rounded-lg px-4 md:px-16 py-3 flex justify-between items-center"
              key={review.id}
            >
              <div className="mr-2 md:mr-8">
                <div className="font-semibold text-lg mb-1">
                  {review.creator.email}
                </div>
                <div className="font-semibold font-lg mb-1">{review.title}</div>
                <div className="font-md italic">{review.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
