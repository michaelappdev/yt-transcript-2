const YouTubeTranscript = require('youtube-transcript').default; // Ensure the correct import

async function testTranscript() {
  try {
    const transcript = await YouTubeTranscript.fetchTranscript('pDisVpv_Q6I');
    console.log(transcript);
  } catch (error) {
    console.error('Error fetching transcript:', error);
  }
}

testTranscript();