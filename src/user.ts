interface Project {
  id: string;
  name: string;
  desc: string;
  endDate: string;
  status: "pending" | "completed";
}

const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

async function getAssignedProject() {
  const res = await fetch(`http://localhost:3000/users/${user.id}/project`);
  const data = await res.json();
  return data.project;
}

async function initializeView() {
  const message = document.getElementById("message")!;
  const list = document.getElementById("project-list")!;

  const project = await getAssignedProject();

  if (!project) {
    message.textContent = "No project assigned to you yet.";
    list.innerHTML = "";
    return;
  }

  message.textContent = "";
  list.innerHTML = `
    <div class="card">
      <strong>${project.name}</strong><br/>
      ${project.desc}<br/>
      Due: ${project.endDate}<br/>
      Status: ${project.status}<br/>
      ${project.status === "pending" ? '<button id="completeBtn">Complete</button>' : ""}
    </div>
  `;

  document.getElementById("completeBtn")?.addEventListener("click", async () => {
    const res = await fetch(`http://localhost:3000/projects/${project.id}/complete, {
      method: "PATCH",
    }`);

    if (res.ok) {
      alert("Marked as complete");
      initializeView();
    }
  });
}

document.getElementById("btnViewProject")?.addEventListener("click", initializeView);

document.getElementById("btnLogout")?.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});

initializeView();