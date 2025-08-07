let goals = [];

function addGoal() {
  const input = document.getElementById("goal-input");
  const goalText = input.value.trim();

  if (goalText) {
    goals.push({ text: goalText, completed: false });
    input.value = "";
    renderGoals();
  }
}

function toggleGoal(index) {
  goals[index].completed = !goals[index].completed;
  renderGoals();
}

function renderGoals() {
  const list = document.getElementById("goal-list");
  list.innerHTML = "";

  goals.forEach((goal, index) => {
    const item = document.createElement("div");
    item.className = "goal-item";
    item.innerHTML = `
      <input type="checkbox" ${goal.completed ? "checked" : ""} onchange="toggleGoal(${index})">
      <span class="${goal.completed ? "completed" : ""}">${goal.text}</span>
    `;
    list.appendChild(item);
  });

  updateGoalProgress();
}

function updateGoalProgress() {
  const total = goals.length;
  const completed = goals.filter(goal => goal.completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  document.getElementById("goal-progress").value = percent;
  document.getElementById("goal-percent").innerText = `${percent}%`;
}
