interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
  }
  
  const ADMIN = {
    email: 'admin@admin.com',
    password: 'admin123',
  };
  
  function getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  
  function saveUser(user: User) {
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
  document.querySelector('button#register')?.addEventListener('click', () => {
    const firstName = (document.getElementById('firstname') as HTMLInputElement).value.trim();
    const lastName = (document.getElementById('lastname') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const password = (document.getElementById('password') as HTMLInputElement).value.trim();
  
    if (!firstName || !lastName || !email || !password) return alert('All fields required.');
  
    const success = saveUser({ firstName, lastName, email, password, role: 'user' });
    if (success) {
      alert('Registration successful.');
      window.location.href = 'login.html';
    } else {
      alert('User already registered.');
    }
  });
  
  // Handle Login
  document.querySelector('button#login')?.addEventListener('click', () => {
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const password = (document.getElementById('password') as HTMLInputElement).value.trim();
  
    if (email === ADMIN.email && password === ADMIN.password) {
      localStorage.setItem('activeUser', JSON.stringify({ email, role: 'admin' }));
      window.location.href = 'Admin.html';
      return;
    }
  
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return alert('Invalid credentials or user not registered.');
  
    localStorage.setItem('activeUser', JSON.stringify(user));
    window.location.href = 'user.html';
  });