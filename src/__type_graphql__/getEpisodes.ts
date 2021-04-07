/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodes
// ====================================================

export interface getEpisodes_getPodcast_podcast_category {
  __typename: "Category";
  name: string;
}

export interface getEpisodes_getPodcast_podcast_creator {
  __typename: "User";
  identity: string;
}

export interface getEpisodes_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  description: string;
}

export interface getEpisodes_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: getEpisodes_getPodcast_podcast_category | null;
  coverImg: string | null;
  description: string | null;
  rating: number;
  creator: getEpisodes_getPodcast_podcast_creator;
  episodes: getEpisodes_getPodcast_podcast_episodes[] | null;
}

export interface getEpisodes_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: getEpisodes_getPodcast_podcast | null;
}

export interface getEpisodes_getEpisodes_episodes {
  __typename: "Podcast";
  title: string;
  description: string | null;
}

export interface getEpisodes_getEpisodes {
  __typename: "EpisodesOutput";
  ok: boolean;
  error: string | null;
  episodes: getEpisodes_getEpisodes_episodes[] | null;
}

export interface getEpisodes {
  getPodcast: getEpisodes_getPodcast;
  getEpisodes: getEpisodes_getEpisodes;
}

export interface getEpisodesVariables {
  input: PodcastSearchInput;
}
