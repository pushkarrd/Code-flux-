// Gemini API helper stubs
// Replace these stubs with server-side calls to the Gemini API or your preferred LLM proxy.

/**
 * generateCourse - returns a generated course outline
 * @param {Object} options - { title, description, chaptersCount, difficulty, category }
 * @returns {Promise<Object>} - {title, description, objectives, chapters: [{title, description, keyPoints}] }
 */
export async function generateCourse(options){
  // TODO: call your backend which calls Gemini securely (do not call Gemini directly from client)
  const { title = 'New Course', chaptersCount = 7 } = options
  const chapters = Array.from({length: chaptersCount}).map((_,i)=>({
    title: `Chapter ${i+1}: Topic overview`,
    description: `Description for chapter ${i+1}`,
    keyPoints: ['Point A','Point B','Point C']
  }))
  return {
    title,
    description: options.description || 'AI generated course description (stub)',
    objectives: ['Learn fundamentals','Build projects','Apply knowledge'],
    chapters
  }
}

/**
 * generateQuiz - returns an array of 5 multiple choice questions for a chapter
 * @param {String} chapterText
 * @returns {Promise<Array>} - [{question, options:[...], answerIndex, explanation}]
 */
export async function generateQuiz(chapterText){
  // TODO: proxy this request to your backend which calls Gemini and returns structured quiz data
  return Array.from({length:5}).map((_,i)=>({
    question: `Sample question ${i+1} about the chapter (stub)` ,
    options: ['Option A','Option B','Option C','Option D'],
    answerIndex: Math.floor(Math.random()*4),
    explanation: 'Short explanation for the correct answer.'
  }))
}
