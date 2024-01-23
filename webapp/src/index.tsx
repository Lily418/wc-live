import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FixtureDetails from "./routes/fixture";
import { ChakraProvider } from "@chakra-ui/react";
import Live from "./routes/live";
import Fixtures from "./routes/fixtures";
import Results from "./routes/results";
import Root from "./routes/root";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const fixturesLoader = async () => {
  const fixtures = await fetch("http://127.0.0.1:3333/fixtures");
  const result = await fixtures.json();
  return result;
};

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    loader: fixturesLoader,
    children: [
      {
        index: true,
        path: "/",
        element: <Live />,
      },
      {
        path: "/fixtures",
        element: <Fixtures />,
      },
      {
        path: "/results",
        element: <Results />,
      },
    ],
  },

  {
    path: "/fixture/:id",
    element: <FixtureDetails />,
    loader: async ({ params }) => {
      const fixtures = await fetch(
        `http://127.0.0.1:3333/fixtures/${params.id}`
      );
      const result = await fixtures.json();
      return result;
    },
  },
]);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
      <p
        style={{
          padding: "20px",
          textAlign: "center",
          fontSize: "12px",
          color: "gray",
        }}
      >
        icons by <a href="https://icons8.com/">icons8.com</a>
      </p>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
