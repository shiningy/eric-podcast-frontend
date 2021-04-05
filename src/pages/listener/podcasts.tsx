import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Podcast } from "../../components/podcast";
import { CATEGORY_FRAGMENT, PODCAST_FRAGMENT } from "../../fragments";
import { getAllPodcastQuery } from "../../__type_graphql__/getAllPodcastQuery";

export const ALLPODCASTS_QUERY = gql`
  query getAllPodcastQuery {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    getAllPodcasts {
      ok
      error
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;
interface IFormProps {
  searchTerm: string;
}

export const Podcasts = () => {
  const { data, loading } = useQuery<getAllPodcastQuery>(ALLPODCASTS_QUERY);
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>Home | Nuber-podcasts</title>
      </Helmet>
      {!loading && (
        <div>
          <div className="flex justify-around max-w-ms mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`}>
                <div className="flex flex-col group items-center cursor-pointer py-3">
                  <div
                    className="w-10 h-10 bg-cover group-hover:bg-gray-100"
                    style={{ backgroundImage: `url(${category.coverImg})` }}
                  ></div>
                  {/* <span className="mt-1 text-sm text-center font-medium">
                    {category.name}
                  </span> */}
                </div>
              </Link>
            ))}
          </div>
          <div className="w-full bg-gray-900 px-5 sm:px-10 mx-auto  grid md:grid-cols-2 xl:grid-cols-4 gap-7 pt-5">
            {data?.getAllPodcasts.podcasts?.map((podcast) => (
              <Podcast
                key={podcast.id}
                id={podcast.id + ""}
                title={podcast.title}
                coverImg={podcast.coverImg}
                creator={podcast.creator.identity}
                description={podcast.description}
                category={podcast.category?.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
