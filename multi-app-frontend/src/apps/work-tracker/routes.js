import React from "react";
import Dashboard from "./pages/Dashboard";
import { Route } from "react-router-dom";

const workTrackerRoutes = (
  <>
    <Route
      path="work-tracker/dashboard"
      element={<Dashboard />}
    />
  </>
);

export default workTrackerRoutes;
