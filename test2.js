const ytdl = require('youtube-transcript-api');

async function testTranscript() {
  try {
    const transcript = await ytdl.getTranscript('bqtQkercKH8');
    console.log(transcript);
  } catch (error) {
    console.error('Error fetching transcript:', error);
  }
}

testTranscript();