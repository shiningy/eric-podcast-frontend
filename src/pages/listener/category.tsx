import { gql } from '@apollo/client';
import React from 'react'
import { CATEGORY_FRAGMENT, PODCAST_FRAGMENT } from '../../fragments';

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      podcasts {
        ...PodcastParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const Category = () => {
  return <h1>Category</h1>
}