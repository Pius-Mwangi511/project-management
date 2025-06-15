import { getProjects } from "./shared.js";
function saveProject(project) {
    const projects = getProjects();
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
}
function renderProjectList() {
    const projects = getProjects();
    const container = document.querySelector('.all-projects');
    if (!container)
        return;
    container.innerHTML = '';
    projects.forEach(p => {
        const div = document.createElement('div');
        div.innerHTML = `
      <p>${p.name}</p>
      <button onclick="editProject('${p.id}')">Edit</button>
      <button onclick="deleteProject('${p.id}')">Delete</button>
    `;
        container.appendChild(div);
    });
}
// 3. Main UI logic in window.onload
window.onload = () => {
    var _a;
    const sectionDashboard = document.getElementById('dashboard');
    const sectionAdd = document.getElementById('add-projects');
    const sectionAssign = document.getElementById('assign-project');
    const btnDashboard = document.getElementById('btnDashboard');
    const btnAdd = document.getElementById('btnAdd');
    const btnAddCard = document.getElementById('cardAdd');
    const btnAssign = document.getElementById('btnAssign');
    const btnAssignCard = document.getElementById('cardAssign');
    const btnLogout = document.getElementById('btnLogout');
    function showSection(section) {
        sectionDashboard.style.display = 'none';
        sectionAdd.style.display = 'none';
        sectionAssign.style.display = 'none';
        section.style.display = 'block';
    }
    // Set default view
    showSection(sectionDashboard);
    console.log("Admin page loaded");
    // Button listeners
    btnDashboard.addEventListener('click', () => {
        showSection(sectionDashboard);
    });
    btnAdd.addEventListener('click', () => {
        showSection(sectionAdd);
    });
    btnAddCard.addEventListener('click', () => {
        showSection(sectionAdd);
    });
    btnAssign.addEventListener('click', () => {
        showSection(sectionAssign);
    });
    btnAssignCard.addEventListener('click', () => {
        showSection(sectionAssign);
    });
    btnLogout === null || btnLogout === void 0 ? void 0 : btnLogout.addEventListener('click', () => {
        localStorage.removeItem('activeUser');
        window.location.href = 'login.html';
    });
    // Add project save listener
    (_a = document.getElementById('saveProject')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const name = document.getElementById('projectName').value;
        const description = document.getElementById('projectDesc').value;
        const endDate = document.getElementById('endDate').value;
        const newProject = {
            id: crypto.randomUUID(),
            name,
            description,
            endDate
        };
        saveProject(newProject);
        alert('Project added successfully.');
        renderProjectList();
    });
    // Render existing projects
    renderProjectList();
};
