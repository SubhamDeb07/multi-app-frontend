import { BrowserRouter as Router, Routes } from "react-router-dom";
import expenseRoutes from "./apps/expense-tracker/routes.js";
import commonRoutes from "./routes/commonRoutes.routes.js";
import noteSummarizerRoutes from "./apps/note-summarizer/routes.js";
import ImageCreateRoutes from './apps/generate-image/routes.js'
import workTrackerRoutes from "./apps/work-tracker/routes.js";


function App() {
  return (
   <Router>
    <Routes>
      {commonRoutes}
      {noteSummarizerRoutes}
      {expenseRoutes}
      {ImageCreateRoutes}
      {workTrackerRoutes}
      </Routes>
   </Router>
  );
}

export default App;
