import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import {
  createEpisode,
  createEpisodeVariables,
} from "../../__type_graphql__/createEpisode";
import { MY_PODCAST_QUERY } from "./my-podcast";

const CREATE_EPISODE_MUTATION = gql`
  mutation createEpisode($input: CreateEpisodeInput!) {
    createEpisode(input: $input) {
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

export const AddEpisode = () => {
  const { podcastId } = useParams<IParams>();
  const history = useHistory();
  const onCompleted = (data: createEpisode) => {
    const {
      createEpisode: { ok },
    } = data;
    console.log(data);
    if (ok) {
      alert("Episode Created! Check it now!");
      history.goBack();
    }
  };
  const [createEpisodeMutation, { loading }] = useMutation<
    createEpisode,
    createEpisodeVariables
  >(CREATE_EPISODE_MUTATION, {
    // refetchQueries: [
    //   {
    //     query: MY_PODCAST_QUERY,
    //     variables: {
    //       input: {
    //         id: +podcastId,
    //       },
    //     },
    //   },
    // ],
    onCompleted,
  });
  const { register, handleSubmit, formState, getValues } = useForm<IForm>({
    mode: "onChange",
  });
  const onSubmit = () => {
    const { title, categoryName, description } = getValues();
    console.log(title, categoryName, description, podcastId);
    createEpisodeMutation({
      variables: {
        input: {
          title,
          categoryName,
          description,
          podcastId: +podcastId,
        },
      },
    });
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Episode | Nuber Podcast</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Add Episode</h4>
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
          actionText="Create Episode"
        />
      </form>
    </div>
  );
};
