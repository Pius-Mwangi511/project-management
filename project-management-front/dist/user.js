"use strict";
// Get logged-in user and user list
const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
const users = JSON.parse(localStorage.getItem("users") || "[]");
const currentUser = users.find(u => u.email === user.email);
// Get DOM elements
const message = document.getElementById("message");
const list = document.getElementById("project-list");
const viewBtn = document.getElementById("btnViewProject");
const dashboardBtn = document.getElementById("dashboard");
const viewSectionBtn = document.getElementById("viewSection");
const Dashboard = document.getElementById("btnDashboard");
if (viewBtn && list && message && viewSectionBtn && dashboardBtn) {
    viewBtn.addEventListener("click", () => {
        dashboardBtn.style.display = "none";
        viewSectionBtn.style.display = "block";
        // If user has no assigned project
        if (!(currentUser === null || currentUser === void 0 ? void 0 : currentUser.assignedProject)) {
            message.textContent = "No project assigned to you yet.";
            message.style.display = "block";
            list.innerHTML = "";
            return;
        }
        message.style.display = "none";
        const projects = JSON.parse(localStorage.getItem("projects") || "[]");
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
            completeBtn === null || completeBtn === void 0 ? void 0 : completeBtn.addEventListener("click", () => {
                project.status = "completed";
                localStorage.setItem("projects", JSON.stringify(projects));
                alert("Project marked as complete!");
                viewBtn.click(); // Refresh view
            });
        }
        else {
            message.textContent = "Assigned project not found.";
            message.style.display = "block";
            list.innerHTML = "";
        }
    });
}
