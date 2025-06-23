from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Spotify API base URL
SPOTIFY_API_BASE = "https://api.spotify.com/v1"

# Spotify API credentials
SPOTIFY_CLIENT_ID = "9b5294211a1241449a9d0829d4c1507e"
SPOTIFY_CLIENT_SECRET = "190a9d2d5b6547489d4de887db882c5a"

def get_access_token():
    auth_url = "https://accounts.spotify.com/api/token"
    auth_response = requests.post(auth_url, {
        "grant_type": "client_credentials",
        "client_id": SPOTIFY_CLIENT_ID,
        "client_secret": SPOTIFY_CLIENT_SECRET
    })
    
    return auth_response.json().get("access_token")

@app.route("/api/playlist", methods=["GET"])
def get_playlist_tracks():
    # get playlist_id
    playlist_id = request.args.get("playlist_id")
    print('playlist_id', playlist_id)
    if not playlist_id:
        return jsonify({"error": "Missing playlist_id"}), 400

    # get access token
    access_token = get_access_token()
    print('access_token', access_token)
    if not access_token:
        return jsonify({"error": "Failed to get access token"}), 500
    headers = {"Authorization": f"Bearer {access_token}"}
    
    # fetch and returnplaylist data
    response = requests.get(f"{SPOTIFY_API_BASE}/playlists/{playlist_id}/tracks", headers=headers)
    
    if response.status_code != 200:
        print("Spotify API Response:", response.status_code, response.text)
        return jsonify({"error": "Failed to fetch playlist data"}), response.status_code

    track_data = response.json()
    return jsonify(track_data)

if __name__ == "__main__":
    app.run(debug=True)
