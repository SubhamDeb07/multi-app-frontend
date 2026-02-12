import React, { useEffect, useState, useRef } from "react";
import { fetchImages, createImage } from "../services/imageService.js";
import PromptInput from "../components/PromptInput";
import { Link } from "react-router-dom";
import "../css/ImageGenerate.css";

const ImageCreatorPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const chatContainerRef = useRef(null);

  const loadImages = async () => {
    try {
      setLoading(true);
      const data = await fetchImages();
      setImages(data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (prompt) => {
    try {
      setLoading(true);
      await createImage(prompt);
      await loadImages();
    } catch (error) {
      console.error("Error creating image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  // Auto-scroll to bottom when new image arrives
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [images]);

  return (
    <div className="image-creator">
      <div className="back-button3">
        <Link to="/apps">← Back to Home</Link>
      </div>
      <h2 className="title">AI Image Generator</h2>

      {/* Chat Container */}
      <div className="chat-container" ref={chatContainerRef}>
        {images.map((img, idx) => (
          <div key={idx} className="chat-bubble">
            <p className="prompt-text">{img.prompt}</p>
            <img
              src={img.imageUrl}
              alt="Generated"
              className="chat-image"
              onClick={() => setSelectedImage(img.imageUrl)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}

        {loading && <p className="loading">Generating image...</p>}
      </div>
      {selectedImage && (
          <div className="modal" onClick={() => setSelectedImage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={() => setSelectedImage(null)}>
                &times;
              </span>
              <img
                src={selectedImage}
                alt="Expanded"
                className="expanded-image"
              />
            </div>
          </div>
        )}

      {/* Input at bottom */}
      <PromptInput onSubmit={handleCreate} disabled={loading} />
    </div>
  );
};

export default ImageCreatorPage;
