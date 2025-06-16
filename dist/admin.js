"use strict";
var _a, _b, _c, _d, _e;
console.log("admin is loaded");
function showSection(sectionId) {
    const sections = ["dashboard", "add-projects", "assign-project"];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el)
            el.style.display = (id === sectionId) ? "block" : "none";
    });
}
function loadProjects() {
    const container = document.querySelector(".all-projects");
    container.innerHTML = "";
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    console.log("Rendering projects", projects);
    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "projects-card"; //for css cards
        card.innerHTML = `
        <h3>${project.name}</h3> 
         <p>${project.desc}<p>
        <p><strong> Due: </strong> ${project.endDate} </p>
        <button onclick="editProject('${project.id}')">Edit</button>
        <button onclick="deleteProject('${project.id}')">Delete</button>
      `;
        container.appendChild(card);
    });
}
function populateUserDropdown() {
    const userDropdown = document.getElementById("users");
    userDropdown.innerHTML = `<option value="">Users</option>`; // reset
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.forEach((user) => {
        if (user.role === "user") { // Only show users not admin
            const option = document.createElement("option");
            option.value = user.id;
            option.textContent = user.name;
            userDropdown.appendChild(option);
        }
    });
}
function populateProjectDropdown() {
    const projectDropdown = document.getElementById("projects");
    projectDropdown.innerHTML = `<option value="">Projects</option>`; // reset
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    projects.forEach(project => {
        const option = document.createElement("option");
        option.value = project.id;
        option.textContent = project.name;
        projectDropdown.appendChild(option);
    });
}
// Add event listeners for dashboard buttons
(_a = document.getElementById("btnAdd")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    console.log("Add button clicked");
    showSection("add-projects");
    loadProjects();
});
(_b = document.getElementById("btnAssign")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    console.log("Assign button clicked");
    showSection("assign-project");
    populateUserDropdown();
    populateProjectDropdown();
});
(_c = document.getElementById("btnDashboard")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    console.log("Dashboard button clicked");
    showSection("dashboard");
});
(_d = document.getElementById("cardAdd")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    console.log("Card Add clicked");
    showSection("add-projects");
    loadProjects();
});
(_e = document.getElementById("cardAssign")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    console.log("Card Assign clicked");
    showSection("assign-project");
    populateUserDropdown();
    populateProjectDropdown();
});
const logoutBtn = document.getElementById("btnLogout");
logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener("click", () => {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        localStorage.removeItem("loggedInUser"); //clear the user
        window.location.href = "login.html"; //redirect to login
    }
});
window.editProject = (id) => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const project = projects.find(p => p.id === id);
    if (!project)
        return;
    document.getElementById("projectName").value = project.name;
    document.getElementById("projectDesc").value = project.desc;
    document.getElementById("endDate").value = project.endDate;
    localStorage.setItem("editId", id);
};
window.deleteProject = (id) => {
    let projects = JSON.parse(localStorage.getItem("projects") || "[]");
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem("projects", JSON.stringify(projects));
    loadProjects();
};
document.addEventListener("DOMContentLoaded", () => {
    const saveBtn = document.getElementById("saveProject");
    saveBtn === null || saveBtn === void 0 ? void 0 : saveBtn.addEventListener("click", () => {
        console.log("saved");
        const nameInput = document.getElementById("projectName");
        const descInput = document.getElementById("projectDesc");
        const endDateInput = document.getElementById("endDate");
        const name = (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.trim()) || "";
        const desc = (descInput === null || descInput === void 0 ? void 0 : descInput.value.trim()) || "";
        const endDate = (endDateInput === null || endDateInput === void 0 ? void 0 : endDateInput.value.trim()) || "";
        if (!name || !desc || !endDate) {
            return alert("Fill all the fields");
        }
        let projects = JSON.parse(localStorage.getItem("projects") || "[]");
        const editId = localStorage.getItem("editId");
        if (editId) {
            const index = projects.findIndex((p) => p.id === editId);
            if (index !== -1) {
                // Avoid updating to an already existing name (excluding self)
                const nameExists = projects.some((p, i) => i !== index && p.name.toLowerCase() === name.toLowerCase());
                if (nameExists) {
                    return alert("Another project with this name already exists.");
                }
                projects[index] = Object.assign(Object.assign({}, projects[index]), { name,
                    desc,
                    endDate });
                localStorage.removeItem("editId");
            }
        }
        else {
            // Prevent adding duplicates
            const exists = projects.some(p => p.name.toLowerCase() === name.toLowerCase());
            if (exists) {
                return alert("A project with this name already exists.");
            }
            const newProject = {
                id: Date.now().toString(),
                name,
                desc,
                endDate,
                status: "pending"
            };
            projects.push(newProject);
        }
        localStorage.setItem("projects", JSON.stringify(projects));
        alert("Project saved successfully.");
        // Clear input fields after save
        if (nameInput) {
            nameInput.value = "";
        }
        if (descInput) {
            descInput.value = "";
        }
        if (endDateInput) {
            endDateInput.value = "";
        }
        loadProjects();
        populateProjectDropdown();
    });
});
