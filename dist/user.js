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
const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
function getAssignedProject() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`http://localhost:3000/users/${user.id}/project`);
        const data = yield res.json();
        return data.project;
    });
}
function initializeView() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const message = document.getElementById("message");
        const list = document.getElementById("project-list");
        const project = yield getAssignedProject();
        if (!project) {
            message.textContent = "No project assigned to you yet.";
            list.innerHTML = "";
            return;
        }
        message.textContent = "";
        list.innerHTML = `
    <div class="card">
      <strong>${project.name}</strong><br/>
      ${project.desc}<br/>
      Due: ${project.endDate}<br/>
      Status: ${project.status}<br/>
      ${project.status === "pending" ? '<button id="completeBtn">Complete</button>' : ""}
    </div>
  `;
        (_a = document.getElementById("completeBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`http://localhost:3000/projects/${project.id}/complete, {
      method: "PATCH",
    }`);
            if (res.ok) {
                alert("Marked as complete");
                initializeView();
            }
        }));
    });
}
(_a = document.getElementById("btnViewProject")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", initializeView);
(_b = document.getElementById("btnLogout")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
});
initializeView();
