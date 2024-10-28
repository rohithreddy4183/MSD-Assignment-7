document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent traditional form submission

    // Capture input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Check if all fields are filled
    if (!username || !email || !password || !confirmPassword) {
        alert('All fields are required.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        // Send POST request to register API
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json(); // Parse response

        if (response.ok) {
            alert(data.message); // Show success message
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            alert(data.message); // Show error message
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
    }
});