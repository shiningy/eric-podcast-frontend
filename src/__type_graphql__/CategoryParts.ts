/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CategoryParts
// ====================================================

export interface CategoryParts_podcasts {
  __typename: "Podcast";
  title: string;
}

export interface CategoryParts {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  podcastCount: number;
  podcasts: CategoryParts_podcasts[] | null;
}
