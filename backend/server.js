const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { prototype } = require("events");
require("dotenv").config();

const app = express();

app.use(cors());

const invokeUrl =
  "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl";

const API_KEY = process.env.API_KEY;

app.use(express.json());

app.post("/generate-our-image-brotha", async (req, res) => {
  const { text } = req.body;
  try {
    const response = await axios.post(invokeUrl, req.body, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send({ error: "API request not successful" });
  }
});

const PORT = 6969;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
