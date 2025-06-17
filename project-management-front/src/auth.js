// REGISTER FUNCTION
document.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.getElementById('register');
  registerBtn?.addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email') .value;
    const password = document.getElementById('password') .value;
    const role = document.getElementById('role') .value;

    const res = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Registration successful!');
      window.location.href = 'register.html';
    } else {
      alert(data.message || 'Registration failed');
    }
  });
});


