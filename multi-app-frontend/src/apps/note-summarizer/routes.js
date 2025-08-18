import React from "react";
import SummarizerDashboard from "./pages/SummarizeDashboard.js";
import { Route } from "react-router-dom";

const noteSummarizerRoutes = (
  <>
    <Route path="note-summarizer/dashboard" element={<SummarizerDashboard />} />
  </>
);

export default noteSummarizerRoutes;
