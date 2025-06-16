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
const registerBtn = document.getElementById("register");
registerBtn === null || registerBtn === void 0 ? void 0 : registerBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = "user"; // default role
    if (!name || !email || !password)
        return alert("All fields required");
    const res = yield fetch(`http://localhost:3000/auth/register, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  }`);
    const data = yield res.json();
    if (!res.ok)
        return alert(data.message || "Registration failed");
    alert("Registration successful!");
    window.location.href = "login.html";
}));
const loginBtn = document.getElementById("login");
loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const isAdmin = email === "admin@pm.com" && password === "admin123";
    if (isAdmin) {
        localStorage.setItem("role", "Admin");
        window.location.href = "admin.html";
        return;
    }
    const res = yield fetch(`http://localhost:3000/auth/login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }`);
    const data = yield res.json();
    if (!res.ok)
        return alert(data.message || "Login failed");
    localStorage.setItem("loggedInUser", JSON.stringify(data.user));
    window.location.href = "user.html";
}));
