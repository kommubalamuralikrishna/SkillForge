let goals = JSON.parse(localStorage.getItem("goals")) || [];

function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function renderGoals() {
  const grid = document.getElementById("goal-grid");
  grid.innerHTML = "";

  goals.forEach((goal, index) => {
    const card = document.createElement("div");
    card.className = "goal-card";

    // Title
    const title = document.createElement("div");
    title.className = "goal-title";
    title.textContent = goal.name;

    // Progress bar
    const progressBar = document.createElement("div");
    progressBar.className = "card-progress-bar";

    const progress = document.createElement("div");
    progress.className = "card-progress";
    progress.style.width = goal.progress + "%";
    progress.textContent = goal.progress + "%";
    progressBar.appendChild(progress);

    // Update progress input
    const progressInput = document.createElement("input");
    progressInput.type = "number";
    progressInput.min = 0;
    progressInput.max = 100;
    progressInput.value = goal.progress;
    progressInput.className = "update-progress";
    progressInput.onchange = () => updateProgress(index, progressInput.value);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-card";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteGoal(index);

    card.append(title, progressBar, progressInput, deleteBtn);
    grid.appendChild(card);
  });
}

function addGoal() {
  const input = document.getElementById("goal-input");
  const name = input.value.trim();
  if (!name) return;
  goals.push({ name, progress: 0 });
  saveGoals();
  renderGoals();
  input.value = "";
}

function updateProgress(index, value) {
  const progress = Math.min(Math.max(parseInt(value), 0), 100);
  goals[index].progress = progress;
  saveGoals();
  renderGoals();
}

function deleteGoal(index) {
  if (confirm("Delete this goal?")) {
    goals.splice(index, 1);
    saveGoals();
    renderGoals();
  }
}

// Initial render
renderGoals();
