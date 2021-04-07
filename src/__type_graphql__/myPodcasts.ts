/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myPodcasts
// ====================================================

export interface myPodcasts_myPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
}

export interface myPodcasts_myPodcasts_podcasts_creator {
  __typename: "User";
  identity: string;
}

export interface myPodcasts_myPodcasts_podcasts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  description: string;
}

export interface myPodcasts_myPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: myPodcasts_myPodcasts_podcasts_category | null;
  coverImg: string | null;
  description: string | null;
  rating: number;
  creator: myPodcasts_myPodcasts_podcasts_creator;
  episodes: myPodcasts_myPodcasts_podcasts_episodes[] | null;
}

export interface myPodcasts_myPodcasts {
  __typename: "MyPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: myPodcasts_myPodcasts_podcasts[] | null;
}

export interface myPodcasts {
  myPodcasts: myPodcasts_myPodcasts;
}
