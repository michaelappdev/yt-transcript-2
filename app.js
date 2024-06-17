const express = require('express');
const app = express();
const YouTubeTranscript = require('youtube-transcript');

app.use(express.json());

app.post('/transcript', async (req, res) => {
  const { videoId } = req.body;

  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  try {
    const transcript = await YouTubeTranscript.fetchTranscript(videoId);
    res.json(transcript);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch transcript' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});