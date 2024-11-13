import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";  // Import the Login.css file

function Login() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8000/login", {
                email,
                password
            });

            if (res.data === "exist") {
                // Use window.location.href to redirect to an external URL
            	window.location.href = "https://quiet-parfait-b21e90.netlify.app/";
            } else if (res.data === "notexist") {
                alert("User not found. Please sign up.");
		history("/signup", { state: { id: email } });
            }
        } catch (e) {
            console.error(e);
            alert("Error logging in");
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={submit}>
                    <div>
                        <label className="input-label" htmlFor="email">Email</label>
                        <input
                            className="input-field"
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            value={email}
                            required
                        />
                    </div>
                    <div>
                        <label className="input-label" htmlFor="password">Password</label>
                        <input
                            className="input-field"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            value={password}
                            required
                        />
                    </div>
                    <input
                        className="login-btn"
                        type="submit"
                        value="Login"
                    />
                </form>
                <br />
                <p>OR</p>
                <div className="signup-link">
                    <Link className="signup-btn" to="/signup">Signup Page</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
