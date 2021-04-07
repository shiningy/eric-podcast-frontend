/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EpisodesSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisode
// ====================================================

export interface getEpisode_getEpisode_episode {
  __typename: "Episode";
  id: number;
  title: string;
  description: string;
  category: string;
}

export interface getEpisode_getEpisode {
  __typename: "GetEpisodeOutput";
  ok: boolean;
  error: string | null;
  episode: getEpisode_getEpisode_episode | null;
}

export interface getEpisode {
  getEpisode: getEpisode_getEpisode;
}

export interface getEpisodeVariables {
  input: EpisodesSearchInput;
}
