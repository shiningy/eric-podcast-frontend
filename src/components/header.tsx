import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useMe } from "../hooks/useMe";
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
      <div className="w-full px-5 xl:px-0 mx-auto max-w-screen-xl flex justify-between">
        <h1 className="flex-none text-black-400 text-xl font-bold px-2 py-1 rounded-lg bg-red-100">
          <Link to="/">Nomad!</Link>
        </h1>
        <div className="w-1/2">
          <form
            onSubmit={handleSubmit(onSearchSubmit)}
            className="bg-gray-800 w-4/5 flex items-center justify-center"
          >
            <input
              ref={register({ required: true, min: 3 })}
              name="searchTerm"
              type="Search"
              className="flex-grow  focus:outline-none border-2 border-gray-400 p-1 rounded-md"
              placeholder="Search Podcasts..."
            />
          </form>
        </div>
        <Subscriptions to="/subscriptions" />
        <Feed to="/feeds" />
        <UserProfile to="/user-profile"/>
      </div>
    </header>
  );
};
