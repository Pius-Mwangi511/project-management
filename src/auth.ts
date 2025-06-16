interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "Admin" | "user";
  assignedProject?: string;
}

const registerBtn = document.getElementById("register") as HTMLButtonElement;
registerBtn?.addEventListener("click", async () => {
  const name = (document.getElementById("name") as HTMLInputElement).value.trim();
  const email = (document.getElementById("email") as HTMLInputElement).value.trim();
  const password = (document.getElementById("password") as HTMLInputElement).value.trim();
  const role = "user"; // default role

  if (!name || !email || !password) return alert("All fields required");

  const res = await fetch(`http://localhost:3000/auth/register, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  }`);

  const data = await res.json();
  if (!res.ok) return alert(data.message || "Registration failed");

  alert("Registration successful!");
  window.location.href = "login.html";
});

const loginBtn = document.getElementById("login") as HTMLButtonElement;
loginBtn?.addEventListener("click", async () => {
  const email = (document.getElementById("email") as HTMLInputElement).value.trim();
  const password = (document.getElementById("password") as HTMLInputElement).value.trim();

  const isAdmin = email === "admin@pm.com" && password === "admin123";
  if (isAdmin) {
    localStorage.setItem("role", "Admin");
    window.location.href = "admin.html";
    return;
  }

  const res = await fetch(`http://localhost:3000/auth/login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }`);

  const data = await res.json();
  if (!res.ok) return alert(data.message || "Login failed");

  localStorage.setItem("loggedInUser", JSON.stringify(data.user));
  window.location.href = "user.html";
});