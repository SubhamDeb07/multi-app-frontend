import { Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const expenseRoutes = (
  <>
    <Route path="expense-tracker/dashboard" element={<Dashboard />} />
  </>
);

export default expenseRoutes;
