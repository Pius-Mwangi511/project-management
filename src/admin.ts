console.log("admin is loaded")
interface Project {
    id: string;
    name: string;
    desc: string;
    endDate: string;
    status: "pending" | "completed";
  }
  
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
    console.log("Rendering projects", projects);
  
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
  
  document.addEventListener("DOMContentLoaded", () => {
    const saveBtn = document.getElementById("saveProject");
    saveBtn?.addEventListener("click", () => {
        console.log("saved");

        const nameInput = document.getElementById("projectName");
        const descInput = document.getElementById("projectDesc");
        const endDateInput = document.getElementById("endDate");

        const name = (nameInput as HTMLInputElement)?.value.trim() || "";
        const desc = (descInput as HTMLInputElement)?.value.trim() || "";
        const endDate = (endDateInput as HTMLInputElement)?.value.trim() || "";

        if (!name || !desc || !endDate) {
            return alert("Fill all the fields");
        }

        let projects: Project[] = JSON.parse(localStorage.getItem("projects") || "[]");
        const editId = localStorage.getItem("editId");

        if (editId) {
            const index = projects.findIndex((p: Project) => p.id === editId);
            if (index !== -1) {
                // Avoid updating to an already existing name (excluding self)
                const nameExists = projects.some((p: Project, i: number) => i !== index && p.name.toLowerCase() === name.toLowerCase());
                if (nameExists) {
                    return alert("Another project with this name already exists.");
                }

                projects[index] = {
                    ...projects[index],
                    name,
                    desc,
                    endDate
                };
                localStorage.removeItem("editId");
            }
        } else {
            // Prevent adding duplicates
            const exists = projects.some(p => p.name.toLowerCase() === name.toLowerCase());
            if (exists) {
                return alert("A project with this name already exists.");
            }

            const newProject: Project = {
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
            (nameInput as HTMLInputElement).value = "";
        }
        if (descInput) {
            (descInput as HTMLInputElement).value = "";
        }
        if (endDateInput) {
            (endDateInput as HTMLInputElement).value = "";
        }

        loadProjects();
        populateProjectDropdown();
    });
});