/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myPodcast
// ====================================================

export interface myPodcast_myPodcast_podcast_category {
  __typename: "Category";
  name: string;
}

export interface myPodcast_myPodcast_podcast_creator {
  __typename: "User";
  identity: string;
}

export interface myPodcast_myPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  description: string;
}

export interface myPodcast_myPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: myPodcast_myPodcast_podcast_category | null;
  coverImg: string | null;
  description: string | null;
  rating: number;
  creator: myPodcast_myPodcast_podcast_creator;
  episodes: myPodcast_myPodcast_podcast_episodes[] | null;
}

export interface myPodcast_myPodcast {
  __typename: "MyPodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: myPodcast_myPodcast_podcast | null;
}

export interface myPodcast {
  myPodcast: myPodcast_myPodcast;
}

export interface myPodcastVariables {
  input: PodcastInput;
}
