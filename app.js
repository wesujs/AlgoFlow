(function () {
  "use strict";

  const data = window.ALGOFLOW_DATA;
  const storageKey = "algoflow-v2-state";
  const validViews = ["today", "path", "practice", "journal", "library"];
  const navItems = [
    ["today", "i-home", "Today"],
    ["path", "i-path", "Path"],
    ["practice", "i-code", "Practice"],
    ["journal", "i-journal", "Journal"],
    ["library", "i-library", "Library"]
  ];

  const eventObjects = data.learningEvents.map((row) => Object.fromEntries(data.learningEventColumns.map((column, index) => [column, row[index]])));
  const defaultState = {
    view: "today",
    theme: window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    selectedAnswer: null,
    answerSubmitted: false,
    learningEvents: eventObjects,
    reflections: data.reflections,
    libraryQuery: "",
    libraryTopic: "all",
    journalQuery: ""
  };

  let state = loadState();
  const main = document.getElementById("main-content");
  const pageTitle = document.getElementById("page-title");
  const toastNode = document.getElementById("toast");
  const dialog = document.getElementById("methodology-dialog");
  let toastTimer = null;

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey));
      return stored ? { ...defaultState, ...stored } : structuredClone(defaultState);
    } catch (error) {
      return structuredClone(defaultState);
    }
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
  }

  function icon(id) {
    return `<svg aria-hidden="true"><use href="#${id}"></use></svg>`;
  }

  function sourceById(id) {
    return data.sources.find((source) => source.id === id);
  }

  function topicById(id) {
    return data.topics.find((topic) => topic.id === id);
  }

  function percent(numerator, denominator) {
    return denominator ? (numerator / denominator) * 100 : 0;
  }

  function calculateMetrics() {
    const events = state.learningEvents;
    const correct = events.filter((event) => Number(event.correct) === 1).length;
    const reviews = events.filter((event) => Number(event.is_review) === 1);
    const reviewCorrect = reviews.filter((event) => Number(event.correct) === 1).length;
    const reflected = events.filter((event) => Number(event.reflection_saved) === 1).length;
    const activeTopic = topicById(data.model.activeTopicId);
    const evaluation = new Date(`${data.asOf}T00:00:00Z`);
    const start = new Date(evaluation);
    start.setUTCDate(start.getUTCDate() - (data.model.consistencyWindowDays - 1));
    const startKey = start.toISOString().slice(0, 10);
    const activeDates = new Set(events.map((event) => event.occurred_at.slice(0, 10)).filter((dateKey) => dateKey >= startKey && dateKey <= data.asOf));
    const components = {
      accuracy: percent(correct, events.length),
      activeTopicCoverage: percent(activeTopic.checkpointsDone, activeTopic.checkpointsTotal),
      reviewRetention: percent(reviewCorrect, reviews.length),
      reflectionCompletion: percent(reflected, events.length),
      tenDayConsistency: percent(activeDates.size, data.model.consistencyWindowDays)
    };
    const score = Object.entries(data.model.weights).reduce((sum, [key, weight]) => sum + components[key] * weight, 0);
    return { ...components, score, attempts: events.length, correct, reviews: reviews.length, reviewCorrect, reflected, activeDays: activeDates.size };
  }

  function componentRows(metrics) {
    const labels = {
      accuracy: "Practice accuracy",
      activeTopicCoverage: "Active-topic coverage",
      reviewRetention: "Scheduled-review retention",
      reflectionCompletion: "Reflection completion",
      tenDayConsistency: "10-day consistency"
    };
    return Object.entries(data.model.weights).map(([key, weight]) => ({ key, label: labels[key], value: metrics[key], weight, contribution: metrics[key] * weight }));
  }

  function toast(message) {
    clearTimeout(toastTimer);
    toastNode.textContent = message;
    toastNode.classList.add("show");
    toastTimer = setTimeout(() => toastNode.classList.remove("show"), 2600);
  }

  function renderNav() {
    const markup = navItems.map(([id, iconId, label]) => `<button type="button" class="nav-link" data-view="${id}" ${state.view === id ? 'aria-current="page"' : ""}>${icon(iconId)}<span>${label}</span></button>`).join("");
    document.getElementById("side-nav").innerHTML = markup;
    document.getElementById("mobile-nav").innerHTML = markup;
    document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.view)));
  }

  function navigate(view, options = {}) {
    if (!validViews.includes(view)) return;
    state.view = view;
    saveState();
    if (location.hash !== `#${view}`) history.pushState(null, "", `#${view}`);
    render();
    if (options.focus !== false) main.focus({ preventScroll: true });
  }

  function metricCard(label, value, detail) {
    return `<article class="card metric-card"><small>${label}</small><strong>${value}</strong><span>${detail}</span></article>`;
  }

  function progress(topic) {
    const value = Math.round(percent(topic.checkpointsDone, topic.checkpointsTotal));
    return `<div><div class="progress-meta"><span>${topic.checkpointsDone} of ${topic.checkpointsTotal} checkpoints</span><strong>${value}%</strong></div><div class="progress-track" role="progressbar" aria-label="${esc(topic.title)} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><div class="progress-fill" style="width:${value}%"></div></div></div>`;
  }

  function renderToday() {
    const metrics = calculateMetrics();
    const activeTopic = topicById(data.model.activeTopicId);
    const firstResource = data.resources.find((resource) => resource.topicId === activeTopic.id);
    main.innerHTML = `<div class="page-stack">
      <section class="hero-grid" aria-label="Today overview">
        <article class="card hero-card">
          <p class="eyebrow">Thursday · ${formatDate(data.asOf)}</p>
          <h2>Build the invariant before you write the loop.</h2>
          <p>Your next session continues arrays and sliding windows. The lesson, reflection, and source record stay connected so progress is easy to audit.</p>
          <div class="hero-meta"><span>${icon("i-path")} ${esc(activeTopic.title)}</span><span>${icon("i-code")} 12–18 min</span><span>${icon("i-database")} Local event log on</span></div>
          <div class="button-row">
            <button class="button primary-on-dark" type="button" data-go-practice>Continue practice ${icon("i-arrow")}</button>
            <button class="button ghost-on-dark" type="button" data-go-path>View learning path</button>
          </div>
        </article>
        <article class="card score-card">
          <div class="score-row"><div class="score-ring" style="--score:${Math.round(metrics.score)}"><strong>${Math.round(metrics.score)}</strong></div><div class="score-copy"><h2>${data.model.name}</h2><p>Five visible components · updated from ${metrics.attempts} demo events</p></div></div>
          <p class="score-note">Practice prioritization only — not an employability or interview-outcome prediction. <button class="text-button" type="button" data-open-methodology>See formula</button></p>
        </article>
      </section>

      <section class="metric-grid" aria-label="Learning metrics">
        ${metricCard("Practice accuracy", `${Math.round(metrics.accuracy)}%`, `${metrics.correct} correct · ${metrics.attempts} attempts`)}
        ${metricCard("Review retention", `${Math.round(metrics.reviewRetention)}%`, `${metrics.reviewCorrect} correct · ${metrics.reviews} scheduled reviews`)}
        ${metricCard("Reflection coverage", `${Math.round(metrics.reflectionCompletion)}%`, `${metrics.reflected} saved · ${metrics.attempts} attempts`)}
        ${metricCard("10-day consistency", `${metrics.activeDays}/${data.model.consistencyWindowDays}`, "Unique active days in evaluation window")}
      </section>

      <section class="content-grid">
        <article class="card card-pad session-card">
          <div class="card-head"><div><p class="eyebrow">Current focus</p><h2>${esc(activeTopic.title)}</h2><p>${esc(activeTopic.description)}</p></div><span class="pill active">In progress</span></div>
          ${progress(activeTopic)}
          <div class="session-title"><span class="session-index">05</span><div><h3>Sliding-window invariant</h3><p>Explain when the left boundary moves, then test the rule on one counterexample.</p></div></div>
          <button class="button" type="button" data-go-practice>Open today’s practice ${icon("i-arrow")}</button>
        </article>
        <aside class="card card-pad">
          <div class="card-head"><div><h2>Recommended next</h2><p>Matched to the active topic and source registry.</p></div></div>
          <div class="insight-list">
            <div class="insight"><span class="insight-icon">${icon("i-library")}</span><div><strong>${esc(firstResource.title)}</strong><p>${esc(firstResource.provider)} · ${firstResource.minutes} min</p></div></div>
            <div class="insight"><span class="insight-icon">${icon("i-journal")}</span><div><strong>Review your window rule</strong><p>One saved reflection names the left-boundary invariant.</p></div></div>
            <div class="insight"><span class="insight-icon">${icon("i-info")}</span><div><strong>Why this appears</strong><p>Active topic + incomplete checkpoints + recent error pattern.</p></div></div>
          </div>
          <div class="button-row"><button class="button secondary" type="button" data-go-library>Open source-backed library</button></div>
        </aside>
      </section>
    </div>`;
    main.querySelectorAll("[data-go-practice]").forEach((button) => button.addEventListener("click", () => navigate("practice")));
    main.querySelector("[data-go-path]").addEventListener("click", () => navigate("path"));
    main.querySelector("[data-go-library]").addEventListener("click", () => navigate("library"));
  }

  function renderPath() {
    main.innerHTML = `<div class="page-stack">
      <header class="section-intro"><div><p class="eyebrow">Curriculum synthesis</p><h2>A foundation-first path with traceable sources</h2><p>The taxonomy combines CS2023 core outcomes with MIT 6.006 scope and sequence. This order is a product design decision, not a claim that every program must teach topics identically.</p></div><div class="status-key"><span class="pill complete">Complete</span><span class="pill active">Active</span><span class="pill next">Up next</span><span class="pill">Locked</span></div></header>
      <section class="roadmap" aria-label="Algorithm learning path">
        ${data.topics.map((topic) => {
          const pct = Math.round(percent(topic.checkpointsDone, topic.checkpointsTotal));
          const node = topic.status === "complete" ? icon("i-check") : topic.status === "locked" ? icon("i-lock") : String(topic.order).padStart(2, "0");
          return `<article class="roadmap-item ${topic.status}"><span class="roadmap-node">${node}</span><div class="roadmap-copy"><h3>${esc(topic.title)}</h3><p>${esc(topic.description)}</p></div><div class="roadmap-progress"><strong>${pct}% · ${topic.checkpointsDone}/${topic.checkpointsTotal}</strong><small>${topic.sourceIds.map(esc).join(" · ")}</small></div></article>`;
        }).join("")}
      </section>
      <aside class="card card-pad"><div class="card-head"><div><h2>Evidence boundary</h2><p>CS2023 defines foundational knowledge; MIT provides one coherent course sequence. AlgoFlow’s checkpoint counts, ordering, and unlock rules remain product hypotheses to validate with learners and instructors.</p></div><button class="button secondary" type="button" data-open-methodology>Review sources</button></div></aside>
    </div>`;
  }

  function renderPractice() {
    const item = data.practiceItem;
    const selected = state.selectedAnswer;
    const submitted = state.answerSubmitted;
    main.innerHTML = `<div class="page-stack">
      <header class="section-intro"><div><p class="eyebrow">Practice · ${esc(topicById(item.topicId).short)}</p><h2>${esc(item.title)}</h2><p>Commit to the invariant first. The demo records only local interaction data and can export it for analysis.</p></div><span class="pill warning">Illustrative item</span></header>
      <section class="content-grid">
        <article class="card question-card">
          <div class="card-head"><div><p class="eyebrow">Concept check</p><h2>Choose the next valid move</h2></div><span class="pill">1 of 1</span></div>
          <p class="prompt">${esc(item.prompt)}</p>
          <form id="practice-form">
            <fieldset class="option-list"><legend class="visually-hidden">Answer options</legend>
              ${item.options.map((option, index) => {
                let className = "option";
                if (selected === index) className += " selected";
                if (submitted && index === item.correctIndex) className += " correct";
                if (submitted && selected === index && selected !== item.correctIndex) className += " incorrect";
                return `<label class="${className}"><input type="radio" name="answer" value="${index}" ${selected === index ? "checked" : ""} ${submitted ? "disabled" : ""}><span>${esc(option)}</span></label>`;
              }).join("")}
            </fieldset>
            ${submitted ? `<div class="feedback" role="status"><strong>${selected === item.correctIndex ? "Correct — the invariant is restored." : "Not quite — restore the invariant before updating the best length."}</strong><p>${esc(item.explanation)}</p></div>` : ""}
            <div class="button-row">${submitted ? `<button class="button secondary" type="button" data-try-again>Try again</button>` : `<button class="button" type="submit" ${selected === null ? "disabled" : ""}>Check answer</button>`}</div>
          </form>
        </article>
        <aside class="card card-pad">
          <div class="card-head"><div><h2>After the attempt</h2><p>Reflection is stored locally and becomes part of the exportable event record.</p></div></div>
          <form id="reflection-form" class="page-stack">
            <fieldset class="field"><legend>Confidence</legend><div class="confidence-row">${[[1,"Low"],[2,"Developing"],[3,"Strong"]].map(([value,label]) => `<label class="confidence-option"><input type="radio" name="confidence" value="${value}" ${value === 2 ? "checked" : ""}><span>${label}</span></label>`).join("")}</div></fieldset>
            <div class="field"><label for="reflection-note">What rule will you reuse?</label><textarea id="reflection-note" name="note" maxlength="500" placeholder="Name the invariant or decision rule in your own words." ${submitted ? "" : "disabled"}></textarea></div>
            <button class="button" type="submit" ${submitted ? "" : "disabled"}>Save reflection</button>
          </form>
        </aside>
      </section>
    </div>`;

    main.querySelectorAll('input[name="answer"]').forEach((input) => input.addEventListener("change", () => {
      state.selectedAnswer = Number(input.value);
      saveState();
      renderPractice();
    }));
    main.querySelector("#practice-form").addEventListener("submit", (event) => {
      event.preventDefault();
      if (state.selectedAnswer === null) return;
      state.answerSubmitted = true;
      saveState();
      renderPractice();
      toast("Attempt recorded locally. Add a reflection to complete the loop.");
    });
    const retry = main.querySelector("[data-try-again]");
    if (retry) retry.addEventListener("click", () => {
      state.selectedAnswer = null;
      state.answerSubmitted = false;
      saveState();
      renderPractice();
    });
    main.querySelector("#reflection-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const note = String(form.get("note") || "").trim();
      if (!note) {
        document.getElementById("reflection-note").focus();
        toast("Add a short reusable rule before saving.");
        return;
      }
      const now = new Date().toISOString();
      state.reflections.unshift({ id: `RF-${Date.now()}`, topicId: item.topicId, problem: item.title, savedAt: now, confidence: Number(form.get("confidence")), note });
      state.learningEvents.push({
        event_id: `E-${Date.now()}`, occurred_at: now, session_id: `LOCAL-${Date.now()}`, learner_id: "LOCAL-DEMO", activity_type: "practice", topic_id: item.topicId, item_id: item.id, difficulty: 2, attempt_no: 1, correct: state.selectedAnswer === item.correctIndex ? 1 : 0, hint_used: 0, duration_sec: null, confidence: Number(form.get("confidence")), reflection_saved: 1, is_review: 0
      });
      state.selectedAnswer = null;
      state.answerSubmitted = false;
      saveState();
      toast("Reflection saved. The readiness estimate now uses the new local event.");
      navigate("journal");
    });
  }

  function renderJournal() {
    const query = state.journalQuery.trim().toLowerCase();
    const reflections = state.reflections.filter((reflection) => `${reflection.problem} ${reflection.note} ${topicById(reflection.topicId)?.title || ""}`.toLowerCase().includes(query));
    main.innerHTML = `<div class="page-stack">
      <header class="section-intro"><div><p class="eyebrow">Reflection archive</p><h2>Turn solved problems into reusable rules</h2><p>Search by problem, topic, or wording. Entries are stored only in this browser prototype.</p></div><button class="button secondary" type="button" data-export-reflections>${icon("i-download")} Export JSON</button></header>
      <div class="toolbar"><label class="search-wrap"><span class="visually-hidden">Search reflections</span>${icon("i-search")}<input id="journal-search" type="search" value="${esc(state.journalQuery)}" placeholder="Search reflections"></label></div>
      <section class="reflection-list" aria-live="polite">
        ${reflections.length ? reflections.map((reflection) => `<article class="reflection-card"><header><div><h3>${esc(reflection.problem)}</h3><div class="meta-line"><span>${esc(topicById(reflection.topicId)?.title || reflection.topicId)}</span><span>${formatDateTime(reflection.savedAt)}</span></div></div><span class="pill active">Confidence ${reflection.confidence}/3</span></header><p>“${esc(reflection.note)}”</p></article>`).join("") : `<div class="empty-state"><strong>No reflections match that search.</strong>Try a topic such as “arrays” or clear the field.</div>`}
      </section>
    </div>`;
    document.getElementById("journal-search").addEventListener("input", (event) => { state.journalQuery = event.target.value; saveState(); renderJournal(); document.getElementById("journal-search").focus(); });
    main.querySelector("[data-export-reflections]").addEventListener("click", () => downloadJson("algoflow-reflections.json", state.reflections));
  }

  function renderLibrary() {
    const query = state.libraryQuery.trim().toLowerCase();
    const selectedTopic = state.libraryTopic;
    const resources = data.resources.filter((resource) => {
      const topic = topicById(resource.topicId);
      const matchesTopic = selectedTopic === "all" || resource.topicId === selectedTopic;
      const matchesQuery = `${resource.title} ${resource.provider} ${resource.format} ${topic?.title || ""}`.toLowerCase().includes(query);
      return matchesTopic && matchesQuery;
    });
    main.innerHTML = `<div class="page-stack">
      <header class="section-intro"><div><p class="eyebrow">Source-backed library</p><h2>Every recommendation has a provenance record</h2><p>Official curricula, university course materials, official language documentation, and peer-reviewed learning research are separated from demo learner activity.</p></div><button class="button secondary" type="button" data-open-methodology>View source registry</button></header>
      <div class="toolbar"><label class="search-wrap"><span class="visually-hidden">Search resources</span>${icon("i-search")}<input id="library-search" type="search" value="${esc(state.libraryQuery)}" placeholder="Search titles, providers, or formats"></label><label><span class="visually-hidden">Filter by topic</span><select id="library-topic" class="filter-select"><option value="all">All topics</option>${data.topics.map((topic) => `<option value="${topic.id}" ${selectedTopic === topic.id ? "selected" : ""}>${esc(topic.short)}</option>`).join("")}</select></label></div>
      <section class="resource-list" aria-live="polite">
        ${resources.length ? resources.map((resource) => {
          const source = sourceById(resource.sourceId);
          return `<article class="resource-card"><header><div><h3>${esc(resource.title)}</h3><div class="meta-line"><span>${esc(topicById(resource.topicId).title)}</span><span>${esc(resource.provider)}</span></div></div><span class="pill">${esc(resource.format)}</span></header><p>${esc(source.use)}. Accessed ${formatDate(source.accessed)}.</p><div class="resource-actions"><span class="meta-line"><span>${resource.minutes} min</span><span>${esc(resource.level)}</span><span>${resource.sourceId}</span></span><a class="source-link" href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">Open source ${icon("i-arrow")}</a></div></article>`;
        }).join("") : `<div class="empty-state"><strong>No resources match those filters.</strong>Try another topic or clear the search.</div>`}
      </section>
    </div>`;
    document.getElementById("library-search").addEventListener("input", (event) => { state.libraryQuery = event.target.value; saveState(); renderLibrary(); document.getElementById("library-search").focus(); });
    document.getElementById("library-topic").addEventListener("change", (event) => { state.libraryTopic = event.target.value; saveState(); renderLibrary(); });
  }

  function renderMethodology() {
    const metrics = calculateMetrics();
    const rows = componentRows(metrics);
    const formula = rows.map((row) => `${row.weight.toFixed(2)}×${row.label.replace(/ .*/, "")}`).join(" + ");
    document.getElementById("methodology-content").innerHTML = `
      <section class="dialog-section"><h3>What the score means</h3><p>${esc(data.model.warning)}</p><div class="formula">score = ${formula}<br>current demo = ${rows.map((row) => `${row.weight.toFixed(2)}×${row.value.toFixed(1)}`).join(" + ")} = ${metrics.score.toFixed(1)} → ${Math.round(metrics.score)}</div></section>
      <section class="dialog-section"><h3>Current component values</h3><table class="component-table"><thead><tr><th>Component</th><th>Value</th><th>Weight</th><th>Points</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${esc(row.label)}</td><td>${row.value.toFixed(1)}%</td><td>${Math.round(row.weight * 100)}%</td><td>${row.contribution.toFixed(1)}</td></tr>`).join("")}</tbody></table><p><strong>Validation status:</strong> ${esc(data.model.validationStatus)}.</p></section>
      <section class="dialog-section"><h3>Data layers</h3><p><strong>Source-backed:</strong> curriculum topics, resource links, measurement references, industry context, and accessibility guidance.</p><p><strong>Illustrative:</strong> demo learner events, progress, reflections, and the resulting score. These records prove the pipeline but are not research findings.</p><p><strong>First-party collection:</strong> new practice attempts and reflections entered in this prototype are stored locally and can be exported below.</p><div class="button-row"><button class="button" type="button" data-export-csv>${icon("i-download")} Export events CSV</button><button class="button secondary" type="button" data-export-json>Export events JSON</button><button class="button danger" type="button" data-reset-demo>Reset local demo</button></div></section>
      <section class="dialog-section"><h3>Research and standards registry</h3><ul class="source-list">${data.sources.map((source) => `<li><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${source.id} · ${esc(source.title)}</a><br><span>${esc(source.author)} · ${source.year} · ${esc(source.type)} · used for ${esc(source.use).toLowerCase()}</span></li>`).join("")}</ul></section>`;
    dialog.querySelector("[data-export-csv]").addEventListener("click", () => downloadCsv("algoflow-learning-events.csv", state.learningEvents));
    dialog.querySelector("[data-export-json]").addEventListener("click", () => downloadJson("algoflow-learning-events.json", state.learningEvents));
    dialog.querySelector("[data-reset-demo]").addEventListener("click", () => {
      state = structuredClone(defaultState);
      saveState();
      dialog.close();
      applyTheme();
      render();
      toast("Local changes cleared; the documented demo dataset is restored.");
    });
  }

  function formatDate(value) {
    const date = new Date(`${String(value).slice(0, 10)}T12:00:00`);
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
  }

  function formatDateTime(value) {
    const date = new Date(value);
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(date);
  }

  function downloadJson(filename, value) {
    downloadBlob(filename, JSON.stringify(value, null, 2), "application/json");
  }

  function downloadCsv(filename, rows) {
    if (!rows.length) return;
    const columns = data.learningEventColumns;
    const cell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const csv = [columns.map(cell).join(","), ...rows.map((row) => columns.map((column) => cell(row[column])).join(","))].join("\r\n");
    downloadBlob(filename, csv, "text/csv;charset=utf-8");
  }

  function downloadBlob(filename, content, type) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast(`${filename} exported.`);
  }

  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    const toggle = document.getElementById("theme-toggle");
    toggle.innerHTML = state.theme === "dark" ? icon("i-sun") : icon("i-moon");
    toggle.setAttribute("aria-label", state.theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }

  function render() {
    const labels = { today: "Today", path: "Learning path", practice: "Practice", journal: "Reflection journal", library: "Resource library" };
    pageTitle.textContent = labels[state.view];
    document.title = `${labels[state.view]} — AlgoFlow`;
    renderNav();
    if (state.view === "today") renderToday();
    if (state.view === "path") renderPath();
    if (state.view === "practice") renderPractice();
    if (state.view === "journal") renderJournal();
    if (state.view === "library") renderLibrary();
    document.querySelectorAll("[data-open-methodology]").forEach((button) => button.addEventListener("click", () => { renderMethodology(); dialog.showModal(); }));
  }

  document.getElementById("theme-toggle").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    saveState();
    applyTheme();
  });
  document.querySelector("[data-close-dialog]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  window.addEventListener("popstate", () => {
    const target = location.hash.slice(1);
    if (validViews.includes(target)) { state.view = target; saveState(); render(); }
  });

  const initialHash = location.hash.slice(1);
  if (validViews.includes(initialHash)) state.view = initialHash;
  applyTheme();
  render();
}());
