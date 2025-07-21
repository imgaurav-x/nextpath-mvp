const quiz = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "Hot Mail", "How to Make Lasagna"],
    answer: 0
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris"],
    answer: 2
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5"],
    answer: 1
  }
];

let current = 0;
let score = 0;

const qEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = quiz[current];
  qEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      if (i === q.answer) score++;
      next();
    };
    optionsEl.appendChild(btn);
  });
}

function next() {
  current++;
  if (current < quiz.length) {
    loadQuestion();
  } else {
    qEl.textContent = "Quiz Finished!";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
    scoreEl.textContent = `Your Score: ${score}/${quiz.length}`;
  }
}

nextBtn.onclick = next;
loadQuestion();
