/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: category
// ====================================================

export interface category_category_podcasts_category {
  __typename: "Category";
  name: string;
}

export interface category_category_podcasts_creator {
  __typename: "User";
  identity: string | null;
}

export interface category_category_podcasts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  description: string;
}

export interface category_category_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: category_category_podcasts_category | null;
  coverImg: string | null;
  description: string;
  rating: number;
  creator: category_category_podcasts_creator;
  episodes: category_category_podcasts_episodes[] | null;
}

export interface category_category {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  podcasts: category_category_podcasts[] | null;
}

export interface category {
  category: category_category;
}

export interface categoryVariables {
  input: CategoryInput;
}
