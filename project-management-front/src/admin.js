var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c, _d, _e, _f;
var _this = this;
console.log("admin is loaded");
function showSection(sectionId) {
    var sections = ["dashboard", "add-projects", "assign-project"];
    sections.forEach(function (id) {
        var el = document.getElementById(id);
        if (el)
            el.style.display = (id === sectionId) ? "block" : "none";
    });
}
function loadProjects() {
    var container = document.querySelector(".all-projects");
    container.innerHTML = "";
    var projects = JSON.parse(localStorage.getItem("projects") || "[]");
    projects.forEach(function (project) {
        var card = document.createElement("div");
        card.className = "projects-card"; //for css cards
        card.innerHTML = "\n        <h3>".concat(project.name, "</h3> \n         <p>").concat(project.desc, "<p>\n        <p><strong> Due: </strong> ").concat(project.endDate, " </p>\n        <button onclick=\"editProject('").concat(project.id, "')\">Edit</button>\n        <button onclick=\"deleteProject('").concat(project.id, "')\">Delete</button>\n      ");
        container.appendChild(card);
    });
}
function populateUserDropdown() {
    var userDropdown = document.getElementById("users");
    userDropdown.innerHTML = "<option value=\"\">Users</option>"; // reset
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    users.forEach(function (user) {
        if (user.role === "user") { // Only show users not admin
            var option = document.createElement("option");
            option.value = user.id;
            option.textContent = user.name;
            userDropdown.appendChild(option);
        }
    });
}
function populateProjectDropdown() {
    var projectDropdown = document.getElementById("projects");
    projectDropdown.innerHTML = "<option value=\"\">Projects</option>"; // reset
    var projects = JSON.parse(localStorage.getItem("projects") || "[]");
    projects.forEach(function (project) {
        var option = document.createElement("option");
        option.value = project.id;
        option.textContent = project.name;
        projectDropdown.appendChild(option);
    });
}
// Add event listeners for dashboard buttons
(_a = document.getElementById("btnAdd")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    console.log("Add button clicked");
    showSection("add-projects");
    loadProjects();
});
(_b = document.getElementById("btnAssign")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    console.log("Assign button clicked");
    showSection("assign-project");
    populateUserDropdown();
    populateProjectDropdown();
});
(_c = document.getElementById("btnDashboard")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    console.log("Dashboard button clicked");
    showSection("dashboard");
});
(_d = document.getElementById("cardAdd")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    console.log("Card Add clicked");
    showSection("add-projects");
    loadProjects();
});
(_e = document.getElementById("cardAssign")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
    console.log("Card Assign clicked");
    showSection("assign-project");
    populateUserDropdown();
    populateProjectDropdown();
});
var logoutBtn = document.getElementById("btnLogout");
logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener("click", function () {
    var confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        localStorage.removeItem("loggedInUser"); //clear the user
        window.location.href = "login.html"; //redirect to login
    }
});
window.editProject = function (id) {
    var projects = JSON.parse(localStorage.getItem("projects") || "[]");
    var project = projects.find(function (p) { return p.id === id; });
    if (!project)
        return;
    document.getElementById("projectName").value = project.name;
    document.getElementById("projectDesc").value = project.desc;
    document.getElementById("endDate").value = project.endDate;
    localStorage.setItem("editId", id);
};
window.deleteProject = function (id) {
    var projects = JSON.parse(localStorage.getItem("projects") || "[]");
    projects = projects.filter(function (p) { return p.id !== id; });
    localStorage.setItem("projects", JSON.stringify(projects));
    loadProjects();
};
(_f = document.getElementById("saveProject")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
    var name = document.getElementById("projectName").value.trim();
    var desc = document.getElementById("projectDesc").value.trim();
    var endDate = document.getElementById("endDate").value.trim();
    var projects = JSON.parse(localStorage.getItem("projects") || "[]");
    var editId = localStorage.getItem("editId");
    if (editId) {
        var index = projects.findIndex(function (p) { return p.id === editId; });
        if (index !== -1) {
            projects[index] = __assign(__assign({}, projects[index]), { name: name, desc: desc, endDate: endDate });
            localStorage.removeItem("editId");
        }
    }
    else {
        var newProject = {
            id: Date.now().toString(),
            name: name,
            desc: desc,
            endDate: endDate,
            status: "pending"
        };
        projects.push(newProject);
    }
    localStorage.setItem("projects", JSON.stringify(projects));
    alert("Project saved successfully.");
    loadProjects();
    populateProjectDropdown();
});
// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('saveProject')?.addEventListener('click', async () => {
//       const token = localStorage.getItem('token');
//       const name = (document.getElementById('projectName') as HTMLInputElement).value.trim();
//       const description = (document.getElementById('projectDesc') as HTMLInputElement).value.trim();
//       const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
//       if (!name || !description || !endDate) {
//         return alert('Please fill in all fields.');
//       }
//       const payload = {
//         name,
//         description,
//         endDate,
//         isComplete: false,
//       };
//       try {
//         const res = await fetch('http://localhost:3000/projects', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify(payload),
//         });
//         const data = await res.json();
//         if (res.ok) {
//           alert(`Project "${data.name}" created successfully!`);
//           (document.getElementById('projectName') as HTMLInputElement).value = '';
//           (document.getElementById('projectDesc') as HTMLInputElement).value = '';
//           (document.getElementById('endDate') as HTMLInputElement).value = '';
//         } else {
//           alert(data.message || 'Failed to create project.');
//         }
//       } catch (error) {
//         console.error('Error creating project:', error);
//         alert('Something went wrong. Try again later.');
//       }
//     });
//   });
document.addEventListener('DOMContentLoaded', function () {
    var assignBtn = document.getElementById('assignBtn');
    var userSelect = document.getElementById('users');
    var projectSelect = document.getElementById('projects');
    var token = localStorage.getItem('token');
    // Load users and projects into the dropdowns
    document.addEventListener('DOMContentLoaded', function () {
        var assignBtn = document.getElementById('assignBtn');
        var userInput = document.getElementById('users');
        var projectInput = document.getElementById('projects');
        var token = localStorage.getItem('token');
        assignBtn === null || assignBtn === void 0 ? void 0 : assignBtn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
            var userId, projectId, res, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = userInput.value.trim();
                        projectId = projectInput.value.trim();
                        if (!userId || !projectId) {
                            return [2 /*return*/, alert('Please enter both user ID and project ID.')];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("http://localhost:3000/projects/".concat(projectId, "/assign/").concat(userId), {
                                method: 'PUT',
                                headers: {
                                    'Authorization': "Bearer ".concat(token),
                                    'Content-Type': 'application/json',
                                },
                            })];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _a.sent();
                        if (res.ok) {
                            alert("Project ".concat(projectId, " assigned to user ").concat(userId, " successfully."));
                            userInput.value = '';
                            projectInput.value = '';
                        }
                        else {
                            alert(data.message || 'Failed to assign project.');
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Assignment error:', error_1);
                        alert('Something went wrong. Try again.');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    });
});
