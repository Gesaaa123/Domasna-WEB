/* ========== GALERIJA: Like/Dislike so localStorage ========== */
(function initGalleryVotes() {
  // Najdi gi kartite so atribut data-id (sekoja slika/atrakcija)
  const cards = document.querySelectorAll(".card[data-id]");
  if (!cards.length) return;

  cards.forEach(card => {
    const id = card.getAttribute("data-id");
    const likeBtn = card.querySelector(".btn-like");
    const dislikeBtn = card.querySelector(".btn-dislike");
    const likeSpan = card.querySelector(".like-count");
    const dislikeSpan = card.querySelector(".dislike-count");

    // Procitaj prethodno sacuvani glasovi od localStorage
    const key = `votes:${id}`;
    const saved = JSON.parse(localStorage.getItem(key) || "{}");
    const likes = Number(saved.likes || 0);
    const dislikes = Number(saved.dislikes || 0);
    likeSpan.textContent = likes;
    dislikeSpan.textContent = dislikes;

    // Na klik: zgolemi gi brojkite i sacuvaj gi
    likeBtn.addEventListener("click", () => {
      const data = JSON.parse(localStorage.getItem(key) || "{}");
      data.likes = Number(data.likes || 0) + 1;
      localStorage.setItem(key, JSON.stringify(data));
      likeSpan.textContent = data.likes;
      likeBtn.disabled = true; dislikeBtn.disabled = true; // opcionalno onemogji dvoklik
    });

    dislikeBtn.addEventListener("click", () => {
      const data = JSON.parse(localStorage.getItem(key) || "{}");
      data.dislikes = Number(data.dislikes || 0) + 1;
      localStorage.setItem(key, JSON.stringify(data));
      dislikeSpan.textContent = data.dislikes;
      dislikeBtn.disabled = true; likeBtn.disabled = true;
    });
  });
})();

/* ========== ANKETA: cuvaj odgovori vo localStorage ========== */
(function initSurvey() {
  const form = document.getElementById("surveyForm");
  if (!form) return;

  const msg = document.getElementById("surveyMsg");
  const list = document.getElementById("surveyList");

  // Prikazi prethodni odgovori
  function render() {
    const all = JSON.parse(localStorage.getItem("surveyResponses") || "[]");
    list.innerHTML = "";
    all.forEach((r, i) => {
      const li = document.createElement("li");
      li.textContent = `${i + 1}) ${r.name || "Анонимно"} • Рејтинг: ${r.rating}/5 • Град: ${r.city} • ${r.comment || ""}`;
      list.appendChild(li);
    });
  }
  render();

  // Validacija + cuvanje na nov odgovor
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const rating = Number(data.get("rating"));
    const city = String(data.get("city") || "").trim();

    if (!rating || rating < 1 || rating > 5 || !city) {
      msg.textContent = "Ве молиме пополнете рејтинг (1–5) и изберете град.";
      return;
    }

    const entry = {
      name: (data.get("name") || "").trim(),
      rating,
      city,
      comment: (data.get("comment") || "").trim(),
      at: new Date().toISOString()
    };

    const all = JSON.parse(localStorage.getItem("surveyResponses") || "[]");
    all.push(entry);
    localStorage.setItem("surveyResponses", JSON.stringify(all));

    msg.textContent = "Фала! Одговорот е зачуван локално.";
    form.reset();
    render();

    // Iscisti poraka po 3 sekundi
    setTimeout(() => (msg.textContent = ""), 3000);
  });
})();
