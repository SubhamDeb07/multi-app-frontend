import API from "../../../core/api.js";

// Fetch all images
export const fetchImages = async () => {
  const { data } = await API.get("/image");
  return data;
};

// Create a new image
export const createImage = async (prompt) => {
  const { data } = await API.post("/image", { prompt });
  return data;
};
