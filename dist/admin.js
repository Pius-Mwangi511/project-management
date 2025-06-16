"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`http://localhost:3000/users`);
        return yield res.json();
    });
}
function fetchProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`http://localhost:3000/projects`);
        return yield res.json();
    });
}
function loadProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        const container = document.querySelector(".all-projects");
        container.innerHTML = "";
        const projects = yield fetchProjects();
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
    });
}
function populateUserDropdown() {
    return __awaiter(this, void 0, void 0, function* () {
        const dropdown = document.getElementById("users");
        dropdown.innerHTML = '<option value="">Users</option>';
        const users = yield fetchUsers();
        users.forEach(user => {
            if (!user.assignedProject) {
                const option = document.createElement("option");
                option.value = user.id;
                option.textContent = user.name;
                dropdown.appendChild(option);
            }
        });
    });
}
function populateProjectDropdown() {
    return __awaiter(this, void 0, void 0, function* () {
        const dropdown = document.getElementById("projects");
        dropdown.innerHTML = '<option value="">Projects</option>';
        const projects = yield fetchProjects();
        projects.forEach(project => {
            const option = document.createElement("option");
            option.value = project.id;
            option.textContent = project.name;
            dropdown.appendChild(option);
        });
    });
}
(_a = document.getElementById("assignBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = document.getElementById("users").value;
    const projectId = document.getElementById("projects").value;
    if (!userId || !projectId)
        return alert("Select both user and project");
    const res = yield fetch(`http://localhost:3000/users/assign, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, projectId }),
  }`);
    const data = yield res.json();
    if (!res.ok)
        return alert(data.message || "Assignment failed");
    alert("Project assigned successfully");
    populateUserDropdown();
    populateProjectDropdown();
}));
(_b = document.getElementById("saveProject")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const name = document.getElementById("projectName").value;
    const desc = document.getElementById("projectDesc").value;
    const endDate = document.getElementById("endDate").value;
    if (!name || !desc || !endDate)
        return alert("Fill all fields");
    const res = yield fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, desc, endDate }),
    });
    const data = yield res.json();
    if (!res.ok)
        return alert(data.message || "Failed to save project");
    alert("Project saved");
    loadProjects();
    populateProjectDropdown();
}));
