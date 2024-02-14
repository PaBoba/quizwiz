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
  {
    questions: "What does HTML stand for?",
    choices: [
      "Hyper Text Markup Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Text Makeup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question: "What is the purpose of CSS in web development?",
    choices: [
      "To define the structure of a webpage",
      "To provide interactivity on a webpage",
      "To style and layout web content",
      "To handle server-side logic",
    ],
    correctAnswer: "To style and layout web content",
  },
  {
    question: "In the context of databases, what does SQL stand for?",
    choices: [
      "Structured Query Language",
      "Standard Query Language",
      "Structured Question Language",
      "Standard Question Language",
    ],
    correctAnswer: "Structured Query Language",
  },
  {
    question:
      "Which data structure follows the Last In, First Out (LIFO) principle?",
    choices: ["Queue", "Stack", "Tree", "Graph"],
    correctAnswer: "Stack",
  },
  {
    question: "What is the purpose of the 'git' version control system?",
    choices: [
      "To manage and track changes in code",
      "To write and execute code",
      "To design and style web content",
      "To handle server-side logic",
    ],
    correctAnswer: "To manage and track changes in code",
  },
  {
    question: "Which of the following is NOT a type of programming paradigm?",
    choices: [
      "Object-Oriented Programming (OOP)",
      "Functional Programming (FP)",
      "Physical Programming (PP)",
      "Procedural Programming (PP)",
    ],
    correctAnswer: "Physical Programming (PP)",
  },
  {
    question: "What is the purpose of the 'npm' package manager?",
    choices: [
      "To manage and install dependencies",
      "To write and execute code",
      "To design and style web content",
      "To handle server-side logic",
    ],
    correctAnswer: "To manage and install dependencies",
  },
  {
    question: "What is the purpose of the 'if' statement in programming?",
    choices: [
      "To define a function",
      "To execute code based on a condition",
      "To manage and install dependencies",
      "To handle server-side logic",
    ],
    correctAnswer: "To execute code based on a condition",
  },

  // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

const submitScore = document.getElementById("saveScore");

const startQuiz = () => {
  // Hide start button
  document.getElementById("startBtn").style.display = "none";

  // Hide view scores button
  document.getElementById("scorePage").style.display = "none";

  // Display quiz container
  document.getElementById("quizContainer").style.display = "block";

  // Display the first question
  const displayQuestion = () => {
    const questionContainer = document.getElementById("quizContainer");
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
  document.getElementById("quizContainer").style.display = "none";

  // Display the result container
  document.getElementById("resultContainer").style.display = "block";

  const scoreText = document.getElementById("score");
  scoreText.textContent = `Your score: ${score}`;

  const initialsInput = document.getElementById("initials");

  const saveScore = (initials, score) => {
    // Retrieve previous scores from local storage
    const previousScores = JSON.parse(localStorage.getItem("quizScores")) || [];

    // Add the current score
    previousScores.push({ initials, score });

    // Save the updated scores to local storage
    localStorage.setItem("quizScores", JSON.stringify(previousScores));
    console.log({ initials, score });
    console.log("Score saved!");
  };

  submitScore.addEventListener("click", () => {
    // Save score to local storage
    saveScore(initialsInput.value, score);
    console.log("Score saved!");
    // Redirect to scores page
    window.location.href = "./scores.html";
  });
};

document.getElementById("startBtn").addEventListener("click", startQuiz);
