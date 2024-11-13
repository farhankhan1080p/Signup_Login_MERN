import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Signup.css';  // Import the CSS file

function Signup() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8000/signup", {
                email,
                password
            });

            if (res.data === "exist") {
                alert("User already exists");
                history("/login", { state: { id: email } });
            } else if (res.data === "notexist") {
                history("/login", { state: { id: email } });
            }
        } catch (e) {
            console.error(e);
            alert("Error signing up");
        }
    }

    return (
        <div className="signup-page"> {/* Add this to apply the styles */}
            <div className="signup-container">
                <h1>Signup</h1>
                <form>
                    <input 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email" 
                        className="input-field" 
                    />
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        className="input-field" 
                    />
                    <input 
                        type="submit" 
                        onClick={submit} 
                        value="Signup" 
                        className="signup-btn" 
                    />
                </form>
                <br />
                <p>OR</p>
                <Link to="/login" className="login-btn">Login Page</Link>
            </div>
        </div>
    );
}

export default Signup;
