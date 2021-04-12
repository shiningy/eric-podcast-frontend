import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { UserRole } from "../__type_graphql__/globalTypes";
import { Feed } from "./feed";
import { Subscriptions } from "./subscriptions";
import { UserProfile } from "./user-profile";
interface IFormProps {
  searchTerm: string;
}

export const Header: React.FC = () => {
  const { data } = useMe();
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };

  return (
    <header className="py-4 bg-gray-900">
      <div className="w-full h-10 px-5 xl:px-0 mx-auto max-w-screen-xl flex justify-between">
        <h1 className="flex-none text-gray-200 border-2 border-white text-xl font-semibold px-2 py-1 rounded-lg">
          <Link to="/">Eric's Podcast!</Link>
        </h1>
        <form
          onSubmit={handleSubmit(onSearchSubmit)}
          className="w-full mx-4"
        >
          <input
            ref={register({ required: true, min: 3 })}
            name="searchTerm"
            type="Search"
            className="bg-gray-100 w-full text-2xl focus:outline-none p-1 rounded-md"
            placeholder=" Search Podcasts..."
          />
        </form>
        {data?.me.role !== UserRole.Host ? (
          <div className="flex">
            <Subscriptions to="/subscriptions" />
            <Feed to="/feeds" />
            <UserProfile to="/user-profile" />
          </div>
        ) : (
          <UserProfile to="/user-profile" />
        )}
      </div>
    </header>
  );
};
