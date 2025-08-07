let certifications = [];

function addCertification() {
  const input = document.getElementById("cert-input");
  const name = input.value.trim();

  if (name === "") return;

  certifications.push({ name, done: false });
  input.value = "";
  renderCertifications();
}

function toggleCertification(index) {
  certifications[index].done = !certifications[index].done;
  renderCertifications();
}

function renderCertifications() {
  const certList = document.getElementById("cert-list");
  certList.innerHTML = "";

  certifications.forEach((cert, index) => {
    const certItem = document.createElement("div");
    certItem.className = "cert-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = cert.done;
    checkbox.addEventListener("change", () => toggleCertification(index));

    const label = document.createElement("span");
    label.textContent = cert.name;
    if (cert.done) label.style.textDecoration = "line-through";

    certItem.appendChild(checkbox);
    certItem.appendChild(label);
    certList.appendChild(certItem);
  });

  updateProgress();
}

function updateProgress() {
  const total = certifications.length;
  const completed = certifications.filter(c => c.done).length;

  const progress = total ? Math.round((completed / total) * 100) : 0;
  document.getElementById("cert-progress").value = progress;
  document.getElementById("cert-percent").textContent = `${progress}%`;
}
