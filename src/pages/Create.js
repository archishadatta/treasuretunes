import React, { useState } from 'react';

function Create() {
    const [playlistUrl, setPlaylistUrl] = useState('');
    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');
    const [playlistId, setPlaylistId] = useState(null);
    const [gameLink, setGameLink] = useState(null);

    const extractPlaylistId = (url) => {
        const match = url.match(/playlist\/(\w+)/);
        return match ? match[1] : null;
    };

    const handleGenerateLink = () => {
        const id = extractPlaylistId(playlistUrl);
        if (id) {
            setPlaylistId(id);
            const toEncoded = encodeURIComponent(to);
            const fromEncoded = encodeURIComponent(from);
            if (toEncoded.length > 200 || fromEncoded.length > 200) {
                alert('To and From fields must be less than 200 characters each');
                return;
            }
            const link = `${window.location.origin}/treasuretunes/intro?playlist=${id}&to=${toEncoded}&from=${fromEncoded}`;
            setGameLink(link);
            navigator.clipboard.writeText(link).then(() => {
                alert('Game link copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        } else {
            alert('Invalid Spotify playlist URL');
        }
    };

    return (
        <div className='nongame-container'>
            <div className='nongame-frame'>
                {/* <h2>Enter Playlist Info</h2> */}
                <div className="nongame-text">Create a Quest</div>
                <div className='nongame-input-group'>
                    {/* <div className='nongame-inline-row'> */}
                        <label className='nongame-label-pair'>
                        To
                        <input 
                            className='nongame-input'
                            type='text' 
                            value={to} 
                            onChange={(e) => setTo(e.target.value)}
                        />
                        </label>
                        <label className='nongame-label-pair'>
                        From
                        <input 
                            className='nongame-input'
                            type='text' 
                            value={from} 
                            onChange={(e) => setFrom(e.target.value)}
                        />
                        </label>
                    {/* </div> */}
                    <label className='nongame-label-pair'>
                        Spotify Playlist URL
                        <input 
                        className='nongame-input'
                        type='text' 
                        value={playlistUrl} 
                        onChange={(e) => setPlaylistUrl(e.target.value)}
                        />
                    </label>
                </div>
                <button className='button button-text animated-text' onClick={handleGenerateLink}>Copy Game Link</button>
            </div>
        </div>
    );
}
export default Create;


