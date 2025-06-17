document.getElementById('login')?.addEventListener('click', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email') .value;
    const password = document.getElementById('password') .value;
  
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (res.ok && data.access_token && email==="owner@gmail.com") {
        localStorage.setItem('token', data.access_token);
        window.location.href = 'Admin.html';
      }
      else if (res.ok && data.access_token && email!=="owner@gmail.com") {
        localStorage.setItem('token', data.access_token);
        window.location.href = 'user.html';
      }
      else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong');
    }
  });
  