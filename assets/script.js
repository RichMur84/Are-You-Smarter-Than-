let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 15;
let countdown;
//Questions and Options array
const quizArray = [
  {
    id: "0",
    question: "In The Matrix, does Neo take the blue pill or the red pill?",
    options: ["Red", "Blue", "Green", "Both"],
    correct: "Red",
  },
  {
    id: "1",
    question:
      "What is the name of the anthemic dance near the beginning of The Rocky Horror Picture Show?",
    options: [
      "Dammit Janet",
      "Super Heroes",
      "I Can Make You a Man",
      "The Time Warp",
    ],
    correct: "The Time Warp",
  },
  {
    id: "2",
    question: "What is the highest grossing R-rated movie of all time?",
    options: ["Saving Private Ryan", "Joker", "Deadpool", "IT"],
    correct: "Joker",
  },
  {
    id: "3",
    question:
      "Who is the only person ever to receive an Oscar nomination for acting in a Star Wars movie?",
    options: ["Liam Neeson", "Alec Guinness", "Adam Driver", "George Lucas"],
    correct: "Alec Guinness",
  },
  {
    id: "4",
    question:
      "If you watch the Marvel movies in chronological order, which movie would you watch first?",
    options: [
      "Iron Man",
      "Captain Marvel",
      "Captain America: The First Avenger",
      "Doctor Strange",
    ],
    correct: "Captain America: The First Avenger",
  },
];

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});
//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    questionCount += 1;

    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //score
      userScore.innerHTML =
        "Not Bad! You got " + scoreCount + " out of " + questionCount;
    } else {
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";

      quizDisplay(questionCount);
      count = 15;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);
//Adding a timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1500);
};
//Display the quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");

  quizCards.forEach((card) => {
    card.classList.add("hide");
  });

  quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
  //randomly show the questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);

    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}
//Checks Functions
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");

    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  //stop timer
  clearInterval(countdown);

  options.forEach((element) => {
    element.disabled = true;
  });
}

function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 15;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}
//click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
