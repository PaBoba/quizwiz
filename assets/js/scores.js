// scores.js

const displayPreviousScores = () => {
  const scoresList = document.getElementById("scores-list");

  // Check if scoresList is not null
  if (scoresList) {
    // Retrieve previous scores from local storage
    const previousScores = JSON.parse(localStorage.getItem("quizScores")) || [];

    // Sort scores from highest to lowest
    previousScores.sort((a, b) => b.score - a.score);

    // Display previous scores
    previousScores.forEach((score) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${score.initials}: ${score.score}`;
      scoresList.appendChild(listItem);
    });
  }
};

document.addEventListener("DOMContentLoaded", displayPreviousScores);
