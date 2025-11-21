chrome.runtime.sendMessage({ action: "injectInterceptor" });

window.addEventListener("cursoDevQuestion", async (ev) => {
  const { question_id, difficulty } = ev.detail;

  let correct = null;

  for (let i = 0; i < 4; i++) {
    let ans = i + 1;
    const res = await fetch(
      "https://curso.dev/api/v1/show/questions/validate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          question_id,
          difficulty,
          selected_answer: ans,
        }),
      }
    );

    const data = await res.json();
    if (data.correct) {
      correct = ans;
      break;
    }
  }
  if (correct) showPopup(correct);
});

function showPopup(text) {
  const div = document.createElement("div");
  div.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #111;
        color: #00ff99;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 18px;
        z-index: 999999;
    `;
  div.textContent = "Resposta correta: " + text;
  document.body.appendChild(div);
}
