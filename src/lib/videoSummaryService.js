import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'AIzaSyAklz0C94qeRb3KuJ5Lmg3nV11ETlLYJ3c'
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Generate a summary for a YouTube video based on its title, channel, and topic
 * @param {Object} video - Video object with title, channel, duration
 * @param {string} topic - The course/chapter topic
 * @returns {Promise<string>} - Video summary
 */
export const generateVideoSummary = async (video, topic) => {
  try {
    console.log('Starting video summary generation for:', video.title);

    const prompt = `Generate a concise educational summary (3-4 sentences) for this YouTube video:

Title: ${video.title}
Channel: ${video.channel}
Duration: ${video.duration}
Topic: ${topic}

The summary should:
1. Explain what the video covers
2. Highlight key learning points related to "${topic}"
3. Be suitable for a student preview
4. Be written in simple, clear language

Provide only the summary text, no additional formatting or labels.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text().trim();

    console.log('Generated video summary:', summary);
    return summary;
  } catch (error) {
    console.error('Error generating video summary:', error);
    
    // Return a fallback summary based on video info
    return `This video from ${video.channel} covers ${video.title}. It's approximately ${video.duration} long and provides practical insights into ${topic}.`;
  }
};

/**
 * Generate summaries for multiple videos
 * @param {Array} videos - Array of video objects
 * @param {string} topic - The course/chapter topic
 * @returns {Promise<Array>} - Array of summaries
 */
export const generateMultipleVideoSummaries = async (videos, topic) => {
  try {
    const summaries = await Promise.all(
      videos.map(video => generateVideoSummary(video, topic))
    );
    return summaries;
  } catch (error) {
    console.error('Error generating multiple summaries:', error);
    return videos.map(video => 
      `This video from ${video.channel} covers ${video.title}. It's approximately ${video.duration} long and provides insights into ${topic}.`
    );
  }
};

/**
 * Cache summaries in localStorage
 * @param {string} videoId - YouTube video ID
 * @param {string} summary - Generated summary
 */
export const cacheSummary = (videoId, summary) => {
  try {
    const cache = JSON.parse(localStorage.getItem('videoSummaryCache') || '{}');
    cache[videoId] = {
      summary,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('videoSummaryCache', JSON.stringify(cache));
  } catch (error) {
    console.error('Error caching summary:', error);
  }
};

/**
 * Get cached summary if available
 * @param {string} videoId - YouTube video ID
 * @returns {string|null} - Cached summary or null
 */
export const getCachedSummary = (videoId) => {
  try {
    const cache = JSON.parse(localStorage.getItem('videoSummaryCache') || '{}');
    return cache[videoId]?.summary || null;
  } catch (error) {
    console.error('Error retrieving cached summary:', error);
    return null;
  }
};

/**
 * Get or generate a video summary with caching
 * @param {Object} video - Video object
 * @param {string} topic - Course/chapter topic
 * @returns {Promise<string>} - Summary text
 */
export const getVideoSummary = async (video, topic) => {
  // Check cache first
  const cached = getCachedSummary(video.videoId);
  if (cached) {
    console.log('Using cached summary for video:', video.videoId);
    return cached;
  }

  // Generate new summary
  const summary = await generateVideoSummary(video, topic);
  
  // Cache it
  cacheSummary(video.videoId, summary);
  
  return summary;
};
