function loadDropdowns() {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const projects: Project[] = JSON.parse(localStorage.getItem("projects") || "[]");

  const userSelect = document.getElementById("users") as HTMLSelectElement;
  const projectSelect = document.getElementById("projects") as HTMLSelectElement;

  userSelect.innerHTML = '<option value="">Users</option>';
  projectSelect.innerHTML = '<option value="">Projects</option>';

  users.forEach(user => {
    if (!user.assignedProject) {
      userSelect.innerHTML += `<option value="${user.email}">${user.name}</option>`;
    }
  });

  projects.forEach(project => {
    if (!projectAssigned(project.id)) {
      projectSelect.innerHTML += `<option value="${project.id}">${project.name}</option>`;
    }
  });
}

function projectAssigned(projectId: string): boolean {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  return users.some(user => user.assignedProject === projectId);
}

document.getElementById("assignBtn")?.addEventListener("click", () => {
  const userEmail = (document.getElementById("users") as HTMLSelectElement).value;
  const projectId = (document.getElementById("projects") as HTMLSelectElement).value;

  if (!userEmail || !projectId) return alert("Please select both user and project");

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const index = users.findIndex(u => u.email === userEmail);
  if (index !== -1) {
    users[index].assignedProject = projectId;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Project assigned successfully.");
    loadDropdowns();
  }
});