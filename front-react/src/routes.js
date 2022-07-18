import News from "./layout/news";
import Login from "./layout/auth/sign-in";
import SignUp from "./layout/auth/sign-up";
import SignOut from "./layout/auth/sign-out";

const routes = [
  {
    key: "news",
    route: "/news",
    element: <News />,
  },
  {
    key: "sign-in",
    route: "/sign-in",
    element: <Login />,
  },
  {
    key: "sign-up",
    route: "/sign-up",
    element: <SignUp />,
  },
  {
    key: "log-out",
    route: "/log-out",
    element: <SignOut />,
  },
];

export default routes;
