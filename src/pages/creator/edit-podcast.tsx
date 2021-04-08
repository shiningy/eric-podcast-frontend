import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import {
  myPodcast,
  myPodcastVariables,
} from "../../__type_graphql__/myPodcast";
import { updatePodcast, updatePodcastVariables } from "../../__type_graphql__/updatePodcast";
import { MY_PODCAST_QUERY } from "./my-podcast";

const UPDATE_PODCAST_MUTATION = gql`
  mutation updatePodcast($input: UpdatePodcastInput!) {
    updatePodcast(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  podcastId: string;
}

interface IForm {
  title: string;
  categoryName: string;
  description: string;
}

export const EditPodcast = () => {
  const { podcastId } = useParams<IParams>();
  const { data: podcastData, loading: loadingQuery } = useQuery<
    myPodcast,
    myPodcastVariables
  >(MY_PODCAST_QUERY, {
    variables: {
      input: {
        podcastId: +podcastId,
      },
    },
  });
  const history = useHistory();
  const onCompleted = (data: updatePodcast) => {
    const {
      updatePodcast: { ok },
    } = data;

    if (ok) {
      alert("Podcast Edited! Check it now!");
      history.push("/");
    }
  };
  const [updatePodcastMutation, { loading, data }] = useMutation<
    updatePodcast,
    updatePodcastVariables
  >(UPDATE_PODCAST_MUTATION, {
    onCompleted,
  });
  const { register, getValues, formState, handleSubmit } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      title: podcastData?.myPodcast.podcast?.title,
      description: podcastData?.myPodcast.podcast?.description,
      categoryName: podcastData?.myPodcast.podcast?.category?.name,
    },
  });
  const onSubmit = () => {
    const { title, categoryName, description } = getValues();
    updatePodcastMutation({
      variables: {
        input: {
          id: +podcastId,
          payload: {
            ...(title !== "" && { title }),
            ...(categoryName !== "" && { categoryName }),
            ...(description !== "" && { description }),
          },
        },
      },
    });
  };
  return (
    <div className="container flex flex-col items-center mt-">
      <Helmet>
        <title>Edit Podcast | Nuber Podcast</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Episode</h4>
      {!loadingQuery && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
        >
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Title"
            ref={register({ required: "Title is required." })}
          />
          <input
            className="input"
            type="text"
            name="categoryName"
            placeholder="Category Name"
            ref={register({ required: "Category Name is required." })}
          />
          <input
            className="input"
            type="text"
            name="description"
            placeholder="Description"
            ref={register({ required: "Description is required." })}
          />
          <Button
            loading={loading}
            canClick={formState.isValid}
            actionText="Edit Episode"
          />
        </form>
      )}
    </div>
  );
};
