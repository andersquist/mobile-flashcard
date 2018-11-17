export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function formatDeck (title) {
  return {
    title,
    questions: [],
  }
}

export function formatCard (question, answer) {
  return {
    question,
    answer,
  }
}