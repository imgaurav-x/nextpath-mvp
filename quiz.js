let quiz = [];
let current = 0;
let score = 0;

const qEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

fetch("quiz-data.json")
  .then((res) => res.json())
  .then((data) => {
    quiz = data;
    loadQuestion();
  });

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

