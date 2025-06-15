"use strict";
var _a, _b;
const ADMIN = {
    email: 'admin@admin.com',
    password: 'admin123',
};
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}
function saveUser(user) {
    const users = getUsers();
    const exists = users.some(u => u.email === user.email);
    if (!exists) {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
    return false;
}
console.log('auth.js loaded');
// Handle Register
(_a = document.querySelector('button#register')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const firstName = document.getElementById('firstname').value.trim();
    const lastName = document.getElementById('lastname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!firstName || !lastName || !email || !password)
        return alert('All fields required.');
    const success = saveUser({ firstName, lastName, email, password, role: 'user' });
    if (success) {
        alert('Registration successful.');
        window.location.href = 'login.html';
    }
    else {
        alert('User already registered.');
    }
});
// Handle Login
(_b = document.querySelector('button#login')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    if (email === ADMIN.email && password === ADMIN.password) {
        localStorage.setItem('activeUser', JSON.stringify({ email, role: 'admin' }));
        window.location.href = 'Admin.html';
        return;
    }
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user)
        return alert('Invalid credentials or user not registered.');
    localStorage.setItem('activeUser', JSON.stringify(user));
    window.location.href = 'user.html';
});
