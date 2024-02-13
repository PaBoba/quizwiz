const questions = [
  {
    question: "What does JS stand for?",
    choices: ["Java Source", "JavaScript", "Java Style", "Jelly Sandwich"],
    correctAnswer: "JavaScript",
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'example.js'?",
    choices: [
      "<script name='example.js'>",
      "<script src='example.js'>",
      "<script href='example.js'>",
      "<script file='example.js'>",
    ],
    correctAnswer: "<script src='example.js'>",
  },
  // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

const startQuiz = () => {
  // Hide start button
  document.getElementById("start-btn").style.display = "none";

  // Display quiz container
  document.getElementById("quiz-container").style.display = "block";

  // Display the first question
  const displayQuestion = () => {
    const questionContainer = document.getElementById("quiz-container");
    const currentQuestion = questions[currentQuestionIndex];

    // // Clear previous question
    questionContainer.innerHTML = "";

    // Display current question
    const questionTextElement = document.createElement("p");
    questionTextElement.textContent = currentQuestion.question;
    questionContainer.appendChild(questionTextElement);

    // Display choices
    const choicesList = document.createElement("ul");
    currentQuestion.choices.forEach((choice, index) => {
      const choiceElement = document.createElement("button");
      choiceElement.textContent = choice;
      choiceElement.onclick = () => checkAnswer(choice);
      choicesList.appendChild(choiceElement);
    });

    questionContainer.appendChild(choicesList);
  };

  displayQuestion();

  // Set up a timer
  let timeLeft = 2;
  document.getElementById("timer").textContent = timeLeft;

  timer = setInterval(() => {
    // timeLeft--;

    // Update timer display
    document.getElementById("timer").textContent = timeLeft;
    console.log(timeLeft);

    // Check if time has run out
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
  const checkAnswer = (userChoice) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (userChoice === currentQuestion.correctAnswer) {
      score++;
    }

    // Move to the next question
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  };
};

let quizEnded = false; // variable to track if the quiz has ended

const endQuiz = () => {
  // If the quiz has already ended, do nothing
  if (quizEnded) {
    return;
  }

  // Set the flag to indicate that the quiz has ended
  quizEnded = true;

  // Hide the timer element
  document.getElementById("timer").style.display = "none";

  // Clear the timer
  clearInterval(timer);

  // Hide the questions
  document.getElementById("quiz-container").style.display = "none";

  // Display the result container
  document.getElementById("result-container").style.display = "block";

  const scoreContainer = document.createElement("div");
  scoreContainer.id = "score-container";

  const scoreText = document.getElementById("score");
  scoreText.textContent = `Your score: ${score}`;

  const initialsInput = document.createElement("input");
  initialsInput.placeholder = "Enter Initials";

  const saveScore = (initials, score) => {
    // Retrieve previous scores from local storage
    const previousScores = JSON.parse(localStorage.getItem("quizScores")) || [];

    // Add the current score
    previousScores.push({ initials, score });

    // Save the updated scores to local storage
    localStorage.setItem("quizScores", JSON.stringify(previousScores));
  };

  const submitButton = document.getElementById("save-score");
  submitButton.onclick = () => {
    // Save score to local storage
    saveScore(initialsInput.value, score);
    console.log("Score saved!");
    // Redirect to scores page
    window.location.href = "./scores.html";
  };
  scoreContainer.appendChild(submitButton);

  document.getElementById("quiz-container").appendChild(scoreContainer);
};

document.getElementById("start-btn").addEventListener("click", startQuiz);
