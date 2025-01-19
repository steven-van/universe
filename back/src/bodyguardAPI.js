const fetch = require("node-fetch");
require('dotenv').config();

const apiKey = process.env.API_KEY;
const channelId = process.env.CHANNEL_ID;
const base_Url = process.env.DATABASE_URL;

const analyzeMessage = async (text, time) => {

  const headers = new fetch.Headers();
  headers.append("X-Api-Key", '9223b050fdf127f3367f6fab5922ebde');
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({
    channelId: '1405e364-f464-479a-89f0-031f68242a71',
    contents: [
      {
        text: text,
        publishedAt: time,
      },
    ],
  });

  	url = base_Url + "analyze";

	const requestOptions = {
		method: 'POST',
		headers,
		body,
	}
  try {

    const response = await fetch(url, requestOptions);
	if (!response.ok) {
        const rawResponse = await response.text();
        console.error('Raw API Response:', rawResponse);
        throw new Error(`API responded with status ${response.status}`);
    }

    const json = await response.json();
    return json;

  } catch (error) {
    console.error("Error with Bodyguard API:", error);
    throw new Error("Failed to analyze message");
  }
};

module.exports = { analyzeMessage };
