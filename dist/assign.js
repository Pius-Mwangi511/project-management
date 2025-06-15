"use strict";
var _a;
function loadDropdowns() {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const userSelect = document.getElementById("users");
    const projectSelect = document.getElementById("projects");
    userSelect.innerHTML = '<option value="">Users</option>';
    projectSelect.innerHTML = '<option value="">Projects</option>';
    users.forEach(user => {
        if (!user.assignedProject) {
            userSelect.innerHTML += `<option value="${user.email}">${user.firstname} ${user.lastname}</option>`;
        }
    });
    projects.forEach(project => {
        if (!projectAssigned(project.id)) {
            projectSelect.innerHTML += `<option value="${project.id}">${project.name}</option>`;
        }
    });
}
function projectAssigned(projectId) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.some(user => user.assignedProject === projectId);
}
(_a = document.getElementById("assignBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const userEmail = document.getElementById("users").value;
    const projectId = document.getElementById("projects").value;
    if (!userEmail || !projectId)
        return alert("Please select both user and project");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const index = users.findIndex(u => u.email === userEmail);
    if (index !== -1) {
        users[index].assignedProject = projectId;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Project assigned successfully.");
        loadDropdowns();
    }
});
