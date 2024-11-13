import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
                history("/student", { state: { id: email } });
            } else if (res.data === "notexist") {
                alert("User not found. Please sign up.");
            }
        } catch (e) {
            console.error(e);
            alert("Error logging in");
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="submit" onClick={submit} value="Login" />
            </form>
            <br />
            <p>OR</p>
            <Link to="/signup">Signup Page</Link>
        </div>
    );
}

export default Login;
