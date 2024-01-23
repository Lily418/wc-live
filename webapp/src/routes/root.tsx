import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();

  let tabIndex = 0;
  switch (window.location.pathname) {
    case "/fixtures":
      tabIndex = 1;
      break;
    case "/results":
      tabIndex = 2;
      break;
  }

  return (
    <Container maxWidth="container.xl">
      <Tabs
        index={tabIndex}
        onChange={(index) => {
          switch (index) {
            case 0:
              navigate("/");
              break;
            case 1:
              navigate("/fixtures");
              break;
            case 2:
              navigate("/results");
              break;
          }
        }}
      >
        <TabList>
          <Tab>Live</Tab>
          <Tab>Fixtures</Tab>
          <Tab>Results</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{<Outlet />}</TabPanel>
          <TabPanel>{<Outlet />}</TabPanel>
          <TabPanel>{<Outlet />}</TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
