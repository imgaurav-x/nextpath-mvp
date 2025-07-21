// Import PDF.js
import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js").then(() => {
  const input = document.getElementById("pdfInput");
  const output = document.getElementById("output");

  input.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str).join(" ");
      fullText += strings + "\n";
    }

    const quizData = extractQuestions(fullText);
    output.value = JSON.stringify(quizData, null, 2);
  });

  function extractQuestions(text) {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    const quiz = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(/^\d+\./)) {
        const q = lines[i].replace(/^\d+\.\s*/, "");
        const opts = lines.slice(i + 1, i + 4);
        const answer = 0; // default to first option
        quiz.push({ question: q, options: opts, answer });
        i += 3;
      }
    }
    return quiz;
  }
});
