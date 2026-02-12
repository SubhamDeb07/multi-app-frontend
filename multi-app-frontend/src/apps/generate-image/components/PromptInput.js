import React, { useState } from "react";

const PromptInput = ({ onSubmit, disabled }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt);
    setPrompt("");
  };

  return (
    <form className="prompt-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>
        Generate
      </button>
    </form>
  );
};

export default PromptInput;
