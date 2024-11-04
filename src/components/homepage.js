import axios from "axios";
import { useState } from "react";
import cowImage from "../assets/cow.png";
// import dancingCat from "../assets/cat-dancing.gif";
import drawingCat from "../assets/drawing.gif";

// hiiii
const Nvidia = () => {
  const [text, setText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [image, setImage] = useState(null);

  const invokeUrl = "http://localhost:6969/generate-our-image-brotha";

  const generateImage = async () => {
    const payload = {
      text_prompts: [
        {
          text: text,
          weight: 1,
        },
        {
          text: "",
          weight: -1,
        },
      ],
      cfg_scale: 5,
      sampler: "K_EULER_ANCESTRAL",
      seed: 0,
      steps: 25,
    };

    try {
      setGenerating(true);
      setImage(null);
      const res = await axios.post(invokeUrl, payload);

      const imageData = res.data.artifacts[0].base64;

      setImage(`data:image/jpeg;base64,${imageData}`);
      setGenerating(false);
    } catch (error) {
      console.log("this is error: ", error);
    }
  };

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleDownload = async () => {
    try {
      // Get the current image URL/source
      const imageUrl = image || cowImage;

      // For base64 images
      if (imageUrl.startsWith("data:image")) {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "generated-image.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      // For regular image URLs
      else {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "generated-image.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="container">
      <div className="main-container">
        <div className="title-and-input">
          <div className="text-and-cat">
            <h3>Hii there! 😀, what would you like to generate today?</h3>
          </div>

          <div id="input-field">
            <input
              onChange={handleInput}
              placeholder="Write a prompt here to generate an image"
            />

            <button onClick={generateImage}>Generate</button>
          </div>
        </div>

        <img
          className="generated-image"
          src={generating ? drawingCat : image ? image : cowImage}
          alt={
            generating
              ? "Generating image"
              : image
              ? "Generated image"
              : "Cow with sunglasses"
          }
        />
        <button onClick={handleDownload}>Download Image</button>
      </div>
    </div>
  );
};

export default Nvidia;
