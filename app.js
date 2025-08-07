// app.js

// Only run this code if we're on the tracker page
if (document.querySelector('#skillForm')) {
  const skillForm = document.getElementById('skillForm');
  const skillName = document.getElementById('skillName');
  const skillProgress = document.getElementById('skillProgress');
  const skillList = document.getElementById('skillList');

  // Load saved skills from localStorage
  let skills = JSON.parse(localStorage.getItem('skills')) || [];

  function saveSkills() {
    localStorage.setItem('skills', JSON.stringify(skills));
  }

  function renderSkills() {
    skillList.innerHTML = '';
    skills.forEach((skill, index) => {
      const skillCard = document.createElement('div');
      skillCard.classList.add('skill-card');
      skillCard.innerHTML = `
        <h3>${skill.name}</h3>
        <div class="progress-bar">
          <div class="progress" style="width: ${skill.progress}%;">
            ${skill.progress}%
          </div>
        </div>
        <button onclick="deleteSkill(${index})">🗑️ Delete</button>
      `;
      skillList.appendChild(skillCard);
    });
  }

  function deleteSkill(index) {
    skills.splice(index, 1);
    saveSkills();
    renderSkills();
  }

  window.deleteSkill = deleteSkill;

  skillForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newSkill = {
      name: skillName.value.trim(),
      progress: Number(skillProgress.value)
    };
    if (newSkill.name && newSkill.progress >= 0 && newSkill.progress <= 100) {
      skills.push(newSkill);
      saveSkills();
      renderSkills();
      skillForm.reset();
    }
  });

  renderSkills();
}
