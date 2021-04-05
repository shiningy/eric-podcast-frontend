import { gql } from "@apollo/client";

export const PODCAST_FRAGMENT = gql`
  fragment PodcastParts on Podcast {
    id
    title
    category {
      name
    }
    coverImg
    description
    rating
    creator {
      identity
    }
    episodes {
      title
      description
    }
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryParts on Category {
    id
    name
    coverImg
    slug
    podcastCount
    podcasts {
      title
    }
  }
`;
