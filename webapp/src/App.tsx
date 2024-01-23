import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Text,
  Container,
} from "@chakra-ui/react";
import { Fixture } from "./components/Fixture";
import { groupByDate } from "./groupByDate";
import {
  FixtureSummaryDto,
  FixturesDto,
} from "../../shared-types/fixtures-dto";
import FixturesList from "./routes/root";
import FixtureDetails from "./routes/fixture";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FixturesList />,
  },
  { path: "/fixture/:id", element: <FixtureDetails /> },
]);

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <RouterProvider router={router} />
        <div>
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
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
