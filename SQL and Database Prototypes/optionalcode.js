const handleLogin = async () => {
    const response = await fetch('http://your-api-url/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Save JWT for authenticated routes
        console.log('Login successful');
    } else {
        console.error('Login failed');
    }
};



// Just a basic post system if we choose to use React