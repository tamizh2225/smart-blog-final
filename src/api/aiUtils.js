// aiUtils.js
import axios from "axios";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const generateBlogFromIdea = async (idea) => {
  const prompt = `Based on this blog idea: "${idea}", generate a blog object with:
  - a catchy title,
  - a 200-character subject summary,
  - full blog content (~150 words),
  - and 3-5 relevant comma-separated tags.
  Return it as JSON like:
  {
    "title": "...",
    "subject": "...",
    "content": "...",
    "tags": "tag1, tag2",
  }`;

  const res = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-davinci-003",
      prompt,
      max_tokens: 300,
      temperature: 0.8,
    },
    {
      headers,
    }
  );

  const jsonStr = res.data.choices[0].text.trim();
  return JSON.parse(jsonStr);
};
