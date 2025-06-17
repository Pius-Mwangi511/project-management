console.log("admin is loaded")
interface Project {
    id: string;
    name: string;
    desc: string;
    endDate: string;
    status: "pending" | "completed";
  }
  
  //saveProject
  function showSection(sectionId: string) {
    const sections = ["dashboard", "add-projects", "assign-project"];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = (id === sectionId) ? "block" : "none";
    });
  }
  
  function loadProjects() {
    const container = document.querySelector(".all-projects")!;
    container.innerHTML = "";
    const projects: Project[] = JSON.parse(localStorage.getItem("projects") || "[]");
  
    projects.forEach(project => {
      const card = document.createElement("div");
      card.className = "projects-card"//for css cards
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
    const userDropdown = document.getElementById("users") as HTMLSelectElement;
    userDropdown.innerHTML = `<option value="">Users</option>`; // reset
  
    const users = JSON.parse(localStorage.getItem("users") || "[]");
  
    users.forEach((user: any) => {
      if (user.role === "user") {// Only show users not admin
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        userDropdown.appendChild(option);
      }
    });
  }

  function populateProjectDropdown() {
    const projectDropdown = document.getElementById("projects") as HTMLSelectElement;
    projectDropdown.innerHTML = `<option value="">Projects</option>`; // reset
  
    const projects: Project[] = JSON.parse(localStorage.getItem("projects") || "[]");
  
    projects.forEach(project => {
      const option = document.createElement("option");
      option.value = project.id;
      option.textContent = project.name;
      projectDropdown.appendChild(option);
    });
  }
  
  // Add event listeners for dashboard buttons
  document.getElementById("btnAdd")?.addEventListener("click", () => {
    console.log("Add button clicked");
    showSection("add-projects");
    loadProjects();
  });
  
  document.getElementById("btnAssign")?.addEventListener("click", () => {
    console.log("Assign button clicked");
    showSection("assign-project");
    populateUserDropdown();
    populateProjectDropdown();
  });
  
  document.getElementById("btnDashboard")?.addEventListener("click", () => {
    console.log("Dashboard button clicked");
    showSection("dashboard");
  });
  
  document.getElementById("cardAdd")?.addEventListener("click", () => {
    console.log("Card Add clicked");
    showSection("add-projects");
    loadProjects();
  });
  
  document.getElementById("cardAssign")?.addEventListener("click", () => {
    console.log("Card Assign clicked");
    showSection("assign-project");
    populateUserDropdown();
    populateProjectDropdown();
  });

  const logoutBtn = document.getElementById("btnLogout");

  logoutBtn?.addEventListener("click", () => {
    const confirmLogout = confirm ("Are you sure you want to logout?");

    if (confirmLogout){
    localStorage.removeItem("loggedInUser");//clear the user
    window.location.href = "login.html";//redirect to login
    }
  });
  
  (window as any).editProject = (id: string) => {
    const projects: Project[] = JSON.parse(localStorage.getItem("projects") || "[]");
    const project = projects.find(p => p.id === id);
    if (!project) return;
  
    (document.getElementById("projectName") as HTMLInputElement).value = project.name;
    (document.getElementById("projectDesc") as HTMLInputElement).value = project.desc;
    (document.getElementById("endDate") as HTMLInputElement).value = project.endDate;
  
    localStorage.setItem("editId", id);
  };
  
  (window as any).deleteProject = (id: string) => {
    let projects: Project[] = JSON.parse(localStorage.getItem("projects") || "[]");
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem("projects", JSON.stringify(projects));
    loadProjects();
  };
  
  // document.getElementById("saveProject")?.addEventListener("click", () => {
  //   const name = (document.getElementById("projectName") as HTMLInputElement).value.trim();
  //   const desc = (document.getElementById("projectDesc") as HTMLInputElement).value.trim();
  //   const endDate = (document.getElementById("endDate") as HTMLInputElement).value.trim();
  
  //   let projects: Project[] = JSON.parse(localStorage.getItem("projects") || "[]");
  //   const editId = localStorage.getItem("editId");
  
  //   if (editId) {
  //     const index = projects.findIndex(p => p.id === editId);
  //     if (index !== -1) {
  //       projects[index] = { ...projects[index], name, desc, endDate };
  //       localStorage.removeItem("editId");
  //     }
  //   } else {
  //     const newProject: Project = {
  //       id: Date.now().toString(),
  //       name,
  //       desc,
  //       endDate,
  //       status: "pending"
  //     };
  //     projects.push(newProject);
  //   }
  
  //   localStorage.setItem("projects", JSON.stringify(projects));
  //   alert("Project saved successfully.");
  //   loadProjects();
  //   populateProjectDropdown();
  // });

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('saveProject')?.addEventListener('click', async () => {
      const token = localStorage.getItem('token');
  
      const name = (document.getElementById('projectName') as HTMLInputElement).value.trim();
      const description = (document.getElementById('projectDesc') as HTMLInputElement).value.trim();
      const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
      const isCompleted=(document.getElementById('iscomplete') as HTMLInputElement).value;
      if (!name || !description || !endDate || !isCompleted ) {
        return alert('Please fill in all fields.');
      }
  
      const payload = {
        name,
        description,
        endDate,
        isCompleted: false,
      };
  
      try {
        const res = await fetch('http://localhost:3000/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          alert(`Project "${data.name}" created successfully!`);
          (document.getElementById('projectName') as HTMLInputElement).value = '';
          (document.getElementById('projectDesc') as HTMLInputElement).value = '';
          (document.getElementById('endDate') as HTMLInputElement).value = '';
        } else {
          alert(data.message || 'Failed to create project.');
        }
      } catch (error) {
        console.error('Error creating project:', error);
        alert('Something went wrong. Try again later.');
      }
    });
  });


  //to assign users with project
document.addEventListener('DOMContentLoaded', () => {
  const assignBtn = document.getElementById('assignBtn') as HTMLButtonElement;
  const userInput = document.getElementById('users') as HTMLInputElement;
  const projectInput = document.getElementById('projects') as HTMLInputElement;
  const token = localStorage.getItem('token');

  if (!assignBtn || !userInput || !projectInput) {
    console.error('Assign form elements not found in DOM');
    return;
  }

  assignBtn.addEventListener('click', async () => {
    const userId = userInput.value.trim();
    const projectId = projectInput.value.trim();

    if (!userId || !projectId) {
      alert('Please enter both user ID and project ID.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/projects/${projectId}/assign/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert(` Project ${projectId} assigned to user ${userId} successfully.`);
        userInput.value = '';
        projectInput.value = '';
      } else {
        alert(data.message || ' Failed to assign project.');
      }
    } catch (error) {
      console.error('Assignment error:', error);
      alert('Something went wrong. Try again.');
    }
  });
});
