import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/button";
import {
  createPodcast,
  createPodcastVariables,
} from "../../__type_graphql__/createPodcast";

const CREATE_PODCAST_MUTATION = gql`
  mutation createPodcast($input: CreatePodcastInput!) {
    createPodcast(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  title: string;
  coverImg: string;
  categoryName: string;
  description: string;
}

export const AddPodcast = () => {
  const onCompleted = (data: createPodcast) => {
    const {
      createPodcast: { ok },
    } = data;

    if (ok) {
      alert("Podcast Created! Check it now!");
      history.push("/");
    }
  };
  const [createPodcastMutation, { loading, data }] = useMutation<
    createPodcast,
    createPodcastVariables
  >(CREATE_PODCAST_MUTATION, {
    onCompleted,
  });
  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: "onChange",
  });
  const history = useHistory();
  const onSubmit = () => {
    const { title, coverImg, categoryName, description } = getValues();
    createPodcastMutation({
      variables: {
        input: {
          title,
          coverImg,
          categoryName,
          description,
        },
      },
    });
  };
  return (
    <div className="container">
      <Helmet>
        <title>Add Podcast | Nuber Podcast</title>
      </Helmet>
      <h1>Add Podcast</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          name="coverImg"
          placeholder="Cover Image..."
          ref={register({ required: "Cover image is required." })}
        />
        <input
          className="input"
          type="text"
          name="categoryName"
          placeholder="Category Name"
          ref={register({ required: "Category name is required." })}
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
          actionText="Create Podcast"
        />
      </form>
    </div>
  );
};
