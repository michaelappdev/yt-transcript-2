const express = require('express');
const app = express();
const ytdl = require('youtube-transcript-api');

app.use(express.json());

const extractVideoId = (urlOrId) => {
  const urlPattern = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\s]+)/;
  const match = urlOrId.match(urlPattern);
  return match ? match[1] : urlOrId;
};

app.post('/transcript', async (req, res) => {
  const { videoId } = req.body;

  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  const extractedVideoId = extractVideoId(videoId);

  try {
    const transcript = await ytdl.getTranscript(extractedVideoId);

    // Concatenate the text segments into a single string
    const fullTranscript = transcript.map(segment => segment.text).join(' ');

    res.json({ transcript: fullTranscript });
  } catch (error) {
    console.error('Error fetching transcript:', error);
    res.status(500).json({ error: 'Failed to fetch transcript' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});