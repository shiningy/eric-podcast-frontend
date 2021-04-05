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

const ListenerRoutes = [
  <Route key={1} path="/" exact>
    <Podcasts />
  </Route>,
  <Route key={2} path="/podcasts/:id">
    <Episodes />
  </Route>,
];

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
