const cache = new Map();

async function fetchSongs(playlistId) {
  const api = process.env.REACT_APP_API_URL;
  const response = await fetch(`${api}/api/playlist?playlist_id=${playlistId}`);
  const data = await response.json();
  if (!data.items) {
    throw new Error(data.error || 'Failed to fetch playlist');
  }

  return Promise.all(
    data.items.map(async item => {
      const title = item.track.name;
      const artist = item.track.artists[0].name;
      const durationMs = item.track.duration_ms;

      let previewUrl = null;
      try {
        const previewRes = await fetch(
          `${api}/api/preview?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`
        );
        const previewData = await previewRes.json();
        previewUrl = previewData.previewUrl;
      } catch (err) {
        console.warn(`Preview fetch failed for "${title}" by "${artist}":`, err);
      }

      return {
        url: item.track.album.images[0]?.url || '',
        title,
        artist,
        duration: `${Math.floor(durationMs / 60000)}:${String(Math.floor((durationMs % 60000) / 1000)).padStart(2, '0')}`,
        previewUrl
      };
    })
  );
}

// Kicks off (or reuses) the playlist fetch for `playlistId` so the intro
// screen and the game screen share one in-flight request instead of
// fetching the same playlist twice.
export function loadPlaylist(playlistId) {
  if (!cache.has(playlistId)) {
    cache.set(playlistId, fetchSongs(playlistId));
  }
  return cache.get(playlistId);
}
