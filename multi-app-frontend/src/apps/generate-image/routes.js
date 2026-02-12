import { Route } from "react-router-dom";
import ImageCreatorPage from './pages/Generateimage.js';

const ImageCreateRoutes = (
  <>
    <Route path="generate-image/dashboard" element={<ImageCreatorPage />} />
  </>
);

export default ImageCreateRoutes;
