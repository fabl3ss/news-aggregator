import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import routes from "./routes";
import NotFound from "./layout/not-found";

function App() {
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            key={route.key}
            element={route.element}
          />
        );
      }

      return null;
    });

  return (
    <div className="App">
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
