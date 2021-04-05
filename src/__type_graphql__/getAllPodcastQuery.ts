/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllPodcastQuery
// ====================================================

export interface getAllPodcastQuery_allCategories_categories_podcasts {
  __typename: "Podcast";
  title: string;
}

export interface getAllPodcastQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  podcastCount: number;
  podcasts: getAllPodcastQuery_allCategories_categories_podcasts[] | null;
}

export interface getAllPodcastQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: getAllPodcastQuery_allCategories_categories[] | null;
}

export interface getAllPodcastQuery_getAllPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
}

export interface getAllPodcastQuery_getAllPodcasts_podcasts_creator {
  __typename: "User";
  identity: string | null;
}

export interface getAllPodcastQuery_getAllPodcasts_podcasts_episodes {
  __typename: "Episode";
  title: string;
  description: string | null;
}

export interface getAllPodcastQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: getAllPodcastQuery_getAllPodcasts_podcasts_category | null;
  coverImg: string | null;
  description: string | null;
  rating: number;
  creator: getAllPodcastQuery_getAllPodcasts_podcasts_creator;
  episodes: getAllPodcastQuery_getAllPodcasts_podcasts_episodes[] | null;
}

export interface getAllPodcastQuery_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: getAllPodcastQuery_getAllPodcasts_podcasts[] | null;
}

export interface getAllPodcastQuery {
  allCategories: getAllPodcastQuery_allCategories;
  getAllPodcasts: getAllPodcastQuery_getAllPodcasts;
}
