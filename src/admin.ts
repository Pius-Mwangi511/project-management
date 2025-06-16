interface Project {
  id: string;
  name: string;
  desc: string;
  endDate: string;
  status: "pending" | "completed";
}

interface User {
  id: string;
  name: string;
  email: string;
  assignedProject?: string;
}



async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`http://localhost:3000/users`);
  return await res.json();
}

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`http://localhost:3000/projects`);
  return await res.json();
}

async function loadProjects() {
  const container = document.querySelector(".all-projects")!;
  container.innerHTML = "";

  const projects = await fetchProjects();

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "projects-card";
    card.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.desc}</p>
      <p><strong>Due:</strong> ${project.endDate}</p>
    `;
    container.appendChild(card);
  });
}

async function populateUserDropdown() {
  const dropdown = document.getElementById("users") as HTMLSelectElement;
  dropdown.innerHTML = '<option value="">Users</option>';

  const users = await fetchUsers();
  users.forEach(user => {
    if (!user.assignedProject) {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name;
      dropdown.appendChild(option);
    }
  });
}

async function populateProjectDropdown() {
  const dropdown = document.getElementById("projects") as HTMLSelectElement;
  dropdown.innerHTML = '<option value="">Projects</option>';

  const projects = await fetchProjects();
  projects.forEach(project => {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.name;
    dropdown.appendChild(option);
  });
}

document.getElementById("assignBtn")?.addEventListener("click", async () => {
  const userId = (document.getElementById("users") as HTMLSelectElement).value;
  const projectId = (document.getElementById("projects") as HTMLSelectElement).value;

  if (!userId || !projectId) return alert("Select both user and project");

  const res = await fetch(`http://localhost:3000/users/assign, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, projectId }),
  }`);

  const data = await res.json();
  if (!res.ok) return alert(data.message || "Assignment failed");

  alert("Project assigned successfully");
  populateUserDropdown();
  populateProjectDropdown();
});

document.getElementById("saveProject")?.addEventListener("click", async () => {
  const name = (document.getElementById("projectName") as HTMLInputElement).value;
  const desc = (document.getElementById("projectDesc") as HTMLInputElement).value;
  const endDate = (document.getElementById("endDate") as HTMLInputElement).value;

  if (!name || !desc || !endDate) return alert("Fill all fields");

  const res = await fetch("http://localhost:3000/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, desc, endDate }),
  });

  const data = await res.json();
  if (!res.ok) return alert(data.message || "Failed to save project");

  alert("Project saved");
  loadProjects();
  populateProjectDropdown();
});