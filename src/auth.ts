interface User {
    id: string
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    assignedProject?: string;
  }
  
  const adminEmail = "admin@pm.com";
  const adminPassword = "admin123";
  
  // Registration
  const registerBtn = document.getElementById("register") as HTMLButtonElement;
  registerBtn?.addEventListener("click", () => {
    const firstname = (document.getElementById("firstname") as HTMLInputElement).value.trim();
    const lastname = (document.getElementById("lastname") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value.trim();
  
    if (!firstname || !lastname || !email || !password) return alert("All fields required");
  
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const newUser: User = {
     id: Date.now().toString(),
     firstname,
     lastname,
     email,
     password
    };
  
    if (users.find(user => user.email === email)) {
      return alert("User already exists");
    }
  
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));//save to localstorage

    if
    (window.location.pathname.includes("Admin.html"))
    {
        (window as any).populateUserDropdown?.();//refreshes dropdn if on adminpage
    }
  
    alert("Registration successful!");
    window.location.href = "user.html";//redirection after registration
  });
  
  // Login
  const loginBtn = document.getElementById("login") as HTMLButtonElement;
  loginBtn?.addEventListener("click", () => {
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value.trim();
  
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("adminLoggedIn", "true");
      window.location.href = "admin.html";
      return;
    }
  
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);
  
    if (!user) {
      alert("Invalid credentials or user not registered.");
      return;
    }
  
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "user.html";
  });
