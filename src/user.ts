interface Project {
  id: string;
  name: string;
  desc: string;
  endDate: string
  status: "pending" | "completed";
}

interface User {
  email: string;
  assignedProject?: string;
}
 
// function showSect(sectId: string) {
//   const sect = ["dashboard", "view-projects"];
//   sect.forEach(id => {
//     const element = document.getElementById(id);
//     // if (element) element.style.display = (id === sectId) ? "block" : "none";              
//   });
// }

// Get logged-in user and user list
const user: User = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
const currentUser = users.find(u => u.email === user.email);

// Get DOM elements
// document.getElementById("btnDashboard")?.addEventListener("click", () => {
//   showSect("dashboard");
// });
// document.getElementById("btnViewPoject")?.addEventListener("click", () => {
//   showSect("viewSection");
// });
// 
const message = document.getElementById("message") as HTMLParagraphElement;
const list = document.getElementById("project-list") as HTMLDivElement;
const viewBtn = document.getElementById("btnViewProject") as HTMLButtonElement;
const dashboardBtn = document.getElementById("btnDashboard") as HTMLButtonElement;
const viewSectionBtn = document.getElementById("viewSection") as HTMLButtonElement;
const dashboardSection = document.getElementById("dashboard") as HTMLButtonElement;
const btnLog = document.getElementById("btnLogout") as HTMLButtonElement;


function initializeView() {
  // If user has no assigned project
  if (!currentUser?.assignedProject) {
    message.textContent = "No project assigned to you yet.";
    message.style.display = "block";
    list.innerHTML = "";
    return;
  }

  message.style.display = "none";

  const projects: Project[] = JSON.parse(localStorage.getItem("projects") || "[]");
  const project = projects.find(p => p.id === currentUser.assignedProject);

  if (project) {
    list.innerHTML = `
      <div class="card">
        <strong>${project.name}</strong><br/>
        ${project.desc}<br/>
        Due: ${project.endDate}<br/>
        Status: ${project.status}<br/>
        ${project.status === "pending" ? '<button id="completeBtn">Complete</button>' : ""}
      </div>
    `;

    const completeBtn = document.getElementById("completeBtn");
    completeBtn?.addEventListener("click", () => {
      project.status = "completed";
      localStorage.setItem("projects", JSON.stringify(projects));
      alert("Project marked as complete!");
      viewBtn.click(); // Refresh view
    });
  } else {
    message.textContent = "Assigned project not found.";
    message.style.display = "block";
    list.innerHTML = "";
  }
}

if (viewBtn && dashboardBtn && viewSectionBtn && dashboardSection) {
  viewBtn.addEventListener("click", () => {
    dashboardSection.style.display = "none";
    viewSectionBtn.style.display = "block";
  });
  dashboardBtn.addEventListener("click", () => {
    dashboardSection.style.display = "block";
    viewSectionBtn.style.display = "none";
  });

  initializeView();
}

btnLog.addEventListener("click", () => {
  const confirmLogout = confirm ("Are you sure you want to logout?");

  if (confirmLogout){
    localStorage.removeItem("loggedInUser");//clear the user
    window.location.href = "login.html";//redirect to login
    }
  });
