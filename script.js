const questions = [
  {
    question: [
      "What does HTML stand for?", "HTML का क्या अर्थ है?"
    ],
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    answer: 1
  },
  {
    question: [
      "Which language is used for styling web pages?",
      "वेब पेजों को स्टाइल करने के लिए किस भाषा का उपयोग किया जाता है?"
    ],
    options: ["HTML", "JQuery", "CSS"],
    answer: 1
  },
  {
    question: [
      "Which is not a JavaScript Framework?", "कौन सा जावास्क्रिप्ट फ्रेमवर्क नहीं है?"
    ],
    options: ["Python Script", "JQuery", "NodeJS"],
    answer: 1
  }
];

let totalTime = 120;
let currentQuestion = 0;
let score = 0;
let timerInterval;

const startBtn = document.getElementById("start-btn");
const timeEl = document.getElementById("time");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const quizContainer = document.getElementById("quiz-container");
const timer = document.getElementById("timer");
const footer = document.getElementById("footer");

const placeholderQuiz = document.getElementById("footer-placeholder-quiz");
const placeholderResult = document.getElementById("footer-placeholder-result");
const scoreDisplay = document.getElementById("score");

const userForm = document.getElementById("user-form");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("last-name");
const mobileInput = document.getElementById("mobile");
const dateInput = document.getElementById("date");

function startTimer() {
  timerInterval = setInterval(() => {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;
    timeEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    totalTime--;

    if (totalTime < 0) {
      clearInterval(timerInterval);
      finishTest();
    }
  }, 1000);
}

function showQuestion(index) {
  const q = questions[index];
  questionEl.innerHTML = `
    <ul style="list-style: none; padding-left: 0;">
      <li style="margin-bottom: 5px;">${q.question[0]}</li>
      <li style="color: gray;">${q.question[1]}</li>
    </ul>
  `;
  optionsEl.innerHTML = "";

  q.options.forEach((option, i) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.value = i;
    li.appendChild(input);
    li.appendChild(document.createTextNode(" " + option));
    optionsEl.appendChild(li);
  });
}

function finishTest() {
  quizContainer.classList.add("hidden");
  timer.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreDisplay.textContent = `Time's up! You scored ${score} out of ${questions.length}`;
  placeholderResult.appendChild(footer);
}

function showFinalResult() {
  quizContainer.classList.add("hidden");
  timer.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreDisplay.textContent = `You scored ${score} out of ${questions.length}`;
  placeholderResult.appendChild(footer);
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) return;

  if (parseInt(selected.value) === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    clearInterval(timerInterval);
    showFinalResult();
  }
});

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const mobile = mobileInput.value.trim();
  const date = dateInput.value;

  const mobileRegex = /^[0-9]{10}$/;

  if (!name || !lastName || !mobile || !date) {
    alert("Please fill all the details.");
    return;
  }

  if (!mobileRegex.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  userForm.classList.add("hidden");
  startBtn.classList.remove("hidden");
});

startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  timer.classList.remove("hidden");
  quizContainer.classList.remove("hidden");

  showQuestion(currentQuestion);
  startTimer();
  placeholderQuiz.appendChild(footer);
});