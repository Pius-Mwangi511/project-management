import { Assignment, getProjects, getUsers } from "./shared.js";

function populateDropdowns() {
    const users = getUsers();
    const projects = getProjects();
    const userSelect = document.getElementById('users') as HTMLSelectElement;
    const projectSelect = document.getElementById('projects') as HTMLSelectElement;
  
    users.forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.email;
      opt.textContent = `${u.firstName} ${u.lastName}`;
      userSelect.appendChild(opt);
    });
  
    projects.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.name;
      projectSelect.appendChild(opt);
    });
  }
  
  function assignProject() {
    const user = (document.getElementById('users') as HTMLSelectElement).value;
    const project = (document.getElementById('projects') as HTMLSelectElement).value;
  
    if (!user || !project) return alert('Please select both user and project.');
  
    let assignments: Assignment[] = JSON.parse(localStorage.getItem('assignments') || '[]');
  
    const alreadyAssigned = assignments.some(a => a.userEmail === user);
    if (alreadyAssigned) return alert('User already has a project.');
  
    assignments.push({ userEmail: user, projectId: project, status: 'assigned' });
    localStorage.setItem('assignments', JSON.stringify(assignments));
  
    alert('Project assigned successfully.');
    renderAssignments();
  }
  
  function renderAssignments() {
    const assignments: Assignment[] = JSON.parse(localStorage.getItem('assignments') || '[]');
    const div = document.querySelector('.assigned-projects');
    const projects = getProjects();
    if (!div) return;
  
    div.innerHTML = '';
    assignments.forEach(a => {
      const project = projects.find(p => p.id === a.projectId);
      if (!project) return;
  
      const el = document.createElement('div');
      el.textContent = `User: ${a.userEmail} → Project: ${project.name}`;
      div.appendChild(el);
    });
  }
  
  document.getElementById('assignBtn')?.addEventListener('click', assignProject);
  window.onload = populateDropdowns;