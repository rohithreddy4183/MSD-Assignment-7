document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        alert('Username and password are required.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok && data.message === 'Login successful') {
            localStorage.setItem('isLoggedIn', 'true'); // Store login status
            showLoginSuccessModal(); // Show modal on successful login
        } else {
            alert(data.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Network or server error. Please try again.');
    }
});

function showLoginSuccessModal() {
    const modalHtml = `
        <div id="successModal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        ">
            <div style="
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                width: 80%;
                max-width: 400px;
            ">
                <p>Login successful!</p>
                <button id="okButton" style="
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                ">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.getElementById('okButton').addEventListener('click', () => {
        window.location.href = 'http://localhost:5000/index.html';
    });
}
