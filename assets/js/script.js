const questions = [
  {
    question: "What does JS stand for?",
    choices: ["Java Source", "JavaScript", "Java Style", "Jelly Sandwich"],
    correctAnswer: "JavaScript",
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
    // questionContainer.innerHTML = '';

    // Display current question
    const questionTextElement = document.createElement("p");
    questionTextElement.textContent = currentQuestion.question;
    questionContainer.appendChild(questionTextElement);

    // Display choices
    const choicesList = document.createElement("ul");
    currentQuestion.choices.forEach((choice, index) => {
      const choiceElement = document.createElement("li");
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
    timeLeft--;

    // Update timer display
    document.getElementById("timer").textContent = timeLeft;
    console.log(timeLeft);

    // Check if time has run out
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
};

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

  // Create a new container for the final score
  const scoreContainer = document.createElement("div");
  scoreContainer.id = "score-container";

  // Display the final score
  const scoreText = document.createElement("p");
  scoreText.textContent = `Quiz Over! Your Score: ${score}`;
  scoreContainer.appendChild(scoreText);

  // Allow the user to save initials (you can add this functionality)
  const initialsInput = document.createElement("input");
  initialsInput.placeholder = "Enter Initials";
  scoreContainer.appendChild(initialsInput);

  // Button to submit initials (you can add this functionality)
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.onclick = () => {
    // Handle saving initials logic
    // For simplicity, you can alert the initials for now
    alert(`Initials: ${initialsInput.value}`);
  };
  scoreContainer.appendChild(submitButton);

  // Append the score container to the quiz container
  document.getElementById("quiz-container").appendChild(scoreContainer);
};

document.getElementById("start-btn").addEventListener("click", startQuiz);
