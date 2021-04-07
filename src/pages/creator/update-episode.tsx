import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { EPISODE_FRAGMENT } from "../../fragments";
import {
  getEpisode,
  getEpisodeVariables,
} from "../../__type_graphql__/getEpisode";
import {
  updateEpisode,
  updateEpisodeVariables,
} from "../../__type_graphql__/updateEpisode";

const UPDATE_EPISODE_MUTATION = gql`
  mutation updateEpisode($input: UpdateEpisodeInput!) {
    updateEpisode(input: $input) {
      ok
      error
    }
  }
`;

const GET_EPISODE_QUERY = gql`
  query getEpisode($input: EpisodesSearchInput!) {
    getEpisode(input: $input) {
      ok
      error
      episode {
        ...EpisodeParts
      }
    }
  }
  ${EPISODE_FRAGMENT}
`;

interface IParams {
  podcastId: string;
  episodeId: string;
}

interface IForm {
  title: string;
  categoryName: string;
  description: string;
}

export const UpdateEpisode = () => {
  const { podcastId, episodeId } = useParams<IParams>();
  const history = useHistory();
  const onCompleted = (data: updateEpisode) => {
    const {
      updateEpisode: { ok },
    } = data;

    if (ok) {
      alert("Episode Edited! Check it now!");
      history.push("/");
    }
  };
  const { data: episodeData, loading: loadingQuery } = useQuery<
    getEpisode,
    getEpisodeVariables
  >(GET_EPISODE_QUERY, {
    variables: {
      input: {
        podcastId: +podcastId,
        episodeId: +episodeId,
      },
    },
  });

  const [updateEpisodeMutation, { loading, data }] = useMutation<
    updateEpisode,
    updateEpisodeVariables
  >(UPDATE_EPISODE_MUTATION, {
    onCompleted,
  });
  const { register, getValues, formState, handleSubmit } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      title: episodeData?.getEpisode.episode?.title,
      description: episodeData?.getEpisode.episode?.description,
      categoryName: episodeData?.getEpisode.episode?.category,
    },
  });
  const onSubmit = () => {
    const { title, categoryName, description } = getValues();
    updateEpisodeMutation({
      variables: {
        input: {
          podcastId: +podcastId,
          episodeId: +episodeId,
          ...(title !== "" && { title }),
          ...(categoryName !== "" && { category: categoryName }),
          ...(description !== "" && { description }),
        },
      },
    });
  };

  return (
    <div className="container flex flex-col items-center mt-">
      <Helmet>
        <title>Update Episode | Nuber Podcast</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Episode</h4>
      {!loading && (
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
