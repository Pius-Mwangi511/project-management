"use strict";
const adminEmail = "admin@pm.com";
const adminPassword = "admin123";
// Registration
const registerBtn = document.getElementById("register");
registerBtn === null || registerBtn === void 0 ? void 0 : registerBtn.addEventListener("click", () => {
    var _a, _b;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    if (!name || !email || !password)
        return alert("All fields required");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        role: "users"
    };
    if (users.find(user => user.email === email)) {
        return alert("User already exists");
    }
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users)); //save to localstorage
    if (window.location.pathname.includes("Admin.html")) {
        (_b = (_a = window).populateUserDropdown) === null || _b === void 0 ? void 0 : _b.call(_a); //refreshes dropdn if on adminpage
    }
    alert("Registration successful!");
    window.location.href = "user.html"; //redirection after registration
});
// Login
const loginBtn = document.getElementById("login");
loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    if (email === adminEmail && password === adminPassword) {
        localStorage.setItem("adminLoggedIn", "true");
        window.location.href = "admin.html";
        return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        alert("Invalid credentials or user not registered.");
        return;
    }
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "user.html";
});
