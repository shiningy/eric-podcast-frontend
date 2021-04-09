import { isLoggedInVar } from "../apollo";
import { LS_TOKEN } from "../constants";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Podcasts } from "../pages/listener/podcasts";
import { NotFound } from "../404";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { Episodes } from "../pages/listener/episodes";
import { Search } from "../pages/listener/search";
import { Podcast } from "../pages/listener/podcast";
import { Category } from "../pages/listener/category";
import { EditProfile } from "../pages/edit-profile";
import { MyPodcasts } from "../pages/creator/my-podcasts";
import { UserProfile } from "../pages/user-profile";
import { Subscriptions } from "../pages/listener/subscriptions";
import { AddPodcast } from "../pages/creator/add-podcasts";
import { MyPodcast } from "../pages/creator/my-podcast";
import { AddEpisode } from "../pages/creator/add-episode";
import { EditPodcast } from "../pages/creator/edit-podcast";
import { UpdateEpisode } from "../pages/creator/update-episode";
import { Feeds } from "../pages/listener/feeds";
import { Dashboard } from "../pages/creator/dashboard";

const listenerRoutes = [
  {
    path: "/",
    component: <Podcasts />,
  },
  {
    path: "/search",
    component: <Search />,
  },
  {
    path: "/category/:slug",
    component: <Category />,
  },
  {
    path: "/podcasts/:id",
    component: <Episodes />,
  },
  {
    path: "/subscriptions",
    component: <Subscriptions />,
  },
  {
    path: "/feeds",
    component: <Feeds />,
  }
];

const commonRoutes = [
  {
    path: "/user-profile",
    component: <UserProfile />,
  },
  {
    path: "/edit-profile",
    component: <EditProfile />,
  },
];

const creatorRoutes = [
  {
    path: "/",
    component: <MyPodcasts />,
  },
  {
    path: "/add-podcast",
    component: <AddPodcast />,
  },
  {
    path: "/podcasts/:podcastId",
    component: <MyPodcast />,
  },
  {
    path: "/podcasts/:podcastId/edit-podcast",
    component: <EditPodcast />,
  },
  {
    path: "/podcasts/:podcastId/add-episode", 
    component: <AddEpisode />,
  },
  {
    path: "/episodes/:podcastId/:episodeId/update-episode",
    component: <UpdateEpisode />
  }
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  console.log(data.me.role);
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Listener" &&
          listenerRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === "Host" &&
          creatorRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {commonRoutes.map((route) => (
          <Route exact key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
