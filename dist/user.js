import { getProjects } from "./shared.js";
function loadUserProjects() {
    const currentUser = JSON.parse(localStorage.getItem('activeUser') || '{}');
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const projects = getProjects();
    const container = document.getElementById('project-list');
    const msg = document.getElementById('message');
    const assigned = assignments.find(a => a.userEmail === currentUser.email && a.status === 'assigned');
    if (!assigned) {
        msg.style.display = 'block';
        container.innerHTML = '';
        return;
    }
    msg.style.display = 'none';
    const project = projects.find(p => p.id === assigned.projectId);
    if (!project)
        return;
    container.innerHTML = `
      <div>
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <p>Due: ${project.endDate}</p>
        <button onclick="completeProject('${assigned.projectId}')">Mark as Completed</button>
      </div>
    `;
}
function completeProject(projectId) {
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('activeUser') || '{}');
    const index = assignments.findIndex(a => a.projectId === projectId && a.userEmail === currentUser.email);
    if (index !== -1) {
        assignments[index].status = 'completed';
        localStorage.setItem('assignments', JSON.stringify(assignments));
        alert('Project marked as completed.');
        loadUserProjects();
    }
}
window.onload = loadUserProjects;
window.onload = () => {
    loadUserProjects();
    // Now add all the event listeners here
    const dashboardBtn = document.getElementById('btnDashboard');
    const viewBtn = document.getElementById('btnViewProject');
    // const accountSidebarBtn = document.getElementById('btnAccountSidebar');
    // const accountCardBtn = document.getElementById('btnAccountCard');
    const logoutBtn = document.getElementById('btnLogout');
    dashboardBtn === null || dashboardBtn === void 0 ? void 0 : dashboardBtn.addEventListener('click', () => {
        alert('Viewing dashboard...');
    });
    viewBtn === null || viewBtn === void 0 ? void 0 : viewBtn.addEventListener('click', () => {
        alert('Viewing project...');
        // Example: document.getElementById('view-projects')!.style.display = 'block';
    });
    // accountSidebarBtn?.addEventListener('click', () => {
    //   alert('Sidebar Account clicked');
    // });
    // accountCardBtn?.addEventListener('click', () => {
    //   alert('Card Account clicked');
    // });
    logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('activeUser');
        window.location.href = 'login.html';
    });
};
