// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import spotifyPreviewFinder from 'spotify-preview-finder';


dotenv.config();

const app = express();
app.use(cors());

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let cachedAccessToken = null;
let tokenExpiry = null;

async function getAccessToken() {
  const now = new Date().getTime();
  if (cachedAccessToken && tokenExpiry && now < tokenExpiry) {
    return cachedAccessToken;
  }

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });

  const data = await res.json();
  cachedAccessToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000;
  return cachedAccessToken;
}

app.get('/api/playlist', async (req, res) => {
  const playlistId = req.query.playlist_id;
  if (!playlistId) return res.status(400).json({ error: 'Missing playlist_id' });

  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
});

app.get('/api/preview', async (req, res) => {
  const { title, artist } = req.query;
  if (!title || !artist) {
    return res.status(400).json({ error: 'Missing title or artist' });
  }

  try {
    const result = await spotifyPreviewFinder(title, artist, 1);
    if (result.success && result.results.length > 0) {
      const previewUrl = result.results[0].previewUrls[0];
      res.json({ previewUrl });
    } else {
      res.json({ previewUrl: null });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
